// Exercises both instrument routes and verifies the shared score on a narrow screen.
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
(async()=>{
  const browser=await chromium.launch();
  try {
    const page=await browser.newPage({viewport:{width:360,height:780}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.join(__dirname,'..','index.html')).href);
    const instrument=page.locator('#studioPicker'), studio=page.locator('#studioPage');
    const tab=name=>page.locator('.tab[data-tab="'+name+'"]').click();
    await instrument.selectOption('bass');
    assert.match(await studio.innerText(),/Bass guitar/);
    await studio.locator('summary').first().click();
    await studio.locator('[data-studio-setup]').selectOption('pick');
    await tab('learn');
    assert.equal(await studio.locator('[data-piece]').count(),13);
    await studio.locator('details').first().locator('summary').click();
    await studio.locator('[data-check="0-1"]').click();
    assert.match(await studio.locator('[role=status]').first().innerText(),/Correct/);
    await studio.locator('[data-piece="bass-release"]').click();
    assert.match(await page.locator('#view-bass').innerText(),/Pick open E/);
    const room=part=>page.locator('#view-'+part);
    const field=(part,name)=>room(part).locator('[data-band="'+name+'"]');
    for(const part of ['bass','drums']){
      await tab('learn');
      await studio.locator('[data-piece]').first().click();
      const select=field(part,'study');
      const ids=await select.locator('option').evaluateAll(o=>o.map(x=>x.value));
      const expected=part==='bass'?13:10;
      assert.equal(ids.length,expected);
      assert.equal(ids.filter(id=>id.startsWith(part==='bass'?'bass-':'drum-')).length,expected);

      await select.selectOption(ids[0]);
      assert.equal(await field(part,'swap').count(),0);
      await field(part,'guide').uncheck();
      for(const id of ids){
        await select.selectOption(id);
        const counts=room(part).locator('thead [data-pulse]');
        assert.equal(await counts.count(),['ghost','turnaround','drum-burst','drum-displace','drum-return','drum-crossaccent','bass-burst','bass-target','bass-octave-engine'].includes(id)?32:16);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      }
      await tab('library');
      await studio.locator('[data-piece="release"]').click();
      const grooves=await select.locator('option').evaluateAll(o=>o.map(x=>x.value));
      assert.equal(grooves.length,6);
      for(const id of grooves){
        await select.selectOption(id);
        assert.equal(await room(part).locator('thead [data-pulse]').count(),['ghost','turnaround'].includes(id)?32:16);
      }
      await select.selectOption('release');
      if(part==='bass'){
        assert.equal(await room(part).locator('tbody tr:last-child [data-pulse="0"]').innerText(),'0');
        assert.equal(await room(part).locator('tbody tr:last-child [data-pulse="1"]').textContent(),'–');
        assert.equal(await room(part).locator('tbody tr:last-child [data-pulse="9"]').textContent(),'');
        await field(part,'tempo').fill('200');
        const firstTab=room(part).locator('.bass-tab').first();
        assert.deepEqual(await firstTab.locator('tbody th').allTextContents(),['G','D','A','E']);
        assert.equal(await firstTab.locator('tr:last-child .tab-fret').first().innerText(),'0');
        assert.equal(await firstTab.locator('tbody td').first().evaluate(td=>getComputedStyle(td,'::before').borderTopStyle),'solid');
        await field(part,'mix').selectOption('partner');
        await field(part,'passage').selectOption('2');
        assert.equal(await field(part,'log').isDisabled(),true);
        await field(part,'listen').click();
        await room(part).locator('[data-bar="2"] td.playing').first().waitFor();
        assert.equal(await room(part).locator('[data-bar="1"] td.playing').count(),0);
        await page.waitForFunction(()=>document.querySelector('#view-bass [data-band="play"]').textContent==='Play loop');
        assert.equal(await field(part,'mix').inputValue(),'partner');
        await select.selectOption('ghost');
        assert.equal(await field(part,'passage').inputValue(),'both');
        await select.selectOption('release');
        assert.equal(await field(part,'passage').inputValue(),'2');
        await field(part,'passage').selectOption('both');
        await field(part,'play').click();
        await room(part).locator('td.playing').first().waitFor();
        await field(part,'log').click();
        await field(part,'swap').click();
        assert.equal(await field('drums','study').inputValue(),'release');
        assert.equal(await field('bass','play').textContent(),'Play loop');
      } else {
        assert.equal(await field(part,'tempo').inputValue(),'68');
        await select.selectOption('ghost');
        assert.equal(await room(part).locator('tbody tr:nth-child(2) [data-pulse="7"]').textContent(),'(●)');
      }
    }
    await page.reload();
    assert.equal(await field('drums','study').inputValue(),'ghost');
    await page.locator('.tab[data-tab="progress"]').click();
    assert.doesNotMatch(await studio.innerText(),/200 BPM/);
    await instrument.selectOption('bass');
    assert.match(await studio.innerText(),/clean at 200/i);
    await tab('library');
    assert.equal(await studio.locator('[data-song-shelf] a').count(),3);
    await instrument.selectOption('drums');
    await tab('today');
    await studio.locator('summary').first().click();
    await studio.locator('[data-studio-setup]').selectOption('pad');
    await tab('learn');
    assert.equal(await studio.locator('[data-piece]').count(),6);
    await studio.locator('[data-piece="drum-burst"]').click();
    assert.equal(await room('drums').locator('tbody th').first().textContent(),'Pad');
    await page.reload();
    assert.equal(await instrument.inputValue(),'drums');
    await instrument.selectOption('guitar');
    assert.ok(await page.locator('#view-today').isVisible());
    assert.ok(await page.locator('#rtStart').isVisible());
    require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'../scripts/export-apps.js'),'--check']);
    const fs=require('node:fs');
    const server=require('node:http').createServer((req,res)=>{
      let file=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      if(file.endsWith('/'))file+='index.html';
      fs.readFile(path.join(__dirname,'..',file),(err,body)=>{
        res.writeHead(err?404:200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});
        res.end(err?'Missing':body);
      });
    });
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    try{
      const home='http://127.0.0.1:'+server.address().port+'/';
      await page.goto(home+'apps.html');
      await page.evaluate(()=>localStorage.setItem('fretlab.v1',JSON.stringify({settings:{goal:25},band:{bass:{best:{'bass-release':91}}}})));
      for(const [app,title] of [['bass','Pocket Bass'],['drums','Pocket Drums'],['guitar','Pocket Guitar']]){
        await page.goto(home+app+'/');
        assert.equal(await page.title(),title);
        assert.equal(await instrument.isVisible(),false);
        assert.equal(await instrument.inputValue(),app);
        if(app==='guitar')continue;
        await tab('progress');
        assert.equal(/clean at 91\b/i.test(await studio.innerText()),app==='bass');
        await tab('learn');
        assert.equal(await studio.locator('[data-piece]').count(),app==='bass'?13:10);
        if(app==='bass'){
          await studio.locator('[data-piece="bass-burst"]').click();
          await field('bass','names').check();
          assert.ok((await room('bass').locator('.tab-pitch:visible').allTextContents()).includes('A'));
          assert.ok(await room('bass').getByText('Work through this lesson').isVisible());
        }
        await page.locator('.studio-bar a[href$="/tools"]').click();
        if(app==='bass'){
          await studio.locator('[data-tool="minor"]').check();
          await studio.locator('[data-bass-tone="39"]').first().click();
          assert.match(await studio.locator('[data-tone-readout]').innerText(),/Third/);
        }else{
          await studio.locator('[data-tool="pattern"]').selectOption('Paradiddle');
          await studio.locator('[data-tool="left"]').check();
          assert.match(await studio.locator('.mono').innerText(),/>L · R · L · L/);
          await studio.locator('[data-tool-play]').click();
        }
        await page.evaluate(()=>location.hash='voicings');
        await page.waitForFunction(()=>document.querySelector('#studioPage h2')?.textContent.includes('practice'));
        await page.reload();assert.equal(await instrument.inputValue(),app);
      }
      assert.ok(await page.evaluate(()=>JSON.parse(localStorage.getItem('pocket-rehearsal.bass.v1')).band.bass.noteNames));
    }finally{server.close();}
    assert.deepEqual(errors,[]);
    console.log('OK');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
