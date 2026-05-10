#!/usr/bin/env python3
"""Convertit le CSV de recherche en JSON propre pour le dashboard."""
import csv, json, ast, re, sys
from pathlib import Path

csv_path = "/home/user/workspace/wide/research_results_mohhwivo.csv"
out_path = "/home/user/workspace/etf-dashboard/yearly.js"

data = {}
with open(csv_path, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        year = row.get("Année") or row.get("entity")
        raw = row.get("Top 25 ETF", "").strip()
        if not raw:
            continue
        # Le CSV contient des dict Python (avec quotes simples) → ast.literal_eval
        try:
            etfs = ast.literal_eval(raw)
        except Exception as e:
            print(f"Erreur parsing {year}: {e}", file=sys.stderr)
            continue
        # Tri par perf décroissante, top 25 max
        etfs = sorted(etfs, key=lambda x: x.get("return_pct", 0) or 0, reverse=True)[:25]
        # Nettoyage
        cleaned = []
        for e in etfs:
            cleaned.append({
                "ticker": str(e.get("ticker", "")).strip(),
                "name": str(e.get("name", "")).strip(),
                "category": str(e.get("category", "")).strip(),
                "return_pct": float(e.get("return_pct", 0) or 0)
            })
        data[year] = cleaned

# Tri des années
ordered = {y: data[y] for y in sorted(data.keys())}

# Écrit en JS pour usage dans le navigateur
with open(out_path, "w", encoding='utf-8') as f:
    f.write("// Top 25 ETF par année — collecté via wide_research (avril 2026)\n")
    f.write("// Sources : ETFdb, ETF.com, Morningstar, Yahoo Finance, justETF, Investopedia\n")
    f.write("const YEARLY_TOP25 = ")
    json.dump(ordered, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"OK — {len(ordered)} années écrites dans {out_path}")
for y, lst in ordered.items():
    print(f"  {y}: {len(lst)} ETF · meilleur = {lst[0]['ticker']} ({lst[0]['return_pct']:+.1f}%)")
