/* ════════════════════════════════════════════════════════════════════════════
   PORTFOLIO.JS — Gestion de la section "Mon portefeuille"
   ────────────────────────────────────────────────────────────────────────────
   Ce fichier contient TOUTE la logique du portefeuille personnel :
     • Saisie/édition/suppression de lignes (ticker, quantité, PRU, compte, date)
     • Calcul automatique de la valeur, +/- value et performance
     • Persistance dans le navigateur (localStorage) — aucune base de données
     • Mise à jour des cours via Yahoo Finance (en passant par un proxy CORS)
     • Sauvegarde des cours mis à jour dans localStorage (override des cours codés)

   ARCHITECTURE — flux de données
   ────────────────────────────────────────────────────────────────────────────
     1. ETF_DATA (dans data.js) contient les cours codés en dur (fallback)
     2. priceOverrides (dans localStorage) contient les cours mis à jour via Yahoo
     3. getCurrentPrice(etf) renvoie l'override si présent, sinon le cours codé
     4. portfolio (dans localStorage) contient les lignes de l'utilisateur

   IMPORTANT — limitation technique
   ────────────────────────────────────────────────────────────────────────────
     Un site web statique (comme celui-ci) NE PEUT PAS réécrire ses propres
     fichiers source (data.js). Quand on "sauvegarde" un cours, on le stocke
     en réalité dans le localStorage du navigateur. C'est suffisant pour un
     usage personnel : le cours mis à jour est conservé d'une session à l'autre.
     Si vous changez de navigateur ou videz le cache, les overrides sont perdus
     et le dashboard repart sur les cours codés en dur dans data.js.
   ══════════════════════════════════════════════════════════════════════════ */


/* ─────────────────────────── CONSTANTES GLOBALES ──────────────────────────── */

// Clé localStorage pour les lignes du portefeuille (tableau d'objets)
const PF_STORAGE_KEY = "etf_portfolio_v2";  // v2 car on a ajouté account et purchaseDate

// Clé localStorage pour les cours mis à jour via Yahoo Finance
// Structure : { "SPY": { price: 715.17, currency: "USD", updatedAt: "2026-04-28T..." }, ... }
const PRICE_OVERRIDES_KEY = "etf_price_overrides_v1";

// Proxy CORS public pour contourner le blocage de Yahoo Finance par les navigateurs
// Yahoo Finance ne renvoie pas l'en-tête CORS nécessaire ; le proxy l'ajoute pour nous
// Alternative si celui-ci tombe : "https://api.allorigins.win/raw?url=" (à URL-encoder)
const YAHOO_PROXY = "https://corsproxy.io/?";

// URL de base de l'API Yahoo Finance utilisée
// /v8/finance/chart/{symbole} renvoie le cours en temps réel + l'historique
const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";


/* ─────────────────────── CHARGEMENT INITIAL DES DONNÉES ───────────────────── */

// Tableau des lignes du portefeuille (chargé depuis localStorage ou pré-rempli)
let portfolio = loadPortfolio();

// Objet des cours mis à jour (override des cours codés dans data.js)
let priceOverrides = loadPriceOverrides();

/**
 * Charge le portefeuille depuis le localStorage.
 * Si rien n'est sauvegardé, retourne deux lignes d'exemple (WPEA et DCAM).
 * @returns {Array<Object>} Tableau des lignes du portefeuille
 */
function loadPortfolio() {
  try {
    const raw = localStorage.getItem(PF_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // Si JSON corrompu ou localStorage indisponible, on retombe sur les valeurs par défaut
    console.warn("Erreur chargement portefeuille:", e);
  }
  // Lignes par défaut au premier lancement — l'utilisateur peut les modifier ou supprimer
  return [
    {
      id: pfId(),               // identifiant unique (utilisé pour cibler la ligne dans le DOM)
      ticker: "WPEA",            // symbole de l'ETF (doit exister dans ETF_DATA)
      quantity: 100,             // nombre de parts détenues
      pru: 5.50,                 // Prix de Revient Unitaire (= prix d'achat moyen par part)
      account: "PEA",            // type de compte : "PEA", "CTO" ou "AV"
      purchaseDate: "2024-09-15" // date d'achat au format YYYY-MM-DD (pour l'historique)
    },
    {
      id: pfId(),
      ticker: "DCAM",
      quantity: 200,
      pru: 5.20,
      account: "PEA",
      purchaseDate: "2025-02-10"
    },
  ];
}

/**
 * Sauvegarde le portefeuille dans le localStorage.
 * Appelée après chaque modification (ajout, suppression, édition).
 */
function savePortfolio() {
  try {
    localStorage.setItem(PF_STORAGE_KEY, JSON.stringify(portfolio));
  } catch (e) {
    console.warn("Erreur sauvegarde portefeuille:", e);
  }
}

/**
 * Charge les overrides de cours (cours mis à jour via Yahoo) depuis localStorage.
 * @returns {Object} Dictionnaire { ticker: { price, currency, updatedAt } }
 */
function loadPriceOverrides() {
  try {
    const raw = localStorage.getItem(PRICE_OVERRIDES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch (e) {
    console.warn("Erreur chargement overrides:", e);
  }
  return {};
}

/**
 * Sauvegarde les overrides de cours dans le localStorage.
 */
function savePriceOverrides() {
  try {
    localStorage.setItem(PRICE_OVERRIDES_KEY, JSON.stringify(priceOverrides));
  } catch (e) {
    console.warn("Erreur sauvegarde overrides:", e);
  }
}

/**
 * Génère un identifiant unique pour une ligne de portefeuille.
 * Utilisé dans data-id="..." sur les <tr> pour cibler la ligne au clic.
 * @returns {string} Identifiant aléatoire (ex: "p_a3b9c2")
 */
function pfId() {
  return "p_" + Math.random().toString(36).slice(2, 10);
}


/* ──────────────────── ACCÈS AUX DONNÉES DE L'ETF ──────────────────────────── */

/**
 * Cherche un ETF par son ticker dans ETF_DATA (variable globale de data.js).
 * @param {string} ticker - Symbole de l'ETF (ex: "WPEA", "SPY")
 * @returns {Object|undefined} L'objet ETF ou undefined si non trouvé
 */
function findEtf(ticker) {
  return ETF_DATA.find((e) => e.ticker === ticker);
}

/**
 * Renvoie le cours actuel d'un ETF en privilégiant l'override (Yahoo) si présent.
 * Sinon utilise le cours codé en dur dans data.js.
 * @param {Object} etf - L'objet ETF (issu de findEtf)
 * @returns {{price: number, currency: string, source: string, updatedAt: string|null}}
 */
function getCurrentPrice(etf) {
  if (!etf) return { price: 0, currency: "USD", source: "none", updatedAt: null };
  // Si on a un override pour ce ticker, on l'utilise en priorité
  const ov = priceOverrides[etf.ticker];
  if (ov && typeof ov.price === "number") {
    return {
      price: ov.price,
      currency: ov.currency || etf.currency,
      source: "yahoo",          // pour afficher un indicateur visuel "MAJ" si besoin
      updatedAt: ov.updatedAt   // ISO 8601 — timestamp de la dernière MAJ
    };
  }
  // Sinon on retombe sur la valeur codée en dur
  return {
    price: etf.currentPrice,
    currency: etf.currency,
    source: "static",
    updatedAt: null
  };
}


/* ──────────────────── APPEL À YAHOO FINANCE ───────────────────────────────── */

/**
 * Récupère le cours actuel d'un ETF via l'API Yahoo Finance (via proxy CORS).
 * @param {string} yahooSymbol - Symbole Yahoo (ex: "SPY", "WPEA.PA", "IWDA.AS")
 * @returns {Promise<{price: number, currency: string}|null>} Le cours, ou null en cas d'échec
 */
async function fetchYahooPrice(yahooSymbol) {
  if (!yahooSymbol) return null;
  // On encode le symbole pour gérer les caractères spéciaux (point, etc.)
  const url = YAHOO_PROXY + encodeURIComponent(YAHOO_BASE + yahooSymbol);
  try {
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) {
      console.warn(`Yahoo HTTP ${resp.status} pour ${yahooSymbol}`);
      return null;
    }
    const json = await resp.json();
    // Structure de la réponse Yahoo : json.chart.result[0].meta.regularMarketPrice
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") {
      console.warn(`Pas de cours pour ${yahooSymbol}`);
      return null;
    }
    return {
      price: meta.regularMarketPrice,
      currency: meta.currency || "USD"
    };
  } catch (e) {
    // Erreur réseau, proxy hors ligne, etc. — on log et on renvoie null
    console.warn(`Erreur fetch ${yahooSymbol}:`, e.message);
    return null;
  }
}

/**
 * Met à jour le cours d'un ETF en interrogeant Yahoo, puis sauvegarde l'override.
 * @param {string} ticker - Ticker dashboard (ex: "WPEA")
 * @returns {Promise<boolean>} true si la mise à jour a réussi, false sinon
 */
async function updateEtfPrice(ticker) {
  const etf = findEtf(ticker);
  if (!etf || !etf.yahooSymbol) {
    console.warn(`Pas de symbole Yahoo pour ${ticker}`);
    return false;
  }
  const result = await fetchYahooPrice(etf.yahooSymbol);
  if (!result) return false;
  // On stocke le nouveau cours + sa devise + l'horodatage de la MAJ
  priceOverrides[ticker] = {
    price: result.price,
    currency: result.currency,
    updatedAt: new Date().toISOString()
  };
  savePriceOverrides();
  return true;
}


/* ──────────────────── FORMATAGE DES VALEURS POUR L'AFFICHAGE ──────────────── */

/**
 * Formate un montant en devise (€ ou $) selon la convention française.
 * Exemples : 1234.56 EUR → "1 234,56 €", -42 USD → "-$42,00"
 * @param {number} value - Le montant
 * @param {string} currency - "EUR" ou "USD"
 * @returns {string} Montant formaté
 */
function pfFmtMoney(value, currency) {
  if (!isFinite(value)) return "—";
  const symbol = currency === "EUR" ? "€" : "$";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Convention française : € APRÈS le montant ; convention US : $ AVANT
  return currency === "EUR"
    ? `${sign}${formatted} ${symbol}`
    : `${sign}${symbol}${formatted}`;
}

/**
 * Formate un pourcentage avec virgule décimale et signe + si positif.
 * Exemple : 11.67 → "+11,67 %"
 */
function pfFmtPct(value) {
  if (!isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2).replace(".", ",")} %`;
}

/**
 * Formate une date ISO (YYYY-MM-DD) en date courte française.
 * Exemple : "2024-09-15" → "15/09/2024"
 */
function pfFmtDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

/**
 * Formate un horodatage ISO en heure courte ("il y a X minutes" ou date courte).
 * Utilisé pour afficher quand le cours a été mis à jour pour la dernière fois.
 */
function pfFmtUpdatedAt(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diffMin = Math.floor((now - date) / 60000);
  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} h`;
  return date.toLocaleDateString("fr-FR");
}


/* ─────────────────── CALCULS DE TOTAUX ────────────────────────────────────── */

/**
 * Calcule les totaux par devise (EUR et USD séparés car non additionnables).
 * @returns {Object} { EUR: {invested, current, lines}, USD: {...} }
 */
function pfComputeTotals() {
  const byCurrency = {};
  for (const line of portfolio) {
    const etf = findEtf(line.ticker);
    if (!etf) continue;  // ETF inconnu : on ignore la ligne pour les totaux
    const qty = parseFloat(line.quantity) || 0;
    const pru = parseFloat(line.pru) || 0;
    const { price, currency } = getCurrentPrice(etf);
    if (!byCurrency[currency]) {
      byCurrency[currency] = { invested: 0, current: 0, lines: 0 };
    }
    byCurrency[currency].invested += qty * pru;       // Capital investi
    byCurrency[currency].current += qty * price;      // Valeur actuelle
    byCurrency[currency].lines += 1;
  }
  return byCurrency;
}


/* ─────────────────── RENDU HTML ─────────────────────────────────────────── */

/**
 * Génère et insère les cartes de synthèse au-dessus du tableau.
 * Une série de 4 cartes par devise (Investi, Valeur, +/- value, Performance).
 */
function renderPortfolioSummary() {
  const el = document.getElementById("portfolio-summary");
  if (!el) return;
  const totals = pfComputeTotals();
  const currencies = Object.keys(totals);
  if (currencies.length === 0) {
    el.innerHTML = "";
    return;
  }
  let html = "";
  for (const cur of currencies) {
    const t = totals[cur];
    const plv = t.current - t.invested;                            // +/- value en valeur absolue
    const pct = t.invested > 0 ? (plv / t.invested) * 100 : 0;     // Performance en %
    const cls = plv >= 0 ? "pos" : "neg";                          // Classe CSS verte ou rouge
    html += `
      <div class="pf-stat">
        <span class="pf-stat-label">Investi (${cur})</span>
        <span class="pf-stat-value">${pfFmtMoney(t.invested, cur)}</span>
      </div>
      <div class="pf-stat">
        <span class="pf-stat-label">Valeur actuelle (${cur})</span>
        <span class="pf-stat-value">${pfFmtMoney(t.current, cur)}</span>
      </div>
      <div class="pf-stat">
        <span class="pf-stat-label">+/- value (${cur})</span>
        <span class="pf-stat-value ${cls}">${pfFmtMoney(plv, cur)}</span>
      </div>
      <div class="pf-stat">
        <span class="pf-stat-label">Performance (${cur})</span>
        <span class="pf-stat-value ${cls}">${pfFmtPct(pct)}</span>
      </div>
    `;
  }
  el.innerHTML = html;
}

/**
 * Génère le HTML d'UNE ligne du tableau portefeuille.
 * @param {Object} line - L'objet ligne du portefeuille
 * @returns {string} Le HTML de la balise <tr>
 */
function renderPortfolioRow(line) {
  const etf = findEtf(line.ticker);

  // Construction du <select> pour le ticker (toutes les options + sélection actuelle)
  const tickerOptions = ETF_DATA
    .map((e) => `<option value="${e.ticker}"${e.ticker === line.ticker ? " selected" : ""}>${e.ticker}</option>`)
    .join("");

  // Construction du <select> pour le compte (PEA, CTO, AV) avec la valeur actuelle sélectionnée
  const accountOptions = ["PEA", "CTO", "AV"]
    .map((acc) => `<option value="${acc}"${line.account === acc ? " selected" : ""}>${acc}</option>`)
    .join("");

  // Cas particulier : ETF inexistant (ne devrait pas arriver, mais sécurité)
  if (!etf) {
    return `
      <tr data-id="${line.id}">
        <td><select class="ticker-select" data-field="ticker">${tickerOptions}</select></td>
        <td colspan="9" style="color: var(--muted);">ETF inconnu</td>
        <td><button class="row-delete" title="Supprimer">×</button></td>
      </tr>`;
  }

  // Calculs pour la ligne
  const qty = parseFloat(line.quantity) || 0;
  const pru = parseFloat(line.pru) || 0;
  const priceInfo = getCurrentPrice(etf);
  const price = priceInfo.price;
  const cur = priceInfo.currency;
  const value = qty * price;            // Valeur actuelle de la position
  const invested = qty * pru;           // Capital investi
  const plv = value - invested;         // +/- value
  const pct = invested > 0 ? (plv / invested) * 100 : 0;
  const cls = plv >= 0 ? "pos" : "neg";

  // Indicateur visuel "MAJ" + tooltip avec horodatage si le cours vient de Yahoo
  const updatedBadge = priceInfo.source === "yahoo"
    ? `<span class="price-updated" title="Mis à jour ${pfFmtUpdatedAt(priceInfo.updatedAt)} via Yahoo">●</span>`
    : "";

  // Couleur pour la pastille du compte (PEA = vert, CTO = bleu, AV = orange)
  const accountClass = `account-badge account-${(line.account || "PEA").toLowerCase()}`;

  return `
    <tr data-id="${line.id}">
      <td><select class="ticker-select" data-field="ticker">${tickerOptions}</select></td>
      <td title="${etf.name}" class="etf-name">${etf.name.length > 32 ? etf.name.slice(0, 30) + "…" : etf.name}</td>
      <td><select class="${accountClass}" data-field="account">${accountOptions}</select></td>
      <td><input type="number" class="num-input" data-field="quantity" value="${qty}" step="any" min="0" /></td>
      <td><input type="number" class="num-input" data-field="pru" value="${pru}" step="any" min="0" /></td>
      <td><input type="date" class="date-input" data-field="purchaseDate" value="${line.purchaseDate || ""}" /></td>
      <td class="num">${pfFmtMoney(price, cur)} ${updatedBadge}</td>
      <td class="num">${pfFmtMoney(value, cur)}</td>
      <td class="num ${cls}">${pfFmtMoney(plv, cur)}</td>
      <td class="num ${cls}">${pfFmtPct(pct)}</td>
      <td class="actions-cell">
        <button class="row-update" title="Mettre à jour le cours via Yahoo">↻</button>
        <button class="row-delete" title="Supprimer">×</button>
      </td>
    </tr>
  `;
}

/**
 * Rendu complet du portefeuille (synthèse + tableau).
 * Appelée à chaque modification.
 */
function renderPortfolio() {
  const tbody = document.getElementById("portfolio-tbody");
  if (!tbody) return;
  if (portfolio.length === 0) {
    // État vide : message centré dans le tableau
    tbody.innerHTML = `<tr class="empty-row"><td colspan="11">Aucune ligne. Cliquez sur « + Ajouter une ligne » pour commencer.</td></tr>`;
  } else {
    tbody.innerHTML = portfolio.map(renderPortfolioRow).join("");
  }
  renderPortfolioSummary();
  attachPortfolioRowEvents();
}


/* ──────────────────── GESTION DES ÉVÉNEMENTS UTILISATEUR ──────────────────── */

/**
 * Attache tous les événements aux éléments du tableau (selects, inputs, boutons).
 * Appelée après chaque rendu (car les éléments sont recréés).
 */
function attachPortfolioRowEvents() {
  const tbody = document.getElementById("portfolio-tbody");
  if (!tbody) return;

  // ─── Modification d'un champ (ticker, compte, quantité, PRU, date) ───
  tbody.querySelectorAll("select[data-field], input[data-field]").forEach((el) => {
    // Événement "change" : déclenché quand l'utilisateur valide (perd le focus, sélectionne, etc.)
    el.addEventListener("change", (ev) => {
      const tr = ev.target.closest("tr[data-id]");
      if (!tr) return;
      const id = tr.dataset.id;
      const field = ev.target.dataset.field;
      const line = portfolio.find((l) => l.id === id);
      if (!line) return;
      line[field] = ev.target.value;     // On écrit la nouvelle valeur dans l'objet
      savePortfolio();                    // On persiste dans localStorage
      renderPortfolio();                  // On re-rendre tout (pour màj nom ETF, etc.)
    });

    // Pour les inputs numériques on ajoute un événement "input" pour réactivité immédiate
    // (pas d'attente du blur — l'utilisateur voit son calcul changer en tapant)
    if (el.tagName === "INPUT" && el.type === "number") {
      el.addEventListener("input", (ev) => {
        const tr = ev.target.closest("tr[data-id]");
        if (!tr) return;
        const id = tr.dataset.id;
        const field = ev.target.dataset.field;
        const line = portfolio.find((l) => l.id === id);
        if (!line) return;
        line[field] = ev.target.value;
        savePortfolio();
        renderPortfolioSummary();          // On màj juste le résumé
        updateRowCalculated(tr, line);     // Et les cellules calculées de la ligne courante
      });
    }
  });

  // ─── Bouton de mise à jour du cours (par ligne) ───
  tbody.querySelectorAll(".row-update").forEach((btn) => {
    btn.addEventListener("click", async (ev) => {
      const tr = ev.target.closest("tr[data-id]");
      if (!tr) return;
      const id = tr.dataset.id;
      const line = portfolio.find((l) => l.id === id);
      if (!line) return;
      // UI : pendant le fetch on désactive le bouton et on montre une animation
      btn.disabled = true;
      btn.classList.add("loading");
      btn.textContent = "…";
      const ok = await updateEtfPrice(line.ticker);
      btn.disabled = false;
      btn.classList.remove("loading");
      btn.textContent = "↻";
      if (ok) {
        renderPortfolio();   // Re-rendre pour afficher le nouveau cours et le badge
      } else {
        alert(`Impossible de récupérer le cours de ${line.ticker}. Vérifiez votre connexion ou le symbole Yahoo.`);
      }
    });
  });

  // ─── Bouton de suppression de ligne ───
  tbody.querySelectorAll(".row-delete").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const tr = ev.target.closest("tr[data-id]");
      if (!tr) return;
      const id = tr.dataset.id;
      portfolio = portfolio.filter((l) => l.id !== id);  // On retire la ligne du tableau
      savePortfolio();
      renderPortfolio();
    });
  });
}

/**
 * Met à jour UNIQUEMENT les cellules calculées d'une ligne (sans tout re-rendre).
 * Utilisée pendant la frappe pour la réactivité immédiate.
 * @param {HTMLElement} tr - L'élément <tr> de la ligne
 * @param {Object} line - L'objet ligne
 */
function updateRowCalculated(tr, line) {
  const etf = findEtf(line.ticker);
  if (!etf) return;
  const qty = parseFloat(line.quantity) || 0;
  const pru = parseFloat(line.pru) || 0;
  const { price, currency } = getCurrentPrice(etf);
  const value = qty * price;
  const invested = qty * pru;
  const plv = value - invested;
  const pct = invested > 0 ? (plv / invested) * 100 : 0;
  const cls = plv >= 0 ? "pos" : "neg";

  const tds = tr.querySelectorAll("td");
  // Indices des colonnes (cohérents avec renderPortfolioRow) :
  // 0 ticker  | 1 nom    | 2 compte | 3 qty   | 4 pru | 5 date
  // 6 cours   | 7 valeur | 8 plv    | 9 perf  | 10 actions
  tds[7].textContent = pfFmtMoney(value, currency);
  tds[8].textContent = pfFmtMoney(plv, currency);
  tds[8].className = "num " + cls;
  tds[9].textContent = pfFmtPct(pct);
  tds[9].className = "num " + cls;
}


/* ──────────────────── SETUP — initialisation au chargement ────────────────── */

/**
 * Configure les boutons de la barre supérieure (Ajouter, Tout MAJ, Vider).
 * Appelée une seule fois après le chargement du DOM.
 */
function setupPortfolio() {
  const addBtn = document.getElementById("portfolio-add");
  const updateAllBtn = document.getElementById("portfolio-update-all");
  const clearBtn = document.getElementById("portfolio-clear");

  // ─── Bouton "+ Ajouter une ligne" ───
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      // Crée une nouvelle ligne avec des valeurs par défaut sensées
      const defaultEtf = ETF_DATA[0];
      portfolio.push({
        id: pfId(),
        ticker: defaultEtf?.ticker || "SPY",
        quantity: 1,
        pru: defaultEtf?.currentPrice || 0,
        account: "PEA",                                  // Par défaut PEA (compte le plus courant en France)
        purchaseDate: new Date().toISOString().slice(0, 10), // Date du jour au format YYYY-MM-DD
      });
      savePortfolio();
      renderPortfolio();
    });
  }

  // ─── Bouton "Tout mettre à jour" — MAJ de tous les cours en une fois ───
  if (updateAllBtn) {
    updateAllBtn.addEventListener("click", async () => {
      // On collecte les tickers UNIQUES présents dans le portefeuille
      const uniqueTickers = [...new Set(portfolio.map((l) => l.ticker))];
      if (uniqueTickers.length === 0) return;
      updateAllBtn.disabled = true;
      const originalText = updateAllBtn.textContent;
      let done = 0;
      let failed = 0;
      // On parcourt chaque ticker et on lance les requêtes en parallèle
      // (rapide : ~1 seconde pour 5-10 ETF)
      const promises = uniqueTickers.map(async (ticker) => {
        const ok = await updateEtfPrice(ticker);
        if (ok) done++; else failed++;
        updateAllBtn.textContent = `${done}/${uniqueTickers.length}…`;
      });
      await Promise.all(promises);
      updateAllBtn.disabled = false;
      updateAllBtn.textContent = originalText;
      renderPortfolio();
      if (failed > 0) {
        alert(`Mise à jour : ${done} OK, ${failed} échec(s). Voir la console pour les détails.`);
      }
    });
  }

  // ─── Bouton "Vider" ───
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (portfolio.length === 0) return;
      // Confirmation native du navigateur — pas de modal custom à maintenir
      const ok = confirm("Vider tout le portefeuille ? Cette action est irréversible.");
      if (!ok) return;
      portfolio = [];
      savePortfolio();
      renderPortfolio();
    });
  }

  // Premier rendu de la section
  renderPortfolio();
}

// Initialisation : si le DOM est prêt on lance ; sinon on attend l'événement
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupPortfolio);
} else {
  setupPortfolio();
}
