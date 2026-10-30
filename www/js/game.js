window.GAMES = window.GAMES || {};
(function(){
const G = window.GAMES = window.GAMES || {};

/* =========================================================
   K7 CUT — un runner rythmique en cassettes
   ========================================================= */
const INK = '#1c1b19', PAPER = '#f4f0e6', RED = '#d7263d';
const FONT = '"Rubik Mono One", "Silkscreen", monospace';
const MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10];
const ALL = ['kick','snare','hat','bass','chords','arp','perc','lead','gtr'];

const DOR = [0, 2, 3, 5, 7, 9, 10], PHR = [0, 1, 3, 5, 7, 8, 10];
// trame commune : intro en appel/réponse, couplet, (nouveau geste), couplet = palier, pause, refrain x2, final
function plan(L, o){
  o = o || {}; const all = o.all || 'CJ', nw = o.newAct;
  const s = [{name: 'Intro', bars: 4, tier: 0, call: true, acts: 'CJ', layers: L[0]}, {name: 'Couplet', bars: 8, tier: 1, acts: o.verseActs || 'CJ', layers: L[1]}];
  if(nw) s.push({name: o.newName, bars: 4, tier: 1, call: true, acts: nw + 'C', layers: L[1]});
  s.push({name: 'Couplet', bars: 8, tier: 1, acts: all, layers: L[2]}, {name: 'Pause', bars: 4, tier: 'rest', acts: 'C', layers: L[3]},
    {name: 'Refrain', bars: 8, tier: 2, acts: all, layers: L[4]}, {name: 'Refrain', bars: 8, tier: 2, acts: all, layers: L[5]},
    {name: 'Final', bars: o.finalBars || 8, tier: 3, acts: all, layers: L[5]}, {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: L[6]});
  return s;
}
const TRACKS = [
  { id: 'soleil', face: 'A', name: 'Soleil', style: 'disco', label: 'Disco · 104 BPM', bpm: 104, root: 65.41, scale: MAJ, prog: [0, 5, 3, 4], swing: 0, cost: 0,
    bg: ['#f2cd4c', '#d6a93a'], deco: 'rays', gestures: 'Couper · Sauter', delay: .75,
    sections: plan([['kick','bass'], ['kick','bass','hat','snare'], ['kick','bass','hat','snare','chords'], ['chords','hat','perc'], ['kick','bass','hat','snare','chords','perc'], ALL, ['chords']], {finalBars: 6}) },
  { id: 'bobine', face: 'B', name: 'Bobine', style: 'hiphop', label: 'Boom bap · 88 BPM', bpm: 88, root: 55, scale: MIN, prog: [0, 5, 6, 4], swing: .2, cost: 25,
    bg: ['#f2a65a', '#d9763f'], deco: 'vinyl', gestures: '+ Scratch', delay: .5,
    sections: plan([['kick','snare','perc'], ['kick','snare','hat','bass','perc'], ['kick','snare','hat','bass','chords','perc'], ['chords','perc'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['chords','perc']], {newAct: 'S', newName: 'Scratch !', all: 'CJS'}) },
  { id: 'dub', face: 'C', name: 'Dub', style: 'reggae', label: 'Reggae dub · 76 BPM', bpm: 76, root: 55, scale: MIN, prog: [0, 3, 0, 4], swing: .08, cost: 55,
    bg: ['#8fce6a', '#3f8a4f'], deco: 'speakers', gestures: '+ Notes longues', delay: .75,
    sections: plan([['kick','hat','bass'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','lead'], ['bass','chords','perc'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['bass','chords']], {newAct: 'H', newName: 'Maintiens !', all: 'CJH'}) },
  { id: 'neon', face: 'D', name: 'Néon', style: 'synthwave', label: 'Synthwave · 116 BPM', bpm: 116, root: 82.41, scale: MIN, prog: [0, 5, 2, 6], swing: 0, cost: 90,
    bg: ['#f58fb2', '#c9568a'], deco: 'grid', gestures: 'Maintiens + scratch', delay: .75,
    sections: plan([['kick','bass','chords'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','arp'], ['chords','arp'], ALL, ALL, ['chords','arp']], {newAct: 'SH', newName: 'Mélange !', all: 'CJSH'}) },
  { id: 'robot', face: 'E', name: 'Robot', style: 'french', label: 'French touch · 122 BPM', bpm: 122, root: 73.42, scale: DOR, prog: [0, 3, 5, 4], swing: 0, cost: 130,
    bg: ['#b7a6ff', '#6b55d6'], deco: 'leds', gestures: 'Tout + filtres', delay: .75,
    sections: plan([['kick','chords'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','perc'], ['chords','lead'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['chords']], {all: 'CJSH', verseActs: 'CJH'}) },
  { id: 'rush', face: 'F', name: 'Rush', style: 'dnb', label: 'Breakbeat · 132 BPM', bpm: 132, root: 73.42, scale: MIN, prog: [0, 3, 5, 4], swing: 0, cost: 175,
    bg: ['#6fd3c7', '#2f9c95'], deco: 'stripes', gestures: 'Tout à la fois', delay: .5,
    sections: plan([['kick','hat','bass'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','arp'], ['chords','arp'], ALL, ALL, ['chords']], {all: 'CJSH', verseActs: 'CJS'}) },
  { id: 'pogo', face: 'G', name: 'Pogo', style: 'punk', label: 'Punk · 168 BPM', bpm: 168, root: 82.41, scale: MAJ, prog: [0, 3, 4, 3], swing: 0, cost: 225,
    bg: ['#c8f04a', '#86b22a'], deco: 'scribble', gestures: 'Vite et fort', delay: .5,
    sections: plan([['kick','snare','gtr'], ['kick','snare','hat','bass','gtr'], ['kick','snare','hat','bass','gtr','perc'], ['gtr','hat'], ['kick','snare','hat','bass','gtr','perc'], ALL, ['gtr']], {all: 'CJS'}) },
  { id: 'riff', face: 'H', name: 'Riff', style: 'metal', label: 'Métal · 150 BPM', bpm: 150, root: 41.2, scale: PHR, prog: [0, 0, 1, 0], swing: 0, cost: 290,
    bg: ['#e0533f', '#7a1d14'], deco: 'flames', gestures: 'Le boss final', delay: .375,
    sections: plan([['gtr','perc'], ['kick','snare','hat','bass','gtr'], ['kick','snare','hat','bass','gtr','perc'], ['gtr','chords'], ['kick','snare','hat','bass','gtr','perc','lead'], ALL, ['gtr','chords']], {all: 'CJSH', verseActs: 'CJ'}) }
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
  let tr = null, sections, totalBars, bpb, objs, bits, judges, state = 'menu', score, combo, maxCombo, hearts, stats, beatNow, nextStep, jumpT, hurtT, energy, events, bump, flashR, gesture, motif, notesRun, holdState, scratchState, rot, finished, trance = 0, rings = [];

  /* ---------- sauvegarde ---------- */
  const bank = () => api.load('notes', 0);
  const bests = () => api.load('bests', {});
  const unlocked = t => t.cost === 0 || api.load('unlock.' + t.id, false);

  /* ---------- audio : bus musique (filtre, pompe) + réverb + écho, compresseur et limiteur ---------- */
  let tone = null, shelf = null, revIn = null, dlyIn = null, dly = null, curves = {};
  function impulse(sec, decay){ const n = Math.floor(actx.sampleRate*sec), b = actx.createBuffer(2, n, actx.sampleRate); for(let c=0;c<2;c++){ const d = b.getChannelData(c); for(let i=0;i<n;i++) d[i] = (Math.random()*2 - 1)*Math.pow(1 - i/n, decay); } return b; }
  function audioInit(){
    if(muted || actx) return;
    try{
      actx = new (window.AudioContext || window.webkitAudioContext)({latencyHint: 'interactive'});
      const comp = actx.createDynamicsCompressor(); comp.threshold.value = -18; comp.knee.value = 8; comp.ratio.value = 4; comp.attack.value = .004; comp.release.value = .15;
      const lim = actx.createDynamicsCompressor(); lim.threshold.value = -2; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = .001; lim.release.value = .06;
      master = actx.createGain(); master.gain.value = .8; master.connect(comp).connect(lim).connect(actx.destination);
      pump = actx.createGain(); pump.connect(master);
      shelf = actx.createBiquadFilter(); shelf.type = 'highshelf'; shelf.frequency.value = 5000; shelf.gain.value = 0; shelf.connect(pump);
      tone = actx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 20000; tone.Q.value = .8; tone.connect(shelf);
      music = actx.createGain(); music.gain.value = .9; music.connect(tone);
      const rev = actx.createConvolver(); rev.buffer = impulse(2.4, 3); const revOut = actx.createGain(); revOut.gain.value = .32; revIn = actx.createGain(); revIn.connect(rev).connect(revOut).connect(master);
      dly = actx.createDelay(2); const fb = actx.createGain(), dlf = actx.createBiquadFilter(), dlyOut = actx.createGain(); fb.gain.value = .42; dlf.type = 'lowpass'; dlf.frequency.value = 2400; dlyOut.gain.value = .38;
      dlyIn = actx.createGain(); dlyIn.connect(dly); dly.connect(dlf).connect(fb).connect(dly); dlf.connect(dlyOut).connect(master);
    }catch(e){ actx = null; }
  }
  function curve(k){ if(curves[k]) return curves[k]; const n = 1024, c = new Float32Array(n); for(let i=0;i<n;i++){ const x = i/(n - 1)*2 - 1; c[i] = Math.tanh(k*x)/Math.tanh(k); } return curves[k] = c; }
  let lat = 0;
  const clock = () => useAudio ? actx.currentTime - t0 : performance.now()/1000 - t0;
  // ce que le joueur entend arrive après la latence de sortie : on juge et on dessine sur ce temps-là
  const now = () => clock() - lat;
  let noiseBuf = null;
  function env(gn, T, v, a, d, sus){ gn.gain.setValueAtTime(0, T); gn.gain.linearRampToValueAtTime(v, T + a); if(sus){ gn.gain.setValueAtTime(v, T + a + sus); } gn.gain.exponentialRampToValueAtTime(.0001, T + a + (sus || 0) + d); }
  function route(n, gn, bus, o2, T){
    n.connect(gn); let out = gn;
    if(o2.pan && actx.createStereoPanner){ const p = actx.createStereoPanner(); p.pan.value = o2.pan; gn.connect(p); out = p; }
    out.connect(bus);
    if(o2.rev){ const s = actx.createGain(); s.gain.value = o2.rev; out.connect(s).connect(revIn); }
    if(o2.dly){ const s = actx.createGain(); s.gain.value = o2.dly; out.connect(s).connect(dlyIn); }
  }
  function osc(bus, type, f, at, dur, vol, o2){
    if(!useAudio) return null; o2 = o2 || {};
    const T = at + t0, o = actx.createOscillator(), gn = actx.createGain(); o.type = type; o.frequency.setValueAtTime(f, T);
    if(o2.glide) o.frequency.exponentialRampToValueAtTime(o2.glide, T + (o2.gt || dur*.8));
    if(o2.detune) o.detune.value = o2.detune;
    if(o2.vib){ const l = actx.createOscillator(), lg = actx.createGain(); l.frequency.value = o2.vib; lg.gain.value = f*.015; l.connect(lg).connect(o.frequency); l.start(T); l.stop(T + (o2.sus || 0) + dur + .1); }
    env(gn, T, vol, o2.a || .004, dur, o2.sus);
    let n = o;
    if(o2.drive){ const w = actx.createWaveShaper(); w.curve = curve(o2.drive); w.oversample = '2x'; n.connect(w); n = w; }
    if(o2.lp){ const fl = actx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(o2.lp[0], T); fl.frequency.exponentialRampToValueAtTime(o2.lp[1], T + (o2.sus || 0) + dur); fl.Q.value = o2.lp[2] || 3; n.connect(fl); n = fl; }
    if(o2.hp){ const fl = actx.createBiquadFilter(); fl.type = 'highpass'; fl.frequency.value = o2.hp; n.connect(fl); n = fl; }
    route(n, gn, bus, o2, T); o.start(T); o.stop(T + (o2.a || 0) + (o2.sus || 0) + dur + .05); return o;
  }
  function noise(bus, at, dur, vol, type, f1, f2, swell, o2){
    if(!useAudio) return; o2 = o2 || {};
    if(!noiseBuf){ noiseBuf = actx.createBuffer(1, actx.sampleRate*6, actx.sampleRate); const d = noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i] = Math.random()*2 - 1; }
    const T = at + t0, s = actx.createBufferSource(), f = actx.createBiquadFilter(), gn = actx.createGain(); s.buffer = noiseBuf; f.type = type; f.frequency.setValueAtTime(f1, T); if(f2) f.frequency.exponentialRampToValueAtTime(f2, T + dur); f.Q.value = o2.q || (type === 'bandpass' ? 3 : 1);
    if(swell){ gn.gain.setValueAtTime(.001, T); gn.gain.exponentialRampToValueAtTime(vol, T + dur*.95); gn.gain.linearRampToValueAtTime(0, T + dur); } else env(gn, T, vol, .002, dur);
    s.connect(f); route(f, gn, bus, o2, T); s.start(T, Math.random()*.5); s.stop(T + dur + .05);
  }
  const freq = (deg, oct) => { const sc = tr.scale, d = ((deg % 7) + 7) % 7, o = Math.floor(deg/7); return tr.root*Math.pow(2, (sc[d] + 12*o)/12)*(oct || 1); };
  function hit(ch, at){ events.push({ch, at}); }
  function duck(at, depth){ if(!useAudio || !['disco','synthwave','french'].includes(tr.style)) return; const T = at + t0; pump.gain.cancelScheduledValues(T); pump.gain.setValueAtTime(depth || .35, T); pump.gain.linearRampToValueAtTime(1, T + 60/tr.bpm*.6); }

  /* instruments */
  const I = {
    kick(at, v, kind){
      v = v || 1;
      if(kind === 'tight'){ osc(music, 'sine', 210, at, .16, .9*v, {glide: 50, gt: .06}); noise(music, at, .02, .35*v, 'highpass', 3000); }
      else if(kind === 'dub'){ osc(music, 'sine', 120, at, .45, 1*v, {glide: 38, gt: .2}); }
      else { osc(music, 'sine', 160, at, .3, .95*v, {glide: 42, gt: .1}); osc(music, 'triangle', 90, at, .18, .3*v, {glide: 40}); noise(music, at, .012, .22*v, 'highpass', 2500); }
      duck(at); hit('kick', at);
    },
    snare(at, v, o2){ v = v || 1; o2 = o2 || {}; noise(music, at, .2, .42*v, 'bandpass', 2200, 1600, false, {q: .8, rev: o2.rev ?? .12, dly: o2.dly || 0}); osc(music, 'triangle', 200, at, .1, .3*v, {glide: 140}); hit('snare', at); },
    rim(at, v){ noise(music, at, .04, .3*(v || 1), 'bandpass', 2600, null, false, {q: 6, dly: .45, rev: .2}); osc(music, 'triangle', 820, at, .03, .15, {dly: .3}); hit('snare', at); },
    clap(at, rev){ for(let i=0;i<3;i++) noise(music, at + i*.012, .1, .28, 'bandpass', 1300, null, false, {rev: rev || .18, pan: (i - 1)*.3}); hit('snare', at); },
    hat(at, v, open, pan){ noise(music, at, open ? .2 : .04, v, 'highpass', open ? 7500 : 9000, null, false, {pan: pan || 0}); hit('hat', at); },
    ride(at, v){ noise(music, at, .45, .07*(v || 1), 'bandpass', 5200, null, false, {q: 1.5, pan: .35}); osc(music, 'square', 3300, at, .3, .012); hit('hat', at); },
    crash(at){ noise(music, at, 1.8, .26, 'highpass', 3000, null, false, {rev: .35}); osc(music, 'sine', 70, at, .6, .45, {glide: 34}); hit('kick', at); },
    tom(at, f){ osc(music, 'sine', f, at, .22, .4, {glide: f*.55, rev: .15}); hit('snare', at); },
    bass(at, f, dur, kind){
      if(kind === 'sub'){ osc(music, 'sine', f, at, dur, .55, {a: .01}); osc(music, 'triangle', f*2, at, dur*.5, .08); }
      else if(kind === 'dub'){ osc(music, 'sine', f, at, dur, .6, {a: .015}); osc(music, 'triangle', f, at, dur*.7, .18, {lp: [600, 300, 1]}); }
      else if(kind === 'reese'){ osc(music, 'sawtooth', f, at, dur, .16, {detune: -14, lp: [800, 300, 2]}); osc(music, 'sawtooth', f, at, dur, .16, {detune: 14, lp: [800, 300, 2]}); osc(music, 'sine', f/2, at, dur, .3); }
      else if(kind === 'grit'){ osc(music, 'sawtooth', f, at, dur, .2, {drive: 6, lp: [1400, 500, 1.5]}); osc(music, 'sine', f/2, at, dur, .25); }
      else if(kind === 'funk'){ osc(music, 'square', f, at, dur, .2, {lp: [2200, 300, 7]}); osc(music, 'sine', f, at, dur, .2); }
      else osc(music, 'sawtooth', f, at, dur, .24, {lp: [kind === 'acid' ? 1800 : 1000, 150, kind === 'acid' ? 10 : 5]});
      hit('bass', at);
    },
    chord(at, degs, dur, kind, extra){
      degs.forEach((d, i) => {
        const f = freq(d, 4), pan = (i - 1)*.35;
        if(kind === 'pad') osc(music, 'sawtooth', f, at, .4, .03, {a: .15, sus: dur, lp: [2000, 700, 1], detune: i*7 - 7, pan, rev: .3});
        else if(kind === 'rhodes'){ osc(music, 'sine', f, at, dur, .07, {pan, rev: .2}); osc(music, 'triangle', f*2, at, dur*.4, .015, {pan}); }
        else if(kind === 'skank'){ osc(music, 'square', f*2, at, .1, .035, {hp: 500, lp: [3500, 1500, 1], pan, dly: .35, rev: .1}); }
        else if(kind === 'filter'){ const cut = extra || 1500; osc(music, 'sawtooth', f, at, dur, .04, {lp: [cut, cut*.6, 6], pan, detune: i*5}); osc(music, 'square', f*2, at, dur, .015, {lp: [cut, cut*.6, 6], pan: -pan}); }
        else if(kind === 'choir'){ osc(music, 'sawtooth', f, at, .5, .025, {a: .3, sus: dur, lp: [1200, 900, 8], vib: 5, pan, rev: .45}); }
        else osc(music, 'sawtooth', f, at, dur, .035, {lp: [3200, 800, 2], pan, rev: .15});
      }); hit('chords', at);
    },
    // guitare saturée : quinte + octave, deux cordes désaccordées, baffle simulé
    gtr(at, f, dur, palm){
      [1, 1.5, 2].forEach((m, i) => { if(palm && i === 2) return; [-9, 9].forEach(dt => osc(music, 'sawtooth', f*m, at, dur, palm ? .05 : .045, {detune: dt, drive: 30, lp: palm ? [900, 500, 1.5] : [3400, 2200, 1.2], pan: dt > 0 ? .4 : -.4})); });
      hit('chords', at);
    },
    supersaw(at, f, dur, v){ [-26, -12, 0, 12, 26].forEach((dt, i) => osc(music, 'sawtooth', f, at, dur, (v || .1)/5, {detune: dt, lp: [5200, 1600, 2], pan: (i - 2)*.25, rev: .2, dly: .12})); hit('lead', at); },
    talk(at, f, dur){
      if(!useAudio) return; const T = at + t0, o = actx.createOscillator(), gn = actx.createGain(), mix = actx.createGain(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f, T);
      [[700, 420], [1200, 950], [2600, 2400]].forEach(([a, b], i) => { const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 9; bp.frequency.setValueAtTime(a, T); bp.frequency.linearRampToValueAtTime(b, T + dur); const g = actx.createGain(); g.gain.value = [1, .7, .3][i]; o.connect(bp).connect(g).connect(mix); });
      env(gn, T, .5, .01, dur*.9); route(mix, gn, music, {rev: .15, dly: .15}, T); o.start(T); o.stop(T + dur + .05); hit('lead', at);
    },
    melodica(at, f, dur){ osc(music, 'square', f, at, dur, .05, {a: .03, vib: 5.5, lp: [2600, 1800, 1], dly: .3, rev: .2}); osc(music, 'triangle', f*2, at, dur*.8, .02, {a: .03}); hit('lead', at); },
    pluck(bus, at, f, v, o2){ osc(bus, 'square', f, at, .16, v, {lp: [4200, 900, 4], ...(o2 || {})}); osc(bus, 'triangle', f*2, at, .1, v*.4, o2); hit('lead', at); },
    bell(at, f, v){ osc(music, 'sine', f, at, .4, v, {rev: .3}); osc(music, 'sine', f*2.76, at, .14, v*.3); hit('lead', at); },
    boing(bus, at, f, v){ osc(bus, 'triangle', f, at, .18, v, {glide: f*2, gt: .12}); },
    wik(at, up){ osc(master, 'sawtooth', up ? 260 : 900, at, .09, .14, {glide: up ? 900 : 240, gt: .08, lp: [2400, 1200, 6]}); noise(master, at, .07, .12, 'bandpass', up ? 900 : 2400, up ? 2600 : 700); },
    perc(at, kind){
      if(kind === 'cowbell'){ osc(music, 'square', 560, at, .08, .045, {pan: .3}); osc(music, 'square', 845, at, .08, .035, {pan: .3}); }
      else if(kind === 'crackle') noise(music, at, .015, .05, 'highpass', 3000, null, false, {pan: Math.random()*1.6 - .8});
      else if(kind === 'shaker') noise(music, at, .05, .06, 'highpass', 6000, null, false, {pan: -.3});
      else if(kind === 'siren') osc(music, 'square', 600, at, .8, .03, {glide: 1400, gt: .7, dly: .4, lp: [3000, 2000, 2]});
      else noise(music, at, .05, .1, 'bandpass', 4000);
      hit('hat', at);
    },
    riser(at, dur){ noise(music, at, dur, .22, 'bandpass', 300, 7000, true, {rev: .2}); },
    swell(at, dur){ noise(music, at, dur, .16, 'highpass', 1500, 9000, true, {rev: .4}); }
  };

  /* ---------- structure de la chanson ---------- */
  function sectionOf(bar){ if(bar < 1) return null; let b = 1; for(const s of sections){ if(bar < b + s.bars) return {...s, start: b, idx: sections.indexOf(s)}; b += s.bars; } return null; }
  function chordOf(bar){ return tr.prog[((bar - 1) % tr.prog.length + tr.prog.length) % tr.prog.length]; }
  function scheduleStep(s){
    const beat = s/4, bar = Math.floor(beat/4), p = s % 16, sw = (p % 2 ? tr.swing*bpb/4 : 0), at = beat*bpb + sw;
    if(bar === 0){ if(p % 4 === 0){ osc(master, 'square', p === 0 ? 1568 : 1046, at, .06, .12); hit('kick', at); } if(p === 0) I.riser(at, 4*bpb); return; }
    const sec = sectionOf(bar); if(!sec) return;
    const L = new Set(sec.layers), st = tr.style, deg = chordOf(bar), chord = [deg, deg + 2, deg + 4], T = sec.tier === 'rest' ? 0 : sec.tier;
    const lastBar = bar === sec.start + sec.bars - 1, next = sectionOf(bar + 1), r = freq(deg, 1);
    if(bar === sec.start && p === 0 && bar > 1 && sec.tier !== 'rest') I.crash(at);
    if(lastBar && next && next.tier !== 'rest' && p === 0) I.riser(at, 4*bpb);
    if(lastBar && next && p >= 12 && L.has('snare')) I.snare(at, .4 + (p - 12)*.15);
    const K = L.has('kick'), S = L.has('snare'), Hh = L.has('hat'), B = L.has('bass'), Ch = L.has('chords'), A = L.has('arp'), P = L.has('perc'), Ld = L.has('lead'), Gt = L.has('gtr');
    const mel = motif[(bar % 2)*8 + (p >> 1)];
    if(st === 'disco'){
      if(K && p % 4 === 0) I.kick(at);
      if(S && (p === 4 || p === 12)){ I.snare(at, .6); I.clap(at); }
      if(Hh){ if(p % 4 === 2) I.hat(at, .13, true, .2); else if(T >= 2 && p % 2) I.hat(at, .05, false, -.2); }
      if(P && [3, 6, 11, 14].includes(p)) I.perc(at, 'cowbell');
      if(B && p % 2 === 0) I.bass(at, p % 4 ? r*2 : r, .16, T >= 2 ? 'acid' : 'saw');
      if(Ch && [2, 6, 10, 14].includes(p)) I.chord(at, chord, .14, 'stab');
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 2, 4, 7][(p/2) % 4], 4), .03, {dly: .2, pan: .4});
      if(Ld && [0, 6, 10].includes(p)) I.bell(at, freq(mel, 8), .035);
    }
    if(st === 'hiphop'){
      if(K && [0, 7, 10].includes(p)) I.kick(at, p ? .8 : 1);
      if(S && (p === 4 || p === 12)) I.snare(at, 1.1, {rev: .2});
      if(Hh && p % 2 === 0) I.hat(at, p % 4 ? .06 : .1, false, p % 4 ? .3 : -.1);
      if(P){ if(Math.random() < .3) I.perc(at, 'crackle'); if(p === 14 && bar % 2) I.tom(at, 180); }
      if(B && (p === 0 || p === 10)) I.bass(at, r, p ? .4 : .7, 'sub');
      if(Ch && (p === 0 || p === 8)) I.chord(at, chord, .8, 'rhodes');
      if(Ld && [0, 6, 10].includes(p)) I.bell(at, freq(mel, 8), .035);
      if(A && p % 4 === 2) I.pluck(music, at, freq(deg + 4, 8), .02, {dly: .3});
    }
    if(st === 'reggae'){
      if(K && (p === 8 || (T >= 2 && p % 4 === 0))) I.kick(at, 1, 'dub');
      if(S && p === 8) I.rim(at); if(S && T >= 2 && p === 14 && bar % 2) I.rim(at, .6);
      if(Hh && p % 2 === 0) I.hat(at, p % 4 ? .07 : .04, false, .25);
      if(Ch && (p === 4 || p === 12)) I.chord(at, chord, .1, 'skank');
      if(B){ const line = {0: 0, 3: 0, 6: 4, 10: 2, 11: 4, 14: 7}; if(line[p] !== undefined) I.bass(at, freq(deg + line[p], 1), .3, 'dub'); }
      if(Ld && (p === 0 || p === 6 || p === 10)) I.melodica(at, freq(mel, 4), .3);
      if(P && p === 0 && bar % 4 === 2) I.perc(at, 'siren');
    }
    if(st === 'synthwave'){
      if(K && (p === 0 || p === 8 || (T >= 2 && p === 11))) I.kick(at);
      if(S && (p === 4 || p === 12)){ I.snare(at, 1, {rev: .45}); I.clap(at, .35); }
      if(Hh) I.hat(at, p % 4 === 2 ? .08 : .03, false, (p % 2 ? .3 : -.3));
      if(B && p % 2 === 0) I.bass(at, p % 4 === 2 ? r*2 : r, .12, 'saw');
      if(Ch && p === 0) I.chord(at, chord, 4*bpb*.9, 'pad');
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 2, 4, 7, 9, 7, 4, 2][(p/2) % 8], 4), .03, {dly: .25, pan: .3});
      if(Ld && [0, 6, 10].includes(p)) I.supersaw(at, freq(mel, 4), .25, .07);
    }
    if(st === 'french'){
      const cut = 500 + 3200*(.5 + .5*Math.sin((bar + p/16)*Math.PI/4));
      if(K && p % 4 === 0) I.kick(at);
      if(S && (p === 4 || p === 12)) I.clap(at, .2);
      if(Hh){ if(p % 4 === 2) I.hat(at, .12, true, .2); if(T >= 2 && p % 2) I.hat(at, .04, false, -.25); }
      if(Ch && [0, 3, 6, 8, 11, 14].includes(p)) I.chord(at, chord, .15, 'filter', cut);
      if(B && [0, 3, 6, 10, 12, 14].includes(p)) I.bass(at, [0, 6, 14].includes(p) ? r : r*2, .14, 'funk');
      if(P && p % 2) I.perc(at, 'shaker');
      if(Ld && [0, 3, 6, 10].includes(p)) I.talk(at, freq(mel, 4), .22);
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 4, 7, 9][(p/2) % 4], 8), .02, {dly: .3});
    }
    if(st === 'dnb'){
      if(K && [0, 10].includes(p)) I.kick(at, 1, 'tight');
      if(S && (p === 4 || p === 12 || (T >= 3 && p === 15))) I.snare(at, p === 15 ? .5 : 1, {rev: .2});
      if(Hh) I.hat(at, p % 2 ? .05 : .1, p % 8 === 6, p % 2 ? .3 : -.3);
      if(B && (p === 0 || p === 6 || p === 10)) I.bass(at, r, p ? .3 : .55, 'reese');
      if(Ch && p === 0) I.chord(at, chord, 4*bpb*.9, 'pad');
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 4, 7, 11][(p/2) % 4], 4), .025, {dly: .3});
      if(Ld && [0, 6, 10].includes(p)) I.supersaw(at, freq(mel, 4), .2, .06);
    }
    if(st === 'punk'){
      if(K && (p === 0 || p === 8 || (T >= 2 && (p === 6 || p === 10)))) I.kick(at, 1, 'tight');
      if(S && (p === 4 || p === 12)) I.snare(at, 1.1, {rev: .1});
      if(Hh && p % 2 === 0){ if(T >= 2 && p % 4 === 0) I.ride(at, 1.4); else I.hat(at, .09, T >= 2, .2); }
      if(Gt && p % 2 === 0) I.gtr(at, r*2, .17, false);
      if(B && p % 2 === 0) I.bass(at, r, .15, 'grit');
      if(P && p === 0 && bar % 4 === 0) I.crash(at);
      if(Ld && [0, 8].includes(p)) I.supersaw(at, freq(mel, 4), .3, .05);
    }
    if(st === 'metal'){
      const dbl = T >= 2;
      if(K && (dbl ? true : p % 2 === 0)) I.kick(at, dbl ? .7 : .9, 'tight');
      if(S && (p === 4 || p === 12)) I.snare(at, 1.2, {rev: .25});
      if(Hh && p % 4 === 0) I.ride(at, 1.2);
      if(Gt){ const open = [0, 6, 10].includes(p), gallop = [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15];
        if(open) I.gtr(at, freq(deg, 2), .28, false); else if(dbl ? gallop.includes(p) : p % 2 === 0) I.gtr(at, freq(0, 2), .08, true); }
      if(B && p % 2 === 0) I.bass(at, freq(deg, 1), .14, 'grit');
      if(Ch && p === 0) I.chord(at, chord, 4*bpb*.9, 'choir');
      if(P && p === 0 && T >= 3) I.crash(at);
      if(Ld && [0, 3, 6, 10, 12].includes(p)) I.supersaw(at, freq(mel + 7, 4), .16, .06);
    }
    // couches de transe : plus le combo monte, plus le morceau s'épaissit
    if(trance >= 1 && sec.tier !== 'rest') I.perc(at, 'shaker');
    if(trance >= 2 && sec.tier !== 'rest' && p % 2 === 0) I.supersaw(at, freq(deg + [0, 2, 4, 7, 9, 7, 4, 2][(p/2) % 8], 8), .1, .05);
    if(trance >= 3 && sec.tier !== 'rest'){ if(p % 4 === 0) I.bass(at, r/2, .2, 'sub'); if(p === 8 && bar % 2) I.swell(at, 2*bpb); }
    if(trance >= 4 && p === 0) I.chord(at, chord, 4*bpb*.9, 'choir');
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
      const tier = sec.tier, fast = tr.bpm >= 140 ? .4 : tr.bpm >= 125 ? .75 : 1;
      let pos = tier === 0 ? [0, 4] : tier === 1 ? [0, 2, 4, 6].filter((_, i) => i === 0 || rng() < .75) : tier === 2 ? [0, 2, 4, 6].concat([1, 3, 5, 7].filter(() => rng() < .3*fast)) : [0, 1, 2, 3, 4, 5, 6, 7].filter(i => i % 2 === 0 || rng() < .55*fast);
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
    beatNow = 0; nextStep = 0; jumpT = 9; hurtT = 0; energy = {kick: 0, snare: 0, hat: 0, bass: 0, chords: 0, lead: 0}; events = []; bump = 0; flashR = 0; gestures.clear(); holdState = null; scratchState = null; rot = 0; finished = false; spawned = 1; secShown = -1;
    hideMenu(); api.closeEnd(); api.hud(`FACE ${t.face} · ${t.name.toUpperCase()}`);
    muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted;
    if(useAudio){ actx.resume(); master.gain.cancelScheduledValues(actx.currentTime); master.gain.setValueAtTime(.85, actx.currentTime); pump.gain.cancelScheduledValues(actx.currentTime); pump.gain.setValueAtTime(1, actx.currentTime); }
    if(useAudio){ dly.delayTime.setValueAtTime(tr.delay*bpb, actx.currentTime); tone.frequency.cancelScheduledValues(actx.currentTime); tone.frequency.setValueAtTime(20000, actx.currentTime); shelf.gain.setValueAtTime(0, actx.currentTime); }
    trance = 0; rings = [];
    lat = (useAudio ? (actx.outputLatency || actx.baseLatency || 0) : 0) + api.load('offset', 0)/1000;
    t0 = (useAudio ? actx.currentTime : performance.now()/1000) + .25;
    state = 'play';
  }
  let spawned = 1;

  const grade = d => { const a = Math.abs(d); return a < .055 ? 'perfect' : a < .11 ? 'good' : 'ok'; };
  const LABEL = {perfect: 'PARFAIT', good: 'BIEN', ok: 'OK', miss: 'RATÉ'};
  const xOf = beat => HXs + (beat - beatNow)*PPB;
  const TIERS = [0, 10, 25, 50, 100], TNAME = ['', 'EN RYTHME', 'TRANSE', 'HYPNOSE', 'NIRVANA'], TMULT = [1, 1.5, 2, 3, 4];
  function setTrance(n, t){
    if(n === trance) return; const up = n > trance; trance = n;
    if(up){ judges.push({txt: TNAME[n], sub: 'points x' + TMULT[n], x: W/2, y: H*.3, t: 0, big: true}); I.crash(t); I.swell(t, .5); bump = 1; api.vibe([20, 30, 40]);
      if(useAudio){ const T = actx.currentTime; tone.frequency.setTargetAtTime(20000, T, .05); shelf.gain.setTargetAtTime(n*1.5, T, .4); } }
  }
  function tapeStop(t){
    judges.push({txt: 'TRANSE BRISÉE', x: W/2, y: H*.3, t: 0, big: true});
    if(useAudio){ const T = actx.currentTime; tone.frequency.cancelScheduledValues(T); tone.frequency.setValueAtTime(18000, T); tone.frequency.exponentialRampToValueAtTime(260, T + .3); tone.frequency.setValueAtTime(260, T + .5); tone.frequency.exponentialRampToValueAtTime(20000, T + 1.8); shelf.gain.setTargetAtTime(0, T, .2); }
    osc(master, 'sawtooth', 420, t, 1, .16, {glide: 35, gt: .9, lp: [1800, 200, 2]});
  }
  function resolve(o, g, t, dir){
    o.done = true; o.result = g; stats[g]++;
    const x = xOf(Math.min(o.beat, Math.max(o.beat, beatNow))), y = objY(o);
    if(g === 'miss'){
      if(trance >= 1) tapeStop(t); setTrance(0, t);
      combo = 0; hearts--; hurtT = .6; flashR = 1; bump = 1;
      osc(master, 'sawtooth', 110, t, .3, .22, {glide: 50}); noise(master, t, .2, .3, 'lowpass', 900);
      api.vibe(120); api.shake(9); confetti(x, y, [INK, RED], 14, 1.1);
      if(hearts <= 0) fail();
    } else {
      combo++; maxCombo = Math.max(maxCombo, combo); setTrance(TIERS.filter(x => combo >= x).length - 1, t);
      const base = g === 'perfect' ? 100 : g === 'good' ? 60 : 25; score += Math.round(base*(1 + Math.min(combo, 50)/10)*TMULT[trance]);
      const when = Math.max(t, o.time);
      // le joueur joue la mélodie
      if(o.k === 'C'){ I.pluck(master, when, freq(o.deg, 4), g === 'perfect' ? .13 : .08); noise(master, t, .05, .2, 'highpass', 5000); split(o, dir); }
      if(o.k === 'J') I.boing(master, when, freq(chordOf(Math.floor(o.beat/4)), 2), .14);
      confetti(x, y - 10, g === 'perfect' ? [RED, PAPER, INK] : [PAPER, INK], g === 'perfect' ? 16 : 8, 1);
      if(g === 'perfect') bump = Math.max(bump, .5);
      api.vibe(g === 'perfect' ? 16 : 8);
      if(combo % 25 === 0 && !TIERS.includes(combo)) judges.push({txt: combo + ' COMBO', x: W/2, y: H*.2, t: 0, big: true});
    }
    judges.push({txt: LABEL[g], g, x: o.k === 'H' || o.k === 'S' ? HXs + 30 : x, y: Y0 - 74, t: 0, sub: (g === 'good' || g === 'ok') && o.dt != null ? (o.dt > 0 ? 'en retard' : 'en avance') : null});
  }

  /* ---------- gestes : un geste par doigt, la cible est l'obstacle le plus proche dans le temps ---------- */
  const gestures = new Map();
  function pickAt(t){
    let best = null, bd = .2;
    for(const o of objs){
      if(o.done) continue; let d;
      if(o.k === 'C' || o.k === 'J' || (o.k === 'H' && !o.holding)) d = Math.abs(t - o.time);
      else if(o.k === 'S') d = t < o.time ? o.time - t : t <= o.endTime ? 0 : t - o.endTime;
      else continue;
      if(d < bd){ bd = d; best = o; }
    }
    return best;
  }
  api.on(cv, 'pointerdown', e => {
    if(state !== 'play') return;
    const p = pt(e), t = now(); try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    const o = pickAt(t);
    if(o && o.k === 'H' && !holdState){ o.holding = true; o.startGrade = grade(t - o.time); o.dt = t - o.time; holdState = {o, id: e.pointerId, voice: holdVoice(o)}; api.vibe(10); return; }
    if(o && o.k === 'S'){ scratchState = {o, id: e.pointerId, last: p, dir: 0, acc: 0}; return; }
    gestures.set(e.pointerId, {t, x: p.x, y: p.y, done: false});
  });
  api.on(cv, 'pointermove', e => {
    const p = pt(e), t = now();
    if(scratchState && scratchState.id === e.pointerId){ const s = scratchState, dy = p.y - s.last.y, dx = p.x - s.last.x, v = Math.abs(dy) > Math.abs(dx) ? dy : dx; s.last = p;
      const d = Math.sign(v); if(d && d !== s.dir){ if(s.acc > 10 || s.dir === 0){ if(t < s.o.endTime + .1){ s.o.strokes++; I.wik(t, d < 0); bump = Math.max(bump, .25); energy.lead = 1; confetti(HXs + 10, Y0 - 10, [PAPER, INK], 3, .5); } } s.dir = d; s.acc = 0; } s.acc += Math.abs(v); return; }
    const g = gestures.get(e.pointerId); if(!g || g.done) return;
    const dx = p.x - g.x, dy = p.y - g.y, d = Math.hypot(dx, dy);
    if(d > 12){ g.done = true; cut(g.t, {x: dx, y: dy}); slash = {dx: dx/d, dy: dy/d, t: 0}; }
  });
  const up = e => {
    const t = now(), id = e.pointerId;
    const g = gestures.get(id);
    if(g && !g.done && e.type === 'pointerup'){ const p = pt(e), dx = p.x - g.x, dy = p.y - g.y, d = Math.hypot(dx, dy);
      if(d > 8){ g.done = true; cut(g.t, {x: dx, y: dy}); slash = {dx: dx/d, dy: dy/d, t: 0}; } }
    if(g && !g.done) jump(g.t);
    gestures.delete(id);
    if(holdState && holdState.id === id){ const h = holdState.o; endHold(t, t >= h.endTime - .12 ? h.startGrade : (t - h.time)/(h.endTime - h.time) > .6 ? 'ok' : 'miss'); }
    if(scratchState && scratchState.id === id) scratchState = null;
  };
  api.on(cv, 'pointerup', up); api.on(cv, 'pointercancel', up);
  const pendingNear = o => { for(const g of gestures.values()) if(!g.done && Math.abs(g.t - o.time) < .2) return true; return false; };

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
  function nearest(t, f){ return objs.filter(o => !o.done && f(o) && Math.abs(t - o.time) < .2).sort((a, b) => Math.abs(t - a.time) - Math.abs(t - b.time))[0]; }
  function cut(t, dir){
    const o = nearest(t, o => o.k === 'C' || o.bomb);
    if(o && o.bomb){ resolve(o, 'miss', t); osc(master, 'sine', 60, t, .6, .6, {glide: 30}); noise(master, t, .6, .5, 'lowpass', 2000); judges.push({txt: 'BOUM', x: W/2, y: H*.28, t: 0, big: true}); return; }
    if(o && o.k === 'C'){ o.dt = t - o.time; resolve(o, grade(o.dt), t, dir); }
    else noise(master, t, .05, .05, 'highpass', 3000);
  }
  function jump(t){
    jumpT = 0; osc(master, 'triangle', 330, t, .07, .04, {glide: 520});
    const o = nearest(t, o => o.k === 'J'); if(o){ o.dt = t - o.time; resolve(o, grade(o.dt), t); }
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
      while(nextStep/4*bpb < clock() + .15 && nextStep < totalBars*16){ scheduleStep(nextStep); nextStep++; }
      while(spawned*4 < beatNow + 10 && spawned < totalBars){ spawnBar(spawned); spawned++; }
      const air = jumpT < .42 && jumpT > .04;
      for(const o of objs){
        if(o.done) continue;
        if(o.k === 'N' && t >= o.time) collect(o, t);
        else if((o.k === 'A' || o.k === 'L') && Math.abs(t - o.time) < .12 && air) collect(o, t);
        else if((o.k === 'A' || o.k === 'L') && t > o.time + .12){ o.done = true; o.result = 'gone'; }
        else if((o.k === 'C' || o.k === 'J') && t > o.time + .2 && !(pendingNear(o) && t < o.time + .6)) resolve(o, 'miss', t);
        else if(o.k === 'H'){ if(!o.holding && t > o.time + .2) resolve(o, 'miss', t); else if(o.holding){ if(t > o.endTime + .04) endHold(t, o.startGrade); else if(Math.random() < .5) confetti(HXs, Y0 - 12, [RED, PAPER], 1, .3); } }
        else if(o.k === 'S' && t > o.endTime + .1){ const r = o.strokes/o.need; resolve(o, r >= 1.5 ? 'perfect' : r >= 1 ? 'good' : r > 0 ? 'ok' : 'miss', t); if(scratchState && scratchState.o === o) scratchState = null; }
      }
      objs = objs.filter(o => o.endBeat > beatNow - 3);
      for(let i=events.length - 1;i>=0;i--) if(events[i].at <= t){ energy[events[i].ch] = 1; events.splice(i, 1); }
      const bi = Math.floor(beatNow); if(bi !== lastBeatI){ lastBeatI = bi; if(trance >= 2) rings.push({r: 10, a: 1}); }
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
    for(const g of rings){ g.r += dt*W*1.6/(bpb || .5); g.a -= dt*1.4; } rings = rings.filter(g => g.a > 0);
    if(tr && state !== 'menu') draw(rt);
  });

  /* ---------- direction artistique : papier, encre, coups de pinceau, sérigraphie ---------- */
  const PAPERBG = '#ece5d3', STEEL = '#8f8c86', STEEL2 = '#6f6c66', LABELRED = '#b83a34';
  function grain(g, w, h, n, dark){ for(let i=0;i<n;i++){ g.fillStyle = `rgba(${dark ? '28,27,25' : '255,255,255'},${.03 + Math.random()*.08})`; const s = Math.random() < .9 ? 1 : 2; g.fillRect(Math.random()*w, Math.random()*h, s, s); } }
  function brush(g, r, x0, y0, x1, y1, width, alpha){
    const len = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0)/len, uy = (y1 - y0)/len, nx = -uy, ny = ux;
    g.lineCap = 'round';
    for(let k=-width/2; k<width/2; k+=1.3){
      const edge = 1 - Math.abs(k)/(width/2), a0 = r()*len*.18*(1 - edge*.6), a1 = len - r()*len*.22*(1 - edge*.5);
      g.strokeStyle = `rgba(28,27,25,${(alpha || .9)*(.55 + r()*.45)})`; g.lineWidth = 1 + r()*1.6;
      let a = a0; g.beginPath();
      while(a < a1){ const seg = 20 + r()*len*.3, b = Math.min(a1, a + seg); const ox = nx*(k + (r() - .5)*1.2), oy = ny*(k + (r() - .5)*1.2);
        g.moveTo(x0 + ux*a + ox, y0 + uy*a + oy); g.lineTo(x0 + ux*b + ox, y0 + uy*b + oy); a = b + (edge < .3 ? r()*16 : r()*3); }
      g.stroke();
    }
    for(let i=0;i<40;i++){ const t = r() < .5 ? r()*.15 : 1 - r()*.15, d = (r() - .5)*width*2.2, rad = r() < .9 ? .6 + r()*2 : 2 + r()*4;
      g.fillStyle = `rgba(28,27,25,${.5 + r()*.4})`; g.beginPath(); g.arc(x0 + ux*len*t + nx*d, y0 + uy*len*t + ny*d, rad, 0, 6.283); g.fill(); }
  }
  function scratches(g, r, w, h, n){ g.lineWidth = .7; for(let i=0;i<n;i++){ const x = r()*w, y = r()*h, l = 20 + r()*90, a = -.6 + (r() - .5)*.5; g.strokeStyle = `rgba(28,27,25,${.25 + r()*.35})`; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a)*l, y + Math.sin(a)*l); g.stroke(); } }
  function makeBackdrop(t, w, h, seed){
    const c = document.createElement('canvas'), sc = 2; c.width = w*sc; c.height = h*sc; const g = c.getContext('2d'); g.scale(sc, sc);
    const r = rngFrom(seed);
    g.fillStyle = PAPERBG; g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'multiply'; g.fillStyle = t ? t.bg[0] : '#f2cd4c'; g.globalAlpha = .28; g.fillRect(0, 0, w, h); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    grain(g, w, h, w*h/40, true); grain(g, w, h, w*h/120, false);
    const n = 3 + Math.floor(r()*2);
    for(let i=0;i<n;i++){ const cx = w*(.1 + r()*.8), cy = h*(.08 + r()*.84), L = w*(.5 + r()*.6), a = -.75 + (r() - .5)*.25;
      brush(g, r, cx - Math.cos(a)*L/2, cy - Math.sin(a)*L/2, cx + Math.cos(a)*L/2, cy + Math.sin(a)*L/2, 18 + r()*34, .85); }
    scratches(g, r, w, h, 40);
    const vg = g.createRadialGradient(w/2, h/2, Math.min(w, h)*.3, w/2, h/2, Math.max(w, h)*.75); vg.addColorStop(0, 'rgba(60,40,10,0)'); vg.addColorStop(1, 'rgba(60,40,10,.22)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
    return c;
  }
  // cassette dessinée façon sérigraphie, pour le menu
  function makeCassette(t, open){
    const c = document.createElement('canvas'), w = 320, h = 200; c.width = w; c.height = h; const g = c.getContext('2d'), r = rngFrom('k7' + t.id);
    const rr = (x, y, ww, hh, rad) => { g.beginPath(); g.moveTo(x + rad, y); g.arcTo(x + ww, y, x + ww, y + hh, rad); g.arcTo(x + ww, y + hh, x, y + hh, rad); g.arcTo(x, y + hh, x, y, rad); g.arcTo(x, y, x + ww, y, rad); g.closePath(); };
    brush(g, r, 10, h - 20, w - 10, 20, 40, .55);
    g.fillStyle = STEEL; rr(14, 14, w - 28, h - 28, 12); g.fill();
    g.save(); rr(14, 14, w - 28, h - 28, 12); g.clip(); g.strokeStyle = 'rgba(28,27,25,.16)'; g.lineWidth = 1; for(let x=-200; x<w; x+=5){ g.beginPath(); g.moveTo(x, 14); g.lineTo(x + 170, h); g.stroke(); } g.restore();
    g.strokeStyle = INK; g.lineWidth = 3; rr(14, 14, w - 28, h - 28, 12); g.stroke();
    [[34, 34], [w - 34, 34], [34, h - 34], [w - 34, h - 34]].forEach(([x, y]) => { g.fillStyle = PAPERBG; g.beginPath(); g.arc(x, y, 9, 0, 6.283); g.fill(); g.stroke(); g.beginPath(); g.moveTo(x - 5, y); g.lineTo(x + 5, y); g.stroke(); });
    g.fillStyle = LABELRED; rr(92, 22, 136, 34, 6); g.fill(); g.lineWidth = 2.5; g.stroke();
    g.fillStyle = PAPER; g.font = `13px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('FACE ' + t.face, 160, 40);
    g.fillStyle = INK; rr(44, 66, w - 88, 64, 6); g.fill();
    g.fillStyle = '#efe7d5'; rr(54, 74, w - 108, 48, 4); g.fill();
    g.fillStyle = t.bg[0]; g.fillRect(54, 74, 10, 48);
    g.strokeStyle = 'rgba(28,27,25,.25)'; g.lineWidth = 1; for(let i=0;i<6;i++){ g.beginPath(); g.moveTo(72 + r()*20, 82 + i*7); g.lineTo(96 + r()*40, 82 + i*7); g.stroke(); g.beginPath(); g.moveTo(210 + r()*20, 82 + i*7); g.lineTo(240 + r()*20, 82 + i*7); g.stroke(); }
    for(const x of [128, 192]){ g.fillStyle = INK; g.beginPath(); g.arc(x, 98, 20, 0, 6.283); g.fill(); g.fillStyle = '#efe7d5'; g.beginPath(); g.arc(x, 98, 11, 0, 6.283); g.fill(); g.fillStyle = INK; for(let i=0;i<6;i++){ const a = i/6*6.283; g.fillRect(x + Math.cos(a)*11 - 2.5, 98 + Math.sin(a)*11 - 2.5, 5, 5); } }
    g.fillStyle = STEEL2; g.beginPath(); g.moveTo(70, h - 14); g.lineTo(96, 142); g.lineTo(w - 96, 142); g.lineTo(w - 70, h - 14); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke();
    g.fillStyle = INK; rr(104, 150, w - 208, 26, 3); g.fill(); g.fillStyle = PAPER; g.font = `14px ${FONT}`; g.fillText(t.name.toUpperCase(), 160, 164);
    for(let i=0;i<70;i++){ g.fillStyle = `rgba(28,27,25,${.3 + r()*.5})`; g.beginPath(); g.arc(r()*w, r()*h, r() < .85 ? r()*1.4 : 1.5 + r()*2.5, 0, 6.283); g.fill(); }
    if(!open){ g.fillStyle = 'rgba(236,229,211,.55)'; g.fillRect(0, 0, w, h); }
    return c.toDataURL('image/png');
  }
  let backdrop = null, backdropFor = null;

  /* ---------- dessin ---------- */
  function shadow(on, blur, oy){ if(on){ ctx.shadowColor = 'rgba(40,20,0,.28)'; ctx.shadowBlur = blur || 14; ctx.shadowOffsetY = oy == null ? 6 : oy; } else { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; } }
  function rrect(x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function hub(x, y, r, a, hole){
    ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1.5, r*.08); ctx.stroke();
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
      if(o.shape === 'tall'){ ctx.fillStyle = PAPER; rrect(-11, -30, 22, 60, 5); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = RED; for(let i=0;i<3;i++) ctx.fillRect(-11, -20 + i*16, 22, 4); }
      else if(o.shape === 'flyer'){ ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 6.283); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 9, rot, rot + 1.4); ctx.stroke(); }
      else { ctx.fillStyle = PAPER; rrect(-14, -14, 28, 28, 5); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.save(); rrect(-14, -14, 28, 28, 5); ctx.clip(); ctx.strokeStyle = 'rgba(28,27,25,.18)'; ctx.lineWidth = 1; for(let i=-28;i<28;i+=5){ ctx.beginPath(); ctx.moveTo(i, 14); ctx.lineTo(i + 28, -14); ctx.stroke(); } ctx.restore(); ctx.fillStyle = RED; ctx.fillRect(-14, -4, 28, 6); ctx.fillStyle = INK; ctx.fillRect(-8, 6, 16, 2); }
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
    if(d === 'speakers'){ for(const sx of [W*.2, W*.8]){ const cw = W*.3, chh = H*.27, cy0 = H*.04; shadow(true, 16, 8); ctx.fillStyle = INK; rrect(sx - cw/2, cy0, cw, chh, 8); ctx.fill(); shadow(false);
        const cr = cw*.32*(1 + k*.12), cyy = cy0 + chh*.62; ctx.fillStyle = '#2c2a27'; ctx.beginPath(); ctx.arc(sx, cyy, cw*.38, 0, 6.283); ctx.fill(); ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(sx, cyy, cr, 0, 6.283); ctx.fill(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx, cyy, cr*.45, 0, 6.283); ctx.fill(); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(sx, cyy, cr*.18, 0, 6.283); ctx.fill();
        ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(sx, cy0 + chh*.18, cw*.08*(1 + energy.hat*.3), 0, 6.283); ctx.fill(); } }
    if(d === 'leds'){ const cols = 9, rows = 6, cs = W/cols, y0 = 10, beat = Math.floor(beatNow);
      for(let j=0;j<rows;j++) for(let i=0;i<cols;i++){ const on = (i + j + beat) % 4 === 0 || (Math.abs(i - cols/2 + .5) + Math.abs(j - rows/2 + .5) < 1 + k*3); ctx.fillStyle = on ? `rgba(244,240,230,${.55 + k*.4})` : 'rgba(28,27,25,.18)'; rrect(i*cs + 3, y0 + j*cs*.8, cs - 6, cs*.8 - 6, 4); ctx.fill(); } }
    if(d === 'scribble'){ const sn = energy.snare;
      [[.2, .12, .4, .1, -.12], [.72, .2, .36, .12, .1], [.45, .3, .5, .08, -.05]].forEach(([x, y, w, h, a], i) => { ctx.save(); ctx.translate(W*x, H*y); ctx.rotate(a + (i % 2 ? sn : -sn)*.05); ctx.fillStyle = i === 1 ? INK : PAPER; ctx.fillRect(-W*w/2, -H*h/2, W*w, H*h); ctx.restore(); });
      ctx.strokeStyle = RED; ctx.lineWidth = 5 + sn*3; ctx.lineJoin = 'miter'; ctx.beginPath(); for(let i=0;i<9;i++){ const x = W*.08 + i*W*.105, y = H*.05 + (i % 2 ? 26 : 0) + (sn ? (Math.random() - .5)*6 : 0); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    if(d === 'flames'){ const base = H*.4; for(const [col, hgt, ph] of [['#ffb347', 1, 0], ['#ffdd57', .6, 2]]){ ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, base);
        for(let x=0;x<=W;x+=14){ const h = (24 + 46*Math.abs(Math.sin(x*.045 + rt*5 + ph)) + k*40)*hgt; ctx.lineTo(x, base - h); ctx.lineTo(x + 7, base - h*.4); } ctx.lineTo(W, base); ctx.closePath(); ctx.fill(); }
      if(energy.snare > .85 && trance >= 1){ ctx.strokeStyle = PAPER; ctx.lineWidth = 3; ctx.beginPath(); let x = W*(.3 + Math.random()*.4), y = 0; ctx.moveTo(x, y); while(y < base*.8){ x += (Math.random() - .5)*40; y += 22; ctx.lineTo(x, y); } ctx.stroke(); } }
    if(d === 'stripes'){ ctx.rotate(-.35); ctx.fillStyle = `rgba(255,255,255,${.1 + k*.08})`; const off = (beatNow*40) % 60; for(let x=-H; x<W + H; x+=60){ ctx.fillRect(x - off, -H, 26, H*3); } }
    ctx.restore();
  }
  function draw(rt){
    const bar = Math.floor(beatNow/4), sec = sectionOf(bar), ek = energy.kick;
    const z = 1 + bump*.025 + ek*.008;
    ctx.save(); ctx.translate(W/2, H/2); ctx.scale(z, z); ctx.translate(-W/2, -H/2);
    if(backdropFor !== tr.id){ backdrop = makeBackdrop(tr, W + 40, H + 40, tr.id); backdropFor = tr.id; }
    { const bz = 1 + ek*.012; ctx.save(); ctx.translate(W/2, H/2); ctx.scale(bz, bz); ctx.translate(-W/2, -H/2); ctx.drawImage(backdrop, -20, -20, W + 40, H + 40); ctx.restore(); }
    drawDeco(rt);
    if(trance >= 1){
      ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = `hsl(${(rt*50) % 360},90%,60%)`; ctx.globalAlpha = .25 + trance*.12; ctx.fillRect(-20, -20, W + 40, H + 40); ctx.restore();
      if(trance >= 3){ ctx.save(); ctx.translate(W/2, H*.22); ctx.rotate(rt*.6); const R = W*.75*(1 + ek*.1); for(let i=0;i<14;i++){ ctx.rotate(6.283/14); ctx.fillStyle = i % 2 ? 'rgba(244,240,230,.16)' : 'rgba(28,27,25,.1)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R, -R*.22); ctx.lineTo(R, R*.22); ctx.closePath(); ctx.fill(); } ctx.restore(); }
      if(trance >= 4){ ctx.save(); ctx.translate(W/2, H*.22); for(let i=0;i<48;i++){ const a = i*2.39996, z = ((rt*.9 + i*.137) % 1), r0 = z*z*W, r1 = r0 + 8 + z*40; ctx.strokeStyle = `hsla(${(i*30 + rt*120) % 360},95%,65%,${z})`; ctx.lineWidth = 1 + z*3; ctx.beginPath(); ctx.moveTo(Math.cos(a)*r0, Math.sin(a)*r0); ctx.lineTo(Math.cos(a)*r1, Math.sin(a)*r1); ctx.stroke(); } ctx.restore(); }
      for(const g of rings){ ctx.strokeStyle = `rgba(244,240,230,${g.a*.7})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(HXs, Y0, g.r, 0, 6.283); ctx.stroke(); }
      if(trance >= 3 && !api.reduced && ((beatNow % 4) + 4) % 4 < .07){ ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
    }
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
    if(trance >= 3){ ctx.fillStyle = 'rgba(215,38,61,.55)'; ctx.fillRect(-4, Y0 - 3, W + 8, TT); ctx.fillStyle = 'rgba(61,220,255,.45)'; ctx.fillRect(4, Y0 + 3, W, TT); }
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
    if(combo > 2){ ctx.textAlign = 'right'; ctx.fillStyle = INK; ctx.font = `${15 + Math.min(combo, 60)/4 + ek*3}px ${FONT}`; ctx.fillText(combo + 'x', W - 16, 70);
      if(trance){ ctx.font = `${11 + ek*3}px ${FONT}`; ctx.fillStyle = RED; ctx.fillText(TNAME[trance] + ' · x' + TMULT[trance], W - 16, 90); } }
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
  menu.style.cssText = `position:absolute;inset:0;overflow:auto;background:${PAPERBG};color:${INK};padding:18px 16px 28px;display:flex;flex-direction:column;gap:14px;z-index:4;font-family:"Chakra Petch",sans-serif;touch-action:pan-y;background-size:cover;background-position:center`;
  stage.appendChild(menu);
  const artCache = {};
  const stamp = `border:none;border-radius:4px;background:${INK};color:${PAPER};font-family:${FONT};cursor:pointer;box-shadow:2px 2px 0 ${LABELRED}`;
  function showMenu(){
    api.closeEnd(); state = 'menu'; if(useAudio && music) music.gain.setValueAtTime(.9, actx.currentTime);
    api.hud(''); const b = bests(), n = bank();
    if(!menu.dataset.bg){ const bg = makeBackdrop(null, Math.round(W), Math.round(H), 'menu'); menu.style.backgroundImage = `url(${bg.toDataURL('image/jpeg', .85)})`; menu.dataset.bg = '1'; }
    menu.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
        <div><div style="font-family:${FONT};font-size:44px;line-height:.9;letter-spacing:-1px">K7</div><div style="font-family:${FONT};font-size:44px;line-height:.9;color:${LABELRED};letter-spacing:-1px">CUT</div>
          <div style="font-size:13px;margin-top:6px;max-width:22ch">Coupe, saute, maintiens et scratche en rythme.</div></div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
          <div style="background:${INK};color:${PAPER};font-family:${FONT};font-size:18px;padding:6px 12px;border-radius:4px;transform:rotate(-3deg);box-shadow:3px 3px 0 ${LABELRED}">♪ ${n}</div>
          <button id="k7mute" style="${stamp};font-size:10px;padding:7px 9px">${api.store.load('muted', false) ? 'SON OFF' : 'SON ON'}</button></div></div>
      <div id="k7list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px"></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center;font-size:12px;line-height:1.25">
        ${[['GLISSE','couper','M4 20 L20 4'],['TAPE','sauter','M12 18 V6 M7 11 L12 6 L17 11'],['MAINTIENS','note longue','M4 12 H20'],['ALLER-RETOUR','scratch','M4 14 L8 8 L12 14 L16 8 L20 14']].map(([a, c, d]) => `<div style="border:2px solid ${INK};border-radius:4px;padding:6px 2px;background:rgba(236,229,211,.7)"><svg width="28" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="${LABELRED}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><b style="font-family:${FONT};font-size:8px;display:block">${a}</b>${c}</div>`).join('')}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border:2px solid ${INK};border-radius:4px;padding:6px 10px;font-size:13px;background:rgba(236,229,211,.7)"><span>Calage du rythme : <b id="k7off">${api.load('offset', 0)} ms</b></span><span style="display:flex;gap:6px"><button id="k7offm" style="${stamp};width:34px;height:28px;font-size:14px">−</button><button id="k7offp" style="${stamp};width:34px;height:28px;font-size:14px">+</button></span></div>
      <p style="margin:0;font-size:12.5px;line-height:1.4;background:rgba(236,229,211,.7);padding:6px 8px;border-radius:4px">Ramasse les notes ♪ (saute pour celles en l'air) : ton total ouvre les cassettes suivantes. Enchaîne sans rater pour entrer en transe. Coupes « en retard » alors que tu es dans le temps : monte le calage.</p>`;
    const list = menu.querySelector('#k7list');
    TRACKS.forEach(t => {
      const open = unlocked(t), info = b[t.id], afford = !open && n >= t.cost, key = t.id + (open || afford ? '1' : '0');
      if(!artCache[key]) artCache[key] = makeCassette(t, open || afford);
      const el = document.createElement('button');
      el.style.cssText = `all:unset;cursor:pointer;display:flex;flex-direction:column;gap:4px;min-width:0;transition:transform .12s;background:rgba(236,229,211,.82);border-radius:6px;padding:4px 2px 8px`;
      el.onpointerdown = () => el.style.transform = 'scale(.96) rotate(-1deg)'; el.onpointerup = el.onpointerleave = () => el.style.transform = '';
      el.innerHTML = `<img src="${artCache[key]}" alt="Cassette ${t.name}" style="width:100%;height:auto;display:block;filter:drop-shadow(0 6px 8px rgba(40,20,0,.3))">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:6px;padding:0 4px"><b style="font-family:${FONT};font-size:13px">${t.name}</b><span style="font-size:11.5px;opacity:.75;white-space:nowrap">${t.bpm} BPM</span></div>
        <div style="padding:0 4px;font-size:12px;line-height:1.3">${t.label.split(' · ')[0]} · ${t.gestures}</div>
        <div style="padding:0 4px;font-size:12.5px;font-weight:700;color:${open ? INK : LABELRED}">${open ? (info ? '★'.repeat(info.stars) + '☆'.repeat(3 - info.stars) + ' · ' + info.score : 'À jouer') : afford ? 'Touche pour l\'ouvrir' : `Fermée · ${t.cost} ♪`}</div>`;
      el.onclick = () => {
        if(!open && !afford) { api.sfx.lose(); el.animate([{transform: 'translateX(-4px)'}, {transform: 'translateX(4px)'}, {transform: 'none'}], {duration: 200}); return; }
        if(!open && afford){ api.save('unlock.' + t.id, true); api.sfx.coin(); return showMenu(); }
        startTrack(t);
      };
      list.appendChild(el);
    });
    menu.hidden = false; stopBtn.hidden = true;
    const setOff = d => { const v = Math.max(-200, Math.min(200, api.load('offset', 0) + d)); api.save('offset', v); menu.querySelector('#k7off').textContent = v + ' ms'; };
    menu.querySelector('#k7offm').onclick = () => setOff(-10); menu.querySelector('#k7offp').onclick = () => setOff(10);
    const mb = menu.querySelector('#k7mute'); mb.onclick = () => { api.store.save('muted', !api.store.load('muted', false)); showMenu(); };
  }
  function hideMenu(){ menu.hidden = true; stopBtn.hidden = false; }

  window.__k7 = {now: () => now(), get objs(){ return objs; }, get state(){ return state; }, get stats(){ return stats; }, get combo(){ return combo; }, get hearts(){ return hearts; }, get bpb(){ return bpb; }, start: i => startTrack(TRACKS[i]), tracks: TRACKS, cv};
  showMenu();
  return () => { try{ if(holdState && holdState.voice) holdState.voice.stop(); if(actx) actx.close(); }catch(e){} };
}};
})();
