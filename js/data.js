/*
 * NOTE: Please update semesterManager in js/logic.js as well, after updating this file
 *
 * This file must only be edited manually!
 * Remember to update 'Klubsprecher' and 'Studium Plus'!
 */

/*
 * Data structure for a course:
 *    kurz: Short text for the course. Make sure, it fits in the browser on the 1024px
 *    lehrform: "Seminar" or "Projekt" or "Vorlesung"
 *    modul: "Vertiefungsgebiete" is what you want in most cases here
 *    semester: semester string: (WS|SS)[0-9]{2}, e.g. WS11
 *    benotet: whether the you get a grade in this course which has effect
 *    pflicht: whether this course must be taken
 *    empfohlen: integer indicating in which course this semester is recommended
 *    vertiefung: array containing strings for the vertiefungsgebiete, "BPET"/"HCT"/"IST"/"OSIS"/"SAMT" alphabetically!
 *    cp: how much credit points you get for this course
 *    vorher: identifier/key of the course/s which must be taken before the current one, e.g. 'advancedmodularity'
 *    dozent: self explaining
 *    nameLV: long name
 */
var data = {
	advancedmodularity: {
		kurz: "Advanced<br />Modularity",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld"],
		nameLV: "Advanced Modularity"
	},
	algorithmischegeometrie: {
		kurz: "Algorithmische<br />Geometrie",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Jürgen Döllner"],
		nameLV: "Algorithmische Geometrie"
	},
	android: {
		kurz: "Android",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Felix Naumann", "Alexander Albrecht"],
		nameLV: "Mobile Computing with Android"
	},
	angewandtelogik: {
		kurz: "Angewandte <br />Logik",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12", "SS13"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Schaub"],
		nameLV: "Angewandte Logik"
	},
	aop: {
		kurz: "AOP",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Malte Appeltauer", "Marcel Taeumel"],
		nameLV: "Aspektorientiertes Programmieren"
	},
	beauty: {
		kurz: "Beauty is<br />our Business",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "HCT"],
		cp: 3,
		vorher: ["dbs1", "dbs2"],
		dozent: ["Prof. Dr. Felix Naumann"],
		nameLV: "Beauty is our Business"
	},
	bs1: {
		kurz: "BS I",
		lehrform: ["Vorlesung"],
		modul: ["Softwarebasissysteme"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 3,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Andreas Polze", "Dr. Peter Tröger"],
		nameLV: "Betriebssysteme"
	},
	bs2: {
		kurz: "BS II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS13"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 6,
		vorher: ["bs1"],
		dozent: ["Prof. Dr. Andreas Polze"],
		nameLV: "Betriebssysteme II"
	},
	cloud: {
		kurz: "Cloud<br />Computing",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Andreas Polze", "Dr. Peter Tröger"],
		nameLV: "Industrieseminar Cloud Computing"
	},
	collaboration: {
		kurz: "Collaboration<br />software",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Raja Gumienny", "Christian Willems", "Matthias Quasthoff", "Lutz Gericke"],
		nameLV: "User-centered development of collaboration software"
	},
	copsandrobbers: {
		kurz: "Cops &<br />Robbers",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "OSIS"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Dr. Feng Cheng"],
		nameLV: "Cops & Robbers"
	},
	grafik1: {
		kurz: "Computer-<br />grafik I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete", "Softwarebasissysteme"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT"],
		cp: 6,
		vorher: ["mathematik1", "pt1"],
		dozent: ["Prof. Dr. Jürgen Döllner"],
		nameLV: "3D-Computergrafik I"
	},
	grafik2: {
		kurz: "Computer-<br />grafik II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT"],
		cp: 6,
		vorher: ["grafik1"],
		dozent: ["Prof. Dr. Jürgen Döllner", "Matthias Trapp", "Christine Lehmann", "Semmo Amir", "Jan Eric Kyprianidis", "Dieter Hildebrandt"],
		nameLV: "Computergrafik II"
	},
	dbs1: {
		kurz: "DBS I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Felix Naumann"],
		nameLV: "Datenbanksysteme I"
	},
	dbs2: {
		kurz: "DBS II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "OSIS"],
		cp: 6,
		vorher: ["dbs1"],
		dozent: ["Prof. Dr. Felix Naumann"],
		nameLV: "Datenbanksysteme II"
	},
	designthinkingeinfuehrung: {
		kurz: "Einführung<br />Design Thinking",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Softskills"],
		semester: ["SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Ulrich Weinberg", "Dr. Claudia Nicolai"],
		nameLV: "Einführung in das Design Thinking"
	},
	designthinkingbasic: {
		kurz: "D-School<br />Basic Track",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Softskills"],
		semester: ["SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Ulrich Weinberg", "Dr. Claudia Nicolai"],
		nameLV: "D-School Basic Track"
	},
	designthinkingadvanced: {
		kurz: "D-School<br />Advanced Track",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Softskills"],
		semester: ["WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Ulrich Weinberg", "Dr. Claudia Nicolai"],
		nameLV: "D-School Advanced Track"
	},
	enterprise: {
		kurz: "Enterprise<br />Software",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET"],
		cp: 3,
		vorher: [],
		dozent: ["Dr. Alexander Zeier", "Oleksandr Panchenko", "Vadym Borovski"],
		nameLV: "Basics of On-premise and On-demand Enterprise Software"
	},
	eworld: {
		kurz: "eWorld",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Björn Schünemann"],
		nameLV: "eWorld-Open Source Verkehrssimulation-Tool"
	},
	fachenglisch1: {
		kurz: "Fachenglisch<br />Level 1",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Wolfgang Lüer"],
		nameLV: "Fachspezifisches Englisch (Level I)"
	},
	fachenglisch2: {
		kurz: "Fachenglisch<br />Level 2",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Wolfgang Lüer"],
		nameLV: "Fachspezifisches Englisch (Level II)"
	},
	game: {
		kurz: "Game<br />Programming",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "OSIS", "SAMT"],
		cp: 6,
		vorher: ["grafik1"],
		dozent: ["Prof. Dr. Jürgen Döllner", "Jan Klimke", "Martin Beck", "Sebastian Pasewaldt", "Juri Engel", "Stefan Buschmann"],
		nameLV: "Game Programming"
	},
	gds: {
		kurz: "GdS",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Dr.-Ing. Ralf Wollowski"],
		nameLV: "Grundlagen digitaler Systeme"
	},
	graphicslibraries: {
		kurz: "Graphics<br />Libraries",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT"],
		cp: 6,
		vorher: ["mathematik1", "pt1"],
		dozent: ["Prof. Dr. Jürgen Döllner", "Juri Engel", "Matthias Trapp", "Tassilo Glander", "Martin Beck"],
		nameLV: "Multimedia/Graphics Library & System"
	},
	hciproject: {
		kurz: "HCI Project<br />Seminar",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Patrick Baudisch"],
		nameLV: "HCI Project Seminar mit wechselnden Themen"
	},
	hciundergrad: {
		kurz: "HCI<br />Undergrad",
		lehrform: ["Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Patrick Baudisch"],
		nameLV: "HCI Undergrad Project: 3D Games and Interactive Floors"
	},
	hci1: {
		kurz: "HCI I",
		lehrform: ["Vorlesung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Patrick Baudisch"],
		nameLV: "HCI1: Designing Interactive Systems"
	},
	hci2: {
		kurz: "HCI II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT", "OSIS"],
		cp: 6,
		vorher: ["hci1"],
		dozent: ["Prof. Dr. Patrick Baudisch"],
		nameLV: "HCI: Building Interactive Devices and Computer Vision"
	},
	history: {
		kurz: "History",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Malte Appeltauer", "Felix Geller"],
		nameLV: "History of Programming Languages"
	},
	internetsecurity: {
		kurz: "Internet–<br />Security",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "OSIS"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Dr. Christian Willems", "Dr. Feng Cheng"],
		nameLV: "Internet-Security - Weaknesses and Targets"
	},
	klubsprecher: {
		kurz: "Klubsprecher",
		lehrform: [""],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: [],
		nameLV: "Klubsprechertätigkeit über mindestens zwei Semester"
	},
	kuenstlicheintelligenz: {
		kurz: "KI",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "IST", "BPET"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Schaub"],
		nameLV: "Einführung in die Künstliche Intelligenz"
	},
	mainframe: {
		kurz: "Mainframe<br />Computing",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "IST", "OSIS"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Andreas Polze"],
		nameLV: "Mainframe Computing (Blockseminar)"
	},
	mathematik1: {
		kurz: "Mathematik I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel"],
		nameLV: "Mathematik I - Diskrete Strukturen und Logik"
	},
	mathematik2: {
		kurz: "Mathematik II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Dr. habil. Ferdinand Börner"],
		nameLV: "Mathematik II"
	},
	mod1: {
		kurz: "MOD I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwaretechnik und Modellierung"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Holger Giese", "Stephan Hildebrandt"],
		nameLV: "Modellierung I"
	},
	mod2: {
		kurz: "MOD II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwaretechnik und Modellierung"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 6,
		vorher: ["mod1"],
		dozent: ["Prof. Dr. Holger Giese", "Stefan Neumann", "Dr. Christian Krause"],
		nameLV: "Modellierung II"
	},
	modellgetriebenesoftwareentwicklung: {
		kurz: "MDSD",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["SAMT"],
		cp: 3,
		vorher: ["mod1", "mod2"],
		dozent: ["Prof. Dr. Holger Giese", "Leen Lambers"],
		nameLV: "Grundlagen der modellgetriebenen Softwareentwicklung"
	},
	multimediaanalyse: {
		kurz: "Multimedia<br />Analyse",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "IST", "OSIS"],
		cp: 6,
		vorher: [],
		dozent: ["Dr. rer. nat. Harald Sack"],
		nameLV: "Multimedia Analyse Technologien"
	},
	nosql: {
		kurz: "NoSQL",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 3,
		vorher: ["dbs1", "dbs2"],
		dozent: ["Prof. Dr. Felix Naumann", "Johannes Lorey"],
		nameLV: "NoSQL"
	},
	opensource: {
		kurz: "Open-Source–<br />Projekte",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Dr. Martin von Löwis"],
		nameLV: "Entwicklungsprozesse in Open-Source-Projekten"
	},
	pem: {
		kurz: "PEM",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: true,
		empfohlen: "",
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Dr. Michaela Schumacher", "Andrea Bassen", "Corinna Ruppel"],
		nameLV: "Projektentwicklung und -management (PEM I und II)"
	},
	personalausweis: {
		kurz: "Personalausweis",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Dr. Marian Margraf", "Maxim Schnjakin"],
		nameLV: "Der neue Personalausweis: Konzept und Umsetzung"
	},
	pois1: {
		kurz: "POIS I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Mathias Weske"],
		nameLV: "Prozessorientierte Informationssysteme I"
	},
	pois2: {
		kurz: "POIS II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "SAMT"],
		cp: 6,
		vorher: ["pois1"],
		dozent: ["Prof. Dr. Mathias Weske"],
		nameLV: "Prozessorientierte Informationssysteme II"
	},
	praesentieren: {
		kurz: "Überzeugend<br />Präsentieren",
		lehrform: ["Blockseminar"],
		modul: ["Softskills"],
		semester: ["WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["René Borbonus"],
		nameLV: "Überzeugend Präsentieren"
	},
	processapplications: {
		kurz: "Process–<br />Based Apps",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Mathias Weske", "Matthias Kunze"],
		nameLV: "Usability of Process-Based Applications"
	},
	pt1: {
		kurz: "PT I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Dr. Martin von Löwis"],
		nameLV: "Einführung in die Programmiertechnik I"
	},
	pt2: {
		kurz: "PT II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 6,
		vorher: ["pt1"],
		dozent: ["Dr. Martin von Löwis"],
		nameLV: "Einführung in die Programmiertechnik II"
	},
	qualitaetssicherunginwebapps: {
		kurz: "Qualität<br />in Web-Apps",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Franka Moritz"],
		nameLV: "Qualitätssicherung in Web-Applikationen"
	},
	raeuberundgendarm: {
		kurz: "Räuber und<br />Gendarm",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Dr. Feng Cheng"],
		nameLV: '"Räuber und Gendarm" (CTF-Szenarien)'
	},
	recht1: {
		kurz: "Recht I",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Dr. Timm Krohn"],
		nameLV: "Recht für Ingenieure I"
	},
	recht2: {
		kurz: "Recht II",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 3,
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Dr. Timm Krohn"],
		nameLV: "Recht für Ingenieure II"
	},
	rfid: {
		kurz: "RFID",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "HCT", "OSIS"],
		cp: 6,
		vorher: [],
		dozent: ["Dr. Alexander Zeier", "Martin Lorenz", "Matthieu Schapranow"],
		nameLV: "Real-World Applications in RFID-Aided Supply Chains"
	},
	seo: {
		kurz: "SEO",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "OSIS"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Haojin Yang"],
		nameLV: "SEO - Search Engine Optimization"
	},
	soa: {
		kurz: "SOA",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "BPET"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Ivonne Thomas"],
		nameLV: "SOA- und Cloud-Standards, Praktische Anwendungen"
	},
	studiumplus: {
		kurz: "StudiumPlus",
		lehrform: [""],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11", "WS11/12", "SS12"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: [""],
		nameLV: "StudiumPlus"
	},
	swa: {
		kurz: "SWA",
		lehrform: ["Vorlesung", "Projekt"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 3,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Michael Perscheid", "Dr. Damien Cassou", "Dr. Jens Lincke", "Bastian Steinert"],
		nameLV: "Softwarearchitektur"
	},
	swt1: {
		kurz: "SWT I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwaretechnik und Modellierung"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: true,
		empfohlen: 4,
		vertiefung: [""],
		cp: 6,
		vorher: ["swa"],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Michael Perscheid"],
		nameLV: "Softwaretechnik I"
	},
	swt2: {
		kurz: "SWT II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "OSIS", "SAMT"],
		cp: 6,
		vorher: ["swt1"],
		dozent: ["Dr. Alexander Zeier", "Thomas Kowark", "Stephan Müller", "Martin Lorenz"],
		nameLV: "Softwaretechnik II"
	},
	ti1: {
		kurz: "TI I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 3,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Kreitz"],
		nameLV: "Theoretische Informatik I"
	},
	ti2: {
		kurz: "TI II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: true,
		empfohlen: 4,
		vertiefung: [""],
		cp: 6,
		vorher: ["ti1"],
		dozent: ["Prof. Dr. Christoph Kreitz"],
		nameLV: "Theoretische Informatik II"
	},
	vhdl: {
		kurz: "VHDL",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "SAMT"],
		cp: 6,
		vorher: ["gds"],
		dozent: ["Dr.-Ing. Ralf Wollowski"],
		nameLV: "Entwurf und Implementierung digitaler Schaltungen mit VHDL"
	},
	webmobile: {
		kurz: "Mobile<br />Web",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "IST"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Christian Willems"],
		nameLV: "Web-Programmierung für mobile Endgeräte"
	},
	webzwonull: {
		kurz: "Web 2.0",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS11/12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "IST", "SAMT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Christian Willems", "Matthias Bauer", "Rafiee Hosnieh", "Tacio Santos"],
		nameLV: "Web-Programmierung und Web 2.0-Technologien"
	},
	webservice: {
		kurz: "Web<br />Services",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Robert Warschofsky", "Ivonne Thomas"],
		nameLV: "Web Service Technologien"
	},
	wirtschaft1: {
		kurz: "Wirtschaft I",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["WS10/11", "WS11/12"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Katharina Hölzle"],
		nameLV: "Wirtschaftliche Grundlagen I"
	},
	wirtschaft2: {
		kurz: "Wirtschaft II",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["SS11"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Katharina Hölzle"],
		nameLV: "Wirtschaftliche Grundlagen II"
	},
	workflow: {
		kurz: "Workflow–<br />Anwendungen",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "SAMT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Mathias Weske"],
		nameLV: "Entwicklung von Workflow-Anwendungen"
	},
	www: {
		kurz: "WWW",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Christian Willems"],
		nameLV: "Internet- und WWW-Technologien"
	},
	wwwextra: {
		kurz: "WWW – <br />weiterführend",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11", "SS12"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "OSIS", "SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Christian Willems"],
		nameLV: "Weiterführende Themen zu Internet- und WWW-Technologien"
	}
};
/* Debugging data, to be removed when life */

/*
data['hci2'].empfohlen = 3;
data['pois2'].empfohlen = 3;
data['wwwextra'].empfohlen = 3;
data['android'].empfohlen = 3;
data['dbs2'].empfohlen = 3;
*/

/*
data['fachenglisch1'].empfohlen = 1;
data['pem'].empfohlen = 2;

data['dbs1'].empfohlen = 2;
data['www'].empfohlen = 4;
data['hci1'].empfohlen = 3;

data['dbs2'].empfohlen = 3; // 6 OSIS
//data['internetsecurity'].empfohlen = 4;		// 6 IST
data['wwwextra'].empfohlen = 4; // 3 IST
data['beauty'].empfohlen = 4; // 3 OSIS
data['collaboration'].empfohlen = 3; // 6 IST
data['raeuberundgendarm'].empfohlen = 4; // 6 IST
data['pois2'].empfohlen = 5;
data['pois1'].empfohlen = 5;
data['rfid'].empfohlen = 5;
*/

/* Studienbegleitendes Seminar?*/
