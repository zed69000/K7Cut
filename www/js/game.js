window.GAMES = window.GAMES || {};
(function(){
const G = window.GAMES = window.GAMES || {};

/* =========================================================
   K7 CUT — un runner rythmique en cassettes
   ========================================================= */
const INK = '#1c1b19', PAPER = '#f4f0e6', RED = '#d7263d';
const FONT = '"Rubik Mono One", "Silkscreen", monospace';
const MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10];
const ALL = ['kick','snare','hat','bass','chords','arp','perc','lead'];

const TRACKS = [
  { id: 'soleil', face: 'A', name: 'Soleil', style: 'disco', label: 'Disco · 104 BPM', bpm: 104, root: 65.41, scale: MAJ, prog: [0, 5, 3, 4], swing: 0, cost: 0,
    bg: ['#f2cd4c', '#d6a93a'], deco: 'rays', gestures: 'Couper · Sauter',
    sections: [
      {name: 'Intro', bars: 4, tier: 0, call: true, acts: 'CJ', layers: ['kick','bass']},
      {name: 'Couplet', bars: 8, tier: 1, acts: 'CJ', layers: ['kick','bass','hat','snare']},
      {name: 'Couplet', bars: 8, tier: 1, acts: 'CJ', layers: ['kick','bass','hat','snare','chords']},
      {name: 'Pause', bars: 4, tier: 'rest', acts: 'C', layers: ['chords','hat','perc']},
      {name: 'Refrain', bars: 8, tier: 2, acts: 'CJ', layers: ['kick','bass','hat','snare','chords','perc']},
      {name: 'Refrain', bars: 8, tier: 2, acts: 'CJ', layers: ALL},
      {name: 'Final', bars: 6, tier: 3, acts: 'CJ', layers: ALL},
      {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: ['chords']}
    ]},
  { id: 'bobine', face: 'B', name: 'Bobine', style: 'hiphop', label: 'Boom bap · 88 BPM', bpm: 88, root: 55, scale: MIN, prog: [0, 5, 6, 4], swing: .2, cost: 30,
    bg: ['#f2a65a', '#d9763f'], deco: 'vinyl', gestures: '+ Scratch',
    sections: [
      {name: 'Intro', bars: 4, tier: 0, call: true, acts: 'CJ', layers: ['kick','snare','perc']},
      {name: 'Couplet', bars: 8, tier: 1, acts: 'CJ', layers: ['kick','snare','hat','bass','perc']},
      {name: 'Scratch !', bars: 4, tier: 1, call: true, acts: 'SC', layers: ['kick','snare','hat','bass']},
      {name: 'Couplet', bars: 8, tier: 1, acts: 'CJS', layers: ['kick','snare','hat','bass','chords','perc']},
      {name: 'Pause', bars: 4, tier: 'rest', acts: 'C', layers: ['chords','perc']},
      {name: 'Refrain', bars: 8, tier: 2, acts: 'CJS', layers: ['kick','snare','hat','bass','chords','perc','lead']},
      {name: 'Final', bars: 8, tier: 3, acts: 'CJS', layers: ALL},
      {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: ['chords','perc']}
    ]},
  { id: 'neon', face: 'C', name: 'Néon', style: 'synthwave', label: 'Synthwave · 116 BPM', bpm: 116, root: 82.41, scale: MIN, prog: [0, 5, 2, 6], swing: 0, cost: 80,
    bg: ['#f58fb2', '#c9568a'], deco: 'grid', gestures: '+ Notes longues',
    sections: [
      {name: 'Intro', bars: 4, tier: 0, call: true, acts: 'CJ', layers: ['kick','bass','chords']},
      {name: 'Couplet', bars: 8, tier: 1, acts: 'CJ', layers: ['kick','snare','hat','bass','chords']},
      {name: 'Maintiens !', bars: 4, tier: 1, call: true, acts: 'HC', layers: ['kick','bass','chords','arp']},
      {name: 'Couplet', bars: 8, tier: 1, acts: 'CJH', layers: ['kick','snare','hat','bass','chords','arp']},
      {name: 'Pause', bars: 4, tier: 'rest', acts: 'C', layers: ['chords','arp']},
      {name: 'Refrain', bars: 8, tier: 2, acts: 'CJH', layers: ALL},
      {name: 'Final', bars: 8, tier: 3, acts: 'CJH', layers: ALL},
      {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: ['chords','arp']}
    ]},
  { id: 'rush', face: 'D', name: 'Rush', style: 'dnb', label: 'Drum & bass · 132 BPM', bpm: 132, root: 73.42, scale: MIN, prog: [0, 3, 5, 4], swing: 0, cost: 150,
    bg: ['#6fd3c7', '#2f9c95'], deco: 'stripes', gestures: 'Tout à la fois',
    sections: [
      {name: 'Intro', bars: 4, tier: 1, call: true, acts: 'CJ', layers: ['kick','hat','bass']},
      {name: 'Montée', bars: 8, tier: 2, acts: 'CJS', layers: ['kick','snare','hat','bass','chords']},
      {name: 'Montée', bars: 8, tier: 2, acts: 'CJH', layers: ['kick','snare','hat','bass','chords','arp']},
      {name: 'Pause', bars: 4, tier: 'rest', acts: 'C', layers: ['chords','arp']},
      {name: 'Drop', bars: 8, tier: 3, acts: 'CJSH', layers: ALL},
      {name: 'Drop', bars: 8, tier: 3, acts: 'CJSH', layers: ALL},
      {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: ['chords']}
    ]}
];

function rngFrom(str){ let h = 2166136261; for(const c of str){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } let s = h >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; }; }

G.trancheroute = { mount(stage, api){
  if(!document.getElementById('font-rubikmono')){ const l = document.createElement('link'); l.id = 'font-rubikmono'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap'; document.head.appendChild(l); }
  const {cv, ctx, W, H, pt} = api.canvas();
  let muted = api.store.load('muted', false);
  const TAPEY = Math.round(H*.48), TT = 30, Y0 = TAPEY - TT/2, HXs = Math.round(W*.26);
  const REELY = Math.round(H*.83), REELR = Math.min(W*.19, H*.11), EQY = Math.round(H*.665);
  let PPB = 100;
  let actx = null, master = null, music = null, pump = null, t0 = 0, useAudio = false;
  let tr = null, sections, totalBars, bpb, objs, bits, judges, state = 'menu', score, combo, maxCombo, hearts, stats, beatNow, nextStep, jumpT, hurtT, energy, events, bump, flashR, gesture, motif, notesRun, holdState, scratchState, rot, finished;

  /* ---------- sauvegarde ---------- */
  const bank = () => api.load('notes', 0);
  const bests = () => api.load('bests', {});
  const unlocked = t => t.cost === 0 || api.load('unlock.' + t.id, false);

  /* ---------- audio ---------- */
  function audioInit(){
    if(muted || actx) return;
    try{
      actx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = actx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 5; comp.attack.value = .003; comp.release.value = .12;
      master = actx.createGain(); master.gain.value = .85; master.connect(comp).connect(actx.destination);
      pump = actx.createGain(); pump.connect(master);
      music = actx.createGain(); music.gain.value = .9; music.connect(pump);
    }catch(e){ actx = null; }
  }
  const now = () => useAudio ? actx.currentTime - t0 : performance.now()/1000 - t0;
  let noiseBuf = null;
  function env(gn, T, v, a, d, sus){ gn.gain.setValueAtTime(0, T); gn.gain.linearRampToValueAtTime(v, T + a); if(sus){ gn.gain.setValueAtTime(v, T + a + sus); } gn.gain.exponentialRampToValueAtTime(.0001, T + a + (sus || 0) + d); }
  function osc(bus, type, f, at, dur, vol, o2){
    if(!useAudio) return null; o2 = o2 || {};
    const T = at + t0, o = actx.createOscillator(), gn = actx.createGain(); o.type = type; o.frequency.setValueAtTime(f, T);
    if(o2.glide) o.frequency.exponentialRampToValueAtTime(o2.glide, T + (o2.gt || dur*.8));
    if(o2.detune) o.detune.value = o2.detune;
    env(gn, T, vol, o2.a || .004, dur, o2.sus);
    let n = o; if(o2.lp){ const fl = actx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(o2.lp[0], T); fl.frequency.exponentialRampToValueAtTime(o2.lp[1], T + (o2.sus || 0) + dur); fl.Q.value = o2.lp[2] || 3; o.connect(fl); n = fl; }
    n.connect(gn).connect(bus); o.start(T); o.stop(T + (o2.a || 0) + (o2.sus || 0) + dur + .05); return o;
  }
  function noise(bus, at, dur, vol, type, f1, f2, swell){
    if(!useAudio) return; if(!noiseBuf){ noiseBuf = actx.createBuffer(1, actx.sampleRate*6, actx.sampleRate); const d = noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i] = Math.random()*2 - 1; }
    const T = at + t0, s = actx.createBufferSource(), f = actx.createBiquadFilter(), gn = actx.createGain(); s.buffer = noiseBuf; f.type = type; f.frequency.setValueAtTime(f1, T); if(f2) f.frequency.exponentialRampToValueAtTime(f2, T + dur); f.Q.value = type === 'bandpass' ? 3 : 1;
    if(swell){ gn.gain.setValueAtTime(.001, T); gn.gain.exponentialRampToValueAtTime(vol, T + dur*.95); gn.gain.linearRampToValueAtTime(0, T + dur); } else env(gn, T, vol, .002, dur);
    s.connect(f).connect(gn).connect(bus); s.start(T, Math.random()*.5); s.stop(T + dur + .05);
  }
  const freq = (deg, oct) => { const sc = tr.scale, d = ((deg % 7) + 7) % 7, o = Math.floor(deg/7); return tr.root*Math.pow(2, (sc[d] + 12*o)/12)*(oct || 1); };
  function hit(ch, at){ events.push({ch, at}); }
  function duck(at){ if(!useAudio || !['disco','synthwave'].includes(tr.style)) return; const T = at + t0; pump.gain.cancelScheduledValues(T); pump.gain.setValueAtTime(.35, T); pump.gain.linearRampToValueAtTime(1, T + 60/tr.bpm*.6); }

  /* instruments */
  const I = {
    kick(at, v){ osc(music, 'sine', 170, at, .24, .95*(v || 1), {glide: 40, gt: .12}); osc(music, 'square', 1100, at, .01, .1); duck(at); hit('kick', at); },
    snare(at, v){ noise(music, at, .18, .42*(v || 1), 'highpass', 1500); osc(music, 'triangle', 210, at, .1, .28, {glide: 130}); hit('snare', at); },
    clap(at){ for(let i=0;i<3;i++) noise(music, at + i*.011, .09, .3, 'bandpass', 1300); hit('snare', at); },
    hat(at, v, open){ noise(music, at, open ? .18 : .035, v, 'highpass', 8500); hit('hat', at); },
    bass(at, f, dur, kind){
      if(kind === 'sub'){ osc(music, 'sine', f, at, dur, .5, {a: .01}); osc(music, 'triangle', f*2, at, dur*.5, .08); }
      else if(kind === 'reese'){ osc(music, 'sawtooth', f, at, dur, .16, {detune: -14, lp: [700, 300, 2]}); osc(music, 'sawtooth', f, at, dur, .16, {detune: 14, lp: [700, 300, 2]}); osc(music, 'sine', f/2, at, dur, .3); }
      else osc(music, 'sawtooth', f, at, dur, .24, {lp: [kind === 'acid' ? 1600 : 900, 140, kind === 'acid' ? 9 : 5]});
      hit('bass', at);
    },
    chord(at, degs, dur, kind){
      degs.forEach((d, i) => {
        if(kind === 'pad') osc(music, 'sawtooth', freq(d, 4), at, .3, .035, {a: .12, sus: dur, lp: [1800, 600, 1], detune: i*6 - 6});
        else if(kind === 'rhodes'){ osc(music, 'sine', freq(d, 4), at, dur, .07); osc(music, 'triangle', freq(d, 8), at, dur*.4, .015); }
        else osc(music, 'square', freq(d, 4), at, dur, .04, {lp: [3000, 700, 2]});
      }); hit('chords', at);
    },
    pluck(bus, at, f, v){ osc(bus, 'square', f, at, .16, v, {lp: [4200, 900, 4]}); osc(bus, 'triangle', f*2, at, .1, v*.4); hit('lead', at); },
    bell(at, f, v){ osc(music, 'sine', f, at, .35, v); osc(music, 'sine', f*2.76, at, .12, v*.3); hit('lead', at); },
    boing(bus, at, f, v){ osc(bus, 'triangle', f, at, .18, v, {glide: f*2, gt: .12}); },
    wik(at, up){ osc(master, 'sawtooth', up ? 260 : 900, at, .09, .14, {glide: up ? 900 : 240, gt: .08, lp: [2400, 1200, 6]}); noise(master, at, .07, .12, 'bandpass', up ? 900 : 2400, up ? 2600 : 700); },
    perc(at, kind){ if(kind === 'cowbell'){ osc(music, 'square', 560, at, .08, .05); osc(music, 'square', 845, at, .08, .04); } else if(kind === 'crackle'){ noise(music, at, .015, .05, 'highpass', 3000); } else if(kind === 'tom'){ osc(music, 'sine', 200, at, .15, .25, {glide: 90}); } else noise(music, at, .05, .1, 'bandpass', 4000); hit('hat', at); },
    crash(at){ noise(music, at, 1.6, .28, 'highpass', 3200); osc(music, 'sine', 80, at, .6, .5, {glide: 38}); hit('kick', at); },
    riser(at, dur){ noise(music, at, dur, .25, 'bandpass', 300, 7000, true); }
  };

  /* ---------- structure de la chanson ---------- */
  function sectionOf(bar){ if(bar < 1) return null; let b = 1; for(const s of sections){ if(bar < b + s.bars) return {...s, start: b, idx: sections.indexOf(s)}; b += s.bars; } return null; }
  function chordOf(bar){ return tr.prog[((bar - 1) % tr.prog.length + tr.prog.length) % tr.prog.length]; }
  function scheduleStep(s){
    const beat = s/4, bar = Math.floor(beat/4), p = s % 16, sw = (p % 2 ? tr.swing*bpb/4 : 0), at = beat*bpb + sw;
    if(bar === 0){ if(p % 4 === 0){ osc(master, 'square', p === 0 ? 1568 : 1046, at, .06, .12); hit('kick', at); } if(p === 0) I.riser(at, 4*bpb); return; }
    const sec = sectionOf(bar); if(!sec) return;
    const L = new Set(sec.layers), st = tr.style, deg = chordOf(bar), chord = [deg, deg + 2, deg + 4];
    const lastBar = bar === sec.start + sec.bars - 1, next = sectionOf(bar + 1);
    if(bar === sec.start && p === 0 && bar > 1 && sec.tier !== 'rest') I.crash(at);
    if(lastBar && next && next.tier !== 'rest' && p === 0) I.riser(at, 4*bpb);
    if(lastBar && next && p >= 12 && L.has('snare')) I.snare(at, .4 + (p - 12)*.15);
    // batterie selon le style
    if(L.has('kick')){
      if(st === 'disco' && p % 4 === 0) I.kick(at);
      if(st === 'hiphop' && [0, 7, 10].includes(p)) I.kick(at, p ? .8 : 1);
      if(st === 'synthwave' && (p === 0 || p === 8 || (sec.tier >= 2 && p === 11))) I.kick(at);
      if(st === 'dnb' && [0, 10].includes(p)) I.kick(at);
    }
    if(L.has('snare')){
      if(st === 'disco' && (p === 4 || p === 12)){ I.snare(at, .7); I.clap(at); }
      if(st === 'hiphop' && (p === 4 || p === 12)) I.snare(at, 1.1);
      if(st === 'synthwave' && (p === 4 || p === 12)) { I.snare(at, .9); I.clap(at); }
      if(st === 'dnb' && (p === 4 || p === 12 || (sec.tier >= 3 && p === 15))) I.snare(at, p === 15 ? .5 : 1);
    }
    if(L.has('hat')){
      if(st === 'disco'){ if(p % 4 === 2) I.hat(at, .14, true); else if(sec.tier >= 2 && p % 2) I.hat(at, .05); }
      if(st === 'hiphop' && p % 2 === 0) I.hat(at, p % 4 ? .06 : .1);
      if(st === 'synthwave') I.hat(at, p % 4 === 2 ? .09 : .035);
      if(st === 'dnb') I.hat(at, p % 2 ? .05 : .1, p % 8 === 6);
    }
    if(L.has('perc')){
      if(st === 'disco' && [3, 6, 11, 14].includes(p)) I.perc(at, 'cowbell');
      if(st === 'hiphop' && Math.random() < .3) I.perc(at, 'crackle');
      if(st === 'hiphop' && p === 14 && bar % 2) I.perc(at, 'tom');
    }
    // basse
    if(L.has('bass')){
      const r = freq(deg, 1);
      if(st === 'disco' && p % 2 === 0) I.bass(at, p % 4 ? r*2 : r, .16, sec.tier >= 2 ? 'acid' : 'saw');
      if(st === 'hiphop' && (p === 0 || p === 10)) I.bass(at, r, p ? .4 : .7, 'sub');
      if(st === 'synthwave' && p % 2 === 0) I.bass(at, r, .12, 'saw');
      if(st === 'dnb' && (p === 0 || p === 6 || p === 10)) I.bass(at, r, p ? .3 : .55, 'reese');
    }
    if(L.has('chords')){
      if(st === 'disco' && [2, 6, 10, 14].includes(p)) I.chord(at, chord, .12, 'stab');
      if(st === 'hiphop' && (p === 0 || p === 8)) I.chord(at, chord, .7, 'rhodes');
      if((st === 'synthwave' || st === 'dnb') && p === 0) I.chord(at, chord, 4*bpb*.9, 'pad');
    }
    if(L.has('arp') && p % 2 === 0){ const seq = [0, 2, 4, 7, 4, 2, 0, 4]; I.pluck(music, at, freq(deg + seq[(p/2) % 8], 4), .03); }
    if(L.has('lead') && (p === 0 || p === 6 || p === 10) && sec.tier !== 'rest'){ I.bell(at, freq(motif[(bar % 2)*8 + (p >> 1)], 8), .035); }
    // appel : en mesure d'écoute, la mesure suivante joue ses notes
    if(isListen(bar) && p % 2 === 0){
      const nb = buildBar(bar + 1); const e = nb && nb[p/2];
      if(e){ const f = freq(e.deg, 4);
        if(e.k === 'C') I.pluck(master, at, f, .1);
        if(e.k === 'J') I.boing(master, at, freq(deg, 2), .14);
        if(e.k === 'H') osc(master, 'square', f, at, .08, .07, {sus: e.len*bpb/2, lp: [2500, 1500, 2]});
        if(e.k === 'S'){ for(let i=0;i<e.len;i++) I.wik(at + i*bpb/2, i % 2 === 0); }
      }
    }
  }

  /* ---------- motifs déterministes : chaque cassette se joue toujours pareil ---------- */
  const isListen = bar => { const s = sectionOf(bar); return !!(s && s.call && (bar - s.start) % 2 === 0); };
  const barCache = {};
  function buildBar(bar){
    if(barCache[bar] !== undefined) return barCache[bar];
    const sec = sectionOf(bar); if(!sec || isListen(bar)) return barCache[bar] = null;
    const rng = rngFrom(tr.id + ':' + bar), acts = sec.acts, slots = new Array(8).fill(null);
    const mdeg = i => motif[(bar % 2)*8 + i];
    if(sec.tier === 'rest'){
      if(acts.includes('C') && rng() < .7) slots[0] = {k: 'C'};
      for(let i=1;i<8;i++) if(rng() < .55) slots[i] = {k: rng() < .2 ? 'A' : 'N'};
      if(bar === sec.start + 1 && rng() < .9) slots[6] = {k: 'L'};
    } else {
      const tier = sec.tier;
      let pos = tier === 0 ? [0, 4] : tier === 1 ? [0, 2, 4, 6].filter((_, i) => i === 0 || rng() < .75) : tier === 2 ? [0, 2, 4, 6].concat([1, 3, 5, 7].filter(() => rng() < .3)) : [0, 1, 2, 3, 4, 5, 6, 7].filter(i => i % 2 === 0 || rng() < .55);
      let blocked = new Set();
      // gestes longs d'abord
      if(acts.includes('H') && rng() < (sec.call ? 1 : .45)){ const s0 = [0, 2, 4][Math.floor(rng()*3)], len = Math.min(8 - s0, 3 + Math.floor(rng()*3)); slots[s0] = {k: 'H', len}; for(let i=s0;i<s0 + len + 1;i++) blocked.add(i); }
      else if(acts.includes('S') && rng() < (sec.call ? 1 : .4)){ const s0 = [0, 2, 4][Math.floor(rng()*3)], len = Math.min(8 - s0, 2 + Math.floor(rng()*3)); slots[s0] = {k: 'S', len}; for(let i=s0;i<s0 + len + 1;i++) blocked.add(i); }
      for(const i of pos){ if(blocked.has(i) || slots[i]) continue;
        let k = 'C'; if(acts.includes('J') && rng() < .32 && !(slots[i - 1] && slots[i - 1].k === 'J')) k = 'J';
        if(!acts.includes('C') && !acts.includes('J')) continue; if(!acts.includes('C')) k = 'J';
        slots[i] = {k}; }
      for(let i=0;i<8;i++) if(!slots[i] && !blocked.has(i) && rng() < .14) slots[i] = {k: tier >= 1 && rng() < .35 ? 'A' : 'N'};
    }
    slots.forEach((s, i) => { if(s){ s.deg = mdeg(i); if(s.k === 'J' && sec.tier !== 'rest' && sec.tier >= 2 && rng() < .3) s.bomb = true; if(s.k === 'C') s.shape = ['block','block','tall','flyer'][Math.floor(rng()*4)]; } });
    return barCache[bar] = slots;
  }
  function spawnBar(bar){
    const slots = buildBar(bar); if(!slots) return;
    slots.forEach((s, i) => { if(!s) return; const beat = bar*4 + i/2;
      objs.push({...s, beat, time: beat*bpb, endBeat: beat + (s.len || 0)/2, endTime: (beat + (s.len || 0)/2)*bpb, done: false, born: 0, holding: false, strokes: 0, need: Math.max(2, s.len || 0)}); });
  }

  /* ---------- partie ---------- */
  function startTrack(t){
    tr = t; sections = t.sections; totalBars = 1 + sections.reduce((a, s) => a + s.bars, 0); bpb = 60/t.bpm; PPB = Math.max(86, W*.23)*Math.pow(100/t.bpm, .25);
    const r = rngFrom(t.id + 'motif'); motif = []; let d = 4; for(let i=0;i<16;i++){ d += [-2, -1, -1, 0, 1, 1, 2][Math.floor(r()*7)]; d = Math.max(0, Math.min(9, d)); motif.push(d); }
    for(const k in barCache) delete barCache[k];
    objs = []; bits = []; judges = []; score = 0; combo = 0; maxCombo = 0; hearts = 3; stats = {perfect: 0, good: 0, ok: 0, miss: 0}; notesRun = 0;
    beatNow = 0; nextStep = 0; jumpT = 9; hurtT = 0; energy = {kick: 0, snare: 0, hat: 0, bass: 0, chords: 0, lead: 0}; events = []; bump = 0; flashR = 0; gesture = null; holdState = null; scratchState = null; rot = 0; finished = false; spawned = 1; secShown = -1;
    hideMenu(); api.closeEnd(); api.hud(`FACE ${t.face} · ${t.name.toUpperCase()}`);
    muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted;
    if(useAudio){ actx.resume(); master.gain.cancelScheduledValues(actx.currentTime); master.gain.setValueAtTime(.85, actx.currentTime); pump.gain.cancelScheduledValues(actx.currentTime); pump.gain.setValueAtTime(1, actx.currentTime); }
    t0 = (useAudio ? actx.currentTime : performance.now()/1000) + .25;
    state = 'play';
  }
  let spawned = 1;

  const grade = d => { const a = Math.abs(d); return a < .055 ? 'perfect' : a < .11 ? 'good' : 'ok'; };
  const LABEL = {perfect: 'PARFAIT', good: 'BIEN', ok: 'OK', miss: 'RATÉ'};
  const xOf = beat => HXs + (beat - beatNow)*PPB;
  function resolve(o, g, t, dir){
    o.done = true; o.result = g; stats[g]++;
    const x = xOf(Math.min(o.beat, Math.max(o.beat, beatNow))), y = objY(o);
    if(g === 'miss'){
      combo = 0; hearts--; hurtT = .6; flashR = 1; bump = 1;
      osc(master, 'sawtooth', 110, t, .3, .22, {glide: 50}); noise(master, t, .2, .3, 'lowpass', 900);
      api.vibe(120); api.shake(9); confetti(x, y, [INK, RED], 14, 1.1);
      if(hearts <= 0) fail();
    } else {
      combo++; maxCombo = Math.max(maxCombo, combo);
      const base = g === 'perfect' ? 100 : g === 'good' ? 60 : 25; score += Math.round(base*(1 + Math.min(combo, 50)/10));
      const when = Math.max(t, o.time);
      // le joueur joue la mélodie
      if(o.k === 'C'){ I.pluck(master, when, freq(o.deg, 4), g === 'perfect' ? .13 : .08); noise(master, t, .05, .2, 'highpass', 5000); split(o, dir); }
      if(o.k === 'J') I.boing(master, when, freq(chordOf(Math.floor(o.beat/4)), 2), .14);
      confetti(x, y - 10, g === 'perfect' ? [RED, PAPER, INK] : [PAPER, INK], g === 'perfect' ? 16 : 8, 1);
      if(g === 'perfect') bump = Math.max(bump, .5);
      api.vibe(g === 'perfect' ? 16 : 8);
      if(combo % 25 === 0) judges.push({txt: combo + ' COMBO', x: W/2, y: H*.2, t: 0, big: true});
    }
    judges.push({txt: LABEL[g], g, x: o.k === 'H' || o.k === 'S' ? HXs + 30 : x, y: Y0 - 74, t: 0});
  }

  /* ---------- gestes ---------- */
  api.on(cv, 'pointerdown', e => {
    if(state !== 'play') return;
    const p = pt(e), t = now(); cv.setPointerCapture(e.pointerId);
    // note longue ?
    const h = objs.find(o => o.k === 'H' && !o.done && !o.holding && Math.abs(t - o.time) < .18);
    if(h){ h.holding = true; h.startGrade = grade(t - h.time); holdState = {o: h, voice: holdVoice(h)}; api.vibe(10); return; }
    // zone de scratch ?
    const s = objs.find(o => o.k === 'S' && !o.done && t > o.time - .15 && t < o.endTime);
    if(s){ scratchState = {o: s, last: p, dir: 0, acc: 0}; return; }
    gesture = {t, x: p.x, y: p.y, done: false};
  });
  api.on(cv, 'pointermove', e => {
    const p = pt(e), t = now();
    if(scratchState){ const s = scratchState, dy = p.y - s.last.y, dx = p.x - s.last.x, v = Math.abs(dy) > Math.abs(dx) ? dy : dx; s.last = p;
      const d = Math.sign(v); if(d && d !== s.dir){ if(s.acc > 10 || s.dir === 0){ if(t < s.o.endTime + .1){ s.o.strokes++; I.wik(t, d < 0); bump = Math.max(bump, .25); energy.lead = 1; confetti(HXs + 10, Y0 - 10, [PAPER, INK], 3, .5); } } s.dir = d; s.acc = 0; } s.acc += Math.abs(v); return; }
    if(!gesture || gesture.done) return; const dx = p.x - gesture.x, dy = p.y - gesture.y;
    if(Math.hypot(dx, dy) > 16){ gesture.done = true; cut(gesture.t, {x: dx, y: dy}); slash = {dx: dx/Math.hypot(dx, dy), dy: dy/Math.hypot(dx, dy), t: 0}; }
  });
  const up = () => {
    const t = now();
    if(holdState){ const h = holdState.o; endHold(t, t >= h.endTime - .12 ? h.startGrade : (t - h.time)/(h.endTime - h.time) > .6 ? 'ok' : 'miss'); }
    scratchState = null;
    if(gesture && !gesture.done) jump(gesture.t); gesture = null;
  };
  api.on(cv, 'pointerup', up); api.on(cv, 'pointercancel', up);

  function holdVoice(h){
    if(!useAudio) return null; const T = actx.currentTime, f = freq(h.deg, 4);
    const o1 = actx.createOscillator(), o2 = actx.createOscillator(), lfo = actx.createOscillator(), lg = actx.createGain(), gn = actx.createGain(), fl = actx.createBiquadFilter();
    o1.type = 'sawtooth'; o2.type = 'square'; o1.frequency.value = f; o2.frequency.value = f*1.005; lfo.frequency.value = 6; lg.gain.value = f*.012; lfo.connect(lg); lg.connect(o1.frequency); lg.connect(o2.frequency);
    fl.type = 'lowpass'; fl.frequency.setValueAtTime(800, T); fl.frequency.linearRampToValueAtTime(3200, T + .3); fl.Q.value = 4;
    gn.gain.setValueAtTime(0, T); gn.gain.linearRampToValueAtTime(.09, T + .03);
    o1.connect(fl); o2.connect(fl); fl.connect(gn).connect(master); o1.start(); o2.start(); lfo.start();
    return {stop(){ const T2 = actx.currentTime; gn.gain.cancelScheduledValues(T2); gn.gain.setValueAtTime(gn.gain.value, T2); gn.gain.exponentialRampToValueAtTime(.0001, T2 + .12); [o1, o2, lfo].forEach(o => o.stop(T2 + .15)); }};
  }
  function endHold(t, g){ const h = holdState.o; if(holdState.voice) holdState.voice.stop(); holdState = null; h.holding = false; h.released = t; resolve(h, g, t); }

  let slash = null;
  function nearest(t, f){ return objs.filter(o => !o.done && f(o) && Math.abs(t - o.time) < .18).sort((a, b) => Math.abs(t - a.time) - Math.abs(t - b.time))[0]; }
  function cut(t, dir){
    const o = nearest(t, o => o.k === 'C' || o.k === 'J');
    if(o && o.bomb){ resolve(o, 'miss', t); osc(master, 'sine', 60, t, .6, .6, {glide: 30}); noise(master, t, .6, .5, 'lowpass', 2000); judges.push({txt: 'BOUM', x: W/2, y: H*.28, t: 0, big: true}); return; }
    if(o && o.k === 'C') resolve(o, grade(t - o.time), t, dir);
    else noise(master, t, .05, .05, 'highpass', 3000);
  }
  function jump(t){
    jumpT = 0; osc(master, 'triangle', 330, t, .07, .04, {glide: 520});
    const o = nearest(t, o => o.k === 'J'); if(o) resolve(o, grade(t - o.time), t);
  }
  function split(o, dir){
    const l = Math.hypot(dir.x, dir.y) || 1, d = {x: dir.x/l, y: dir.y/l}, n = {x: -d.y, y: d.x}, x = xOf(o.beat);
    for(const s of [1, -1]) bits.push({half: true, o: {...o}, s, d, x, y: objY(o), vx: n.x*s*160 - 60, vy: n.y*s*160 - 260, rot: 0, vr: s*(5 + Math.random()*5), life: 1.4});
  }
  function confetti(x, y, cols, n, power){ for(let i=0;i<n;i++){ const a = Math.random()*6.283, sp = (120 + Math.random()*260)*power; bits.push({x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - 120, rot: Math.random()*6, vr: (Math.random() - .5)*14, w: 4 + Math.random()*6, h: 3 + Math.random()*3, c: cols[i % cols.length], life: .8 + Math.random()*.5}); } }
  function collect(o, t){
    o.done = true; o.result = 'got';
    if(o.k === 'L'){ hearts = Math.min(5, hearts + 1); judges.push({txt: '+1 VIE', x: HXs + 20, y: Y0 - 100, t: 0}); I.bell(Math.max(t, o.time), freq(7, 4), .14); I.bell(Math.max(t, o.time) + .08, freq(11, 4), .12); }
    else { notesRun++; I.bell(Math.max(t, o.time), freq(o.deg + 7, 4), .09); score += 10; }
    confetti(xOf(o.beat), objY(o), [PAPER, RED], 8, .6);
  }

  function finishRun(won){
    if(holdState){ if(holdState.voice) holdState.voice.stop(); holdState = null; }
    const total = stats.perfect + stats.good + stats.ok + stats.miss || 1;
    const acc = Math.round((stats.perfect + stats.good*.7 + stats.ok*.35)/total*100);
    const stars = !won ? 0 : acc >= 95 ? 3 : acc >= 85 ? 2 : 1;
    api.save('notes', bank() + notesRun);
    const b = bests(), prev = b[tr.id] || {score: 0, stars: 0}; const rec = won && score > prev.score;
    if(won) { b[tr.id] = {score: Math.max(prev.score, score), stars: Math.max(prev.stars, stars)}; api.save('bests', b); }
    const nextT = TRACKS[TRACKS.indexOf(tr) + 1];
    const canUnlock = nextT && !unlocked(nextT) && bank() >= nextT.cost;
    if(canUnlock){ api.save('unlock.' + nextT.id, true); }
    TRACKS.forEach(x => { if(!unlocked(x) && bank() >= x.cost) api.save('unlock.' + x.id, true); });
    const lines = [won ? `${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}  ·  ${score} points${rec ? ' (record)' : ''}` : `${score} points · ${Math.round(beatNow/4/totalBars*100)} % de la face`,
      `Précision ${acc} % · combo max ${maxCombo}`, `+${notesRun} notes ♪ (total ${bank()})`];
    if(canUnlock) lines.push(`Nouvelle cassette débloquée : ${nextT.name}`);
    else if(nextT && !unlocked(nextT)) lines.push(`${nextT.name} : encore ${nextT.cost - bank()} notes`);
    const actions = [{label: won ? 'Rejouer' : 'Réessayer', fn: () => startTrack(tr)}];
    if(nextT && unlocked(nextT)) actions.unshift({label: `Face ${nextT.face} : ${nextT.name}`, fn: () => startTrack(nextT)});
    actions.push({label: 'Choisir une cassette', fn: showMenu});
    api.after(won ? 900 : 1000, () => api.end({win: won, title: won ? (stars === 3 ? 'FACE PARFAITE' : 'FACE TERMINÉE') : 'BANDE CASSÉE', text: lines.join('\n'), actions}));
  }
  function fail(){ if(state !== 'play') return; state = 'over'; if(useAudio){ music.gain.setTargetAtTime(0, actx.currentTime, .2); osc(master, 'sawtooth', 220, now(), 1.2, .2, {glide: 40}); api.after(1500, () => { if(music) music.gain.setValueAtTime(.9, actx.currentTime); }); } finishRun(false); }
  function win(){ if(state !== 'play') return; state = 'over'; I.crash(now()); judges.push({txt: 'FIN DE FACE', x: W/2, y: H*.25, t: 0, big: true}); finishRun(true); }

  /* ---------- boucle ---------- */
  const objY = o => o.k === 'A' || o.k === 'L' ? Y0 - 62 : o.shape === 'flyer' ? Y0 - 56 : o.shape === 'tall' ? Y0 - 30 : o.k === 'N' ? Y0 - 14 : o.k === 'H' || o.k === 'S' ? Y0 - 8 : Y0 - 15;
  let lastBeatI = -1, secShown = -1;
  api.loop((dt, rt) => {
    if(state === 'play'){
      const t = now();
      beatNow = t/bpb;
      while(nextStep/4*bpb < t + .15 && nextStep < totalBars*16){ scheduleStep(nextStep); nextStep++; }
      while(spawned*4 < beatNow + 10 && spawned < totalBars){ spawnBar(spawned); spawned++; }
      const air = jumpT < .42 && jumpT > .04;
      for(const o of objs){
        if(o.done) continue;
        if(o.k === 'N' && t >= o.time) collect(o, t);
        else if((o.k === 'A' || o.k === 'L') && Math.abs(t - o.time) < .12 && air) collect(o, t);
        else if((o.k === 'A' || o.k === 'L') && t > o.time + .12){ o.done = true; o.result = 'gone'; }
        else if((o.k === 'C' || o.k === 'J') && t > o.time + .18) resolve(o, 'miss', t);
        else if(o.k === 'H'){ if(!o.holding && t > o.time + .18) resolve(o, 'miss', t); else if(o.holding){ if(t > o.endTime + .04) endHold(t, o.startGrade); else if(Math.random() < .5) confetti(HXs, Y0 - 12, [RED, PAPER], 1, .3); } }
        else if(o.k === 'S' && t > o.endTime + .1){ const r = o.strokes/o.need; resolve(o, r >= 1.5 ? 'perfect' : r >= 1 ? 'good' : r > 0 ? 'ok' : 'miss', t); if(scratchState && scratchState.o === o) scratchState = null; }
      }
      objs = objs.filter(o => o.endBeat > beatNow - 3);
      for(let i=events.length - 1;i>=0;i--) if(events[i].at <= t){ energy[events[i].ch] = 1; events.splice(i, 1); }
      const bi = Math.floor(beatNow); if(bi !== lastBeatI){ lastBeatI = bi; }
      const sec = sectionOf(Math.floor(beatNow/4));
      if(sec && sec.idx !== secShown){ secShown = sec.idx; judges.push({txt: sec.name.toUpperCase(), x: W/2, y: H*.2, t: 0, big: true, sub: sec.tier === 'rest' ? 'souffle, ramasse les notes' : sec.call ? 'écoute puis réponds' : null}); if(sec.idx) bump = 1; }
      rot += dt*tr.bpm/60*2.2;
      if(beatNow >= totalBars*4) win();
    } else if(state === 'menu') rot += dt;
    jumpT += dt; hurtT -= dt; bump = Math.max(0, bump - dt*3); flashR = Math.max(0, flashR - dt*2.5);
    for(const k in (energy || {})) energy[k] = Math.max(0, energy[k] - dt*(k === 'hat' ? 9 : 5));
    for(const b of (bits || [])){ b.vy += 900*dt; b.x += b.vx*dt; b.y += b.vy*dt; b.rot += b.vr*dt; b.life -= dt; }
    if(bits) bits = bits.filter(b => b.life > 0 && b.y < H + 60);
    if(judges){ for(const j of judges) j.t += dt; judges = judges.filter(j => j.t < (j.big ? 1.5 : .6)); }
    if(slash){ slash.t += dt; if(slash.t > .2) slash = null; }
    if(tr && state !== 'menu') draw(rt);
  });

  /* ---------- dessin ---------- */
  function shadow(on, blur, oy){ if(on){ ctx.shadowColor = 'rgba(40,20,0,.28)'; ctx.shadowBlur = blur || 14; ctx.shadowOffsetY = oy == null ? 6 : oy; } else { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; } }
  function rrect(x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function hub(x, y, r, a, hole){
    ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
    ctx.strokeStyle = 'rgba(28,27,25,.18)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r*.8, 0, 6.283); ctx.stroke();
    ctx.fillStyle = 'rgba(28,27,25,.35)'; for(let i=0;i<20;i++){ const k = a + i/20*6.283; ctx.fillRect(x + Math.cos(k)*r*.9 - .8, y + Math.sin(k)*r*.9 - .8, 1.6, 1.6); }
    ctx.strokeStyle = RED; ctx.lineWidth = r*.14; ctx.beginPath(); ctx.arc(x, y, r*.9, a - .25, a + .15); ctx.stroke();
    ctx.fillStyle = hole; ctx.beginPath(); ctx.arc(x, y, r*.58, 0, 6.283); ctx.fill();
    ctx.fillStyle = PAPER; for(let i=0;i<6;i++){ const k = a + i/6*6.283; ctx.save(); ctx.translate(x + Math.cos(k)*r*.58, y + Math.sin(k)*r*.58); ctx.rotate(k); ctx.fillRect(-r*.08, -r*.07, r*.16, r*.14); ctx.restore(); }
  }
  function drawObj(o, x, y, dance){
    const s = Math.min(1, o.born*6), sc = (s < 1 ? s*(1.25 - .25*s) : 1)*(1 + (dance || 0));
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc*(1 - (dance || 0)*.5)); if(o.tilt) ctx.rotate(o.tilt);
    shadow(true, 10, 5);
    if(o.k === 'C'){
      if(o.shape === 'tall'){ ctx.fillStyle = PAPER; rrect(-11, -30, 22, 60, 5); ctx.fill(); shadow(false); ctx.fillStyle = RED; for(let i=0;i<3;i++) ctx.fillRect(-11, -20 + i*16, 22, 4); }
      else if(o.shape === 'flyer'){ ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 6.283); ctx.fill(); shadow(false); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 9, rot, rot + 1.4); ctx.stroke(); }
      else { ctx.fillStyle = PAPER; rrect(-14, -14, 28, 28, 5); ctx.fill(); shadow(false); ctx.fillStyle = RED; ctx.fillRect(-14, -4, 28, 6); ctx.fillStyle = INK; ctx.fillRect(-8, 6, 16, 2); }
    } else if(o.k === 'J' && !o.bomb){ ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-15, 15); ctx.lineTo(0, -15); ctx.lineTo(15, 15); ctx.closePath(); ctx.fill(); shadow(false); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(4, 15); ctx.lineTo(15, 15); ctx.closePath(); ctx.fill(); }
    else if(o.bomb){ ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 2, 13, 0, 6.283); ctx.fill(); shadow(false); ctx.fillStyle = INK; ctx.fillRect(-4, -14, 8, 5); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -14); ctx.quadraticCurveTo(6, -22, 10, -18); ctx.stroke(); ctx.fillStyle = energy.hat > .5 ? PAPER : '#ffd23f'; ctx.beginPath(); ctx.arc(10, -18, 2.5 + energy.kick*2, 0, 6.283); ctx.fill(); }
    else if(o.k === 'N' || o.k === 'A'){ ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); ctx.fill(); shadow(false); ctx.fillRect(1.5, -12, 3, 18); ctx.beginPath(); ctx.moveTo(4.5, -12); ctx.quadraticCurveTo(14, -8, 10, 0); ctx.quadraticCurveTo(11, -6, 4.5, -6); ctx.fill(); if(o.k === 'A'){ ctx.strokeStyle = PAPER; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 17, 0, 6.283); ctx.stroke(); } }
    else if(o.k === 'L'){ ctx.fillStyle = RED; rrect(-10, -13, 20, 26, 4); ctx.fill(); shadow(false); ctx.fillStyle = PAPER; ctx.font = `12px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('+', 0, 1); ctx.textBaseline = 'alphabetic'; }
    shadow(false); ctx.restore();
  }
  function drawDeco(rt){
    const k = energy.kick, d = tr.deco, cx = W/2, cy = H*.2;
    ctx.save();
    if(d === 'rays'){ ctx.translate(W*.82, H*.12); ctx.rotate(rot*.08); ctx.fillStyle = `rgba(255,255,255,${.1 + k*.08})`; for(let i=0;i<12;i++){ ctx.rotate(6.283/12); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W*1.2, -26 - k*10); ctx.lineTo(W*1.2, 26 + k*10); ctx.closePath(); if(i % 2) ctx.fill(); } ctx.fillStyle = '#fff3c4'; ctx.beginPath(); ctx.arc(0, 0, 34 + k*8, 0, 6.283); ctx.fill(); }
    if(d === 'vinyl'){ ctx.fillStyle = 'rgba(28,27,25,.08)'; for(let y=8;y<H*.4;y+=12) for(let x=(y/12 % 2)*6; x<W; x+=12) ctx.fillRect(x, y, 2 + energy.snare*2, 2 + energy.snare*2);
      ctx.translate(W*.86, H*.15); ctx.rotate(rot*.5); const R = W*.38 + k*6; ctx.fillStyle = 'rgba(28,27,25,.85)'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; for(let r=R*.4; r<R; r+=4){ ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.stroke(); } ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, R*.32, 0, 6.283); ctx.fill(); ctx.fillStyle = PAPER; ctx.fillRect(-R*.2, -3, R*.4, 6); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 4, 0, 6.283); ctx.fill(); }
    if(d === 'grid'){ const hz = H*.33; ctx.fillStyle = `rgba(255,236,170,${.85})`; ctx.beginPath(); ctx.arc(cx, hz, W*.26 + k*6, Math.PI, 0); ctx.fill(); ctx.fillStyle = tr.bg[0]; for(let i=0;i<5;i++) ctx.fillRect(cx - W*.3, hz - 8 - i*11, W*.6, 3 + i*.6);
      ctx.strokeStyle = `rgba(28,27,25,${.25 + k*.2})`; ctx.lineWidth = 1.5; const off = (beatNow % 1); for(let i=0;i<9;i++){ const z = (i + 1 - off)/9, y = hz + z*z*(Y0 - hz); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for(let i=-8;i<=8;i++){ ctx.beginPath(); ctx.moveTo(cx + i*12, hz); ctx.lineTo(cx + i*W*.16, Y0); ctx.stroke(); } }
    if(d === 'stripes'){ ctx.rotate(-.35); ctx.fillStyle = `rgba(255,255,255,${.1 + k*.08})`; const off = (beatNow*40) % 60; for(let x=-H; x<W + H; x+=60){ ctx.fillRect(x - off, -H, 26, H*3); } }
    ctx.restore();
  }
  function draw(rt){
    const bar = Math.floor(beatNow/4), sec = sectionOf(bar), ek = energy.kick;
    const z = 1 + bump*.025 + ek*.008;
    ctx.save(); ctx.translate(W/2, H/2); ctx.scale(z, z); ctx.translate(-W/2, -H/2);
    const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, tr.bg[0]); gr.addColorStop(1, tr.bg[1]); ctx.fillStyle = gr; ctx.fillRect(-20, -20, W + 40, H + 40);
    drawDeco(rt);
    // égaliseur qui danse
    const chans = ['kick','bass','snare','chords','lead','hat'], bw = (W - 32)/18;
    for(let i=0;i<18;i++){ const e = energy[chans[i % 6]]*(.6 + .4*Math.sin(i*1.7 + rt*3)), h = 4 + e*36; ctx.fillStyle = i % 6 === 4 ? RED : 'rgba(28,27,25,.55)'; rrect(16 + i*bw + 1, EQY - h, bw - 3, h, 2); ctx.fill(); }
    // bobines
    const prog = Math.max(0, Math.min(1, beatNow/4/totalBars)), lx = W*.27, rx = W*.73;
    const rL = REELR*(.55 + .45*prog), rR = REELR*(1 - .45*prog), hubR = REELR*.5;
    ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(14, TAPEY); ctx.lineTo(lx - rL, REELY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(W - 14, TAPEY); ctx.lineTo(rx + rR, REELY); ctx.stroke();
    shadow(true, 22, 10); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(lx, REELY, rL + ek*2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(rx, REELY, rR + ek*2, 0, 6.283); ctx.fill(); shadow(false);
    shadow(true, 8, 3); hub(lx, REELY, hubR, -rot, tr.bg[1]); hub(rx, REELY, hubR, -rot*.9, tr.bg[1]); shadow(false);
    ctx.textAlign = 'center'; ctx.font = `10px ${FONT}`; ctx.fillStyle = 'rgba(28,27,25,.6)'; ctx.fillText(`FACE ${tr.face} · ${tr.name.toUpperCase()} · ${Math.round(prog*100)} %`, W/2, REELY + REELR + 24);
    // bande
    shadow(true, 18, 8); ctx.fillStyle = INK; ctx.fillRect(0, Y0, W, TT); shadow(false);
    for(let b=Math.floor(beatNow) - 2; b<beatNow + W/PPB + 2; b++){ const x = xOf(b), barLine = ((b % 4) + 4) % 4 === 0, pulse = Math.max(0, 1 - Math.abs(beatNow - b)*3);
      ctx.fillStyle = barLine ? RED : 'rgba(244,240,230,.45)'; const hh = (barLine ? 14 : 8) + pulse*8; ctx.fillRect(x - (barLine ? 2 : 1), Y0 + TT/2 - hh/2, barLine ? 4 : 2, hh); }
    // tête de lecture
    shadow(true, 10, 4); ctx.fillStyle = RED; rrect(HXs - 9, Y0 + TT - 2, 18, 22 + ek*5, 4); ctx.fill(); shadow(false);
    ctx.fillStyle = `rgba(215,38,61,${.12 + ek*.22})`; ctx.fillRect(HXs - 2, Y0 - H*.28, 4, H*.28 + TT);
    // notes longues et scratch (sous les objets)
    for(const o of objs){
      if(o.k !== 'H' && o.k !== 'S') continue;
      const x1 = xOf(o.beat), x2 = xOf(o.endBeat); if(x1 > W + 40 || x2 < -40) continue;
      if(o.k === 'H'){
        const col = o.result === 'miss' ? 'rgba(28,27,25,.35)' : RED;
        ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = 16 + (o.holding ? ek*4 : 0); ctx.beginPath(); ctx.moveTo(Math.max(x1, o.holding || o.done ? HXs : x1), Y0 - 9); ctx.lineTo(x2, Y0 - 9); ctx.stroke();
        ctx.strokeStyle = PAPER; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(Math.max(x1, o.holding ? HXs : x1) + 6, Y0 - 9); ctx.lineTo(x2 - 6, Y0 - 9); ctx.stroke(); ctx.lineCap = 'butt';
        if(!o.done && !o.holding){ ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(x1, Y0 - 9, 9, 0, 6.283); ctx.fill(); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(x1, Y0 - 9, 4, 0, 6.283); ctx.fill(); }
        if(!o.done && xOf(o.beat) < W){ ctx.font = `10px ${FONT}`; ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText('MAINTIENS', x1 - 8, Y0 - 26); }
      } else {
        const act = !o.done && now() > o.time - .15; ctx.strokeStyle = o.result === 'miss' ? 'rgba(28,27,25,.35)' : act ? RED : PAPER; ctx.lineWidth = 4; ctx.lineJoin = 'round';
        ctx.beginPath(); for(let x=x1; x<=x2; x+=8){ const y = Y0 - 10 + ((x - x1)/8 % 2 ? -7 : 7)*(act ? 1 + energy.lead*.6 : 1); x === x1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
        if(!o.done){ ctx.font = `10px ${FONT}`; ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText(act ? `SCRATCH ${o.strokes}/${o.need}` : 'SCRATCH', x1, Y0 - 26); }
      }
    }
    // objets qui dansent
    const beatPhase = beatNow - Math.floor(beatNow), dance = Math.max(0, 1 - beatPhase*4)*.1;
    for(const o of objs){
      if(o.k === 'H' || o.k === 'S') continue;
      o.born += 1/60;
      if(o.done && o.result !== 'miss') continue;
      const x = xOf(o.beat); if(x > W + 40 || x < -40) continue;
      const y = objY(o) + (o.k === 'N' || o.k === 'A' || o.k === 'L' ? Math.sin(beatNow*Math.PI*2)*3 : 0);
      o.tilt = o.done ? .3 : (Math.floor(beatNow) % 2 ? .08 : -.08)*(o.k === 'C' || o.k === 'J' ? 1 : 0);
      if(o.done){ drawObj(o, x, y - 4); continue; }
      const bd = o.beat - beatNow;
      if((o.k === 'C' || o.k === 'J') && bd < 1.6 && bd > -.15){ const r = (o.shape === 'tall' ? 34 : 22) + Math.max(0, bd)*70, a = Math.min(1, (1.6 - bd)*1.2);
        ctx.strokeStyle = o.bomb ? `rgba(215,38,61,${a})` : o.k === 'J' ? `rgba(28,27,25,${a})` : `rgba(244,240,230,${a})`; ctx.lineWidth = 3 + (bd < .25 ? 2 : 0); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); }
      drawObj(o, x, y, dance);
      if(o.k === 'J' && bd < 3){ ctx.fillStyle = o.bomb ? RED : INK; ctx.font = `11px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText('▲', x, Y0 - 42); }
    }
    // héros
    const jp = jumpT < .12 ? Math.sin(jumpT/.12*Math.PI/2) : jumpT < .42 ? Math.cos((jumpT - .12)/.3*Math.PI/2) : 0;
    const hy = Y0 - 14 - jp*70 - (jp ? 0 : ek*4), sq = jp ? 1 : 1 + ek*.15;
    if(!(hurtT > 0 && Math.floor(rt*18) % 2)){
      ctx.save(); ctx.translate(HXs, hy); ctx.scale(1/sq, sq);
      ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(0, Y0 - hy - 1, 13*(1 - jp*.5), 3, 0, 0, 6.283); ctx.fill();
      shadow(true, 8, 4); hub(0, 0, 14, rot*2, tr.bg[0]); shadow(false);
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(4, -3, 2.2, 0, 6.283); ctx.arc(-3, -3, 2.2, 0, 6.283); ctx.fill();
      if(holdState || scratchState){ ctx.strokeStyle = RED; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 19 + ek*4, 0, 6.283); ctx.stroke(); }
      ctx.restore();
    }
    for(const b of bits){
      ctx.save(); ctx.globalAlpha = Math.min(1, b.life*2); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
      if(b.half){ const n = {x: -b.d.y*b.s, y: b.d.x*b.s}; ctx.beginPath(); ctx.moveTo(-b.d.x*80, -b.d.y*80); ctx.lineTo(b.d.x*80, b.d.y*80); ctx.lineTo(b.d.x*80 + n.x*80, b.d.y*80 + n.y*80); ctx.lineTo(-b.d.x*80 + n.x*80, -b.d.y*80 + n.y*80); ctx.closePath(); ctx.clip(); drawObj({...b.o, born: 1, tilt: 0}, 0, 0); }
      else { ctx.fillStyle = b.c; ctx.fillRect(-b.w/2, -b.h/2, b.w, b.h); }
      ctx.restore();
    }
    if(slash){ const k = 1 - slash.t/.2, L = 120; ctx.save(); ctx.translate(HXs + 20, Y0 - 22); ctx.globalAlpha = k; ctx.lineCap = 'round';
      ctx.strokeStyle = PAPER; ctx.lineWidth = 10*k; ctx.beginPath(); ctx.moveTo(-slash.dx*L*.6, -slash.dy*L*.6); ctx.lineTo(slash.dx*L*.6, slash.dy*L*.6); ctx.stroke();
      ctx.strokeStyle = RED; ctx.lineWidth = 3*k; ctx.beginPath(); ctx.moveTo(-slash.dx*L*.5, -slash.dy*L*.5); ctx.lineTo(slash.dx*L*.5, slash.dy*L*.5); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    if(flashR > 0){ ctx.fillStyle = `rgba(215,38,61,${flashR*.35})`; ctx.fillRect(0, 0, W, H); }

    // interface
    ctx.textAlign = 'left'; ctx.fillStyle = INK; ctx.font = `${24 + bump*6 + ek*2}px ${FONT}`; ctx.fillText(score, 16, 42);
    ctx.font = `11px ${FONT}`; ctx.fillStyle = INK; ctx.fillText(`♪ ${notesRun}`, 17, 62);
    for(let i=0;i<Math.max(3, hearts);i++){ ctx.fillStyle = i < hearts ? RED : 'rgba(28,27,25,.18)'; rrect(W - 22 - i*18, 24 - (i < hearts ? ek*2 : 0), 13, 19, 3); ctx.fill(); }
    if(combo > 2){ ctx.textAlign = 'right'; ctx.fillStyle = INK; ctx.font = `${15 + Math.min(combo, 40)/4 + ek*3}px ${FONT}`; ctx.fillText(combo + 'x', W - 16, 70); }
    if(state === 'play' && isListen(bar)){ ctx.textAlign = 'center'; ctx.font = `14px ${FONT}`; ctx.fillStyle = INK; ctx.globalAlpha = .45 + ek*.55; ctx.fillText('ÉCOUTE', W/2, Y0 - 112); ctx.globalAlpha = 1; }
    if(state === 'play' && beatNow < 4){ const n = 4 - Math.floor(Math.max(0, beatNow)); ctx.textAlign = 'center'; ctx.font = `${44 + ek*14}px ${FONT}`; ctx.fillStyle = INK; ctx.fillText(n > 1 ? n - 1 : 'GO', W/2, Y0 - 100); }
    for(const j of judges){
      const k = j.t/(j.big ? 1.5 : .6), s = j.t < .08 ? .6 + j.t/.08*.6 : 1.2 - Math.min(.2, (j.t - .08)*2);
      ctx.save(); ctx.translate(j.x, j.y - j.t*30); ctx.scale(s, s); ctx.globalAlpha = 1 - k*k; ctx.textAlign = 'center';
      ctx.font = `${j.big ? 26 : j.g === 'perfect' ? 18 : 14}px ${FONT}`; ctx.lineWidth = 5; ctx.strokeStyle = PAPER; if(j.g === 'perfect' || j.big) ctx.strokeText(j.txt, 0, 0);
      ctx.fillStyle = j.g === 'perfect' || j.g === 'miss' ? RED : INK; ctx.fillText(j.txt, 0, 0);
      if(j.sub){ ctx.font = '600 13px "Chakra Petch", sans-serif'; ctx.fillStyle = INK; ctx.fillText(j.sub, 0, 22); }
      ctx.restore();
    }
  }

  const stopBtn = document.createElement('button');
  stopBtn.textContent = '■'; stopBtn.setAttribute('aria-label', 'Retour aux cassettes');
  stopBtn.style.cssText = `position:absolute;top:14px;left:50%;transform:translateX(-50%);width:38px;height:30px;border:none;border-radius:6px;background:${INK};color:${PAPER};font-size:14px;z-index:3;cursor:pointer`;
  stage.appendChild(stopBtn);
  stopBtn.onclick = () => { if(holdState){ if(holdState.voice) holdState.voice.stop(); holdState = null; } if(useAudio && music) music.gain.setValueAtTime(0, actx.currentTime); if(state === 'play' && notesRun){ api.save('notes', bank() + notesRun); notesRun = 0; } state = 'menu'; showMenu(); };
  /* ---------- menu des cassettes ---------- */
  const menu = document.createElement('div');
  menu.style.cssText = 'position:absolute;inset:0;overflow:auto;background:linear-gradient(#f2cd4c,#d6a93a);color:#1c1b19;padding:18px 16px 24px;display:flex;flex-direction:column;gap:14px;z-index:4;font-family:"Chakra Petch",sans-serif;touch-action:pan-y';
  stage.appendChild(menu);
  function showMenu(){
    api.closeEnd(); state = 'menu'; if(useAudio && music) music.gain.setValueAtTime(.9, actx.currentTime);
    api.hud(''); const b = bests(), n = bank();
    menu.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><div style="font-family:${FONT};font-size:34px;line-height:1">K7 <span style="color:${RED}">CUT</span></div><div style="display:flex;gap:10px;align-items:center"><span style="font-family:${FONT};font-size:14px">♪ ${n}</span><button id="k7mute" style="border:none;border-radius:6px;background:${INK};color:${PAPER};font-family:${FONT};font-size:10px;padding:7px 9px;cursor:pointer">${api.store.load('muted', false) ? 'SON OFF' : 'SON ON'}</button></div></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:12.5px;line-height:1.3">
        ${[['GLISSE','couper'],['TAPE','sauter'],['MAINTIENS','note longue'],['VA-ET-VIENT','scratch']].map(([a, c]) => `<div style="background:rgba(28,27,25,.08);border-radius:6px;padding:6px 4px;text-align:center"><b style="font-family:${FONT};font-size:9px;display:block;color:${RED}">${a}</b>${c}</div>`).join('')}</div>
      <div id="k7list" style="display:flex;flex-direction:column;gap:12px"></div>
      <p style="margin:0;font-size:13px;opacity:.75">Ramasse les notes ♪ sur la bande (saute pour celles dans les airs) : ton total débloque les cassettes suivantes. Les cassettes rouges + donnent une vie.</p>`;
    const list = menu.querySelector('#k7list');
    TRACKS.forEach(t => {
      const open = unlocked(t), info = b[t.id], afford = !open && n >= t.cost;
      const el = document.createElement('button');
      el.style.cssText = `all:unset;cursor:pointer;display:flex;gap:12px;align-items:center;background:${INK};color:${PAPER};border-radius:10px;padding:12px;box-shadow:0 8px 18px rgba(40,20,0,.3);${open || afford ? '' : 'opacity:.55'}`;
      el.innerHTML = `<div style="flex:none;width:96px;height:60px;border-radius:6px;background:linear-gradient(${t.bg[0]},${t.bg[1]});position:relative;overflow:hidden">
          <div style="position:absolute;left:8px;right:8px;top:7px;height:16px;background:${PAPER};border-radius:2px;color:${INK};font-family:${FONT};font-size:9px;line-height:16px;text-align:center">FACE ${t.face}</div>
          <div style="position:absolute;left:18px;top:30px;width:22px;height:22px;border-radius:50%;background:${PAPER};box-shadow:inset 0 0 0 5px ${INK}"></div>
          <div style="position:absolute;right:18px;top:30px;width:22px;height:22px;border-radius:50%;background:${PAPER};box-shadow:inset 0 0 0 5px ${INK}"></div></div>
        <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
          <div style="font-family:${FONT};font-size:16px">${t.name}</div>
          <div style="font-size:12.5px;opacity:.75">${t.label} · ${t.gestures}</div>
          <div style="font-size:13px;color:${open ? '#ffd23f' : RED}">${open ? (info ? '★'.repeat(info.stars) + '☆'.repeat(3 - info.stars) + ' · ' + info.score : 'Pas encore jouée') : afford ? `Débloquée ! Touche pour l'ouvrir` : `🔒 ${t.cost} ♪ (il t'en manque ${t.cost - n})`}</div></div>`;
      el.onclick = () => {
        if(!open && !afford) { api.sfx.lose(); return; }
        if(!open && afford){ api.save('unlock.' + t.id, true); api.sfx.coin(); return showMenu(); }
        startTrack(t);
      };
      list.appendChild(el);
    });
    menu.hidden = false; stopBtn.hidden = true;
    const mb = menu.querySelector('#k7mute'); mb.onclick = () => { api.store.save('muted', !api.store.load('muted', false)); showMenu(); };
  }
  function hideMenu(){ menu.hidden = true; stopBtn.hidden = false; }

  showMenu();
  return () => { try{ if(holdState && holdState.voice) holdState.voice.stop(); if(actx) actx.close(); }catch(e){} };
}};
})();
