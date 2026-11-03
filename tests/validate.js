// Checks every exercise step in every key and thousands of generated quiz questions.
// Run: npm i -D playwright && npx playwright install chromium && node tests/validate.js
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const os = require('os');
const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8')
  .replace('/* ---------- boot ---------- */', 'window.__T = { EX, UNITS, OPEN };\n/* ---------- boot ---------- */');
const tmp = path.join(os.tmpdir(), 'fretlab-validate.html'); fs.writeFileSync(tmp, src);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + tmp); await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const { EX, UNITS } = window.__T, out = []; let n = 0, q = 0;
    for (const e of EX) e.steps.forEach((st, i) => {
      for (let k = 0; k < (e.keyed ? 12 : 1); k++) {
        n++; let res; try { res = st.build(k); } catch (x) { out.push(`${e.id}:${i} key ${k} threw ${x.message}`); continue; }
        if (!res.ev.length) out.push(`${e.id}:${i} k${k} empty`);
        if (!(res.L > 0) || Math.abs(res.L % (st.bar || 4)) > 1e-6) out.push(`${e.id}:${i} k${k} bad length ${res.L}`);
        res.ev.forEach((x, j) => { if (!(x.d > 0)) out.push(`${e.id}:${i} k${k} ev${j} bad duration`); x.n.forEach(m => { if (!(m.s >= 0 && m.s <= 5) || !(m.f >= 0 && m.f <= 20)) out.push(`${e.id}:${i} k${k} bad note ${m.s},${m.f}`); }); });
        if (!(st.goal >= 30 && st.bpm >= 30)) out.push(`${e.id}:${i} bad tempo`);
      }
    });
    for (const u of UNITS) for (let t = 0; t < 200; t++) { let qs; try { qs = u.quiz(); } catch (x) { out.push(`${u.id} quiz threw ${x.message}`); break; }
      qs.forEach(x => { q++; if (x.type === 'mc' && (!(x.answer >= 0 && x.answer < x.options.length) || new Set(x.options).size !== x.options.length)) out.push(`${u.id} bad question: ${x.prompt.slice(0, 60)}`); }); }
    return { ex: EX.length, n, q, out: [...new Set(out)].slice(0, 40) };
  });
  await b.close();
  console.log(`${r.ex} exercises, ${r.n} step/key combos, ${r.q} quiz questions`);
  [...errs.map(e => 'page error: ' + e), ...r.out].forEach(x => console.log('  ' + x));
  const bad = errs.length + r.out.length; console.log(bad ? `FAILED (${bad})` : 'OK'); process.exit(bad ? 1 : 0);
})();
