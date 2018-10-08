#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from __future__ import print_function
import json
import sys
from parser import parseSemester


"""this program parses a whole bunch of semesters to a single file"""

# USE at least a two digit number for both start and end
START_SEMESTER = 15
END_SEMESTER = 18
# defines, which semester gets represented by the Lehrveranstaltungen Index-page
CURRENT_SEMESTER = 'WS18'


confirm = raw_input("\n\nWARNING: This script completely replaces the content of ../js/data.js\n"
                    "It is currently configured to parse from SS" + str(START_SEMESTER) + " to WS" + str(END_SEMESTER) + ".\n"
                    "The current Semester is set to " + CURRENT_SEMESTER + ".\n"
                    "(this defines, which semester gets represented by the Lehrveranstaltungen index-page)\n"
                    "\n"
                    "If you really want to run the script with these settings, type 'yes'\n"
                    ">>>")

if confirm != 'yes':
    sys.exit('Script aborted!')
print('String script...')

data = {}


def merge(newLV, oldLV, parameter):
    """print a merge problem warning, and merge"""

    newValue = newLV.get(parameter)
    if newValue is None:
        newValue = oldLV.get(parameter)

    print("[WARN] merging " + newLV['id'] + " (parameter " + parameter + "): \n" \
          "  old value: " + str(oldLV[parameter]) + "\n" \
          "  new value: " + str(newLV[parameter]) + "\n" \
          "    > merge resolve: " + str(newValue))

    oldLV[parameter] = newValue


def mergeLV(newLV):
    if "Bachelorprojekt" in newLV['lehrform'] or\
       "Klubsprecher" in newLV['lehrform']:
        return
    lvID = newLV['id']
    lv = data.get(lvID)
    if lv is None:
        lv = newLV
        lv['specific'] = {}
        data[lvID] = lv

    for parameter in ['pflicht', 'modul', 'vertiefung', 'empfohlen']:
        if lv[parameter] != newLV[parameter]:
            print("[WARN!] Information mismatch in " + newLV['id'] + " (parameter " + parameter + "): \n" \
                  "  old value: " + str(lv[parameter]) + "\n" \
                  "  new value: " + str(newLV[parameter]))
        lv[parameter] = newLV[parameter]

    lv['specific'][newLV['semester'][0]] = {}
    for parameter in ['kurz', 'nameLV', 'dozent', 'lehrform', 'cp', 'page']:
        lv['specific'][newLV['semester'][0]][parameter] = newLV[parameter]
        lv[parameter] = newLV[parameter]

    newSemesters = lv['semester'] + newLV['semester']
    lv['semester'] = sorted(list(set(newSemesters)))



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


data['klubsprecher'] = {
    'cp': 3,
    'dozent': [],
    'empfohlen': '',
    'id': 'klubsprecher',
    'kurz': 'Klubsprecher',
    'lehrform': [],
    'modul': ['Softskills'],
    'nameLV': 'Klubsprechertätigkeit über 2 Semester',
    'semester': data['englischlevel1']['semester'],
    'vertiefung': [],
    'page': '',
    'specific': {}
}




# now clean up the data
# delete all specific info that is not needed
for lvKey in data:
    lv = data[lvKey]
    specific = lv['specific']

    semestersToDelete = []
    for semesterKey in specific:
        semester = specific[semesterKey]
        trimmed = {}
        for param in semester:
            generalValue = lv[param]
            specificValue = semester[param]
            if specificValue != generalValue:
                trimmed[param] = specificValue
        if len(trimmed) > 0:
            specific[semesterKey] = trimmed
        else:
            semestersToDelete.append(semesterKey)
    for semester in semestersToDelete:
        del specific[semester]




vertiefungen = ['OSIS', 'SAMT', 'ISAE', 'HCGT', 'BPET']
wantedLVproperties = ['kurz', 'lehrform', 'modul', 'semester', 'pflicht', 'empfohlen', 'vertiefung', 'cp', 'dozent', 'nameLV', 'page']
serilaizingReplacements = {}
for vertiefung in vertiefungen:
    serilaizingReplacements['"' + vertiefung.strip() + '"'] = vertiefung.strip()
for year in xrange(START_SEMESTER, END_SEMESTER + 1):
    serilaizingReplacements['"WS' + str(year) + '"'] = \
        'ws' + str(year) + '_' + str(year + 1)
    serilaizingReplacements['"SS' + str(year) + '"'] = \
        'ss' + str(year)

def serializeProperty(indent, name, object):
    line = ''
    for i in range(indent):
        line += '    '
    line += name + ': '
    serializedValue = json.dumps(object, ensure_ascii=False, sort_keys=True)
    for toReplace in serilaizingReplacements:
        replacement = serilaizingReplacements[toReplace]
        serializedValue = serializedValue.replace(toReplace, replacement)

    line += serializedValue
    return line






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
        f.write('const ')
    else:
        f.write('      ')
    f.write('ss' + str(year) + '    = ')
    f.write('"SS' + str(year) + '",\n')

    f.write('      ws' + str(year) + '_' + str(year + 1) + ' = ')
    f.write('"WS' + str(year) + '/' + str(year + 1) + '"')
    if year == END_SEMESTER:
        f.write(';\n')
    else:
        f.write(',\n')
f.write('\n')
f.write('// Vertiefungsgebiet name variables\n')

for vertiefung in vertiefungen:
    if vertiefung == vertiefungen[0]:
        f.write('const ')
    else:
        f.write('      ')
    f.write(vertiefung + ' = "' + vertiefung.strip() + '"')
    if vertiefung == vertiefungen[len(vertiefungen) - 1]:
        f.write(';\n')
    else:
        f.write(',\n')
f.write('\n')
f.write('// actual data object\n')
f.write('const data = {\n')
for lvID in sorted(data.iterkeys()):
    lv = data[lvID]
    f.write('    ' + lvID + ': {\n')

    for lvProperty in wantedLVproperties:
        f.write(serializeProperty(2, lvProperty, lv.get(lvProperty, '')))
        f.write(',\n')

    if len(lv['specific']) > 0:
        f.write('        specific: {\n')
        for semester in lv['specific']:
            f.write('            ' + semester + ': {\n')
            for versionParameter in lv['specific'][semester]:
                f.write(serializeProperty(4, versionParameter, lv['specific'][semester][versionParameter]))
                if versionParameter != semester[len(semester) - 1]:
                    f.write(',')
                f.write('\n')
            f.write('            },\n')
        f.write('        }\n')
    else:
        f.write('        specific: {}\n')
    f.write('    },\n')
f.write('};\n\nmodule.exports = data;\n')
f.close()

print("done.")
