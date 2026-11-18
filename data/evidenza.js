/* ==========================================================
   RETE POPOLARE — In evidenza
   Un riquadro giallo sotto l'apertura del sito, per una campagna
   o un appuntamento da mettere in primo piano per qualche giorno.
   Compare dalla data "dal" e sparisce da solo dopo la data "al".
   Se più blocchi sono attivi insieme, si vede il primo dell'elenco.
   Per toglierlo prima: cancellare il blocco o mettere al: una data passata.

   Campi:
   - dal, al     AAAA-MM-GG (inclusi)
   - etichetta   la scritta nella pillola: "Petizione · Bonus mamme"
   - titolo      il titolo grande
   - testo       una o due righe
   - bottone     { testo, link }  il bottone principale
   - secondario  { testo, link }  facoltativo
   - immagine    in assets/evidenza/ (facoltativa)
   ========================================================== */
window.RP_EVIDENZA = [
  {
    dal: "2026-11-18", al: "2026-12-31",
    etichetta: "Petizione · Bonus mamme",
    titolo: "Firma anche tu",
    testo: "Raccogliamo le firme a sostegno degli emendamenti al bonus mamme, perché nessuna madre con tre o più figli riceva meno di oggi. Bastano 30 secondi.",
    bottone: { testo: "Firma la petizione", link: "https://bit.ly/BONUSMAMME" },
    secondario: { testo: "Leggi il comunicato", link: "documenti/testi/2026-11-12-comunicato-bonus-mamme.pdf" },
    immagine: "assets/evidenza/2026-11-petizione-bonus-mamme.jpg"
  }
];
