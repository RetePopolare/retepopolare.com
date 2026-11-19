/* ==========================================================
   RETE POPOLARE — Eventi
   Per aggiungere un evento: copiare un blocco { ... }, incollarlo
   in cima all'elenco e cambiare i valori. Il sito separa da solo
   i prossimi appuntamenti da quelli passati, in base alla data.

   Campi:
   - data        AAAA-MM-GG (obbligatoria)
   - ora         "21:00" (facoltativa)
   - titolo      (obbligatorio)
   - sottotitolo (facoltativo)
   - territorio  etichetta gialla in alto: "Milano", "Online"…
   - luogo       sala/locale e indirizzo
   - relatori    elenco di righe "Nome Cognome — ruolo"
   - immagine    locandina in assets/eventi/ (facoltativa)
   - iscrizione  link per iscriversi (facoltativo)
   - video       link alla registrazione (facoltativo)
   - pubblica    false per tenerlo nascosto (bozza)
   ========================================================== */
window.RP_EVENTI = [
  {
    data: "2026-11-24", ora: "21:00",
    titolo: "Abbiamo ancora qualcosa da dirvi?",
    sottotitolo: "Un dialogo sui fatti di Milano del 17 ottobre e sulla responsabilità educativa degli adulti.",
    territorio: "Milano",
    luogo: "Spazio Magnete, via Adriano 107, Milano",
    relatori: [
      "Franco Nembrini — educatore e saggista",
      "Carlo Carabelli — direttore generale di ASLAM",
      "Introduce Lorenzo Bruschi — Coordinatore Rete Popolare Milano",
      "Modera Massimiliano Bombonati — Segretario generale di Rete Popolare"
    ],
    immagine: "assets/eventi/2026-11-24-milano.jpg",
    iscrizione: "https://forms.gle/5NZw1YJVbdtVx4qC6"
  },
  {
    data: "2026-11-18", ora: "18:15",
    titolo: "Giovani: costruire invece di distruggere?",
    sottotitolo: "Un confronto sul mondo dei giovani e sulle risposte che scuola, istituzioni e territorio possono dare.",
    territorio: "Varese",
    luogo: "Villa Recalcati, Sala Ambrosoli, piazza Libertà 1, Varese",
    relatori: [
      "Asia Martina Di Lorenzo — Presidente del Consiglio generale degli studenti dell'Insubria",
      "Roberto Molinari — Assessore ai Servizi sociali del Comune di Varese",
      "Giuseppe Carcano — Dirigente dell'Ufficio scolastico territoriale di Varese",
      "Filippo Maroni — ideatore e coordinatore di Happiness",
      "Saluti di Giuseppe Licata ed Eugenio Rossotti",
      "Modera Lucio Bergamaschi — giornalista"
    ],
    immagine: "assets/eventi/2026-11-18-varese.jpg",
    iscrizione: "https://forms.gle/m6YhXJDAQoRFgi5M7"
  },
  {
    data: "2026-11-13", ora: "21:00",
    titolo: "Legge regionale fine vita. La libertà e il limite",
    sottotitolo: "Rete Popolare Liguria incontra Valentina Castaldini, consigliere regionale dell'Emilia-Romagna.",
    territorio: "Online",
    luogo: "Incontro online su Zoom",
    relatori: ["Valentina Castaldini — Consigliere regionale dell'Emilia-Romagna"],
    immagine: "assets/eventi/2026-11-13-liguria.jpg"
  },
  {
    data: "2026-11-07", ora: "10:30",
    titolo: "Il problema politico. Costruire comunità.",
    territorio: "Firenze",
    luogo: "The Gate Hotel, Area di servizio Firenze Nord A1, Sesto Fiorentino (FI)",
    relatori: [
      "Massimiliano Salini — Vicepresidente del Partito Popolare Europeo",
      "Valentina Castaldini — Consigliere regionale dell'Emilia-Romagna"
    ],
    immagine: "assets/eventi/2026-11-07-firenze.jpg"
  },
  {
    data: "2026-11-03", ora: "21:00",
    titolo: "Ucraina: difendere la vita, custodire la speranza",
    territorio: "Online",
    luogo: "In diretta su Zoom",
    relatori: [
      "Mons. Pavlo Honcharuk — Vescovo di Kharkiv-Zaporizhia",
      "Massimiliano Salini — Vicepresidente del Partito Popolare Europeo"
    ],
    immagine: "assets/eventi/2026-11-03-ucraina.jpg",
    video: "https://www.youtube.com/watch?v=TCm55iOZ3uA"
  },
  {
    data: "2026-10-27", ora: "18:30",
    titolo: "Rete Popolare Lazio incontra…",
    sottotitolo: "Aperitivo con l'On. Massimiliano Salini, Presidente di Rete Popolare.",
    territorio: "Roma",
    luogo: "Antico Caffè Ruschena, Roma",
    immagine: "assets/eventi/2026-10-27-roma.jpg"
  },
  {
    data: "2026-09-15", ora: "21:00",
    titolo: "La libertà e il limite",
    sottotitolo: "Incontro sul fine vita: il tema dal punto di vista umano, giuridico e politico.",
    territorio: "Online",
    luogo: "Online, in diretta",
    relatori: ["Deborah Giovanati", "Valentina Castaldini", "Benedetta Vimercati"],
    video: "https://www.youtube.com/watch?v=YJcYlRq3hpM"
  },
  {
    data: "2026-09-03", ora: "21:00",
    titolo: "Assemblea dei Soci 2026",
    sottotitolo: "Il punto di partenza per il lavoro dell'anno e per la nuova organizzazione territoriale dell'Associazione.",
    territorio: "Online",
    luogo: "Assemblea in modalità telematica"
  },
  {
    data: "2026-08-23", ora: "18:00",
    titolo: "Preparare il terreno, seminare la politica",
    sottotitolo: "Rete Popolare al Meeting di Rimini: assemblea e cena sociale.",
    territorio: "Rimini",
    luogo: "Fiera di Rimini, via Emilia 155 — cena al ristorante Sfoglia Matta",
    relatori: ["Massimiliano Salini — Presidente di Rete Popolare", "Valentina Castaldini — Vicepresidente di Rete Popolare"],
    immagine: "assets/eventi/2026-08-23-rimini.jpg"
  },
  {
    data: "2026-06-29", ora: "21:00",
    titolo: "Qualità dei servizi e vitalità dei territori",
    sottotitolo: "Percorsi per invertire una rotta che sembra segnata da denatalità e spopolamento.",
    territorio: "Bergamo",
    luogo: "Casa del Giovane, via Gavazzeni 13, Bergamo",
    relatori: [
      "Massimiliano Salini — Vicepresidente PPE, Presidente di Rete Popolare",
      "Elena Bonetti — già Ministra per le Pari opportunità e la Famiglia",
      "Gianluca Comazzi — Assessore al Territorio e Sistemi verdi di Regione Lombardia",
      "Introduce Filippo Campiotti · Modera Stefano Vismara"
    ],
    immagine: "assets/eventi/2026-06-29-bergamo.jpg"
  },
  {
    data: "2026-06-25", ora: "18:00",
    titolo: "Grigliata Popolare",
    sottotitolo: "Carne al fuoco, idee in cantiere.",
    territorio: "Varese",
    luogo: "Eremo di Santa Caterina del Sasso e Villa Fantoni, Sangiano (VA)",
    relatori: ["Massimiliano Salini", "Valentina Castaldini", "Saluto di Giuseppe Licata · Modera Matteo Marchesi"],
    immagine: "assets/eventi/2026-06-25-varese.jpg"
  },
  {
    data: "2026-06-24", ora: "21:00",
    titolo: "Il coraggio di tornare a educare",
    sottotitolo: "L'educazione è un fiore da innaffiare ogni giorno.",
    territorio: "Monza e Brianza",
    luogo: "In-Presa, via Vergani 14, Carate Brianza (MB)",
    relatori: [
      "Chiara Frigeni — In-Presa",
      "Suor Anna Monia Alfieri — Consiglio nazionale Scuola della CEI",
      "Angelo Lucio Rossi — Dirigente scolastico ICS Alda Merini, Milano",
      "Rossella Viaconzi — Rinascita Educativa APS",
      "Mauro Grimoldi — Istituto Don Gnocchi",
      "Introduce Adriano Corigliano · Modera Pietro Rubino"
    ],
    immagine: "assets/eventi/2026-06-24-monza.jpg"
  },
  {
    data: "2026-05-27", ora: "18:45",
    titolo: "Una città che accoglie è una città sicura",
    sottotitolo: "Immigrazione, integrazione e sicurezza a Milano.",
    territorio: "Milano",
    luogo: "CAM Garibaldi, corso Garibaldi 27, Milano",
    relatori: [
      "Pietro Farneti — Fondazione Eris, fondatore Scuola Nagib Mahfuz",
      "Maurizio Bove — ANOLF CISL Milano e Lombardia",
      "Deborah Giovanati — Consigliere comunale di Milano",
      "Introduce Guglielmo Mina · Modera Massimiliano Bombonati"
    ],
    immagine: "assets/eventi/2026-05-27-milano.jpg",
    video: "https://www.youtube.com/watch?v=_E0YXPMaueI"
  },
  {
    data: "2025-08-24", ora: "12:15",
    titolo: "Preparare il terreno, seminare la politica",
    sottotitolo: "Rete Popolare al Meeting di Rimini.",
    territorio: "Rimini",
    luogo: "Ristorante Sfoglia Matta, Meeting di Rimini"
  },
  {
    data: "2025-02-22", ora: "09:30",
    titolo: "Il prezzo della pace",
    sottotitolo: "La prima Assemblea di Rete Popolare.",
    territorio: "Milano",
    luogo: "CAM Garibaldi, Chiostro Bramantesco, corso Garibaldi 27, Milano"
  }
];
