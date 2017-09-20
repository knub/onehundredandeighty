#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import json
import sys
from parser import parseSemester


"""this program parses a whole bunch of semesters to a single file"""

# USE at least a two digit number for both start and end
START_SEMESTER = 15
END_SEMESTER = 17
# defines, which semester gets represented by the Lehrveranstaltungen Index-page
CURRENT_SEMESTER = 'WS17'


confirm = raw_input("\n\nWARNING: This script completely replaces the content of ../js/data.js\n"
                    "It is currently configured to parse from SS" + str(START_SEMESTER) + " to WS" + str(END_SEMESTER) + "/" + str(END_SEMESTER + 1) + ".\n"
                    "The current Semester is set to " + CURRENT_SEMESTER + ".\n"
                    "(this defines, which semester gets represented by the Lehrveranstaltungen index-page)\n"
                    "\n"
                    "If you really want to run the script with these settings, type 'yes'\n"
                    ">>>")

if confirm != 'yes':
    sys.exit('Script aborted!')
print 'String script...'

data = {}


def merge(newLV, oldLV, parameter, isList):
    """print a merge problem warning, and merge"""

    newValue = newLV.get(parameter)
    if newValue is None:
        newValue = oldLV.get(parameter)

    print "[WARN] merging " + newLV['id'] + " (parameter " + parameter + "): \n" \
          "  old value: " + str(oldLV[parameter]) + "\n" \
          "  new value: " + str(newLV[parameter]) + "\n" \
          "    > merge resolve: " + str(newValue)

    oldLV[parameter] = newValue


def mergeLV(newLV):
    if "Bachelorprojekt" in newLV['lehrform'] or\
       "Klubsprecher" in newLV['lehrform']:
        return
    lvID = newLV['id']
    oldLV = data.get(lvID)
    if oldLV is None:
        data[lvID] = newLV
        return
    for parameter in ['benotet', 'cp']:
        if oldLV[parameter] != newLV[parameter]:
            merge(newLV, oldLV, parameter, False)
    for listParameter in ['dozent', 'lehrform', 'vertiefung']:
        oldSet = set(oldLV[listParameter])
        newSet = set(newLV[listParameter])
        if newSet != oldSet:
            merge(newLV, oldLV, listParameter, True)
    newSemesters = oldLV['semester'] + newLV['semester']
    oldLV['semester'] = sorted(list(set(newSemesters)))



def include(results, semester):
    """include the parsing results of one semester into the rest"""
    for key, result in results.iteritems():
        result['semester'] = [semester]
        mergeLV(result)


def parseMultiple(start, end):
    for year in xrange(start, end + 1):
        ss = "SS" + str(year)
        include(parseSemester(ss), ss)
        ws = "WS" + str(year)
        include(parseSemester(ws), ws)


parseMultiple(START_SEMESTER, END_SEMESTER)
include(parseSemester('now'), CURRENT_SEMESTER)




vertiefungen = ['OSIS', 'SAMT', 'ISAE', 'HCGT', 'BPET']
wantedLVproperties = ['kurz', 'lehrform', 'modul', 'semester', 'pflicht', 'empfohlen', 'vertiefung', 'cp', 'vorher', 'dozent', 'nameLV']
serilaizingReplacements = {}
for vertiefung in vertiefungen:
    serilaizingReplacements['"' + vertiefung.strip() + '"'] = vertiefung.strip()
for year in xrange(START_SEMESTER, END_SEMESTER + 1):
    serilaizingReplacements['"WS' + str(year) + '"'] = \
        'ws' + str(year) + '_' + str(year + 1)
    serilaizingReplacements['"SS' + str(year) + '"'] = \
        'ss' + str(year)




# write to output
f = open("./../js/data.js", "w")

f.write('\
/**\n\
 * Note: This file was generated automatically, and will be\n\
 * overwritten the next time "/parser/update.py" is executed.\n\
 *\n\
 *\n\
 * DO NOT CHANGE THE DATA HERE!\n\
 *\n\
 * Instead, adjust "extractor.py" to correctly modify\n\
 * the data while parsing.\n\
 * \n\
 * \n\
 * Also make sure to keep "/js/logic.js" up to date\n\
 * (especially the semesterManager)\n\
 */\n\n')
f.write('// semester name variables\n')
for year in xrange(START_SEMESTER, END_SEMESTER + 1):
    if year == START_SEMESTER:
        f.write('var ')
    else:
        f.write('    ')
    f.write('ss' + str(year) + '    = ')
    f.write('"SS' + str(year) + '",\n')

    f.write('    ws' + str(year) + '_' + str(year + 1) + ' = ')
    f.write('"WS' + str(year) + '/' + str(year + 1) + '"')
    if year == END_SEMESTER:
        f.write(';\n')
    else:
        f.write(',\n')
f.write('\n')
f.write('// Vertiefungsgebiet name variables\n')

for vertiefung in vertiefungen:
    if vertiefung == vertiefungen[0]:
        f.write('var ')
    else:
        f.write('    ')
    f.write(vertiefung + ' = "' + vertiefung.strip() + '"')
    if vertiefung == vertiefungen[len(vertiefungen) - 1]:
        f.write(';\n')
    else:
        f.write(',\n')
f.write('\n')
f.write('// actual data object\n')
f.write('var data = {\n')
for lvID in sorted(data.iterkeys()):
    lv = data[lvID]
    f.write('    ' + lvID + ': {\n')

    for lvProperty in wantedLVproperties:
        f.write('        ' + lvProperty + ': ')
        propertyValue = lv.get(lvProperty, '')
        serializedValue = json.dumps(propertyValue, ensure_ascii=False, sort_keys=True)
        for toReplace in serilaizingReplacements:
            replacement = serilaizingReplacements[toReplace]
            serializedValue = serializedValue.replace(toReplace, replacement)

        f.write(serializedValue)
        if lvProperty != wantedLVproperties[len(wantedLVproperties) - 1]:
            f.write(',')
        f.write('\n')

    f.write('    },\n')
f.write('};\n')
f.close()

print "done."
