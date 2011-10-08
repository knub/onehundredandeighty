/*
 * NOTE: Please update semesterManager in js/logic.js as well, after updating this file
 *
 * This file must only be edited manually!
 */
var data = {
	android: {
		// check!
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
	aop: {
		// check!
		kurz: "AOP",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Dr.-Ing. Michael Haupt", "Malte Appeltauer"],
		nameLV: "Aspektorientiertes Programmieren"
	},
	beauty: {
		// check!
		kurz: "Beauty is<br />our Business",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Felix Naumann"],
		nameLV: "Beauty is our Business"
	},
	bs1: {
		// check!
		kurz: "BS I",
		lehrform: ["Vorlesung"],
		modul: ["Softwarebasissysteme"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "BS II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
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
		// check!
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
		// check!
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
	grafik1: {
		// check!
		kurz: "Computer-<br />grafik I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete", "Softwarebasissysteme"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Jürgen Döllner"],
		nameLV: "3D-Computergrafik I"
	},
	grafik2: {
		// check!
		kurz: "Computer-<br />grafik II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "DBS I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Felix Naumann", "Jana Bauckmann"],
		nameLV: "Datenbanksysteme I"
	},
	dbs2: {
		// check!
		kurz: "DBS II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 6,
		vorher: ["dbs1"],
		dozent: ["Prof. Dr. Felix Naumann"],
		nameLV: "Datenbanksysteme II"
	},
	designthinkingeinfuehrung: {
		// check!
		kurz: "Einführung<br />Design Thinking",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Softskills"],
		semester: ["SS11"],
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
		// check!
		kurz: "Design Thinking<br />Basic Track",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["SS11"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Ulrich Weinberg", "Dr. Claudia Nicolai"],
		nameLV: "Design Thinking Basic Track"
	},
	enterprise: {
		// check!
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
		// check!
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
		// check!
		kurz: "Fachenglisch<br />Level 1",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11"],
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
		// check!
		kurz: "Fachenglisch<br />Level 2",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: ["fachenglisch1"],
		dozent: ["Wolfgang Lüer"],
		nameLV: "Fachspezifisches Englisch (Level II)"
	},
	game: {
		// check!
		kurz: "Game<br />Programming",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Jürgen Döllner", "Jan Klimke"],
		nameLV: "Game Programming"
	},
	gds: {
		// check!
		kurz: "GdS",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "Graphics<br />Libraries",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Jürgen Döllner", "Juri Engel", "Matthias Trapp", "Tassilo Glander", "Martin Beck"],
		nameLV: "Multimedia/Graphics Library & System"
	},
	handsfeetdevices: {
		// check!
		kurz: "Hands, Feet<br />and Devices",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Patrick Baudisch"],
		nameLV: "Project Seminar Hands, Feet and Devices"
	},
	hciundergrad: {
		// check!
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
		// check!
		kurz: "HCI I",
		lehrform: ["Vorlesung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "HCI II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["HCT", "SAMT"],
		cp: 6,
		vorher: ["hci1"],
		dozent: ["Prof. Dr. Patrick Baudisch"],
		nameLV: "HCI: Building Interactive Devices and Computer Vision"
	},
	history: {
		// check!
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
		// check!
		kurz: "Internet-<br />Security",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 6,
		vorher: ["www"],
		dozent: ["Prof. Dr. Christoph Meinel"],
		nameLV: "Internet-Security - Weaknesses and Targets"
	},
	klubsprecher: {
		// check!
		kurz: "Klubsprecher",
		lehrform: [""],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11"],
		benotet: false,
		pflicht: false,
		empfohlen: "",
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: [],
		nameLV: "Klubsprechertätigkeit über mindestens zwei Semester"
	},
	mathematik1: {
		// check!
		kurz: "Mathematik I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Maria Siebert"],
		nameLV: "Mathematik I - Diskrete Strukturen und Logik"
	},
	mathematik2: {
		// check!
		kurz: "Mathematik II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["SS11"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 6,
		vorher: ["mathematik1"],
		dozent: ["Dr. habil. Ferdinand Börner"],
		nameLV: "Mathematik II"
	},
	mod1: {
		// check!
		kurz: "MOD I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwaretechnik und Modellierung"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "MOD II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwaretechnik und Modellierung"],
		semester: ["SS11"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 6,
		vorher: ["mod1"],
		dozent: ["Prof. Dr. Holger Giese", "Stefan Neumann"],
		nameLV: "Modellierung II"
	},
	modellgetriebenesoftwareentwicklung: {
		// check!
		kurz: "MDSD",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["SAMT"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Holger Giese", "Leen Lambers"],
		nameLV: "Grundlagen der modellgetriebenen Softwareentwicklung"
	},
	multimediaanalyse: {
		// check!
		kurz: "Multimedia<br />Analyse",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST", "OSIS", "HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Dr. rer. nat. Harald Sack", "Jörg Waitelonis", "Nadine Ludwig", "Magnus Knuth", "Lina Wolf"],
		nameLV: "Multimedia Analyse Technologien"
	},
	nosql: {
		// check!
		kurz: "NoSQL",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Felix Naumann", "Johannes Lorey"],
		nameLV: "NoSQL"
	},
	opensource: {
		// check!
		kurz: "Open-Source-<br />Projekte",
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
		// check!
		kurz: "PEM",
		lehrform: ["Seminar"],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11"],
		benotet: false,
		pflicht: true,
		empfohlen: "",
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Dr. Michaela Schumacher", "Andrea Bassen", "Corinna Ruppel"],
		nameLV: "Projektentwicklung und -management (PEM I und II)"
	},
	pois1: {
		// check!
		kurz: "POIS I",
		lehrform: ["Vorlesung", "Übung", "Projekt"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "POIS II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "SAMT"],
		cp: 6,
		vorher: ["pois1"],
		dozent: ["Prof. Dr. Mathias Weske", "Matthias Weidlich"],
		nameLV: "Prozessorientierte Informationssysteme II"
	},
	processapplications: {
		// check!
		kurz: "Process-<br />Based Apps",
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
		// check!
		kurz: "PT I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "PT II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["SS11"],
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
		// check!
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
		dozent: ["Prof. Dr. Christoph Meinel", "Maria Siebert", "Franka Moritz"],
		nameLV: "Qualitätssicherung in Web-Applikationen"
	},
	raeuberundgendarm: {
		// check!
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
		// check!
		kurz: "Recht I",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["SS11"],
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
		// check!
		kurz: "Recht II",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: true,
		empfohlen: 3,
		vertiefung: [""],
		cp: 3,
		vorher: ["recht1"],
		dozent: ["Dr. Timm Krohn"],
		nameLV: "Recht für Ingenieure II"
	},
	rfid: {
		// check!
		kurz: "RFID",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["BPET", "OSIS", "HCT"],
		cp: 6,
		vorher: [],
		dozent: ["Dr. Alexander Zeier", "Martin Lorenz", "Matthieu Schapranow"],
		nameLV: "Real-World Applications in RFID-Aided Supply Chains"
	},
	seo: {
		// check!
		kurz: "SEO",
		lehrform: ["Seminar", "Projekt"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Maria Siebert", "Franka Moritz"],
		nameLV: "SEO - Search Engine Optimization"
	},
	studiumplus: {
		// check!
		kurz: "StudiumPlus",
		lehrform: [""],
		modul: ["Softskills"],
		semester: ["WS10/11", "SS11"],
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
		// check!
		kurz: "SWA",
		lehrform: ["Vorlesung", "Projekt"],
		modul: ["Grundlagen IT-Systems Engineering"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: true,
		empfohlen: 3,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Dr.-Ing. Michael Haupt", "M. Perscheid", "R. Krahn"],
		nameLV: "Softwarearchitektur"
	},
	swt1: {
		// check!
		kurz: "SWT I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwaretechnik und Modellierung"],
		semester: ["SS11"],
		benotet: true,
		pflicht: true,
		empfohlen: 4,
		vertiefung: [""],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Robert Hirschfeld", "Michael Perscheid", "Robert Krahn", "Jens Lincke", "Bastian Steinert"],
		nameLV: "Softwaretechnik I"
	},
	swt2: {
		// check!
		kurz: "SWT II",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["SAMT"],
		cp: 6,
		vorher: ["swt1"],
		dozent: ["Dr. Alexander Zeier", "Jürgen Müller"],
		nameLV: "Softwaretechnik II"
	},
	ti1: {
		// check!
		kurz: "TI I",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["WS10/11"],
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
		// check!
		kurz: "TI II",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Mathematische und theoretische Grundlagen"],
		semester: ["SS11"],
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
		// check!
		kurz: "VHDL",
		lehrform: ["Vorlesung"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["OSIS", "SAMT"],
		cp: 6,
		vorher: ["gds"],
		dozent: ["Dr.-Ing. Ralf Wollowski"],
		nameLV: "Entwurf und Implementierung digitaler Schaltungen mit VHDL"
	},
	webservice: {
		// check!
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
		// check!
		kurz: "Wirtschaft I",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["WS10/11"],
		benotet: true,
		pflicht: true,
		empfohlen: 1,
		vertiefung: [""],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Jan Kratzer"],
		nameLV: "Wirtschaftliche Grundlagen I"
	},
	wirtschaft2: {
		// check!
		kurz: "Wirtschaft II",
		lehrform: ["Vorlesung"],
		modul: ["Rechtliche und wirtschaftliche Grundlagen"],
		semester: ["SS11"],
		benotet: true,
		pflicht: true,
		empfohlen: 2,
		vertiefung: [""],
		cp: 3,
		vorher: ["wirtschaft1"],
		dozent: ["Prof. Dr. Jan Kratzer"],
		nameLV: "Wirtschaftliche Grundlagen II"
	},
	workflow: {
		// check!
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
		// check!
		kurz: "WWW",
		lehrform: ["Vorlesung", "Übung"],
		modul: ["Softwarebasissysteme", "Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 6,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Christian Willems"],
		nameLV: "Internet- und WWW-Technologien"
	},
	wwwextra: {
		// check!
		kurz: "WWW –<br />weiterführend",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		benotet: true,
		pflicht: false,
		empfohlen: "",
		vertiefung: ["IST"],
		cp: 3,
		vorher: [],
		dozent: ["Prof. Dr. Christoph Meinel", "Christian Willems", "Maria Siebert"],
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
