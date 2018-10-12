/**
 * Note: This file was generated automatically, and will be
 * overwritten the next time "/parser/update.py" is executed.
 *
 *
 * DO NOT CHANGE THE DATA HERE!
 *
 * Instead, adjust "extractor.py" to correctly modify
 * the data while parsing.
 * 
 * 
 * Also make sure to keep "/js/logic.js" up to date
 * (especially the semesterManager)
 */

// semester name variables
const ss15    = "SS15",
      ws15_16 = "WS15/16",
      ss16    = "SS16",
      ws16_17 = "WS16/17",
      ss17    = "SS17",
      ws17_18 = "WS17/18",
      ss18    = "SS18",
      ws18_19 = "WS18/19";

// Vertiefungsgebiet name variables
const OSIS = "OSIS",
      SAMT = "SAMT",
      ISAE = "ISAE",
      HCGT = "HCGT",
      BPET = "BPET";

// actual data object
const data = {
    algoriddles: {
        kurz: "AlgoRiddles",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 3,
        dozent: ["Dr. Pascal Lenzner", "Dr. Timo Kötzing", "Prof. Dr. Tobias Friedrich"],
        nameLV: "Algorithmic Problem Solving",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-algorithmic-problem-solving.html",
        specific: {
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-algorithmic-problem-solving-1.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-algorithmic-problem-solving.html",
            },
        }
    },
    aspektorientierteprogrammierung: {
        kurz: "Aspektorientierte<br />Programmierung",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS, SAMT],
        cp: 3,
        dozent: ["Prof. Dr. Robert Hirschfeld"],
        nameLV: "Aspektorientierte Programmierung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-aspektorientierte-programmierung.html",
        specific: {}
    },
    bdanalytics: {
        kurz: "BD Analytics",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["SB2", "Vertiefungsgebiete"],
        semester: [ws15_16, ws16_17, ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: [],
        nameLV: "Big Data Analytics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-big-data-analytics.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-big-data-analytics.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-big-data-analytics.html",
            },
        }
    },
    bdanalyticslab: {
        kurz: "BD Analytics Lab",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Thomas Goerttler"],
        nameLV: "Big Data Analytics Lab",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-big-data-analytics-lab.html",
        specific: {
            SS17: {
                dozent: [],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-big-data-analytics-lab.html",
            },
            SS16: {
                dozent: [],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-big-data-analytics-lab.html",
            },
        }
    },
    bdsecurityanalytics: {
        kurz: "BD Security Analytics",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 6,
        dozent: ["Dr. Feng Cheng", "Pejman Najafi"],
        nameLV: "Big Data Security Analytics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-big-data-security-analytics.html",
        specific: {
            WS17: {
                dozent: ["Dr. Feng Cheng", "Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-big-data-security-analytics.html",
            },
        }
    },
    beautifuldata: {
        kurz: "Beautiful Data",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 3,
        dozent: ["Prof. Dr. Felix Naumann"],
        nameLV: "Beautiful Data",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-beautiful-data.html",
        specific: {}
    },
    bildundvideoprozessierung: {
        kurz: "Bild- und<br />Videoprozessierung",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Dr. Matthias Trapp"],
        nameLV: "Bild- und Videoprozessierung mit OpenGL ES für Mobile Geräte",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-bild-und-videoprozessierung-mit-opengl-es-fuer-mobile-geraete.html",
        specific: {}
    },
    blockkursibmpowersystems: {
        kurz: "Blockkurs \"IBM<br />Power Systems\"",
        lehrform: ["Blockseminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS],
        cp: 6,
        dozent: ["Prof. Dr. Andreas Polze"],
        nameLV: "Blockkurs \\&quot;IBM Power Systems\\&quot;",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-blockkurs-ibm-power-systems.html",
        specific: {}
    },
    bpminthecloud: {
        kurz: "BPM in the Cloud",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Adriatik Nikaj", "Marcin Hewelt", "Prof. Dr. Mathias Weske"],
        nameLV: "BPM in the Cloud: From t.BPM and App development",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-bpm-in-the-cloud-from-tbpm-and-app-development.html",
        specific: {}
    },
    bs: {
        kurz: "BS",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["BS"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 3,
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Andreas Polze"],
        nameLV: "Betriebssysteme I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-betriebssysteme-i.html",
        specific: {
            WS15: {
                lehrform: ["Vorlesung"],
                dozent: ["Dipl.-Inf. Bernhard Rabe", "Prof. Dr. Andreas Polze"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-betriebssysteme.html",
                nameLV: "Betriebssysteme",
            },
            WS17: {
                lehrform: ["Vorlesung"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-betriebssysteme-1.html",
                nameLV: "Betriebssysteme 1",
            },
            WS16: {
                lehrform: ["Vorlesung"],
                dozent: ["Andreas Grapentin", "Daniel Richter", "Dipl.-Inf. Bernhard Rabe", "Prof. Dr. Andreas Polze"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-betriebssysteme.html",
                nameLV: "Betriebssysteme",
            },
        }
    },
    bs2: {
        kurz: "BS II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS],
        cp: 6,
        dozent: ["Andreas Grapentin", "Prof. Dr. Andreas Polze", "Sven Köhler"],
        nameLV: "Betriebssysteme II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-betriebssysteme-ii.html",
        specific: {
            SS15: {
                dozent: ["Prof. Dr. Andreas Polze"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-betriebssysteme-ii.html",
            },
            SS17: {
                dozent: ["Andreas Grapentin", "Frank Feinbube", "Prof. Dr. Andreas Polze"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-betriebssysteme-ii.html",
            },
            SS16: {
                dozent: ["Frank Feinbube", "Prof. Dr. Andreas Polze"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-betriebssysteme-ii.html",
            },
        }
    },
    businesseventprocessing: {
        kurz: "Business Event Processing",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16, ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Dr. Luise Pufahl", "Kimon Batoulis"],
        nameLV: "Business Event Processing",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-business-event-processing.html",
        specific: {
            SS16: {
                dozent: ["Dr. Luise Pufahl", "Kimon Batoulis", "Prof. Dr. Mathias Weske"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-business-event-processing.html",
            },
        }
    },
    businessprocesssimulation: {
        kurz: "Business Process<br />Simulation",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Dr. Luise Pufahl", "Prof. Dr. Mathias Weske"],
        nameLV: "Business Process Simulation",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-business-process-simulation.html",
        specific: {}
    },
    bva: {
        kurz: "BVA",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Dr. Matthias Trapp"],
        nameLV: "Bildverarbeitungsalgorithmen",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-bildverarbeitungsalgorithmen.html",
        specific: {}
    },
    cg1: {
        kurz: "CG I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["SB1"],
        semester: [ss15, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "3D-Computergrafik I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-3d-computergrafik-i.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-3d-computergrafik-i.html",
            },
            WS17: {
                dozent: ["Dr. Matthias Trapp"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-3d-computergrafik-i.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-3d-computergrafik-i.html",
            },
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-3d-computergrafik-i.html",
            },
        }
    },
    cg2: {
        kurz: "CG II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Andreas Fricke", "Jan Ole Vollmer", "Prof. Dr. Jürgen Döllner", "Vladeta Stojanovic"],
        nameLV: "3D-Computergrafik II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-3d-computergrafik-ii.html",
        specific: {
            SS17: {
                dozent: ["Prof. Dr. Jürgen Döllner"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-3d-computergrafik-ii.html",
            },
            SS16: {
                dozent: ["Prof. Dr. Jürgen Döllner"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-3d-computergrafik-ii.html",
            },
        }
    },
    clientseitigewebprogrammierung: {
        kurz: "Clientseitige<br />Webprogrammierung",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Clientseitige Webprogrammierung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-clientseitige-webprogrammierung.html",
        specific: {}
    },
    complexeventprocessing: {
        kurz: "Complex Event Processing",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Kimon Batoulis", "Prof. Dr. Mathias Weske"],
        nameLV: "Complex Event Processing",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-complex-event-processing.html",
        specific: {}
    },
    compprog: {
        kurz: "CompProg",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Dr. Pascal Lenzner", "Prof. Dr. Tobias Friedrich"],
        nameLV: "Competitive Programming",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-competitive-programming.html",
        specific: {
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-competitive-programming.html",
            },
            SS16: {
                cp: 3,
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-competitive-programming.html",
            },
        }
    },
    copsandrobbers: {
        kurz: "Cops and Robbers",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Dr. Feng Cheng", "Prof. Dr. Christoph Meinel"],
        nameLV: "Cops and Robbers",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-cops-and-robbers.html",
        specific: {
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-cops-and-robbers.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-cops-and-robbers.html",
            },
        }
    },
    dataengineeringinderpraxis: {
        kurz: "Data Engineering<br />in der Praxis",
        lehrform: ["Vorlesung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 3,
        dozent: ["Dr. Matthias Uflacker", "Dr. Ralf Krestel", "Prof. Dr. Felix Naumann"],
        nameLV: "Data Engineering in der Praxis - Ringvorlesung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-data-engineering-in-der-praxis-ringvorlesung-1.html",
        specific: {}
    },
    dbs1: {
        kurz: "DBS I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["SB2", "Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS],
        cp: 6,
        dozent: ["Dr. Ralf Krestel", "Leon Bornemann"],
        nameLV: "Datenbanksysteme I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-datenbanksysteme-i.html",
        specific: {
            SS15: {
                dozent: ["Prof. Dr. Felix Naumann"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-datenbanksysteme-i.html",
            },
            SS17: {
                dozent: ["Prof. Dr. Felix Naumann", "Thorsten Papenbrock"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-datenbanksysteme-i.html",
            },
            SS16: {
                dozent: ["Dr. Ralf Krestel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-datenbanksysteme-i.html",
            },
        }
    },
    dbs2: {
        kurz: "DBS II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Leon Bornemann", "Prof. Dr. Felix Naumann"],
        nameLV: "Datenbanksysteme II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-datenbanksysteme-ii.html",
        specific: {
            WS15: {
                dozent: ["Prof. Dr. Felix Naumann"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-datenbanksysteme-ii.html",
            },
            WS17: {
                dozent: ["Prof. Dr. Felix Naumann"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-datenbanksysteme-ii.html",
            },
        }
    },
    digitalebildverarbeitung: {
        kurz: "Digitale Bildverarbeitung",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, ISAE, OSIS],
        cp: 6,
        dozent: ["Amir Semmo", "Dr. Matthias Trapp"],
        nameLV: "Digitale Bildverarbeitung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-digitale-bildverarbeitung.html",
        specific: {}
    },
    diskretestrukturen: {
        kurz: "Diskrete Strukturen",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 3,
        dozent: ["Dr. Timo Kötzing", "Prof. Dr. Tobias Friedrich"],
        nameLV: "Diskrete Strukturen",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-diskrete-strukturen.html",
        specific: {}
    },
    dschooladvancedtrack: {
        kurz: "D-School Advanced Track",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 9,
        dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
        nameLV: "D-School Advanced Track",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-d-school-advanced-track.html",
        specific: {
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20172018-d-school-advanced-track.html",
            },
            SS18: {
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg", "Stefanie Gerken"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-d-school-advanced-track.html",
            },
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-d-school-advanced-track.html",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-d-school-advanced-track.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-d-school-advanced-track.html",
            },
        }
    },
    dschoolbasictrack: {
        kurz: "D-School Basic Track",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 9,
        dozent: ["Christian Smirnow", "Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
        nameLV: "D-School Basic Track",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-d-school-basic-track.html",
        specific: {
            WS15: {
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-d-school-basic-track.html",
            },
            WS17: {
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-d-school-basic-track.html",
            },
            SS18: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-d-school-basic-track.html",
            },
            SS15: {
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-d-school-basic-track.html",
            },
            SS17: {
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-d-school-basic-track.html",
            },
            SS16: {
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-d-school-basic-track.html",
            },
        }
    },
    dschoolfirsttrack: {
        kurz: "D-School First Track",
        lehrform: ["Projekt:", "Seminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg", "Samuel Tschepe"],
        nameLV: "D-School First Track: Introduction to Design Thinking: Bring Ideas to Life",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-d-school-first-track-introduction-to-design-thinking-bring-ideas-to-life.html",
        specific: {
            WS15: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-d-school-first-track-introduction-to-design-thinking.html",
                nameLV: "D-School First Track: Introduction to Design Thinking",
            },
            WS17: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-d-school-first-track-introduction-to-design-thinking-from-inspiration-to.html",
                nameLV: "D-School First Track: Introduction to Design Thinking. From Inspiration to Ideas",
            },
            WS16: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-d-school-first-track-introduction-to-design-thinking.html",
                nameLV: "D-School First Track: Introduction to Design Thinking",
            },
            SS15: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-d-school-first-track-introduction-to-design-thinking.html",
                nameLV: "D-School First Track: Introduction to Design Thinking",
            },
            SS17: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Claudia Nicolai", "Jeremias Schmitt", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-d-school-first-track-introduction-to-design-thinking-bring-ideas-to-life.html",
                nameLV: "D-School First Track: Introduction to Design Thinking. Bring Ideas to Life",
            },
            SS16: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-d-school-first-track-introduction-to-design-thinking.html",
                nameLV: "D-School First Track: Introduction to Design Thinking",
            },
        }
    },
    einfuehrungindiealgorithmik: {
        kurz: "Einführung in<br />die Algorithmik",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Dr. Pascal Lenzner", "Prof. Dr. Tobias Friedrich"],
        nameLV: "Einführung in die Algorithmik",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-einfuehrung-in-die-algorithmik.html",
        specific: {}
    },
    einfuehrunginformationsvisualisierung: {
        kurz: "Einführung<br />Informationsvisualisierung",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "Einführung Informationsvisualisierung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-einfuehrung-informationsvisualisierung.html",
        specific: {}
    },
    einfuehrunginsoftwareanalytics: {
        kurz: "Einführung in<br />Software Analytics",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 3,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "Einführung in Software Analytics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-einfuehrung-in-software-analytics.html",
        specific: {}
    },
    einfuehrunginvisualanalytics: {
        kurz: "Einführung in<br />Visual Analytics",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "Einführung in Visual Analytics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-einfuehrung-in-visual-analytics.html",
        specific: {}
    },
    englischlevel1: {
        kurz: "Englisch (Level 1)",
        lehrform: ["Seminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["David Meier"],
        nameLV: "Fachspezifisches Englisch (Level 1)",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-fachspezifisches-englisch-level-1.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-fachspezifisches-englisch-level-1.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-fachspezifisches-englisch-level-1.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-fachspezifisches-englisch-level-1.html",
            },
            SS18: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-fachspezifisches-englisch-level-1.html",
            },
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-fachspezifisches-englisch-level-1.html",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-fachspezifisches-englisch-level-1.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-fachspezifisches-englisch-level-1.html",
            },
        }
    },
    englischlevel2: {
        kurz: "Englisch (Level 2)",
        lehrform: ["Seminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["David Meier"],
        nameLV: "Fachspezifisches Englisch (Level 2)",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-fachspezifisches-englisch-level-2.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-fachspezifisches-englisch-level-2.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-fachspezifisches-englisch-level-2.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-fachspezifisches-englisch-level-2.html",
            },
            SS18: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-fachspezifisches-englisch-level-2.html",
            },
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-fachspezifisches-englisch-level-2.html",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-fachspezifisches-englisch-level-2.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-fachspezifisches-englisch-level-2.html",
            },
        }
    },
    eventdrivencasemanagement: {
        kurz: "Event-driven<br />Case Management",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Marcin Hewelt", "Prof. Dr. Matthias Weidlich"],
        nameLV: "Event-driven Case Management",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-event-driven-case-management.html",
        specific: {}
    },
    gamesoflife: {
        kurz: "Games of Life",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Daniel Limberger", "Prof. Dr. Jürgen Döllner", "Willy Scheibel"],
        nameLV: "Games of Life",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-games-of-life.html",
        specific: {}
    },
    gds: {
        kurz: "GdS",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Grundlagen IT-Systems Engineering"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 1,
        vertiefung: [],
        cp: 6,
        dozent: ["Dr.-Ing. Ralf Wollowski"],
        nameLV: "Grundlagen digitaler Systeme",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-grundlagen-digitaler-systeme.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-grundlagen-digitaler-systeme.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-grundlagen-digitaler-systeme.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-grundlagen-digitaler-systeme.html",
            },
        }
    },
    grafikprogramming: {
        kurz: "Grafikprogramming",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, ISAE],
        cp: 6,
        dozent: ["Daniel Limberger", "Prof. Dr. Jürgen Döllner"],
        nameLV: "Grafikprogramming mit OpenGL und C++",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-grafikprogramming-mit-opengl-und-c.html",
        specific: {}
    },
    graphentheorie: {
        kurz: "Graphentheorie",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 3,
        dozent: ["Prof. Dr. Tobias Friedrich"],
        nameLV: "Graphentheorie",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-graphentheorie.html",
        specific: {}
    },
    grundlagenderlogikundberechenbarkeit: {
        kurz: "Grundlagen der Logik<br />und Berechenbarkeit",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Dr. Timo Kötzing"],
        nameLV: "Grundlagen der Logik und Berechenbarkeit",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-grundlagen-der-logik-und-berechenbarkeit.html",
        specific: {}
    },
    handsoncodingexercisesinlargescalelearni: {
        kurz: "Hands-On Coding Exercises<br />in Large Scale Learni...",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Hands-On Coding Exercises in Large Scale Learning Environments",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-hands-on-coding-exercises-in-large-scale-learning-environments.html",
        specific: {}
    },
    hci1: {
        kurz: "HCI I",
        lehrform: ["Vorlesung"],
        modul: ["SB4", "Vertiefungsgebiete"],
        semester: [ss18, ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "Designing Interactive Systems",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-designing-interactive-systems.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-designing-interactive-systems.html",
            },
        }
    },
    hci2: {
        kurz: "HCI II",
        lehrform: ["Vorlesung"],
        modul: ["SB4", "Vertiefungsgebiete"],
        semester: [ss15, ss17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "Building Interactive Devices",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-building-interactive-devices.html",
        specific: {
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-building-interactive-devices.html",
            },
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-hci-building-interactive-devices-and-computer-vision.html",
                nameLV: "HCI: Building Interactive Devices and Computer Vision",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-building-interactive-devices-1.html",
            },
        }
    },
    hcipsaugmentrealityvirtualrealityand: {
        kurz: "[HCI PS] Augment Reality,<br />Virtual Reality, and ...",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar Augment Reality, Virtual Reality, and Personal Fabrication",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-hci-project-seminar-augment-reality-virtual-reality-and-personal-fabrication.html",
        specific: {}
    },
    hcipsbuildinginteractivesystemsbasedon: {
        kurz: "[HCI PS] Building Interactive<br />Systems based on ...",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar: Building Interactive Systems based on Fabrication and Haptics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-hci-project-seminar-building-interactive-systems-based-on-fabrication-and.html",
        specific: {}
    },
    hcipsbuildinginteractivesystemsfrom3dp: {
        kurz: "[HCI PS] Building Interactive<br />Systems from 3D-P...",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar on Building Interactive Systems from 3D-Printers",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-hci-project-seminar-on-building-interactive-systems-from-3d-printers.html",
        specific: {}
    },
    hcipspersonalfabricationandhaptics: {
        kurz: "[HCI PS] Personal<br />Fabrication and Haptics",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar Personal Fabrication and Haptics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-hci-project-seminar-personal-fabrication-and-haptics.html",
        specific: {}
    },
    hcipspersonalfabricationandinteraction: {
        kurz: "[HCI PS] Personal<br />Fabrication and Interaction",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar Personal Fabrication and Interaction",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-hci-project-seminar-personal-fabrication-and-interaction.html",
        specific: {}
    },
    hcipspersonalfabricationvitualreality: {
        kurz: "[HCI PS] Personal Fabrication,<br />Vitual reality, ...",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar: Personal Fabrication, Vitual reality, and Haptics",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-hci-project-seminar-personal-fabrication-vitual-reality-and-haptics.html",
        specific: {}
    },
    hcipsroboticscodeand3dprinting: {
        kurz: "[HCI PS] Robotics,<br />Code, and 3D Printing",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar on Robotics, Code, and 3D Printing",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-hci-project-seminar-on-robotics-code-and-3d-printing.html",
        specific: {}
    },
    hcipsvirtualreality3dprintingand3d1: {
        kurz: "[HCI PS] Virtual Reality,<br />3D Printing, and 3D I...",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Patrick Baudisch"],
        nameLV: "HCI Project Seminar on Virtual Reality, 3D Printing, and 3D Interaction",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-hci-project-seminar-on-virtual-reality-3d-printing-and-3d-interaction.html",
        specific: {}
    },
    historyofprogramminglanguages: {
        kurz: "History of<br />Programming Languages",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [SAMT],
        cp: 3,
        dozent: ["Johannes Henning", "Marcel Taeumel", "Prof. Dr. Robert Hirschfeld", "Toni Mattis"],
        nameLV: "History of Programming Languages",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-history-of-programming-languages.html",
        specific: {}
    },
    identitaetsmanagement: {
        kurz: "Identitätsmanagement",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16, ws16_17, ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Identitätsmanagement",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-identitaetsmanagement.html",
        specific: {
            WS15: {
                dozent: ["Konrad-Felix Krentz", "M.Sc. Christian Tietz", "Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-identitaetsmanagement.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-identitaetsmanagement.html",
            },
        }
    },
    informationvisualisationtechniques: {
        kurz: "Information<br />Visualisation Techniques",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "Information Visualisation Techniques for Industrie 4.0",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-information-visualisation-techniques-for-industrie-40.html",
        specific: {}
    },
    internetsecurity: {
        kurz: "Internet Security",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Internet Security - Weaknesses and Targets",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-internet-security-weaknesses-and-targets.html",
        specific: {}
    },
    introductiontodesignthinking: {
        kurz: "Introduction to<br />Design Thinking",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Softskills"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["Dr. Claudia Nicolai", "Prof. Ulrich Weinberg"],
        nameLV: "Introduction to Design Thinking: From Inspirations to Ideas",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-introduction-to-design-thinking-from-inspirations-to-ideas.html",
        specific: {}
    },
    isec: {
        kurz: "ISec",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16, ws16_17, ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Internet-Security - Weaknesses and Targets",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-internet-security-weaknesses-and-targets.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-internet-security-weaknesses-and-targets.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-internet-security-weaknesses-and-targets.html",
            },
        }
    },
    klubsprecher: {
        kurz: "Klubsprecher",
        lehrform: [],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: "",
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: [],
        nameLV: "Klubsprechertätigkeit über 2 Semester",
        page: "",
        specific: {}
    },
    knowledgediscovery: {
        kurz: "Knowledge Discovery",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, ISAE, OSIS],
        cp: 6,
        dozent: ["Dr. rer. nat. Harald Sack"],
        nameLV: "Knowledge Discovery with Linked Data",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-knowledge-discovery-with-linked-data.html",
        specific: {}
    },
    knowledgemining: {
        kurz: "Knowledge Mining",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15, ss16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, ISAE, OSIS],
        cp: 6,
        dozent: ["Dr. rer. nat. Harald Sack"],
        nameLV: "Knowledge Mining",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-knowledge-mining.html",
        specific: {
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-knowledge-mining.html",
            },
        }
    },
    lerntechnikenundstrategien: {
        kurz: "Lerntechniken<br />und Strategien",
        lehrform: ["Seminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["Dr. Christiane Potzner"],
        nameLV: "Lerntechniken und Strategien zur Prüfungsvorbereitung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-lerntechniken-und-strategien-zur-pruefungsvorbereitung.html",
        specific: {
            WS15: {
                dozent: ["Dr. Rolf Specht"],
                kurz: "Professionalisierte<br />Lerntechniken",
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-professionalisierte-lerntechniken.html",
                nameLV: "Professionalisierte Lerntechniken",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-lerntechniken-und-strategien-zur-pruefungsvorbereitung.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-lerntechniken-und-strategien-zur-pruefungsvorbereitung.html",
            },
            SS18: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-lerntechniken-und-strategien-zur-pruefungsvorbereitung.html",
            },
            SS15: {
                dozent: ["Dr. Rolf Specht"],
                kurz: "Professionalisierte<br />Lerntechniken",
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-professionalisierte-lerntechniken.html",
                nameLV: "Professionalisierte Lerntechniken",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-lerntechniken-und-strategien-zur-pruefungsvorbereitung.html",
            },
            SS16: {
                dozent: ["Dr. Rolf Specht"],
                kurz: "Professionalisierte<br />Lerntechniken",
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-professionalisierte-lerntechniken.html",
                nameLV: "Professionalisierte Lerntechniken",
            },
        }
    },
    linux: {
        kurz: "Linux",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Linux for the Masses",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-linux-for-the-masses.html",
        specific: {}
    },
    mathematik1: {
        kurz: "Mathematik I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Mathematische und theoretische Grundlagen"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 1,
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Mathematik I - Diskrete Strukturen und Logik",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-mathematik-i-diskrete-strukturen-und-logik.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-mathematik-i-diskrete-strukturen-und-logik.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-mathematik-i-diskrete-strukturen-und-logik.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-mathematik-i-diskrete-strukturen-und-logik.html",
            },
        }
    },
    mathematik2: {
        kurz: "Mathematik II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Mathematische und theoretische Grundlagen"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: true,
        empfohlen: 2,
        vertiefung: [],
        cp: 6,
        dozent: ["Dr. habil. Ferdinand Börner"],
        nameLV: "Mathematik II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-mathematik-ii.html",
        specific: {
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-mathematik-ii.html",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-mathematik-ii.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-mathematik-ii.html",
            },
        }
    },
    mod1: {
        kurz: "Mod I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Softwaretechnik und Modellierung"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 1,
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Mathias Weske", "Stephan Haarmann"],
        nameLV: "Modellierung I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-modellierung-i.html",
        specific: {
            WS15: {
                dozent: ["Prof. Dr. Holger Giese", "Thomas Vogel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-modellierung-i.html",
            },
            WS17: {
                dozent: ["Christian Zöllner", "Joachim Hänsel", "Maria Maximova", "Prof. Dr. Holger Giese"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-modellierung-i.html",
            },
            WS16: {
                dozent: ["Prof. Dr. Mathias Weske"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-modellierung-i.html",
            },
        }
    },
    mod2: {
        kurz: "Mod II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Softwaretechnik und Modellierung"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: true,
        empfohlen: 2,
        vertiefung: [],
        cp: 6,
        dozent: ["Christian Zöllner", "Prof. Dr. Holger Giese"],
        nameLV: "Modellierung II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-modellierung-ii.html",
        specific: {
            SS15: {
                dozent: ["Joachim Hänsel", "Prof. Dr. Holger Giese"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-modellierung-ii.html",
            },
            SS17: {
                dozent: ["Prof. Dr. Holger Giese"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-modellierung-ii.html",
            },
            SS16: {
                dozent: ["Prof. Dr. Holger Giese"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-modellierung-ii.html",
            },
        }
    },
    openhpi: {
        kurz: "openHPI",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Jan Renz", "Prof. Dr. Christoph Meinel", "Thomas Staubitz"],
        nameLV: "openHPI: Web Accessibility - Opening up web applacations for everyone",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-openhpi-web-accessibility-opening-up-web-applacations-for-everyone.html",
        specific: {}
    },
    pem: {
        kurz: "PEM",
        lehrform: ["Blockseminar"],
        modul: ["PEM"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: "",
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. hc. Peter Göttel"],
        nameLV: "Projektentwicklung und- Management: Teammanagement und Softskills in Projekten",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-projektentwicklung-und-management-teammanagement-und-softskills-in-projek.html",
        specific: {
            WS15: {
                lehrform: ["Projekt", "Seminar"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-projektentwicklung-und-management-teammanagement-und-softskills-in-projek.html",
            },
            WS17: {
                lehrform: ["Projekt", "Seminar"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-projektentwicklung-und-management-teammanagement-und-softskills-in-projek.html",
            },
            WS16: {
                lehrform: ["Projekt", "Seminar"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-projektentwicklung-und-management-teammanagement-und-softskills-in-projek.html",
            },
            SS18: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-projektentwicklung-und-management-teammanagement-und-softskills-in-projekten.html",
            },
            SS15: {
                lehrform: ["Projekt", "Seminar"],
                dozent: ["Dr. Michaela A.C. Schumacher"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-projektentwicklung-und-management-teamentwicklung.html",
                nameLV: "Projektentwicklung und- Management: Teamentwicklung",
            },
            SS17: {
                lehrform: ["Projekt", "Seminar"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-projektentwicklung-und-management-teammanagement-und-softskills-in-projekten.html",
            },
            SS16: {
                lehrform: ["Projekt", "Seminar"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-projektentwicklung-und-management-teammanagement-und-softskills-in-projekten.html",
            },
        }
    },
    pois: {
        kurz: "POIS",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["SB3", "Vertiefungsgebiete"],
        semester: [ws15_16, ws16_17, ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, SAMT],
        cp: 6,
        dozent: ["Kimon Batoulis", "Prof. Dr. Mathias Weske"],
        nameLV: "Prozessorientierte Informationssysteme",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-prozessorientierte-informationssysteme-1.html",
        specific: {
            WS15: {
                dozent: ["Prof. Dr. Mathias Weske"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-prozessorientierte-informationssysteme.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-prozessorientierte-informationssysteme.html",
            },
        }
    },
    pois2: {
        kurz: "POIS II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Mathias Weske"],
        nameLV: "Prozessorientierte Informationssysteme II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-prozessorientierte-informationssysteme-ii.html",
        specific: {}
    },
    poispois: {
        kurz: "POIS (POIS)",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["SB3", "Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, SAMT],
        cp: 6,
        dozent: ["Dr. Luise Pufahl", "Kimon Batoulis"],
        nameLV: "POIS (Prozessorientierte Informationssysteme)",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-pois-prozessorientierte-informationssysteme.html",
        specific: {}
    },
    privacyinpublicclouds: {
        kurz: "Privacy in Public Clouds",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, ISAE, OSIS],
        cp: 6,
        dozent: ["Hendrik Graupner", "Kennedy Torkura", "Muhamad Sukmana", "Prof. Dr. Christoph Meinel"],
        nameLV: "Privacy in Public Clouds",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-privacy-in-public-clouds.html",
        specific: {
            SS15: {
                dozent: ["Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-privacy-in-public-clouds.html",
            },
            SS17: {
                dozent: ["Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-privacy-in-public-clouds.html",
            },
            SS16: {
                dozent: ["Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-privacy-in-public-clouds.html",
            },
        }
    },
    probabilitytheory: {
        kurz: "Probability Theory",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Dr. Andreas Göbel", "Prof. Dr. Tobias Friedrich"],
        nameLV: "Probability Theory",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-probability-theory.html",
        specific: {}
    },
    processdriveniot: {
        kurz: "Process-driven IoT",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Marcin Hewelt", "Prof. Dr. Mathias Weske"],
        nameLV: "Process-driven IoT",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-process-driven-iot.html",
        specific: {}
    },
    processesanddecisionsinthecloud: {
        kurz: "Processes and<br />Decisions in the Cloud",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Kimon Batoulis", "Prof. Dr. Mathias Weske"],
        nameLV: "Processes and Decisions in the Cloud",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-processes-and-decisions-in-the-cloud.html",
        specific: {}
    },
    programmierungcomputergrafischerverfahren: {
        kurz: "Programmierung<br />computergrafischer Verfahren",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "Programmierung computergrafischer Verfahren mit C++und OpenGL",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-programmierung-computergrafischer-verfahren-mit-c-und-opengl.html",
        specific: {}
    },
    programmierungvonbenutzerschnittstellen: {
        kurz: "Programmierung von<br />Benutzerschnittstellen",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, ISAE],
        cp: 6,
        dozent: ["Daniel Limberger", "Dr. Matthias Trapp"],
        nameLV: "Programmierung von Benutzerschnittstellen",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-programmierung-von-benutzerschnittstellen.html",
        specific: {}
    },
    programminglanguages: {
        kurz: "Programming Languages",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS, SAMT],
        cp: 6,
        dozent: ["Johannes Henning", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Toni Mattis"],
        nameLV: "Programming Languages: Design and Implementation",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-programming-languages-design-and-implementation.html",
        specific: {}
    },
    pt1: {
        kurz: "PT I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Grundlagen IT-Systems Engineering"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 1,
        vertiefung: [],
        cp: 6,
        dozent: ["Fabio Niephaus", "Johannes Henning", "Prof. Dr. Robert Hirschfeld", "Tobias Pape", "Toni Mattis"],
        nameLV: "Einführung in die Programmiertechnik I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-einfuehrung-in-die-programmiertechnik-i.html",
        specific: {
            WS15: {
                dozent: ["Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tim Felgentreff", "Tobias Pape", "Toni Mattis"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-einfuehrung-in-die-programmiertechnik-i.html",
            },
            WS17: {
                dozent: ["Prof. Dr. Andreas Polze"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-einfuehrung-in-die-programmiertechnik-i.html",
            },
            WS16: {
                dozent: ["Prof. Dr. Patrick Baudisch"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-einfuehrung-in-die-programmiertechnik-i.html",
            },
        }
    },
    pt2: {
        kurz: "PT II",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Grundlagen IT-Systems Engineering"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: true,
        empfohlen: 2,
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Andreas Polze", "Sven Köhler"],
        nameLV: "Einführung in die Programmiertechnik II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-einfuehrung-in-die-programmiertechnik-ii.html",
        specific: {
            SS15: {
                dozent: ["Prof. Dr. Jürgen Döllner"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-einfuehrung-in-die-programmiertechnik-ii.html",
            },
            SS17: {
                dozent: ["Johannes Wolf", "Prof. Dr. Jürgen Döllner"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-einfuehrung-in-die-programmiertechnik-ii.html",
            },
            SS16: {
                dozent: ["Prof. Dr. Felix Naumann"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-einfuehrung-in-die-programmiertechnik-ii.html",
            },
        }
    },
    recht1: {
        kurz: "Recht I",
        lehrform: ["Vorlesung"],
        modul: ["Rechtliche und wirtschaftliche Grundlagen"],
        semester: [ss15, ss16, ss17, ss18, ws18_19],
        pflicht: true,
        empfohlen: 2,
        vertiefung: [],
        cp: 3,
        dozent: ["Dr. Thomas Habbe"],
        nameLV: "Recht für Ingenieure I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-recht-fuer-ingenieure-i-1.html",
        specific: {
            SS18: {
                dozent: ["Dr. Timm Krohn"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-recht-fuer-ingenieure-i.html",
            },
            SS15: {
                dozent: ["Dr. Timm Krohn"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-recht-fuer-ingenieure-i.html",
            },
            SS17: {
                dozent: ["Dr. Timm Krohn"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-recht-fuer-ingenieure-i.html",
            },
            SS16: {
                dozent: ["Dr. Timm Krohn"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-recht-fuer-ingenieure-i.html",
            },
        }
    },
    recht2: {
        kurz: "Recht II",
        lehrform: ["Vorlesung"],
        modul: ["Rechtliche und wirtschaftliche Grundlagen"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 3,
        vertiefung: [],
        cp: 3,
        dozent: ["Dr. Timm Krohn", "Prof. Dr. Jan Eickelberg"],
        nameLV: "Recht für Ingenieure II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-recht-fuer-ingenieure-ii.html",
        specific: {
            WS15: {
                dozent: ["Dr. Timm Krohn"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-recht-fuer-ingenieure-ii.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-recht-fuer-ingenieure-ii-rechtsfragen-der-digitalisierung-im-geschaeftsverk.html",
                nameLV: "Recht für Ingenieure II - Rechtsfragen der Digitalisierung im Geschäftsverkehr",
            },
            WS16: {
                dozent: ["Dr. Timm Krohn"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-recht-fuer-ingenieure-ii.html",
            },
        }
    },
    securecoding: {
        kurz: "Secure Coding",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Secure Coding",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-secure-coding.html",
        specific: {}
    },
    semanticmediamining: {
        kurz: "Semantic Media Mining",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 6,
        dozent: ["Dr. rer. nat. Harald Sack"],
        nameLV: "Semantic Media Mining",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-semantic-media-mining.html",
        specific: {}
    },
    seminarraeumlichedatenundraumzeitlichedaten: {
        kurz: "Seminar Räumliche Daten<br />und raumzeitliche Daten",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, OSIS],
        cp: 6,
        dozent: ["Prof. Dr. Jürgen Döllner"],
        nameLV: "Seminar Räumliche Daten und raumzeitliche Daten",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-seminar-raeumliche-daten-und-raumzeitliche-daten.html",
        specific: {}
    },
    softwaremodularitaet: {
        kurz: "Softwaremodularität",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws16_17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS, SAMT],
        cp: 6,
        dozent: ["Johannes Henning", "Marcel Taeumel", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Toni Mattis"],
        nameLV: "Softwaremodularität",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-softwaremodularitaet.html",
        specific: {}
    },
    stubs: {
        kurz: "StubS",
        lehrform: ["Seminar"],
        modul: [],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 0,
        dozent: ["Dr.-Ing. Ralf Wollowski"],
        nameLV: "Studienbegleitendes Seminar",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-studienbegleitendes-seminar.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-studienbegleitendes-seminar.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-studienbegleitendes-seminar.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-studienbegleitendes-seminar.html",
            },
        }
    },
    swa: {
        kurz: "SWA",
        lehrform: ["Vorlesung"],
        modul: ["Grundlagen IT-Systems Engineering"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: 3,
        vertiefung: [],
        cp: 6,
        dozent: ["Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tobias Pape", "Toni Mattis"],
        nameLV: "Softwarearchitektur",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-softwarearchitektur.html",
        specific: {
            WS15: {
                dozent: ["Dr. Michael Perscheid", "Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tim Felgentreff", "Tobias Pape"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-softwarearchitektur.html",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-softwarearchitektur.html",
            },
            WS16: {
                dozent: ["Dr. Michael Perscheid", "Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tim Felgentreff", "Tobias Pape"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-softwarearchitektur.html",
            },
        }
    },
    swqualitaet: {
        kurz: "SWQualität",
        lehrform: ["Projekt", "Vorlesung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS, SAMT],
        cp: 6,
        dozent: ["Joachim Hänsel", "Prof. Dr. Holger Giese"],
        nameLV: "Softwarequalität",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-softwarequalitaet.html",
        specific: {}
    },
    swt1: {
        kurz: "SWT I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Softwaretechnik und Modellierung"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: 4,
        vertiefung: [],
        cp: 6,
        dozent: ["Fabio Niephaus", "Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tobias Pape", "Toni Mattis"],
        nameLV: "Softwaretechnik I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-softwaretechnik-i.html",
        specific: {
            SS15: {
                dozent: ["Dr. Michael Perscheid", "Prof. Dr. Robert Hirschfeld"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-softwaretechnik-i.html",
            },
            SS17: {
                dozent: ["Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tim Felgentreff", "Tobias Pape", "Toni Mattis"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-softwaretechnik-i.html",
            },
            SS16: {
                dozent: ["Dr. Michael Perscheid", "Jens Lincke", "Johannes Henning", "Marcel Taeumel", "Patrick Rein", "Prof. Dr. Robert Hirschfeld", "Stefan Ramson", "Tim Felgentreff", "Tobias Pape", "Toni Mattis"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-softwaretechnik-i.html",
            },
        }
    },
    swt2: {
        kurz: "SWT II",
        lehrform: ["Projekt", "Vorlesung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS, SAMT],
        cp: 6,
        dozent: ["Christoph Matthies", "Dr. Matthias Uflacker", "Keven Richly", "Ralf Teusner"],
        nameLV: "Softwaretechnik II - Agile Software Development in Large Teams",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-softwaretechnik-ii-agile-software-development-in-large-teams.html",
        specific: {
            WS15: {
                lehrform: ["Vorlesung"],
                dozent: ["Arian Treffer", "Dr. Matthias Uflacker", "Keven Richly", "Ralf Teusner"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-softwaretechnik-ii.html",
                nameLV: "Softwaretechnik II",
            },
            WS17: {
                lehrform: ["Vorlesung", "Übung"],
                dozent: ["Dr. Matthias Uflacker"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-softwaretechnik-ii-agile-software-development-in-large-teams.html",
            },
            WS16: {
                lehrform: ["Vorlesung", "Übung"],
                dozent: ["Dr. Matthias Uflacker"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-softwaretechnik-ii-agile-software-development-in-large-teams.html",
            },
        }
    },
    testdrivenlearningassignments: {
        kurz: "Test-Driven Learning<br />Assignments",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Christiane Hagedorn", "Prof. Dr. Christoph Meinel", "Ralf Teusner", "Thomas Staubitz"],
        nameLV: "Test-Driven Learning Assignments",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-test-driven-learning-assignments.html",
        specific: {}
    },
    textmining: {
        kurz: "Text Mining",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS],
        cp: 3,
        dozent: ["Dr. Ralf Krestel"],
        nameLV: "Text Mining",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-text-mining.html",
        specific: {}
    },
    ti1: {
        kurz: "TI I",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Mathematische und theoretische Grundlagen"],
        semester: [ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: true,
        empfohlen: 3,
        vertiefung: [],
        cp: 6,
        dozent: ["Dr. Timo Kötzing"],
        nameLV: "Theoretische Informatik I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-theoretische-informatik-i.html",
        specific: {
            WS15: {
                dozent: ["Prof. Dr. Tobias Friedrich"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-theoretische-informatik-i.html",
            },
            WS17: {
                dozent: ["Prof. Dr. Tobias Friedrich"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-theoretische-informatik-i.html",
            },
            WS16: {
                dozent: ["Prof. Dr. Tobias Friedrich"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-theoretische-informatik-i.html",
            },
        }
    },
    ti2: {
        kurz: "TI II",
        lehrform: ["Vorlesung", "Übung"],
        modul: [],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: true,
        empfohlen: 4,
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Tobias Friedrich"],
        nameLV: "Theoretische Informatik II",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-theoretische-informatik-ii.html",
        specific: {
            SS15: {
                dozent: ["Prof. Dr. Jürgen Dassow"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-theoretische-informatik-ii.html",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-theoretische-informatik-ii.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-theoretische-informatik-ii.html",
            },
        }
    },
    ueberzeugendpraesentieren: {
        kurz: "Überzeugend<br />Präsentieren",
        lehrform: ["Blockseminar"],
        modul: ["Softskills"],
        semester: [ss15, ss16, ss17, ss18, ws15_16, ws16_17, ws17_18, ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["Dr. Werner Dieball"],
        nameLV: "Überzeugend Präsentieren - Der erste Eindruck zählt",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - der erste Eindruck zählt",
            },
            WS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - der erste Eindruck zählt",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - der erste Eindruck zählt",
            },
            SS18: {
                lehrform: ["Seminar"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - Der erste Eindruck zählt ...!",
            },
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - der erste Eindruck zählt",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - der erste Eindruck zählt",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-ueberzeugend-praesentieren-der-erste-eindruck-zaehlt.html",
                nameLV: "Überzeugend Präsentieren - der erste Eindruck zählt",
            },
        }
    },
    unternehmensanwendungen: {
        kurz: "Unternehmensanwendungen",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, OSIS],
        cp: 6,
        dozent: ["Dr. Matthias Uflacker", "Stefan Klauck"],
        nameLV: "Unternehmensanwendungen: Prozesse, Modelle und Implementierung",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-unternehmensanwendungen-prozesse-modelle-und-implementierung.html",
        specific: {
            SS15: {
                lehrform: ["Seminar"],
                dozent: ["Dr. Matthias Uflacker"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-unternehmensanwendungen-prozesse-modelle-und-implementierung.html",
            },
            SS17: {
                lehrform: ["Seminar"],
                dozent: ["Dr. Matthias Uflacker"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-unternehmensanwendungen-prozesse-modelle-und-implementierung.html",
            },
            SS16: {
                lehrform: ["Seminar"],
                dozent: ["Dr. Matthias Uflacker"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-unternehmensanwendungen-prozesse-modelle-und-implementierung.html",
            },
        }
    },
    vhdl: {
        kurz: "VHDL",
        lehrform: ["Vorlesung"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss16, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [OSIS, SAMT],
        cp: 6,
        dozent: ["Dr.-Ing. Ralf Wollowski"],
        nameLV: "Entwurf und Implementierung digitaler Schaltungen mit VHDL",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-entwurf-und-implementierung-digitaler-schaltungen-mit-vhdl.html",
        specific: {
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-entwurf-und-implementierung-digitaler-schaltungen-mit-vhdl.html",
            },
        }
    },
    wahrscheinlichkeitstheorie: {
        kurz: "Wahrscheinlichkeitstheorie",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 3,
        dozent: ["Dr. Timo Kötzing", "Martin Schirneck"],
        nameLV: "Wahrscheinlichkeitstheorie",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-wahrscheinlichkeitstheorie.html",
        specific: {
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-wahrscheinlichkeitstheorie.html",
            },
        }
    },
    webentwicklung: {
        kurz: "Webentwicklung",
        lehrform: ["Projekt", "Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, HCGT, ISAE, OSIS],
        cp: 3,
        dozent: ["Martin Malchow", "Matthias Bauer", "Matthias Bauer"],
        nameLV: "Webentwicklung mit Web Frameworks",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-webentwicklung-mit-web-frameworks.html",
        specific: {}
    },
    webprogrammierungundwebframeworks: {
        kurz: "Web-Programmierung<br />und Web-Frameworks",
        lehrform: ["Projekt"],
        modul: ["Vertiefungsgebiete"],
        semester: [ws15_16, ws16_17, ws17_18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [BPET, ISAE, OSIS, SAMT],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Web-Programmierung und Web-Frameworks",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-web-programmierung-und-web-frameworks.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-web-programmierung-und-web-frameworks.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-web-programmierung-und-web-frameworks.html",
            },
        }
    },
    weiterfuehrendethemenzuwww: {
        kurz: "Weiterführende<br />Themen zu WWW",
        lehrform: ["Seminar"],
        modul: ["Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [ISAE, OSIS, SAMT],
        cp: 3,
        dozent: ["Martin Malchow", "Matthias Bauer", "Prof. Dr. Christoph Meinel"],
        nameLV: "Weiterführende Themen zu Internet- und WWW-Technologien",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-weiterfuehrende-themen-zu-internet-und-www-technologien.html",
        specific: {
            SS15: {
                dozent: ["Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-weiterfuehrende-themen-zu-internet-und-www-technologien.html",
            },
            SS17: {
                dozent: ["Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-weiterfuehrende-themen-zu-internet-und-www-technologien.html",
            },
            SS16: {
                dozent: ["Prof. Dr. Christoph Meinel"],
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-weiterfuehrende-themen-zu-internet-und-www-technologien.html",
            },
        }
    },
    wirtschaft: {
        kurz: "Wirtschaft",
        lehrform: ["Vorlesung"],
        modul: ["Rechtliche und wirtschaftliche Grundlagen"],
        semester: [ws15_16, ws16_17, ws17_18],
        pflicht: true,
        empfohlen: 1,
        vertiefung: [],
        cp: 6,
        dozent: ["Prof. Dr. Katharina Hölzle"],
        nameLV: "Wirtschaftliche Grundlagen",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/wintersemester-20172018-wirtschaftliche-grundlagen.html",
        specific: {
            WS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/wintersemester-20152016-wirtschaftliche-grundlagen.html",
            },
            WS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/wintersemester-20162017-wirtschaftliche-grundlagen.html",
            },
        }
    },
    wirtschaft1: {
        kurz: "Wirtschaft I",
        lehrform: ["Vorlesung"],
        modul: ["Rechtliche und wirtschaftliche Grundlagen"],
        semester: [ws18_19],
        pflicht: false,
        empfohlen: "",
        vertiefung: [],
        cp: 3,
        dozent: ["Prof. Dr. Katharina Hölzle"],
        nameLV: "Wirtschaftliche Grundlagen I",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/course/0/wintersemester-20182019-wirtschaftliche-grundlagen-i.html",
        specific: {}
    },
    www: {
        kurz: "WWW",
        lehrform: ["Vorlesung", "Übung"],
        modul: ["SB5", "Vertiefungsgebiete"],
        semester: [ss15, ss16, ss17, ss18],
        pflicht: false,
        empfohlen: "",
        vertiefung: [HCGT, ISAE],
        cp: 6,
        dozent: ["Prof. Dr. Christoph Meinel"],
        nameLV: "Internet- und WWW-Technologien",
        page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2018-internet-und-www-technologien.html",
        specific: {
            SS15: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2015/sommersemester-2015-internet-und-www-technologien.html",
            },
            SS17: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/0/sommersemester-2017-internet-und-www-technologien.html",
            },
            SS16: {
                page: "https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ma/lehrveranstaltung/course/2016/sommersemester-2016-internet-und-www-technologien.html",
            },
        }
    },
};

module.exports = data;
