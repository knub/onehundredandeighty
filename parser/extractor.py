#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import re

MaxLVIDLength = 50
UnknownVertiefung = set()


def getNameAndSemester(text):
    headerpattern = re.compile(r"(?<=\<h1\>)(.*)\((.*?\d{4})\)(?=\</h1\>)")
    headerfind = re.search(headerpattern, text)
    nameofLV = headerfind.group(1).strip()
    semester = prettyPrintSemester(headerfind.group(2).strip())
    return nameofLV, semester


def prettyPrintSemester(verboseName):
    name = verboseName.lower()\
        .replace("wintersemester", "WS")\
        .replace("sommersemester", "SS")\
        .replace("summersemester", "SS")\

    semesterRegex = r"(?i)(WS|SS) ?((?:20)?\d{2}(?:/(?:20)?\d{2})?)(?!.*\d)"
    semesterMatch = re.search(semesterRegex, name)

    if semesterMatch is None:
        print "Cannot prettify semester: " + verboseName
        return verboseName

    ws_ss = semesterMatch.group(1)
    shortNum = semesterMatch.group(2).split("/")[0][-2:]

    return ws_ss + shortNum


def getCP(text):
    ectsRegex = r"<li>ECTS ?: ?(\d+)</li>"
    ectsMatch = re.search(ectsRegex, text)
    if ectsMatch is None:
        return 0
    return int(ectsMatch.group(1))


def getBenotet(text):
    benotetRegex = r"(?is)<li>Benotet ?: ?(.*?)</li>"
    benotetMatch = re.search(benotetRegex, text)
    if benotetMatch is not None:
        benotetText = benotetMatch.group(1).strip().lower()
        return benotetText == "ja" or benotetText == "benotet"


def getLehrform(text):
    lehrformRegex = r"(?is)<li>Lehrform ?: ?(.*?)</li>"
    lehrformMatch = re.search(lehrformRegex, text)
    lehrform = []
    if lehrformMatch is not None:
        lehrformString = lehrformMatch.group(1).strip()
        if lehrformString == "BS":
            lehrform.append("Blockseminar")
        elif lehrformString == "BP":
            lehrform.append("Bachelorprojekt")
        else:
            for char in lehrformString:
                if char == 'V':
                    lehrform.append("Vorlesung")
                elif char == 'U':
                    lehrform.append("Übung")
                elif char == 'P':
                    lehrform.append("Projekt")
                elif char == 'S':
                    lehrform.append("Seminar")
                elif char == 'K':
                    lehrform.append("Klubsprecher")
                else:
                    lehrform.append(char)
                    print "Unknown LV type: " + char
    return lehrform


def getDozenten(text):
    dataBlockRegex = re.compile(r"(?s)Dozent: (.*?)<br")
    dataBlockMatch = re.search(dataBlockRegex, text)
    dataBlock = dataBlockMatch.group(1)
    subBlocks = dataBlock.split(", ")

    result = []
    dozentRegex = re.compile(r"(?<=>).[^<>\n]+?(?=<)")
    for subBlock in subBlocks:
        subBlockStrip = subBlock.strip()
        if subBlockStrip.startswith("<"):
            dozentMatch = re.search(dozentRegex, subBlockStrip)
            if dozentMatch is not None:
                result.append(dozentMatch.group().strip())
        else:
            result.append(subBlockStrip)
    return result


def getVertiefungAndModules(text):
    # Module extrahieren - ergibt zB die Vertiefungsgebiete
    moduleBlockRegex = r"(?is)<h2>Module</h2>(.+?)</ul>"
    moduleBlockMatch = re.search(moduleBlockRegex, text)
    vertiefung = set()
    modules = set()
    if moduleBlockMatch is not None:
        moduleBlock = moduleBlockMatch.group(1)
        moduleRegex = r"<li>(.+?)</li>"
        moduleMatches = re.finditer(moduleRegex, moduleBlock)
        for match in moduleMatches:
            vertiefung.add(extractVertiefung(match.group(1)))

    vertiefung.discard("")
    modules.discard("")
    return list(vertiefung), list(modules)


def extractVertiefung(moduleName):
    simpleAbbrevRegex = r"(.{3,4})-Vertiefung"
    simpleAbbrevMatch = re.search(simpleAbbrevRegex, moduleName)
    if simpleAbbrevMatch is not None:
        return simpleAbbrevMatch.group(1)
    if moduleName == "Human Computer Interaction &amp; Computer Graphics Technology":
        return "HCGT"
    if moduleName == "Software Architecture &amp; Modeling Technology":
        return "SAMT"
    if moduleName == "Operating Systems &amp; Information Systems Technology":
        return "OSIS"
    if moduleName == "Internet &amp; Security Technology":
        return "IST"
    if moduleName == "Business Process &amp; Enterprise Technologies":
        return "BPET"

    UnknownVertiefung.add(moduleName)
    return ""


def shortenName(longName):
    """take the name of a LV and return the shorter display-version of the name"""
    name = longName\
        .replace("Big Data", "BD")\
        .replace("Betriebssysteme", "BS")\
        .replace("Datenbanksysteme", "DBS")\
        .replace("Einführung in die Programmiertechnik", "PT")\
        .replace("Grundlagen digitaler Systeme", "GdS")\
        .replace("Modellierung", "Mod")\
        .replace("Internet- und WWW-Technologien", "WWW")\
        .replace("Softwarearchitektur", "SWA")\
        .replace("Softwaretechnik", "SWT")\
        .replace("Softwarequalität", "SWQualität")\
        .replace("Theoretische Informatik", "TI")\
        .replace("Wirtschaftliche Grundlagen", "Wirtschaft")\
        .replace("Prozessorientierte Informationssysteme", "POIS")\
        .replace("Projektentwicklung und- Management", "PEM")\
        .replace("Projektentwicklung und - management", "PEM")\
        .replace("Qualitätssicherung", "Qualität")\
        .replace("Applikationen", "Apps")\
        .replace("Fachspezifisches ", "")\
        .replace("Best Practices", "")\
        .replace(" für Ingenieure", "")\
        .replace("Praktische Anwendung von", "")\
        .replace("Entwicklung von", "")\
        .replace("A Platform for", "")\
        .replace("für ", "")\
        .replace("Programming", "")\
        .replace("development of ", "")\
        .replace("Industrieseminar", "")

    bracketRegex = r"\((.+)\)"
    bracketMatch = re.search(bracketRegex, name)
    if bracketMatch is not None:
        name = bracketMatch.group(1)

    name = name.split(":")[0]
    name = name.split(" - ")[0]
    name = name.split(" mit ")[0]
    name = name.split(" with ")[0]
    name = name.strip()

    if len(name) <= MaxLVIDLength:
        return name
    return name[:(MaxLVIDLength - 3)] + "..."


def shortNameToID(shortName):
    """take a short name and return an id string to use in json"""
    lvID = shortName\
        .replace("III", "3")\
        .replace("II", "2")\
        .replace("\"", "")\
        .replace("&quot;", "")\
        .replace("(", "")\
        .replace(")", "")\
        .replace(".", "")\
        .replace(",", "")\
        .replace("\\", "")\
        .replace("-", "")\
        .replace("&", "")\
        .replace(";", "")

    if lvID.endswith(' I'):
        lvID = lvID[:-1] + "1"

    lvID = lvID\
        .lower()\
        .replace("ü", "ue")\
        .replace("ä", "ae")\
        .replace("ö", "oe")\
        .replace(" ", "")
    return lvID


def isPflicht(lv):
    return lv['id'] == 'bs' or\
           lv['id'] == 'gds' or\
           lv['id'] == 'pem' or\
           lv['id'] == 'wirtschaft' or\
           lv['kurz'].startswith("Mathe") or\
           lv['kurz'].startswith("TI ") or\
           lv['kurz'].startswith("PT ") or\
           lv['kurz'].startswith("Mod") or\
           lv['kurz'].startswith("Recht")


def getVorher(lv):
    """return all the things you have to belegen before you belegen this lv"""
    return []
