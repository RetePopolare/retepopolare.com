# Sito di Rete Popolare — istruzioni

Sito statico: si carica così com'è su qualunque hosting (anche nella cartella del dominio retepopolare.com). Nessun database, nessun plugin.

## Cosa c'è

| File | A cosa serve |
|---|---|
| `index.html` | La pagina principale (Chi siamo, Direttivo e Staff, Coordinamenti, Eventi, La Stoccata, Entra in Rete, Documenti, Contatti) |
| `statuto.html` | Lo Statuto in versione grafica, leggibile online |
| `documenti/Statuto-Rete-Popolare.pdf` | Lo Statuto in PDF, nello stesso stile |
| `documenti/RP-Rendiconto-2025-2026.pdf`, `documenti/20251124_103816.pdf` | I rendiconti, **identici agli originali** pubblicati finora |
| `regolamento.html` | Il Regolamento dei Coordinamenti (art. 15) in versione grafica, come lo Statuto |
| `documenti/Regolamento-Coordinamenti-Rete-Popolare.pdf` | Il Regolamento in PDF, nello stesso stile |
| `data/eventi.js` | **Elenco degli eventi** |
| `data/coordinamenti.js` | **Elenco dei Coordinamenti e dei Coordinatori** |
| `data/config.js` | Link esterni (Yapla, newsletter, community, social) e modulo contatti |
| `data/geo.js` | Confini di regioni e province per la mappa (non si tocca) |
| `assets/` | Logo, schede del Direttivo e dello Staff, locandine degli eventi |

## Aggiungere un evento

1. Mettere la locandina in `assets/eventi/` (jpg, larghezza circa 800 px).
2. In `data/eventi.js` copiare un blocco `{ ... }`, incollarlo in cima all'elenco e cambiare i valori.
3. Il sito mette da solo l'evento fra i **Prossimi appuntamenti** fino al giorno stesso e poi fra gli **Eventi passati**.

`pubblica: false` tiene un evento nascosto finché non lo si vuole pubblicare.

## Regola per i link (dal 19/11/2026)

Nel sito, su WhatsApp e nelle newsletter si usano solo **link diretti** (per esempio `https://forms.gle/...`), mai link accorciati con Bitly. Dal telefono Bitly mostra una pagina di passaggio con pubblicità ingannevoli («Verifica il tuo account», «Apri») prima di arrivare al modulo.

## Aggiornare i Coordinamenti

Dal 19/11/2026 `data/coordinamenti.js` è un file generato: non si modifica a mano. Lo rigenera Claude dai dati della mappa dei Coordinamenti (progetto Claude, `claude/pipeline/mappa/coordinamenti.json`) con `claude/pipeline/sito/sito_coordinamenti.py`, a ogni export, gruppo aperto, Assemblea convocata o esito.

La foto del Coordinatore è facoltativa: immagine quadrata in `assets/coordinatori/<id>.jpg` (per esempio `marche.jpg`). Lo script la aggancia da solo; senza foto la scheda mostra le iniziali.

## Modulo contatti

Il vecchio modulo era WPForms, cioè un plugin di WordPress: su un sito statico non esiste. Finché `contattiEndpoint` in `data/config.js` è vuoto, il modulo prepara una mail precompilata per info@retepopolare.com. Per l'invio diretto dal sito basta un indirizzo che riceva il modulo, per esempio:

- un **Google Apps Script** nel Workspace di RP che inoltra a info@ (nessun servizio esterno);
- **FormSubmit**: `https://formsubmit.co/ajax/info@retepopolare.com` (al primo invio arriva a info@ una mail di attivazione da confermare).

## Rigenerare il PDF dello Statuto e del Regolamento

Aprire `statuto.html` (o `regolamento.html`) in Chrome, Stampa → Salva come PDF, formato A4, margini predefiniti, «Grafica di sfondo» attiva.

## Il nostro giudizio
`data/testi.js`: comunicati, documenti di giudizio, articoli e volantini, in alto i più recenti.
I testi nostri (PDF o immagini) vanno in `documenti/testi/` e si indicano nel campo `file`;
gli articoli usciti sui giornali si indicano con `link`, `autore` e `fonte`, senza copiarne il testo.
