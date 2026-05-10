// ─────────────────────────────────────────────────────────────────────────
// DONNÉES ETF — Sources : Yahoo Finance, Morningstar, Stock Analysis,
// Total Real Returns, Bankrate, Dr Wealth (avril 2026)
// Performances annualisées nettes (frais déduits, dividendes réinvestis)
// ─────────────────────────────────────────────────────────────────────────

const ETF_DATA = [
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust",
    sector: "Technologie",
    inception: 1999,
    annReturn: 10.05,        // depuis création (Stock Analysis)
    return10y: 18.92,
    return5y: 13.53,
    fee: 0.20,
    aum: 395,                 // Md USD
    currentPrice: 663.88,
    currency: "USD",
    yahooSymbol: "QQQ"
  },
  {
    ticker: "VGT",
    name: "Vanguard Information Technology ETF",
    sector: "Technologie",
    inception: 2004,
    annReturn: 13.85,
    return10y: 19.40,
    return5y: 16.20,
    fee: 0.09,
    aum: 87,
    currentPrice: 655.2,
    currency: "USD",
    yahooSymbol: "VGT"
  },
  {
    ticker: "XLK",
    name: "Technology Select Sector SPDR Fund",
    sector: "Technologie",
    inception: 1998,
    annReturn: 10.65,
    return10y: 19.10,
    return5y: 16.05,
    fee: 0.09,
    aum: 78,
    currentPrice: 251.4,
    currency: "USD",
    yahooSymbol: "XLK"
  },
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    sector: "Large Cap US",
    inception: 2010,
    annReturn: 13.76,
    return10y: 14.05,
    return5y: 12.25,
    fee: 0.03,
    aum: 720,
    currentPrice: 656.82,
    currency: "USD",
    yahooSymbol: "VOO"
  },
  {
    ticker: "IVV",
    name: "iShares Core S&P 500 ETF",
    sector: "Large Cap US",
    inception: 2000,
    annReturn: 6.61,
    return10y: 14.01,
    return5y: 11.97,
    fee: 0.03,
    aum: 580,
    currentPrice: 717.28,
    currency: "USD",
    yahooSymbol: "IVV"
  },
  {
    ticker: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    sector: "Large Cap US",
    inception: 1993,
    annReturn: 10.43,
    return10y: 14.01,
    return5y: 11.97,
    fee: 0.0945,
    aum: 700,
    currentPrice: 713.94,
    currency: "USD",
    yahooSymbol: "SPY"
  },
  {
    ticker: "VTI",
    name: "Vanguard Total Stock Market ETF",
    sector: "Total Marché US",
    inception: 2001,
    annReturn: 8.95,
    return10y: 13.45,
    return5y: 11.40,
    fee: 0.03,
    aum: 470,
    currentPrice: 352.28,
    currency: "USD",
    yahooSymbol: "VTI"
  },
  {
    ticker: "MDY",
    name: "SPDR S&P MidCap 400 ETF",
    sector: "Small/Mid Cap",
    inception: 1995,
    annReturn: 11.20,
    return10y: 9.85,
    return5y: 8.90,
    fee: 0.23,
    aum: 23,
    currentPrice: 565.1,
    currency: "USD",
    yahooSymbol: "MDY"
  },
  {
    ticker: "IWM",
    name: "iShares Russell 2000 ETF",
    sector: "Small/Mid Cap",
    inception: 2000,
    annReturn: 7.85,
    return10y: 8.20,
    return5y: 6.40,
    fee: 0.19,
    aum: 65,
    currentPrice: 215.4,
    currency: "USD",
    yahooSymbol: "IWM"
  },
  {
    ticker: "EFA",
    name: "iShares MSCI EAFE ETF",
    sector: "International",
    inception: 2001,
    annReturn: 5.20,
    return10y: 6.15,
    return5y: 9.70,
    fee: 0.32,
    aum: 56,
    currentPrice: 89.75,
    currency: "USD",
    yahooSymbol: "EFA"
  },
  {
    ticker: "VIG",
    name: "Vanguard Dividend Appreciation ETF",
    sector: "Dividendes",
    inception: 2006,
    annReturn: 9.85,
    return10y: 11.95,
    return5y: 11.30,
    fee: 0.06,
    aum: 92,
    currentPrice: 215.3,
    currency: "USD",
    yahooSymbol: "VIG"
  },
  {
    ticker: "DIA",
    name: "SPDR Dow Jones Industrial Average ETF",
    sector: "Large Cap US",
    inception: 1998,
    annReturn: 9.10,
    return10y: 11.20,
    return5y: 10.05,
    fee: 0.16,
    aum: 35,
    currentPrice: 430.2,
    currency: "USD",
    yahooSymbol: "DIA"
  },
  // ─────────────── ETF UCITS Europe (éligibles investisseurs FR) ───────────────
  {
    ticker: "PCEU",
    name: "Amundi PEA MSCI Europe UCITS ETF Acc",
    sector: "Europe (PEA)",
    inception: 2019,
    annReturn: 8.80,         // +80,60% depuis 25/04/2019
    return10y: null,         // ETF trop récent
    return5y: 10.13,         // +61,90% sur 5 ans
    fee: 0.15,
    aum: 0.27,                // 270 M€
    currentPrice: 36.51,
    currency: "EUR",
    yahooSymbol: "CEU.PA"
  },
  {
    ticker: "LYP6",
    name: "Amundi Core Stoxx Europe 600 UCITS ETF Acc",
    sector: "Europe",
    inception: 2013,
    annReturn: 8.73,         // +197,30% depuis 03/04/2013
    return10y: 7.85,         // estimé à partir des perfs cumulées
    return5y: 9.93,          // +60,60% sur 5 ans
    fee: 0.07,
    aum: 17.93,               // 17 928 M€
    currentPrice: 297.15,
    currency: "EUR",
    yahooSymbol: "CE9.PA"
  },
  {
    ticker: "LYY0",
    name: "Amundi MSCI All Country World UCITS ETF EUR Acc",
    sector: "International",
    inception: 2011,
    annReturn: 11.93,        // +419,10% depuis 05/09/2011
    return10y: 10.85,
    return5y: 10.13,         // +62,01% sur 5 ans
    fee: 0.45,
    aum: 1.94,                // 1 941 M€
    currentPrice: 558.9,
    currency: "EUR",
    yahooSymbol: "CW8.PA"
  },
  {
    ticker: "WPEA",
    name: "iShares MSCI World Swap PEA UCITS ETF Acc",
    sector: "Monde (PEA)",
    inception: 2024,
    annReturn: 9.59,         // depuis création au 31/03/2026 (source iShares)
    return10y: null,
    return5y: null,
    fee: 0.20,
    aum: 1.40,                // 1 401 M€
    currentPrice: 6.408,
    currency: "EUR",
    yahooSymbol: "WPEA.PA"
  },
  {
    ticker: "DCAM",
    name: "Amundi PEA Monde (MSCI World) UCITS ETF Acc",
    sector: "Monde (PEA)",
    inception: 2025,
    annReturn: 12.00,        // +13,91% sur ~14 mois depuis 04/03/2025
    return10y: null,
    return5y: null,
    fee: 0.20,
    aum: 0.80,                // 804 M€
    currentPrice: 5.674,
    currency: "EUR",
    yahooSymbol: "DCAM.PA"
  },
  // ─────────────── ETF complémentaires (extension top 25) ───────────────
  {
    ticker: "IWDA",
    name: "iShares Core MSCI World UCITS ETF USD Acc",
    sector: "International",
    inception: 2009,
    annReturn: 11.85,        // depuis 25/09/2009
    return10y: 12.07,
    return5y: 11.80,
    fee: 0.20,
    aum: 116,                 // 115 885 M€
    currentPrice: 116.4,
    currency: "EUR",
    yahooSymbol: "IWDA.AS"
  },
  {
    ticker: "URTH",
    name: "iShares MSCI World ETF",
    sector: "International",
    inception: 2012,
    annReturn: 11.46,
    return10y: 12.07,
    return5y: 10.54,
    fee: 0.24,
    aum: 6.5,
    currentPrice: 185.2,
    currency: "USD",
    yahooSymbol: "URTH"
  },
  {
    ticker: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    sector: "Dividendes",
    inception: 2011,
    annReturn: 12.40,
    return10y: 11.43,
    return5y: 10.80,
    fee: 0.06,
    aum: 70,
    currentPrice: 29.85,
    currency: "USD",
    yahooSymbol: "SCHD"
  },
  {
    ticker: "VYM",
    name: "Vanguard High Dividend Yield ETF",
    sector: "Dividendes",
    inception: 2006,
    annReturn: 8.45,
    return10y: 9.85,
    return5y: 9.20,
    fee: 0.06,
    aum: 60,
    currentPrice: 135.4,
    currency: "USD",
    yahooSymbol: "VYM"
  },
  {
    ticker: "EEM",
    name: "iShares MSCI Emerging Markets ETF",
    sector: "Émergents",
    inception: 2003,
    annReturn: 9.32,
    return10y: 7.45,
    return5y: 3.65,
    fee: 0.70,
    aum: 18,
    currentPrice: 52.3,
    currency: "USD",
    yahooSymbol: "EEM"
  },
  {
    ticker: "PAEEM",
    name: "Amundi PEA Emergent (MSCI EM) ESG UCITS ETF",
    sector: "Émergents (PEA)",
    inception: 2014,
    annReturn: 6.50,
    return10y: 5.80,
    return5y: 4.10,
    fee: 0.20,
    aum: 1.2,
    currentPrice: 35.8,
    currency: "EUR",
    yahooSymbol: "PAEEM.PA"
  },
  {
    ticker: "10AF",
    name: "Amundi Core MSCI Emerging Markets UCITS ETF",
    sector: "Émergents",
    inception: 2016,
    annReturn: 7.20,
    return10y: null,
    return5y: 6.69,          // estimé à partir de +38,22% sur 5 ans
    fee: 0.18,
    aum: 4.5,
    currentPrice: 29.45,
    currency: "EUR",
    yahooSymbol: "AEEM.PA"
  },
  {
    ticker: "SOXX",
    name: "iShares Semiconductor ETF",
    sector: "Technologie",
    inception: 2001,
    annReturn: 12.85,
    return10y: 22.40,
    return5y: 18.95,
    fee: 0.35,
    aum: 16,
    currentPrice: 252.6,
    currency: "USD",
    yahooSymbol: "SOXX"
  },
  {
    ticker: "ARKK",
    name: "ARK Innovation ETF",
    sector: "Technologie",
    inception: 2014,
    annReturn: 8.90,
    return10y: 9.20,
    return5y: -2.50,         // période difficile pour les valeurs de croissance
    fee: 0.75,
    aum: 6.2,
    currentPrice: 62.4,
    currency: "USD",
    yahooSymbol: "ARKK"
  },
  {
    ticker: "IJR",
    name: "iShares Core S&P Small-Cap ETF",
    sector: "Small/Mid Cap",
    inception: 2000,
    annReturn: 9.65,
    return10y: 8.40,
    return5y: 7.20,
    fee: 0.06,
    aum: 85,
    currentPrice: 118.6,
    currency: "USD",
    yahooSymbol: "IJR"
  }
];

// ─────────────────────────────────────────────────────────────────────────
// RENDEMENTS ANNUELS (%) — Source : Total Real Returns (dividendes réinvestis)
// '—' = ETF pas encore lancé
// ─────────────────────────────────────────────────────────────────────────

const ANNUAL_RETURNS = {
  years: [1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,
          2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,
          2019,2020,2021,2022,2023,2024,2025],
  series: {
    SPY: [8.64,0.40,38.04,22.56,33.48,28.69,20.39,-9.74,-11.76,-21.58,28.18,
          10.70,4.83,15.85,5.15,-36.79,26.35,15.06,1.89,15.99,32.31,13.46,
          1.23,12.00,21.71,-4.57,31.22,18.33,28.73,-18.18,26.18,24.89,17.72],
    VTI: [null,null,null,null,null,null,null,null,-7.29,-20.48,30.74,12.78,
          6.30,15.70,5.37,-36.99,28.90,17.43,0.97,16.45,33.45,12.55,0.36,
          12.82,21.21,-5.23,30.67,21.08,25.68,-19.52,26.05,23.81,17.10],
    QQQ: [null,null,null,null,null,null,78.95,-36.11,-33.34,-37.37,49.67,
          10.52,1.58,7.14,19.03,-41.73,54.70,19.91,3.38,18.11,36.63,19.18,
          9.44,7.10,32.66,-0.13,38.96,48.62,27.42,-32.58,54.86,25.58,20.77],
    IVV: [null,null,null,null,null,null,null,null,-11.85,-21.59,28.28,10.74,
          4.82,15.78,5.39,-36.95,26.43,14.96,2.04,15.99,32.30,13.62,1.36,
          11.93,21.79,-4.42,31.46,18.39,28.74,-18.16,26.27,24.97,17.78],
    VOO: [null,null,null,null,null,null,null,null,null,null,null,null,null,
          null,null,null,null,14.78,1.90,15.99,32.39,13.56,1.33,12.17,21.77,
          -4.50,31.37,18.32,28.79,-18.17,26.32,24.98,17.82]
  }
};

// ─────────────────────────────────────────────────────────────────────────
// COURBES "GROWTH OF $10,000" — calculées à partir des rendements annuels
// Base 100 alignée à 2010-09-09 (création de VOO) pour comparaison équitable
// ─────────────────────────────────────────────────────────────────────────

function buildGrowthSeries(startYear) {
  const startIdx = ANNUAL_RETURNS.years.indexOf(startYear);
  const yrs = ANNUAL_RETURNS.years.slice(startIdx);
  const labels = [String(startYear - 1), ...yrs.map(String)];
  const series = {};

  Object.keys(ANNUAL_RETURNS.series).forEach((tk) => {
    const arr = ANNUAL_RETURNS.series[tk].slice(startIdx);
    let val = 10000;
    const points = [val];
    arr.forEach((r) => {
      if (r === null || r === undefined) {
        points.push(null);
      } else {
        val = val * (1 + r / 100);
        points.push(Math.round(val));
      }
    });
    series[tk] = points;
  });

  return { labels, series };
}

const GROWTH_DATA = buildGrowthSeries(2011); // depuis fin 2010 = 10 000 $
