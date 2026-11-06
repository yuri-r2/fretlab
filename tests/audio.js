const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const source = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8').replace('/* ---------- boot ---------- */', `
const scheduled = [], playEvent = exPlayEv;
exPlayEv = (...args) => { scheduled.push({ beat: args[0].t, destination: args[3], preview: P.preview }); return playEvent(...args); };
window.__A = { S, P, R, M, AU, EX, scheduled, ac, bus, pluck, strum, tone, ksBuffer, SND, exOpen, exStart, exStop, exSeek, exListen, exStepNote, exLabel, renderPill, switchTab, mStart };
/* ---------- boot ---------- */`);
const tmp = path.join(os.tmpdir(), 'fretlab-audio.html');
fs.writeFileSync(tmp, source);
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + tmp);
    const playback = await page.evaluate(() => {
      const a = window.__A, { S, P, R, scheduled } = a, failures = [];
      const check = (ok, message) => { if (!ok) failures.push(message); };
      for (const id of ['triads', a.EX.find(e => e.steps.some(s => s.click)).id]) {
        const step = id === 'triads' ? 0 : a.EX.find(e => e.id === id).steps.findIndex(s => s.click);
        a.exOpen(id, step); Object.assign(S.ui.exopts, { guide: false, loop: true, count: true, keycycle: true });
        const options = JSON.stringify(S.ui.exopts); scheduled.length = 0; a.exListen();
        check(scheduled.some(e => e.beat === P.ev[0].t && e.preview), 'Listen first schedules the opening guide note: ' + id);
        check(JSON.stringify(S.ui.exopts) === options && P.endBeat === P.L, 'Listen first retains practice options and plays one pass');
        document.querySelector('#pRestart').click();
        check(P.preview && P.endBeat === P.L, 'Restart retains Listen first mode');
        a.exStop();
      }
      a.exOpen('triads', 0); Object.assign(S.ui.exopts, { guide: true, count: false, loop: true });
      Object.assign(R, { key: 'auto', blocks: [{ ex: 'triads', tool: 'exercises', t: 'Current block', m: 4 }], activeEx: 'triads', idx: 0, rem: 215, running: true, paused: false, waiting: false }); a.renderPill();
      a.exSeek(4); a.exStart(); document.querySelector('#rpPause').click(); const pos = P.viewPos;
      check(R.paused && !P.running && pos >= 4 && R.rem === 215, 'session Pause stops playback in place and retains the timer');
      document.querySelector('#rpPause').click();
      check(!R.paused && P.running && P.startBeat === pos, 'session Resume continues the paused exercise');
      document.querySelector('#rpPause').click(); a.exSeek(8); document.querySelector('#rpPause').click();
      check(!P.running && P.viewPos === 8, 'session Resume does not restart after a manual seek');
      a.exStart(); document.querySelector('#rpStop').click();
      check(!P.running && !R.running && P.viewPos >= 8, 'End session stops playback in place');
      a.exStepNote(1); check(scheduled.at(-1).destination === a.AU.notes, 'step-through respects Notes and tones volume');
      document.querySelector('#pLabSeg [data-v="finger"]').click();
      check(a.exLabel({ s: 0, f: 3, fg: 2 }) === '' && document.querySelectorAll('#pBoard .fb-finger').length > 0, 'None leaves note markers empty while Show fingers supplies separate annotations');
      document.querySelector('#pFingers').click();
      check(!document.querySelector('#pBoard .fb-finger'), 'Show fingers hides annotations in None mode');
      Object.assign(R, { running: true, paused: false, idx: 0, blocks: [{ tool: 'metronome', t: 'Pulse', m: 2 }, { tool: 'metronome', t: 'Next pulse', m: 2 }] }); a.renderPill(); a.switchTab('metronome'); a.mStart();
      document.querySelector('#rpPause').click(); check(!a.M.running && R.paused, 'session Pause stops the metronome');
      document.querySelector('#rpPause').click(); check(a.M.running && !R.paused, 'session Resume restarts the metronome');
      document.querySelector('#rpSkip').click(); check(!a.M.running && R.idx === 1 && !R.resume, 'Next block stops the outgoing metronome and clears pending resumes');
      a.mStart(); document.querySelector('#rpStop').click(); check(!a.M.running && !R.running, 'End stops the metronome');
      S.ui.exopts.keycycle = false; S.ui.exopts.ladder = false; a.exOpen('triads', 0);
      document.querySelector('#pLadder').click();
      check(!document.querySelector('#pUpcoming').hidden && document.querySelector('#pUpcomingName').textContent.includes((P.bpm + 4) + ' bpm'), 'the paused ladder preview updates immediately');
      Object.assign(R, { running: true, paused: true }); a.renderPill(); a.switchTab('voicings');
      return failures;
    });
    assert.deepEqual(playback, []);
    await page.evaluate(() => scrollTo(0, 600));
    assert.ok(await page.evaluate(() => document.querySelector('.chord-controls').getBoundingClientRect().top >= document.querySelector('#top').getBoundingClientRect().bottom + 10), 'the chord toolbar clears the full session header');
    for (const colorScheme of ['light', 'dark']) {
      await page.emulateMedia({ colorScheme });
      await page.screenshot({ path: path.join(os.tmpdir(), 'fretlab-polish-chords-' + colorScheme + '.png') });
    }
    const rendered = await page.evaluate(async () => {
      const a = window.__A, Native = window.AudioContext, results = {};
      const rms = (data, start, end, sr = 44100) => {
        const values = data.subarray(Math.floor(start * sr), Math.floor(end * sr));
        return Math.sqrt(values.reduce((sum, x) => sum + x * x, 0) / values.length);
      };
      async function render(kind, notes = 1, muted = false) {
        const ctx = new OfflineAudioContext(1, 44100 * 4, 44100);
        ctx.resume = () => Promise.resolve(); window.AudioContext = function () { return ctx; };
        a.AU.ctx = null; a.AU.ks.clear(); Object.assign(a.S.settings, { vol: 0.8, nvol: notes, cvol: 1, muted }); a.ac();
        if (kind === 'direct') a.pluck(40, 0.3, null, 0.6, 2.6);
        else if (kind === 'bus') a.pluck(52, 0.3, a.bus(), 0.6, 1.6);
        else if (kind === 'chord') a.strum([40, 47, 52, 56, 59, 64], 0.3, null, 0.018, 0.65, 2.6);
        else if (kind === 'fast') for (let i = 0; i < 24; i++) a.pluck([52, 55, 59, 64][i % 4], 0.3 + i * 0.1, null, 0.72, 0.26);
        else if (kind === 'click') a.SND.wood(0.3, 3, a.AU.click);
        else a.tone(40, null, kind);
        const bufferSeconds = kind === 'direct' ? a.ksBuffer(40, 2.6).duration : null;
        const data = (await ctx.startRendering()).getChannelData(0);
        if (!data.every(Number.isFinite)) throw Error('Nonfinite audio sample');
        return { rms: rms(data, 0.3, kind === 'click' ? 0.4 : 0.9), sustain: rms(data, 2.6, 2.65), tail: rms(data, 3.2, 3.8), peak: data.reduce((m, x) => Math.max(m, Math.abs(x)), 0), bufferSeconds };
      }
      try {
        results.long = await render('direct');
        results.chord = await render('chord'); results.fast = await render('fast');
        for (const kind of ['direct', 'bus', 'pure', 'fifth', 'warm']) results[kind] = await render(kind, 0);
        results.click = await render('click', 0);
        results.masterMute = await render('click', 1, true);
      } finally { window.AudioContext = Native; }
      return results;
    });
    assert.ok(rendered.long.bufferSeconds > 2.6 && rendered.long.sustain > 0.000001, 'a long low note continues beyond the old 2.2 second buffer');
    assert.ok(rendered.long.tail < 0.000001 && rendered.long.peak < 1 && rendered.long.rms > 0.001, 'the rendered note ends quietly without clipping');
    for (const kind of ['chord', 'fast']) assert.ok(rendered[kind].peak < 0.98 && rendered[kind].rms > 0.01 && rendered[kind].tail < 0.000001, kind + ' stays audible without clipping or lingering after its release');
    for (const kind of ['direct', 'bus', 'pure', 'fifth', 'warm']) assert.ok(rendered[kind].rms < 0.000001, kind + ' respects a zero Notes and tones level');
    assert.ok(rendered.click.rms > 0.001 && rendered.masterMute.rms < 0.000001, 'click remains independent of Notes and tones and respects master mute');
    const strings = await page.evaluate(() => {
      const a = window.__A, results = [];
      a.AU.ks.clear();
      for (const sr of [44100, 48000]) {
        a.AU.ctx = new OfflineAudioContext(1, sr * 4, sr);
        for (const a4 of [432, 440, 442]) {
          a.S.settings.a4 = a4;
          for (const m of [36, 40, 52, 64, 76, 88]) {
            let previous;
            for (let variant = 0; variant < 3; variant++) {
              const buffer = a.ksBuffer(m, 2.6, variant), d = buffer.getChannelData(0);
              if (a.ksBuffer(m, 2.6, variant) !== buffer) throw Error('String buffer cache miss');
              const f = a4 * 2 ** ((m - 69) / 12), period = sr / f, lo = Math.floor(period * 0.96), hi = Math.ceil(period * 1.04), n = Math.round(sr * 0.12), offset = n, corr = [];
              for (let lag = lo - 1; lag <= hi + 1; lag++) {
                let xy = 0, xx = 0, yy = 0;
                for (let i = offset; i < offset + n; i++) { const x = d[i], y = d[i + lag]; xy += x * y; xx += x * x; yy += y * y; }
                corr.push(xy / Math.sqrt(xx * yy));
              }
              let idx = 1; for (let i = 2; i < corr.length - 1; i++) if (corr[i] > corr[idx]) idx = i;
              const x = corr[idx - 1], y = corr[idx], z = corr[idx + 1], lag = lo - 1 + idx + 0.5 * (x - z) / (x - 2 * y + z);
              const rms = (from, to) => { let sum = 0; for (let i = Math.floor(from * sr); i < to * sr; i++) sum += d[i] * d[i]; return Math.sqrt(sum / ((to - from) * sr)); };
              let difference = 0; if (previous) for (let i = 0; i < n; i++) difference += Math.abs(d[i] - previous[i]);
              results.push({ sr, a4, m, variant, cents: 1200 * Math.log2(sr / lag / f), early: rms(0.03, 0.09), late: rms(0.7, 0.8), sustain: rms(2.4, 2.5), difference, finite: d.every(Number.isFinite), peak: d.reduce((max, x) => Math.max(max, Math.abs(x)), 0) });
              previous = d;
            }
          }
        }
      }
      return { results, cacheSize: a.AU.ks.size };
    });
    assert.ok(strings.results.every(n => n.finite && n.peak <= 0.801 && Math.abs(n.cents) < 1), 'strings stay in tune and finite across pitches, pick variants, reference tunings and sample rates');
    assert.ok(Math.max(...strings.results.map(n => n.early)) / Math.min(...strings.results.map(n => n.early)) < 1.4, 'string loudness stays consistent across the fretboard');
    assert.ok(strings.results.every(n => n.late < n.early && (n.m > 76 || n.sustain > 0.0001)), 'strings decay naturally while retaining low and upper-register sustain');
    assert.ok(strings.results.filter(n => n.variant).every(n => n.difference > 0.1), 'repeated picks vary in tone without changing pitch');
    assert.ok(strings.cacheSize <= 96, 'string cache stays bounded across tunings and sample rates');
    assert.deepEqual(errors, []);
    console.log('Listen first opening notes, session audio pause/resume/end, finger labels, live tempo preview, sticky toolbar, rendered sustain/mixer routing, tuned string variants, balanced dynamics and polyphonic headroom\nOK');
  } finally { await browser.close(); fs.unlinkSync(tmp); }
})().catch(e => { console.error(e); process.exitCode = 1; });
