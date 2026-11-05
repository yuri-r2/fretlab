// Essentials: the curated list exists, is surfaced first everywhere, and drives the default practice focus.
// Run: node tests/essentials.js   (needs playwright, see validate.js)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const os = require('os');
const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8')
  .replace('/* ---------- boot ---------- */', 'window.__T = { EX, ESSENTIALS, focusEx, autoBlocks, exDueList, ROUTINES, exStat, save: () => save() };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(), 'fretlab-essentials.html'); fs.writeFileSync(tmp, src);
const fail = []; const ok = (c, m) => { if (!c) fail.push(m); };
(async () => {
  const b = await chromium.launch(); const errs = [];
  const p = await b.newPage({ viewport: { width: 390, height: 900 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + tmp + '?a#library'); await p.waitForTimeout(300);
  const d = await p.evaluate(() => { const { EX, ESSENTIALS, ROUTINES } = window.__T; return {
    ids: ESSENTIALS.map(x => x.id), missing: ESSENTIALS.filter(x => !EX.some(e => e.id === x.id)).map(x => x.id), why: ESSENTIALS.every(x => x.why && x.why.length < 130),
    routineIds: Object.values(ROUTINES).flatMap(r => r.blocks.map(b => b.ex)).filter(x => typeof x === 'string'),
    focus: window.__T.focusEx()?.id, pills: document.querySelectorAll('#essCard .esspill').length, next: document.querySelector('#essCard .esspill.next')?.textContent }; });
  ok(d.ids.length === 12 && new Set(d.ids).size === 12, 'twelve unique essentials');
  ok(!d.missing.length, 'essentials missing from EX: ' + d.missing);
  ok(d.why, 'every essential has a short reason');
  ok(d.routineIds.every(id => d.ids.includes(id) || ['legato'].includes(id)), 'fixed routines use only essentials (plus the legato warm-up): ' + d.routineIds.filter(id => !d.ids.includes(id)));
  ok(d.focus === d.ids[0], 'fresh focus is essential 1, got ' + d.focus);
  ok(d.pills === 12 && d.next === '1', 'library card shows 12 steps with #1 next');
  // complete essential 1: focus and card move on
  const d2 = await p.evaluate(() => { const { EX, ESSENTIALS, exStat } = window.__T, e = EX.find(x => x.id === ESSENTIALS[0].id), st = exStat(e.id); e.steps.forEach((_, i) => st.done[i] = true); window.__T.save(); return window.__T.focusEx()?.id; });
  ok(d2 === d.ids[1], 'focus moves to essential 2 after essential 1 is complete, got ' + d2);
  await p.click('#libraryNav [data-tab="exercises"], [data-go="exercises"]'); await p.waitForTimeout(250);
  const ex = await p.evaluate(() => ({ first: [...document.querySelectorAll('#exList > .stack:first-child .excard')].map(c => c.dataset.ex), more: !!document.querySelector('#exList details#exMore'), moreOpen: document.querySelector('#exMore')?.open, tags: document.querySelectorAll('#exList > .stack:first-child .tag.ess').length, sum: document.querySelector('#exList .label + .small')?.textContent }));
  ok(ex.first.join() === d.ids.join(), 'Exercises lists the essentials first, in order');
  ok(ex.more && !ex.moreOpen, 'other exercises are tucked under a closed "All other exercises"');
  ok(ex.tags === 12, 'each essential card is tagged');
  ok(/1 of 12/.test(ex.sum || ''), 'Exercises shows essentials progress: ' + ex.sum);
  await p.fill('#exSearch', 'sweep'); await p.waitForTimeout(250);
  ok(await p.evaluate(() => !!document.querySelector('#exList [data-ex="sweeps"]')), 'search still finds non-essential exercises');
  await p.fill('#exSearch', ''); await p.waitForTimeout(150);
  await p.click('#exList [data-ex="rh_pend"]'); await p.waitForTimeout(250);
  ok(/^Essential 3 of 12/.test(await p.textContent('#pCat')), 'player shows the essential number');
  ok((await p.textContent('#pBack')) === '← All exercises' && (await p.evaluate(() => location.hash)) === '#rhythm', 'rhythm essential opens in Rhythm with a way back to Exercises');
  await p.click('#pBack'); await p.waitForTimeout(200);
  ok((await p.evaluate(() => location.hash)) === '#exercises', 'back returns to Exercises');
  await p.goto('file://' + tmp + '?b#rhythm'); await p.waitForTimeout(300);
  ok((await p.evaluate(() => [...document.querySelectorAll('#rEx .label')].map(x => x.textContent).join())) === 'Essentials,More rhythm', 'Rhythm splits essentials from the rest');
  await p.goto('file://' + tmp + '?c#today'); await p.waitForTimeout(300);
  const t = await p.evaluate(() => ({ up: [...document.querySelectorAll('#upNext [data-openex]')].map(x => x.dataset.openex), grp: [...document.querySelectorAll('#rtFocus optgroup')].map(g => g.label).join() }));
  ok(t.up[0] === d.ids[1] && t.up.every(id => d.ids.includes(id)), 'Today lists open essentials up next: ' + t.up);
  ok(t.grp === 'Essentials,Everything else', 'focus picker groups essentials first');
  await p.goto('file://' + tmp + '?d#voicings'); await p.waitForTimeout(300);
  ok((await p.locator('#chordRoot button').count()) === 12 && (await p.locator('#chordGrid .chord-card').count()) > 0, 'Chord Shapes opens the independent root-based reference');
  await b.close();
  if (errs.length) fail.push('page errors: ' + errs.join(' | '));
  if (fail.length) { console.log('FAIL\n' + fail.join('\n')); process.exit(1); }
  console.log('12 essentials surfaced in Library, Exercises, Rhythm, Today and the player; focus follows the order\nOK');
})();
