import urllib2
import sys
import json

class lv:
	def __init__(self, name="", kennung="", dozent="", cp=0, benotet=False, modul=[], lehrform=[], themenkomplex=[], vertiefung=[], semester=""):
		self.name = name
		self.kennung = kennung
		self.dozent = dozent
		self.cp = cp
		self.benotet = benotet
		self.modul = modul
		self.lehrform = lehrform
		self.themenkomplex = themenkomplex
		self.vertiefung = vertiefung
		self.semester = semester
	
	def toJSON(self):
		return json.dump(self)

semester = raw_input("Please input the wanted semester: now OR [SS|WS][0-9]{2}  ")

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

def parse(url):
	site = urllib2.urlopen(url)

for line in site:
	if (line.strip().startswith("</div><h1>Bachelorstudium IT-Systems Engineering</h1>")):
		break

for line in site:
	if (line.strip().startswith('<td style="width: 300px; paddi')):
		break

line = str(site.next())

rows = line.split("<tr>")

urls = []

for row in rows:
	
