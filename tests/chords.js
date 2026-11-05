const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8')
  .replace('/* ---------- boot ---------- */','window.__C = { CHORD_GRIPS, CHORD_QUALITIES, CHORD_GENRES, chordCatalog, vNotes, vBox, TUNE, S };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(),'fretlab-chords.html');fs.writeFileSync(tmp,source);
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}), errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+tmp+'#voicings');
  assert.equal(await page.locator('#chordRoot option').count(),13);
  assert.equal(await page.locator('#chordType, #chordKind, #chordBass, #chordPosition, #chordTuning, #chordMore').count(),0,'the generated-catalog controls are removed');
  assert.equal(await page.locator('.chord-card:visible').count(),8,'eight open essentials are shown first');
  assert.equal(await page.locator('#chordExtras').getAttribute('open'),null);
  assert.equal((await page.locator('[data-grip="open-c"] .chord-fret-label').allTextContents()).join(' '),'× 3 2 0 1 0');
  await page.selectOption('#chordLabels','note');
  assert.deepEqual(await page.locator('[data-grip="open-c"] .chord-dot-label').allTextContents(),['C','E','C']);
  await page.selectOption('#chordRoot','0');
  assert.equal(await page.locator('.chord-card:visible').count(),4,'a root filter shows only the selected fixed open chords');
  await page.selectOption('#chordRoot','1');assert.match(await page.locator('#chordEmpty h3').textContent(),/No selected open/);
  await page.click('#chordReset');assert.equal(await page.locator('#chordRoot').inputValue(),'1','movable fallback keeps the root');
  assert.equal(await page.locator('.chord-card:visible').count(),10,'ten movable workhorses are shown first');
  await page.selectOption('#chordRoot','9');
  assert.equal((await page.locator('[data-grip="barre-a-major"] .chord-fret-label').allTextContents()).join(' '),'× 12 14 14 14 12','A form in A is fretted, rather than duplicated as an open grip');
  await page.selectOption('#chordGenre','emo');
  assert.ok(await page.locator('.chord-card:visible').count()>0);
  assert.ok((await page.locator('.chord-card:visible .chord-tags').allTextContents()).every(t=>t.includes('Midwest emo')));
  await page.click('#chordGroup [data-group="open"]');await page.selectOption('#chordRoot','all');await page.selectOption('#chordGenre','metal');
  assert.equal(await page.locator('.chord-card:visible').count(),0);await page.click('#chordReset');
  assert.equal(await page.locator('.chord-card:visible').count(),8,'clearing a genre keeps the open view');
  await page.click('#chordExtrasSummary');assert.equal(await page.locator('.chord-card:visible').count(),24,'only sixteen additional open colors can be expanded');
  const result=await page.evaluate(()=>{
   const {CHORD_GRIPS,CHORD_QUALITIES,CHORD_GENRES,chordCatalog,vNotes,TUNE}=window.__C,failures=[];let checked=0;
   const check=(ok,msg)=>{if(!ok)failures.push(msg);};
   check(CHORD_GRIPS.filter(g=>g.group==='open').length===24,'24 authored open grips');
   check(CHORD_GRIPS.filter(g=>g.group==='movable').length===20,'20 authored movable forms');
   check(new Set(CHORD_GRIPS.map(g=>g.id)).size===44,'unique grip ids');
   check(chordCatalog('open',1).length===0,'open chords are not transposed into unsupported keys');
   for(const group of ['open','movable'])for(const root of group==='open'?[null]:Array.from({length:12},(_,i)=>i)){
    const shapes=chordCatalog(group,root);check(new Set(shapes.map(g=>g.move.f.join(','))).size===shapes.length,'duplicate grips '+group+' '+root);
    for(const g of shapes){
     checked++;const q=CHORD_QUALITIES[g.quality], m=g.move, notes=vNotes(m,'std'), intervals=notes.map(n=>(n.midi-g.root+120)%12);
     check(g.genres.length>0 && g.genres.every(id=>CHORD_GENRES[id]),g.id+': genre');
     check(!!g.use && g.use.length<150,g.id+': musical use');
     check(notes.every(n=>q.iv.includes((n.midi-g.root+120)%12)),g.id+': non-chord tone');
     check(q.iv.filter(i=>!(g.missing5 && i===7)).every(i=>intervals.includes(i)),g.id+': missing essential chord tone');
     check(!g.missing5 || g.id.startsWith('shell-') || ['dominant-sharp9','open-c7'].includes(g.id),g.id+': unexpected omission');
     check(group==='open'?m.f.includes(0):m.f.every(f=>f==null || f>0),g.id+': open/movable exclusivity');
     check(notes.every(n=>n.f>=0 && n.f<=20 && (n.f===0?n.fg===0:n.fg>=1 && n.fg<=4)),g.id+': fret/finger');
     check(m.f.every((f,i)=>f!=null || m.fingers[i]===0),g.id+': muted-string finger');
     check(notes.every(n=>n.lab===q.roles[q.iv.indexOf((n.midi-g.root+120)%12)]),g.id+': contextual degree');
     for(let finger=1;finger<=4;finger++){
      const held=m.f.map((f,i)=>m.fingers[i]===finger?{f,i}:null).filter(Boolean);if(held.length<2)continue;
      check(new Set(held.map(n=>n.f)).size===1,g.id+': finger on different frets');
      check(m.barres.some(([a,b,f])=>a===held[0].i && b===held.at(-1).i && f===held[0].f),g.id+': missing barre');
      check(m.f.slice(held[0].i,held.at(-1).i+1).every(f=>f==null || f>=held[0].f),g.id+': blocked barre');
     }
    }
   }
   const c=window.__C;c.S.settings.lefty=true;
   const svg=new DOMParser().parseFromString(c.vBox(chordCatalog('open',0)[0].move,'std',true,'finger'),'image/svg+xml');c.S.settings.lefty=false;
   check(+svg.querySelector('.chord-fret-label').getAttribute('x')>+svg.querySelectorAll('.chord-fret-label')[5].getAttribute('x'),'left-handed diagram');
   return {checked,failures};
  });
  assert.deepEqual(result.failures,[]);
  for(const width of [1280,1920,390]){await page.setViewportSize({width,height:960});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'fits '+width);}
  assert.deepEqual(errors,[]);console.log(`44 curated grips, ${result.checked} open/transposed instances: pitches, fingers, barres, exclusive groups, genres, small default sets and layouts\nOK`);
 }finally{await browser.close();fs.unlinkSync(tmp);}
})().catch(e=>{console.error(e);process.exitCode=1});
