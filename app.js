// ─────────────────────────────────────────────────────────────────────────
// ETF DASHBOARD — Logique d'affichage, filtres et graphiques
// ─────────────────────────────────────────────────────────────────────────

const COLORS = {
  SPY:  "#4f9eff",
  VTI:  "#00d4aa",
  QQQ:  "#ffb547",
  IVV:  "#ff5470",
  VOO:  "#a78bfa"
};

const fmtPct = (v) => v == null ? "—" : (v >= 0 ? "+" : "") + v.toFixed(2) + " %";
const fmtAUM = (v) => {
  if (v == null) return "—";
  if (v >= 1000) return `${(v/1000).toFixed(2)} T$`;
  if (v >= 10)   return `${v.toFixed(0)} Md€`;
  if (v >= 1)    return `${v.toFixed(1).replace(".",",")} Md€`;
  return `${(v * 1000).toFixed(0)} M€`;
};
const fmtFee = (v) => v.toFixed(2).replace(".", ",") + " %";

// ───── ÉTAT ─────
const state = {
  feeMax: 1.00,
  yearMin: 1993,
  sector: "all",
  sort: "ann",
  visibleSeries: { SPY: true, VTI: true, QQQ: true, IVV: true, VOO: true }
};

// ───── FILTRAGE & CLASSEMENT ─────
function getFilteredEtfs() {
  let list = ETF_DATA.filter(e =>
    e.fee <= state.feeMax &&
    e.inception >= state.yearMin &&
    (state.sector === "all" || e.sector === state.sector)
  );

  switch (state.sort) {
    case "ann":     list.sort((a,b) => b.annReturn - a.annReturn); break;
    case "ann_asc": list.sort((a,b) => a.annReturn - b.annReturn); break;
    case "fee":     list.sort((a,b) => a.fee - b.fee); break;
    case "age":     list.sort((a,b) => a.inception - b.inception); break;
    case "aum":     list.sort((a,b) => b.aum - a.aum); break;
  }

  return list.slice(0, 25);
}

// ───── RENDU TABLEAU ─────
function renderTable() {
  const list = getFilteredEtfs();
  const tbody = document.getElementById("etf-tbody");

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty">Aucun ETF ne correspond à ces filtres.</td></tr>`;
    document.getElementById("kpi-best").textContent = "—";
    document.getElementById("kpi-fees").textContent = "—";
    document.getElementById("kpi-count").textContent = "0";
    return;
  }

  tbody.innerHTML = list.map((e, i) => {
    const rankClass = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : i < 10 ? "top10" : "";
    return `
      <tr>
        <td><span class="rank ${rankClass}">${i + 1}</span></td>
        <td><span class="ticker">${e.ticker}</span></td>
        <td>${e.name}</td>
        <td><span class="tag">${e.sector}</span></td>
        <td class="num">${e.inception}</td>
        <td class="num perf-cell ${e.annReturn < 0 ? "negative" : ""}">${fmtPct(e.annReturn)}</td>
        <td class="num">${fmtPct(e.return10y)}</td>
        <td class="num">${fmtFee(e.fee)}</td>
        <td class="num">${fmtAUM(e.aum)}</td>
      </tr>
    `;
  }).join("");

  // KPIs
  const best = list.reduce((m, e) => e.annReturn > m.annReturn ? e : m, list[0]);
  const fees = list.map(e => e.fee).sort((a,b) => a - b);
  const median = fees.length % 2 === 0
    ? (fees[fees.length/2 - 1] + fees[fees.length/2]) / 2
    : fees[Math.floor(fees.length/2)];

  document.getElementById("kpi-count").textContent = list.length;
  document.getElementById("kpi-best").textContent = `${best.ticker} ${fmtPct(best.annReturn)}`;
  document.getElementById("kpi-fees").textContent = fmtFee(median);
}

// ───── CHART : Growth of $10,000 ─────
let growthChart;
function renderGrowthChart() {
  const ctx = document.getElementById("growthChart").getContext("2d");
  const tickers = ["SPY", "VTI", "QQQ", "IVV", "VOO"];

  const datasets = tickers.map(tk => ({
    label: tk,
    data: GROWTH_DATA.series[tk],
    borderColor: COLORS[tk],
    backgroundColor: COLORS[tk] + "20",
    borderWidth: 2.5,
    tension: 0.25,
    pointRadius: 0,
    pointHoverRadius: 5,
    spanGaps: false,
    hidden: !state.visibleSeries[tk]
  }));

  if (growthChart) growthChart.destroy();
  growthChart = new Chart(ctx, {
    type: "line",
    data: { labels: GROWTH_DATA.labels, datasets },
    options: chartBaseOptions({
      yLabel: "Valeur du placement ($)",
      tooltipFmt: (v) => v ? "$" + v.toLocaleString("fr-FR") : "n/d"
    })
  });

  // Toggles
  const togglesEl = document.getElementById("growth-toggles");
  togglesEl.innerHTML = tickers.map(tk => `
    <button class="toggle ${state.visibleSeries[tk] ? "active" : "disabled"}" data-tk="${tk}">
      <span class="dot" style="background:${COLORS[tk]}"></span>${tk}
    </button>
  `).join("");

  togglesEl.querySelectorAll(".toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const tk = btn.dataset.tk;
      state.visibleSeries[tk] = !state.visibleSeries[tk];
      renderGrowthChart();
      renderAnnualChart();
    });
  });
}

// ───── CHART : Rendements annuels ─────
let annualChart;
function renderAnnualChart() {
  const ctx = document.getElementById("annualChart").getContext("2d");
  // Affichage à partir de 1999 (début QQQ) pour rester lisible
  const startIdx = ANNUAL_RETURNS.years.indexOf(1999);
  const labels = ANNUAL_RETURNS.years.slice(startIdx);
  const tickers = ["SPY", "VTI", "QQQ", "IVV", "VOO"];

  const datasets = tickers.map(tk => ({
    label: tk,
    data: ANNUAL_RETURNS.series[tk].slice(startIdx),
    backgroundColor: COLORS[tk],
    borderRadius: 3,
    hidden: !state.visibleSeries[tk]
  }));

  if (annualChart) annualChart.destroy();
  annualChart = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets },
    options: chartBaseOptions({
      yLabel: "Rendement annuel (%)",
      tooltipFmt: (v) => v == null ? "n/d" : v.toFixed(2) + " %"
    })
  });
}

// ───── CHART : Radar multicritères ─────
let radarChart;
function renderRadarChart() {
  const ctx = document.getElementById("radarChart").getContext("2d");
  const list = getFilteredEtfs().slice(0, 5);

  const data = {
    labels: ["Perf. depuis création", "Perf. 10 ans", "Perf. 5 ans", "Frais inversés", "Ancienneté"],
    datasets: list.map((e, i) => {
      const palette = ["#00d4aa", "#4f9eff", "#ffb547", "#a78bfa", "#ff5470"];
      return {
        label: e.ticker,
        data: [
          Math.max(0, e.annReturn || 0),
          Math.max(0, e.return10y || e.return5y || 0),
          Math.max(0, e.return5y || 0),
          (1 - e.fee) * 20,           // frais inversés (mis à l'échelle)
          (2026 - e.inception) / 1.5  // ancienneté
        ],
        borderColor: palette[i],
        backgroundColor: palette[i] + "25",
        borderWidth: 2,
        pointBackgroundColor: palette[i]
      };
    })
  };

  if (radarChart) radarChart.destroy();
  radarChart = new Chart(ctx, {
    type: "radar",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#e6ebf5", boxWidth: 12, padding: 12 } }
      },
      scales: {
        r: {
          angleLines: { color: "rgba(255,255,255,0.08)" },
          grid: { color: "rgba(255,255,255,0.08)" },
          pointLabels: { color: "#8a96b3", font: { size: 11 } },
          ticks: { display: false }
        }
      }
    }
  });
}

// ───── CHART : Scatter Frais vs Performance ─────
let scatterChart;
function renderScatterChart() {
  const ctx = document.getElementById("scatterChart").getContext("2d");
  const list = getFilteredEtfs();

  // Utilise return10y si dispo, sinon return5y
  const points = list.map(e => ({
    x: e.fee,
    y: e.return10y != null ? e.return10y : e.return5y,
    label: e.ticker
  })).filter(p => p.y != null);

  if (scatterChart) scatterChart.destroy();
  scatterChart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "ETF",
        data: points,
        backgroundColor: "#00d4aa",
        borderColor: "#fff",
        borderWidth: 1.5,
        pointRadius: 8,
        pointHoverRadius: 11
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0a0e1a",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => {
              const p = ctx.raw;
              return `${p.label} — Frais: ${p.x}% · Perf 10a: ${p.y}%`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: "Frais annuels (%)", color: "#8a96b3" },
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8a96b3" }
        },
        y: {
          title: { display: true, text: "Performance 10 ans (%)", color: "#8a96b3" },
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8a96b3" }
        }
      }
    }
  });
}

// ───── OPTIONS PARTAGÉES ─────
function chartBaseOptions({ yLabel, tooltipFmt }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        labels: { color: "#e6ebf5", boxWidth: 12, padding: 14, font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: "#0a0e1a",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#e6ebf5",
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${tooltipFmt(ctx.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#8a96b3", maxRotation: 0, autoSkipPadding: 16 }
      },
      y: {
        title: { display: true, text: yLabel, color: "#8a96b3" },
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#8a96b3" }
      }
    }
  };
}

// ───── ÉVÉNEMENTS ─────
function setupEvents() {
  const feeFilter = document.getElementById("fee-filter");
  const feeValue = document.getElementById("fee-value");
  const updateFeeBg = () => {
    const pct = ((feeFilter.value - feeFilter.min) / (feeFilter.max - feeFilter.min)) * 100;
    feeFilter.style.setProperty("--fill", pct + "%");
  };
  updateFeeBg();
  feeFilter.addEventListener("input", () => {
    state.feeMax = parseFloat(feeFilter.value);
    feeValue.textContent = state.feeMax.toFixed(2).replace(".", ",") + " %";
    updateFeeBg();
    renderAll();
  });

  document.getElementById("year-filter").addEventListener("change", e => {
    state.yearMin = parseInt(e.target.value);
    renderAll();
  });

  document.getElementById("sector-filter").addEventListener("change", e => {
    state.sector = e.target.value;
    renderAll();
  });

  document.getElementById("sort-filter").addEventListener("change", e => {
    state.sort = e.target.value;
    renderAll();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    state.feeMax = 1.00;
    state.yearMin = 1993;
    state.sector = "all";
    state.sort = "ann";
    feeFilter.value = 1.00;
    feeValue.textContent = "1,00 %";
    updateFeeBg();
    document.getElementById("year-filter").value = "1993";
    document.getElementById("sector-filter").value = "all";
    document.getElementById("sort-filter").value = "ann";
    renderAll();
  });
}

function renderAll() {
  renderTable();
  renderRadarChart();
  renderScatterChart();
}

// ───── TOP 25 PAR ANNÉE ─────
let yearlyState = { year: "2026", category: "all", minPerf: -100 };
let yearlyChart, rotationChart;

// Mapping catégories → groupes pour la rotation des secteurs
const CATEGORY_GROUPS = {
  "Énergie":            ["energy","energie","énergie","oil","gas","natural gas","oil & gas","gasoline","tanker"],
  "Tech & Semi":        ["tech","technology","semi","semiconductor","semi-conducteurs","software","cloud","ai","ia","internet","nasdaq","fintech","cyber"],
  "Innovation/Biotech": ["innovation","genomic","biotech","ipo","e-commerce"],
  "Cleantech":          ["clean","solar","solaire","wind","low carbon","environment","carbon","lithium"],
  "Métaux précieux":    ["or","gold","silver","argent","miners","mining"],
  "Métaux industriels": ["copper","cuivre","steel","acier","tin","minerals","uranium"],
  "Crypto":             ["crypto","bitcoin","blockchain"],
  "Pays/Région":        ["china","chine","turkey","turquie","japan","japon","india","inde","brazil","brésil","russia","russie","korea","corée","ireland","irlande","denmark","danemark","canada","pays"],
  "Healthcare":         ["health","healthcare","medical","pharma"],
  "Finance":            ["financ","bank"],
  "Indices US":         ["s&p 500","sp500","nasdaq","dow","russell","total market","mid cap","midcap","small cap","smallcap","large cap"],
  "International":      ["international","world","acwi","developed","emergents","émergents","emerging"],
  "Matières 1ères":     ["shipping","dry bulk","commodit","oil services"],
  "Défensif/Income":    ["dividend","dividendes","value","low vol","momentum","growth","reit","utilities","staples","consumer","interest rate hedge","volatilité"],
  "Industrie":          ["industrial","industriel","aerospace","aérospatial","defense","défense","infrastructure"]
};

const GROUP_COLORS = {
  "Énergie":            "#ff6b35",
  "Tech & Semi":        "#4f9eff",
  "Innovation/Biotech": "#a78bfa",
  "Cleantech":          "#22c55e",
  "Métaux précieux":    "#fbbf24",
  "Métaux industriels": "#f97316",
  "Crypto":             "#f59e0b",
  "Pays/Région":        "#ec4899",
  "Healthcare":         "#06b6d4",
  "Finance":            "#84cc16",
  "Indices US":         "#94a3b8",
  "International":      "#0ea5e9",
  "Matières 1ères":     "#d97706",
  "Défensif/Income":    "#10b981",
  "Industrie":          "#8b5cf6",
  "Autre":              "#64748b"
};

function classifyCategory(rawCategory) {
  const c = (rawCategory || "").toLowerCase();
  for (const [group, kws] of Object.entries(CATEGORY_GROUPS)) {
    if (kws.some(kw => c.includes(kw))) return group;
  }
  return "Autre";
}

function renderYearTabs() {
  const wrap = document.getElementById("year-tabs");
  const years = Object.keys(YEARLY_TOP25).sort();
  wrap.innerHTML = years.map(y => `
    <button class="year-tab ${y === yearlyState.year ? "active" : ""}" data-year="${y}">${y}</button>
  `).join("");
  wrap.querySelectorAll(".year-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      yearlyState.year = btn.dataset.year;
      renderYearTabs();
      populateCategoryFilter();
      renderYearlyTable();
      renderYearlyChart();
    });
  });
}

function populateCategoryFilter() {
  const select = document.getElementById("yearly-category-filter");
  const list = YEARLY_TOP25[yearlyState.year] || [];
  const cats = Array.from(new Set(list.map(e => e.category))).sort();
  const current = yearlyState.category;
  select.innerHTML = `<option value="all">Toutes les catégories (${list.length})</option>` +
    cats.map(c => {
      const count = list.filter(e => e.category === c).length;
      return `<option value="${c}" ${c === current ? "selected" : ""}>${c} (${count})</option>`;
    }).join("");
  if (current !== "all" && !cats.includes(current)) {
    yearlyState.category = "all";
    select.value = "all";
  }
}

function getYearlyFilteredList() {
  const list = YEARLY_TOP25[yearlyState.year] || [];
  return list.filter(e =>
    (yearlyState.category === "all" || e.category === yearlyState.category) &&
    e.return_pct >= yearlyState.minPerf
  );
}

function renderYearlyTable() {
  const list = getYearlyFilteredList();
  const tbody = document.getElementById("yearly-tbody");
  const summary = document.getElementById("yearly-summary");

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty">Aucun ETF ne correspond à ces filtres pour ${yearlyState.year}.</td></tr>`;
    summary.innerHTML = "";
    return;
  }

  const best = list[0];
  const avg = list.reduce((s, e) => s + e.return_pct, 0) / list.length;
  const yearLabel = yearlyState.year === "2026" ? "2026 (YTD)" : yearlyState.year;
  const totalForYear = (YEARLY_TOP25[yearlyState.year] || []).length;
  const isFiltered = yearlyState.category !== "all" || yearlyState.minPerf > -100;
  const filterLabel = isFiltered ? ` / ${totalForYear}` : "";

  summary.innerHTML = `
    <div class="stat">
      <span class="stat-label">Année</span>
      <span class="stat-value">${yearLabel}</span>
    </div>
    <div class="stat">
      <span class="stat-label">ETF affichés</span>
      <span class="stat-value">${list.length}${filterLabel}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Top performer</span>
      <span class="stat-value accent">${best.ticker} ${fmtPct(best.return_pct)}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Perf. moyenne</span>
      <span class="stat-value">${fmtPct(avg)}</span>
    </div>
  `;

  tbody.innerHTML = list.map((e, i) => {
    const rankClass = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : i < 10 ? "top10" : "";
    return `
      <tr>
        <td><span class="rank ${rankClass}">${i + 1}</span></td>
        <td><span class="ticker">${e.ticker}</span></td>
        <td>${e.name}</td>
        <td><span class="tag">${e.category}</span></td>
        <td class="num perf-cell ${e.return_pct < 0 ? "negative" : ""}">${fmtPct(e.return_pct)}</td>
      </tr>
    `;
  }).join("");
}

function renderYearlyChart() {
  const ctx = document.getElementById("yearlyChart").getContext("2d");
  const list = getYearlyFilteredList();
  if (yearlyChart) { yearlyChart.destroy(); yearlyChart = null; }
  if (list.length === 0) return;

  const top = list.slice(0, 15);
  const labels = top.map(e => e.ticker);
  const values = top.map(e => e.return_pct);
  const colors = top.map((_, i) => {
    const t = i / Math.max(1, top.length - 1);
    return `hsl(${165 + t * 40}, 80%, ${55 - t * 8}%)`;
  });

  yearlyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: `Performance ${yearlyState.year}`,
        data: values,
        backgroundColor: colors,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0a0e1a",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => {
              const e = top[ctx.dataIndex];
              return [`${e.name}`, `Catégorie : ${e.category}`, `Perf : ${fmtPct(e.return_pct)}`];
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8a96b3", callback: (v) => v + " %" },
          title: { display: true, text: "Performance (%)", color: "#8a96b3" }
        },
        y: {
          grid: { display: false },
          ticks: { color: "#e6ebf5", font: { weight: "600" } }
        }
      }
    }
  });
}

// ───── ROTATION DES SECTEURS ─────
function renderRotationChart() {
  const ctx = document.getElementById("rotationChart").getContext("2d");
  const years = Object.keys(YEARLY_TOP25).sort();
  const groups = Object.keys(GROUP_COLORS);

  const counts = {};
  groups.forEach(g => counts[g] = years.map(() => 0));
  years.forEach((year, yi) => {
    (YEARLY_TOP25[year] || []).forEach(etf => {
      const grp = classifyCategory(etf.category);
      counts[grp][yi]++;
    });
  });

  const activeGroups = groups.filter(g => counts[g].some(c => c > 0));
  const datasets = activeGroups.map(grp => ({
    label: grp,
    data: counts[grp],
    backgroundColor: GROUP_COLORS[grp],
    borderColor: "rgba(10,14,26,0.6)",
    borderWidth: 1,
    borderRadius: 2
  }));

  if (rotationChart) rotationChart.destroy();
  rotationChart = new Chart(ctx, {
    type: "bar",
    data: { labels: years, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0a0e1a",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label} : ${ctx.parsed.y} ETF`
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: "#e6ebf5", font: { weight: "600" } }
        },
        y: {
          stacked: true,
          title: { display: true, text: "Nombre d'ETF dans le top 25", color: "#8a96b3" },
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8a96b3", stepSize: 5 }
        }
      }
    }
  });

  const legendEl = document.getElementById("rotation-legend");
  legendEl.innerHTML = activeGroups.map(g => `
    <span class="leg-item">
      <span class="leg-color" style="background:${GROUP_COLORS[g]}"></span>${g}
    </span>
  `).join("");
}

function setupYearlyFilters() {
  document.getElementById("yearly-category-filter").addEventListener("change", e => {
    yearlyState.category = e.target.value;
    renderYearlyTable();
    renderYearlyChart();
  });
  document.getElementById("yearly-perf-filter").addEventListener("change", e => {
    yearlyState.minPerf = parseFloat(e.target.value);
    renderYearlyTable();
    renderYearlyChart();
  });
}

// ───── INIT ─────
document.addEventListener("DOMContentLoaded", () => {
  setupEvents();
  setupYearlyFilters();
  renderTable();
  renderYearTabs();
  populateCategoryFilter();
  renderYearlyTable();
  renderYearlyChart();
  renderRotationChart();
  renderGrowthChart();
  renderAnnualChart();
  renderRadarChart();
  renderScatterChart();
});
