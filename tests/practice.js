const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8')
  .replace('/* ---------- boot ---------- */', 'window.__T = { EX, VOICINGS, vCurrent, vNotes, vConstraint, exStat, exDueList, exOpen, autoBlocks, routineTick, routineNext, exFeedback, exListen, switchTab, S, P, R, LN, dayKey, dayAdd };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(), 'fretlab-practice.html');
fs.writeFileSync(tmp, source);
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + tmp);
    const start = await page.locator('#rtStart').boundingBox();
    assert.ok(start && start.y + start.height <= 844, 'session action is visible without scrolling on a phone');
    await page.click('.tab[data-tab="learn"]');
    await page.click('[data-unit="u4"]');
    await page.click('#lnNext');
    const lesson = await page.locator('#lnCardTitle').textContent();
    await page.click('#lnBack');
    await page.click('[data-unit="u4"]');
    assert.equal(await page.locator('#lnCardTitle').textContent(), lesson, 'lesson resumes at the last card');
    await page.click('.tab[data-tab="library"]');
    await page.click('#view-library [data-go="voicings"]');
    await page.selectOption('#chordRoot', '8');
    await page.selectOption('#chordGenre', 'alternative');
    await page.selectOption('#chordLabels', 'degree');
    await page.click('.tab[data-tab="library"]');
    await page.click('#view-library [data-go="exercises"]');
    await page.fill('#exSearch', 'One major triad, three inversions');
    await page.click('[data-ex="v_shape_triads"]');
    await page.selectOption('#pKey', '8');
    const tempo = Number(await page.locator('#pBpm').textContent());
    await page.click('#miniPlus');
    assert.equal(Number(await page.locator('#pBpm').textContent()), tempo + 1, 'header changes exercise tempo');
    await page.click('#pBack');
    assert.equal(await page.locator('#exLib').isVisible(), true, 'return preserves the exercise catalog');
    assert.equal(await page.locator('#exSearch').inputValue(), 'One major triad, three inversions');
    await page.click('.tab[data-tab="library"]');
    await page.click('#view-library [data-go="voicings"]');
    assert.equal(await page.locator('#chordGenre').inputValue(), 'alternative', 'reference keeps its genre');
    assert.equal(await page.locator('#chordRoot').inputValue(), '8', 'reference keeps its root');
    const failures = await page.evaluate(() => {
      const { EX, VOICINGS, vCurrent, vNotes, vConstraint, exStat, exDueList, exOpen, autoBlocks, routineTick, routineNext, exFeedback, exListen, switchTab, S, P, R, dayKey, dayAdd } = window.__T;
      const failures = [], check = (ok, message) => { if (!ok) failures.push(message); };
      const formulas = { '': [0,4,7], m: [0,3,7], sus2: [0,2,7], sus4: [0,5,7], 'maj7 (no 5th)': [0,4,11], 'm7 (no 5th)': [0,3,10], '7 (no 5th)': [0,4,10], '6 (no 5th)': [0,4,9] };
      for (const v of VOICINGS.filter(v => v.keyed)) for (let key = 0; key < 12; key++) for (const m of vCurrent(v, key).moves) {
        const notes = vNotes(m, v.tune), actual = [...new Set(notes.map(n => (n.midi - m.root + 120) % 12))].sort((a,b) => a-b);
        const expected = formulas[m.quality].slice().sort((a,b) => a-b);
        check(JSON.stringify(actual) === JSON.stringify(expected), `${v.id} key ${key}: chord formula`);
        check(notes.every(n => n.f >= 0 && n.f <= 20), `${v.id} key ${key}: fret range`);
        if (m.bass != null) check(notes[0].midi % 12 === (m.bass + key) % 12, `${v.id} key ${key}: inversion bass`);
        check(!vConstraint(v).includes('open string'), `${v.id}: incompatible drone constraint`);
      }
      check(vNotes(VOICINGS.find(v => v.id === 'rock_hendrix').moves[0], 'std').some(n => n.lab === '#9'), 'Hendrix chord labels the #9');
      const id = 'triads'; S.ex[id] = { key: 0, done: [true], best: {0:90}, bpm: {0:90}, last: dayKey() };
      check(exStat(id).done[0], 'legacy progress remains in its saved key');
      exStat(id).key = 2;
      check(!exStat(id).done[0] && !exStat(id).best[0], 'new key does not inherit completion or tempo');
      exStat(id).done[1] = true;
      exStat(id).key = 0;
      check(exStat(id).done[0] && !exStat(id).done[1], 'switching back restores the original key');
      exStat(id).rev = {0:{k:0,due:dayAdd(-1)}};
      const due = exDueList().find(x => x.e.id === id && x.i === 0);
      check(due && due.key === 0, 'review retains its key');
      S.ui.focusEx = 'v_shape_shells';
      for (const minutes of [5,10,15,20,30,45,90]) {
        S.ui.planMinutes = minutes; const blocks = autoBlocks();
        check(blocks.reduce((n,b) => n+b.m,0) === minutes, `plan fits ${minutes} minutes`);
        check(blocks.every(b => b.m > 0), `positive blocks at ${minutes} minutes`);
        check(blocks.some(b => b.ex === S.ui.focusEx && b.t.startsWith('Focus:')), 'plan honors chord focus');
        check(blocks[blocks.length-1].ex === S.ui.focusEx, 'application uses the focus material');
      }
      exOpen('v_shape_shells', 3); P.bpm = 70; exFeedback('clean');
      check(P.bpm === 70 && exStat('v_shape_shells').done[3], 'creative completion does not force a speed increase');
      switchTab('today'); R.key = 'auto'; R.blocks = [{tool:'today',m:1,t:'One',d:''},{tool:'today',m:1,t:'Two',d:''}]; R.idx = 0; R.rem = 1; R.running = true; R.paused = false; R.waiting = false;
      routineTick(); check(R.idx === 0 && R.waiting && R.rem === 0, 'timer waits at the block boundary');
      routineNext(); check(R.idx === 1 && !R.waiting, 'Next advances the block'); R.running = false;
      exStat(id).key = 0; exStat(id).rated = {}; exStat(id).prepared = {}; exStat(id).rev = {0:{k:0,due:dayAdd(-1)}};
      exOpen(id,0); exListen(); exFeedback('clean');
      check(exStat(id).rev[0].k === 0 && exStat(id).rev[0].due === dayAdd(1), 'listening before a review does not advance cold recall');
      return failures;
    });
    assert.deepEqual([...errors, ...failures], []);
    console.log('Lesson resume, return navigation, tempo, chord formulas in all keys, progress isolation, review preparation, plans and timer transitions: OK');
  } finally { await browser.close(); fs.unlinkSync(tmp); }
})().catch(e => { console.error(e); process.exitCode = 1; });
