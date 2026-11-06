const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8')
  .replace('/* ---------- boot ---------- */', 'window.__T = { EX, VOICINGS, vCurrent, vNotes, vConstraint, exStat, exDueList, exOpen, exSetSpot, autoBlocks, routineTick, routineNext, routineBlock, renderPill, exSeek, exFeedback, exListen, switchTab, S, P, R, LN, dayKey, dayAdd };\n/* ---------- boot ---------- */');
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
      const { EX, VOICINGS, vCurrent, vNotes, vConstraint, exStat, exDueList, exOpen, autoBlocks, routineTick, routineNext, routineBlock, renderPill, exSeek, exFeedback, exListen, switchTab, S, P, R, dayKey, dayAdd } = window.__T;
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
    await page.evaluate(()=>{
      const t=window.__T;t.R.running=false;t.exOpen('adv_inner',1);
      Object.assign(t.R,{key:'auto',blocks:[{tool:'exercises',ex:'adv_inner',step:1,m:4,t:'One inner voice',d:'Keep the outside still.'}],idx:0,rem:215,running:true,paused:true,waiting:false,activeEx:'adv_inner',player:null});
      t.P.bpm=74;t.exSeek(6);t.renderPill();t.switchTab('voicings');
    });
    assert.ok(await page.locator('#rpOpen').isVisible());await page.click('#rpOpen');
    let current=await page.evaluate(()=>{const {P,R}=window.__T;return {id:P.ex.id,step:P.step,pos:P.viewPos,bpm:P.bpm,rem:R.rem,paused:R.paused};});
    assert.deepEqual(current,{id:'adv_inner',step:1,pos:6,bpm:74,rem:215,paused:true},'Open block preserves the timer and practice position');
    await page.evaluate(()=>window.__T.exOpen('triads',0));await page.click('#rpOpen');
    assert.equal(await page.evaluate(()=>window.__T.P.ex.id),'adv_inner','Open block returns from a different exercise');
    assert.equal(await page.evaluate(()=>window.__T.P.viewPos),6,'returning restores the original position');
    await page.click('#pBack');await page.click('#rpOpen');
    assert.equal(await page.evaluate(()=>window.__T.P.viewPos),6,'closing the player retains the active block position');
    await page.click('.tab[data-tab="today"]');await page.click('#rtStart');
    assert.equal(await page.evaluate(()=>window.__T.P.ex.id),'adv_inner','Today opens the actual active exercise');
    assert.equal(await page.evaluate(()=>window.__T.R.rem),215,'opening from Today does not restart the block timer');
    for(const width of [1440,390]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'session bar fits '+width);}
    await page.evaluate(()=>window.__T.R.running=false);
    await page.setViewportSize({width:1440,height:1050});
    await page.evaluate(()=>{
      const t=window.__T;t.S.practice.spots=[];t.exStat('adv_inner').key=5;t.exOpen('adv_inner',1);t.exSetSpot('1-2');t.P.bpm=83;t.P.labels='note';t.exSeek(1.375);
    });
    await page.click('#pSaveSpot');await page.click('#pSaveSpot');
    assert.equal(await page.evaluate(()=>window.__T.S.practice.spots.length),1,'saving the same passage updates one spot');
    await page.evaluate(()=>{window.__T.P.bpm=85;window.__T.exSeek(2.375);});await page.click('#pSaveSpot');
    const saved=await page.evaluate(()=>window.__T.S.practice.spots[0]);
    assert.deepEqual([saved.id,saved.step,saved.key,saved.bpm,saved.spot,saved.pos,saved.labels],['adv_inner',1,5,85,[1,2],0,'note'],'a saved passage retains its exercise, key, range, tempo and labels');
    await page.click('#pSavedWrap summary');
    await page.locator('#pSavedSpots [data-spot-open]').waitFor();
    assert.equal(await page.locator('#pSavedSpots [data-spot-open]').count(),1);
    await page.click('.tab[data-tab="today"]');
    assert.match(await page.locator('#practiceResume').textContent(),/F major.*85 bpm/);
    await page.reload();await page.click('#practiceResumeOpen');
    current=await page.evaluate(()=>{const {P}=window.__T;return{id:P.ex.id,step:P.step,key:P.keyPc,bpm:P.bpm,spot:P.spot,pos:P.viewPos,labels:P.labels,running:P.running};});
    assert.deepEqual(current,{id:'adv_inner',step:1,key:5,bpm:85,spot:[1,2],pos:2.375,labels:'note',running:false},'Today resumes the exact paused practice context after a reload');
    await page.uncheck('#pCount');await page.click('#pPlay');await page.waitForTimeout(250);await page.reload();
    const interrupted=await page.evaluate(()=>window.__T.S.practice.resume);
    assert.ok(interrupted.pos>2.375 && interrupted.pos<4,'reloading during playback captures the current position');
    await page.click('.tab[data-tab="today"]');await page.click('#practiceResumeOpen');
    assert.equal(await page.evaluate(()=>window.__T.P.viewPos),interrupted.pos,'interrupted playback reopens paused at the captured position');
    await page.evaluate(()=>{const t=window.__T;t.exStat('adv_inner').key=0;t.exOpen('adv_inner',0);});
    await page.click('.tab[data-tab="library"]');await page.click('#savedPractice summary');
    await page.click('#savedPracticeList [data-spot-open]');
    current=await page.evaluate(()=>{const {P}=window.__T;return{step:P.step,key:P.keyPc,bpm:P.bpm,spot:P.spot,pos:P.viewPos,running:P.running};});
    assert.deepEqual(current,{step:1,key:5,bpm:85,spot:[1,2],pos:0,running:false},'saved spots reopen at the passage beginning without starting audio');
    for(const colorScheme of ['light','dark']){
      await page.emulateMedia({colorScheme});await page.screenshot({path:path.join(os.tmpdir(),'fretlab-practice-passages-'+colorScheme+'.png')});
    }
    await page.click('#pSkip');
    assert.equal(await page.locator('#savedPractice').isVisible(),false,'skipped exercises disappear from saved spots');
    await page.click('.tab[data-tab="today"]');
    assert.equal(await page.locator('#practiceResume').isVisible(),false,'skipped exercises disappear from Continue practicing');
    await page.click('.tab[data-tab="library"]');await page.click('#skippedExercises summary');
    await page.click('#skippedList [data-skipex="adv_inner"]');
    assert.equal(await page.locator('#savedPractice').isVisible(),true,'restoring an exercise keeps its saved spots');
    await page.locator('#savedPractice').evaluate(n=>n.open=true);await page.locator('#savedPracticeList [data-spot-remove]').click();
    assert.equal(await page.evaluate(()=>window.__T.S.practice.spots.length),0,'a saved spot can be removed without deleting exercise progress');
    for(const width of [1280,1920,390]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'saved practice fits '+width);}
    assert.deepEqual([...errors, ...failures], []);
    console.log('Lesson resume, navigation, chord formulas, per-key progress, reviews, plans, timer transitions, saved passages, exact reload resume and skip filtering: OK');
  } finally { await browser.close(); fs.unlinkSync(tmp); }
})().catch(e => { console.error(e); process.exitCode = 1; });
