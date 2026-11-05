// Rhythm section: bar math for every step, playback of every step, notation marks and click modes.
// Run: node tests/rhythm.js   (needs playwright, see validate.js)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const os = require('os');
const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8')
  .replace('/* ---------- boot ---------- */', 'window.__T = { EX, clickLevel };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(), 'fretlab-rhythm.html'); fs.writeFileSync(tmp, src);
const shots = process.argv.includes('--shots') ? path.join(os.tmpdir(), 'fretlab-rhythm-shots') : null; if (shots) fs.mkdirSync(shots, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const errs = [];
  const math = await (async () => {
    const p = await b.newPage(); p.on('pageerror', e => errs.push('page error: ' + e.message));
    await p.goto('file://' + tmp); await p.waitForTimeout(300);
    const r = await p.evaluate(() => {
      const out = [], { EX, clickLevel } = window.__T, R = EX.filter(e => e.cat === 'Rhythm');
      for (const e of R) e.steps.forEach((st, i) => {
        const r = st.build(0), bar = st.bar || 4, ev = r.ev.slice().sort((a, b) => a.t - b.t);
        let end = 0;
        ev.forEach((x, j) => { if (Math.abs(x.t - end) > 1e-6) out.push(`${e.id}:${i} gap/overlap at ${x.t} (expected ${end})`); end = x.t + x.d; if (!x.air && !x.n.length) out.push(`${e.id}:${i} silent event without air flag`); });
        if (Math.abs(end - r.L) > 1e-6) out.push(`${e.id}:${i} events end at ${end}, length ${r.L}`);
        if (Math.abs(r.L % bar) > 1e-6) out.push(`${e.id}:${i} length ${r.L} not whole bars of ${bar}`);
        if (!ev.every(x => x.cnt)) out.push(`${e.id}:${i} missing counts`);
      });
      const lv = (o, n) => Array.from({ length: n }, (_, k) => clickLevel(o, k)).join('');
      const checks = { backbeat: lv({ bar: 4, click: 'backbeat' }, 8), gap: lv({ bar: 4, click: 'gap' }, 8), g223: lv({ bar: 7, groups: [2, 2, 3] }, 7), g32: lv({ bar: 5, groups: [3, 2] }, 5) };
      if (checks.backbeat !== '02020202') out.push('backbeat click ' + checks.backbeat);
      if (checks.gap !== '31110000') out.push('gap click ' + checks.gap);
      if (checks.g223 !== '3121211') out.push('7/8 click ' + checks.g223);
      if (checks.g32 !== '31121') out.push('5/4 click ' + checks.g32);
      return { n: R.length, steps: R.reduce((a, e) => a + e.steps.length, 0), out };
    });
    await p.close(); return r;
  })();
  errs.push(...math.out);
  for (const [vp, scheme] of [[{ width: 1440, height: 900 }, 'dark'], [{ width: 390, height: 844 }, 'light']]) {
    const ctx = await b.newContext({ viewport: vp, colorScheme: scheme }); const p = await ctx.newPage(); const tag = `[${vp.width}]`;
    p.on('pageerror', e => errs.push(`${tag} page error: ${e.message}`));
    await p.goto('file://' + path.join(__dirname, '..', 'index.html') + '#library'); await p.waitForTimeout(300);
    try {
      await p.click('#view-library [data-go="rhythm"]'); await p.waitForTimeout(150);
      const ids = await p.$$eval('#rEx [data-ex]', x => x.map(y => y.dataset.ex)); if (ids.length !== math.n) errs.push(`${tag} ${ids.length} rhythm cards`);
      if (shots) await p.screenshot({ path: `${shots}/list_${vp.width}.png`, fullPage: true });
      for (const id of ids) {
        await p.click(`#rEx [data-ex="${id}"]`); await p.waitForTimeout(100);
        if (!(await p.isVisible('#view-rhythm #exPlayer'))) errs.push(`${tag} ${id} player not in Rhythm`);
        const steps = await p.$$eval('#pSteps [data-step]', x => x.length);
        for (let k = 0; k < steps; k++) {
          await p.click(`#pSteps [data-step="${k}"]`); await p.click('#pPlay'); await p.waitForTimeout(450); await p.click('#pPlay');
          if (shots && ['rh_pend:2', 'rh_chuck:1', 'rh_odd:0', 'rh_echo:1', 'rh_chug:2'].includes(`${id}:${k}`)) await p.screenshot({ path: `${shots}/${id}_${k}_${vp.width}.png`, fullPage: false });
        }
        await p.click('#pBack'); await p.waitForTimeout(100);
        if (!(await p.isVisible('#rMain'))) errs.push(`${tag} back did not return to Rhythm`);
      }
    } catch (e) { errs.push(`${tag} ${e.message.split('\n')[0]}`); }
    if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) errs.push(`${tag} overflow`);
    await ctx.close();
  }
  await b.close();
  console.log(`${math.n} rhythm exercises, ${math.steps} steps`); errs.forEach(e => console.log('  ' + e));
  console.log(errs.length ? `FAILED (${errs.length})` : 'OK'); process.exit(errs.length ? 1 : 0);
})();
