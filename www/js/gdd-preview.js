// GDD preview scenes. index.html loads this file only when Tuning.preview is true, before the game scripts.
// Each chapter slug (?gdd=<slug>) gets a self-running scene driven through the real game screens.
// Nothing here reaches the player's save, the leaderboard, the stats, the ads or the store.
(function(){
  if(!window.Tuning || !Tuning.preview) return;

  const SLUG = new URLSearchParams(location.search).get('gdd') || '';
  const GEST = 'CJHSD';
  const LEVELS = [
    {id: 'apprenti', name: 'Apprenti', win: 1.55, dens: .6, disc: [70, 85, 95]},
    {id: 'musicien', name: 'Musicien', win: 1.15, dens: .85, disc: [60, 80, 92]},
    {id: 'virtuose', name: 'Virtuose', win: .85, dens: 1.25, disc: [55, 75, 90]},
    {id: 'roi', name: 'Roi', win: .62, dens: 1.75, disc: [50, 70, 86]}
  ];
  const TIER_NAMES = ['aucun', 'EN RYTHME', 'TRANSE', 'HYPNOSE', 'NIRVANA'];
  const BRICKS = {
    CV: 'bloc debout : glisser vers le haut', CH: 'bloc couché : glisser vers la droite', CD: 'bloc en biais : glisser en diagonale',
    CVR: 'bloc à l\'envers : glisser vers le bas', CHR: 'bloc à l\'envers : glisser vers la gauche', CDR: 'biais à l\'envers : diagonale vers le bas',
    J: 'rond-cœur : taper une fois', D: 'double rond : taper à deux doigts', H: 'note longue : poser et tenir', S: 'disque : gratter en allers-retours'
  };
  const NUM = (v, n) => String(+v.toFixed(n === undefined ? 2 : n)).replace('.', ',');

  /* ---------- isolation: temporary save, no outgoing writes ---------- */
  const root = document.documentElement;
  // a non-zero inset keeps main.js from reserving a phone status bar above the caption
  root.style.setProperty('--sat', '1px');
  // the head script has just flagged the studio splash: this page never plays it, so a later real launch still does
  if(root.classList.contains('splash')){ root.classList.remove('splash'); try{ sessionStorage.removeItem('bs_splash'); }catch(e){} }
  function memoryStorage(){
    const m = new Map();
    return {
      getItem(k){ k = String(k); return m.has(k) ? m.get(k) : null; }, setItem(k, v){ m.set(String(k), String(v)); }, removeItem(k){ m.delete(String(k)); },
      clear(){ m.clear(); }, key(i){ return [...m.keys()][i] ?? null; }, get length(){ return m.size; }
    };
  }
  const mem = memoryStorage();
  Object.defineProperty(window, 'localStorage', {configurable: true, value: mem});
  Object.defineProperty(window, 'sessionStorage', {configurable: true, value: memoryStorage()});
  const blocked = [];
  const realFetch = window.fetch;
  window.fetch = function(u, o){
    const method = String((o && o.method) || (u && u.method) || 'GET').toUpperCase();
    if(method !== 'GET' && method !== 'HEAD'){ blocked.push(method + ' ' + String(u && u.url || u)); return Promise.resolve(new Response(null, {status: 204})); }
    return realFetch.apply(window, arguments);
  };
  try{ navigator.sendBeacon = u => { blocked.push('BEACON ' + u); return true; }; }catch(e){}
  // Chrome logs an error for vibrate() before the first touch, and nobody holds the preview in hand
  try{ navigator.vibrate = () => true; }catch(e){}

  const save = (k, v) => mem.setItem('k7cut.' + k, JSON.stringify(v));
  const load = (k, d) => { const v = mem.getItem('k7cut.' + k); return v === null ? d : JSON.parse(v); };
  function freshSave(extra){
    for(const k of [...Array(mem.length).keys()].map(i => mem.key(i))) if(k.startsWith('k7cut.')) mem.removeItem(k);
    save('muted', !soundWanted); save('voice', true); save('allOpen', true); save('diff', 1); save('cur', 0); save('offset', 0);
    Object.keys(BRICKS).forEach(c => save('tuto3.' + c, true));
    Object.keys(extra || {}).forEach(k => save(k, extra[k]));
  }
  let soundWanted = false;
  mem.setItem('bs_lang', 'fr');
  freshSave();

  /* ---------- helpers ---------- */
  const STOP = {};
  const q = s => document.querySelector(s);
  const k7 = () => window.__k7;
  let gen = 0;
  function sleep(ms){ const g = gen; return new Promise(ok => setTimeout(ok, ms)).then(() => { if(g !== gen) throw STOP; }); }
  async function until(fn, maxMs){ const end = performance.now() + (maxMs || 600000); while(performance.now() < end){ if(fn()) return true; await sleep(50); } return false; }
  const click = s => { const el = typeof s === 'string' ? q(s) : s; if(el) el.click(); return !!el; };
  const dropOverlays = () => document.querySelectorAll('#stage .u-page, #stage .k7sheet').forEach(e => e.remove());
  async function leaveReward(){ if(click('.u-end .tomenu')) await sleep(120); }
  async function backToMenu(){
    const k = k7();
    if(k.state === 'play' || k.state === 'tuto'){ P.allowPause = true; click(document.querySelector('#stage > button')); await sleep(40); }
    if(k.state === 'pause'){ click('.k7pause .out'); await sleep(40); }
    P.allowPause = false;
    await leaveReward(); dropOverlays();
  }
  function scroller(el){
    if(!el) return null;
    const list = [el, ...el.querySelectorAll('*')];
    return list.find(n => n.scrollHeight > n.clientHeight + 8 && /auto|scroll/.test(getComputedStyle(n).overflowY)) || null;
  }
  async function glide(el, target, ms){
    if(!el) return await sleep(ms);
    const from = el.scrollTop, t0 = performance.now(), to = target == null ? el.scrollHeight - el.clientHeight : target;
    for(;;){ const k = Math.min(1, (performance.now() - t0)/ms); el.scrollTop = from + (to - from)*k; if(k >= 1) return; await sleep(40); }
  }
  // moves the cassette stage of the campaign screen the way a finger does: a touch on the right-hand neighbour
  function nextCassette(){
    const c = q('.k7home canvas'); if(!c) return; const r = c.getBoundingClientRect(), x = r.left + r.width*.88, y = r.bottom - 34;
    for(const type of ['pointerdown', 'pointerup']) c.dispatchEvent(new PointerEvent(type, {clientX: x, clientY: y, pointerId: 7, bubbles: true, pointerType: 'touch', isPrimary: true}));
  }

  /* ---------- cassette excerpts: a run only keeps the sections the scene needs ---------- */
  const fullSections = new Map();
  function excerpt(track, parts){
    if(!fullSections.has(track)) fullSections.set(track, track.sections);
    const all = fullSections.get(track), usable = all.filter(s => !s.call);
    track.sections = parts.map(([tier, bars]) => {
      const s = usable.find(x => x.tier === tier) || usable.filter(x => typeof x.tier === 'number').pop();
      return {...s, bars};
    });
    return 1 + parts.reduce((a, p) => a + p[1], 0);
  }

  /* ---------- pilot: real pointer events on the game canvas (same gestures as tests/bot.js) ---------- */
  const P = {on: false, err: null, acts: [], watch: [], seen: new WeakSet(), id: 10, last: null, log: [], allowPause: false, tuto: null, tutoWait: 2000, lastCode: ''};
  P.reset = () => { P.acts = []; P.watch = []; P.seen = new WeakSet(); P.last = null; P.tuto = null; };
  const codeOf = o => o.k === 'C' ? (o.shape === 'wide' ? 'CH' : o.shape === 'diag' ? 'CD' : 'CV') + (o.rev ? 'R' : '') : o.k;
  function dirOf(o){ const v = o.shape === 'wide' ? [1, .25] : o.shape === 'diag' ? [1, -1] : [.25, -1], w = o.rev ? -1 : 1; return [v[0]*w, v[1]*w]; }
  function spot(){ const r = k7().cv.getBoundingClientRect(); return [r.left + r.width*.6, r.top + r.height*.3]; }
  const fire = (type, x, y, id) => k7().cv.dispatchEvent(new PointerEvent(type, {clientX: x, clientY: y, pointerId: id, bubbles: true, pointerType: 'touch', isPrimary: true}));
  function pilotPlay(k){
    const t = k.now(), [cx, cy] = spot();
    for(const o of k.objs){
      if(P.seen.has(o) || o.done || !GEST.includes(o.k) || o.time - t > .4) continue;
      P.seen.add(o);
      const e = P.err ? P.err(o) : 0;
      P.watch.push({o, err: e});
      if(e !== null) P.acts.push({o, at: o.time + e/1000, stage: 0, id: P.id++});
    }
    for(const a of P.acts){
      const o = a.o;
      if(a.stage === 0){
        if(o.done){ a.fin = true; continue; }
        if(t < a.at) continue;
        P.lastCode = codeOf(o);
        if(o.k === 'D'){ fire('pointerdown', cx - 20, cy, a.id); fire('pointerdown', cx + 20, cy, a.id + 5000); fire('pointerup', cx - 20, cy, a.id); fire('pointerup', cx + 20, cy, a.id + 5000); a.fin = true; continue; }
        fire('pointerdown', cx, cy, a.id); a.stage = 1; a.t1 = t; continue;
      }
      if(o.k === 'C'){ const v = dirOf(o); fire('pointermove', cx + v[0]*28, cy + v[1]*28, a.id); fire('pointerup', cx + v[0]*36, cy + v[1]*36, a.id); a.fin = true; }
      else if(o.k === 'J'){ fire('pointermove', cx + 3, cy + 3, a.id); fire('pointerup', cx + 4, cy + 4, a.id); a.fin = true; }
      else if(o.k === 'H'){ if(t >= o.endTime){ fire('pointerup', cx, cy, a.id); a.fin = true; } }
      else if(o.k === 'S'){ const y = cy + (Math.floor((t - a.t1)/(k.bpb/4)) % 2 ? 40 : 0); fire('pointermove', cx, y, a.id); if(t >= o.endTime){ fire('pointerup', cx, y, a.id); a.fin = true; } }
    }
    P.acts = P.acts.filter(a => !a.fin);
  }
  // the frozen tutorial waits for the right gesture: leave it on screen long enough to read, then answer it
  function pilotTuto(k){
    const code = k.tuto, now2 = performance.now(), [cx, cy] = spot();
    if(!P.tuto || P.tuto.code !== code) P.tuto = {code, t0: now2, step: 0, id: P.id++};
    const T = P.tuto, wait = now2 - T.t0 - P.tutoWait;
    P.lastCode = code;
    if(wait < 0) return;
    if(code === 'J'){ if(!T.step++){ fire('pointerdown', cx, cy, T.id); fire('pointerup', cx + 2, cy + 2, T.id); } return; }
    if(code === 'D'){ if(!T.step++){ fire('pointerdown', cx - 20, cy, T.id); fire('pointerdown', cx + 20, cy, T.id + 5000); fire('pointerup', cx - 20, cy, T.id); fire('pointerup', cx + 20, cy, T.id + 5000); } return; }
    if(code === 'H'){ if(!T.step){ T.step = 1; fire('pointerdown', cx, cy, T.id); } else if(T.step === 1 && wait > 1100){ T.step = 2; fire('pointerup', cx, cy, T.id); } return; }
    if(code === 'S'){ if(!T.step){ fire('pointerdown', cx, cy, T.id); T.step = 1; T.at = 0; } else if(T.step < 12 && wait > T.at){ fire('pointermove', cx, cy + (T.step % 2 ? 40 : 0), T.id); T.step++; T.at = wait + 90; } else if(T.step === 12){ fire('pointerup', cx, cy, T.id); T.step = 13; } return; }
    if(!T.step++){ const b = code.replace('R', ''), s = code.endsWith('R') ? -1 : 1, v = b === 'CH' ? [1, 0] : b === 'CD' ? [1, -1] : [0, -1]; fire('pointerdown', cx, cy, T.id); fire('pointermove', cx + v[0]*40*s, cy + v[1]*40*s, T.id); fire('pointerup', cx + v[0]*44*s, cy + v[1]*44*s, T.id); }
  }
  // on a timer, not on frames: a slow or covered page must not turn the pilot's gestures into misses
  setInterval(() => {
    const k = k7();
    if(k && k.cv && P.on){
      if(k.state === 'play') pilotPlay(k);
      else if(k.state === 'tuto') pilotTuto(k);
      else if(k.state === 'pause' && !P.allowPause && !document.hidden) click('.k7pause .go');
      for(const w of P.watch) if(w.o.done && !w.logged){ w.logged = true; const r = {err: w.err, result: w.o.result, code: codeOf(w.o), wrong: !!w.o.wrongWay}; P.last = r; P.log.push(r); if(P.log.length > 400) P.log.shift(); }
      if(P.watch.length > 80) P.watch = P.watch.filter(w => !w.logged);
    }
  }, 8);
  const cycle = list => { let i = 0; return () => list[i++ % list.length]; };
  const steady = () => 0;

  // one pilot-played run; it restarts or stops before the song's end unless the scene wants the real end screen
  let restartRun = null;
  async function play(o){
    const k = k7(), tracks = k.tracks, bars = excerpt(tracks[o.i], o.parts);
    dropOverlays();
    P.err = o.err || steady;
    restartRun = () => { P.reset(); if(o.onStart) o.onStart(); k.start(o.i, o.lvl); };
    restartRun();
    P.on = true;
    await until(() => (o.stop && o.stop()) || k.state === 'over' || k.state === 'menu' || (!o.finish && k.state === 'play' && k.now()/k.bpb >= bars*4 - .5));
    restartRun = null;
    if(o.finish){ await until(() => q('.u-end'), 5000); P.on = false; }
    else if(k.state === 'over' && !o.keepOver){ await until(() => q('.u-end'), 2500); await leaveReward(); }
    return bars;
  }
  const rhythm = s => { const tot = s.perfect + s.good + s.ok + s.miss; return tot ? Math.round((s.perfect + .8*s.good + .4*s.ok)/tot*100) : 0; };

  /* ---------- caption ---------- */
  const legend = document.createElement('div');
  legend.id = 'gddLegend';
  legend.innerHTML = '<div class="gt"><b></b><span class="gh"></span><button type="button" hidden>Revoir la démo</button></div><p class="gd"></p><p class="gl"></p>';
  const setText = (sel, s) => { const el = legend.querySelector(sel); if(el.textContent !== s) el.textContent = s; };
  const caption = (title, detail) => { setText('.gt b', title); if(detail !== undefined) setText('.gd', detail); };
  const live = s => setText('.gl', s);
  function refreshHint(){
    const h = legend.querySelector('.gh'), btn = legend.querySelector('button');
    btn.hidden = !handed; h.hidden = handed;
    if(!handed) h.textContent = restartRun && !soundWanted ? 'toucher : son' : restartRun ? 'toucher : jouer' : 'toucher : à toi';
  }
  function mountLegend(scene){
    const st = document.createElement('style');
    st.textContent = `#gddLegend{position:fixed;top:0;left:0;right:0;z-index:2147483647;box-sizing:border-box;padding:4px 8px 5px;background:#15141a;color:#f7f1e6;border-bottom:2px solid #ffd60a;font:500 10.5px/13px Arial,Helvetica,sans-serif;pointer-events:none;overflow:hidden}
      #gddLegend .gt{display:flex;align-items:center;gap:8px;min-height:15px}
      #gddLegend .gt b{flex:1;min-width:0;font-weight:800;font-size:12px;line-height:15px;color:#ffd60a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      #gddLegend .gh{flex:none;font-size:10px;line-height:15px;opacity:.72}
      #gddLegend button{flex:none;pointer-events:auto;cursor:pointer;border:1.5px solid #f7f1e6;border-radius:4px;background:#ff1f7a;color:#fff;font:700 10px/14px Arial,Helvetica,sans-serif;padding:0 6px}
      #gddLegend p{margin:0}
      #gddLegend .gl{color:#22e3ff;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-height:13px}
      #gddLegend .gl:empty{display:none}`;
    document.head.appendChild(st);
    document.body.appendChild(legend);
    // the band fits the scene's longest text, so it does not change height from one phase to the next
    const fit = () => {
      const d = legend.querySelector('.gd'), l = legend.querySelector('.gl'), text = d.textContent, value = l.textContent;
      let h = 0;
      legend.style.height = 'auto';
      l.textContent = scene.live ? '-' : '';
      for(const t of scene.texts){ d.textContent = t; h = Math.max(h, legend.offsetHeight); }
      d.textContent = text; l.textContent = value;
      legend.style.height = h + 'px';
      document.body.style.paddingTop = h + 'px';
    };
    legend.querySelector('.gd').textContent = scene.texts[0];
    fit();
    window.addEventListener('resize', fit);
    if(scene.live) legend.querySelector('.gl').style.minHeight = '13px';
  }

  /* ---------- live slider values, kept for "Revoir la démo" ---------- */
  const liveValues = (() => { const m = location.hash.match(/tv=([^&]*)/); try{ return m ? JSON.parse(decodeURIComponent(m[1])) || {} : {}; }catch(e){ return {}; } })();
  const lim = i => { const w = Tuning.num('niveau.' + LEVELS[i].id + '.tolerance', LEVELS[i].win); return [Tuning.num('rythme.parfait', 55)*w, Tuning.num('rythme.bien', 110)*w, Tuning.num('rythme.fenetre', 200)*w].map(Math.round); };
  const discsAt = i => LEVELS[i].disc.map(x => x + Tuning.num('disques.ecart', 0));
  const LABELS = {perfect: 'PARFAIT', good: 'BIEN', ok: 'OK', miss: 'RATÉ'};

  /* ---------- chapter with most sliders: phases on a loop, a moved slider jumps to its phase ---------- */
  const MEC = {focus: null, last: null, changedAt: 0, cur: ''};
  const MEC_TEXTS = {
    timing: 'Gestes joués exprès en avance ou en retard. Curseurs : tolérance, PARFAIT, BIEN, tolérance du niveau, vitesse.',
    density: 'Même morceau à chaque niveau : compte les briques. Curseur : densité du niveau montré.',
    transe: 'Une série sans raté fait monter le combo et le décor. Curseurs : combo pour chaque palier de transe.',
    ralenti: 'Deux ratés de suite la ralentissent, les réussites la relancent. Curseur : réussites pour relancer la bande.',
    ko: 'En Roi, le pilote arrête de jouer jusqu\'à la casse. Curseur : Roi, ratés avant de casser.'
  };
  const mecJump = () => MEC.focus !== null;
  function phaseTiming(l){
    return async () => {
      MEC.cur = 'timing:' + l; caption('Mécaniques : timing, ' + LEVELS[l].name, MEC_TEXTS.timing); scene.live = () => { const a = lim(l), g = P.last, sp = Tuning.num('bande.vitesse', 1); return (g ? (g.err === null ? 'pas de geste' : (g.err > 0 ? '+' : '') + g.err + ' ms') + ' = ' + LABELS[g.result] + ' · ' : '') + 'limites ' + a.join(' / ') + ' ms · ×' + NUM(sp); };
      await play({i: 0, lvl: l, parts: [[1, 10]], err: cycle([15, -40, 70, -95, 130, -170, 205, -15, 30, -60, 260]), stop: mecJump});
    };
  }
  function phaseDensity(l){
    return async () => {
      MEC.cur = 'density:' + l; caption('Mécaniques : densité, ' + LEVELS[l].name, MEC_TEXTS.density); let n = 0;
      scene.live = () => LEVELS[l].name + ' : densité ' + NUM(Tuning.num('niveau.' + LEVELS[l].id + '.densite', LEVELS[l].dens)) + ' = ' + n + ' gestes sur 8 mesures';
      const k = k7(), t0 = performance.now();
      // the Roi rhythms are already full on most cassettes: Racines is where its slider still shows
      await play({i: l === 3 ? 3 : 4, lvl: l, parts: [[2, 8]], err: steady, stop: () => mecJump() || performance.now() - t0 > 13000, onStart(){ setTimeout(() => { try{ n = k.bars().reduce((a, b) => a + (b ? b.filter(s => s && GEST.includes(s.k)).length : 0), 0); }catch(e){} }, 0); }});
    };
  }
  function phaseTranse(){
    return async () => {
      MEC.cur = 'transe'; caption('Mécaniques : combo et transe', MEC_TEXTS.transe); const k = k7(); let doneAt = 0;
      scene.live = () => { const s = [1, 2, 3, 4].map(n => Tuning.num('transe.seuil' + n, [10, 25, 50, 100][n - 1])); return 'combo ' + (k.combo || 0) + ' · palier ' + TIER_NAMES[k.trance || 0] + ' · seuils ' + s.join(' / '); };
      await play({i: 0, lvl: 3, parts: [[3, 90]], err: steady, stop(){ if(mecJump()) return true; if(k.trance >= 4 && !doneAt) doneAt = performance.now(); return doneAt && performance.now() - doneAt > 5000; }});
    };
  }
  function phaseRalenti(){
    return async () => {
      MEC.cur = 'ralenti'; caption('Mécaniques : bande qui ralentit', MEC_TEXTS.ralenti); const k = k7(); let hits = 0, since = -1, skip = 0;
      const rec = () => Tuning.num('bande.reprise', 10);
      scene.live = () => since < 0 ? 'bande à pleine vitesse, ' + hits + ' réussites' : 'réussites ' + Math.min(hits - since, rec()) + ' / ' + rec() + ' · bande à ' + Math.round((k.rate || 1)*100) + ' %';
      const err = () => {
        if(skip > 0){ skip--; if(!skip) since = hits; return null; }
        hits++;
        if(since < 0 ? hits >= 6 : hits - since >= rec() + 5){ skip = 2; since = -1; hits = 0; }
        return 0;
      };
      await play({i: 0, lvl: 1, parts: [[1, 24]], err, stop(){ return mecJump() || (k.state === 'play' && k.now()/k.bpb > 60); }, onStart(){ hits = 0; since = -1; skip = 0; }});
    };
  }
  function phaseKo(){
    return async () => {
      MEC.cur = 'ko'; caption('Mécaniques : la bande casse en Roi', MEC_TEXTS.ko); const k = k7(); let played = 0;
      scene.live = () => 'ratés de suite ' + (k.stats ? Math.min(k.stats.miss, Tuning.num('niveau.roi.ko', 3)) : 0) + ' / ' + Tuning.num('niveau.roi.ko', 3);
      await play({i: 0, lvl: 3, parts: [[1, 16]], err: () => played++ < 8 ? 0 : null, stop: mecJump, keepOver: true, onStart(){ played = 0; }});
      if(mecJump()) return;
      await until(() => q('.u-end'), 4000); await sleep(1400); P.on = false; await leaveReward();
    };
  }
  function mecFocusOf(key){
    let m;
    if(/^rythme\.|^bande\.vitesse/.test(key)){ const l = MEC.cur.startsWith('timing:') ? +MEC.cur.split(':')[1] : 1; return {id: 'timing:' + l, run: phaseTiming(l), live: true}; }
    if((m = key.match(/^niveau\.(\w+)\.tolerance/))){ const l = LEVELS.findIndex(x => x.id === m[1]); return {id: 'timing:' + l, run: phaseTiming(l), live: true}; }
    if((m = key.match(/^niveau\.(\w+)\.densite/))){ const l = LEVELS.findIndex(x => x.id === m[1]); return {id: 'density:' + l, run: phaseDensity(l)}; }
    if(/^transe\./.test(key)) return {id: 'transe', run: phaseTranse()};
    if(/^bande\.reprise/.test(key)) return {id: 'ralenti', run: phaseRalenti(), live: true};
    if(/^niveau\.roi\.ko/.test(key)) return {id: 'ko', run: phaseKo()};
    return null;
  }
  async function runMecaniques(){
    const rotation = [phaseTiming(1), phaseDensity(0), phaseDensity(1), phaseDensity(2), phaseDensity(3), phaseTranse(), phaseRalenti(), phaseKo()];
    let i = 0;
    for(;;){
      let run;
      if(MEC.focus){ MEC.last = MEC.focus; MEC.focus = null; run = MEC.last.run; }
      else if(MEC.last && performance.now() - MEC.changedAt < 30000) run = MEC.last.run;
      else { MEC.last = null; run = rotation[i++ % rotation.length]; }
      await run();
      await sleep(30);
    }
  }

  /* ---------- scenes ---------- */
  const LOOP = async fn => { for(;;){ await fn(); await sleep(30); } };
  const titleScreen = async ms => { await backToMenu(); click('#k7hback'); await sleep(ms); };
  const campaign = async ms => { click('#k7tcamp'); await sleep(ms); };
  const toTitleAfterReward = async () => { await leaveReward(); await sleep(80); click('#k7hback'); };

  // walks through the real screens of a session, from the title to the end screen
  async function sessionWalk(step, withExtras){
    freshSave();
    const k = k7(), err = cycle([0, 20, -30, 0, 60, 0, -80, 0, 0, 40]);
    excerpt(k.tracks[0], [[1, withExtras ? 4 : 6]]);
    await titleScreen(0);
    step('Accueil', 2600); await sleep(2600);
    step('Campagne', 2400); click('#k7tcamp'); await sleep(2400);
    if(withExtras){ step('Cassettes', 3200); 0; await sleep(300); await glide(scroller(q('.u-page')), null, 2600); dropOverlays(); }
    step('Chargement'); click('#k7hplay'); // plus de page avant le niveau : le chargement montre les briques
    P.reset(); P.err = err; P.on = true;
    await until(() => k.state === 'play', 12000);
    step('Partie');
    if(withExtras){ await sleep(3500); step('Pause'); P.allowPause = true; click(document.querySelector('#stage > button')); await sleep(2400); click('.k7pause .go'); P.allowPause = false; step('Partie'); }
    await until(() => q('.u-end'), 90000);
    P.on = false;
    step('Fin de partie'); await sleep(1200); await glide(scroller(q('.u-end')), null, 4800);
  }

  const SCENES = {
    'vue-ensemble': {
      title: 'Vue d\'ensemble', texts: ['L\'écran titre, tel que le jeu s\'ouvre. Ce chapitre n\'a ni écran propre ni réglage.'],
      async run(){ await until(() => false); }
    },
    'boucle-de-jeu': {
      title: 'Boucle de jeu', texts: ['Une session complète sur les vrais écrans, du titre à l\'écran de fin, puis on recommence.'], live: true, auto: true,
      async run(){
        const names = ['Accueil', 'Campagne', 'Avant-niveau', 'Chargement', 'Partie', 'Fin de partie'];
        await LOOP(async () => {
          await sessionWalk(n => { live('Étape ' + (names.indexOf(n) + 1) + ' sur ' + names.length + ' : ' + n.toLowerCase()); refreshHint(); });
          await toTitleAfterReward();
        });
      }
    },
    'gestes-et-controles': {
      title: 'Gestes et contrôles', texts: ['Chaque brique nouvelle fige le jeu sur son tuto, le pilote fait le geste et la partie reprend.'], live: true,
      async run(){
        scene.live = () => { const c = k7().tuto || P.lastCode; return c ? (k7().tuto ? 'Tuto, ' : '') + BRICKS[c] : 'décompte'; };
        await LOOP(async () => {
          freshSave(); Object.keys(BRICKS).forEach(c => save('tuto3.' + c, false));
          await play({i: 9, lvl: 3, parts: [[1, 8], [2, 8], [3, 8]]});
        });
      }
    },
    mecaniques: {
      title: 'Mécaniques', texts: Object.values(MEC_TEXTS), live: true,
      async run(){ await runMecaniques(); }
    },
    'cassettes-et-morceaux': {
      title: 'Cassettes et morceaux', texts: ['Les 10 cassettes sur la scène, puis leur liste avec style et disques (progression d\'exemple).'], live: true,
      async run(){
        const k = k7();
        const sample = {}; k.tracks.forEach((t, i) => { sample[t.id + '.musicien'] = {score: 40000 + i*3000, stars: i % 4, discs: i % 4, pct: 55 + (i*7) % 40}; });
        await LOOP(async () => {
          freshSave({bests: sample}); await titleScreen(0); click('#k7tcamp'); await sleep(300);
          let i = 0;
          scene.live = () => { const t = k.tracks[i]; return 'Face ' + t.face + ' · ' + t.name + ' · ' + t.label; };
          for(; i < k.tracks.length; i++){ await sleep(2300); if(i < k.tracks.length - 1) nextCassette(); }
          i = 0; scene.live = () => 'Liste des cassettes';
          0; await sleep(500); await glide(scroller(q('.u-page')), null, 7000); await sleep(1200); dropOverlays();
        });
      }
    },
    progression: {
      title: 'Progression', texts: ['Une courte partie à environ 78 %, ses disques, puis les prix. Curseur : décalage des seuils de disques.'], live: true,
      async run(){
        const k = k7();
        let last = 0;
        scene.live = () => { const d = discsAt(1), s = k.stats, pct = s && s.perfect + s.good + s.ok + s.miss ? rhythm(s) : last; return 'rythme ' + pct + ' % · disques à ' + d.join(' / ') + ' % → ' + d.filter(x => pct >= x).length; };
        await LOOP(async () => {
          freshSave({allOpen: false});
          await play({i: 0, lvl: 1, parts: [[1, 6]], finish: true, err: cycle([0, 90, 0, 170, 0, 90, 0, null, 0, 90, 170, 0, 90, 0])});
          last = rhythm(k.stats);
          const rw = q('.u-end'), panel = rw && rw.querySelector('.u-rhy');
          await sleep(1000); if(panel) await glide(rw, panel.offsetTop - 12, 1200);
          await sleep(5600); await leaveReward(); 0; await sleep(3800); dropOverlays();
        });
      }
    },
    'cassette-de-la-mort': {
      title: 'Cassette de la mort', texts: ['Morceaux abrégés, du plus lent au plus rapide. Trois ratés et c\'est fini. Aucun score n\'est envoyé.'], live: true,
      async run(){
        const k = k7();
        scene.live = () => { const d = k.deathInfo; return d ? 'morceaux tenus ' + d.songs + ' · cœurs ' + Math.max(0, d.hearts) + ' / 3 · score ' + d.score : 'Records'; };
        await LOOP(async () => {
          freshSave(); dropOverlays();
          k.tracks.forEach(t => excerpt(t, [[1, 2]]));
          let n = 0; P.err = () => ++n % 14 === 0 ? null : 0;
          restartRun = () => { P.reset(); n = 0; k.death(); };
          restartRun(); P.on = true;
          await until(() => q('.u-death'), 300000);
          restartRun = null; P.on = false;
          await sleep(5500);
        });
      }
    },
    toile: {
      title: 'La toile', texts: ['Chaque geste peint : pile = tache nette, avance = jets, retard = coulures, raté = gris. Résultat à la fin.'], live: true,
      async run(){
        const k = k7(); let i = 0, cap = '';
        scene.live = () => cap || 'Partie en cours : ' + (k.tracks[i % k.tracks.length].name);
        await LOOP(async () => {
          cap = '';
          await play({i: i % k.tracks.length, lvl: 1, parts: [[2, 10]], finish: true, err: cycle([0, 0, -130, 0, 130, 0, 0, null, 0, -130, 0, 130])});
          const c = q('.u-artcap span'); cap = c ? c.textContent : '';
          await sleep(7000); await leaveReward(); click('#k7trophy'); cap = 'Mes œuvres'; await sleep(4500); dropOverlays(); i++;
        });
      }
    },
    personnages: {
      title: 'Personnages', texts: ['La cassette mascotte dans les menus, puis en partie le héros sur la bande et le public.'], live: true,
      async run(){
        const k = k7();
        await LOOP(async () => {
          freshSave(); await titleScreen(0); click('#k7tcamp'); scene.live = () => 'La mascotte bat la mesure, la cassette choisie saute';
          for(let i = 0; i < 3; i++){ await sleep(2200); nextCassette(); }
          await sleep(1200);
          scene.live = () => 'La roue à gauche de la bande, la foule en bas · combo ' + (k.combo || 0);
          let n = 0; const t0 = performance.now();
          await play({i: 0, lvl: 2, parts: [[3, 12]], err: () => ++n === 34 ? null : 0, stop: () => performance.now() - t0 > 24000});
        });
      }
    },
    'direction-artistique': {
      title: 'Direction artistique', texts: ['Les menus, puis l\'habillage de chaque cassette en partie : fond, illustration, décor animé.'], live: true,
      async run(){
        const k = k7();
        await LOOP(async () => {
          freshSave(); await titleScreen(0); scene.live = () => 'Menus : encre, rose, cyan, jaune, crème'; await sleep(2800); click('#k7tcamp'); await sleep(2800);
          for(let i = 0; i < k.tracks.length; i++){
            const t = k.tracks[i], t0 = performance.now(); scene.live = () => 'Partie : ' + t.name + ' · style ' + t.style;
            await play({i, lvl: 1, parts: [[2, 10]], stop: () => performance.now() - t0 > 6500});
          }
          await backToMenu(); await sleep(60);
        });
      }
    },
    son: {
      title: 'Son', texts: ['Le navigateur bloque le son avant un toucher : touche l\'écran pour entendre le pilote jouer.'], live: true,
      async run(){
        const k = k7();
        scene.live = () => (soundWanted ? 'Son actif' : 'Son coupé') + ' · combo ' + (k.combo || 0) + ' · palier ' + TIER_NAMES[k.trance || 0];
        await LOOP(() => play({i: 0, lvl: 1, parts: [[1, 8], [2, 8], [3, 8]], err: cycle([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null])}));
      }
    },
    interface: {
      title: 'Interface', texts: ['Tous les écrans du jeu à la suite. La légende nomme celui qu\'on regarde.'], live: true,
      async run(){
        const step = n => { live('Écran : ' + n); refreshHint(); };
        await LOOP(async () => {
          step('Ouverture'); root.classList.add('splash'); await sleep(2500); root.classList.remove('splash');
          await sessionWalk(step, true);
          await leaveReward(); await sleep(80);
          step('Mes œuvres'); click('#k7trophy'); await sleep(3000); dropOverlays();
          click('#k7hback'); await sleep(100);
          step('Records'); click('#k7trec'); await sleep(3200); dropOverlays();
          step('Réglages'); click('#k7topt'); await sleep(300); await glide(scroller(q('.u-page')), null, 3000); dropOverlays();
        });
      }
    },
    monetisation: {
      title: 'Monétisation', texts: ['Entre deux morceaux : faux encart de test ou autre jeu du studio. Curseur : part de pub maison.'], live: true,
      async run(){
        const ads = window.BSAds; let draws = 0, house = 0;
        scene.live = () => (draws ? draws + ' pubs, dont ' + house + ' maison · ' : '') + 'part réglée ' + NUM(window.BSPromo ? BSPromo.SHARE : 0) + (window.BSPromo && !BSPromo.available().length ? ' · catalogue absent' : '');
        ads.config.debug = true;
        await LOOP(async () => {
          await sleep(1200);
          const shown = realInterstitial({trackIndex: 5});
          await sleep(300);
          const isHouse = !!q('#bsPromo'); draws++; if(isHouse) house++;
          await sleep(3000);
          click(isHouse ? '#bsPromo .later' : '.bsAdBtn');
          await shown;
          if(draws % 4 === 0){ live('Réglages : Premium, achat coupé dans l\'aperçu'); click('#k7topt'); await sleep(300); const sh = q('.k7sheet'), pr = sh && sh.querySelector('#k7prem'), sc = scroller(sh); if(sc && pr) await glide(sc, Math.max(0, pr.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 120), 700); await sleep(2800); dropOverlays(); }
        });
      }
    },
    technique: {
      title: 'Technique', texts: ['Pas d\'écran technique : le plus proche est Réglages, avec calage, labo, langues et version.'],
      async run(){
        await sleep(500); click('#k7topt'); await sleep(400);
        await LOOP(async () => { const s = scroller(q('.u-page')); await glide(s, null, 5000); await sleep(2500); await glide(s, 0, 2000); await sleep(1500); });
      }
    }
  };
  const scene = SCENES[SLUG] || null;

  /* ---------- touch: first one wakes the sound, next one hands the game over ---------- */
  let handed = false;
  function takeOver(){ handed = true; gen++; P.on = false; restartRun = null; if(window.__k7 && k7().state === 'pause') click('.k7pause .go'); live('À toi de jouer'); refreshHint(); }
  window.addEventListener('pointerdown', e => {
    if(!e.isTrusted || handed || !scene) return;
    if(e.target && e.target.closest && e.target.closest('#gddLegend')) return;
    const first = !soundWanted;
    if(first){ soundWanted = true; save('muted', false); }
    // the game clock moves from the page timer to the audio clock: the run must restart inside this touch
    if(first && restartRun){ restartRun(); refreshHint(); return; }
    takeOver();
  }, true);

  /* ---------- start, before main.js boots the game ---------- */
  let realInterstitial = null;
  document.addEventListener('DOMContentLoaded', () => {
    if(window.BSAds){ realInterstitial = BSAds.maybeInterstitial.bind(BSAds); BSAds.maybeInterstitial = () => Promise.resolve(false); }
    if(window.BSPremium){ BSPremium.canBuy = false; BSPremium.buy = () => Promise.resolve(false); BSPremium.restore = () => Promise.resolve(false); }
    window.__gddPreview = {slug: SLUG, pilot: P, blocked, phase: () => MEC.cur, get handed(){ return handed; }};
    if(!scene) return;
    mountLegend(scene);
    caption(scene.title, scene.texts[0]);
    legend.querySelector('button').addEventListener('click', () => {
      location.hash = 'tv=' + encodeURIComponent(JSON.stringify(liveValues));
      location.reload();
    });
    Tuning.onChange(next => {
      Object.assign(liveValues, next);
      if(SLUG !== 'mecaniques' || handed) return;
      const key = Object.keys(next)[0], f = key && mecFocusOf(key);
      if(!f) return;
      MEC.changedAt = performance.now();
      if(f.id === MEC.cur && f.live) return;
      MEC.focus = f;
    });
    setInterval(() => { if(handed) return; if(scene.live && typeof scene.live === 'function'){ try{ live(scene.live()); }catch(e){} } refreshHint(); }, 250);
    refreshHint();
    (function wait(){
      if(!window.__k7 || !k7().cv) return setTimeout(wait, 30);
      setTimeout(() => { gen++; Promise.resolve().then(() => scene.run()).catch(e => { if(e !== STOP) console.error('[gdd-preview]', e); }); }, 400);
    })();
  });
})();
