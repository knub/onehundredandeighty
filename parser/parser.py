# -*- coding: utf-8 -*-

import urllib2
import sys
import json
import re

attributepattern = re.compile(r"\<p\>(.*?)\</p\>")

class lv:
	"""Klasse der Lehrveranstaltungen"""
	def __init__(self, nameLV="", kennung=[], dozent=[], cp=0, benotet=False, modul=[], lehrform=[], themenkomplex=[], vertiefung=[], semester=""):
		self.nameLV = nameLV
		self.kennung = kennung
		self.dozent = dozent
		self.cp = cp
		self.benotet = benotet
		self.modul = modul
		self.lehrform = lehrform
		self.themenkomplex = themenkomplex
		self.vertiefung = vertiefung
		self.semester = semester

def URLForSemester(semester):
	"""gibt für ein gewünschtes Semester die entsprechende Liste der Lehrveranstaltungen zurück"""
	if semester == "now":
		url = "http://www.hpi.uni-potsdam.de/studium/lehrangebot/itse.html"
	else:
		year = int(semester.lstrip("wWsS"))
		if year > 99:
			print "You have been using this program far too long. Please start coding a new one."
		else:
			if semester.startswith("SS"):
				url = "http://www.hpi.uni-potsdam.de/studium/lehrangebot/lehrangebotsarchiv/lehrangebotsarchiv_ss_20" + (str(year) if year >= 10 else "0" + str(year)) + ".html"
			else:
				if (year < 9):
					url = "http://www.hpi.uni-potsdam.de/studium/lehrangebot/lehrangebotsarchiv/lehrangebotsarchiv_ws_0" + str(year) + "0" + str(year+1) + ".html"
				elif (year == 9):
					url = "http://www.hpi.uni-potsdam.de/studium/lehrangebot/lehrangebotsarchiv/lehrangebotsarchiv_ws_0" + str(year) + str(year+1) + ".html"
				else:
					url = "http://www.hpi.uni-potsdam.de/studium/lehrangebot/lehrangebotsarchiv/lehrangebotsarchiv_ws_" + str(year) + str(year+1) + ".html"
	print url
	return url


def URLsPerSemester(url):
	"""Gibt die URLs der LVs für ein Semester zurück"""
	site = urllib2.urlopen(url)

	for line in site:
		if (line.strip().startswith("</div><h1>Bachelorstudium IT-Systems Engineering</h1>")):
			break

	for line in site:
		if (line.strip().startswith('<td style="width: 300px; paddi')):
			break

	line = str(site.next())

#	rows = line.split("<tr>")

#	urls = []

	pattern = re.compile(r"studium/lehrangebot.*?\.html")
	
	urls = re.findall(pattern, line)
	
	
	return urls
	
def listOfLVs(urls):
	"""baut aus den URLs der LVs eine Liste von lv-Objekten"""
	lvs = []
	i = 0
	for url in urls:
		lvs.append(parseLVPage("http://www.hpi.uni-potsdam.de/" + url))
		i+=1
		print "\rBisher wurden " + str(i) + " LVs gefunden."
	return lvs

def parseLVPage(url):
	"""parsed aus der Seite einer LV die gewünschten Informationen"""
	headerpattern = re.compile(r"""	(?x)				#Ignoriere Leerzeichen, wenn sie nicht escaped sind
									(?<=\<h1\>)			#Der Header startet natürlich mit dem entsprechenden Überschriftstag (lookbehind weil wir den nicht brauchen)
									(.*?)				#Daran schließen sich einige freie Zeichen an
									\(					#Dann eine Klammer, die das Semester einschließt
									((
									  (
									   WS\d{4}/\d{4}	#entweder z.B. 'WS2006/2007'
									  )
									  |					#oder
									  (
									   SS\d{4}			#z.B. 'SS2009'
									  )
									))
									\)					#Klammer, die das Semester einschließt
									(?=\</h1\>)			#und der Überschriftstag wird abgeschlossen""")

	numberpattern = re.compile(r"\d+")
	
	klammerpattern = re.compile(r"\((.*?)\)")
	page = urllib2.urlopen(url)
	
	for line in page:
		if (line.strip().startswith('<div class="tx-jshuniversity-pi1-singleVi')): #kennzeichnet die entsprechenden Informationen
			break

################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen von Name, Dozent und Semester                  ##
##                                                                            ##
##                                                                            ##
################################################################################

	line = str(page.next())
	headerfind = re.search(headerpattern, line)
	nameofLV = headerfind.group(1)
	nameofLV = nameofLV.strip()
	semester = headerfind.group(2)
	semester = semester.strip()
	dozents = dozenten(line)
	
################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen der entsprechenden Kennung                     ##
##                                                                            ##
##                                                                            ##
################################################################################

	for line in page:
		if (line.strip().endswith("Kennung:</p></td>")):
			break
	kennung = attributeAsList(page.next()) #hier hab ich versucht, so unverständlich wie möglich zu sein
	
################################################################################
##                                                                            ##
##                                                                            ##
##                Erkennen der entsprechenden CPs und ob benotet              ##
##                                                                            ##
##                                                                            ##
################################################################################
	
	for line in page:
		if (line.strip().endswith("ECTS Credit Points:</p></td>")):
			break
	line = page.next()
	cpfound = re.search(numberpattern, (re.search(attributepattern, line)).group(1))
	if (cpfound != None):
		cp = int(cpfound.group()) #ebenso hier
	else:
		cp = 0
	
################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen, ob benotet oder nicht                         ##
##                                                                            ##
##                                                                            ##
################################################################################

	benotetfind = (re.search(klammerpattern, line)).group(1)
	benotet = (benotetfind == "benotet")

################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen des Themenmoduls                               ##
##                                                                            ##
##                                                                            ##
################################################################################

	for line in page:
		if (line.strip().endswith("Themenmodul:</p></td>")):
			break
	modul = attributeAsList(page.next()) #hier hab ich versucht, so unverständlich wie möglich zu sein

################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen der Lehrformen                                 ##
##                                                                            ##
##                                                                            ##
################################################################################

	for line in page:
		if (line.strip().endswith("Lehrform:</p></td>")):
			break
	lehrform = attributeAsList(page.next()) #hier hab ich versucht, so unverständlich wie möglich zu sein
	
################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen des Themenkomplexes                            ##
##                                                                            ##
##                                                                            ##
################################################################################

	for line in page:
		if (line.strip().endswith("Themenkomplex:</p></td>")):
			break
	themenkomplex = attributeAsList(page.next()) #hier hab ich versucht, so unverständlich wie möglich zu sein
	
################################################################################
##                                                                            ##
##                                                                            ##
##                    Erkennen des Vertiefungsgebiets                         ##
##                                                                            ##
##                                                                            ##
################################################################################

	for line in page:
		if (line.strip().endswith("Vertiefungsgebiet:</p></td>")):
			break
	vertiefung = attributeAsList(page.next()) #hier hab ich versucht, so unverständlich wie möglich zu sein
	
	return lv(nameLV=nameofLV, semester=semester, dozent=dozents, kennung=kennung, cp=cp, benotet=benotet, modul=modul, lehrform=lehrform, themenkomplex=themenkomplex, vertiefung=vertiefung)
	
def attributeAsList(line):
	found = re.search(attributepattern, line)
	result = found.group(1)
	result = result.split(",")
	for element in result:
		element = element.strip()
	return result

def extractCPandBenotet(line):
	pattern = re.compile(r"(\d+) \((.*?)\)")
	found = re.search(pattern, line)
	cp = int(found.group(1))
	benotet = (found.group(2) == "benotet")

def dozenten(line):
	dozentenpattern = re.compile(r'''	(?x)				#ignoriere Leerzeichen
										(?<=Dozent:\ <i>)	#Anfangs steht genau das
										.*?					#Dann die freien Zeichen (Dozenten)
										(?=
											((\(.*?\))		#Entweder Klammern
											|				#oder
											(\<br\ /\>)))	#ein Zeilenumbruch''')
	dozentenfind = re.search(dozentenpattern, line)
	dozents = dozentenfind.group()
	dozents = dozents.split(", ")
	dozentpattern = re.compile(r"(?<=>).*?(?=<)") #Einzelne Dozenten sind verlinkt
	
	result = []
	for dozent in dozents:
		if dozent.startswith("<"):
			dozentfind = re.search(dozentpattern, dozent)
			result.append((dozentfind.group()).strip())
		else:
			result.append(dozent.strip())
	
	return result

semester = raw_input("Please input the wanted semester: now OR (SS|WS)[0-9]{2}: ")

place = raw_input("Please input the name of the local file that the JSON dump should be written to: ")

dumpfile = open("./" + place, "w")

lvs = listOfLVs(URLsPerSemester(URLForSemester(semester)))

for lv in lvs:
	dumpfile.write(json.dumps(vars(lv), indent=4))

dumpfile.close()
