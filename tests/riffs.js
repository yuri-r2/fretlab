const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const source=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8').replace('/* ---------- boot ---------- */','window.__Riffs={S,SONG_RIFFS,RIFF_TUNINGS,riffResults};\n/* ---------- boot ---------- */');
const tmp=path.join(os.tmpdir(),'fretlab-riffs.html');fs.writeFileSync(tmp,source);
(async()=>{const browser=await chromium.launch();try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file://'+tmp+'#songs');
  const catalog=await page.evaluate(()=>window.__Riffs.SONG_RIFFS),tunings=await page.evaluate(()=>window.__Riffs.RIFF_TUNINGS);
  assert.ok(catalog.length>=70,'an extensive curated repertoire');
  assert.equal(new Set(catalog.map(r=>r.id)).size,catalog.length,'song IDs are unique');
  assert.equal(new Set(catalog.map(r=>r.url)).size,catalog.length,'no duplicate tab entries');
  assert.ok(catalog.filter(r=>r.tuning==='standard').length>=50,'E standard is the main collection');
  for(const genre of ['emo','shoegaze','indie','alternative'])assert.ok(catalog.filter(r=>r.genre===genre).length>=15,'substantial '+genre+' coverage');
  for(const r of catalog){
    assert.ok(tunings[r.tuning]&&r.focus&&r.part,'each riff identifies a technique and linked part');
    assert.match(r.url,/^https:\/\/www\.songsterr\.com\/a\/wsa\/[a-z0-9-]+-s\d+t\d+\/r\d+$/,'direct versioned guitar-part links');
    assert.match(r.url,new RegExp('-s'+r.id.slice(5)+'t'),'links match their stable song IDs');
  }
  assert.deepEqual(tunings.standard.m,[64,59,55,50,45,40]);
  assert.equal(tunings.standard.notes,'E A D G B E');
  const pcs={'C':0,'C♯':1,'D♭':1,'D':2,'D♯':3,'E♭':3,'E':4,'F':5,'F♯':6,'G♭':6,'G':7,'G♯':8,'A♭':8,'A':9,'A♯':10,'B♭':10,'B':11};
  for(const t of Object.values(tunings))assert.deepEqual(t.notes.split(' ').reverse().map(n=>pcs[n]),t.m.map(n=>n%12),'visible string names match their high-to-low pitches');
  assert.equal(await page.locator('#riffTuning').inputValue(),'standard');
  assert.equal(await page.locator('#riffList [data-riff]').count(),catalog.filter(r=>r.tuning==='standard').length);
  const never=catalog.find(r=>r.artist==='American Football'&&r.title==='Never Meant'),mayonaise=catalog.find(r=>r.title==='Mayonaise');
  assert.equal(never.tuning,'facgce','Never Meant is not relabeled as E standard');
  assert.notEqual(mayonaise.tuning,'standard','the selected open-tuned Mayonaise part stays out of E standard');
  assert.equal(await page.locator('[data-riff="'+never.id+'"]').count(),0);
  await page.selectOption('#riffTuning','facgce');
  assert.equal(await page.locator('[data-riff="'+never.id+'"]').count(),1);
  await page.selectOption('#riffTuning','all');
  for(const genre of ['emo','shoegaze','indie','alternative']){
    await page.click('[data-riff-genre="'+genre+'"]');
    assert.equal(await page.locator('#riffList [data-riff]').count(),catalog.filter(r=>r.genre===genre).length);
  }
  await page.click('[data-riff-genre="all"]');
  await page.fill('#riffSearch','  sLoWdIvE  sun  ');
  assert.equal(await page.locator('#riffList [data-riff]').count(),1,'search combines artist and title without case sensitivity');
  const id=await page.locator('#riffList [data-save-riff]').getAttribute('data-save-riff');
  const link=page.locator('#riffList a');
  assert.equal(await link.getAttribute('target'),'_blank');assert.match(await link.getAttribute('rel'),/noopener/);
  await page.locator('[data-save-riff="'+id+'"]').click();
  assert.equal(await page.locator('[data-save-riff="'+id+'"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#riffSavedCount').textContent(),'1');
  assert.ok(await page.locator('[data-save-riff="'+id+'"]').evaluate(n=>n===document.activeElement),'saving retains keyboard focus');
  await page.reload();
  assert.equal(await page.locator('#riffTuning').inputValue(),'all');
  assert.match(await page.locator('#riffSearch').inputValue(),/sLoWdIvE/);
  assert.equal(await page.locator('[data-save-riff="'+id+'"]').getAttribute('aria-pressed'),'true','saved songs survive reload');
  await page.click('#riffReset');await page.click('#riffSaved');
  assert.equal(await page.locator('#riffList [data-riff]').count(),1,'saved view applies the current tuning');
  await page.locator('[data-save-riff="'+id+'"]').click();
  assert.ok(await page.locator('#riffEmpty').isVisible());
  assert.ok(await page.locator('#riffSaved').evaluate(n=>n===document.activeElement),'removing the last saved result returns focus to its filter');
  await page.click('#riffShowAll');assert.equal(await page.locator('#riffTuning').inputValue(),'standard');
  await page.fill('#riffSearch','zzzz-no-song');assert.ok(await page.locator('#riffEmpty').isVisible());
  await page.click('#riffShowAll');assert.equal(await page.locator('#riffList [data-riff]').count(),catalog.length,'empty-state recovery reveals the full library');
  await page.selectOption('#riffTuning','facgce');await page.locator('[data-save-riff="'+never.id+'"]').click();
  await page.click('#riffReset');await page.click('#riffSaved');
  assert.ok(await page.locator('#riffEmpty').isVisible(),'an alternate-tuned saved song stays outside the E-standard filter');
  await page.click('#riffShowAll');
  assert.equal(await page.locator('[data-riff="'+never.id+'"]').count(),1,'clearing tuning filters reveals the saved alternate-tuning song');
  assert.equal(await page.locator('#riffSaved').getAttribute('aria-pressed'),'true','empty-state recovery preserves Saved mode');
  await page.click('#riffReset');
  for(const scheme of ['light','dark']){
    await page.emulateMedia({colorScheme:scheme});await page.screenshot({path:path.join(os.tmpdir(),'fretlab-riffs-desktop-'+scheme+'.png')});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  }
  const first=page.locator('#riffList .riff-row').first();await first.scrollIntoViewIfNeeded();
  assert.ok(await page.locator('#riffSearch').evaluate(n=>n.getBoundingClientRect().top>=document.getElementById('top').getBoundingClientRect().bottom),'sticky filters clear the app header');
  await page.click('.tab[data-tab="library"]');await page.click('#view-library [data-go="songs"]');
  assert.ok(await page.locator('#view-songs').isVisible(),'the new division opens from the Library');
  assert.equal(await page.locator('#libraryNav [data-go="songs"]').getAttribute('aria-current'),'page');
  await page.goto('file://'+tmp+'?legacy#riffs');assert.ok(await page.locator('#view-voicings').isVisible(),'old Riff Dice routes retain their chord-practice destination');
  for(const width of [360,390,768]){
    const phone=await browser.newPage({viewport:{width,height:844},hasTouch:true,isMobile:true});phone.on('pageerror',e=>errors.push(e.message));
    await phone.goto('file://'+tmp+'#songs');
    assert.equal(await phone.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'riff library fits touch width '+width);
    await phone.locator('#riffList [data-save-riff]').first().tap();await phone.locator('#riffSaved').tap();
    assert.equal(await phone.locator('#riffList [data-riff]').count(),1,'touch saves and filters a riff');
    for(const control of ['#riffSearch','#riffTuning','#riffSaved','#riffList [data-save-riff]'])assert.ok((await phone.locator(control).first().boundingBox()).height>=44,'touch control is at least 44px tall');
    if(width===390)await phone.screenshot({path:path.join(os.tmpdir(),'fretlab-riffs-phone.png')});
    await phone.close();
  }
  assert.deepEqual(errors,[]);console.log('Riff repertoire: verified-part links, E-standard defaults, tuning/genre/search filters, saved list, reload persistence, empty states, keyboard focus and desktop/touch layouts: OK');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
