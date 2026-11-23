/* Rete Popolare — comportamento del sito.
   I contenuti stanno in data/*.js: qui non serve toccare nulla per aggiornarli. */
(function () {
  "use strict";
  var CFG = window.RP_CONFIG || {};
  var COORD = (window.RP_COORDINAMENTI || { elenco: [] }).elenco;
  var EVENTI = (window.RP_EVENTI || []).filter(function (e) { return e.pubblica !== false; });
  var GEO = window.RP_GEO || { regions: {}, provinces: {} };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- link esterni da config ---------- */
  $$("[data-link]").forEach(function (a) {
    var k = a.getAttribute("data-link");
    if (k === "email") { a.href = "mailto:" + CFG.email; return; }
    if (CFG[k]) { a.href = CFG[k]; a.target = "_blank"; a.rel = "noopener"; }
    else a.hidden = true;
  });

  /* ---------- menu mobile ---------- */
  var burger = $(".burger"), nav = $("#nav");
  burger.addEventListener("click", function () {
    var open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", open); nav.classList.toggle("open", open);
  });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", function () { burger.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }); });

  /* ---------- social ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9L15.5 12z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.6L14 1.5c-4 0-4.9 3-4.9 4.9v2.1H6.8v4.1h2.3V22.5h4.9V12.6h3.3l.4-4.1z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21zm4.8 15.2a.7.7 0 0 1-1 .2c-2.7-1.6-6-2-10-1.1a.7.7 0 1 1-.3-1.4c4.3-1 8-.6 11 1.3.3.2.4.6.3 1zm1.3-2.9a.9.9 0 0 1-1.2.3c-3-1.9-7.7-2.4-11.3-1.3a.9.9 0 1 1-.5-1.7c4.1-1.2 9.2-.6 12.7 1.5.4.3.5.8.3 1.2zm.1-3c-3.7-2.2-9.7-2.4-13.2-1.3a1 1 0 1 1-.6-2c4-1.2 10.7-1 14.9 1.5a1 1 0 1 1-1.1 1.8z"/></svg>'
  };
  ICONS.whatsapp = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.6A10.3 10.3 0 0 0 3.2 17.2L1.8 22.4l5.3-1.4A10.3 10.3 0 1 0 12 1.6zm0 18.8c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.5 8.5 0 1 1 12 20.4zm4.7-6.4c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.6.1a7 7 0 0 1-3.5-3c-.3-.5.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.4 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>';
  $$("[data-icon]").forEach(function (i) { i.outerHTML = ICONS[i.getAttribute("data-icon")] || ""; });
  var socialHtml = [["instagram", "Instagram"], ["community", "Community WhatsApp", "whatsapp"], ["youtube", "YouTube"], ["facebook", "Facebook"], ["spotify", "La Stoccata su Spotify"]]
    .filter(function (s) { return CFG[s[0]]; })
    .map(function (s) { return '<a href="' + esc(CFG[s[0]]) + '" target="_blank" rel="noopener" aria-label="' + s[1] + '">' + ICONS[s[2] || s[0]] + "</a>"; }).join("");
  $$(".social").forEach(function (el) { el.innerHTML = socialHtml; });

  /* ---------- direttivo e staff (schede ufficiali, da data/persone.js) ---------- */
  var PERS = window.RP_PERSONE || { direttivo: [], staff: [] };
  function cards(list) {
    return list.map(function (p) {
      var img = '<img src="' + esc(p.scheda) + '" alt="' + esc(p.nome + ", " + p.ruolo) + '" loading="lazy" width="720" height="900">';
      return p.instagram
        ? '<a class="card card--link" href="' + esc(p.instagram) + '" target="_blank" rel="noopener" aria-label="' + esc(p.nome) + ' su Instagram">' + img + '<span class="card__ig">' + ICONS.instagram + "</span></a>"
        : '<figure class="card">' + img + "</figure>";
    }).join("");
  }
  $("#cardsDirettivo").innerHTML = cards(PERS.direttivo);
  $("#cardsStaff").innerHTML = cards(PERS.staff);

  /* ---------- date ---------- */
  var MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  var GIORNI = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  function parseD(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dLong(s) { var d = parseD(s); return GIORNI[d.getDay()] + " " + d.getDate() + " " + MESI[d.getMonth()] + " " + d.getFullYear(); }
  function dShort(s) { var d = parseD(s); return d.getDate() + " " + MESI[d.getMonth()] + " " + d.getFullYear(); }
  var today = new Date(); today.setHours(0, 0, 0, 0);

  /* ---------- numeri in testata ---------- */
  var regioni = {};
  var REG_OF = { "Varese": "Lombardia", "Monza e della Brianza": "Lombardia", "Bergamo": "Lombardia", "Lecco": "Lombardia", "Como": "Lombardia", "Milano": "Lombardia", "Saronno": "Lombardia", "Novate Milanese": "Lombardia", "Padova": "Veneto", "Bologna": "Emilia-Romagna" };
  COORD.forEach(function (c) { regioni[c.livello === "R" ? c.geo : (REG_OF[c.geo] || c.geo)] = 1; });
  $("#heroStats").innerHTML =
    "<div><dt>Coordinamenti territoriali</dt><dd>" + COORD.length + "</dd></div>" +
    "<div><dt>Regioni</dt><dd>" + Object.keys(regioni).length + "</dd></div>" +
    "<div><dt>Coordinatori eletti</dt><dd>" + COORD.filter(function (c) { return c.stato === "eletto"; }).length + "</dd></div>";

  /* ---------- scheda coordinatore ---------- */
  var LIV = { R: "Regionale", P: "Provinciale", C: "Comunale" };
  function coordTitle(c) {
    if (c.livello === "R") return "Coordinamento Regionale " + c.nome;
    if (c.livello === "P") return c.nome.indexOf("Provincia") === 0 ? "Coordinamento " + c.nome : "Coordinamento Provinciale di " + c.nome;
    return c.nome.indexOf("Città") === 0 ? "Coordinamento " + c.nome : "Coordinamento Comunale di " + c.nome;
  }
  function roleLabel(c) {
    var r = (c.coordinatore && c.coordinatore.ruolo) || "Coordinatore";
    return r + " " + LIV[c.livello].toLowerCase().replace(/e$/, "e");
  }
  function igCard(c) {
    var p = c.coordinatore, face, name;
    if (p) {
      var ini = (p.nome[0] + p.cognome.replace(/^(De |Di |Del |Della )/i, "")[0]).toUpperCase();
      face = '<div class="ig__face">' + (p.foto ? '<img src="' + esc(p.foto) + '" alt="">' : "<span>" + esc(ini) + "</span>") + "</div>";
      var long = (p.cognome.length > 10 || p.nome.length > 10) ? " long" : "";
      name = '<div class="ig__name' + long + '">' + esc(p.nome) + "<b>" + esc(p.cognome) + "</b></div>" +
        '<div class="ig__pill">' + esc(roleLabel(c)) + "</div>";
    } else {
      face = '<div class="ig__face logo"><img src="assets/img/logo-rp.png" alt=""></div>';
      name = '<div class="ig__name">' + esc(c.nome) + "<b>In costituzione</b></div>" +
        '<div class="ig__pill">' + esc(LIV[c.livello]) + "</div>";
    }
    return '<div class="ig" role="img" aria-label="' + esc(coordTitle(c) + (p ? ": " + p.nome + " " + p.cognome : "")) + '">' +
      '<img class="ig__logo" src="assets/img/logo-rp.png" alt="">' +
      '<div class="ig__eyebrow">Rete Popolare</div>' +
      '<div class="ig__word" style="--wordsize:15.2cqw">Coordinamento</div>' + face + name + "</div>";
  }
  function openCoord(id, push) {
    var c = COORD.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    var p = c.coordinatore, info;
    if (p) {
      info = "<dl><dt>Livello</dt><dd>" + LIV[c.livello] + "</dd><dt>" + esc(p.ruolo || "Coordinatore") + "</dt><dd>" + esc(p.nome + " " + p.cognome) + "</dd>" +
        (c.eletto ? "<dt>Eletto</dt><dd>dall'Assemblea del " + dShort(c.eletto) + "</dd>" : "") + "</dl>";
      if (p.ruolo === "Coordinatrice") info = info.replace("<dt>Eletto</dt>", "<dt>Eletta</dt>");
    } else {
      info = "<dl><dt>Livello</dt><dd>" + LIV[c.livello] + "</dd><dt>Stato</dt><dd>" +
        (c.stato === "convocata" && c.assemblea ? "Assemblea costitutiva il " + dShort(c.assemblea) : "Il Coordinamento è in costituzione") + "</dd></dl>";
    }
    openModal('<div class="sheet">' + igCard(c) + "<div>" +
      '<span class="tag">Coordinamento ' + LIV[c.livello].toLowerCase() + "</span>" +
      '<h2 id="modalTitle">' + esc(c.nome) + "</h2>" + info +
      "<p>Sei socio di questo territorio o vuoi metterti in contatto con il Coordinamento? Scrivi alla Segreteria: ti metteremo in contatto.</p>" +
      '<div class="row-btn"><a class="btn btn--yellow" href="#contatti" data-close data-subject="' + esc(coordTitle(c)) + '">Scrivi al Coordinamento</a></div>' +
      "</div></div>", "coord-" + c.id, push);
  }

  /* ---------- modale ---------- */
  var modal = $("#modal"), body = $("#modalBody"), lastFocus = null;
  function openModal(html, hash, push) {
    lastFocus = document.activeElement;
    body.innerHTML = html; modal.hidden = false; document.body.style.overflow = "hidden";
    $(".modal__x").focus();
    if (hash && push !== false && location.hash !== "#" + hash) { try { history.pushState(null, "", "#" + hash); } catch (e) { location.hash = hash; } }
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true; body.innerHTML = ""; document.body.style.overflow = "";
    if (/^#(coord|evento)-/.test(location.hash)) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener("click", function (e) {
    var t = e.target.closest("[data-close]"); if (!t) return;
    var subj = t.getAttribute("data-subject");
    closeModal();
    if (subj) { setSubject(subj); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab" && !modal.hidden) {
      var f = $$("a[href],button,input,textarea,[tabindex]:not([tabindex='-1'])", modal).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- mappa ---------- */
  var NS = "http://www.w3.org/2000/svg", K = 100, LON0 = 6.55, LAT0 = 47.15, C = Math.cos(42 * Math.PI / 180);
  var proj = function (lat, lon) { return [(lon - LON0) * K * C, (LAT0 - lat) * K]; };
  var svg = $("#map"), tip = $("#tip"), box = $(".mapbox");
  function el(t, a, p) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  Object.keys(GEO.regions).forEach(function (r) { el("path", { d: GEO.regions[r], "class": "land" }, $("#gBase")); el("path", { d: GEO.regions[r], "class": "regline" }, $("#gLines")); });
  var nodes = {};
  COORD.forEach(function (c) {
    var n, h = c.stato !== "eletto" ? " h" : "";
    if (c.livello === "R") { if (!GEO.regions[c.geo]) return; n = el("path", { d: GEO.regions[c.geo], "class": "f R" + h }, $("#gR")); }
    else if (c.livello === "P") { if (!GEO.provinces[c.geo]) return; n = el("path", { d: GEO.provinces[c.geo], "class": "f P" + h }, $("#gP")); }
    else { var xy = proj(c.lat, c.lon); n = el("circle", { cx: xy[0], cy: xy[1], r: 4.2, "stroke-width": 1.6, "class": "dot" + h }, $("#gC")); }
    n.setAttribute("tabindex", "0"); n.setAttribute("role", "button");
    n.setAttribute("aria-label", coordTitle(c) + (c.coordinatore ? ", " + c.coordinatore.nome + " " + c.coordinatore.cognome : ", in costituzione"));
    n.addEventListener("mouseenter", function (e) { showTip(c, e); hl(c.id, true); });
    n.addEventListener("mousemove", moveTip);
    n.addEventListener("mouseleave", function () { tip.hidden = true; hl(c.id, false); });
    n.addEventListener("click", function () { tip.hidden = true; openCoord(c.id); });
    n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCoord(c.id); } });
    nodes[c.id] = n;
  });
  function showTip(c, e) {
    tip.innerHTML = "<b>" + esc(c.nome) + "</b>" + LIV[c.livello] +
      (c.coordinatore ? " · " + esc(c.coordinatore.nome + " " + c.coordinatore.cognome) : " · in costituzione") + "<em>Tocca per aprire la scheda</em>";
    tip.hidden = false; moveTip(e);
  }
  function moveTip(e) {
    if (!e || e.clientX == null) return;
    var r = box.getBoundingClientRect(), x = e.clientX - r.left + 14, y = e.clientY - r.top + 14;
    if (x + 250 > r.width) x = Math.max(8, e.clientX - r.left - 254);
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function hl(id, on) {
    var n = nodes[id]; if (n) { n.classList.toggle("hl", on); if (on) n.parentNode.appendChild(n); }
    $$('.reg button[data-id="' + id + '"]').forEach(function (b) { b.classList.toggle("hl", on); });
  }
  function bboxAll(filter, pad) {
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    COORD.forEach(function (c) { var n = nodes[c.id]; if (!n || (filter && !filter(c))) return; var b = n.getBBox(); x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height); });
    var p = pad || 18, w = x1 - x0 + 2 * p, h = y1 - y0 + 2 * p;
    if (h < w * .7) { y0 -= (w * .7 - h) / 2; h = w * .7; }
    return [x0 - p, y0 - p, w, h];
  }
  var LOMB = { "Varese": 1, "Monza e della Brianza": 1, "Bergamo": 1, "Lecco": 1, "Como": 1, "Milano": 1, "Saronno": 1, "Novate Milanese": 1 };
  var LABEL_POS = { "saronno": "left", "novate-milanese": "left", "milano": "right", "milano-provincia": "skip" };
  function labels(fs, view) {
    var g = $("#gLab"); g.innerHTML = "";
    COORD.forEach(function (c) {
      var n = nodes[c.id]; if (!n) return;
      var inLom = !!LOMB[c.geo];
      if (view === "ita" && c.livello !== "R") return;
      if (view === "nord" && (c.livello === "C" || (c.livello === "P" && inLom))) return;
      if (view === "lom" && (c.livello === "R" || !inLom)) return;
      var pos = LABEL_POS[c.id]; if (pos === "skip") return;
      var b = n.getBBox(), x = b.x + b.width / 2, y = b.y + b.height / 2 + fs * .35, a = "middle";
      if (c.livello === "C") { x = b.x + b.width + fs * .35; a = "start"; if (pos === "left") { x = b.x - fs * .35; a = "end"; } }
      else if (pos === "right") { x = b.x + b.width + fs * .2; a = "start"; }
      var label = c.livello === "C" ? c.nome.replace("Città di ", "") : c.nome;
      var t = el("text", { x: x, y: y, "font-size": fs, "stroke-width": fs * .3, "text-anchor": a, "class": "lab" }, g); t.textContent = label;
    });
  }
    var FULL = [0, 0, 900, 1172];
  function setView(v) {
    var vb = v === "ita" ? FULL : v === "lom" ? bboxAll(function (c) { return c.livello !== "R" && LOMB[c.geo]; }, 10) : bboxAll();
    svg.setAttribute("viewBox", vb.join(" "));
    var k = vb[2] / 900;
    labels(v === "ita" ? 15 : Math.max(4.5, vb[2] / (v === "lom" ? 46 : 52)), v);
    $$("#gC circle").forEach(function (c) { c.setAttribute("r", v === "ita" ? 5 : Math.max(2, 6.5 * k)); c.setAttribute("stroke-width", v === "ita" ? 1.6 : Math.max(.6, 2 * k)); });
    $$("#gLines path, #gR path, #gP path").forEach(function (l) { l.style.strokeWidth = v === "ita" ? "" : v === "lom" ? .4 : .8; });
    [["vLom", "lom"], ["vNord", "nord"], ["vIta", "ita"]].forEach(function (b) { $("#" + b[0]).setAttribute("aria-pressed", v === b[1]); });
  }
  $("#vLom").onclick = function () { setView("lom"); };
  $("#vNord").onclick = function () { setView("nord"); };
  $("#vIta").onclick = function () { setView("ita"); };
  setView("nord");

  /* elenco accanto alla mappa */
  var reg = $("#regList"), regHtml = "";
  ["R", "P", "C"].forEach(function (lv) {
    var items = COORD.filter(function (c) { return c.livello === lv; }); if (!items.length) return;
    regHtml += "<h3>" + LIV[lv] + "</h3>";
    items.forEach(function (c) {
      var who = c.coordinatore ? esc(c.coordinatore.nome + " " + c.coordinatore.cognome) :
        (c.stato === "convocata" && c.assemblea ? "Assemblea il " + dShort(c.assemblea) : "In costituzione");
      regHtml += '<button type="button" data-id="' + c.id + '"><span class="n">' + esc(c.nome) + '</span><span class="s ' + c.stato + '">' +
        (c.stato === "eletto" ? (c.coordinatore && c.coordinatore.ruolo === "Coordinatrice" ? "Coordinatrice" : "Coordinatore") : "In costituzione") +
        '</span><span class="c">' + who + "</span></button>";
    });
  });
  reg.innerHTML = regHtml;
  $$(".reg button").forEach(function (b) {
    var id = b.getAttribute("data-id");
    b.addEventListener("click", function () { openCoord(id); });
    b.addEventListener("mouseenter", function () { hl(id, true); });
    b.addEventListener("mouseleave", function () { hl(id, false); });
    b.addEventListener("focus", function () { hl(id, true); });
    b.addEventListener("blur", function () { hl(id, false); });
  });

  /* ---------- eventi ---------- */
  EVENTI.forEach(function (e, i) { e._id = e.data + "-" + i; });
  var next = EVENTI.filter(function (e) { return parseD(e.data) >= today; }).sort(function (a, b) { return a.data < b.data ? -1 : 1; });
  var past = EVENTI.filter(function (e) { return parseD(e.data) < today; }).sort(function (a, b) { return a.data < b.data ? 1 : -1; });

  function genPoster(e) {
    var words = e.titolo.split(" "), half = Math.ceil(words.length / 2);
    return '<div class="gen"><img src="assets/img/logo-rp.png" alt=""><span class="k">' + esc(e.territorio || "Rete Popolare") + '</span>' +
      '<span class="t">' + esc(words.slice(0, half).join(" ")) + " <b>" + esc(words.slice(half).join(" ")) + '</b></span><span class="d">' + esc(dShort(e.data)) + "</span></div>";
  }
  function people(e) { return e.relatori && e.relatori.length ? "<ul>" + e.relatori.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul>" : ""; }

  $("#evNext").innerHTML = next.length ? next.map(function (e) {
    return '<article class="ev"><div class="ev__img">' + (e.immagine ? '<img src="' + esc(e.immagine) + '" alt="Locandina: ' + esc(e.titolo) + '" loading="lazy">' : '<div style="aspect-ratio:4/5">' + genPoster(e) + "</div>") + "</div><div>" +
      (e.territorio ? '<span class="tag">' + esc(e.territorio) + "</span>" : "") +
      '<p class="when"><span class="d">' + esc(dLong(e.data)) + "</span>" + (e.ora ? '<span class="h">Ore ' + esc(e.ora) + "</span>" : "") + "</p>" +
      "<h3>" + esc(e.titolo) + "</h3>" + (e.sottotitolo ? "<p>" + esc(e.sottotitolo) + "</p>" : "") +
      (e.luogo ? '<p class="where">' + esc(e.luogo) + "</p>" : "") + people(e) +
      '<div class="row-btn">' + (e.iscrizione ? '<a class="btn btn--yellow" href="' + esc(e.iscrizione) + '" target="_blank" rel="noopener">Iscriviti all\'incontro</a>' : "") + "</div>" +
      "</div></article>";
  }).join("") : '<div class="empty">Stiamo preparando i prossimi appuntamenti. <a class="link" href="' + esc(CFG.newsletter) + '" target="_blank" rel="noopener">Iscriviti alla newsletter</a> per riceverli per primo.</div>';

  var years = past.map(function (e) { return e.data.slice(0, 4); }).filter(function (y, i, a) { return a.indexOf(y) === i; });
  var yearSel = null; /* regola di Bombo del 23/11/2026: in home solo gli ultimi due eventi passati; gli altri si vedono scegliendo «Tutti» o un anno */
  function renderPast() {
    var list = yearSel === null ? past.slice(0, 2) : past.filter(function (e) { return yearSel === "tutti" || e.data.slice(0, 4) === yearSel; });
    $("#evPast").innerHTML = list.map(function (e) {
      return '<button type="button" class="pc" data-ev="' + e._id + '"><div class="pc__img">' +
        (e.immagine ? '<img src="' + esc(e.immagine) + '" alt="" loading="lazy">' : genPoster(e)) + '</div><div class="pc__body">' +
        '<div class="pc__date">' + esc(dShort(e.data)) + (e.territorio ? " · " + esc(e.territorio) : "") + '</div><div class="pc__t">' + esc(e.titolo) + "</div>" +
        (e.video ? '<div class="pc__p">Registrazione disponibile</div>' : "") + "</div></button>";
    }).join("");
    $$("#evPast .pc").forEach(function (b) { b.addEventListener("click", function () { openEvent(b.getAttribute("data-ev")); }); });
  }
  $("#evYears").innerHTML = ["tutti"].concat(years).map(function (y) { return '<button type="button" data-y="' + y + '" aria-pressed="false" aria-controls="evPast">' + (y === "tutti" ? "Tutti" : y) + "</button>"; }).join("");
  $$("#evYears button").forEach(function (b) { b.addEventListener("click", function () { var y = b.getAttribute("data-y"); yearSel = yearSel === y ? null : y; $$("#evYears button").forEach(function (x) { x.setAttribute("aria-pressed", x.getAttribute("data-y") === yearSel); }); renderPast(); }); });
  renderPast();

  function openEvent(id, push) {
    var e = EVENTI.filter(function (x) { return x._id === id; })[0]; if (!e) return;
    openModal('<div class="sheet"><div>' + (e.immagine ? '<img class="ev-poster" src="' + esc(e.immagine) + '" alt="Locandina: ' + esc(e.titolo) + '">' : '<div style="aspect-ratio:4/5;border-radius:14px;overflow:hidden">' + genPoster(e) + "</div>") + "</div><div>" +
      (e.territorio ? '<span class="tag">' + esc(e.territorio) + "</span>" : "") +
      '<h2 id="modalTitle">' + esc(e.titolo) + "</h2>" + (e.sottotitolo ? "<p>" + esc(e.sottotitolo) + "</p>" : "") +
      "<dl><dt>Quando</dt><dd>" + esc(dLong(e.data)) + (e.ora ? ", ore " + esc(e.ora) : "") + "</dd>" + (e.luogo ? "<dt>Dove</dt><dd>" + esc(e.luogo) + "</dd>" : "") + "</dl>" +
      (e.relatori && e.relatori.length ? '<div class="ev" style="background:none;padding:0;display:block">' + people(e) + "</div>" : "") +
      (e.video ? '<div class="row-btn"><a class="btn btn--yellow" href="' + esc(e.video) + '" target="_blank" rel="noopener">Guarda la registrazione</a></div>' : "") +
      "</div></div>", "evento-" + e.data, push);
  }

  /* ---------- video (da data/video.js) ---------- */
  var VID = (window.RP_VIDEO || []).slice().sort(function (a, b) { return a.data < b.data ? 1 : -1; });
  var showAll = false;
  function renderVid() {
    var list = showAll ? VID : VID.slice(0, 6);
    $("#vids").innerHTML = list.map(function (v) {
      return '<a class="vid" href="https://www.youtube.com/watch?v=' + esc(v.id) + '" target="_blank" rel="noopener"><span class="vid__img">' +
        '<img src="assets/video/' + esc(v.id) + '.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="vid__play" aria-hidden="true"></span></span>' +
        '<span class="vid__d">' + esc(dShort(v.data)) + '</span><span class="vid__t">' + esc(v.titolo) + "</span></a>";
    }).join("");
    $("#vidMore").hidden = showAll || VID.length <= 6;
  }
  $("#vidMore").addEventListener("click", function () { showAll = true; renderVid(); });
  renderVid();

  /* ---------- in evidenza (da data/evidenza.js) ---------- */
  var SPOT = (window.RP_EVIDENZA || []).filter(function (x) {
    return (!x.dal || parseD(x.dal) <= today) && (!x.al || parseD(x.al) >= today);
  })[0];
  if (SPOT && $("#evidenza")) {
    var ext = function (u) { return /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ""; };
    $("#evidenza").innerHTML = '<div class="wrap spot__in"><div class="spot__txt">' +
      (SPOT.etichetta ? '<span class="spot__pill">' + esc(SPOT.etichetta) + "</span>" : "") +
      '<h2 class="spot__t">' + esc(SPOT.titolo) + "</h2>" + (SPOT.testo ? '<p class="spot__p">' + esc(SPOT.testo) + "</p>" : "") +
      '<div class="row-btn">' + (SPOT.bottone ? '<a class="btn btn--navy" href="' + esc(SPOT.bottone.link) + '"' + ext(SPOT.bottone.link) + ">" + esc(SPOT.bottone.testo) + "</a>" : "") +
      (SPOT.secondario ? '<a class="btn btn--line-navy" href="' + esc(SPOT.secondario.link) + '"' + ext(SPOT.secondario.link) + ">" + esc(SPOT.secondario.testo) + "</a>" : "") + "</div></div>" +
      (SPOT.immagine ? '<a class="spot__img" href="' + esc(SPOT.bottone ? SPOT.bottone.link : SPOT.immagine) + '"' + ext(SPOT.bottone ? SPOT.bottone.link : "") + '><img src="' + esc(SPOT.immagine) + '" alt="' + esc(SPOT.titolo) + '" loading="lazy"></a>' : "") + "</div>";
    $("#evidenza").hidden = false;
  }

  /* ---------- il nostro giudizio (da data/testi.js) ---------- */
  var TESTI = (window.RP_TESTI || []).slice().sort(function (a, b) { return a.data < b.data ? 1 : -1; });
  var allTesti = false;
  function renderTesti() {
    var list = allTesti ? TESTI : TESTI.slice(0, 6);
    $("#testi").innerHTML = list.map(function (t) {
      var href = t.file || t.link || "#";
      var isPdf = /\.pdf$/i.test(href), isImg = /\.(jpe?g|png|webp)$/i.test(href);
      var cta = t.file ? (isPdf ? "Scarica il PDF" : isImg ? "Leggi il testo" : "Apri") : "Leggi" + (t.fonte && t.fonte.length < 20 ? " su " + t.fonte : "");
      var by = [t.autore, t.fonte].filter(Boolean).join(" · ");
      return '<a class="tx" href="' + esc(href) + '" target="_blank" rel="noopener">' +
        '<span class="tx__top"><span class="tag">' + esc(t.tipo || "Testo") + '</span><span class="tx__d">' + esc(dShort(t.data)) + "</span></span>" +
        '<span class="tx__t">' + esc(t.titolo) + "</span>" +
        (by ? '<span class="tx__by">' + esc(by) + "</span>" : "") +
        (t.sintesi ? '<span class="tx__s">' + esc(t.sintesi) + "</span>" : "") +
        '<span class="tx__cta">' + esc(cta) + " →</span></a>";
    }).join("");
    $("#testiMore").hidden = allTesti || TESTI.length <= 6;
  }
  if ($("#testi")) { $("#testiMore").addEventListener("click", function () { allTesti = true; renderTesti(); }); renderTesti(); }

  /* ---------- link profondi: #coord-<id> e #evento-<data> ---------- */
  function route() {
    var h = location.hash.slice(1);
    if (h.indexOf("coord-") === 0) openCoord(h.slice(6), false);
    else if (h.indexOf("evento-") === 0) { var e = EVENTI.filter(function (x) { return x.data === h.slice(7); })[0]; if (e) openEvent(e._id, false); }
    else closeModal();
  }
  window.addEventListener("hashchange", route);
  window.addEventListener("popstate", route);
  route();

  /* ---------- modulo contatti ---------- */
  function setSubject(s) {
    var o = $("#fOggetto"); o.value = s;
    setTimeout(function () { $("#contatti").scrollIntoView({ behavior: "smooth" }); $("#fNome").focus({ preventScroll: true }); }, 30);
  }
  $$("a[data-subject]").forEach(function (a) { if (!a.hasAttribute("data-close")) a.addEventListener("click", function (e) { e.preventDefault(); setSubject(a.getAttribute("data-subject")); }); });

  var form = $("#form"), out = $("#formOut");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var ok = true;
    ["fNome", "fEmail", "fMsg"].forEach(function (id) {
      var f = $("#" + id), bad = !f.value.trim() || (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim()));
      f.setAttribute("aria-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { out.textContent = "Compila i campi obbligatori: nome, email valida e messaggio."; return; }
    if (form._gotcha && form._gotcha.value) return;
    var d = { nome: $("#fNome").value.trim(), email: $("#fEmail").value.trim(), oggetto: $("#fOggetto").value.trim() || "Messaggio dal sito", messaggio: $("#fMsg").value.trim() };
    var mail = "mailto:" + CFG.email + "?subject=" + encodeURIComponent(d.oggetto) + "&body=" + encodeURIComponent(d.messaggio + "\n\n" + d.nome + " <" + d.email + ">");
    var fallback = function (pre) {
      out.innerHTML = (pre || "") + 'Il tuo messaggio è pronto: <a href="' + esc(mail) + '">aprilo nel programma di posta</a> e invialo a <strong>' + esc(CFG.email) + "</strong>.";
    };
    if (!CFG.contattiEndpoint) { fallback(""); return; }
    var fd = new FormData(); fd.append("nome", d.nome); fd.append("email", d.email); fd.append("_replyto", d.email); fd.append("oggetto", d.oggetto); fd.append("_subject", "[Sito RP] " + d.oggetto); fd.append("messaggio", d.messaggio);
    out.textContent = "Invio in corso…";
    fetch(CFG.contattiEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); out.textContent = "Grazie, " + d.nome + ": messaggio inviato. Ti risponderemo a " + d.email + "."; form.reset(); })
      .catch(function () { fallback("Non siamo riusciti a inviare il messaggio dal sito. "); });
  });
})();
