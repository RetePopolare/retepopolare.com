/* ==========================================================
   RETE POPOLARE — Coordinamenti territoriali
   Un Coordinamento compare quando il gruppo del territorio è aperto.

   FILE GENERATO: non modificarlo a mano. Si rigenera da
   claude/pipeline/mappa/coordinamenti.json (progetto Claude) con
   claude/pipeline/sito/sito_coordinamenti.py; una modifica a mano
   verrebbe sovrascritta al primo aggiornamento.

   Campi:
   - id          breve, senza spazi (diventa l'indirizzo #coord-id)
   - livello     "R" regionale, "P" provinciale, "C" comunale
   - nome        come appare sul sito
   - geo         nome ISTAT della regione o provincia (per la mappa)
   - lat, lon    solo per i comunali (puntino sulla mappa)
   - stato       "eletto" | "convocata" | "costituzione"
   - coordinatore { nome, cognome, ruolo, foto }  (foto facoltativa:
                 percorso di un'immagine quadrata in assets/coordinatori/)
   - eletto      data dell'Assemblea che lo ha eletto (AAAA-MM-GG)
   - assemblea   data dell'Assemblea già convocata (AAAA-MM-GG)
   ========================================================== */
window.RP_COORDINAMENTI = {
  aggiornato: "2026-11-19",
  elenco: [
    { id: "lombardia", livello: "R", nome: "Lombardia", geo: "Lombardia", stato: "eletto", eletto: "2026-11-02",
      coordinatore: { nome: "Pietro", cognome: "Rubino", ruolo: "Coordinatore", foto: "assets/coordinatori/lombardia.jpg" } },
    { id: "emilia-romagna", livello: "R", nome: "Emilia-Romagna", geo: "Emilia-Romagna", stato: "eletto", eletto: "2026-10-28",
      coordinatore: { nome: "Alessandro", cognome: "Pompili", ruolo: "Coordinatore", foto: "assets/coordinatori/emilia-romagna.jpg" } },
    { id: "veneto", livello: "R", nome: "Veneto", geo: "Veneto", stato: "eletto", eletto: "2026-10-29",
      coordinatore: { nome: "David", cognome: "Suweis", ruolo: "Coordinatore", foto: "assets/coordinatori/veneto.jpg" } },
    { id: "liguria", livello: "R", nome: "Liguria", geo: "Liguria", stato: "eletto", eletto: "2026-10-09",
      coordinatore: { nome: "Maurizio", cognome: "Petulicchio", ruolo: "Coordinatore", foto: "assets/coordinatori/liguria.jpg" } },
    { id: "lazio", livello: "R", nome: "Lazio", geo: "Lazio", stato: "costituzione" },
    { id: "marche", livello: "R", nome: "Marche", geo: "Marche", stato: "eletto", eletto: "2026-11-17",
      coordinatore: { nome: "Angelo", cognome: "Mucci", ruolo: "Coordinatore", foto: "assets/coordinatori/marche.jpg" } },
    { id: "piemonte", livello: "R", nome: "Piemonte", geo: "Piemonte", stato: "eletto", eletto: "2026-11-10",
      coordinatore: { nome: "Lorenzo", cognome: "Ricco", ruolo: "Coordinatore", foto: "assets/coordinatori/piemonte.jpg" } },

    { id: "milano-provincia", livello: "P", nome: "Provincia di Milano", geo: "Milano", stato: "eletto", eletto: "2026-11-12",
      coordinatore: { nome: "Tiziano", cognome: "De Luca", ruolo: "Coordinatore", foto: "assets/coordinatori/milano-provincia.jpg" } },
    { id: "varese", livello: "P", nome: "Varese", geo: "Varese", stato: "eletto", eletto: "2026-10-13",
      coordinatore: { nome: "Eugenio", cognome: "Rossotti", ruolo: "Coordinatore", foto: "assets/coordinatori/varese.jpg" } },
    { id: "monza-brianza", livello: "P", nome: "Monza e Brianza", geo: "Monza e della Brianza", stato: "eletto", eletto: "2026-10-19",
      coordinatore: { nome: "Adriano", cognome: "Corigliano", ruolo: "Coordinatore", foto: "assets/coordinatori/monza-brianza.jpg" } },
    { id: "padova", livello: "P", nome: "Padova", geo: "Padova", stato: "eletto", eletto: "2026-11-04",
      coordinatore: { nome: "Matteo", cognome: "Daverio", ruolo: "Coordinatore", foto: "assets/coordinatori/padova.jpg" } },
    { id: "bergamo", livello: "P", nome: "Bergamo", geo: "Bergamo", stato: "eletto", eletto: "2026-11-06",
      coordinatore: { nome: "Stefano", cognome: "Vismara", ruolo: "Coordinatore", foto: "assets/coordinatori/bergamo.jpg" } },
    { id: "lecco", livello: "P", nome: "Lecco", geo: "Lecco", stato: "eletto", eletto: "2026-11-04",
      coordinatore: { nome: "Dario", cognome: "Perego", ruolo: "Coordinatore", foto: "assets/coordinatori/lecco.jpg" } },
    { id: "como", livello: "P", nome: "Como", geo: "Como", stato: "eletto", eletto: "2026-11-11",
      coordinatore: { nome: "Mario", cognome: "Gorla", ruolo: "Coordinatore", foto: "assets/coordinatori/como.jpg" } },

    { id: "milano", livello: "C", nome: "Città di Milano", geo: "Milano", lat: 45.4642, lon: 9.19, stato: "eletto", eletto: "2026-10-15",
      coordinatore: { nome: "Lorenzo", cognome: "Bruschi", ruolo: "Coordinatore", foto: "assets/coordinatori/milano.jpg" } },
    { id: "bologna", livello: "C", nome: "Bologna", geo: "Bologna", lat: 44.4949, lon: 11.3426, stato: "convocata", assemblea: "2026-11-26" },
    { id: "saronno", livello: "C", nome: "Saronno", geo: "Saronno", lat: 45.6253, lon: 9.037, stato: "eletto", eletto: "2026-10-15",
      coordinatore: { nome: "Lorena", cognome: "Ciapparelli", ruolo: "Coordinatrice", foto: "assets/coordinatori/saronno.jpg" } },
    { id: "novate-milanese", livello: "C", nome: "Novate Milanese", geo: "Novate Milanese", lat: 45.532, lon: 9.134, stato: "eletto", eletto: "2026-11-17",
      coordinatore: { nome: "Luigi", cognome: "Zucchelli", ruolo: "Coordinatore" } }
  ]
};
