// Top 25 ETF par année — collecté via wide_research (avril 2026)
// Sources : ETFdb, ETF.com, Morningstar, Yahoo Finance, justETF, Investopedia, StatMuse
const YEARLY_TOP25 = {
  "2015": [
    {
      "ticker": "CNXT",
      "name": "VanEck ChiNext ETF",
      "category": "China Tech",
      "return_pct": 52.6
    },
    {
      "ticker": "DXJH",
      "name": "WisdomTree Japan Hedged Healthcare ETF",
      "category": "Japan Healthcare",
      "return_pct": 36.2
    },
    {
      "ticker": "ASHS",
      "name": "Xtrackers Harvest CSI 500 China A-Shares Small Cap ETF",
      "category": "China Small Cap",
      "return_pct": 36.0
    },
    {
      "ticker": "SBIO",
      "name": "ALPS Medical Breakthroughs ETF",
      "category": "Biotech",
      "return_pct": 26.2
    },
    {
      "ticker": "FDN",
      "name": "First Trust Dow Jones Internet ETF",
      "category": "Internet",
      "return_pct": 21.8
    },
    {
      "ticker": "EIRL",
      "name": "iShares MSCI Ireland ETF",
      "category": "Ireland",
      "return_pct": 21.8
    },
    {
      "ticker": "KWEB",
      "name": "KraneShares CSI China Internet ETF",
      "category": "China Internet",
      "return_pct": 21.0
    },
    {
      "ticker": "PNQI",
      "name": "Invesco NASDAQ Internet ETF",
      "category": "Internet",
      "return_pct": 20.3
    },
    {
      "ticker": "PGJ",
      "name": "Invesco Golden Dragon China ETF",
      "category": "China",
      "return_pct": 20.2
    },
    {
      "ticker": "PSCH",
      "name": "Invesco S&P SmallCap Health Care ETF",
      "category": "SmallCap Healthcare",
      "return_pct": 19.8
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": 10.7
    },
    {
      "ticker": "XLY",
      "name": "Consumer Discretionary Select Sector SPDR Fund",
      "category": "Consumer",
      "return_pct": 10.1
    },
    {
      "ticker": "XLV",
      "name": "Health Care Select Sector SPDR Fund",
      "category": "Healthcare",
      "return_pct": 6.8
    },
    {
      "ticker": "MTUM",
      "name": "iShares MSCI USA Momentum Factor ETF",
      "category": "Momentum",
      "return_pct": 6.5
    },
    {
      "ticker": "XLP",
      "name": "Consumer Staples Select Sector SPDR Fund",
      "category": "Staples",
      "return_pct": 6.0
    },
    {
      "ticker": "XLK",
      "name": "Technology Select Sector SPDR Fund",
      "category": "Tech",
      "return_pct": 4.7
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": 3.2
    },
    {
      "ticker": "USMV",
      "name": "iShares MSCI USA Min Vol Factor ETF",
      "category": "Low Vol",
      "return_pct": 1.5
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": 1.0
    },
    {
      "ticker": "VTI",
      "name": "Vanguard Total Stock Market ETF",
      "category": "Total Market",
      "return_pct": 0.4
    },
    {
      "ticker": "XLI",
      "name": "Industrial Select Sector SPDR Fund",
      "category": "Industrial",
      "return_pct": 0.0
    },
    {
      "ticker": "VTV",
      "name": "Vanguard Value ETF",
      "category": "Value",
      "return_pct": -0.4
    },
    {
      "ticker": "DIA",
      "name": "SPDR Dow Jones Industrial Average ETF Trust",
      "category": "Dow",
      "return_pct": -0.5
    },
    {
      "ticker": "VIG",
      "name": "Vanguard Dividend Appreciation ETF",
      "category": "Dividendes",
      "return_pct": -0.5
    },
    {
      "ticker": "XLE",
      "name": "Energy Select Sector SPDR Fund",
      "category": "Energie",
      "return_pct": -21.1
    }
  ],
  "2016": [
    {
      "ticker": "SILJ",
      "name": "ETFMG Prime Junior Silver Miners ETF",
      "category": "Argent",
      "return_pct": 129.54
    },
    {
      "ticker": "XME",
      "name": "SPDR S&P Metals & Mining ETF",
      "category": "Minerals",
      "return_pct": 107.57
    },
    {
      "ticker": "RSXJ",
      "name": "VanEck Russia Small-Cap ETF",
      "category": "Pays Russie",
      "return_pct": 103.73
    },
    {
      "ticker": "SLX",
      "name": "VanEck Steel ETF",
      "category": "Acier",
      "return_pct": 95.79
    },
    {
      "ticker": "SLVP",
      "name": "iShares MSCI Global Silver Miners ETF",
      "category": "Argent",
      "return_pct": 87.83
    },
    {
      "ticker": "SVXY",
      "name": "ProShares Short VIX Short-Term Futures ETF",
      "category": "Volatilité",
      "return_pct": 80.34
    },
    {
      "ticker": "GDXJ",
      "name": "VanEck Junior Gold Miners ETF",
      "category": "Or",
      "return_pct": 72.97
    },
    {
      "ticker": "COPX",
      "name": "Global X Copper Miners ETF",
      "category": "Cuivre",
      "return_pct": 72.84
    },
    {
      "ticker": "EWZ",
      "name": "iShares MSCI Brazil ETF",
      "category": "Brésil",
      "return_pct": 63.9
    },
    {
      "ticker": "XLE",
      "name": "Energy Select Sector SPDR Fund",
      "category": "Energie",
      "return_pct": 28.03
    },
    {
      "ticker": "EWC",
      "name": "iShares MSCI Canada ETF",
      "category": "Canada",
      "return_pct": 23.82
    },
    {
      "ticker": "XLF",
      "name": "Financial Select Sector SPDR Fund",
      "category": "Finance",
      "return_pct": 22.42
    },
    {
      "ticker": "XLI",
      "name": "Industrial Select Sector SPDR Fund",
      "category": "Industriel",
      "return_pct": 20.01
    },
    {
      "ticker": "IWM",
      "name": "iShares Russell 2000 ETF",
      "category": "Small Cap",
      "return_pct": 19.12
    },
    {
      "ticker": "DIA",
      "name": "SPDR Dow Jones Industrial Average ETF",
      "category": "Dow",
      "return_pct": 16.37
    },
    {
      "ticker": "XLU",
      "name": "Utilities Select Sector SPDR Fund",
      "category": "Utilities",
      "return_pct": 16.08
    },
    {
      "ticker": "XLK",
      "name": "Technology Select Sector SPDR Fund",
      "category": "Tech",
      "return_pct": 15.01
    },
    {
      "ticker": "VTV",
      "name": "Vanguard Value ETF",
      "category": "Value",
      "return_pct": 13.0
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": 12.0
    },
    {
      "ticker": "VIG",
      "name": "Vanguard Dividend Appreciation ETF",
      "category": "Dividendes",
      "return_pct": 12.0
    },
    {
      "ticker": "VTI",
      "name": "Vanguard Total Stock Market ETF",
      "category": "Total Market",
      "return_pct": 10.57
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": 7.1
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": 6.0
    },
    {
      "ticker": "XLY",
      "name": "Consumer Discretionary Select Sector SPDR Fund",
      "category": "Consumer",
      "return_pct": 5.97
    },
    {
      "ticker": "XLP",
      "name": "Consumer Staples Select Sector SPDR Fund",
      "category": "Staples",
      "return_pct": 4.98
    }
  ],
  "2017": [
    {
      "ticker": "ARKK",
      "name": "ARK Innovation ETF",
      "category": "Innovation Tech",
      "return_pct": 87.0
    },
    {
      "ticker": "GBTC",
      "name": "Grayscale Bitcoin Trust",
      "category": "Bitcoin",
      "return_pct": 70.0
    },
    {
      "ticker": "LIT",
      "name": "Global X Lithium & Battery Tech ETF",
      "category": "Lithium",
      "return_pct": 60.0
    },
    {
      "ticker": "EMQQ",
      "name": "Emerging Markets Internet & Ecommerce ETF",
      "category": "Emerging Markets Internet",
      "return_pct": 60.0
    },
    {
      "ticker": "SCIF",
      "name": "VanEck India Small-Cap ETF",
      "category": "India Small-Cap",
      "return_pct": 60.0
    },
    {
      "ticker": "SOCL",
      "name": "Global X Social Media ETF",
      "category": "Social Media",
      "return_pct": 55.0
    },
    {
      "ticker": "PGJ",
      "name": "Invesco Golden Dragon China ETF",
      "category": "China Tech",
      "return_pct": 55.0
    },
    {
      "ticker": "ITB",
      "name": "iShares US Home Construction ETF",
      "category": "Home Construction",
      "return_pct": 55.0
    },
    {
      "ticker": "BOTZ",
      "name": "Global X Robotics & AI ETF",
      "category": "Robotics AI",
      "return_pct": 55.0
    },
    {
      "ticker": "KWEB",
      "name": "KraneShares CSI China Internet ETF",
      "category": "China Internet",
      "return_pct": 55.0
    },
    {
      "ticker": "ARGT",
      "name": "Global X MSCI Argentina ETF",
      "category": "Argentina",
      "return_pct": 53.87
    },
    {
      "ticker": "EWGS",
      "name": "iShares MSCI Germany Small-Cap ETF",
      "category": "Germany Small-Cap",
      "return_pct": 50.0
    },
    {
      "ticker": "ARKW",
      "name": "ARK Web x.0 ETF",
      "category": "Internet Tech",
      "return_pct": 50.0
    },
    {
      "ticker": "REMX",
      "name": "VanEck Rare Earth Strategic Metals ETF",
      "category": "Rare Earth Metals",
      "return_pct": 45.0
    },
    {
      "ticker": "XBI",
      "name": "SPDR S&P Biotech ETF",
      "category": "Biotech",
      "return_pct": 45.0
    },
    {
      "ticker": "CQQQ",
      "name": "Invesco China Technology ETF",
      "category": "China Tech",
      "return_pct": 45.0
    },
    {
      "ticker": "ROBO",
      "name": "ROBO Global Robotics ETF",
      "category": "Robotics",
      "return_pct": 45.0
    },
    {
      "ticker": "FBT",
      "name": "First Trust NYSE Arca Biotech ETF",
      "category": "Biotech",
      "return_pct": 40.0
    },
    {
      "ticker": "SMH",
      "name": "VanEck Semiconductor ETF",
      "category": "Semiconductors",
      "return_pct": 40.0
    },
    {
      "ticker": "EEM",
      "name": "iShares MSCI Emerging Markets ETF",
      "category": "Emerging Markets",
      "return_pct": 37.0
    },
    {
      "ticker": "XLK",
      "name": "Technology Select Sector SPDR",
      "category": "Tech",
      "return_pct": 35.0
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ",
      "category": "Nasdaq 100",
      "return_pct": 32.0
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF",
      "category": "S&P 500",
      "return_pct": 21.0
    },
    {
      "ticker": "VTI",
      "name": "Vanguard Total Stock Market ETF",
      "category": "US Total Market",
      "return_pct": 21.0
    },
    {
      "ticker": "IWM",
      "name": "iShares Russell 2000 ETF",
      "category": "Small Cap",
      "return_pct": 15.0
    }
  ],
  "2018": [
    {
      "ticker": "UNG",
      "name": "United States Natural Gas Fund",
      "category": "Natural Gas",
      "return_pct": 30.0
    },
    {
      "ticker": "QAT",
      "name": "iShares MSCI Qatar ETF",
      "category": "Pays Qatar",
      "return_pct": 20.0
    },
    {
      "ticker": "PALL",
      "name": "Aberdeen Standard Physical Palladium Shares ETF",
      "category": "Palladium",
      "return_pct": 16.0
    },
    {
      "ticker": "NIB",
      "name": "iPath Bloomberg Cocoa Subindex Total Return ETN",
      "category": "Cacao",
      "return_pct": 15.0
    },
    {
      "ticker": "PSJ",
      "name": "Invesco Dynamic Software ETF",
      "category": "Software",
      "return_pct": 14.0
    },
    {
      "ticker": "KSA",
      "name": "iShares MSCI Saudi Arabia ETF",
      "category": "Pays Arabie Saoudite",
      "return_pct": 13.1
    },
    {
      "ticker": "BTAL",
      "name": "AGFiQ U.S. Market Neutral Anti-Beta Fund",
      "category": "Anti-Beta",
      "return_pct": 12.0
    },
    {
      "ticker": "IHI",
      "name": "iShares U.S. Medical Devices ETF",
      "category": "Medical Devices",
      "return_pct": 11.0
    },
    {
      "ticker": "IHF",
      "name": "iShares U.S. Healthcare Providers ETF",
      "category": "Healthcare",
      "return_pct": 10.0
    },
    {
      "ticker": "PSCH",
      "name": "Invesco S&P SmallCap Health Care ETF",
      "category": "Healthcare Small Cap",
      "return_pct": 10.0
    },
    {
      "ticker": "UUP",
      "name": "Invesco DB US Dollar Index Bullish Fund",
      "category": "USD",
      "return_pct": 8.0
    },
    {
      "ticker": "XLV",
      "name": "Health Care Select Sector SPDR Fund",
      "category": "Healthcare",
      "return_pct": 6.0
    },
    {
      "ticker": "XWEB",
      "name": "SPDR S&P Internet ETF",
      "category": "Internet",
      "return_pct": 5.0
    },
    {
      "ticker": "SPLV",
      "name": "Invesco S&P 500 Low Volatility ETF",
      "category": "Low Vol",
      "return_pct": 5.0
    },
    {
      "ticker": "PTNQ",
      "name": "Pacer Trendpilot 100 ETF",
      "category": "Trend Nasdaq",
      "return_pct": 5.0
    },
    {
      "ticker": "IGV",
      "name": "iShares Expanded Tech-Software ETF",
      "category": "Software",
      "return_pct": 4.0
    },
    {
      "ticker": "XLU",
      "name": "Utilities Select Sector SPDR Fund",
      "category": "Utilities",
      "return_pct": 4.0
    },
    {
      "ticker": "USMV",
      "name": "iShares MSCI USA Min Vol Factor ETF",
      "category": "Low Vol",
      "return_pct": 4.0
    },
    {
      "ticker": "XLRE",
      "name": "Real Estate Select Sector SPDR Fund",
      "category": "REIT",
      "return_pct": 3.0
    },
    {
      "ticker": "XLC",
      "name": "Communication Services Select Sector SPDR Fund",
      "category": "Communication",
      "return_pct": 0.0
    },
    {
      "ticker": "VIG",
      "name": "Vanguard Dividend Appreciation ETF",
      "category": "Dividendes",
      "return_pct": 0.0
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": -0.1
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": -1.0
    },
    {
      "ticker": "IWM",
      "name": "iShares Russell 2000 ETF",
      "category": "Small Cap",
      "return_pct": -4.0
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": -4.6
    }
  ],
  "2019": [
    {
      "ticker": "INR",
      "name": "Market Vectors-Rupee/USD ETN",
      "category": "Roupie Inde",
      "return_pct": 79.84
    },
    {
      "ticker": "TAN",
      "name": "Invesco Solar ETF",
      "category": "Solaire",
      "return_pct": 65.99
    },
    {
      "ticker": "XSD",
      "name": "SPDR S&P Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 64.62
    },
    {
      "ticker": "SMH",
      "name": "VanEck Vectors Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 64.23
    },
    {
      "ticker": "BBC",
      "name": "Virtus LifeSci Biotech Clinical Trials ETF",
      "category": "Biotech",
      "return_pct": 62.96
    },
    {
      "ticker": "SOXX",
      "name": "iShares PHLX Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 62.56
    },
    {
      "ticker": "FTXL",
      "name": "First Trust Nasdaq Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 62.5
    },
    {
      "ticker": "PBW",
      "name": "Invesco WilderHill Clean Energy ETF",
      "category": "Clean Energy",
      "return_pct": 61.2
    },
    {
      "ticker": "SILJ",
      "name": "ETFMG Prime Junior Silver ETF",
      "category": "Argent",
      "return_pct": 56.87
    },
    {
      "ticker": "CNRG",
      "name": "SPDR S&P Kensho Clean Power ETF",
      "category": "Clean Energy",
      "return_pct": 55.64
    },
    {
      "ticker": "GOAU",
      "name": "US Global GO GOLD and Precious Metal Miners ETF",
      "category": "Or",
      "return_pct": 53.72
    },
    {
      "ticker": "PSI",
      "name": "Invesco Dynamic Semiconductors ETF",
      "category": "Semi-conducteurs",
      "return_pct": 52.13
    },
    {
      "ticker": "PALL",
      "name": "Aberdeen Standard Physical Palladium Shares ETF",
      "category": "Palladium",
      "return_pct": 51.86
    },
    {
      "ticker": "ACES",
      "name": "ALPS Clean Energy ETF",
      "category": "Clean Energy",
      "return_pct": 51.46
    },
    {
      "ticker": "CHIS",
      "name": "Global X MSCI Consumer Staples ETF",
      "category": "Consumer Staples Chine",
      "return_pct": 50.88
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": 38.96
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": 37.03
    },
    {
      "ticker": "XLF",
      "name": "Financial Select Sector SPDR Fund",
      "category": "Finance",
      "return_pct": 31.87
    },
    {
      "ticker": "VIG",
      "name": "Vanguard Dividend Appreciation ETF",
      "category": "Dividendes",
      "return_pct": 29.62
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": 28.79
    },
    {
      "ticker": "VOO",
      "name": "Vanguard S&P 500 ETF",
      "category": "S&P 500",
      "return_pct": 28.72
    },
    {
      "ticker": "XLY",
      "name": "Consumer Discretionary Select Sector SPDR Fund",
      "category": "Consumer",
      "return_pct": 28.39
    },
    {
      "ticker": "MDY",
      "name": "SPDR S&P MidCap 400 ETF",
      "category": "Mid Cap",
      "return_pct": 25.78
    },
    {
      "ticker": "VTV",
      "name": "Vanguard Value ETF",
      "category": "Value",
      "return_pct": 25.66
    },
    {
      "ticker": "DIA",
      "name": "SPDR Dow Jones Industrial Average ETF Trust",
      "category": "Dow",
      "return_pct": 22.26
    }
  ],
  "2020": [
    {
      "ticker": "TAN",
      "name": "Invesco Solar ETF",
      "category": "Solaire",
      "return_pct": 228.1
    },
    {
      "ticker": "PBW",
      "name": "Invesco WilderHill Clean Energy ETF",
      "category": "Clean Energy",
      "return_pct": 202.43
    },
    {
      "ticker": "QCLN",
      "name": "First Trust NASDAQ Clean Edge Green Energy ETF",
      "category": "Clean Energy",
      "return_pct": 180.62
    },
    {
      "ticker": "ARKG",
      "name": "ARK Genomic Revolution ETF",
      "category": "Biotech",
      "return_pct": 176.44
    },
    {
      "ticker": "ARKW",
      "name": "ARK Next Generation Internet ETF",
      "category": "Internet",
      "return_pct": 155.44
    },
    {
      "ticker": "ARKK",
      "name": "ARK Innovation ETF",
      "category": "IA",
      "return_pct": 149.77
    },
    {
      "ticker": "PBD",
      "name": "Invesco Global Clean Energy ETF",
      "category": "Clean Energy",
      "return_pct": 143.08
    },
    {
      "ticker": "ICLN",
      "name": "iShares Global Clean Energy ETF",
      "category": "Clean Energy",
      "return_pct": 140.19
    },
    {
      "ticker": "ACES",
      "name": "ALPS Clean Energy ETF",
      "category": "Clean Energy",
      "return_pct": 136.27
    },
    {
      "ticker": "KGRN",
      "name": "KraneShares MSCI China Environment ETF",
      "category": "Clean Energy",
      "return_pct": 134.66
    },
    {
      "ticker": "CNRG",
      "name": "SPDR S&P Kensho Clean Power ETF",
      "category": "Clean Energy",
      "return_pct": 126.99
    },
    {
      "ticker": "LIT",
      "name": "Global X Lithium & Battery Tech ETF",
      "category": "Lithium",
      "return_pct": 124.92
    },
    {
      "ticker": "IBUY",
      "name": "Amplify Online Retail ETF",
      "category": "E-commerce",
      "return_pct": 122.27
    },
    {
      "ticker": "SMOG",
      "name": "VanEck Low Carbon Energy ETF",
      "category": "Clean Energy",
      "return_pct": 115.88
    },
    {
      "ticker": "ONLN",
      "name": "ProShares Online Retail ETF",
      "category": "E-commerce",
      "return_pct": 110.25
    },
    {
      "ticker": "IPO",
      "name": "Renaissance IPO ETF",
      "category": "IPO",
      "return_pct": 106.56
    },
    {
      "ticker": "ARKF",
      "name": "ARK Fintech Innovation ETF",
      "category": "Fintech",
      "return_pct": 106.1
    },
    {
      "ticker": "OGIG",
      "name": "Invesco Oil & Gas Exploration & Production ETF",
      "category": "Energie",
      "return_pct": 105.61
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": 48.62
    },
    {
      "ticker": "SOXX",
      "name": "iShares PHLX Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 45.0
    },
    {
      "ticker": "SMH",
      "name": "VanEck Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 43.0
    },
    {
      "ticker": "XLK",
      "name": "Technology Select Sector SPDR Fund",
      "category": "Tech",
      "return_pct": 43.0
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": 40.0
    },
    {
      "ticker": "XLY",
      "name": "Consumer Discretionary Select Sector SPDR Fund",
      "category": "Consumer",
      "return_pct": 32.0
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": 18.33
    }
  ],
  "2021": [
    {
      "ticker": "BDRY",
      "name": "Breakwave Dry Bulk Shipping ETF",
      "category": "Dry Bulk Shipping",
      "return_pct": 240.0
    },
    {
      "ticker": "GRN",
      "name": "iPath Series B Carbon ETN",
      "category": "Carbon",
      "return_pct": 135.0
    },
    {
      "ticker": "JJT",
      "name": "iPath Series B Bloomberg Tin Subindex Total Return ETN",
      "category": "Tin",
      "return_pct": 120.0
    },
    {
      "ticker": "FCG",
      "name": "First Trust Natural Gas ETF",
      "category": "Natural Gas",
      "return_pct": 100.0
    },
    {
      "ticker": "KRBN",
      "name": "KraneShares Global Carbon ETF",
      "category": "Carbon",
      "return_pct": 100.0
    },
    {
      "ticker": "XOP",
      "name": "SPDR S&P Oil & Gas Exploration & Production ETF",
      "category": "Energie",
      "return_pct": 67.1
    },
    {
      "ticker": "VDE",
      "name": "Vanguard Energy ETF",
      "category": "Energie",
      "return_pct": 54.4
    },
    {
      "ticker": "IYE",
      "name": "iShares U.S. Energy ETF",
      "category": "Energie",
      "return_pct": 53.5
    },
    {
      "ticker": "XLE",
      "name": "Energy Select Sector SPDR Fund",
      "category": "Energie",
      "return_pct": 51.5
    },
    {
      "ticker": "LIT",
      "name": "Global X Lithium & Battery Tech ETF",
      "category": "Lithium",
      "return_pct": 48.5
    },
    {
      "ticker": "SOXX",
      "name": "iShares Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 45.0
    },
    {
      "ticker": "XLK",
      "name": "Technology Select Sector SPDR Fund",
      "category": "Tech",
      "return_pct": 34.8
    },
    {
      "ticker": "XLF",
      "name": "Financial Select Sector SPDR Fund",
      "category": "Finance",
      "return_pct": 34.8
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": 28.7
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": 27.4
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": 27.0
    },
    {
      "ticker": "VTI",
      "name": "Vanguard Total Stock Market ETF",
      "category": "Total Market",
      "return_pct": 25.7
    },
    {
      "ticker": "XLY",
      "name": "Consumer Discretionary Select Sector SPDR Fund",
      "category": "Consumer",
      "return_pct": 22.1
    },
    {
      "ticker": "XLC",
      "name": "Communication Services Select Sector SPDR Fund",
      "category": "Communication",
      "return_pct": 22.1
    },
    {
      "ticker": "VEA",
      "name": "Vanguard FTSE Developed Markets ETF",
      "category": "International",
      "return_pct": 11.5
    },
    {
      "ticker": "IBB",
      "name": "iShares Biotechnology ETF",
      "category": "Biotech",
      "return_pct": 2.0
    },
    {
      "ticker": "VWO",
      "name": "Vanguard FTSE Emerging Markets ETF",
      "category": "Emergents",
      "return_pct": -1.6
    },
    {
      "ticker": "GLD",
      "name": "SPDR Gold Shares",
      "category": "Or",
      "return_pct": -3.5
    },
    {
      "ticker": "SLV",
      "name": "iShares Silver Trust",
      "category": "Argent",
      "return_pct": -9.8
    },
    {
      "ticker": "GDX",
      "name": "VanEck Vectors Gold Miners ETF",
      "category": "Gold Miners",
      "return_pct": -11.0
    }
  ],
  "2022": [
    {
      "ticker": "TUR",
      "name": "iShares MSCI Turkey ETF",
      "category": "Pays Turquie",
      "return_pct": 104.0
    },
    {
      "ticker": "PFIX",
      "name": "Simplify Interest Rate Hedge ETF",
      "category": "Interest Rate Hedge",
      "return_pct": 93.0
    },
    {
      "ticker": "OIH",
      "name": "VanEck Oil Services ETF",
      "category": "Energie",
      "return_pct": 66.0
    },
    {
      "ticker": "XLE",
      "name": "Energy Select Sector SPDR Fund",
      "category": "Energie",
      "return_pct": 65.2
    },
    {
      "ticker": "IEZ",
      "name": "iShares U.S. Oil Equipment & Services ETF",
      "category": "Energie",
      "return_pct": 65.0
    },
    {
      "ticker": "VDE",
      "name": "Vanguard Energy ETF",
      "category": "Energie",
      "return_pct": 65.0
    },
    {
      "ticker": "FENY",
      "name": "Fidelity MSCI Energy Index ETF",
      "category": "Energie",
      "return_pct": 64.0
    },
    {
      "ticker": "IYE",
      "name": "iShares U.S. Energy ETF",
      "category": "Energie",
      "return_pct": 60.4
    },
    {
      "ticker": "IEO",
      "name": "iShares U.S. Oil & Gas Exploration & Production ETF",
      "category": "Energie",
      "return_pct": 58.0
    },
    {
      "ticker": "XLU",
      "name": "Utilities Select Sector SPDR Fund",
      "category": "Utilities",
      "return_pct": 1.4
    },
    {
      "ticker": "VTV",
      "name": "Vanguard Value ETF",
      "category": "Value",
      "return_pct": -0.4
    },
    {
      "ticker": "XLP",
      "name": "Consumer Staples Select Sector SPDR Fund",
      "category": "Staples",
      "return_pct": -0.8
    },
    {
      "ticker": "VDC",
      "name": "Vanguard Consumer Staples ETF",
      "category": "Staples",
      "return_pct": -1.3
    },
    {
      "ticker": "XLV",
      "name": "Health Care Select Sector SPDR Fund",
      "category": "Healthcare",
      "return_pct": -2.1
    },
    {
      "ticker": "XLI",
      "name": "Industrial Select Sector SPDR Fund",
      "category": "Industrial",
      "return_pct": -5.6
    },
    {
      "ticker": "VIG",
      "name": "Vanguard Dividend Appreciation ETF",
      "category": "Dividendes",
      "return_pct": -6.6
    },
    {
      "ticker": "DIA",
      "name": "SPDR Dow Jones Industrial Average ETF",
      "category": "Dow",
      "return_pct": -8.8
    },
    {
      "ticker": "XLF",
      "name": "Financial Select Sector SPDR Fund",
      "category": "Finance",
      "return_pct": -10.6
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": -18.0
    },
    {
      "ticker": "VOO",
      "name": "Vanguard S&P 500 ETF",
      "category": "S&P 500",
      "return_pct": -18.0
    },
    {
      "ticker": "MDY",
      "name": "SPDR S&P MidCap 400 ETF",
      "category": "Mid Cap",
      "return_pct": -19.0
    },
    {
      "ticker": "VTI",
      "name": "Vanguard Total Stock Market ETF",
      "category": "Total Market",
      "return_pct": -19.5
    },
    {
      "ticker": "IWM",
      "name": "iShares Russell 2000 ETF",
      "category": "Small Cap",
      "return_pct": -20.4
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": -32.6
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": -33.0
    }
  ],
  "2023": [
    {
      "ticker": "SMH",
      "name": "VanEck Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 72.4
    },
    {
      "ticker": "SOXX",
      "name": "iShares Semiconductor ETF",
      "category": "Semi-conducteurs",
      "return_pct": 65.6
    },
    {
      "ticker": "IGM",
      "name": "iShares Expanded Tech Sector ETF",
      "category": "Tech",
      "return_pct": 60.0
    },
    {
      "ticker": "IGV",
      "name": "iShares Expanded Tech-Software Sector ETF",
      "category": "Tech",
      "return_pct": 58.6
    },
    {
      "ticker": "XLK",
      "name": "Technology Select Sector SPDR Fund",
      "category": "Tech",
      "return_pct": 54.7
    },
    {
      "ticker": "QQQ",
      "name": "Invesco QQQ Trust",
      "category": "Nasdaq",
      "return_pct": 53.9
    },
    {
      "ticker": "VGT",
      "name": "Vanguard Information Technology ETF",
      "category": "Tech",
      "return_pct": 51.4
    },
    {
      "ticker": "XLC",
      "name": "Communication Services Select Sector SPDR Fund",
      "category": "Communication",
      "return_pct": 51.4
    },
    {
      "ticker": "SCHG",
      "name": "Schwab U.S. Large-Cap Growth ETF",
      "category": "Growth",
      "return_pct": 49.3
    },
    {
      "ticker": "VUG",
      "name": "Vanguard Growth ETF",
      "category": "Growth",
      "return_pct": 45.9
    },
    {
      "ticker": "XLY",
      "name": "Consumer Discretionary Select Sector SPDR Fund",
      "category": "Consumer",
      "return_pct": 40.0
    },
    {
      "ticker": "SPY",
      "name": "SPDR S&P 500 ETF Trust",
      "category": "S&P 500",
      "return_pct": 24.3
    },
    {
      "ticker": "VOO",
      "name": "Vanguard S&P 500 ETF",
      "category": "S&P 500",
      "return_pct": 24.2
    },
    {
      "ticker": "VTI",
      "name": "Vanguard Total Stock Market ETF",
      "category": "Total Market",
      "return_pct": 24.1
    },
    {
      "ticker": "XME",
      "name": "SPDR S&P Metals & Mining ETF",
      "category": "Materials",
      "return_pct": 20.1
    },
    {
      "ticker": "XLI",
      "name": "Industrial Select Sector SPDR Fund",
      "category": "Industrial",
      "return_pct": 18.0
    },
    {
      "ticker": "IWM",
      "name": "iShares Russell 2000 ETF",
      "category": "Small Cap",
      "return_pct": 15.1
    },
    {
      "ticker": "MDY",
      "name": "SPDR S&P MidCap 400 ETF",
      "category": "Mid Cap",
      "return_pct": 14.7
    },
    {
      "ticker": "ITA",
      "name": "iShares U.S. Aerospace & Defense ETF",
      "category": "Aérospatial",
      "return_pct": 14.0
    },
    {
      "ticker": "DIA",
      "name": "SPDR Dow Jones Industrial Average ETF",
      "category": "Dow",
      "return_pct": 13.7
    },
    {
      "ticker": "XLB",
      "name": "Materials Select Sector SPDR Fund",
      "category": "Materials",
      "return_pct": 11.5
    },
    {
      "ticker": "XLF",
      "name": "Financial Select Sector SPDR Fund",
      "category": "Finance",
      "return_pct": 10.0
    },
    {
      "ticker": "XLV",
      "name": "Health Care Select Sector SPDR Fund",
      "category": "Healthcare",
      "return_pct": 0.4
    },
    {
      "ticker": "XLP",
      "name": "Consumer Staples Select Sector SPDR Fund",
      "category": "Staples",
      "return_pct": -0.5
    },
    {
      "ticker": "XLU",
      "name": "Utilities Select Sector SPDR Fund",
      "category": "Utilities",
      "return_pct": -7.1
    }
  ],
  "2024": [
    {
      "ticker": "MAGS",
      "name": "Roundhill Magnificent Seven ETF",
      "category": "Magnificent 7 Tech",
      "return_pct": 64.0
    },
    {
      "ticker": "ARGT",
      "name": "Global X MSCI Argentina ETF",
      "category": "Argentina",
      "return_pct": 63.5
    },
    {
      "ticker": "WUGI",
      "name": "AXS Esoterica NextG Economy ETF",
      "category": "NextG Economy",
      "return_pct": 52.7
    },
    {
      "ticker": "QTUM",
      "name": "Defiance Quantum ETF",
      "category": "Quantum Computing",
      "return_pct": 50.5
    },
    {
      "ticker": "ERUS",
      "name": "iShares MSCI Russia ETF",
      "category": "Russia",
      "return_pct": 50.3
    },
    {
      "ticker": "ESPO",
      "name": "VanEck Video Gaming and eSports ETF",
      "category": "Gaming/eSports",
      "return_pct": 47.6
    },
    {
      "ticker": "ATFV",
      "name": "Alger 35 ETF",
      "category": "US Growth",
      "return_pct": 46.2
    },
    {
      "ticker": "FDG",
      "name": "American Century Focused Dynamic Growth ETF",
      "category": "Large Growth",
      "return_pct": 45.9
    },
    {
      "ticker": "SPMO",
      "name": "Invesco S&P 500 Momentum ETF",
      "category": "Momentum",
      "return_pct": 45.8
    },
    {
      "ticker": "SFYF",
      "name": "SoFi Social 50 ETF",
      "category": "Social Media",
      "return_pct": 44.6
    },
    {
      "ticker": "GABF",
      "name": "Gabelli Financial Services Opportunities ETF",
      "category": "Financial Services",
      "return_pct": 44.5
    },
    {
      "ticker": "USAI",
      "name": "Pacer American Energy Independence ETF",
      "category": "Energy",
      "return_pct": 44.0
    },
    {
      "ticker": "ADPV",
      "name": "Adaptiv Select ETF",
      "category": "Core Equity",
      "return_pct": 43.9
    },
    {
      "ticker": "UMI",
      "name": "USCF Midstream Energy Income Fund",
      "category": "Midstream Energy",
      "return_pct": 43.0
    },
    {
      "ticker": "GGRW",
      "name": "Gabelli Growth Innovators ETF",
      "category": "Growth Innovators",
      "return_pct": 41.8
    },
    {
      "ticker": "HFGO",
      "name": "Hartford Large Cap Growth ETF",
      "category": "Large Growth",
      "return_pct": 40.86
    },
    {
      "ticker": "HCMT",
      "name": "Direxion HCM Tactical Enhanced US Equity Strategy ETF",
      "category": "Large Blend",
      "return_pct": 39.44
    },
    {
      "ticker": "FBCG",
      "name": "Fidelity Blue Chip Growth ETF",
      "category": "Large Growth",
      "return_pct": 39.3
    },
    {
      "ticker": "SEIM",
      "name": "SEI Large Cap Momentum Factor ETF",
      "category": "Large Growth",
      "return_pct": 38.94
    },
    {
      "ticker": "LSGR",
      "name": "Natixis Loomis Sayles Focused Growth ETF",
      "category": "Large Growth",
      "return_pct": 38.23
    },
    {
      "ticker": "FFOG",
      "name": "Franklin Focused Growth ETF",
      "category": "Large Growth",
      "return_pct": 38.17
    },
    {
      "ticker": "GARP",
      "name": "iShares MSCI USA Quality GARP ETF",
      "category": "Large Growth",
      "return_pct": 37.31
    },
    {
      "ticker": "NUGO",
      "name": "Nuveen Growth Opportunities ETF",
      "category": "Large Growth",
      "return_pct": 36.07
    },
    {
      "ticker": "EIS",
      "name": "iShares MSCI Israel ETF",
      "category": "Israel",
      "return_pct": 34.5
    },
    {
      "ticker": "LBO",
      "name": "WHITEWOLF Publicly Listed Private Equity ETF",
      "category": "Private Equity",
      "return_pct": 30.9
    }
  ],
  "2025": [
    {
      "ticker": "SLVP",
      "name": "iShares MSCI Global Silver and Metals Miners ETF",
      "category": "Silver Miners",
      "return_pct": 200.0
    },
    {
      "ticker": "SILJ",
      "name": "Amplify Junior Silver Miners ETF",
      "category": "Junior Silver Miners",
      "return_pct": 186.0
    },
    {
      "ticker": "GOEX",
      "name": "Global X Gold Explorers ETF",
      "category": "Gold Explorers",
      "return_pct": 182.0
    },
    {
      "ticker": "SGDJ",
      "name": "Sprott Junior Gold Miners ETF",
      "category": "Junior Gold Miners",
      "return_pct": 175.0
    },
    {
      "ticker": "GDXJ",
      "name": "VanEck Junior Gold Miners ETF",
      "category": "Junior Gold Miners",
      "return_pct": 175.0
    },
    {
      "ticker": "MNRS",
      "name": "BetaShares Global Gold Miners ETF - Currency Hedged",
      "category": "Gold Miners Hedged",
      "return_pct": 156.0
    },
    {
      "ticker": "GDX",
      "name": "VanEck Gold Miners ETF",
      "category": "Gold Miners",
      "return_pct": 155.0
    },
    {
      "ticker": "SIL",
      "name": "Global X Silver Miners ETF",
      "category": "Silver Miners",
      "return_pct": 140.0
    },
    {
      "ticker": "ETPMAG",
      "name": "Global X Physical Silver",
      "category": "Silver",
      "return_pct": 133.0
    },
    {
      "ticker": "ETPMPT",
      "name": "Global X Physical Platinum",
      "category": "Platinum",
      "return_pct": 109.0
    },
    {
      "ticker": "XMET",
      "name": "BetaShares Energy Transition Metals ETF",
      "category": "Energy Transition Metals",
      "return_pct": 100.0
    },
    {
      "ticker": "GMTL",
      "name": "Global X Green Metal Miners ETF",
      "category": "Green Metals",
      "return_pct": 81.0
    },
    {
      "ticker": "WIRE",
      "name": "Global X Copper Miners ETF",
      "category": "Copper Miners",
      "return_pct": 81.0
    },
    {
      "ticker": "IKO",
      "name": "iShares MSCI South Korea ETF",
      "category": "South Korea",
      "return_pct": 80.87
    },
    {
      "ticker": "QAU",
      "name": "BetaShares Gold Bullion ETF (Currency Hedged)",
      "category": "Gold Hedged",
      "return_pct": 64.0
    },
    {
      "ticker": "ARKQ",
      "name": "ARK Autonomous Technology & Robotics ETF",
      "category": "Tech/Robotics",
      "return_pct": 48.7
    },
    {
      "ticker": "ARKX",
      "name": "ARK Space & Defense Innovation ETF",
      "category": "Space/Defense",
      "return_pct": 48.28
    },
    {
      "ticker": "ARKW",
      "name": "ARK Next Generation Internet ETF",
      "category": "Tech/Internet",
      "return_pct": 38.69
    },
    {
      "ticker": "ATFV",
      "name": "Alger 35 ETF",
      "category": "Equity",
      "return_pct": 37.49
    },
    {
      "ticker": "ARKK",
      "name": "ARK Innovation ETF",
      "category": "Innovation",
      "return_pct": 35.58
    },
    {
      "ticker": "CNEQ",
      "name": "Alger Concentrated Equity ETF",
      "category": "Equity",
      "return_pct": 33.45
    },
    {
      "ticker": "SAMT",
      "name": "Strategas Macro Thematic Opportunities ETF",
      "category": "Thematic",
      "return_pct": 33.1
    },
    {
      "ticker": "SPHB",
      "name": "Invesco S&P 500 High Beta ETF",
      "category": "High Beta",
      "return_pct": 32.81
    },
    {
      "ticker": "PWRD",
      "name": "TCW Transform Systems ETF",
      "category": "Transformational Change",
      "return_pct": 32.58
    },
    {
      "ticker": "BLCR",
      "name": "iShares Large Cap Core Active ETF",
      "category": "Large Cap",
      "return_pct": 30.85
    }
  ],
  "2026": [
    {
      "ticker": "BWET",
      "name": "Breakwave Tanker Shipping ETF",
      "category": "Tanker Shipping",
      "return_pct": 585.25
    },
    {
      "ticker": "USO",
      "name": "United States Oil Fund LP",
      "category": "Oil",
      "return_pct": 77.2
    },
    {
      "ticker": "UGA",
      "name": "United States Gasoline Fund LP",
      "category": "Gasoline",
      "return_pct": 59.9
    },
    {
      "ticker": "EWY",
      "name": "iShares MSCI South Korea ETF",
      "category": "South Korea",
      "return_pct": 49.1
    },
    {
      "ticker": "GSG",
      "name": "iShares S&P GSCI Commodity-Indexed Trust",
      "category": "Commodities",
      "return_pct": 45.06
    },
    {
      "ticker": "PSI",
      "name": "Invesco Semiconductors ETF",
      "category": "Semiconductors",
      "return_pct": 44.5
    },
    {
      "ticker": "OIH",
      "name": "VanEck Oil Services ETF",
      "category": "Oil Services",
      "return_pct": 41.6
    },
    {
      "ticker": "PSCE",
      "name": "Invesco S&P SmallCap Energy ETF",
      "category": "SmallCap Energy",
      "return_pct": 41.44
    },
    {
      "ticker": "XOP",
      "name": "SPDR S&P Oil & Gas Exploration & Production",
      "category": "Oil & Gas Exploration",
      "return_pct": 37.8
    },
    {
      "ticker": "XTL",
      "name": "SPDR S&P Telecom ETF",
      "category": "Telecom",
      "return_pct": 37.7
    },
    {
      "ticker": "FLBR",
      "name": "Franklin FTSE Brazil ETF",
      "category": "Brazil",
      "return_pct": 35.9
    },
    {
      "ticker": "FYT",
      "name": "First Trust Small Cap Value AlphaDEX Fund",
      "category": "Small Value",
      "return_pct": 9.35
    },
    {
      "ticker": "CDC",
      "name": "VictoryShares US EQ Income Enhanced Volatility Weighted ETF",
      "category": "Large Value",
      "return_pct": 9.04
    },
    {
      "ticker": "CDL",
      "name": "VictoryShares US Large Cap High Dividend Volatility Weighted ETF",
      "category": "Large Value",
      "return_pct": 9.04
    },
    {
      "ticker": "SDOG",
      "name": "ALPS Sector Dividend Dogs ETF",
      "category": "Large Value",
      "return_pct": 8.56
    },
    {
      "ticker": "AVUV",
      "name": "Avantis US Small Cap Value ETF",
      "category": "Small Value",
      "return_pct": 8.55
    },
    {
      "ticker": "FDV",
      "name": "Federated Hermes US Strategic Dividend ETF",
      "category": "Large Value",
      "return_pct": 8.43
    },
    {
      "ticker": "RDIV",
      "name": "Invesco S&P Ultra Dividend Revenue ETF",
      "category": "Mid-Cap Value",
      "return_pct": 8.03
    },
    {
      "ticker": "INCE",
      "name": "Franklin Income Equity Focus ETF",
      "category": "Large Value",
      "return_pct": 7.47
    },
    {
      "ticker": "DFSV",
      "name": "Dimensional US Small Cap Value ETF",
      "category": "Small Value",
      "return_pct": 6.91
    },
    {
      "ticker": "AVLV",
      "name": "Avantis US Large Cap Value ETF",
      "category": "Large Value",
      "return_pct": 6.77
    },
    {
      "ticker": "RSHO",
      "name": "Tema American Reshoring ETF",
      "category": "Reshoring",
      "return_pct": 0.0
    },
    {
      "ticker": "CSD",
      "name": "Invesco S&P Spin-Off ETF",
      "category": "Spin-Off",
      "return_pct": 0.0
    },
    {
      "ticker": "PWRD",
      "name": "TCW Transform Systems ETF",
      "category": "Transform Systems",
      "return_pct": 0.0
    },
    {
      "ticker": "GQGU",
      "name": "GQG US Equity ETF",
      "category": "US Equity",
      "return_pct": 0.0
    }
  ]
};
