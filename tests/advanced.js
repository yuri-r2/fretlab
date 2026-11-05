const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8').replace('/* ---------- boot ---------- */','window.__A = { S, EX, ADVANCED_STUDIES, ESSENTIALS, focusEx, exOpen, skipExercise, exStat, exDueList, P, AU, exForecast, exDraw, exStart, exStop, exSched, exSync, exPos, innerMoves, quartalMoves, vNotes };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(),'fretlab-advanced.html');fs.writeFileSync(tmp,source);
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+tmp+'#library');
  const result=await page.evaluate(()=>{
   const {S,EX,ADVANCED_STUDIES,ESSENTIALS,focusEx,exOpen,skipExercise,exStat,exDueList,innerMoves,quartalMoves,vNotes}=window.__A,failures=[];
   const check=(ok,msg)=>{if(!ok)failures.push(msg);};
   check(ADVANCED_STUDIES.length===5 && ADVANCED_STUDIES.every(e=>e.steps.length===4 && e.steps.at(-1).create),'five complete studies with a transfer task');
   check(ESSENTIALS.slice(0,4).every(x=>x.id.startsWith('adv_')),'the default path starts beyond the familiar shapes');
   check(focusEx().id==='adv_pedals','fresh focus is an original sound study');
   for(let key=0;key<12;key++){
    const moves=innerMoves(key),notes=moves.map(m=>vNotes(m,'std'));
    check(notes.every(n=>n[0].midi%12===key && (n.at(-1).midi-key+120)%12===2),'fixed outer voices '+key);
    for(let i=1;i<4;i++)check(notes[i].filter((n,j)=>n.midi!==notes[i-1][j].midi).length===1,'exactly one moving voice '+key+' '+i);
    const expected=[[5,10,3],[7,0,5],[9,2,7],[7,0,5]];
    quartalMoves(key).forEach((m,i)=>check(vNotes(m,'std').map(n=>(n.midi-key+120)%12).join()===expected[i].join(),'Dorian fourth-stack spelling '+key+' '+i));
   }
   const id=ESSENTIALS[0].id;exOpen(id,0);const before=JSON.stringify(exStat(id));skipExercise(id);
   check(!exStat(id).done.some(Boolean) && JSON.stringify(exStat(id))===before,'skipping does not manufacture completion or tempo records');
   check(focusEx().id===ESSENTIALS[1].id,'skipping advances the recommendation');
   check(!exDueList().some(x=>x.e.id===id),'skipped exercises are excluded from automatic reviews');
   skipExercise(id);check(focusEx().id===id && !exStat(id).done.some(Boolean),'undo restores the recommendation without marking it complete');
   return failures;
  });assert.deepEqual(result,[]);
  await page.click('#pSkip');assert.equal(await page.locator('#pSkip').textContent(),'Skipped · undo');await page.waitForTimeout(1600);await page.reload();
  assert.equal(await page.evaluate(()=>window.__A.S.exskip.includes('adv_pedals')),true,'skip survives reload');
  await page.evaluate(()=>{window.__A.exOpen('adv_pedals',0);window.__A.skipExercise('adv_pedals');});
  const transition=await page.evaluate(()=>{
   const {S,P,AU,exOpen,exStart,exStop,exForecast,exDraw,exPos,exSched,exSync}=window.__A,failures=[],check=(ok,msg)=>{if(!ok)failures.push(msg);};
   exOpen('triads',0);Object.assign(S.ui.exopts,{loop:true,count:false,keycycle:true,ladder:true});P.bpm=80;exStart();clearInterval(P.timer);cancelAnimationFrame(P.frame);
   let now=AU.ctx.currentTime;Object.defineProperty(AU.ctx,'currentTime',{configurable:true,get:()=>now});
   const old=P.keyPc,bus=P.bus,boundary=P.startT+P.L*60/P.bpm,next=exForecast()[0];
   check(next.data.keyPc===(old+5)%12 && next.bpm===84,'key and tempo preview match the next loop');
   now=boundary-P.bar*60/P.bpm;const pos=exPos(),cv=document.getElementById('pCanvas'),g=cv.getContext('2d'),draws=[],fill=g.fillText;
   g.fillText=function(t,x,y){draws.push({t:String(t),x,y});return fill.apply(this,arguments);};exDraw(pos);g.fillText=fill;
   check(P.loopQueue.length===0,'visual preparation begins before audio lookahead');
   check(!document.getElementById('pUpcoming').hidden && document.getElementById('pUpcomingWhen').textContent==='in 4 beats','the final bar has an explicit countdown');
   const edge=Math.round(Math.min(cv.clientWidth*.28,190))+(P.L-pos)*P.ppb,first=next.data.ev[0];
   check(first.n.every(n=>draws.some(d=>d.t===String(n.f)&&Math.abs(d.x-edge)<1 && Math.abs(d.y-(70+n.s*27+.5))<1)),'the approaching loop contains the actual new-key fret numbers');
   now=boundary-.12;exSched();now=boundary+.001;exSync();
   check(P.keyPc===next.data.keyPc && P.bpm===next.bpm,'preview and audio arrive at the same key/tempo');
   check(P.previous.keyPc===old && P.bus===bus,'previous-key notation and sounding audio survive the boundary');
   exStop();return failures;
  });assert.deepEqual(transition,[]);
  const jump=await page.evaluate(()=>{const a=window.__A;a.P.viewPos=a.P.L-2;a.exDraw(a.P.viewPos);return {key:a.exForecast()[0].data.keyPc,x:Math.round(Math.min(document.getElementById('pCanvas').clientWidth*.28,190))+2*a.P.ppb};});
  const bounds=await page.locator('#pCanvas').boundingBox();await page.mouse.click(bounds.x+jump.x,bounds.y+80);
  assert.equal(await page.evaluate(()=>window.__A.P.keyPc),jump.key,'clicking upcoming notation prepares that key');assert.equal(await page.evaluate(()=>window.__A.P.viewPos),0,'the first future note becomes the start position');
  for(const colorScheme of ['light','dark']){
   await page.emulateMedia({colorScheme});
   const colors=await page.evaluate(()=>{const cs=getComputedStyle(document.documentElement),v=k=>cs.getPropertyValue('--'+k).trim();return {bg:v('bg'),pairs:['root','d3','d5','d7','good','warn','bad','accent'].map(k=>[k,v(k),v(k+'-ink')]),surfaces:['bg','surface','surface-2'].map(k=>[v(k),v('muted')])};});
   assert.equal(colors.bg,colorScheme==='light'?'#eff1f5':'#1e1e2e');
   const lum=h=>h.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0),ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
   colors.pairs.forEach(([name,bg,fg])=>assert.ok(ratio(bg,fg)>=4.5,name+' marker contrast '+colorScheme));colors.surfaces.forEach(([bg,fg])=>assert.ok(ratio(bg,fg)>=4.5,'muted text '+colorScheme));
   for(const width of [1440,390]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'player fits '+width);}
  }
  assert.deepEqual(errors,[]);console.log('Advanced voice leading and modal harmony, transfer tasks, reversible skipping, early key/tempo preparation, future notation, contrast and layouts\nOK');
 }finally{await browser.close();fs.unlinkSync(tmp);}
})().catch(e=>{console.error(e);process.exitCode=1});
