const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8')
  .replace('/* ---------- boot ---------- */','window.__C = { CHORD_TYPES, chordShapes, chordFingers, chordCanMove, chordUnique, vNotes, vBox, TUNE, S, P, EX, exOpen };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(),'fretlab-chords.html'); fs.writeFileSync(tmp,source);
(async()=>{
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}}), errors = [];
    page.on('pageerror',e=>errors.push(e.message)); await page.goto('file://'+tmp+'#voicings');
    assert.equal(await page.locator('#chordRoot button').count(),12);
    assert.equal(await page.locator('#chordType option').count(),28);
    assert.ok(await page.locator('#chordGrid .chord-card').count()>0);
    assert.equal(await page.locator('.chord-card').first().locator('.chord-fret-label').allTextContents().then(t=>t.join(' ')), '× 3 2 0 1 0', 'the familiar open C comes first');
    await page.selectOption('#chordLabels','note');
    assert.deepEqual(await page.locator('.chord-card').first().locator('.chord-dot-label').allTextContents(),['C','E','C']);
    await page.selectOption('#chordLabels','finger');
    assert.deepEqual(await page.locator('.chord-card').first().locator('.chord-dot-label').allTextContents(),['3','2','1']);
    await page.click('#chordGroup [data-group="movable"]');
    const beforeMore = await page.locator('#chordGrid .chord-card').count();
    await page.click('#chordMore'); assert.ok(await page.locator('#chordGrid .chord-card').count()>beforeMore);
    await page.selectOption('#chordKind','triads');
    assert.ok(await page.locator('#chordGrid .chord-card').count()>0);
    await page.selectOption('#chordBass','inversion');
    assert.ok((await page.locator('.chord-card-heading>b').allTextContents()).every(n=>n.includes('/')));
    await page.selectOption('#chordKind','shell');
    assert.equal(await page.locator('#chordGrid .chord-card').count(),0);
    await page.click('#chordReset');
    await page.selectOption('#chordType','7'); await page.selectOption('#chordKind','shell');
    assert.ok(await page.locator('#chordGrid .chord-card').count()>0);
    assert.ok((await page.locator('.chord-caption').allTextContents()).every(t=>t.includes('5th omitted')));
    await page.selectOption('#chordType','major'); await page.selectOption('#chordKind','barre');
    assert.ok(await page.locator('.chord-barre').count()>0);
    const result = await page.evaluate(()=>{
      const {CHORD_TYPES,chordShapes,TUNE,vNotes} = window.__C, failures = [];
      let shapes = 0, combinations = 0;
      const check = (ok,msg)=>{ if(!ok && failures.length<30) failures.push(msg); };
      for (const tuning of Object.keys(TUNE)) for (const type of CHORD_TYPES) for (let root=0;root<12;root++) {
        if (tuning !== 'std' && !['major','minor','7'].includes(type.id)) continue;
        const list = chordShapes(root,type.id,tuning); combinations++;
        check(list.length>0,`${type.id} root ${root} ${tuning}: no shapes`);
        check(new Set(list.map(s=>s.move.f.join(','))).size === list.length,'duplicate grips');
        for (const s of list) {
          shapes++;
          const m = s.move, notes = vNotes(m,tuning), pcs = notes.map(n=>(n.midi-root+120)%12), required = type.iv.filter(i=>!(type.omit5 && i===7));
          check(notes.every(n=>type.iv.includes((n.midi-root+120)%12)),'non-chord tone');
          check(required.every(i=>pcs.includes(i)),'missing essential chord tone');
          check(!!s.missing5 === !!(type.omit5 && !pcs.includes(7)),'fifth omission label');
          check(notes[0].midi%12 === s.bass,'bass does not match sounding pitches');
          check(s.high<=20 && s.high-s.low<=3,'fret span');
          check(notes.every(n=>n.f===0 ? n.fg===0 : n.fg>=1 && n.fg<=4),'invalid finger assignment');
          check(notes.every(n=>n.lab === type.roles[type.iv.indexOf((n.midi-root+120)%12)]),'degree label');
          for (let finger=1;finger<=4;finger++) {
            const held = m.f.map((f,i)=>m.fingers[i]===finger ? {f,i} : null).filter(Boolean);
            if (held.length<2) continue;
            check(new Set(held.map(n=>n.f)).size===1,'one finger assigned different frets');
            const a=held[0].i, b=held[held.length-1].i, f=held[0].f;
            check(m.f.slice(a,b+1).every(n=>n==null || n>=f),'barre crosses an open/lower note');
            check(m.barres.some(([x,y,z])=>x===a && y===b && z===f),'missing barre');
          }
        }
      }
      const known = [[0,'major',[null,3,2,0,1,0]],[9,'minor',[null,0,2,2,1,0]],[7,'major',[3,2,0,0,0,3]],[4,'major',[0,2,2,1,0,0]],[2,'major',[null,null,0,2,3,2]],[5,'major',[1,3,3,2,1,1]],[0,'major',[null,3,5,5,5,3]]];
      known.forEach(([root,type,f])=>check(chordShapes(root,type).some(s=>s.move.f.join(',')===f.join(',')),'missing familiar '+root+' '+type+' '+f.join(',')));
      const c=window.__C;
      const aOpen=c.chordShapes(9,'major').find(s=>s.move.f.join(',')===[null,0,2,2,2,0].join(','));
      check(aOpen && c.chordCanMove(aOpen),'open A major is a transferable form');
      check(c.chordUnique(c.chordShapes(9,'major').filter(c.chordCanMove)).includes(aOpen),'open A major survives deduplication among movable shapes');
      const dOpen=c.chordShapes(2,'major').find(s=>s.move.f.join(',')===[null,null,0,2,3,2].join(','));
      check(c.chordUnique(c.chordShapes(2,'major').filter(s=>s.open)).includes(dOpen),'the open D grip is not hidden by a duplicate fretted bass');
      const cOpen=c.chordUnique(c.chordShapes(0,'major').filter(s=>s.open));
      const csOpen=c.chordUnique(c.chordShapes(1,'major').filter(s=>s.open));
      check(cOpen.length>0 && csOpen.length===0,'open shapes are specific to the root, not forced transpositions');
      check(!cOpen.some(s=>s.move.f.join(',')===[null,3,2,0,1,null].join(',')),'redundant optional-open-string muting is collapsed');
      return {failures,shapes,combinations};
    });
    assert.deepEqual(result.failures,[]);
    await page.selectOption('#chordKind','all');
    await page.selectOption('#chordPosition','16-20');
    assert.ok(await page.locator('.chord-card').count()>0,'upper-neck shapes are directly accessible');
    assert.ok((await page.locator('.chord-card-heading>span').allTextContents()).every(t=>/Frets (16|17|18|19|20)/.test(t)));
    await page.selectOption('#chordPosition','all');
    const mirrored = await page.evaluate(()=>{const c=window.__C;c.S.settings.lefty=true;const html=c.vBox(c.chordShapes(0,'major')[0].move,'std',true,'finger');c.S.settings.lefty=false;const svg=new DOMParser().parseFromString(html,'image/svg+xml');return [...svg.querySelectorAll('.chord-fret-label')].map(n=>+n.getAttribute('x'));});
    assert.ok(mirrored[0]>mirrored[5],'left-handed diagrams mirror their strings and fret labels');
    await page.selectOption('#chordKind','all');
    await page.click('#chordGroup [data-group="open"]');
    await page.selectOption('#chordTuning','dadgad');
    await page.click('#chordRoot [data-root="2"]');
    await page.selectOption('#chordType','sus4');
    assert.ok(await page.locator('.chord-open').count()>=6,'open DADGAD sus4 is represented');
    for (const width of [1280,1920,390]) {
      await page.setViewportSize({width,height:960});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'reference fits '+width);
    }
    assert.deepEqual(errors,[]);
    console.log(`${result.combinations} chord/root/tuning combinations, ${result.shapes} verified grips; reference filters, labels, barres, familiar shapes, and layouts\nOK`);
  } finally { await browser.close();fs.unlinkSync(tmp); }
})().catch(e=>{console.error(e);process.exitCode=1});
