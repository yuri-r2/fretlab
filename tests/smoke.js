// Clicks through every tab and the main flows at phone and desktop sizes; fails on page errors or horizontal overflow.
// Run: node tests/smoke.js   (needs playwright, see validate.js)
const { chromium } = require('playwright'); const path = require('path');
const URL = 'file://' + path.join(__dirname, '..', 'index.html');
const TABS = ['today', 'learn', 'library', 'progress'];
(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const errs = [];
  for (const [vp, scheme] of [[{ width: 1280, height: 860 }, 'light'], [{ width: 1440, height: 960 }, 'dark'], [{ width: 390, height: 844 }, 'light']]) {
    const ctx = await b.newContext({ viewport: vp, colorScheme: scheme }); const p = await ctx.newPage(); const tag = `[${vp.width}]`;
    p.on('pageerror', e => errs.push(`${tag} ${e.message}`));
    const step = async (name, fn) => { try { await fn(); } catch (e) { errs.push(`${tag} ${name}: ${e.message.split('\n')[0]}`); } };
    await p.goto(URL + '#today'); await p.waitForTimeout(300);
    for (const t of TABS) await step('tab ' + t, async () => { await p.click(`.tab[data-tab="${t}"]`); await p.waitForTimeout(120); if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) errs.push(`${tag} overflow on ${t}`); });
    const library = async name => { await p.click('.tab[data-tab="library"]'); await p.click(`#view-library [data-go="${name}"]`); };
    for (const t of ['voicings','exercises','fretboard','ear','explorer']) await step('library ' + t, async () => { await library(t); if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) errs.push(`${tag} overflow on ${t}`); });
    await step('tools', async () => {
      if ((await p.$$('.tools-menu')).length) errs.push(`${tag} Tools menu still present`);
      if (await p.evaluate(() => document.querySelector('#top').offsetHeight > 64)) errs.push(`${tag} header wraps to two rows`);
      for (const t of ['metronome', 'tuner']) { await p.click(`.toolbtn[data-go="${t}"]`); await p.waitForTimeout(100);
        if (!(await p.isVisible(`#view-${t}`))) errs.push(`${tag} ${t} did not open`);
        if ((await p.$eval(`.toolbtn[data-go="${t}"]`, b => b.getAttribute('aria-pressed'))) !== 'true') errs.push(`${tag} ${t} button not highlighted`);
        if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) errs.push(`${tag} overflow on ${t}`); }
    });
    await step('exercise', async () => { await library('exercises'); await p.click('[data-ex="triads"]'); await p.click('#pPlay'); await p.waitForTimeout(800); await p.click('#pPlay'); await p.click('#pClean'); await p.click('#pBack'); });
    await step('scales', async () => { await library('explorer'); await p.selectOption('#xScale', 'dorian'); await p.click('#xEx [data-ex="sc_dorian_drone"]'); await p.click('#pPlay'); await p.waitForTimeout(600); await p.click('#pPlay'); await p.click('#pBack'); });
    await step('voicing', async () => { await library('voicings'); await p.click('#chordGrid [data-chord-sound="0:strum"]'); await p.selectOption('#chordGenre', 'alternative'); await p.selectOption('#chordRoot', '2'); await library('exercises'); await p.fill('#exSearch', 'boogie'); await p.click('[data-ex="v_rock_boogie"]'); await p.click('#pPlay'); await p.waitForTimeout(600); await p.click('#pPlay'); await p.click('#pBack'); });
    await step('learn', async () => { await p.click('.tab[data-tab="learn"]'); await p.click('#lnUnits [data-unit="u4"]'); await p.click('#lnTabs [data-v="quiz"]'); await p.keyboard.press('1'); });
    await step('routine', async () => { await p.click('.tab[data-tab="today"]'); await p.click('#rtStart'); await p.waitForTimeout(200); await p.click('#rpStop'); });
    await step('volume', async () => { await p.click('#volBtn'); await p.keyboard.press('Escape'); await p.keyboard.press('m'); await p.keyboard.press('m'); });
    await ctx.close();
  }
  await b.close(); errs.forEach(e => console.log('  ' + e)); console.log(errs.length ? `FAILED (${errs.length})` : 'OK'); process.exit(errs.length ? 1 : 0);
})();

