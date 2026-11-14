#!/usr/bin/env python3
"""Ejecuta comprobaciones documentales y registra resultados sin modificar progreso."""
import io
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
suite = unittest.defaultTestLoader.discover(str(ROOT / 'tests/design'))
stream = io.StringIO()
result = unittest.TextTestRunner(stream=stream, verbosity=2).run(suite)
counts = [len(json.loads(p.read_text())['narrativeEntry'].split())
          for p in sorted((ROOT / 'content/es/chapters').glob('chapter-*.json'))]
report = {
    'reportVersion': 1,
    'editorialDate': '2026-10-26',
    'stage': 'design-integrity-and-first-four-acts-status',
    'command': 'python3 scripts/check_design.py',
    'testsRun': result.testsRun,
    'failures': len(result.failures),
    'errors': len(result.errors),
    'passed': result.wasSuccessful(),
    'contentInventory': {'chapters': len(counts), 'acts': 10, 'hints': 200,
                         'narrativeWordRange': [min(counts), max(counts)]},
    'scope': ['Estructura documental y referencias', 'Coherencia declarada de fixtures',
              'Sonda SQLite en memoria para la pareja SQL propuesta'],
    'notTestedByThisCommand': ['Servicios HTTP (se prueban con test:integration)', 'Persistencia real (test:integration)', 'Docker y aislamiento de red',
                  'Cookies y topología en navegador', 'XSS/CSRF/SSRF ejecutables',
                  'Accesibilidad de interfaz', 'Recorrido con principiante'],
    'details': stream.getvalue().splitlines(),
}
(ROOT / 'reports').mkdir(exist_ok=True)
(ROOT / 'reports/design-checks.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(stream.getvalue())
print('Informe: reports/design-checks.json · Integridad documental; las pruebas ejecutables tienen sus propios informes.')
sys.exit(0 if result.wasSuccessful() else 1)
