#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import json
from parser import parseSemester
import extractor


"""this program parses a whole bunch of semesters to a single file"""


data = {}


def merge(newLV, oldLV, parameter, isList):
    """print a merge problem warning, and merge"""

    if isList:
        newValue = list(set(oldLV.get(parameter) + newLV.get(parameter)))
    else:
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
    oldLV['semester'] = list(set(newSemesters))



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


parseMultiple(14, 16)
dumpfile = open("./multiParserOut.json", "w")
dumpfile.write(json.dumps(data, indent=4, ensure_ascii=True, sort_keys=True))
dumpfile.close()

#print "\nUnknown Modules:"
#for name in extractor.UnknownVertiefung:
#    print " > " + name

print "done."
