#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import json
from parser import parseSemester


"""this cli program enables you to parse and store one single semester"""


semester = raw_input("Please input the wanted semester: now OR (SS|WS)[0-9]{2}: ")
place = raw_input("Please input the name of the local file that the JSON dump should be written to: ")

lvs = parseSemester(semester)

dumpfile = open("./" + place, "w")
dumpfile.write(json.dumps(lvs, indent=4))
dumpfile.close()
