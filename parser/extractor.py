#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import re


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

    ws_ss = semesterMatch.group(1).upper()
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
                elif char == '/':
                    pass  # ignore the separator
                else:
                    lehrform.append(char)
                    print "Unknown LV type: " + char
    lehrform.sort()
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
    result.sort()
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
            moduleName = match.group(1)
            vertiefung.add(extractVertiefung(moduleName))
            modules.add(extractModule(moduleName))

    vertiefung.discard("")
    modules.discard("")
    return sorted(list(vertiefung)), sorted(list(modules))


def extractVertiefung(moduleName):
    simpleAbbrevRegex = r"(.{3,4})-Vertiefung"
    simpleAbbrevMatch = re.search(simpleAbbrevRegex, moduleName)
    if simpleAbbrevMatch is not None:
        result = simpleAbbrevMatch.group(1)
        if result == "IST":
            return "ISAE"
        return result
    if moduleName == "Human Computer Interaction &amp; Computer Graphics Technology":
        return "HCGT"
    if moduleName == "Software Architecture &amp; Modeling Technology":
        return "SAMT"
    if moduleName == "Operating Systems &amp; Information Systems Technology":
        return "OSIS"
    if moduleName == "Internet &amp; Security Technology":
        return "ISAE"
    if moduleName == "Business Process &amp; Enterprise Technologies":
        return "BPET"

    return ""


def extractModule(moduleName):
    if extractVertiefung(moduleName) != "":
        return "Vertiefungsgebiete"

    if moduleName == "Rechtliche Grundlagen" or\
       moduleName == "Wirtschaftliche Grundlagen" or\
       moduleName == "Rechtliche und wirtschaftliche Grundlagen":
        return "Rechtliche und wirtschaftliche Grundlagen"

    if moduleName == "Softskills" or\
       moduleName == "Design Thinking" or\
       moduleName == "Klubsprecher" or\
       moduleName == "Schlüsselkompetenzen" or\
       moduleName == "Projektentwicklung und -management":
        return "Softskills"

    if moduleName.startswith("Mathematik") or \
       moduleName.startswith("Theoretische Informatik"):
        return "Mathematische und theoretische Grundlagen"

    if moduleName == "Prozessorientierte Informationssysteme" or\
       moduleName == "Web- und Internet-Technologien" or\
       moduleName == "Betriebssysteme" or\
       moduleName == "Datenbanksysteme" or\
       moduleName == "Computergrafische Systeme" or\
       moduleName == "Prozessorientierte Informationssysteme":
        return "Softwarebasissysteme"

    if moduleName.startswith("Programmiertechnik") or\
       moduleName == "Software-Architektur" or\
       moduleName == "Digitale Systeme":
        return "Grundlagen IT-Systems Engineering"

    if moduleName == "Softwaretechnik" or\
       moduleName.startswith("Modellierung"):
        return "Softwaretechnik und Modellierung"

    return ""


ShortenLV = [
    # Grundlagen IT-Systems Engineering
    ("Einführung in die Programmiertechnik", "PT"),
    ("Grundlagen digitaler Systeme", "GdS"),
    ("Softwarearchitektur", "SWA"),
    # Softwaretechnik und Modellierung
    ("Modellierung", "Mod"),
    ("Softwaretechnik", "SWT"),
    # Mathematische und TheoretischeGrundlagen
    ("Theoretische Informatik", "TI"),
    # Softwarebasissysteme
    ("Betriebssysteme 1", "BS"),
    ("Betriebssysteme", "BS"),
    ("3D-Computergrafik", "CG"),
    ("Datenbanksysteme", "DBS"),
    ("Prozessorientierte Informationssysteme", "POIS"),
    ("Designing Interactive Systems", "HCI I"),
    ("HCI: Building Interactive Devices and Computer Vision", "HCI II"),
    ("Building Interactive Devices", "HCI II"),
    ("Internet- und WWW-Technologien", "WWW"),
    # Rechtliche und wirtschaftliche Grundlagen
    ("Recht für Ingenieure", "Recht"),
    ("Wirtschaftliche Grundlagen", "Wirtschaft"),
    # Vertiefungsgebiete
    ("Algorithmic Problem Solving", "AlgoRiddles"),
    ("Competitive Programming", "ComProg"),
    ("Big Data", "BD"),
    ("Bildverarbeitungsalgorithmen", "BVA"),
    ("Internet-Security", "ISec"),
    ("Entwurf und Implementierung digitaler Schaltungen mit VHDL", "VHDL"),
    ("Softwarequalität", "SWQualität"),

    ("Studienbegleitendes Seminar", "StubS"),

    ("HCI Project Seminar: ", "[HCI PS] "),
    ("HCI Project Seminar on ", "[HCI PS] "),
    ("HCI Project Seminar ", "[HCI PS] "),

    ("Projektentwicklung und- Management", "PEM"),
    ("Projektentwicklung und - management", "PEM"),
    ("Projektentwicklung und -management", "PEM")
]
ShortenWords = {
    ("Qualitätssicherung", "Qualität"),
    ("Applikationen", "Apps"),
    ("&quot;", "\""),
}
RemovableWords = {
    "\\",
    "zur Prüfungsvorbereitung",
    "Fachspezifisches ",
    "Best Practices",
    "Praktische Anwendung von",
    "Entwicklung von",
    "A Platform for",
    "für ",
    "development of ",
    "Industrieseminar"
}
MaxLVIDLength = 50


def shortenName(longName):
    """take the name of a LV and return the shorter display-version of the name"""
    name = longName

    for toReplace, replacement in ShortenLV:
        name = name.replace(toReplace, replacement)
    for toReplace, replacement in ShortenWords:
        name = name.replace(toReplace, replacement)
    for toRemove in RemovableWords:
        name = name.replace(toRemove, "")

    name = name.split(":")[0]
    name = name.split(" - ")[0]
    name = name.split(" mit ")[0]
    name = name.split(" with ")[0]
    name = name.split(" for ")[0]
    name = name.strip()

    if len(name) > MaxLVIDLength:
        name = name[:(MaxLVIDLength - 3)] + "..."

    if len(name) > 25 and name.count(' ') > 0:
        # add a br in the middlest space
        middleIndex = len(name) / 2
        middlestSpace = middleIndex
        spaceStep = 0

        while name[middlestSpace] != ' ':
            spaceStep += 1
            if name[middleIndex - spaceStep] == ' ':
                middlestSpace = middleIndex - spaceStep
            elif name[middleIndex + spaceStep] == ' ':
                middlestSpace = middleIndex + spaceStep

        name = name[:middlestSpace] + '<br />' + name[middlestSpace + 1:]

    return name


def shortNameToID(shortName):
    """take a short name and return an id string to use in json"""
    lvID = shortName\
        .replace('<br />', ' ')\
        .replace("III", "3")\
        .replace("II", "2")\
        .replace("\"", "")\
        .replace("&quot;", "")\
        .replace("(", "")\
        .replace(")", "")\
        .replace("[", "")\
        .replace("]", "")\
        .replace("{", "")\
        .replace("}", "")\
        .replace(".", "")\
        .replace(",", "")\
        .replace("\\", "")\
        .replace("-", "")\
        .replace("&", "")\
        .replace(";", "")

    if lvID.endswith(' I'):
        lvID = lvID[:-1] + "1"

    lvID = lvID\
        .replace("ü", "ue")\
        .replace("ä", "ae")\
        .replace("ö", "oe")\
        .replace("Ü", "Ue")\
        .replace("Ä", "Ae")\
        .replace("Ö", "Oe")\
        .replace(" ", "")

    while lvID[0].isdigit():
        lvID = lvID[1:]
    return lvID.lower()


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

def getEmpfohlen(lv):
    """return the suggested semester number, or an empty string"""
    return {
        'gds': 1,
        'mathematik1': 1,
        'mod1': 1,
        'pt1': 1,
        'wirtschaft': 1,

        'mathematik2': 2,
        'mod2': 2,
        'pt2': 2,
        'recht1': 2,

        'recht2': 3,
        'swa': 3,
        'ti1': 3,
        'bs': 3,

        'ti2': 4,
        'swt1': 4
    }.get(lv['id'], '')
