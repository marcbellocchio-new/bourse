#!/usr/bin/env python3
"""Fusionne les 2 fichiers de recherche et produit yearly.js avec 25 ETF/année."""
import csv, json, ast, sys

paths = [
    "/home/user/workspace/wide/research_results_mohhwivo.csv",  # 1ère collecte
    "/home/user/workspace/wide/research_results_mohid84f.csv",  # complément
]
out = "/home/user/workspace/etf-dashboard/yearly.js"

# Année -> ETF (le second fichier prime quand il a plus d'entrées)
data = {}
for path in paths:
    with open(path, newline='', encoding='utf-8') as f:
        for row in csv.DictReader(f):
            year = row.get("Année") or row.get("entity")
            raw = row.get("Top 25 ETF", "").strip()
            if not raw:
                continue
            try:
                etfs = ast.literal_eval(raw)
            except Exception as e:
                print(f"Parse error {year}: {e}", file=sys.stderr)
                continue
            cleaned = []
            seen_tickers = set()
            for e in etfs:
                tk = str(e.get("ticker", "")).strip()
                if not tk or tk in seen_tickers:
                    continue
                seen_tickers.add(tk)
                cleaned.append({
                    "ticker": tk,
                    "name": str(e.get("name", "")).strip(),
                    "category": str(e.get("category", "")).strip(),
                    "return_pct": float(e.get("return_pct", 0) or 0)
                })
            cleaned.sort(key=lambda x: x["return_pct"], reverse=True)
            # Si on a déjà des données et que la nouvelle liste est plus complète OU plus longue, on remplace
            if year not in data or len(cleaned) > len(data[year]):
                data[year] = cleaned[:25]
            else:
                # fusion: ajoute les nouveaux tickers manquants
                existing_tickers = {e["ticker"] for e in data[year]}
                for e in cleaned:
                    if e["ticker"] not in existing_tickers and len(data[year]) < 25:
                        data[year].append(e)
                        existing_tickers.add(e["ticker"])
                data[year].sort(key=lambda x: x["return_pct"], reverse=True)

ordered = {y: data[y] for y in sorted(data.keys())}

with open(out, "w", encoding='utf-8') as f:
    f.write("// Top 25 ETF par année — collecté via wide_research (avril 2026)\n")
    f.write("// Sources : ETFdb, ETF.com, Morningstar, Yahoo Finance, justETF, Investopedia, StatMuse\n")
    f.write("const YEARLY_TOP25 = ")
    json.dump(ordered, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"OK — {len(ordered)} années écrites dans {out}")
for y, lst in ordered.items():
    cats = set(e['category'] for e in lst)
    print(f"  {y}: {len(lst)} ETF · {len(cats)} catégories · top = {lst[0]['ticker']} ({lst[0]['return_pct']:+.1f}%)")
