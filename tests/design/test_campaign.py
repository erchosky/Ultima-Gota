"""Integridad de diseño. No son pruebas de la aplicación aún no implementada."""
import json
import re
import sqlite3
import unittest
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[2]


def read(path):
    return json.loads((ROOT / path).read_text())


class CampaignDesignTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.chapters = [read(f'content/es/chapters/chapter-{n:02d}.json') for n in range(1, 51)]
        cls.by_id = {c['id']: c for c in cls.chapters}
        cls.fixtures = read('content/es/campaign/fixtures.json')
        cls.skills = read('content/es/campaign/skills.json')

    def test_exactly_fifty_without_gaps_or_duplicates(self):
        paths = list((ROOT / 'content/es/chapters').glob('chapter-*.json'))
        self.assertEqual(len(paths), 50)
        self.assertEqual(len(self.by_id), 50)
        self.assertEqual(list(self.by_id), [f'UG-{n:02d}' for n in range(1, 51)])

    def test_original_order_and_titles_preserved(self):
        source = (ROOT / 'docs/ESPECIFICACION-ORIGINAL.md').read_text()
        titles = re.findall(r'^#### Capítulo (\d{2}) — (.+)$', source, re.M)
        self.assertEqual(len(titles), 50)
        self.assertEqual([c['title'] for c in self.chapters], [title for _, title in titles])

    def test_ten_acts_with_five_chapters(self):
        acts = read('content/es/campaign/acts.json')
        self.assertEqual(len(acts), 10)
        self.assertEqual(Counter(c['act'] for c in self.chapters), {n: 5 for n in range(1, 11)})
        for a in acts:
            self.assertEqual(len(a['chapters']), 5)
            self.assertTrue(all(self.by_id[id]['act'] == a['id'] for id in a['chapters']))

    def test_dependencies_are_existing_and_strictly_earlier(self):
        for n, c in enumerate(self.chapters, 1):
            with self.subTest(chapter=c['id']):
                self.assertEqual(len(c['prerequisites']), len(set(c['prerequisites'])))
                for dep in c['prerequisites']:
                    self.assertIn(dep, self.by_id)
                    self.assertLess(int(dep[3:]), n)  # Implica también ausencia de ciclos.
                if n > 1:
                    self.assertIn(f'UG-{n-1:02d}', c['prerequisites'])

    def test_skills_introduced_once_and_reuse_resolves(self):
        self.assertEqual(len({c['newSkill']['id'] for c in self.chapters}), 50)
        skills = {s['id']: s for s in self.skills}
        for c in self.chapters:
            self.assertTrue(c['newSkill']['action'])
            for reused in c['reusedSkills']:
                self.assertEqual(skills[reused['skillId']]['introducedIn'], reused['introducedIn'])
                self.assertIn(reused['introducedIn'], c['prerequisites'])
                self.assertTrue(reused['observableUse'])
                self.assertTrue(reused['practiceContext'])

    def test_foundational_skills_reappear_in_distinct_acts(self):
        for sid in ['S01', 'S02', 'S03', 'S05', 'S07', 'S10', 'S11', 'S12', 'S15']:
            acts = {c['act'] for c in self.chapters if any(r['skillId'] == sid for r in c['reusedSkills'])}
            self.assertGreaterEqual(len(acts), 3, sid)

    def test_narrative_entry_word_targets(self):
        for c in self.chapters:
            words = len(c['narrativeEntry'].split())
            self.assertTrue(80 <= words <= 160, (c['id'], words))

    def test_four_unique_ordered_hints_and_separate_answer(self):
        for n, c in enumerate(self.chapters, 1):
            hints = [read(f'content/es/chapters/chapter-{n:02d}/hint-{i}.json') for i in range(1, 5)]
            self.assertEqual([h['level'] for h in hints], [1, 2, 3, 4])
            self.assertEqual(len({h['text'] for h in hints}), 4)
            self.assertEqual(c['hintIds'], [h['id'] for h in hints])
            self.assertNotIn('understandingAnswer', c['understandingCheck'])
            self.assertNotIn('solution', c)
            teacher = read(f'content/es/instructor/chapter-{n:02d}.json')
            self.assertTrue(teacher['solution'])
            self.assertTrue(teacher['understandingAnswer'])

    def test_complete_design_fields_and_scenario_contracts(self):
        required = ['narrativeEntry', 'whyItMatters', 'learningObjective', 'allowedAccounts',
                    'predictionQuestion', 'guidedSteps', 'evidenceRequirements', 'debrief',
                    'understandingCheck', 'nextNarrativeArtifact', 'checkpointPolicy']
        for n, c in enumerate(self.chapters, 1):
            for field in required:
                self.assertTrue(c[field], (c['id'], field))
            plan = read(f'scenarios/chapter-{n:02d}/plan.json')
            fixtures = read(f'scenarios/chapter-{n:02d}/fixtures.json')
            self.assertEqual(plan['initialState']['overrideRef'], fixtures['id'])
            self.assertTrue(fixtures['settings'])
            self.assertTrue(plan['successValidator']['contract'])
            self.assertGreaterEqual(len(plan['falsePositiveChecks']), 3)
            self.assertTrue(plan['patchVerification']['positive'])
            self.assertTrue(plan['patchVerification']['negative'])

    def test_accounts_and_order_owners_never_change(self):
        accounts = self.fixtures['accounts']
        by_name = {a['name']: a for a in accounts}
        self.assertEqual(by_name['demo.pera']['role'], 'customer')
        self.assertFalse(by_name['demo.pera']['supportAccess'])
        owners = {o['id']: o['ownerId'] for o in self.fixtures['orders']}
        self.assertEqual(owners, {203: 'user-alba', 204: 'user-bruno', 205: 'user-demo-pera'})
        for c in self.chapters:
            for a in c['allowedAccounts']:
                self.assertTrue(a in by_name or a in ['anonymous', 'reviewer'], (c['id'], a))
        self.assertEqual({o['id']: o['ownerId'] for o in self.fixtures['transfer']['orders']},
                         {303: 'user-alba', 304: 'user-bruno'})

    def test_prices_campaign_and_coupon_have_single_source(self):
        self.assertEqual([p['id'] for p in self.fixtures['products']], list(range(1, 7)))
        price = self.fixtures['priceDiscrepancy']
        self.assertEqual((price['responseCents'], price['legacyRenderedCents']), (210, 240))
        self.assertEqual(self.fixtures['campaign']['productId'], 6)
        coupon = self.fixtures['coupon']
        self.assertEqual(coupon['code'], 'PRIMERBRINDIS')
        self.assertEqual(coupon['maximumUsesPerAccount'], 1)
        self.assertEqual(coupon['minimumSubtotalCents'], 2000)
        self.assertEqual(coupon['discountBasisPoints'], 1000)

    def test_recovery_frontier_isolated_from_consumption(self):
        fixture = read('scenarios/chapter-29/fixtures.json')['settings']
        self.assertEqual(fixture['clonedUnusedTokenTimes'], [599, 600, 601])
        self.assertEqual(self.fixtures['recovery']['ttlSeconds'], 600)
        self.assertEqual(self.fixtures['recovery']['validWhen'], 'now < expiresAt')
        self.assertTrue(fixture['tokenAccountBinding'])
        self.assertTrue(fixture['singleUse'])

    def test_timeline_has_distinct_actors_and_no_invented_attribution(self):
        events = read('content/es/campaign/timeline.json')['events']
        by_id = {e['id']: e for e in events}
        self.assertEqual(len(by_id), len(events))
        times = [e['time'] for e in events if e['time'].startswith('day-0')]
        self.assertEqual(times, sorted(times))
        for id in ['HIST-02', 'HIST-03', 'HIST-04', 'HIST-06']:
            self.assertEqual(by_id[id]['sessionRef'], 'hist-session-17')
        self.assertNotEqual(by_id['HIST-05']['sessionRef'], 'hist-session-17')
        self.assertIsNone(by_id['HIST-07']['actorRef'])
        self.assertEqual(by_id['HIST-08']['actorRef'], 'mercurio-service')

    def test_export_branches_are_distinct(self):
        exports = self.fixtures['exports']
        self.assertNotEqual(exports['publicCopy']['path'], exports['supportOriginal']['path'])
        self.assertEqual(exports['supportOriginal']['requires'], 'supportAccess')
        self.assertEqual(len(exports['supportOriginal']['rows']), 3)
        historic = read('scenarios/chapter-47/fixtures.json')['settings']
        self.assertFalse(historic['orderOwnershipCheck'])
        self.assertTrue(historic['supportOriginalProtected'])
        self.assertFalse(historic['publicExportCopy'])

    def test_objects_and_checkpoints_reference_only_previous_awards(self):
        objects = read('content/es/campaign/objects.json')
        by_id = {o['id']: o for o in objects}
        self.assertEqual(len(by_id), 50)
        for n, c in enumerate(self.chapters, 1):
            o = by_id[c['nextNarrativeArtifact']['id']]
            self.assertEqual(o['originChapter'], c['id'])
            self.assertEqual(o['evidenceId'], c['evidenceRequirements']['id'])
            for dep in c['checkpointPolicy']['requiredArtifacts']:
                self.assertLess(int(by_id[dep]['originChapter'][3:]), n)

    def test_glossary_introduction_references_exist(self):
        terms = read('content/es/glossary/terms.json')
        self.assertEqual(len({t['id'] for t in terms}), len(terms))
        for term in terms:
            self.assertIn(term['introducedIn'], self.by_id)
            self.assertTrue(term['definition'])
            self.assertTrue(term['example'])

    def test_proposed_hosts_separate_classroom_cookie(self):
        topology = read('config/topology.json')
        origins = topology['origins']
        self.assertNotEqual(urlsplit(origins['classroom']).hostname, urlsplit(origins['storefront']).hostname)
        self.assertEqual(urlsplit(origins['storefront']).hostname, urlsplit(origins['auxiliary']).hostname)
        self.assertNotEqual(urlsplit(origins['storefront']).port, urlsplit(origins['auxiliary']).port)
        self.assertTrue(all(p['bind'] == '127.0.0.1' for p in topology['publishedPorts']))
        self.assertIsNone(topology['cookies']['classroom']['domain'])
        self.assertIsNone(topology['cookies']['storefront']['domain'])
        self.assertFalse(topology['externalRequestsAllowed'])

    def test_runtime_status_is_limited_to_first_four_acts_and_has_evidence(self):
        report = read('reports/browser-validation.json')
        self.assertTrue(report['passed'])
        self.assertTrue(read('reports/browser-act-two-validation.json')['passed'])
        self.assertTrue(read('reports/browser-act-three-validation.json')['passed'])
        self.assertTrue(read('reports/browser-act-four-validation.json')['passed'])
        for n, c in enumerate(self.chapters, 1):
            self.assertEqual(c['implementation'], {'designed': True, 'contentWritten': True,
                'functionalScenario': n <= 20, 'validatorTested': n <= 20, 'fullFlowVerified': n <= 20})
            plan = read(f'scenarios/chapter-{n:02d}/plan.json')
            self.assertEqual(plan['implementation'], 'functional' if n <= 20 else 'not-implemented')
            self.assertEqual(plan['successValidator']['execution'], 'tested-integration-and-chromium' if n <= 20 else 'pending')
            if n <= 20:
                self.assertEqual(c['verificationScope']['browser'], 'Chromium')
                self.assertFalse(c['verificationScope']['beginnerHumanTest'])

    def test_local_markdown_links_resolve(self):
        paths = [ROOT / 'README.md', *(ROOT / 'docs').glob('*.md')]
        for path in paths:
            if path.name == 'ESPECIFICACION-ORIGINAL.md':
                continue
            for target in re.findall(r'\]\(([^)]+)\)', path.read_text()):
                if '://' not in target and not target.startswith('#'):
                    self.assertTrue((path.parent / target.split('#')[0]).exists(), (path.name, target))


class DesignMechanismProbes(unittest.TestCase):
    """Sonda de la consulta propuesta; no sustituye a Store API ni sus pruebas."""
    def test_sql_pair_matches_planned_results_and_parameterization_preserves_lookup(self):
        fixtures = read('content/es/campaign/fixtures.json')
        with sqlite3.connect(':memory:') as db:
            db.execute('CREATE TABLE products(id INTEGER, name TEXT, searchKey TEXT)')
            db.executemany('INSERT INTO products VALUES(?,?,?)',
                           [(p['id'], p['name'], p['searchKey']) for p in fixtures['products']])
            search = fixtures['search']
            vulnerable = lambda q: db.execute(search['vulnerableSQL'].replace('${q}', q)).fetchall()
            self.assertEqual(len(vulnerable(search['trueInput'])), 6)
            self.assertEqual(vulnerable(search['falseInput']), [])
            for entry in [search['trueInput'], search['falseInput']]:
                self.assertEqual(db.execute(search['correctedSQL'], (entry,)).fetchall(), [])
            self.assertEqual(db.execute(search['correctedSQL'], ('pera',)).fetchone()[0], 2)


if __name__ == '__main__':
    unittest.main()
