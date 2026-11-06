const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8')
  .replace('/* ---------- boot ---------- */',`const tabGrips=[],renderGrip=drawTabGrip;drawTabGrip=(g,move,x,color)=>{const fingers=[],fill=g.fillText;g.fillText=function(text,...args){if(this.font.startsWith('600 7px'))fingers.push(String(text));return fill.call(this,text,...args);};tabGrips.push({move,x,fingers,alpha:g.globalAlpha});try{return renderGrip(g,move,x,color);}finally{g.fillText=fill;}};window.__C = { CHORD_GRIPS, CHORD_QUALITIES, CHORD_GENRES, chordCatalog, vNotes, vBox, TUNE, S, P, EX, AU, exOpen, exSetSelection, exSeek, exStart, exStop, exSched, exSync, exWithGrips, exDraw, innerMoves, drawTabGrip, tabGrips };\n/* ---------- boot ---------- */`);
const tmp = path.join(os.tmpdir(),'fretlab-chords.html');fs.writeFileSync(tmp,source);
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}), errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+tmp+'#voicings');
  assert.equal(await page.locator('#chordRoot option').count(),13);
  assert.equal(await page.locator('#chordType, #chordKind, #chordBass, #chordPosition, #chordTuning, #chordMore').count(),0,'the generated-catalog controls are removed');
  assert.equal(await page.locator('.chord-card:visible').count(),8,'eight featured open-string colors are shown first');
  assert.equal(await page.locator('#chordExtras').getAttribute('open'),null);
  assert.equal((await page.locator('[data-grip="open-cmaj9"] .chord-fret-label').allTextContents()).join(' '),'× 3 2 4 3 0');
  await page.selectOption('#chordLabels','note');
  assert.deepEqual(await page.locator('[data-grip="open-cmaj9"] .chord-dot-label').allTextContents(),['C','E','B','D']);
  await page.selectOption('#chordRoot','0');
  assert.equal(await page.locator('.chord-card:visible').count(),2,'a root filter shows only the selected fixed open chords');
  await page.selectOption('#chordRoot','1');assert.match(await page.locator('#chordEmpty h3').textContent(),/No selected open/);
  await page.click('#chordReset');assert.equal(await page.locator('#chordRoot').inputValue(),'1','movable fallback keeps the root');
  assert.equal(await page.locator('.chord-card:visible').count(),8,'eight featured movable colors are shown first');
  await page.selectOption('#chordRoot','9');
  assert.equal((await page.locator('[data-grip="color-maj9"] .chord-fret-label').allTextContents()).join(' '),'× 12 11 13 12 ×','movable major 9 in A stays fully fretted');
  await page.selectOption('#chordGenre','emo');
  assert.ok(await page.locator('.chord-card:visible').count()>0);
  assert.ok((await page.locator('.chord-card:visible .chord-tags').allTextContents()).every(t=>t.includes('Midwest emo')));
  await page.click('#chordGroup [data-group="open"]');await page.selectOption('#chordRoot','2');await page.selectOption('#chordGenre','jazz');
  assert.equal(await page.locator('.chord-card:visible').count(),0);await page.click('#chordReset');
  assert.equal(await page.locator('.chord-card:visible').count(),2,'clearing a genre keeps the open root filter');
  await page.selectOption('#chordRoot','all');await page.click('#chordExtrasSummary');assert.equal(await page.locator('.chord-card:visible').count(),12,'only four additional open colors can be expanded');
  const result=await page.evaluate(()=>{
   const {CHORD_GRIPS,CHORD_QUALITIES,CHORD_GENRES,chordCatalog,vNotes,TUNE}=window.__C,failures=[];let checked=0;
   const check=(ok,msg)=>{if(!ok)failures.push(msg);};
   check(CHORD_GRIPS.filter(g=>g.group==='open').length===12,'12 authored open grips');
   check(CHORD_GRIPS.filter(g=>g.group==='movable').length===12,'12 authored movable forms');
   check(new Set(CHORD_GRIPS.map(g=>g.id)).size===24,'unique grip ids');
   check(chordCatalog('open',1).length===0,'open chords are not transposed into unsupported keys');
   for(const group of ['open','movable'])for(const root of group==='open'?[null]:Array.from({length:12},(_,i)=>i)){
    const shapes=chordCatalog(group,root);check(new Set(shapes.map(g=>g.move.f.join(','))).size===shapes.length,'duplicate grips '+group+' '+root);
    for(const g of shapes){
     checked++;const q=CHORD_QUALITIES[g.quality], m=g.move, notes=vNotes(m,'std'), intervals=notes.map(n=>(n.midi-g.root+120)%12);
     check(g.genres.length>0 && g.genres.every(id=>CHORD_GENRES[id]),g.id+': genre');
     check(!!g.use && g.use.length<150,g.id+': musical use');
     check(notes.every(n=>q.iv.includes((n.midi-g.root+120)%12)),g.id+': non-chord tone');
     check(q.iv.filter(i=>!(g.omit||[]).includes(i)).every(i=>intervals.includes(i)),g.id+': missing essential chord tone');
     check((g.omit||[]).every(i=>q.iv.includes(i)),g.id+': declared omissions');
     check(!!g.lesson && !!g.form,g.id+': musical context');
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
  const gripCoverage=await page.evaluate(()=>{
   const a=window.__C,failures=[];let count=0;
   for(const e of a.EX)for(const step of e.steps)for(let key=0;key<(e.keyed?12:1);key++){
    for(const event of a.exWithGrips(step.build(key).ev))if(event.grip){
     const g=event.grip;count++;
     if(g.f.length!==6 || g.f.some(f=>f!=null && (!Number.isInteger(f)||f<0)))failures.push(e.id+' invalid chord frets');
     if(g.fingers && (g.fingers.length!==6 || g.fingers.some(f=>!Number.isInteger(f)||f<0||f>4)))failures.push(e.id+' invalid chord fingers');
    }
   }
   return {count,failures:[...new Set(failures)]};
  });assert.ok(gripCoverage.count>1000);assert.deepEqual(gripCoverage.failures,[],'every generated grip has valid frets and fingers');
  const inference=await page.evaluate(()=>{
   const a=window.__C,ev=(t,n,chord)=>({t,d:1,n,chord}),n=(s,f)=>({s,f,fg:1}),failures=[],check=(ok,msg)=>{if(!ok)failures.push(msg);};
   const triads=a.exWithGrips([ev(0,[n(2,0),n(1,1),n(0,0)],'C'),ev(1,[n(2,0)],'C'),ev(2,[n(2,5),n(1,5),n(0,3)],'C'),ev(3,[n(0,3)],'C')]);
   check(triads[0].grip.f.join()==triads[1].grip.f.join() && triads[2].grip.f.join()==triads[3].grip.f.join() && triads[0].grip.f.join()!=triads[2].grip.f.join(),'same-name triad inversions remain distinct');
   check(a.exWithGrips([ev(0,[n(0,3)],'C'),ev(1,[n(0,5)],'C'),ev(2,[n(1,3)],'C')]).every(e=>!e.grip),'conflicting melodic frets do not invent a grip');
   check(!a.exWithGrips([ev(0,[n(0,1),n(1,10)],'C')])[0].grip,'unreasonable inferred stretches are omitted');
   const unknown=a.exWithGrips([ev(0,[n(0,3),n(1,3)])])[0].grip;
   check(unknown.name==='Fretting shape' && !('root' in unknown),'unnamed dyads do not invent a chord identity');
   a.snapshot=()=>{a.tabGrips.length=0;a.exDraw(a.P.viewPos);return a.tabGrips.map(d=>({name:d.move.name,frets:d.move.f.map(f=>f==null?'×':String(f)),x:d.x,fingers:d.fingers,alpha:d.alpha}));};
   return failures;
  });assert.deepEqual(inference,[]);
  await page.evaluate(()=>window.__C.exOpen('adv_inner',1));await page.waitForFunction(()=>document.getElementById('pCanvas').getAttribute('aria-label').includes('Cmaj9.'));
  assert.equal(await page.locator('#pCanvas').evaluate(n=>n.classList.contains('has-chords')),true);
  let drawn=await page.evaluate(()=>window.__C.snapshot());
  assert.deepEqual(drawn.find(d=>d.name==='Cmaj9').frets,['×','3','2','4','3','×']);assert.equal(drawn.filter(d=>d.name==='Cmaj9').length,1,'one tiny grip per chord instead of one per arpeggio note');
  await page.locator('#pScroll').evaluate(el=>{el.value='0.5';el.dispatchEvent(new Event('input',{bubbles:true}));});
  drawn=await page.evaluate(()=>window.__C.snapshot());assert.equal(drawn.find(d=>d.name==='Cmaj9').alpha,1,'the current chord diagram stays clear throughout its arpeggio');assert.deepEqual(drawn.find(d=>d.name==='Cmaj9').frets,['×','3','2','4','3','×'],'arpeggio notes keep their full underlying grip');
  await page.locator('#pScroll').evaluate(el=>{el.value='3.5';el.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.ok((await page.evaluate(()=>window.__C.snapshot())).some(d=>d.name==='Cmaj9' && d.x>=24 && d.alpha===1),'the current chord stays available after its original marker scrolls away');
  await page.locator('#pScroll').evaluate(el=>{el.value='4';el.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.deepEqual((await page.evaluate(()=>window.__C.snapshot())).find(d=>d.name==='C6/9').frets,['×','3','2','2','3','×']);
  await page.uncheck('#pFingers');assert.ok((await page.evaluate(()=>window.__C.snapshot())).every(d=>!d.fingers.length),'finger toggle hides tiny finger annotations');
  await page.check('#pFingers');assert.ok((await page.evaluate(()=>window.__C.snapshot())).some(d=>d.fingers.length>0));
  await page.selectOption('#pKey','5');await page.waitForFunction(()=>document.getElementById('pCanvas').getAttribute('aria-label').includes('Fmaj9.'));
  assert.deepEqual((await page.evaluate(()=>window.__C.snapshot())).find(d=>d.name==='Fmaj9').frets,['×','8','7','9','8','×'],'manual keys transpose chord boxes');
  await page.evaluate(()=>window.__C.exSetSelection([4,8]));await page.waitForFunction(()=>document.getElementById('pCanvas').getAttribute('aria-label').includes('F6/9.'));
  assert.deepEqual((await page.evaluate(()=>window.__C.snapshot()))[0].frets,['×','8','7','7','8','×'],'section practice retains the authored grip');
  const geometry=await page.evaluate(()=>{
   const a=window.__C,canvas=document.createElement('canvas'),g=canvas.getContext('2d'),circles=[],arc=g.arc.bind(g),move=a.innerMoves(0)[0];
   g.arc=(x,y,r,...rest)=>{circles.push({x,y,r});arc(x,y,r,...rest);};
   a.S.settings.lefty=false;a.drawTabGrip(g,move,70,'#000');const normal=circles.splice(0);
   a.S.settings.lefty=true;a.drawTabGrip(g,move,70,'#000');const left=circles.splice(0);a.S.settings.lefty=false;
   return {normal,left};
  });
  assert.ok(geometry.normal[0].x<geometry.normal.at(-1).x && geometry.left[0].x>geometry.left.at(-1).x,'tiny diagrams mirror for left-handed display');
  assert.ok(Math.max(...geometry.normal.map(c=>c.x))-Math.min(...geometry.normal.map(c=>c.x))<=30 && geometry.normal.every(c=>c.y+c.r<80),'sheet-music-size boxes occupy only the header row');
  await page.evaluate(()=>window.__C.exOpen('v_shape_a',1));
  const authored=await page.evaluate(()=>{const a=window.__C,g=a.P.ev[0].grip;return {expected:g.f.map(f=>f==null?'×':String(f)),drawn:a.snapshot()[0].frets,barres:(g.barres||(g.barre?[g.barre]:[])).length};});
  assert.deepEqual(authored.drawn,authored.expected,'authored voicings are preserved');
  const drawnBarres=await page.evaluate(()=>{const a=window.__C,g=document.createElement('canvas').getContext('2d'),stroke=g.stroke.bind(g);let n=0;g.stroke=function(){if(this.lineWidth===4&&this.lineCap==='round')n++;return stroke();};a.drawTabGrip(g,a.P.ev[0].grip,70,'#000');return n;});
  assert.equal(drawnBarres,authored.barres,'tiny diagrams retain authored barres');
  await page.evaluate(()=>window.__C.exOpen('v_emo_facgce',1));await page.waitForFunction(()=>document.getElementById('pCanvas').getAttribute('aria-label').includes('FACGCE tuning'));
  const loop=await page.evaluate(()=>{
   const a=window.__C;a.exOpen('adv_inner',1);Object.assign(a.S.ui.exopts,{count:false,loop:true,keycycle:true});a.P.bpm=120;a.exStart();clearInterval(a.P.timer);cancelAnimationFrame(a.P.frame);
   const old=a.P.keyPc,boundary=a.P.startT+a.P.L*60/a.P.bpm;let now=boundary-.12;Object.defineProperty(a.AU.ctx,'currentTime',{configurable:true,get:()=>now});a.exSched();now=boundary+.001;a.exSync();a.exSeek(0);
   const result={old,key:a.P.keyPc,expected:a.P.ev[0].grip.f.map(f=>f==null?'×':String(f)),drawn:a.snapshot()[0].frets};a.exStop();delete a.AU.ctx.currentTime;return result;
  });
  assert.equal(loop.key,(loop.old+5)%12);assert.deepEqual(loop.drawn,loop.expected,'automatic key loops update chord boxes');
  await page.evaluate(()=>window.__C.exOpen('pentall',0));await page.waitForFunction(()=>!document.getElementById('pCanvas').classList.contains('has-chords'));
  assert.equal(await page.locator('#pCanvas').evaluate(n=>n.clientHeight),250,'single-note scales omit the chord row');
  await page.evaluate(()=>window.__C.exOpen('adv_inner',1));await page.waitForFunction(()=>document.getElementById('pCanvas').classList.contains('has-chords'));
  assert.equal(await page.locator('#pCanvas').evaluate(n=>n.clientHeight),308,'the diagram row reserves space above the tab');
  for(const width of [1280,1920,390]){await page.setViewportSize({width,height:960});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'fits '+width);}
  assert.deepEqual(errors,[]);console.log(`24 discovery voicings, ${result.checked} open/transposed instances: pitches, fingers, barres, exclusive groups, genres, small default sets, tiny player chord boxes, key/section/tuning updates, finger visibility and layouts\nOK`);
 }finally{await browser.close();fs.unlinkSync(tmp);}
})().catch(e=>{console.error(e);process.exitCode=1});
