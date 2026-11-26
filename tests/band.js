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
    await page.locator('#view-today [data-go="bass"]').click();
    const room=part=>page.locator('#view-'+part);
    const field=(part,name)=>room(part).locator('[data-band="'+name+'"]');
    for(const part of ['bass','drums']){
      const select=field(part,'study');
      const ids=await select.locator('option').evaluateAll(o=>o.map(x=>x.value));
      assert.equal(ids.length,6);
      for(const id of ids){
        await select.selectOption(id);
        const counts=room(part).locator('thead [data-pulse]');
        assert.equal(await counts.count(),['ghost','turnaround'].includes(id)?32:16);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      }
      await select.selectOption('release');
      if(part==='bass'){
        assert.equal(await room(part).locator('tbody tr:last-child [data-pulse="0"]').textContent(),'0');
        assert.equal(await room(part).locator('tbody tr:last-child [data-pulse="1"]').textContent(),'–');
        assert.equal(await room(part).locator('tbody tr:last-child [data-pulse="9"]').textContent(),'');
        await field(part,'tempo').fill('200');
        await field(part,'mix').selectOption('partner');
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
    assert.match(await page.locator('#bandProgress').textContent(),/Bass guitar.*200 BPM/);
    assert.deepEqual(errors,[]);
    console.log('OK');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
