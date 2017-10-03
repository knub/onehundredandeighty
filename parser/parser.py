#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from __future__ import print_function
import urllib2
import re
import sys
import threading
import Queue

import extractor

LehrveranstaltungenIndexURL = "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering.html"
WSBaseUrl = "https://hpi.de/studium/lehrveranstaltungen/archiv/wintersemester-20"
SSBaseUrl = "https://hpi.de/studium/lehrveranstaltungen/archiv/sommersemester-20"

# TODO: Once the admins resolved the typo, remove this String from the script
SSBaseUrlTypo = "https://hpi.de/studium/lehrveranstaltungen/archiv/sommersemster-20"



# utility - spawn a thread to execute target for each args
MAX_PARALLEL_THREADS = 4
def run_parallel_in_threads(target, args_list):
    result = Queue.Queue()
    # wrapper to collect return value in a Queue#
    def task_wrapper():
        while True:
            try:
                args = args_list.pop()
            except IndexError:
                return
            result.put(target(*args))
    threads = [threading.Thread(target=task_wrapper) for i in xrange(MAX_PARALLEL_THREADS)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    return result


def twoCharString(num):
    string = str(num)
    if len(string) == 1:
        string = "0" + string
    return string


def URLForSemester(semester):
    """gibt für ein gewünschtes Semester die entsprechende Liste der Lehrveranstaltungen zurück"""
    if semester == "now":
        url = LehrveranstaltungenIndexURL
    else:
        year = int(semester.lstrip("WS"))
        if year > 99:
            raise ValueError("You have been using this program far too long. Please start coding a new one.")
        else:
            if semester.startswith("SS"):
                if year is 13 or year is 14:
                    url = SSBaseUrlTypo + twoCharString(year) + ".html"
                else:
                    url = SSBaseUrl + twoCharString(year) + ".html"
            else:
                url = WSBaseUrl + twoCharString(year) + twoCharString(year + 1) + ".html"
    return url


def URLsPerSemester(url):
    """Gibt die URLs der LVs für ein Semester zurück"""
    try:
        site = urllib2.urlopen(url)
    except urllib2.HTTPError:
        print("No data found at " + url + " - skipping it")
        return []

    for line in site:
        if line.strip().startswith("<h1>IT-Systems Engineering BA</h1>"):
            break

    wholeFile = ""
    for line in site:
        if line.strip().startswith("<h1>IT-Systems Engineering MA</h1>"):
            break
        wholeFile += line

    matches = re.finditer(r"class=\"courselink\" href=\"(.*?\.html).*?</a>", wholeFile, re.IGNORECASE | re.DOTALL)
    urls = [match.group(1) for match in matches]
    return urls


def listOfLVs(urls):
    """baut aus den URLs der LVs eine Liste von lv-Objekten"""
    lvs = {}
    i = 0
    args = [("https://hpi.de" + url,) for url in urls]
    print("Parsing LVs")
    for arg in args:
        print(arg[0])

    sys.stdout.write('/')
    for i in xrange(len(args)):
        print('-', end='')
    print('\\\n|', end='')
    sys.stdout.flush()

    def handleUrl(url):
        lvDict = parseLVPage(url)
        lvs[lvDict['id']] = lvDict
        print('.', end='')
        sys.stdout.flush()

    # NOTE: looks like the hpi - website doesn't handle so many parallel request that good
    # run_parallel_in_threads(handleUrl, args)
    for arg in args:
        handleUrl(arg[0])

    print('|\n')
    return lvs


def parseLVPage(url):
    """parsed aus der Seite einer LV die gewünschten Informationen"""
    page = urllib2.urlopen(url)
    
    for line in page:
        if line.strip().startswith('<div class="tx-ciuniversity-course"'):  # throw away unimportant lines
            break

    wholeFile = ""
    for line in page:
        wholeFile += line

    # Here happens the information extraction
    nameofLV, semester = extractor.getNameAndSemester(wholeFile)
    cp = extractor.getCP(wholeFile)
    benotet = extractor.getBenotet(wholeFile)
    lehrform = extractor.getLehrform(wholeFile)
    dozents = extractor.getDozenten(wholeFile)
    vertiefung, modules = extractor.getVertiefungAndModules(wholeFile)
    shortName = extractor.shortenName(nameofLV)
    lvID = extractor.shortNameToID(shortName)

    lv = {
        'kurz': shortName,
        'lehrform': lehrform,
        'modul': modules,
        'vertiefung': vertiefung,
        'cp': cp,
        'dozent': dozents,
        'nameLV': nameofLV,

        'benotet': benotet,
        'id': lvID
    }
    lv['empfohlen'] = extractor.getEmpfohlen(lv)
    lv['pflicht'] = extractor.isPflicht(lv)
    lv['vorher'] = extractor.getVorher(lv)
    extractor.cleanUp(lv)
    return lv


def parseSemester(name):
    """main entry point for the file, that returns the parsed LVs for a semester ID string"""
    return listOfLVs(URLsPerSemester(URLForSemester(name)))
