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
  // une marche, un palier, une marche, un palier : on monte puis on souffle
  const s = [{name: 'Intro', bars: 4, tier: 0, call: true, acts: 'CJ', layers: L[0]}, {name: 'Couplet', bars: 8, tier: 0, acts: o.verseActs || 'CJ', layers: L[1]}];
  if(nw) s.push({name: o.newName, bars: 4, tier: 0, call: true, acts: nw + 'C', layers: L[1]});
  s.push({name: 'Couplet', bars: 8, tier: 1, acts: all, layers: L[2]}, {name: 'Pause', bars: 4, tier: 'rest', acts: 'C', layers: L[3]},
    {name: 'Refrain', bars: 8, tier: 1, acts: all, layers: L[4]}, {name: 'Refrain', bars: 8, tier: 2, acts: all, layers: L[5]},
    {name: 'Final', bars: o.finalBars || 8, tier: 3, acts: all, layers: L[5]}, {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: L[6]});
  return s;
}
const TRACKS = [
  { id: 'soleil', face: 'A', name: 'Soleil', style: 'disco', label: 'Disco · 104 BPM', bpm: 104, root: 65.41, scale: MAJ, prog: [0, 5, 3, 4], swing: 0, cost: 0,
    bg: ['#f2cd4c', '#d6a93a'], deco: 'rays', gestures: 'Couper · Sauter', delay: .75,
    sections: plan([['kick','bass'], ['kick','bass','hat','snare'], ['kick','bass','hat','snare','chords'], ['chords','hat','perc'], ['kick','bass','hat','snare','chords','perc'], ALL, ['chords']], {finalBars: 6}) },
  { id: 'bobine', face: 'B', name: 'Bobine', style: 'hiphop', label: 'Boom bap · 88 BPM', bpm: 88, root: 55, scale: MIN, prog: [0, 5, 6, 4], swing: .2, cost: 2,
    bg: ['#f2a65a', '#d9763f'], deco: 'vinyl', gestures: '+ Scratch', delay: .5,
    sections: plan([['kick','snare','perc'], ['kick','snare','hat','bass','perc'], ['kick','snare','hat','bass','chords','perc'], ['chords','perc'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['chords','perc']], {newAct: 'S', newName: 'Scratch !', all: 'CJS'}) },
  { id: 'dub', face: 'C', name: 'Dub', style: 'reggae', label: 'Reggae dub · 76 BPM', bpm: 76, root: 55, scale: MIN, prog: [0, 3, 0, 4], swing: .08, cost: 4,
    bg: ['#8fce6a', '#3f8a4f'], deco: 'speakers', gestures: '+ Notes longues', delay: .75,
    sections: plan([['kick','hat','bass'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','lead'], ['bass','chords','perc'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['bass','chords']], {newAct: 'H', newName: 'Maintiens !', all: 'CJH'}) },
  { id: 'neon', face: 'D', name: 'Néon', style: 'synthwave', label: 'Synthwave · 116 BPM', bpm: 116, root: 82.41, scale: MIN, prog: [0, 5, 2, 6], swing: 0, cost: 6,
    bg: ['#f58fb2', '#c9568a'], deco: 'grid', gestures: 'Maintiens + scratch', delay: .75,
    sections: plan([['kick','bass','chords'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','arp'], ['chords','arp'], ALL, ALL, ['chords','arp']], {newAct: 'SH', newName: 'Mélange !', all: 'CJSH'}) },
  { id: 'robot', face: 'E', name: 'Robot', style: 'french', label: 'French touch · 122 BPM', bpm: 122, root: 73.42, scale: DOR, prog: [0, 3, 5, 4], swing: 0, cost: 9,
    bg: ['#b7a6ff', '#6b55d6'], deco: 'leds', gestures: 'Tout + filtres', delay: .75,
    sections: plan([['kick','chords'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','perc'], ['chords','lead'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['chords']], {all: 'CJSH', verseActs: 'CJH'}) },
  { id: 'rush', face: 'F', name: 'Rush', style: 'dnb', label: 'Breakbeat · 132 BPM', bpm: 132, root: 73.42, scale: MIN, prog: [0, 3, 5, 4], swing: 0, cost: 12,
    bg: ['#6fd3c7', '#2f9c95'], deco: 'stripes', gestures: 'Tout à la fois', delay: .5,
    sections: plan([['kick','hat','bass'], ['kick','snare','hat','bass','chords'], ['kick','snare','hat','bass','chords','arp'], ['chords','arp'], ALL, ALL, ['chords']], {all: 'CJSH', verseActs: 'CJS'}) },
  { id: 'pogo', face: 'G', name: 'Pogo', style: 'punk', label: 'Punk · 168 BPM', bpm: 168, root: 82.41, scale: MAJ, prog: [0, 3, 4, 3], swing: 0, cost: 15,
    bg: ['#c8f04a', '#86b22a'], deco: 'scribble', gestures: 'Vite et fort', delay: .5,
    sections: plan([['kick','snare','gtr'], ['kick','snare','hat','bass','gtr'], ['kick','snare','hat','bass','gtr','perc'], ['gtr','hat'], ['kick','snare','hat','bass','gtr','perc'], ALL, ['gtr']], {all: 'CJS'}) },
  { id: 'riff', face: 'H', name: 'Riff', style: 'metal', label: 'Métal · 150 BPM', bpm: 150, root: 41.2, scale: PHR, prog: [0, 0, 1, 0], swing: 0, cost: 18,
    bg: ['#e0533f', '#7a1d14'], deco: 'flames', gestures: 'Le boss final', delay: .375,
    sections: plan([['gtr','perc'], ['kick','snare','hat','bass','gtr'], ['kick','snare','hat','bass','gtr','perc'], ['gtr','chords'], ['kick','snare','hat','bass','gtr','perc','lead'], ALL, ['gtr','chords']], {all: 'CJSH', verseActs: 'CJ'}) }
];

/* rythmes d'une mesure (8 croches) : C = coupe (la mélodie, souvent sur les temps), J = rond-cœur (la caisse claire, sur 2 et 4), n = note à ramasser */
const RHY = [
  ['C...J...', 'C...C...', 'C.....J.', 'C...n.J.', 'C.n.C...', 'C...J.n.'],
  ['C.J.C.J.', 'C.J...J.', 'C...C.J.', 'C.C.J...', 'C.J.C.n.', 'C..CJ...', 'C.J.CC..'],
  ['C.JCC.J.', 'C.J.CCJ.', 'CC.JC.J.', 'C.JC.CJ.', 'C..CJ.C.', 'C.J..CJC', 'CCJ.C.J.'],
  ['CCJCCCJC', 'C.JCCJCJ', 'CCJ.CCJC', 'C.JCC.JC', 'CCJCC.JJ', 'C.JCCJ.C']
];
const VERSION = '0.19.0';
const DIFFS = [
  {id: 'apprenti', name: 'Apprenti', note: 'Pour apprendre, tout en douceur', mult: 1, win: 1.55, dens: .6, cap: 1, gap: .55, easy: true, hearts: 5, disc: [70, 85, 95]},
  {id: 'musicien', name: 'Musicien', note: 'Le jeu tel qu\'il est pensé', mult: 1.5, win: 1.15, dens: .85, cap: 2, gap: .34, hearts: 3, disc: [60, 80, 92]},
  {id: 'virtuose', name: 'Virtuose', note: 'Plus dense, plus précis', mult: 2.5, win: .9, dens: 1.15, cap: 3, gap: .24, hearts: 3, disc: [55, 75, 90]},
  {id: 'roi', name: 'Roi', note: 'Fenêtres serrées, aucune pitié', mult: 4, win: .75, dens: 1.4, cap: 3, gap: .19, hearts: 1, disc: [50, 70, 86]}
];
const TITLES = [[0, 'Apprenti'], [60, 'Musicien'], [180, 'Virtuose'], [400, 'Maître du scratch'], [800, 'Roi du scratch et du rythme']];
function rngFrom(str){ let h = 2166136261; for(const c of str){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } let s = h >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; }; }

G.trancheroute = { mount(stage, api){
  if(!document.getElementById('font-rubikmono')){ const l = document.createElement('link'); l.id = 'font-rubikmono'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Permanent+Marker&family=Sedgwick+Ave+Display&display=swap'; document.head.appendChild(l); }
  const {cv, ctx, W, H, pt} = api.canvas();
  let muted = api.store.load('muted', false);
  const TAPEY = Math.round(H*.48), TT = 30, Y0 = TAPEY - TT/2, HXs = Math.round(W*.26);
  const REELY = Math.round(H*.83), REELR = Math.min(W*.19, H*.11), EQY = Math.round(H*.665);
  let PPB = 100;
  let actx = null, master = null, music = null, pump = null, t0 = 0, useAudio = false;
  let diff = DIFFS[0], tr = null, sections, totalBars, bpb, objs, bits, judges, state = 'menu', score, combo, maxCombo, hearts, stats, beatNow, nextStep, jumpT, hurtT, energy, events, bump, flashR, gesture, motif, notesRun, holdState, scratchState, rot, finished, trance = 0, rings = [], hookMask = [1,0,0,1,0,1,0,0];

  /* ---------- sauvegarde ---------- */
  const bank = () => api.load('notes', 0);
  const bests = () => api.load('bests', {});
  // les disques : le meilleur résultat de chaque cassette (0 à 3), tous niveaux confondus
  const discsOf = t => { const b = bests(); return Math.max(b[t.id] ? b[t.id].discs || 0 : 0, ...DIFFS.map(d => b[t.id + '.' + d.id] ? b[t.id + '.' + d.id].discs || 0 : 0)); };
  const discs = () => TRACKS.reduce((a, t) => a + discsOf(t), 0);
  const DISC = n => '◉'.repeat(n) + '○'.repeat(3 - n);
  const titleOf = n => TITLES.filter(x => n >= x[0]).pop()[1];
  const unlocked = t => t.cost === 0 || api.load('unlock.' + t.id, false);

  /* ---------- audio : bus musique (filtre, pompe) + réverb + écho, compresseur et limiteur ---------- */
  let tone = null, shelf = null, revIn = null, dlyIn = null, dly = null, curves = {}, vduck = null, vox = null, voiceFrom = 0, voiceUntil = 0;
  function impulse(sec, decay){ const n = Math.floor(actx.sampleRate*sec), b = actx.createBuffer(2, n, actx.sampleRate); for(let c=0;c<2;c++){ const d = b.getChannelData(c); for(let i=0;i<n;i++) d[i] = (Math.random()*2 - 1)*Math.pow(1 - i/n, decay); } return b; }
  function audioInit(){
    if(muted || actx) return;
    try{
      actx = new (window.AudioContext || window.webkitAudioContext)({latencyHint: 'interactive'});
      // compresseur à attaque lente (les attaques de batterie passent devant), saturation douce qui colle le tout, puis limiteur
      const comp = actx.createDynamicsCompressor(); comp.threshold.value = -16; comp.knee.value = 6; comp.ratio.value = 3; comp.attack.value = .015; comp.release.value = .12;
      const glue = actx.createWaveShaper(); glue.curve = curve(1.6); glue.oversample = '2x';
      const lim = actx.createDynamicsCompressor(); lim.threshold.value = -1.5; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = .001; lim.release.value = .05;
      master = actx.createGain(); master.gain.value = .7; master.connect(comp).connect(glue).connect(lim).connect(actx.destination);
      pump = actx.createGain(); pump.connect(master);
      shelf = actx.createBiquadFilter(); shelf.type = 'highshelf'; shelf.frequency.value = 5000; shelf.gain.value = 0; shelf.connect(pump);
      tone = actx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 20000; tone.Q.value = .8; tone.connect(shelf);
      // la musique se pousse quand la voix chante (gain séparé, pour ne pas se battre avec le reste)
      vduck = actx.createGain(); vduck.connect(tone);
      const low = actx.createBiquadFilter(); low.type = 'lowshelf'; low.frequency.value = 110; low.gain.value = 3.5; low.connect(vduck);
      music = actx.createGain(); music.gain.value = .8; music.connect(low);
      // bus de la voix : on coupe le grave qui bave, on avance la présence, on tient le volume
      const vhp = actx.createBiquadFilter(), vpk = actx.createBiquadFilter(), vcomp = actx.createDynamicsCompressor();
      vhp.type = 'highpass'; vhp.frequency.value = 230; vpk.type = 'peaking'; vpk.frequency.value = 2800; vpk.Q.value = 1; vpk.gain.value = 4;
      vcomp.threshold.value = -24; vcomp.ratio.value = 5; vcomp.attack.value = .004; vcomp.release.value = .1;
      vox = actx.createGain(); vox.gain.value = .8; vox.connect(vhp).connect(vpk).connect(vcomp).connect(master);
      const rev = actx.createConvolver(); rev.buffer = impulse(2.4, 3); const revOut = actx.createGain(); revOut.gain.value = .32; revIn = actx.createGain(); revIn.connect(rev).connect(revOut).connect(master);
      setTimeout(loadVoice, 0);
      dly = actx.createDelay(2); const fb = actx.createGain(), dlf = actx.createBiquadFilter(), dlyOut = actx.createGain(); fb.gain.value = .42; dlf.type = 'lowpass'; dlf.frequency.value = 2400; dlyOut.gain.value = .38;
      dlyIn = actx.createGain(); dlyIn.connect(dly); dly.connect(dlf).connect(fb).connect(dly); dlf.connect(dlyOut).connect(master);
    }catch(e){ actx = null; }
  }
  /* ---------- la voix : 7 syllabes chantées, transposées sur la mélodie ---------- */
  const VSEG = [[.05, .28, 183.9], [.65, .94, 216.2], [1.25, 1.54, 242.4], [1.91, 2.2, 280.7], [2.53, 2.84, 326.5], [3.13, 3.54, 363.6], [3.77, 4.6, 363.6]];
  let voiceBuf = null;
  function loadVoice(){
    if(voiceBuf || !actx || !window.K7_VOICE) return;
    try{ const bin = atob(window.K7_VOICE.split(',')[1]), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i);
      actx.decodeAudioData(u.buffer, buf => { voiceBuf = buf; }, () => {}); }catch(e){}
  }
  const voiceOn = () => api.load('voice', true) && voiceBuf;
  function sing(bus, at, f, idx, vol, o2){
    if(!useAudio || !voiceBuf) return false; o2 = o2 || {};
    const sg = VSEG[((idx % 7) + 7) % 7], T = RT(at), src = actx.createBufferSource(), gn = actx.createGain();
    // on reste près de la hauteur naturelle de la voix (au-delà d'une quinte, elle sonne en canard ou en ogre)
    let pr = f*tapeK()/sg[2]; while(pr > 1.42) pr /= 2; while(pr < .71) pr *= 2;
    const dur = (o2.long ? sg[1] - sg[0] : Math.min(sg[1] - sg[0], .26))/pr;
    src.buffer = voiceBuf; src.playbackRate.value = pr*(o2.det || 1);
    gn.gain.setValueAtTime(0, T); gn.gain.linearRampToValueAtTime(vol, T + .012); gn.gain.setValueAtTime(vol, T + Math.max(.02, dur - .05)); gn.gain.linearRampToValueAtTime(0, T + dur);
    // couleur de la voix selon le style : saturation, filtre téléphone, etc.
    let n = src;
    if(o2.drive){ const ws = actx.createWaveShaper(); ws.curve = curve(o2.drive); ws.oversample = '2x'; n.connect(ws); n = ws; }
    if(o2.hp){ const f2 = actx.createBiquadFilter(); f2.type = 'highpass'; f2.frequency.value = o2.hp; n.connect(f2); n = f2; }
    if(o2.lp){ const f2 = actx.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = o2.lp; n.connect(f2); n = f2; }
    route(n, gn, bus, {rev: o2.rev ?? .18, dly: o2.dly || 0, pan: o2.pan || 0}, T); src.start(T, sg[0], dur*pr + .02); src.stop(T + dur + .05);
    hit('lead', at); return true;
  }
  function lead(at, f, v, player){
    // la note du joueur sort sur le bus principal (pas sous la musique), plus fort, avec une attaque nette
    const m0 = music; if(player) music = master;
    try{ switch(tr.style){
      case 'hiphop': I.bell(at, f, v*1.3); break;
      case 'reggae': I.melodica(at, f, bpb*.45); break;
      case 'synthwave': I.supersaw(at, f, bpb*.4, v*1.1); break;
      case 'french': I.talk(at, f, bpb*.35); break;
      case 'punk': I.gtr(at, f/2, .16, false); break;
      case 'metal': I.gtr(at, f/2, .14, true); break;
      case 'dnb': I.pluck(music, at, f, v, {dly: .25}); break;
      default: I.pluck(music, at, f, v); I.bell(at, f*2, v*.25);
    } } finally { music = m0; }
    if(player && useAudio){
      // la musique se pousse un instant pour laisser passer ta note
      if(state === 'play' && !tutoOpen){ const T = RT(at); music.gain.cancelScheduledValues(T); music.gain.setValueAtTime(.8, T); music.gain.linearRampToValueAtTime(.62, T + .012); music.gain.setTargetAtTime(.8, T + .08, .1); }
    }
  }
  // la voix arrive comme une récompense de combo, et elle grandit avec lui
  const VFX = {
    disco:     {rev: .35, dly: .15, dbl: 12, vol: 1},
    hiphop:    {rev: .12, dly: .3, hp: 450, lp: 3200, stut: 1, vol: 1.2},
    reggae:    {rev: .4, dly: .6, lp: 4200, vol: 1},
    synthwave: {rev: .55, dly: .25, chorus: 1, vol: .9},
    french:    {rev: .15, dly: .2, robot: 1, hp: 200, vol: .9},
    dnb:       {rev: .2, dly: .2, stut: 1, hp: 300, vol: 1},
    punk:      {rev: .12, drive: 6, dbl: -12, lp: 5000, vol: .7},
    metal:     {rev: .35, drive: 12, dbl: -12, lp: 4200, vol: .6}
  };
  // prochain temps de la grille (en fraction de temps : .25 = double croche, .5 = croche, 1 = noire)
  const qNext = (t, div) => { const st = bpb*div; return Math.ceil((t - .004)/st)*st; };
  // chaque geste réussi est salué par un petit coup de batterie bien calé, de la couleur du style, et une basse chaude sur l'accord
  function rewardBeat(o, g, t){
    return; // les gestes jouent déjà le son du style : on n'ajoute plus de batterie générique par-dessus
    const at = o.time >= t - .002 ? o.time : qNext(t, .25), v = g === 'perfect' ? 1 : g === 'good' ? .75 : .5, st2 = tr.style;
    if(st2 === 'disco' || st2 === 'french' || st2 === 'synthwave'){ for(let q=0;q<2;q++) noise(master, at + q*.011, .07, .09*v, 'bandpass', 1400, null, false, {q: .9, rev: .22, pan: q ? .25 : -.25}); }
    else if(st2 === 'hiphop' || st2 === 'reggae'){ osc(master, 'triangle', 1650, at, .035, .07*v, {rev: .2, dly: st2 === 'reggae' ? .3 : 0}); noise(master, at, .025, .06*v, 'bandpass', 3200, null, false, {q: 2}); }
    else { noise(master, at, .1, .1*v, 'bandpass', 2100, 1500, false, {q: .8, rev: .12}); osc(master, 'triangle', 190, at, .07, .09*v, {glide: 130}); }
    const root = freq(chordOf(Math.floor(o.beat/4)), 1); osc(master, 'sine', root, at, .2, .14*v, {glide: root*.97, gt: .2}); // la chaleur : une basse ronde
    if(g === 'perfect' && combo % 8 === 0) noise(master, at, .5, .05, 'highpass', 7000, null, false, {rev: .35}); // un scintillement de cymbale toutes les 8
  }
  function comboVoice(when){
    if(!voiceOn() || combo % 10) return;
    // la voix entre sur un temps fort (1 ou 3) : elle répond à la musique au lieu de tomber n'importe où
    when = qNext(when + bpb*.25, 2);
    const lvl = combo/10, fx = VFX[tr.style] || VFX.disco, step = bpb*(tr.bpm < 90 ? .5 : 1);
    const LINES = [[4], [2, 4], [0, 2, 4], [0, 2, 4, 7], [4, 2, 0, 2, 4]], line = LINES[Math.min(lvl, LINES.length) - 1];
    const vol = Math.min(.9, .55 + lvl*.04)*fx.vol, end = when + (line.length - 1)*step + bpb*1.2;
    for(let i=0;i<line.length;i++){
      const at = when + i*step, root = chordOf(Math.floor(at/bpb/4)) + 7, deg = root + line[i], f = freq(deg, 4), last = i === line.length - 1, syl = (lvl + i*2) % 7;
      const base = {long: last, rev: fx.rev, dly: last ? fx.dly : fx.dly*.3, drive: fx.drive, hp: fx.hp, lp: fx.lp};
      sing(vox, at, f, syl, vol*(last ? 1 : .8), base);
      // les doublures arrivent avec le combo : une voix seule d'abord, un chœur ensuite
      if(lvl >= 2 && fx.dbl) sing(vox, at, f*Math.pow(2, fx.dbl/12), syl, vol*.28, {...base, pan: .3});
      if(lvl >= 2 && fx.chorus){ sing(vox, at, f, syl, vol*.3, {...base, det: 1.006, pan: -.6}); sing(vox, at, f, syl, vol*.3, {...base, det: .994, pan: .6}); }
      if(fx.robot) I.talk(at, f, last ? .35 : .14);
      if(fx.stut && last && lvl >= 2){ sing(vox, at + bpb/2, f, syl, vol*.45, {...base, long: false}); }
      if(lvl >= 3 && last) sing(vox, at + .015, freq(deg + 2, 4), syl + 1, vol*.35, {...base, pan: -.4});
      if(lvl >= 5 && last) sing(vox, at + .03, freq(deg + 4, 4), syl + 2, vol*.3, {...base, pan: .45});
    }
    // la mélodie de fond se tait et la musique se pousse le temps de la phrase
    voiceFrom = when; voiceUntil = end;
    if(useAudio && vduck){ const T0 = RT(when) - .02, T1 = RT(end); vduck.gain.cancelScheduledValues(T0); vduck.gain.setTargetAtTime(.62, T0, .015); vduck.gain.setTargetAtTime(1, T1, .12); }
    judges.push({txt: '♪ x' + combo, x: W/2, y: H*.3, t: 0, big: lvl >= 3});
  }
  function curve(k){ if(curves[k]) return curves[k]; const n = 1024, c = new Float32Array(n); for(let i=0;i<n;i++){ const x = i/(n - 1)*2 - 1; c[i] = Math.tanh(k*x)/Math.tanh(k); } return curves[k] = c; }
  let lat = 0;
  // vitesse de bande variable : temps du morceau = sA + (temps réel - rA) x vitesse
  let rate = 1, rateTgt = 1, sA = 0, rA = 0, slowed = false, missRun = 0, recHits = 0, lostTime = 0;
  const rawRel = () => (useAudio ? actx.currentTime : performance.now()/1000) - t0;
  const songAt = r => sA + (r - rA)*rate;
  const RT = at => t0 + rA + (at - sA)/rate; // heure audio réelle d'un instant du morceau
  const tapeK = () => Math.pow(rate, .6);
  function setRate(v){ const r = rawRel(); sA = songAt(r); rA = r; rate = v; }
  function resetRate(){ rate = rateTgt = 1; sA = rA = 0; slowed = false; missRun = 0; recHits = 0; lostTime = 0; }
  const clock = () => songAt(rawRel());
  // ce que le joueur entend arrive après la latence de sortie : on juge et on dessine sur ce temps-là
  const now = () => clock() - lat*rate;
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
    const T = RT(at), tk = tapeK(), o = actx.createOscillator(), gn = actx.createGain(); o.type = type; f *= tk; o.frequency.setValueAtTime(f, T);
    if(o2.glide) o.frequency.exponentialRampToValueAtTime(o2.glide*tk, T + (o2.gt || dur*.8));
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
    const T = RT(at), tk = tapeK(), s = actx.createBufferSource(), f = actx.createBiquadFilter(), gn = actx.createGain(); s.buffer = noiseBuf; s.playbackRate.value = tk; f.type = type; f.frequency.setValueAtTime(f1*tk, T); if(f2) f.frequency.exponentialRampToValueAtTime(f2*tk, T + dur); f.Q.value = o2.q || (type === 'bandpass' ? 3 : 1);
    if(swell){ gn.gain.setValueAtTime(.001, T); gn.gain.exponentialRampToValueAtTime(vol, T + dur*.95); gn.gain.linearRampToValueAtTime(0, T + dur); } else env(gn, T, vol, .002, dur);
    s.connect(f); route(f, gn, bus, o2, T); s.start(T, Math.random()*.5); s.stop(T + dur + .05);
  }
  const freq = (deg, oct) => { const sc = tr.scale, d = ((deg % 7) + 7) % 7, o = Math.floor(deg/7); return tr.root*Math.pow(2, (sc[d] + 12*o)/12)*(oct || 1); };
  function hit(ch, at){ events.push({ch, at}); }
  // la pompe : tout le morceau respire sur la grosse caisse (fort en électro, léger ailleurs)
  function duck(at, depth){ if(!useAudio) return; const el = ['disco','synthwave','french'].includes(tr.style), T = RT(at); pump.gain.cancelScheduledValues(T); pump.gain.setValueAtTime(depth || (el ? .35 : .72), T); pump.gain.linearRampToValueAtTime(1, T + 60/tr.bpm*(el ? .6 : .35)); }

  /* instruments */
  const I = {
    kick(at, v, kind){
      v = v || 1;
      if(kind === 'tight'){ osc(music, 'sine', 220, at, .18, 1.05*v, {glide: 50, gt: .05}); osc(music, 'square', 2200, at, .006, .1*v); noise(music, at, .02, .4*v, 'highpass', 3000); }
      else if(kind === 'dub'){ osc(music, 'sine', 120, at, .45, 1*v, {glide: 38, gt: .2}); }
      else { osc(music, 'sine', 170, at, .34, 1.1*v, {glide: 44, gt: .09}); osc(music, 'triangle', 95, at, .2, .35*v, {glide: 40}); osc(music, 'square', 1800, at, .008, .12*v); noise(music, at, .014, .3*v, 'highpass', 2500); }
      duck(at); hit('kick', at);
    },
    snare(at, v, o2){ v = v || 1; o2 = o2 || {}; noise(music, at, .2, .5*v, 'bandpass', 2200, 1600, false, {q: .8, rev: o2.rev ?? .12, dly: o2.dly || 0}); noise(music, at, .09, .25*v, 'highpass', 5000); osc(music, 'triangle', 210, at, .11, .45*v, {glide: 150}); hit('snare', at); },
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
      else { osc(music, 'sawtooth', f, at, dur, .24, {lp: [kind === 'acid' ? 1800 : 1000, 150, kind === 'acid' ? 10 : 5]}); osc(music, 'sine', f < 70 ? f : f/2, at, dur*.9, .22); }
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
      if(!useAudio) return; const T = RT(at), o = actx.createOscillator(), gn = actx.createGain(), mix = actx.createGain(); o.type = 'sawtooth'; f *= tapeK(); o.frequency.setValueAtTime(f, T);
      [[700, 420], [1200, 950], [2600, 2400]].forEach(([a, b], i) => { const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 9; bp.frequency.setValueAtTime(a, T); bp.frequency.linearRampToValueAtTime(b, T + dur); const g = actx.createGain(); g.gain.value = [1, .7, .3][i]; o.connect(bp).connect(g).connect(mix); });
      env(gn, T, .5, .01, dur*.9); route(mix, gn, music, {rev: .15, dly: .15}, T); o.start(T); o.stop(T + dur + .05); hit('lead', at);
    },
    melodica(at, f, dur){ osc(music, 'square', f, at, dur, .05, {a: .03, vib: 5.5, lp: [2600, 1800, 1], dly: .3, rev: .2}); osc(music, 'triangle', f*2, at, dur*.8, .02, {a: .03}); hit('lead', at); },
    pluck(bus, at, f, v, o2){ osc(bus, 'square', f, at, .16, v, {lp: [4200, 900, 4], ...(o2 || {})}); osc(bus, 'triangle', f*2, at, .1, v*.4, o2); hit('lead', at); },
    bell(at, f, v){ osc(music, 'sine', f, at, .4, v, {rev: .3}); osc(music, 'sine', f*2.76, at, .14, v*.3); hit('lead', at); },
    boing(bus, at, f, v){ osc(bus, 'triangle', f, at, .18, v, {glide: f*2, gt: .12}); },
    // le rond-cœur : c'est TOI qui joues la caisse claire du morceau, avec le même son que lui (le morceau laisse ce coup vide)
    tap(bus, at, v){
      const m0 = music; music = bus; v = v || 1;
      try{ switch(tr ? tr.style : 'disco'){
        case 'disco': I.snare(at, .6*v); I.clap(at); break;
        case 'hiphop': I.snare(at, 1.1*v, {rev: .2}); break;
        case 'reggae': I.rim(at, v); break;
        case 'synthwave': I.snare(at, v, {rev: .45}); I.clap(at, .35); break;
        case 'french': I.clap(at, .2); break;
        case 'dnb': I.snare(at, v, {rev: .2}); break;
        case 'punk': I.snare(at, 1.1*v, {rev: .1}); break;
        case 'metal': I.snare(at, 1.2*v, {rev: .25}); break;
        default: I.snare(at, v);
      } } finally { music = m0; }
    },
    // scratch : un petit « tchic » accordé sur l'accord en cours, au lieu du bruit
    wik(at, up){ const c = tr ? chordOf(Math.floor(at/bpb/4)) : 0, f = tr ? freq(c + (up ? 4 : 2), 3) : (up ? 523 : 440);
      osc(master, 'triangle', f, at, .09, .07, {glide: f*(up ? 1.06 : .94), gt: .06, lp: [2200, 900, 1]}); osc(master, 'sine', f/2, at, .06, .05); noise(master, at, .025, .025, 'bandpass', up ? 3800 : 2800, null, false, {q: 1.2}); },
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
    if(bar === 0){ if(p % 4 === 0){ if(!(voiceOn() && sing(vox, at, freq([0, 2, 4, 7][p/4], 4), [0, 2, 4, 6][p/4], .8, {long: p === 12}))) osc(master, 'square', p === 0 ? 1568 : 1046, at, .06, .12); hit('kick', at); } if(p === 0) I.riser(at, 4*bpb); return; }
    const sec = sectionOf(bar); if(!sec) return;
    const L = new Set(sec.layers), st = tr.style, deg = chordOf(bar), chord = [deg, deg + 2, deg + 4], T = sec.tier === 'rest' ? 0 : sec.tier;
    const lastBar = bar === sec.start + sec.bars - 1, next = sectionOf(bar + 1), r = freq(deg, 1);
    if(bar === sec.start && p === 0 && bar > 1 && sec.tier !== 'rest') I.crash(at);
    if(lastBar && next && next.tier !== 'rest' && p === 0) I.riser(at, 4*bpb);
    if(lastBar && next && p >= 12 && L.has('snare')) I.snare(at, .4 + (p - 12)*.15);
    const brk = lastBar && next && next.tier !== 'rest' && next.tier >= 2 && sec.tier !== next.tier && p >= 8;
    if(p === 0 && bar === sec.start && useAudio && trance === 0){ const T0 = RT(at), T1 = RT(at + sec.bars*4*bpb); tone.frequency.cancelScheduledValues(T0);
      if(sec.tier === 0 || sec.tier === 'rest'){ tone.frequency.setValueAtTime(sec.tier === 'rest' ? 1100 : 2600, T0); tone.frequency.exponentialRampToValueAtTime(sec.tier === 'rest' ? 3500 : 16000, T0 + Math.min(T1 - T0, 4*4*bpb)); }
      else tone.frequency.setTargetAtTime(20000, T0, .05); }
    if(brk && p === 8 && useAudio){ tone.frequency.setValueAtTime(20000, RT(at)); tone.frequency.exponentialRampToValueAtTime(600, RT(at + 2*bpb)); }
    if(p === 0 && !['punk', 'metal'].includes(st) && sec.tier !== 0) I.chord(at, [deg, deg + 2, deg + 4, deg + 6], 4*bpb*.95, 'pad');
    if(sec.tier === 'rest' && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 4, 7, 9, 11, 9, 7, 4][(p/2) % 8], 8), .02, {dly: .45, pan: (p % 4 ? .5 : -.5)});
    const K0 = L.has('kick'), B0 = L.has('bass');
    const myBar = p % 2 === 0 ? buildBar(bar) : null, mine = myBar && myBar[p >> 1] && myBar[p >> 1].k === 'C', mineJ = myBar && myBar[p >> 1] && myBar[p >> 1].k === 'J';
    const K = K0 && !brk, S = L.has('snare') && !mineJ, Hh = L.has('hat'), B = B0 && !brk, Ch = L.has('chords'), A = L.has('arp'), P = L.has('perc'), Ld = L.has('lead') && !mine && !(at >= voiceFrom && at < voiceUntil), Gt = L.has('gtr');
    const mel = motif[(bar % 4)*8 + (p >> 1)], hk = p % 2 === 0 && hookMask[p >> 1] === 1;
    if(st === 'disco'){
      if(K && p % 4 === 0) I.kick(at);
      if(S && (p === 4 || p === 12)){ I.snare(at, .6); I.clap(at); }
      if(Hh){ if(p % 4 === 2) I.hat(at, .13, true, .2); else if(T >= 2 && p % 2) I.hat(at, .05, false, -.2); }
      if(P && [3, 6, 11, 14].includes(p)) I.perc(at, 'cowbell');
      if(B && p % 2 === 0) I.bass(at, p % 4 ? r*2 : r, .16, T >= 2 ? 'acid' : 'saw');
      if(Ch && [2, 6, 10, 14].includes(p)) I.chord(at, chord, .14, 'stab');
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 2, 4, 7][(p/2) % 4], 4), .03, {dly: .2, pan: .4});
      if(Ld && hk) I.bell(at, freq(mel, 8), .04);
    }
    if(st === 'hiphop'){
      if(K && [0, 7, 10].includes(p)) I.kick(at, p ? .8 : 1);
      if(S && (p === 4 || p === 12)) I.snare(at, 1.1, {rev: .2});
      if(Hh && p % 2 === 0) I.hat(at, p % 4 ? .06 : .1, false, p % 4 ? .3 : -.1);
      if(P){ if(Math.random() < .3) I.perc(at, 'crackle'); if(p === 14 && bar % 2) I.tom(at, 180); }
      if(B && (p === 0 || p === 10)) I.bass(at, r, p ? .4 : .7, 'sub');
      if(Ch && (p === 0 || p === 8)) I.chord(at, chord, .8, 'rhodes');
      if(Ld && hk) I.bell(at, freq(mel, 8), .04);
      if(A && p % 4 === 2) I.pluck(music, at, freq(deg + 4, 8), .02, {dly: .3});
    }
    if(st === 'reggae'){
      if(K && (p === 8 || (T >= 2 && p % 4 === 0))) I.kick(at, 1, 'dub');
      if(S && p === 8) I.rim(at); if(S && T >= 2 && p === 14 && bar % 2) I.rim(at, .6);
      if(Hh && p % 2 === 0) I.hat(at, p % 4 ? .07 : .04, false, .25);
      if(Ch && (p === 4 || p === 12)) I.chord(at, chord, .1, 'skank');
      if(B){ const line = {0: 0, 3: 0, 6: 4, 10: 2, 11: 4, 14: 7}; if(line[p] !== undefined) I.bass(at, freq(deg + line[p], 1), .3, 'dub'); }
      if(Ld && hk) I.melodica(at, freq(mel, 4), .3);
      if(P && p === 0 && bar % 4 === 2) I.perc(at, 'siren');
    }
    if(st === 'synthwave'){
      if(K && (p === 0 || p === 8 || (T >= 2 && p === 11))) I.kick(at);
      if(S && (p === 4 || p === 12)){ I.snare(at, 1, {rev: .45}); I.clap(at, .35); }
      if(Hh) I.hat(at, p % 4 === 2 ? .08 : .03, false, (p % 2 ? .3 : -.3));
      if(B && p % 2 === 0) I.bass(at, p % 4 === 2 ? r*2 : r, .12, 'saw');
      if(Ch && p === 0) I.chord(at, chord, 4*bpb*.9, 'pad');
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 2, 4, 7, 9, 7, 4, 2][(p/2) % 8], 4), .03, {dly: .25, pan: .3});
      if(Ld && hk) I.supersaw(at, freq(mel, 4), .25, .08);
    }
    if(st === 'french'){
      const cut = 500 + 3200*(.5 + .5*Math.sin((bar + p/16)*Math.PI/4));
      if(K && p % 4 === 0) I.kick(at);
      if(S && (p === 4 || p === 12)) I.clap(at, .2);
      if(Hh){ if(p % 4 === 2) I.hat(at, .12, true, .2); if(T >= 2 && p % 2) I.hat(at, .04, false, -.25); }
      if(Ch && [0, 3, 6, 8, 11, 14].includes(p)) I.chord(at, chord, .15, 'filter', cut);
      if(B && [0, 3, 6, 10, 12, 14].includes(p)) I.bass(at, [0, 6, 14].includes(p) ? r : r*2, .14, 'funk');
      if(P && p % 2) I.perc(at, 'shaker');
      if(Ld && hk) I.talk(at, freq(mel, 4), .24);
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 4, 7, 9][(p/2) % 4], 8), .02, {dly: .3});
    }
    if(st === 'dnb'){
      if(K && [0, 10].includes(p)) I.kick(at, 1, 'tight');
      if(S && (p === 4 || p === 12 || (T >= 3 && p === 15))) I.snare(at, p === 15 ? .5 : 1, {rev: .2});
      if(Hh) I.hat(at, p % 2 ? .05 : .1, p % 8 === 6, p % 2 ? .3 : -.3);
      if(B && (p === 0 || p === 6 || p === 10)) I.bass(at, r, p ? .3 : .55, 'reese');
      if(Ch && p === 0) I.chord(at, chord, 4*bpb*.9, 'pad');
      if(A && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 4, 7, 11][(p/2) % 4], 4), .025, {dly: .3});
      if(Ld && hk) I.supersaw(at, freq(mel, 4), .2, .07);
    }
    if(st === 'punk'){
      if(K && (p === 0 || p === 8 || (T >= 2 && (p === 6 || p === 10)))) I.kick(at, 1, 'tight');
      if(S && (p === 4 || p === 12)) I.snare(at, 1.1, {rev: .1});
      if(Hh && p % 2 === 0){ if(T >= 2 && p % 4 === 0) I.ride(at, 1.4); else I.hat(at, .09, T >= 2, .2); }
      if(Gt && p % 2 === 0) I.gtr(at, r*2, .17, false);
      if(B && p % 2 === 0) I.bass(at, r, .15, 'grit');
      if(P && p === 0 && bar % 4 === 0) I.crash(at);
      if(Ld && hk) I.supersaw(at, freq(mel, 4), .2, .06);
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
      if(Ld && hk) I.supersaw(at, freq(mel + 7, 4), .18, .07);
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
        if(e.k === 'C') lead(at, f, .09);
        if(e.k === 'J') I.tap(music, at, .8);
        if(e.k === 'H') osc(master, 'triangle', f, at, .08, .06, {sus: e.len*bpb/2, lp: [1400, 1000, 1]});
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
    const rng = rngFrom(tr.id + ':' + diff.id + ':' + bar), acts = sec.acts, slots = new Array(8).fill(null); let shp = null;
    const mdeg = i => motif[(bar % 4)*8 + i];
    if(sec.tier === 'rest'){
      if(acts.includes('C') && rng() < .7) slots[0] = {k: 'C'};
      for(let i=1;i<8;i++) if(rng() < .55) slots[i] = {k: rng() < .2 ? 'A' : 'N'};
      if(bar === sec.start + 1 && rng() < .9) slots[6] = {k: 'A'};
    } else {
      const tier0 = Math.min(sec.tier, diff.cap ?? 3), fast = tr.bpm >= 140 ? .4 : tr.bpm >= 125 ? .75 : 1;
      // une phrase = 4 mesures A A A' B, tirées une fois pour toutes : on découvre le motif, on le rejoue, il varie, puis il relance
      const k4 = (bar - sec.start) % 4, pr = rngFrom(tr.id + ':' + diff.id + ':' + sec.idx + ':' + Math.floor((bar - sec.start)/4)), pick = list => list[Math.floor(pr()*list.length)];
      const tier = tier0 >= 2 && pr() > fast ? tier0 - 1 : tier0;
      const A = pick(RHY[tier]), B = pick(RHY[Math.min(tier + 1, diff.cap ?? 3)]), mut = 4 + Math.floor(pr()*4);
      shp = Array.from({length: 8}, () => pr() < .5 ? 'wide' : 'tall');
      const keep = Array.from({length: 8}, (_, i) => i === 0 || i === 4 || pr() < diff.dens), extra = Array.from({length: 8}, () => pr() < (diff.dens - 1)*.5*(tr.bpm >= 140 ? .4 : 1));
      const longK = acts.includes('H') && (!acts.includes('S') || pr() < .5) ? 'H' : acts.includes('S') ? 'S' : null, longOn = longK && pr() < (sec.call ? 1 : diff.easy ? .3 : .55);
      const longS = [0, 2, 4][Math.floor(pr()*3)], longL = longK === 'H' ? 3 + Math.floor(pr()*3) : 2 + Math.floor(pr()*3);
      const pat = (k4 === 3 && !sec.call ? B : A).split('');
      if(k4 === 2){ const c = pat[mut]; pat[mut] = c === 'C' ? 'J' : c === 'J' ? 'C' : mut % 2 ? 'n' : 'C'; }
      const blocked = new Set();
      // le geste long fait la relance (mesure B), ou toute la section quand on vient de l'apprendre
      if(longOn && (k4 === 3 || sec.call)){ const len = Math.min(longL, 7 - longS); slots[longS] = {k: longK, len}; for(let i=longS;i<longS + len + 1;i++) blocked.add(i); }
      pat.forEach((c, i) => {
        if(blocked.has(i) || slots[i]) return;
        if(c === 'n'){ slots[i] = {k: 'N'}; return; }
        if(c === '.'){ if(extra[i] && tier >= 1 && i % 2) c = 'C'; else { if(rng() < .1) slots[i] = {k: tier >= 1 && rng() < .35 ? 'A' : 'N'}; return; } }
        if(!keep[i]){ if(rng() < .3) slots[i] = {k: 'N'}; return; }
        let k = c; if(k === 'J' && !acts.includes('J')) k = 'C'; if(k === 'C' && !acts.includes('C')) k = acts.includes('J') ? 'J' : null;
        if(k) slots[i] = {k};
      });
    }
    // écart minimal entre deux gestes (selon le niveau) ; en Apprenti, on ne change de geste qu'avec du temps pour réfléchir
    if(sec.tier !== 'rest'){ const prevB = bar > 1 ? buildBar(bar - 1) : null; let lastT = -9, lastK = null;
      if(prevB) for(let i=7;i>=0;i--){ const q = prevB[i]; if(q && 'CJHS'.includes(q.k)){ lastT = (i - 8)*bpb/2 + (q.len || 0)*bpb/2; lastK = q.k; break; } }
      for(let i=0;i<8;i++){ const q = slots[i]; if(!q || !'CJHS'.includes(q.k)) continue; const tq = i*bpb/2;
        if((q.k === 'C' || q.k === 'J') && tq - lastT < diff.gap){ slots[i] = rng() < .5 ? {k: 'N'} : null; continue; }
        if(diff.easy && (q.k === 'C' || q.k === 'J') && lastK && (lastK === 'C' || lastK === 'J') && lastK !== q.k && tq - lastT < .7) q.k = lastK;
        lastT = tq + (q.len || 0)*bpb/2; lastK = q.k; } }
    slots.forEach((s, i) => { if(s){ s.deg = mdeg(i); if(s.k === 'C') s.shape = i < 7 && !(slots[i - 1] && slots[i - 1].shape === 'wide') && (shp ? shp[i] === 'wide' : rng() < .5) ? 'wide' : 'tall'; } });
    return barCache[bar] = slots;
  }
  function spawnBar(bar){
    const slots = buildBar(bar); if(!slots) return;
    slots.forEach((s, i) => { if(!s) return; const beat = bar*4 + i/2;
      objs.push({...s, beat, time: beat*bpb, endBeat: beat + (s.len || 0)/2, endTime: (beat + (s.len || 0)/2)*bpb, done: false, born: 0, holding: false, strokes: 0, need: Math.max(2, s.len || 0)}); });
  }

  /* ---------- partie ---------- */
  function startTrack(t){
    tr = t; sections = t.sections; totalBars = 1 + sections.reduce((a, s) => a + s.bars, 0); bpb = 60/t.bpm; PPB = Math.max(108, Math.max(90, W*.25)*Math.pow(100/t.bpm, .25)); // une croche = au moins 54 px : les formes ne se touchent plus
    const r = rngFrom(t.id + 'motif'); const phrase = (start, end) => { const a = []; let d = start; for(let i=0;i<8;i++){ if(i === 0 || i === 4) d = [0, 2, 4][Math.floor(r()*3)] + 7*(d >= 7 ? 1 : 0) || start; else d += [-2, -1, 1, 1, 2, -1, 0][Math.floor(r()*7)]; d = Math.max(0, Math.min(11, d)); a.push(i === 7 ? end : d); } return a; };
    const A = phrase(4, 2), A2 = A.slice(0, 6).concat([A[6] + 1, 4]), Bp = phrase(7, 4); motif = A.concat(A2, Bp, A);
    hookMask = [[1,0,0,1,0,1,0,0],[1,0,1,1,0,1,1,0],[1,1,0,1,0,0,1,0],[1,0,1,0,1,1,0,1]][Math.floor(r()*4)];
    for(const k in barCache) delete barCache[k];
    frescoInit(); paintEv = []; gulp = 0; swallows = []; objs = []; bits = []; judges = []; score = 0; combo = 0; maxCombo = 0; hearts = diff.hearts; stats = {perfect: 0, good: 0, ok: 0, miss: 0}; notesRun = 0;
    beatNow = 0; nextStep = 0; jumpT = 9; hurtT = 0; energy = {kick: 0, snare: 0, hat: 0, bass: 0, chords: 0, lead: 0}; events = []; bump = 0; flashR = 0; gestures.clear(); holdState = null; scratchState = null; rot = 0; finished = false; spawned = 1; secShown = -1;
    hideMenu(); api.closeEnd(); api.hud(`FACE ${t.face} · ${t.name.toUpperCase()}`);
    muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted;
    if(useAudio){ actx.resume(); master.gain.cancelScheduledValues(actx.currentTime); master.gain.setValueAtTime(.85, actx.currentTime); pump.gain.cancelScheduledValues(actx.currentTime); pump.gain.setValueAtTime(1, actx.currentTime); }
    if(useAudio){ dly.delayTime.setValueAtTime(tr.delay*bpb, actx.currentTime); tone.frequency.cancelScheduledValues(actx.currentTime); tone.frequency.setValueAtTime(20000, actx.currentTime); shelf.gain.setValueAtTime(0, actx.currentTime); }
    trance = 0; voiceFrom = voiceUntil = 0; if(useAudio && vduck){ vduck.gain.cancelScheduledValues(actx.currentTime); vduck.gain.setValueAtTime(1, actx.currentTime); } rings = []; celeb = null; tutoOpen = false; tutoObj = null; holdHint = 0; { const ov = stage.querySelector('#k7tutoov'); if(ov) ov.remove(); }
    lat = (useAudio ? (actx.outputLatency || actx.baseLatency || 0) : 0) + api.load('offset', 0)/1000;
    resetRate(); t0 = (useAudio ? actx.currentTime : performance.now()/1000) + .25;
    cueN = api.load('cue', {});
    state = 'play';
  }
  let spawned = 1;

  const grade = d => { const a = Math.abs(d)/diff.win; return a < .055 ? 'perfect' : a < .11 ? 'good' : 'ok'; };
  const LABEL = {perfect: 'PARFAIT', good: 'BIEN', ok: 'OK', miss: 'RATÉ'};
  const xOf = beat => HXs + (beat - beatNow)*PPB;
  const TIERS = [0, 10, 25, 50, 100], TNAME = ['', 'EN RYTHME', 'TRANSE', 'HYPNOSE', 'NIRVANA'], TMULT = [1, 1.5, 2, 3, 4];
  function setTrance(n, t){
    if(n === trance) return; const up = n > trance; trance = n;
    if(up){ if(voiceOn()){ const d0 = chordOf(Math.floor(beatNow/4)), fx = VFX[tr.style] || {}; [0, 2, 4].forEach((k2, i) => sing(vox, qNext(t + .05, 1) + i*.03, freq(d0 + k2 + 7, 4), 6, .45*(fx.vol || 1), {long: true, pan: (i - 1)*.5, rev: .45, drive: fx.drive, hp: fx.hp, lp: fx.lp})); } celebrate(n); judges.push({txt: TNAME[n], sub: 'points x' + TMULT[n], x: W/2, y: H*.12, t: 0, big: true}); I.crash(t); I.swell(t, .5); bump = 1; api.vibe([20, 30, 40]);
      if(useAudio){ const T = actx.currentTime; tone.frequency.setTargetAtTime(20000, T, .05); shelf.gain.setTargetAtTime(n*1.5, T, .4); } }
  }
  function tapeStop(t){
    judges.push({txt: 'TRANSE BRISÉE', x: W/2, y: H*.3, t: 0, big: true});
    if(useAudio){ const T = actx.currentTime; tone.frequency.cancelScheduledValues(T); tone.frequency.setValueAtTime(18000, T); tone.frequency.exponentialRampToValueAtTime(260, T + .3); tone.frequency.setValueAtTime(260, T + .5); tone.frequency.exponentialRampToValueAtTime(20000, T + 1.8); shelf.gain.setTargetAtTime(0, T, .2); }
    osc(master, 'sawtooth', 420, t, 1, .16, {glide: 35, gt: .9, lp: [1800, 200, 2]});
  }
  // perdre le fil : deux ratés d'affilée et la bande ralentit ; chaque geste réussi la relance un peu
  const SLOW = .78, REC = 10;
  function loseThread(t){
    slowed = true; recHits = 0; rateTgt = SLOW;
    judges.push({txt: 'LA BANDE RALENTIT', sub: 'reprends le rythme, elle repartira', x: W/2, y: H*.2, t: 0, big: true});
    osc(master, 'sawtooth', 300, t, .7, .1, {glide: 120, gt: .6, lp: [1600, 300, 1]}); api.vibe(60);
  }
  function resolve(o, g, t, dir){
    if(slowed && g === 'perfect') g = 'good'; // au ralenti, pas de « parfait » : ça rapporte moins
    o.done = true; o.result = g; stats[g]++; cueLearn(o, g); if(!window.__nofresco) try{ const p0 = performance.now(); paint(o, g, dir); if(window.__pt) window.__pt.push(performance.now() - p0); }catch(e){}
    const x = xOf(Math.min(o.beat, Math.max(o.beat, beatNow))), y = objY(o);
    if(g === 'miss'){
      if(trance >= 1) tapeStop(t); setTrance(0, t);
      combo = 0; hurtT = .6; flashR = .6; bump = 1; missRun++; if(missRun >= 2 && !slowed) loseThread(t);
      osc(master, 'sawtooth', 110, t, .3, .22, {glide: 50}); noise(master, t, .2, .3, 'lowpass', 900);
      api.vibe(120); api.shake(9); confetti(x, y, [INK, RED], 14, 1.1);
    } else {
      missRun = 0;
      if(slowed){ recHits++; rateTgt = SLOW + (1 - SLOW)*Math.min(1, recHits/REC); if(recHits >= REC){ slowed = false; rateTgt = 1; judges.push({txt: 'ÇA REPART !', x: W/2, y: H*.2, t: 0, big: true}); I.crash(Math.max(t, o.time)); } }
      combo++; maxCombo = Math.max(maxCombo, combo); comboVoice(o.k !== 'H' && o.k !== 'S' ? Math.max(t, o.time) : t); try{ rewardBeat(o.k === 'H' || o.k === 'S' ? {time: t, beat: beatNow} : o, g, t); }catch(e){} setTrance(TIERS.filter(x => combo >= x).length - 1, t);
      const base = g === 'perfect' ? 100 : g === 'good' ? 60 : 25; score += Math.round(base*(1 + Math.min(combo, 50)/10)*TMULT[trance]*(slowed ? .5 : 1));
      const when = Math.max(t, o.time);
      // le joueur joue la mélodie
      if(o.k === 'C'){ lead(when, freq(o.deg, 4), g === 'perfect' ? .17 : .13, true); split(o, dir); }
      if(o.k === 'J') I.tap(master, Math.max(t, Math.min(o.time, t + .03)), 1);
      confetti(x, y - 10, g === 'perfect' ? [RED, PAPER, INK] : [PAPER, INK], g === 'perfect' ? 16 : 8, 1);
      if(g === 'perfect') bump = Math.max(bump, .5);
      api.vibe(g === 'perfect' ? 16 : 8);
      if(combo > 100 && combo % 50 === 0) celebrate(4, 'ENCORE ' + combo + ' !');
      if(combo % 25 === 0 && !TIERS.includes(combo)) judges.push({txt: combo + ' COMBO', x: W/2, y: H*.2, t: 0, big: true});
    }
    judges.push({txt: LABEL[g], g, x: o.k === 'H' || o.k === 'S' ? HXs + 30 : x, y: Y0 - 74, t: 0, sub: o.wrongWay ? (o.shape === 'tall' ? 'coupe vers le haut ↑' : 'coupe vers la droite →') : (g === 'good' || g === 'ok') && o.dt != null ? (o.dt > 0 ? 'en retard' : 'en avance') : null});
  }

  /* ---------- gestes : un geste par doigt, la cible est l'obstacle le plus proche dans le temps ---------- */
  const gestures = new Map();
  // dans l'ordre, comme une partition : le plus ancien obstacle encore jouable reçoit le geste,
  // sauf s'il est déjà très en retard alors que le suivant tombe pile
  function pickAt(t){
    const win = .2*diff.win, cand = [];
    for(const o of objs){
      if(o.done) continue; let d;
      if(o.k === 'H' && !o.holding) d = t - o.time;
      else if(o.k === 'S') d = t < o.time ? t - o.time : t <= o.endTime ? 0 : t - o.endTime;
      else continue;
      if(Math.abs(d) <= win) cand.push({o, d});
    }
    if(!cand.length) return null;
    cand.sort((x, y) => x.o.time - y.o.time);
    const first = cand[0], next = cand[1];
    if(next && first.d > .13*diff.win && Math.abs(next.d) < .06) return next.o;
    return first.o;
  }
  api.on(cv, 'pointerdown', e => {
    if(state === 'tuto'){ tutoDown(e); return; }
    if(state !== 'play') return;
    // l'heure exacte du toucher (pas celle où l'image a fini de se dessiner) : même si une image traîne, le jugement reste juste
    const lagE = e.timeStamp ? Math.max(0, Math.min(.12, (performance.now() - e.timeStamp)/1000)) : 0;
    const p = pt(e), t = now() - lagE*rate; try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    // dans l'ordre : un bloc ou un pic encore à jouer avant la note longue / le scratch passe d'abord
    let o = pickAt(t); const cj = firstOf(t, q => q.k === 'C' || q.k === 'J'); if(o && cj && cj.time <= o.time + .01) o = null;
    if(o && o.k === 'H' && holdState && holdState.o.endTime - t < .2){ const old = holdState.o; endHold(t, old.startGrade); }
    if(o && o.k === 'H' && !holdState){ o.holding = true; o.startGrade = grade(t - o.time); o.dt = t - o.time; holdState = {o, id: e.pointerId, voice: holdVoice(o)}; api.vibe(10); return; }
    if(o && o.k === 'S'){ scratchState = {o, id: e.pointerId, last: p, dir: 0, acc: 0}; return; }
    // geste strict, jugé à l'instant du toucher : glisser = couper, taper = sauter
    const g0 = {t, x: p.x, y: p.y, done: false}; gestures.set(e.pointerId, g0);
    // un rond-cœur à jouer maintenant (et pas de bloc avant lui) : le coup part dès le toucher, sans attendre que le doigt se lève
    const j = firstOf(t, q => q.k === 'J'), c = firstOf(t, q => q.k === 'C');
    if(j && !(c && c.time <= j.time + .05)){ g0.tapped = true; doJump(t); }
  });
  api.on(cv, 'pointermove', e => {
    if(state === 'tuto'){ tutoMove(e); return; }
    const p = pt(e), t = now();
    if(scratchState && scratchState.id === e.pointerId){ const s = scratchState, dy = p.y - s.last.y, dx = p.x - s.last.x, v = Math.abs(dy) > Math.abs(dx) ? dy : dx; s.last = p;
      const d = Math.sign(v); if(d && d !== s.dir){ if(s.acc > 10 || s.dir === 0){ if(t < s.o.endTime + .1){ s.o.strokes++; I.wik(t, d < 0); bump = Math.max(bump, .25); energy.lead = 1; confetti(HXs + 10, Y0 - 10, [PAPER, INK], 3, .5); } } s.dir = d; s.acc = 0; } s.acc += Math.abs(v); return; }
    const g = gestures.get(e.pointerId); if(!g || g.done) return;
    const dx = p.x - g.x, dy = p.y - g.y, d = Math.hypot(dx, dy);
    if(d > 18){ g.done = true; doCut(g.t, {x: dx, y: dy}); }
  });
  const up = e => {
    if(state === 'tuto'){ tutoUp(e); return; }
    const t = now(), id = e.pointerId;
    const g = gestures.get(id);
    if(g && !g.done){ g.done = true; const p = pt(e), dx = p.x - g.x, dy = p.y - g.y, d = Math.hypot(dx, dy); if(d > 18) doCut(g.t, {x: dx, y: dy}); else if(!g.tapped) doJump(g.t); }
    gestures.delete(id);
    if(holdState && holdState.id === id){ const h = holdState.o; endHold(t, t >= h.endTime - .12 ? h.startGrade : (t - h.time)/(h.endTime - h.time) > .6 ? 'ok' : 'miss'); }
    if(scratchState && scratchState.id === id) scratchState = null;
  };
  api.on(cv, 'pointerup', up); api.on(cv, 'pointercancel', up);
  const pendingNear = o => { for(const g of gestures.values()) if(!g.done && Math.abs(g.t - o.time) < .2) return true; return false; };

  function holdVoice(h){
    if(!useAudio) return null; const T = actx.currentTime, f = freq(h.deg, 4);
    // note tenue : une nappe douce (sinus + triangle feutré), avec ta voix qui lance la note
    const o1 = actx.createOscillator(), o2 = actx.createOscillator(), lfo = actx.createOscillator(), lg = actx.createGain(), gn = actx.createGain(), fl = actx.createBiquadFilter();
    o1.type = 'triangle'; o2.type = 'sine'; o1.frequency.value = f; o2.frequency.value = f/2; lfo.frequency.value = 4.5; lg.gain.value = f*.006; lfo.connect(lg); lg.connect(o1.frequency);
    fl.type = 'lowpass'; fl.frequency.setValueAtTime(900, T); fl.frequency.linearRampToValueAtTime(1500, T + .5); fl.Q.value = .7;
    gn.gain.setValueAtTime(0, T); gn.gain.linearRampToValueAtTime(.06, T + .08);
    o1.connect(fl); o2.connect(fl); fl.connect(gn).connect(master); o1.start(); o2.start(); lfo.start();
    return {stop(){ const T2 = actx.currentTime; gn.gain.cancelScheduledValues(T2); gn.gain.setValueAtTime(gn.gain.value, T2); gn.gain.exponentialRampToValueAtTime(.0001, T2 + .25); [o1, o2, lfo].forEach(o => o.stop(T2 + .3)); }};
  }
  function endHold(t, g){ const h = holdState.o; if(holdState.voice) holdState.voice.stop(); holdState = null; h.holding = false; h.released = t; resolve(h, g, t); }

  let slash = null;
  function nearest(t, f){ return objs.filter(o => !o.done && f(o) && Math.abs(t - o.time) < .2*diff.win).sort((a, b) => Math.abs(t - a.time) - Math.abs(t - b.time))[0]; }
  // parmi les obstacles du bon type : le plus ancien encore jouable, sauf s'il est très en retard et que le suivant tombe pile
  function firstOf(t, f){
    const win = .2*diff.win, c = objs.filter(o => !o.done && f(o) && Math.abs(t - o.time) <= win).sort((a, b) => a.time - b.time);
    if(c[1] && t - c[0].time > .13*diff.win && Math.abs(t - c[1].time) < .06) return c[1];
    return c[0] || null;
  }
  let stretch = null;
  function doCut(t, dir){
    const l = Math.hypot(dir.x, dir.y) || 1; slash = {dx: dir.x/l, dy: dir.y/l, t: 0}; stretch = {a: Math.atan2(dir.y, dir.x), t: 0};
    const o = firstOf(t, q => q.k === 'C') || firstOf(t, q => q.bomb);
    if(window.__k7log) window.__k7log.push({cut: t, got: o && (o.k + o.beat), near: objs.filter(q => Math.abs(q.time - t) < .35).map(q => q.k + (q.bomb ? 'b' : '') + q.beat + (q.done ? '✓' : '') + ':' + Math.round((t - q.time)*1000))});
    if(o && o.bomb) explode(o, t); else if(o) cutObj(o, t, dir); else noise(master, t, .04, .025, 'highpass', 4000);
  }
  function doJump(t){
    const o = firstOf(t, q => q.k === 'J');
    if(o) jumpObj(o, t); else jumpT = 0;
  }
  const wantDir = o => o.shape === 'tall' ? {x: 0, y: -1} : o.shape === 'wide' ? {x: 1, y: 0} : null;
  function rightWay(o, dir){ const w = wantDir(o); if(!w) return true; const l = Math.hypot(dir.x, dir.y) || 1; return (dir.x*w.x + dir.y*w.y)/l > .5; }
  function cutObj(o, t, dir){ o.dt = t - o.time; let g = grade(o.dt); if(!rightWay(o, dir)){ g = 'miss'; o.wrongWay = true; } resolve(o, g, t, dir); }
  function jumpObj(o, t){ jumpT = 0; o.dt = t - o.time; resolve(o, grade(o.dt), t); }
  function explode(o, t){ resolve(o, 'miss', t); osc(master, 'sine', 60, t, .6, .6, {glide: 30}); noise(master, t, .6, .5, 'lowpass', 2000); judges.push({txt: 'BOUM', x: W/2, y: H*.28, t: 0, big: true}); }
  function split(o, dir){
    const l = Math.hypot(dir.x, dir.y) || 1, d = {x: dir.x/l, y: dir.y/l}, n = {x: -d.y, y: d.x}, x = xOf(o.beat);
    for(const s of [1, -1]) bits.push({half: true, o: {...o}, s, d, x, y: objY(o), vx: n.x*s*160 - 60, vy: n.y*s*160 - 260, rot: 0, vr: s*(5 + Math.random()*5), life: 1.4});
  }
  function confetti(x, y, cols, n, power){ for(let i=0;i<n;i++){ const a = Math.random()*6.283, sp = (120 + Math.random()*260)*power; bits.push({x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - 120, rot: Math.random()*6, vr: (Math.random() - .5)*14, w: 4 + Math.random()*6, h: 3 + Math.random()*3, c: cols[i % cols.length], life: .8 + Math.random()*.5}); } }
  let gulp = 0, swallows = [];
  function collect(o, t){
    o.done = true; o.result = 'got'; swallows.push({x: xOf(o.beat), y: objY(o), t: 0, gold: o.k === 'A'});
    if(o.k === 'L'){ hearts = Math.min(5, hearts + 1); judges.push({txt: '+1 VIE', x: HXs + 20, y: Y0 - 100, t: 0}); I.bell(Math.max(t, o.time), freq(7, 4), .14); I.bell(Math.max(t, o.time) + .08, freq(11, 4), .12); }
    else { notesRun++; paintNote(o); const at = Math.max(t, o.time), fr = freq(chordOf(Math.floor(o.beat/4)) + (o.k === 'A' ? 4 : 0), 3); I.bell(at, freq(o.deg + 7, 4), .05); score += 10; }
    confetti(xOf(o.beat), objY(o), [PAPER, RED], 8, .6);
  }

  /* ---------- la fresque : ton rythme peint un mur, qui vit pendant tout le niveau ---------- */
  let fresco = null, fg = null, frR = Math.random, pen = {x: 0, y: 0}, FH = 0, paintN = 0;
  function frescoInit(){
    FH = Math.max(120, Y0 - 66); fresco = document.createElement('canvas'); fresco.width = Math.round(W*1.5); fresco.height = Math.round(FH*1.5); fg = fresco.getContext('2d'); fg.scale(1.5, 1.5);
    frR = rngFrom(tr.id + ':' + Date.now()); pen = {x: W*.06, y: (Y0 - 66 + 76)/2}; paintN = 0;
    compo = COMPOS[Math.floor(frR()*COMPOS.length)]; pal = PALS[Math.floor(frR()*PALS.length)]; GCOL = pal.g; compoPh = frR()*6.283; compoW = 1 + Math.floor(frR()*3);
  }
  /* compositions : où tombe chaque coup de pinceau au fil du morceau (prog 0 → 1) */
  let compo = null, pal = null, compoPh = 0, compoW = 1;
  const jit = k => (frR() + frR() - 1)*k;
  const COMPOS = [
    {name: 'Nuée', at: (prog, si) => { const an = ANCH[si % ANCH.length]; return [an[0] + jit(.3), an[1] + jit(.3)]; }},
    {name: 'Spirale', at: prog => { const a = prog*5*Math.PI + compoPh, r = .06 + .42*prog; return [.5 + Math.cos(a)*r + jit(.04), .5 + Math.sin(a)*r*.95 + jit(.04)]; }},
    {name: 'Vague', at: prog => [.04 + prog*.92 + jit(.03), .5 + .3*Math.sin(prog*6.283*compoW + compoPh) + jit(.07)]},
    {name: 'Cœur', at: prog => { const t = prog*6.283 + jit(.08), x = 16*Math.pow(Math.sin(t), 3), y = 13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t); return [.5 + x/38 + jit(.025), .47 - y/34 + jit(.025)]; }},
    {name: 'Explosion', at: (prog, si) => { const a = si*2.4 + compoPh + jit(.5), r = .05 + Math.pow(frR(), .7)*.46; return [.5 + Math.cos(a)*r, .5 + Math.sin(a)*r]; }},
    {name: 'Pluie', at: (prog, si) => [(si + .5)/sections.length + jit(.05), frR()]},
    {name: 'Diagonale', at: prog => { const k = compoW % 2 ? prog : 1 - prog; return [prog + jit(.08), k + jit(.12)]; }},
    {name: 'Constellation', at: (prog, si) => { const r2 = rngFrom(tr.id + 'cst' + Math.floor(prog*14) + compoPh); return [.08 + r2()*.84 + jit(.03), .08 + r2()*.84 + jit(.03)]; }}
  ];
  /* palettes : couleur de chaque geste + papier de la toile finale */
  const PALS = [
    {name: 'Classique', paper: '#efe7d6', ink: '#1c2340', g: {C: ['#2a8ca3', '#1f5f7a'], J: ['#f08a24', '#f2b31a'], H: ['#7b2d8e'], S: ['#c4306b', '#d9472b']}},
    {name: 'Néon', paper: '#1d1b22', ink: '#f4f0e6', g: {C: ['#29e0ff', '#3d7bff'], J: ['#ff3d9a', '#ffd23f'], H: ['#b06bff'], S: ['#7cf05a', '#ff8a2a']}},
    {name: 'Kraft', paper: '#e3cfa6', ink: '#1c1b19', g: {C: ['#1c1b19', '#3a3a3a'], J: ['#d7263d', '#a51c2e'], H: ['#f4f0e6'], S: ['#2a8ca3', '#1c1b19']}},
    {name: 'Tropique', paper: '#f6efe0', ink: '#14463a', g: {C: ['#2e8b3e', '#14463a'], J: ['#ff6a3d', '#f2c21b'], H: ['#ff3d7f'], S: ['#29c4ff', '#7b3fbf']}},
    {name: 'Bleu nuit', paper: '#dfe6ea', ink: '#0f1d3a', g: {C: ['#0f3d91', '#2f6fd6'], J: ['#ffd23f', '#f08a24'], H: ['#0f1d3a'], S: ['#e8344f', '#b06bff']}},
    {name: 'Pop', paper: '#fff6e0', ink: '#1c1b19', g: {C: ['#ff3d7f', '#b06bff'], J: ['#29c4ff', '#7cf05a'], H: ['#ffd23f'], S: ['#ff8a2a', '#1c1b19']}}
  ];
  function palette(){ const i0 = TRACKS.indexOf(tr), n = 2 + Math.min(trance, 4); return Array.from({length: n}, (_, i) => SPRAY[(i0 + i) % SPRAY.length]); }
  // la fresque se peint de gauche à droite au fil du morceau : à la fin, le mur raconte toute la face
  const FTOP = 76;
  function moveBrush(k){ const prog = Math.max(0, Math.min(1, beatNow/(totalBars*4))); pen.x = W*(.06 + prog*.88) + (frR() - .5)*56; pen.y += (frR() - .5)*(FH - FTOP)*.7*k; if(pen.y < FTOP + 10 || pen.y > FH - 14) pen.y = FTOP + 20 + frR()*(FH - FTOP - 40); }
  function sprayLine(x1, y1, x2, y2, w, col){
    fg.save(); fg.lineCap = 'round'; fg.strokeStyle = col;
    fg.globalAlpha = .18; fg.lineWidth = w*1.9; fg.beginPath(); fg.moveTo(x1, y1); fg.lineTo(x2, y2); fg.stroke();
    fg.globalAlpha = .9; fg.lineWidth = w; fg.beginPath(); fg.moveTo(x1, y1); fg.quadraticCurveTo((x1 + x2)/2 + (frR() - .5)*w*2, (y1 + y2)/2 + (frR() - .5)*w*2, x2, y2); fg.stroke();
    fg.fillStyle = col; for(let i=0;i<w*3;i++){ const k = frR(), x = x1 + (x2 - x1)*k + (frR() - .5)*w*3, y = y1 + (y2 - y1)*k + (frR() - .5)*w*3; fg.globalAlpha = .25 + frR()*.5; fg.beginPath(); fg.arc(x, y, frR()*1.6, 0, 6.283); fg.fill(); }
    fg.restore();
  }
  function drip(x, y, len, w, col){ fg.save(); fg.fillStyle = col; fg.globalAlpha = .85; fg.fillRect(x - w/2, y, w, len); fg.beginPath(); fg.arc(x, y + len, w*.85, 0, 6.283); fg.fill(); fg.restore(); }
  function stencil(x, y, r, col){
    const kind = Math.floor(frR()*4); fg.save(); fg.translate(x, y); fg.rotate((frR() - .5)*.5); fg.beginPath();
    if(kind === 0){ for(let i=0;i<10;i++){ const a = i*Math.PI/5 - Math.PI/2, rr = i % 2 ? r*.45 : r; fg.lineTo(Math.cos(a)*rr, Math.sin(a)*rr); } }
    else if(kind === 1){ fg.moveTo(-r, r*.5); fg.lineTo(-r, -r*.4); fg.lineTo(-r*.5, 0); fg.lineTo(0, -r*.7); fg.lineTo(r*.5, 0); fg.lineTo(r, -r*.4); fg.lineTo(r, r*.5); }
    else if(kind === 2){ fg.moveTo(0, r*.8); fg.bezierCurveTo(-r*1.3, -r*.1, -r*.5, -r*1.1, 0, -r*.35); fg.bezierCurveTo(r*.5, -r*1.1, r*1.3, -r*.1, 0, r*.8); }
    else { fg.moveTo(r*.2, -r); fg.lineTo(-r*.5, r*.1); fg.lineTo(0, r*.1); fg.lineTo(-r*.2, r); fg.lineTo(r*.5, -r*.1); fg.lineTo(0, -r*.1); }
    fg.closePath(); fg.fillStyle = col; fg.fill(); fg.lineWidth = 3.5; fg.strokeStyle = INK; fg.stroke(); fg.restore();
  }
  /* la toile raconte ta partie :
     couleur = geste (coupe bleu-canard, tap orange, maintien violet, scratch magenta) ;
     forme = timing (pile = tache ronde nette, en avance = jets à goutte, en retard = coulures) ;
     taille = combo ; place = la partie du morceau ; gris = les ratés */
  const PK = {teal: '#2a8ca3', petrol: '#1f5f7a', orange: '#f08a24', amber: '#f2b31a', purple: '#7b2d8e', magenta: '#c4306b', red: '#d9472b', navy: '#1c2340'};
  let GCOL = {C: [PK.teal, PK.petrol], J: [PK.orange, PK.amber], H: [PK.purple], S: [PK.magenta, PK.red]};
  const ANCH = [[.06, .25], [.94, .18], [.1, .78], [.92, .74], [.5, .06], [.3, .5], [.72, .45], [.5, .94], [.04, .52], [.96, .5]];
  let paintEv = [];
  function streakB(g, x, y, a, len, w, col, ball){ const ex = x + Math.cos(a)*len, ey = y + Math.sin(a)*len, nx = -Math.sin(a)*w/2, ny = Math.cos(a)*w/2; g.fillStyle = col; g.beginPath(); g.moveTo(x + nx, y + ny); g.lineTo(ex + nx*.25, ey + ny*.25); g.lineTo(ex - nx*.25, ey - ny*.25); g.lineTo(x - nx, y - ny); g.closePath(); g.fill(); if(ball){ g.beginPath(); g.arc(ex, ey, w*.9, 0, 6.283); g.fill(); } }
  function dripB(g, x, y, len, w, col){ g.fillStyle = col; g.beginPath(); g.moveTo(x - w/2, y); g.lineTo(x + w/2, y); g.lineTo(x + w*.3, y + len); g.lineTo(x - w*.3, y + len); g.closePath(); g.fill(); g.beginPath(); g.arc(x, y + len, w*.75, 0, 6.283); g.fill(); }
  function renderEv(g, Wc, y0, Hc, ev){
    const r = rngFrom(ev.seed), x = ev.nx*Wc, y = y0 + ev.ny*Hc, sc = Math.min(Wc, Hc)/200, R = ev.R*sc, toC = Math.atan2(y0 + Hc/2 - y, Wc/2 - x);
    g.save();
    if(ev.miss){ g.globalAlpha = .5; g.fillStyle = '#8a8172'; crisp(g, r, x, y, R*.5, '#8a8172', 0); dripB(g, x, y, R*(1 + r()*1.5), 2*sc, '#8a8172'); g.restore(); return; }
    g.globalAlpha = .93;
    crisp(g, r, x, y, R, ev.col, 0);
    for(let i=0;i<1 + Math.floor(r()*3);i++){ const a = r()*6.283, d = R*(.45 + r()*.6); crisp(g, r, x + Math.cos(a)*d, y + Math.sin(a)*d, R*(.3 + r()*.35), ev.col2 || ev.col, 0); }
    // texture aquarelle : taches plus sombres et plus claires dans la peinture
    g.globalCompositeOperation = 'source-atop'; for(let i=0;i<7;i++){ const a = r()*6.283, d = r()*R; g.fillStyle = r() < .5 ? 'rgba(20,10,30,.14)' : 'rgba(255,250,235,.16)'; g.beginPath(); g.arc(x + Math.cos(a)*d, y + Math.sin(a)*d, R*(.2 + r()*.35), 0, 6.283); g.fill(); } g.globalCompositeOperation = 'source-over';
    // en avance : des jets qui filent vers le centre de la toile, une goutte au bout
    const nJ = 3 + Math.round(Math.max(0, -ev.e)*10) + (ev.e > -.25 && ev.e < .25 ? 2 : 0);
    for(let i=0;i<nJ;i++){ const a = toC + (r() - .5)*(ev.e < -.25 ? 1.1 : 2.6), d0 = R*.8, len = R*(ev.e < -.25 ? 1.6 + r()*3 : .6 + r()*1.4); streakB(g, x + Math.cos(a)*d0, y + Math.sin(a)*d0, a, len, (1.2 + r()*2)*sc, ev.col, r() < .7); }
    // pile dans le temps : une couronne de fines gouttes tout autour
    g.fillStyle = ev.col; for(let i=0;i<(ev.e > -.25 && ev.e < .25 ? 26 : 12);i++){ const a = r()*6.283, k2 = Math.pow(r(), 1.5), d = R*(1.15 + k2*2.6); g.beginPath(); g.arc(x + Math.cos(a)*d, y + Math.sin(a)*d, Math.max(.5, (2 - k2*1.5)*sc*(.4 + r()*.6)), 0, 6.283); g.fill(); }
    // en retard (et notes tenues) : la peinture coule
    const nD = Math.round(Math.max(0, ev.e)*6) + (ev.hold ? 3 : 0);
    for(let i=0;i<nD;i++) dripB(g, x + (r() - .5)*R*1.4, y + R*.3, R*(.8 + r()*2.4)*(ev.hold ? 1.4 : 1), (1.8 + r()*2.2)*sc, ev.col);
    // scratch : un zigzag au pinceau
    if(ev.zig){ g.strokeStyle = ev.col; g.lineWidth = 2.5*sc; g.lineJoin = 'round'; g.beginPath(); for(let i=0;i<7;i++) g.lineTo(x - R*1.4 + i*R*.45, y - R*1.2 + (i % 2 ? -R*.5 : R*.3)); g.stroke(); }
    // gros palier de combo : une giclée marine qui traverse
    if(ev.big){ for(let i=0;i<8;i++){ const a = toC + (r() - .5)*2; streakB(g, x, y, a, R*(1.5 + r()*2.5), (1 + r()*1.6)*sc, ev.bigc || PK.navy, true); } }
    g.restore();
  }
  function paint(o, g, dir){
    if(!fg) return; paintN++;
    const bar = Math.floor(beatNow/4), sec = sectionOf(bar), si = Math.max(0, sections.indexOf(sec));
    const prog = Math.max(0, Math.min(1, beatNow/(totalBars*4))), at = (compo || COMPOS[0]).at(prog, si);
    const ev = {seed: 'pt' + paintN + tr.id, nx: Math.max(-.05, Math.min(1.05, at[0])), ny: Math.max(-.05, Math.min(1.05, at[1])), bigc: pal ? pal.ink : PK.navy};
    if(g === 'miss'){ ev.miss = true; ev.R = 7; }
    else {
      const pool = trance >= 2 && frR() < .4 ? Object.values(GCOL).flat() : GCOL[o.k] || GCOL.C;
      ev.col = pool[Math.floor(frR()*pool.length)]; ev.col2 = trance >= 1 ? Object.values(GCOL).flat()[Math.floor(frR()*7)] : ev.col;
      ev.e = o.dt != null ? Math.max(-1, Math.min(1, o.dt/(.2*diff.win))) : 0;
      ev.R = (g === 'perfect' ? 11 : g === 'good' ? 9 : 7)*(1 + Math.min(combo, 80)/60)*(o.k === 'H' ? 1.25 : 1);
      ev.hold = o.k === 'H'; ev.zig = o.k === 'S'; ev.big = combo && combo % 25 === 0;
    }
    paintEv.push(ev); renderEv(fg, W, FTOP, FH - FTOP, ev);
  }
  function paintNote(o){ if(!fg) return; paintN++; const at = (compo || COMPOS[0]).at(Math.max(0, Math.min(1, beatNow/(totalBars*4))), Math.max(0, sections.indexOf(sectionOf(Math.floor(beatNow/4))))), J = GCOL.J; const ev = {seed: 'n' + paintN, nx: at[0] + jit(.08), ny: at[1] + jit(.08), R: o.k === 'A' ? 4 : 2.5, col: J[o.k === 'A' ? J.length - 1 : 0], e: 0}; paintEv.push(ev); renderEv(fg, W, FTOP, FH - FTOP, ev); }
  // l'œuvre finale : on rejoue tous les coups de pinceau sur une grande toile en papier ancien
  // le titre de l'œuvre : la composition, l'humeur de la partie, un numéro de série
  let artTitle = '';
  function nameArt(){ const moods = ['brute', 'qui groove', 'en transe', 'hypnotique', 'nirvana'], m = moods[TIERS.filter(x => x && maxCombo >= x).length], n = api.load('runs', 0);
    return `${(compo || COMPOS[0]).name} ${m} n°${n}`; }
  function artwork(acc){
    artTitle = nameArt();
    const Wc = 360, Hc = 340, c = document.createElement('canvas'), sc = 2; c.width = Wc*sc; c.height = Hc*sc; const g = c.getContext('2d'); g.scale(sc, sc);
    g.fillStyle = pal ? pal.paper : '#efe7d6'; g.fillRect(0, 0, Wc, Hc); const rr = rngFrom('papier');
    for(let i=0;i<14;i++){ const x = rr()*Wc, y = rr()*Hc, R = 40 + rr()*120, gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, `rgba(${rr() < .5 ? '170,150,110' : '255,255,245'},.12)`); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, Wc, Hc); }
    for(let i=0;i<Wc*Hc/14;i++){ g.fillStyle = `rgba(110,90,60,${rr()*.06})`; g.fillRect(rr()*Wc, rr()*Hc, 1, 1); }
    for(const ev of paintEv) renderEv(g, Wc, 0, Hc, ev);
    g.save(); g.translate(Wc - 12, Hc - 12); g.rotate(-.05); g.textAlign = 'right'; g.font = `16px ${MARKER}`; g.fillStyle = pal ? pal.ink : PK.navy; g.fillText(`« ${artTitle} »`, 0, -18); g.font = `12px ${MARKER}`; g.fillText(`${tr.name} · ${acc} %`, 0, 0); g.restore();
    return c.toDataURL('image/jpeg', .86);
  }
  function artsOf(id){ try{ const a = JSON.parse(localStorage.getItem('k7cut.arts.' + id) || '[]'); if(a.length) return a; const old = localStorage.getItem('k7cut.art.' + id); return old ? [{img: old, title: '', acc: 0}] : []; }catch(e){ return []; } }
  function saveArt(img, acc){
    let list = [{img, title: artTitle, acc}, ...artsOf(tr.id)].slice(0, 3);
    // si le stockage est plein, on garde moins de toiles plutôt que rien
    while(list.length){ try{ localStorage.removeItem('k7cut.art.' + tr.id); localStorage.setItem('k7cut.arts.' + tr.id, JSON.stringify(list)); api.save('artNew', true); return; }catch(e){ list = list.slice(0, list.length - 1); } }
  }
  function rhythmPct(){ const tot = stats.perfect + stats.good + stats.ok + stats.miss; return tot ? Math.round((stats.perfect + stats.good*.8 + stats.ok*.4)/tot*100) : null; }
  /* ---------- page de récompense : animée sur un petit air de fin, calé sur le tempo de la face ---------- */
  function rwCss(){ if(!document.getElementById('k7-rw-css')){ const st = document.createElement('style'); st.id = 'k7-rw-css'; st.textContent = `
    .k7rw{position:absolute;inset:0;z-index:12;overflow-y:auto;overflow-x:hidden;background:#efe5cf;font-family:"Chakra Petch",sans-serif;color:${INK};-webkit-overflow-scrolling:touch}
    .k7rw canvas{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
    .k7rw .in{position:relative;min-height:100%;padding:18px 16px 22px;display:flex;flex-direction:column;gap:14px;max-width:480px;margin:0 auto;box-sizing:border-box}
    .k7rw .pop{opacity:0;animation:k7rwpop .5s cubic-bezier(.2,1.6,.4,1) forwards;animation-delay:calc(var(--d) + var(--n)*var(--b))}
    @keyframes k7rwpop{0%{opacity:0;transform:scale(.4) rotate(-6deg)}100%{opacity:1;transform:none}}
    .k7rw .top{display:flex;gap:12px;align-items:flex-start}
    .k7rw .ttl{flex:1;min-width:0}
    .k7rw h2{margin:0;font-family:${GRAF};font-weight:400;font-size:clamp(30px,10vw,48px);line-height:.95;color:#ffd23f;-webkit-text-stroke:3px ${INK};paint-order:stroke fill;text-shadow:4px 5px 0 ${INK};transform:rotate(-4deg);transform-origin:left}
    .k7rw .band{display:inline-block;margin-top:10px;background:${INK};color:#fff;font-family:${MARKER};font-size:clamp(16px,4.6vw,21px);padding:5px 14px;transform:rotate(-3deg);clip-path:polygon(0 12%,3% 0,97% 6%,100% 40%,98% 100%,2% 92%)}
    .k7rw .pct{display:inline-block;margin-top:8px;background:#f6e7a8;font-weight:800;font-size:clamp(15px,4.4vw,19px);padding:4px 12px;transform:rotate(-2deg);box-shadow:2px 3px 0 rgba(0,0,0,.15)}
    .k7rw .art{width:88%;max-width:360px;margin:4px auto 0;background:#fff;padding:10px 10px 46px;box-shadow:0 8px 0 rgba(28,27,25,.8);transform:rotate(-2deg);position:relative;border:3px solid ${INK}}
    .k7rw .art .cap{position:absolute;left:12px;right:12px;bottom:6px;display:flex;flex-direction:column;align-items:flex-start;font-family:${MARKER};line-height:1.15}.k7rw .art .cap b{font-weight:400;font-size:clamp(15px,4.6vw,20px)}.k7rw .art .cap span{font-size:12px;opacity:.7}
    .k7rw .art img{display:block;width:100%}.k7rw .art::before{content:"";position:absolute;top:-10px;left:30%;width:40%;height:18px;background:rgba(215,38,61,.75);transform:rotate(-4deg)}
    .k7rw .panel{position:relative;background:#ffd23f;border:4px solid ${INK};padding:44px 14px 16px;transform:rotate(-1deg);box-shadow:0 6px 0 ${INK}}
    .k7rw .ribbon{position:absolute;left:8%;right:8%;top:-16px;background:#e8344f;color:#fff;font-family:${GRAF};font-size:clamp(24px,7.4vw,34px);text-align:center;padding:4px 6px;border:4px solid ${INK};-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill;text-shadow:3px 3px 0 ${INK};transform:rotate(-2deg);white-space:nowrap}
    .k7rw .discs{display:flex;justify-content:center;gap:4%;position:relative}
    .k7rw .disc{width:27%;aspect-ratio:1;position:relative}.k7rw .disc svg{width:100%;height:100%;display:block}
    .k7rw .disc.on .burst{position:absolute;inset:-26%;background:repeating-conic-gradient(#fff 0 6deg,transparent 6deg 24deg);border-radius:50%;opacity:.8;animation:k7spin 6s linear infinite;-webkit-mask:radial-gradient(circle,transparent 38%,#000 40%,transparent 70%);mask:radial-gradient(circle,transparent 38%,#000 40%,transparent 70%)}
    @keyframes k7spin{to{transform:rotate(360deg)}}
    .k7rw .next{margin:14px auto 0;width:fit-content;background:#fff;border:3px solid ${INK};padding:4px 14px;font-family:${MARKER};font-size:15px;transform:rotate(-1deg)}
    .k7rw .card{background:#f6efe0;border:3px solid ${INK};border-radius:10px;display:grid;grid-template-columns:1fr 1fr;box-shadow:0 5px 0 rgba(28,27,25,.85)}
    .k7rw .cell{display:flex;gap:10px;align-items:center;padding:11px 10px;min-width:0}.k7rw .cell + .cell{border-left:2px dashed rgba(28,27,25,.35)}
    .k7rw .cell.row2{border-top:2px dashed rgba(28,27,25,.35)}
    .k7rw .ic{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;border:3px solid ${INK};font-size:20px;background:#ffd23f}
    .k7rw .lb{font-weight:800;font-size:12px;letter-spacing:.04em}.k7rw .vl{font-family:${FONT};font-size:clamp(18px,5.6vw,26px);line-height:1.05}.k7rw .sm{font-size:13px;opacity:.8}
    .k7rw .title{display:inline-block;background:#ffd23f;font-family:${MARKER};font-size:18px;padding:0 8px;transform:rotate(-2deg)}
    .k7rw .btns{display:grid;grid-template-columns:1.15fr 1fr;gap:12px;margin-top:4px}
    .k7rw .btns button{min-height:62px;border:4px solid ${INK};border-radius:12px;font-family:${GRAF};font-size:clamp(19px,5.6vw,26px);cursor:pointer;box-shadow:0 5px 0 ${INK};display:flex;align-items:center;justify-content:center;gap:8px;line-height:1}
    .k7rw .btns button:active{transform:translateY(4px);box-shadow:0 1px 0 ${INK}}
    .k7rw .again{background:#e8344f;color:#fff;-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill;text-shadow:2px 3px 0 ${INK}}
    .k7rw .keep{background:#f6efe0;color:${INK};font-size:clamp(15px,4.4vw,19px)!important}
    .k7rw .links{display:flex;justify-content:space-between;gap:10px}.k7rw .links button{flex:1;background:${INK};color:#fff;border:0;border-radius:10px;padding:11px;font-family:${MARKER};font-size:15px;cursor:pointer}
    @media (prefers-reduced-motion:reduce){.k7rw .pop{animation:none;opacity:1}.k7rw .disc.on .burst{animation:none}}`; document.head.appendChild(st); } }
  const discSvg = (on, col) => on ? `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="${INK}"/><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.5"/><circle cx="50" cy="50" r="33" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.5"/><circle cx="50" cy="50" r="22" fill="${col}" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="50" r="9" fill="${INK}"/><g fill="${INK}">${[0,1,2,3,4,5].map(i => `<rect x="47.5" y="27" width="5" height="6" transform="rotate(${i*60} 50 50)"/>`).join('')}</g><path d="M22 30a33 33 0 0 1 14-12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/></svg>`
    : `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="#8f8a82" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="50" r="30" fill="#c9c4ba" stroke="#6d6860" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="#6d6860"/><g fill="#6d6860">${[0,1,2,3,4,5].map(i => `<rect x="47.5" y="30" width="5" height="6" transform="rotate(${i*60} 50 50)"/>`).join('')}</g></svg>`;
  function outroMusic(at0, stars){
    if(!useAudio) return; const B = bpb, d0 = chordOf(1), prog = [0, 3, 4, 0];
    music.gain.cancelScheduledValues(actx.currentTime); music.gain.setValueAtTime(.8, actx.currentTime);
    for(let bar=0; bar<8; bar++){ const deg = d0 + prog[bar % 4], last = bar === 7;
      for(let b=0;b<4;b++){ const at = at0 + (bar*4 + b)*B; if(last && b > 0) break;
        I.kick(at, .9); if(b % 2) I.clap(at, .2); I.hat(at + B/2, .07, false, .2);
        osc(music, 'sawtooth', freq(deg, 1), at, B*.45, .09, {lp: [900, 300, 2]}); osc(music, 'sawtooth', freq(deg + 4, 1), at + B/2, B*.3, .06, {lp: [900, 300, 2]}); }
      I.chord(at0 + bar*4*B, [deg, deg + 2, deg + 4, deg + 6], (last ? 2 : 4)*B*.95, 'pad');
      if(bar % 2 === 0) for(let q=0;q<4;q++) I.pluck(music, at0 + bar*4*B + q*B/2 + B*2, freq(deg + [7, 9, 11, 14][q], 4), .05, {dly: .3});
    }
    I.crash(at0); I.crash(at0 + 28*B);
    // un disque = une note chantée (ou jouée), sur les temps 4, 5 et 6 ; puis un final à l'unisson
    for(let i=0;i<3;i++){ const at = at0 + (4 + i)*B; if(i < stars){ if(!(voiceOn() && sing(vox, at, freq(d0 + [7, 9, 11][i], 4), [2, 4, 6][i], .8, {long: true, rev: .35}))) I.bell(at, freq(d0 + [7, 9, 11][i], 4), .14); I.crash(at); } else osc(master, 'triangle', 160, at, .12, .08, {glide: 110}); }
    if(stars === 3 && voiceOn()) [0, 2, 4].forEach((k2, i) => sing(vox, at0 + 8*B + i*.03, freq(d0 + 7 + k2, 4), 6, .5, {long: true, pan: (i - 1)*.5, rev: .5}));
    for(let i=0;i<16;i++) I.hat(at0 + 2*B + i*B/8, .03 + i*.002, false, (i % 2 ? .3 : -.3)); // le compteur qui défile
  }
  function showReward(R){
    rwCss();
    const old = stage.querySelector('.k7rw'); if(old) old.remove();
    const at0 = useAudio ? qNext(clock() + .12, 1) : 0, delay = useAudio ? Math.max(0, (at0 - clock())/rate) : 0;
    const el = document.createElement('div'); el.className = 'k7rw'; el.style.setProperty('--b', bpb + 's'); el.style.setProperty('--d', delay + 's');
    const P = (n, html, cls) => `<div class="pop ${cls || ''}" style="--n:${n}">${html}</div>`;
    const col = SPRAY[TRACKS.indexOf(tr) % SPRAY.length];
    const TT = R.stars === 3 ? 'RYTHME PARFAIT !' : R.stars ? 'NIVEAU TERMINÉ !' : 'PRESQUE !';
    const ribbon = R.stars ? `${R.stars} DISQUE${R.stars > 1 ? 'S' : ''} GAGNÉ${R.stars > 1 ? 'S' : ''}` : 'PAS ENCORE DE DISQUE';
    const second = [];
    if(R.titleNew) second.push(`<div class="cell"><div class="ic" style="background:${INK};color:#ffd23f">★</div><div><div class="lb">NOUVEAU TITRE :</div><div class="title">${R.titleNew} !</div></div></div>`);
    if(R.opened.length) second.push(`<div class="cell"><div class="ic" style="background:#29c4ff">⏏</div><div><div class="lb">NOUVELLE CASSETTE</div><div class="vl" style="font-size:18px">${R.opened.map(x => x.name).join(', ')} !</div></div></div>`);
    else if(R.nextT && !unlocked(R.nextT)) second.push(`<div class="cell"><div class="ic" style="background:#d8d2c6">◎</div><div><b>${R.nextT.name} :</b><div class="sm">encore <b>${R.nextT.cost - discs()}</b> disque${R.nextT.cost - discs() > 1 ? 's' : ''}</div></div></div>`);
    if(R.rec) second.push(`<div class="cell"><div class="ic" style="background:#e8344f;color:#fff">♛</div><div><div class="lb">NOUVEAU RECORD</div><div class="sm">sur ${tr.name}, niveau ${diff.name}</div></div></div>`);
    if(second.length === 1) second.push(`<div class="cell"><div class="ic">◉</div><div><div class="lb">DISQUES</div><div class="vl">${discs()}</div></div></div>`);
    el.innerHTML = `<canvas></canvas><div class="in">
      ${P(0, `<h2>${TT}</h2>`)}
      ${R.img ? P(1, `<div class="art"><img src="${R.img}" alt="Ta toile"><div class="cap"><b>« ${R.artTitle} »</b><span>${tr.name} · ${R.acc} %</span></div></div>`, 'artw') : ''}
      <div class="top"><div class="ttl">${P(2, `<div class="band">${tr.name} ${R.mood}</div>`)}${P(2, `<div class="pct"><span data-count="${R.acc}">0</span> % de super rythme</div>`)}</div></div>
      ${P(3, `<div class="panel"><div class="ribbon">${ribbon}</div><div class="discs">${[0, 1, 2].map(i => `<div class="disc pop ${i < R.stars ? 'on' : ''}" style="--n:${4 + i}">${i < R.stars ? '<div class="burst"></div>' : ''}${discSvg(i < R.stars, '#ffd23f')}</div>`).join('')}</div>
        <div class="next">${R.stars < 3 ? `PROCHAIN DISQUE À ${diff.disc[R.stars]} %` : 'LES 3 DISQUES, BRAVO !'}</div></div>`)}
      ${P(7, `<div class="card"><div class="cell"><div class="ic">🏆</div><div><div class="lb">SCORE</div><div class="vl" data-count="${score}">0</div><div class="sm">points</div></div></div><div class="cell"><div class="ic" style="background:#29c4ff">✸</div><div><div class="lb">COMBO MAX</div><div class="vl">${maxCombo}</div></div></div>
        <div class="cell row2"><div class="ic" style="background:#e8344f;color:#fff">♪</div><div><b>+${R.gained} talent ♪</b><div class="sm">total ${bank()}</div></div></div><div class="cell row2"><div class="ic" style="background:#d8d2c6">▭</div><div>${lostTime > .3 ? `Bande ralentie :<br><b>+${lostTime.toFixed(1).replace('.', ',')} s perdues</b>` : `Bande intacte :<br><b>jamais ralentie</b>`}</div></div></div>`)}
      ${P(8, `<div class="card">${second.slice(0, 2).join('')}</div>`)}
      ${P(9, `<div class="btns"><button class="again">REJOUER ▶</button>${R.img ? `<button class="keep">GARDER MON ŒUVRE 💾</button>` : `<button class="keep">CASSETTES</button>`}</div>`)}
      ${P(10, `<div class="links"><button class="tomenu">◀ CASSETTES</button>${R.nextT && unlocked(R.nextT) ? `<button class="next2">FACE ${R.nextT.face} : ${R.nextT.name.toUpperCase()} ▶</button>` : ''}</div>`)}
      <div style="font-size:12px;opacity:.7;text-align:center">Chaque partie peint une toile unique. Rond net = pile · jets = en avance · coulures = en retard · gris = raté</div></div>`;
    stage.appendChild(el);
    const close = () => { alive = false; el.remove(); if(useAudio){ music.gain.cancelScheduledValues(actx.currentTime); music.gain.setTargetAtTime(0, actx.currentTime, .05); setTimeout(() => { if(music) music.gain.setValueAtTime(.8, actx.currentTime); }, 300); } };
    el.querySelector('.again').onclick = () => { close(); startTrack(tr); };
    el.querySelector('.tomenu').onclick = () => { close(); showMenu(); };
    const nx = el.querySelector('.next2'); if(nx) nx.onclick = () => { close(); startTrack(R.nextT); };
    el.querySelector('.keep').onclick = R.img ? R.keep : () => { close(); showMenu(); };
    outroMusic(at0, R.stars);
    // compteurs qui défilent pendant les temps 2 à 4, confettis à chaque disque, foule qui saute sur le tempo
    const cv2 = el.querySelector('canvas'), g = cv2.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1); let alive = true, parts = [], fired = 0;
    const size = () => { cv2.width = el.clientWidth*dpr; cv2.height = el.clientHeight*dpr; }; size();
    const t0r = performance.now()/1000 + delay;
    (function loop(){ if(!alive) return; const tt = performance.now()/1000 - t0r, beat = tt/bpb;
      el.querySelectorAll('[data-count]').forEach(n => { const v = +n.dataset.count, k = Math.max(0, Math.min(1, (beat - 2)/2)); n.textContent = Math.round(v*(1 - Math.pow(1 - k, 3))).toLocaleString('fr-FR'); });
      for(let i=fired;i<R.stars;i++) if(beat >= 4 + i){ fired = i + 1; const dEl = el.querySelectorAll('.disc')[i], r1 = dEl.getBoundingClientRect(), r0 = el.getBoundingClientRect(); for(let q=0;q<40;q++){ const a = Math.random()*6.283, sp = 150 + Math.random()*320; parts.push({x: r1.left - r0.left + r1.width/2, y: r1.top - r0.top + el.scrollTop + r1.height/2, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - 200, c: ['#ffd23f', '#e8344f', '#29c4ff', INK, '#fff'][q % 5], l: 1.4, r: Math.random()*6}); } api.vibe(25); }
      const W2 = el.clientWidth, H2 = el.scrollHeight; if(cv2.height !== Math.round(H2*dpr)){ cv2.style.height = H2 + 'px'; cv2.width = W2*dpr; cv2.height = H2*dpr; }
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W2, H2);
      // fond : bandes et giclées qui pulsent
      const kick = beat > 0 && beat < 29 ? Math.max(0, 1 - (beat % 1)*4) : 0;
      g.save(); g.globalAlpha = .9; g.fillStyle = INK; g.translate(0, 0); g.rotate(-.5); g.fillRect(-80, 120, 46, 400); g.fillStyle = '#e8344f'; g.fillRect(-20, 120, 14, 400); g.restore();
      g.fillStyle = 'rgba(28,27,25,.45)'; for(let i=0;i<40;i++){ const x = (i*97) % W2, y = (i*53) % 220; g.beginPath(); g.arc(W2 - 70 + (x % 70), y, 2.4*(1 - y/220), 0, 6.283); g.fill(); }
      // foule en bas qui saute
      const base = H2 + 6; for(let i=0;i<Math.ceil(W2/30) + 2;i++){ const x = i*30 - 8, j = kick*(6 + (i % 3)*5), sz = 1 + ((i*37) % 10)/25; g.save(); g.translate(x, base - j); g.scale(sz, sz); g.fillStyle = INK; g.beginPath(); g.arc(0, -46, 11, 0, 6.283); g.fill(); g.beginPath(); g.ellipse(0, -16, 17, 22, 0, Math.PI, 0); g.fill(); g.fillRect(-17, -16, 34, 30); if(i % 2){ g.strokeStyle = INK; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(10, -28); g.lineTo(18 + Math.sin(beat*Math.PI + i)*5, -66); g.stroke(); } g.restore(); }
      const dt = 1/60; for(const p of parts){ p.vy += 700*dt; p.x += p.vx*dt; p.y += p.vy*dt; p.l -= dt; p.r += .2; g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.globalAlpha = Math.max(0, p.l); g.fillStyle = p.c; g.fillRect(-4, -2.5, 8, 5); g.restore(); } parts = parts.filter(p => p.l > 0);
      requestAnimationFrame(loop); })();
  }
  function finishRun(won){
    if(holdState){ if(holdState.voice) holdState.voice.stop(); holdState = null; }
    api.save('runs', api.load('runs', 0) + 1); api.save('cue', cueN);
    const acc = rhythmPct() || 0, stars = diff.disc.filter(x => acc >= x).length, discsBefore = discs();
    const titleBefore = titleOf(bank()), gained = Math.round(notesRun*diff.mult + stars*5*diff.mult);
    api.save('notes', bank() + gained);
    const titleAfter = titleOf(bank());
    const bk = tr.id + '.' + diff.id, b = bests(), prev = b[bk] || {score: 0, stars: 0, discs: 0, pct: 0}; const rec = score > prev.score;
    b[bk] = {score: Math.max(prev.score, score), stars: Math.max(prev.stars || 0, stars), discs: Math.max(prev.discs || 0, stars), pct: Math.max(prev.pct || 0, acc)}; api.save('bests', b);
    const nextT = TRACKS[TRACKS.indexOf(tr) + 1], got = discs() - discsBefore;
    const opened = TRACKS.filter(x => !unlocked(x) && discs() >= x.cost); opened.forEach(x => api.save('unlock.' + x.id, true));
    const lines = [`${acc} % de super rythme  ·  ${DISC(stars)}`,
      stars < 3 ? `Disque suivant à ${diff.disc[stars]} % (${diff.name})` : 'Les 3 disques de cette face !',
      `${score} points${rec ? ' (record)' : ''} · combo max ${maxCombo}`,
      `+${gained} talent ♪ · total ${bank()}`, ...(lostTime > .3 ? [`Bande ralentie : +${lostTime.toFixed(1)} s perdues`] : []), `Disques : ${discs()}${got > 0 ? ` (+${got})` : ''}`];
    lines.push('Ta toile : rond net = pile · jets = en avance · coulures = en retard · gris = raté');
    if(titleAfter !== titleBefore) lines.push(`Nouveau titre : ${titleAfter} !`);
    if(opened.length) lines.push(`Nouvelle cassette : ${opened.map(x => x.name).join(', ')} !`);
    else if(nextT && !unlocked(nextT)) lines.push(`${nextT.name} : encore ${nextT.cost - discs()} disque${nextT.cost - discs() > 1 ? 's' : ''}`);
    const actions = [{label: 'Rejouer', fn: () => startTrack(tr)}];
    if(nextT && unlocked(nextT)) actions.unshift({label: `Face ${nextT.face} : ${nextT.name}`, fn: () => startTrack(nextT)});
    actions.push({label: 'Choisir une cassette', fn: showMenu});
    const TT = ['PAS ENCORE CALÉ', 'ÇA GROOVE', 'SUPER RYTHME', 'RYTHME PARFAIT'];
    const mood = ['brut', 'qui groove', 'en transe', 'hypnotique', 'nirvana'][TIERS.filter(x => x && maxCombo >= x).length];
    let img = null; try{ img = artwork(acc); saveArt(img, acc); }catch(e){}
    if(img) actions.splice(actions.length - 1, 0, {label: 'Garder mon œuvre', keep: true, fn: async () => { const name = `k7cut-${tr.id}-${acc}.jpg`;
      // dans Claude : la sauvegarde passe par la fenêtre de confirmation ; ailleurs (GitHub Pages, appli) : téléchargement classique
      if(window.claude && window.claude.use){ try{ const dl = await window.claude.use('downloads'); if(dl){ const blob = await (await fetch(img)).blob(); await dl.save({filename: name, data: blob}); return; } }catch(e){ return; } }
      const a = document.createElement('a'); a.href = img; a.download = name; document.body.appendChild(a); a.click(); a.remove(); }});
    const keep = img ? actions.find(a => a.keep).fn : null;
    api.after(700, () => showReward({acc, stars, img, artTitle, mood, gained, rec, nextT, opened, titleNew: titleAfter !== titleBefore ? titleAfter : null, keep}));
  }
  function fail(){ if(state !== 'play') return; state = 'over'; if(useAudio){ music.gain.setTargetAtTime(0, actx.currentTime, .2); osc(master, 'sawtooth', 220, now(), 1.2, .2, {glide: 40}); api.after(1500, () => { if(music) music.gain.setValueAtTime(.8, actx.currentTime); }); } finishRun(false); }
  function win(){ if(state !== 'play') return; state = 'over'; I.crash(now()); judges.push({txt: 'FIN DE FACE', x: W/2, y: H*.25, t: 0, big: true}); finishRun(true); }

  /* ---------- boucle ---------- */
  const objY = o => o.k === 'A' || o.k === 'L' ? Y0 - 62 : o.shape === 'flyer' ? Y0 - 56 : o.shape === 'tall' ? Y0 - 28 : o.shape === 'wide' ? Y0 - 13 : o.k === 'N' ? Y0 - 14 : o.k === 'H' || o.k === 'S' ? Y0 - 8 : Y0 - 15;
  let lastBeatI = -1, secShown = -1;
  api.loop((dt, rt) => {
    if(state === 'play'){
      // la bande glisse vers sa vitesse cible : elle freine vite, repart doucement
      if(rate !== rateTgt){ const sp = (rateTgt < rate ? .9 : .12)*Math.min(dt, .05); setRate(rate + Math.sign(rateTgt - rate)*Math.min(Math.abs(rateTgt - rate), sp)); }
      if(rate < .999) lostTime += Math.min(dt, .05)*(1/rate - 1);
      const t = now();
      beatNow = t/bpb;
      if(!tutoOpen){ const to = nextTutoObj(); if(to){ startTuto(to); draw(rt); return; } }
      while(nextStep/4*bpb < clock() + .15 && nextStep < totalBars*16){ scheduleStep(nextStep); nextStep++; }
      while(spawned*4 < beatNow + 10 && spawned < totalBars){ spawnBar(spawned); spawned++; }
      const air = jumpT < .42 && jumpT > .04;
      for(const o of objs){
        if(o.done) continue;
        if(o.k === 'N' && t >= o.time) collect(o, t);
        else if((o.k === 'A' || o.k === 'L') && t >= o.time) collect(o, t);
        else if((o.k === 'A' || o.k === 'L') && t > o.time + .12){ o.done = true; o.result = 'gone'; }
        else if((o.k === 'C' || o.k === 'J') && t > o.time + .2*diff.win && !(pendingNear(o) && t < o.time + .6)) resolve(o, 'miss', t);
        else if(o.k === 'H'){ if(!o.holding && t > o.time + .2*diff.win) resolve(o, 'miss', t); else if(o.holding){ if(t > o.endTime + .04) endHold(t, o.startGrade); else if(Math.random() < .5) confetti(HXs, Y0 - 12, [RED, PAPER], 1, .3); } }
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
    if(celeb && state === 'play'){ celeb.t += dt; if(celeb.t > 4) celeb = null; }
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
  /* ---------- habillage par style de musique ---------- */
  const THEMES = {
    metal:     {base: ['#efe5cf'], dark: false, band: [INK, '#d7263d'], acc: ['#d7263d', INK], hud: INK, hudInk: '#fff', chev: ['#d7263d', '#e8505f', '#f08a94'], hub: ['#d7263d', '#d7263d'], vinyl: [], eq: [INK, '#d7263d', INK, '#d7263d'], rim: ['#d7263d', '#a51c2e'], text: INK, art: 'metal'},
    punk:      {base: ['#efe7d3'], dark: false, band: [INK, '#ff2e7e'], acc: ['#ff2e7e', '#c8f04a', INK], hud: '#ff2e7e', hudInk: INK, chev: ['#ff2e7e', '#ff5c9b', '#ff97bf'], hub: ['#c8f04a', '#ff2e7e'], vinyl: ['#ff2e7e'], eq: [INK, '#ff2e7e', '#c8f04a'], rim: ['#ff2e7e', '#c8f04a'], text: INK, art: 'punk'},
    disco:     {base: ['#2a47c8', '#6a3fe0', '#ff4fa8'], dark: true, band: ['#ff3d9a', '#29e0ff'], acc: ['#29e0ff', '#ff3d9a', '#ffd23f'], hud: INK, hudInk: '#fff', chev: ['#ff3d9a', '#ff6fb5', '#ff9fcf'], hub: ['#1fd0c0', '#ffd23f'], vinyl: ['#ff3d9a'], eq: ['#29e0ff', '#ff3d9a', INK], rim: ['#29e0ff', '#ff3d9a'], text: '#fff', art: 'disco'},
    reggae:    {base: ['#f3ead0', '#f1df86'], dark: false, band: ['#2e8b3e', '#f2c21b'], acc: ['#2e8b3e', '#f2c21b', '#d7263d'], hud: '#f2d21b', hudInk: INK, chev: ['#d7263d', '#f2b31a', '#2e8b3e'], hub: ['#f2c21b', '#f2c21b'], vinyl: ['#d7263d', '#f2c21b', '#2e8b3e'], eq: ['#2e8b3e', '#f2c21b', '#d7263d', INK], rim: ['#f2c21b', '#2e8b3e'], text: INK, art: 'reggae'},
    hiphop:    {base: ['#d9cfbf'], dark: false, band: [INK, '#f2b31a'], acc: ['#f2b31a', '#7b3fbf', INK], hud: '#f2b31a', hudInk: INK, chev: ['#7b3fbf', '#9a68d2', '#bf9ae6'], hub: ['#f2b31a', '#7b3fbf'], vinyl: ['#f2b31a'], eq: [INK, '#f2b31a', '#7b3fbf'], rim: ['#f2b31a', '#7b3fbf'], text: INK, art: 'hiphop'},
    synthwave: {base: ['#1b0b3d', '#4d1a78', '#ff6a88'], dark: true, band: ['#ff3d9a', '#29e0ff'], acc: ['#ff3d9a', '#29e0ff', '#ffd23f'], hud: INK, hudInk: '#fff', chev: ['#29e0ff', '#6fe9ff', '#b2f3ff'], hub: ['#ff3d9a', '#29e0ff'], vinyl: ['#29e0ff'], eq: ['#ff3d9a', '#29e0ff', '#ffd23f'], rim: ['#ff3d9a', '#29e0ff'], text: '#fff', art: 'synth'},
    french:    {base: ['#141219', '#2b2440'], dark: true, band: ['#d9b44a', '#f4f0e6'], acc: ['#d9b44a', '#b7a6ff', '#f4f0e6'], hud: '#d9b44a', hudInk: INK, chev: ['#d9b44a', '#e5c875', '#f0dca2'], hub: ['#d9b44a', '#b7a6ff'], vinyl: ['#d9b44a'], eq: ['#d9b44a', '#b7a6ff', '#f4f0e6'], rim: ['#d9b44a', '#b7a6ff'], text: '#f4f0e6', art: 'french'},
    dnb:       {base: ['#0f2a22', '#14463a'], dark: true, band: ['#b6ff3b', '#2fd3b0'], acc: ['#b6ff3b', '#2fd3b0', '#ffd23f'], hud: '#b6ff3b', hudInk: INK, chev: ['#b6ff3b', '#cdff7a', '#e3ffb3'], hub: ['#b6ff3b', '#2fd3b0'], vinyl: ['#2fd3b0'], eq: ['#b6ff3b', '#2fd3b0', '#f4f0e6'], rim: ['#b6ff3b', '#2fd3b0'], text: '#f4f0e6', art: 'dnb'}
  };
  const TH = () => (tr && THEMES[tr.style]) || THEMES.metal;
  // petites illustrations peintes sur le fond
  function artSpeaker(g, x, y, w, h, lit){ g.fillStyle = INK; rrp(g, x, y, w, h, 6); g.fill(); for(const [cy2, rr2] of [[.3, .26], [.72, .34]]){ g.fillStyle = '#3a3734'; g.beginPath(); g.arc(x + w/2, y + h*cy2, w*rr2, 0, 6.283); g.fill(); g.fillStyle = lit || '#5a5650'; g.beginPath(); g.arc(x + w/2, y + h*cy2, w*rr2*.45, 0, 6.283); g.fill(); g.strokeStyle = 'rgba(255,255,255,.15)'; g.lineWidth = 1; g.beginPath(); g.arc(x + w/2, y + h*cy2, w*rr2*.75, 0, 6.283); g.stroke(); } }
  function artSkull(g, x, y, s){ g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#f4f0e6'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 14, Math.PI, 0); g.lineTo(14, 6); g.lineTo(8, 10); g.lineTo(8, 16); g.lineTo(-8, 16); g.lineTo(-8, 10); g.lineTo(-14, 6); g.closePath(); g.fill(); g.stroke(); g.fillStyle = INK; for(const sx of [-6, 6]){ g.beginPath(); g.arc(sx, 0, 4.5, 0, 6.283); g.fill(); } g.beginPath(); g.moveTo(0, 5); g.lineTo(-2.5, 9); g.lineTo(2.5, 9); g.closePath(); g.fill(); for(const sx of [-4, 0, 4]) g.fillRect(sx - .8, 12, 1.6, 4); g.restore(); }
  function artBolt(g, x, y, s, col){ g.fillStyle = col; g.beginPath(); g.moveTo(x, y); g.lineTo(x + s*.5, y); g.lineTo(x + s*.15, y + s*.6); g.lineTo(x + s*.55, y + s*.6); g.lineTo(x - s*.1, y + s*1.4); g.lineTo(x + s*.1, y + s*.8); g.lineTo(x - s*.25, y + s*.8); g.closePath(); g.fill(); }
  function artPalm(g, x, y, h, s){ g.save(); g.translate(x, y); g.scale(s, 1); g.strokeStyle = '#1d4a24'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(18, -h*.5, 6, -h); g.stroke(); g.fillStyle = '#1f6b2c';
    for(let i=0;i<7;i++){ const a = -Math.PI/2 + (i - 3)*.5, L = 60 + (i % 2)*20; g.save(); g.translate(6, -h); g.rotate(a); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(L*.5, -16, L, 8); g.quadraticCurveTo(L*.5, -2, 0, 4); g.closePath(); g.fill(); g.restore(); } g.restore(); }
  function themeArt(g, t, w, h, r){
    const th = THEMES[t.style] || THEMES.metal;
    if(th.art === 'metal' || th.art === 'punk'){
      artSpeaker(g, -10, h*.18, w*.2, h*.2); artSpeaker(g, w*.83, h*.14, w*.2, h*.24); artSkull(g, w*.78, h*.31, 1.3);
      for(let i=0;i<3;i++) artBolt(g, w*(.2 + i*.12), h*(.1 + i*.04), 26 + i*6, th.art === 'punk' && i === 1 ? th.acc[1] : INK);
      if(th.art === 'punk'){ g.save(); for(let i=0;i<4;i++){ g.translate(0, 0); g.fillStyle = 'rgba(244,240,230,.85)'; g.save(); g.translate(r()*w, r()*h*.4); g.rotate((r() - .5)*.8); g.fillRect(-36, -9, 72, 18); g.restore(); } g.restore(); g.strokeStyle = th.acc[0]; g.lineWidth = 5; for(let i=0;i<5;i++){ const x = r()*w, y = r()*h*.45; g.beginPath(); g.moveTo(x - 9, y - 9); g.lineTo(x + 9, y + 9); g.moveTo(x + 9, y - 9); g.lineTo(x - 9, y + 9); g.stroke(); } }
    }
    if(th.art === 'disco'){
      // rayons de lumière depuis la boule
      g.save(); g.translate(w*.86, h*.04); for(let i=0;i<9;i++){ g.rotate(.35); g.fillStyle = i % 2 ? 'rgba(41,224,255,.28)' : 'rgba(255,61,154,.28)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(h*.9, -20); g.lineTo(h*.9, 30); g.closePath(); g.fill(); } g.restore();
      for(let i=0;i<40;i++){ g.fillStyle = 'rgba(255,255,255,.8)'; const x = r()*w, y = r()*h*.5, s2 = 1 + r()*3; g.fillRect(x - s2, y - .5, s2*2, 1); g.fillRect(x - .5, y - s2, 1, s2*2); }
    }
    if(th.art === 'reggae'){
      g.fillStyle = '#f2b31a'; g.beginPath(); g.arc(w*.86, h*.2, w*.2, 0, 6.283); g.fill();
      artPalm(g, w*.1, h*.42, h*.3, 1); artPalm(g, w*.95, h*.4, h*.26, -1);
      artSpeaker(g, -8, h*.22, w*.18, h*.2, '#f2c21b'); artSpeaker(g, w*.86, h*.24, w*.18, h*.2, '#2e8b3e');
      for(const [c2, x0] of [['#2e8b3e', 0], ['#f2c21b', w*.92], ['#d7263d', w*.04]]){ g.globalAlpha = .7; crisp(g, r, x0, h*(.5 + r()*.3), 30 + r()*30, c2, 3); g.globalAlpha = 1; }
    }
    if(th.art === 'hiphop'){
      g.strokeStyle = 'rgba(80,60,40,.25)'; g.lineWidth = 2; for(let y=0;y<h*.5;y+=18){ g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); for(let x=(y/18 % 2)*20; x<w; x+=40){ g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 18); g.stroke(); } }
      g.save(); g.translate(w*.78, h*.14); g.fillStyle = '#f2b31a'; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(-34, 16); g.lineTo(-34, -12); g.lineTo(-17, 4); g.lineTo(0, -20); g.lineTo(17, 4); g.lineTo(34, -12); g.lineTo(34, 16); g.closePath(); g.fill(); g.stroke(); g.restore();
      artSpeaker(g, w*.04, h*.16, w*.22, h*.15, '#7b3fbf'); tag(g, r, w*.3, h*.08, .8, '#7b3fbf');
    }
    if(th.art === 'synth'){ for(let i=0;i<60;i++){ g.fillStyle = `rgba(255,255,255,${.3 + r()*.6})`; g.beginPath(); g.arc(r()*w, r()*h*.35, r()*1.6, 0, 6.283); g.fill(); } }
    if(th.art === 'french'){ g.save(); g.translate(w/2, h*.3); for(let i=0;i<14;i++){ g.rotate(6.283/14); g.fillStyle = i % 2 ? 'rgba(217,180,74,.14)' : 'rgba(183,166,255,.1)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(h, -30); g.lineTo(h, 30); g.closePath(); g.fill(); } g.restore();
      g.fillStyle = 'rgba(217,180,74,.9)'; g.beginPath(); g.moveTo(w/2, h*.16); g.lineTo(w/2 + 60, h*.3); g.lineTo(w/2 - 60, h*.3); g.closePath(); g.globalAlpha = .25; g.fill(); g.globalAlpha = 1; }
    if(th.art === 'dnb'){ g.strokeStyle = 'rgba(182,255,59,.5)'; g.lineCap = 'round'; for(let i=0;i<30;i++){ const x = r()*w, y = r()*h, l = 30 + r()*80; g.lineWidth = 1 + r()*2.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + l, y - l*.35); g.stroke(); } }
  }
  // fond « BD explosive » : papier crème, grandes bandes de pinceau en diagonale, trames, giclées, étoiles, éclairs
  function makeBackdrop(t, w, h, seed){
    const c = document.createElement('canvas'), sc = 2; c.width = w*sc; c.height = h*sc; const g = c.getContext('2d'); g.scale(sc, sc);
    const r = rngFrom(seed), th = (t && THEMES[t.style]) || THEMES.metal, acc = th.acc[0], B1 = th.band[0], B2 = th.band[1];
    if(th.base.length > 1){ const gr = g.createLinearGradient(0, 0, 0, h); th.base.forEach((c2, i) => gr.addColorStop(i/(th.base.length - 1), c2)); g.fillStyle = gr; } else g.fillStyle = th.base[0]; g.fillRect(0, 0, w, h);
    grain(g, w, h, w*h/30, !th.dark); grain(g, w, h, w*h/90, false);
    const dots = (x, y, R, col, step) => { g.fillStyle = col; for(let yy=-R; yy<R; yy+=step) for(let xx=-R; xx<R; xx+=step){ const d = Math.hypot(xx, yy)/R; if(d < 1){ g.beginPath(); g.arc(x + xx, y + yy, step*.4*(1 - d), 0, 6.283); g.fill(); } } };
    const DK = th.dark ? 'rgba(255,255,255,.35)' : 'rgba(28,27,25,.55)'; dots(w*.08, h*.08, w*.3, DK, 6); dots(w*.95, h*.55, w*.28, acc + '88', 6); dots(w*.1, h*.78, w*.25, (th.acc[1] || acc) + '99', 7);
    // bandes diagonales en haut à gauche et en bas à droite
    const band = (x0, y0, x1, y1, list) => { for(const [off, wd, col, al] of list){ const a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a)*off, ny = Math.cos(a)*off; if(col === INK) brush(g, r, x0 + nx, y0 + ny, x1 + nx, y1 + ny, wd, al); else { g.save(); g.strokeStyle = col; g.globalAlpha = al; g.lineCap = 'round'; for(let k=-wd/2; k<wd/2; k+=2){ g.lineWidth = 1.5 + r()*2; g.beginPath(); g.moveTo(x0 + nx - Math.sin(a)*k + r()*30, y0 + ny + Math.cos(a)*k); g.lineTo(x1 + nx - Math.sin(a)*k - r()*40, y1 + ny + Math.cos(a)*k); g.stroke(); } g.restore(); } } };
    if(!th.dark || th.art === 'disco'){ band(-40, h*.36, w*.6, -40, [[0, 46, B1, th.dark ? .5 : .92], [38, 16, B2, .9], [-40, 10, B2, .8], [70, 6, B1, .7]]);
    band(w*.45, h + 40, w + 40, h*.5, [[0, 40, B1, th.dark ? .5 : .9], [-34, 14, B2, .9], [40, 10, th.acc[1] || acc, .85]]); }
    themeArt(g, t || TRACKS[0], w, h, r);
    // traits de vitesse
    g.strokeStyle = th.dark ? 'rgba(255,255,255,.35)' : 'rgba(28,27,25,.5)'; g.lineCap = 'round'; for(let i=0;i<22;i++){ const x = r()*w, y = r()*h, l = 20 + r()*60; g.lineWidth = .8 + r()*1.6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + l*.8, y - l*.6); g.stroke(); }
    // giclées rouges et de la couleur de la face
    for(let i=0;i<7;i++){ g.globalAlpha = .9; crisp(g, r, r()*w, r()*h, 4 + r()*12, th.acc[i % th.acc.length], r() < .5 ? 2 : 0); g.globalAlpha = 1; }
    for(let i=0;i<60;i++){ g.fillStyle = r() < .6 ? (th.dark ? '#fff' : INK) : acc; g.beginPath(); g.arc(r()*w, r()*h, r()*2.2, 0, 6.283); g.fill(); }
    // étoiles, éclairs, notes, confettis
    const star = (x, y, s2, col) => { g.fillStyle = col; g.beginPath(); for(let i=0;i<10;i++){ const a = i*Math.PI/5 - Math.PI/2, rr = i % 2 ? s2*.42 : s2; g.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr); } g.closePath(); g.fill(); };
    for(let i=0;i<7;i++) star(r()*w, r()*h, 5 + r()*9, i % 2 ? (th.dark ? '#fff' : INK) : acc);
    const bolt = (x, y, s2) => { g.fillStyle = INK; g.beginPath(); g.moveTo(x, y); g.lineTo(x + s2*.5, y); g.lineTo(x + s2*.15, y + s2*.6); g.lineTo(x + s2*.55, y + s2*.6); g.lineTo(x - s2*.1, y + s2*1.4); g.lineTo(x + s2*.1, y + s2*.8); g.lineTo(x - s2*.25, y + s2*.8); g.closePath(); g.fill(); };
    if(th.art !== 'reggae') for(let i=0;i<4;i++) bolt(r()*w, r()*h*.9, 14 + r()*10);
    for(let i=0;i<9;i++){ g.save(); g.translate(r()*w, r()*h); g.rotate(r()*6.283); g.fillStyle = th.acc[i % th.acc.length]; g.fillRect(-6, -3, 12, 6); g.restore(); }
    scratches(g, r, w, h, 30);
    const vg = g.createRadialGradient(w/2, h/2, Math.min(w, h)*.35, w/2, h/2, Math.max(w, h)*.8); vg.addColorStop(0, 'rgba(60,40,10,0)'); vg.addColorStop(1, 'rgba(60,40,10,.18)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
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

  /* ---------- tutos en jeu : arrêt sur image, doigt animé, on fait le geste sur le vrai écran ---------- */
  // chaque forme a son geste : la forme EST la consigne
  const TUTO = {
    CV: {verb: 'GLISSE VERS LE HAUT', hint: 'n\'importe où sur l\'écran', need: 1, cue: 'GLISSE ↑'},
    CH: {verb: 'GLISSE VERS LA DROITE', hint: 'n\'importe où sur l\'écran', need: 1, cue: 'GLISSE →'},
    J: {verb: 'TAPE UNE FOIS', hint: 'un tap sec, sans glisser', need: 1, cue: 'TAPE'},
    H: {verb: 'POSE LE DOIGT ET TIENS', hint: 'jusqu\'au bout du ruban', need: 1, cue: 'TIENS'},
    S: {verb: 'GRATTE', hint: 'allers-retours de haut en bas', need: 4, cue: 'GRATTE'}
  };
  const tk = o => o.k === 'C' ? (o.shape === 'wide' ? 'CH' : 'CV') : o.k;
  // aides au-dessus des formes : elles s'effacent à mesure que tu réussis ce geste, et reviennent si tu le rates
  let cueN = {};
  function cueLearn(o, g){ if(o.k !== 'C' && o.k !== 'J') return; const k = tk(o); cueN[k] = Math.max(0, Math.min(10, (cueN[k] || 0) + (g === 'miss' ? -2 : 1))); }
  let tutoWrong = 0, tutoOk = 0, tutoHeld = 0;
  let tutoOpen = false, pauseRaw = 0, tutoObj = null, tutoT = 0, tutoCount = 0, tutoTouch = null, holdHint = 0;
  const rawNow = () => useAudio ? actx.currentTime : performance.now()/1000;
  // le tuto fige le jeu quand une forme jamais vue arrive sur la bande (deux temps avant la ligne rouge) : on montre le geste sur la vraie forme
  function startTuto(o){
    tutoOpen = true; tutoObj = o; tutoT = 0; tutoCount = 0; tutoTouch = null; tutoOk = 0; tutoWrong = 0; tutoHeld = 0; state = 'tuto'; pauseRaw = rawNow();
    if(useAudio && music){ music.gain.cancelScheduledValues(actx.currentTime); music.gain.setTargetAtTime(.15, actx.currentTime, .05); }
    gestures.clear(); api.vibe(30);
  }
  function tutoSuccess(dir){
    if(tutoOk) return; tutoOk = .8; tutoTouch = null; api.vibe([15, 30, 15]); const at = clock(), o = tutoObj;
    if(o.k === 'C'){ lead(at, freq(o.deg || 4, 4), .15, true); if(dir){ const l = Math.hypot(dir.x, dir.y) || 1; slash = {dx: dir.x/l, dy: dir.y/l, t: 0}; } }
    if(o.k === 'J'){ I.tap(master, at, 1); jumpT = 0; }
    if(o.k === 'H' || o.k === 'S') I.bell(at, freq(7, 4), .08);
  }
  function resumeTuto(){
    api.save('tuto3.' + tk(tutoObj), true);
    t0 += rawNow() - pauseRaw; tutoOpen = false; state = 'play';
    if(useAudio && music) music.gain.setTargetAtTime(.8, actx.currentTime, .04);
  }
  function tutoWrongMsg(){ tutoWrong = 1; api.vibe(40); }
  function tutoDown(e){
    if(tutoOk) return;
    const p = pt(e); try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    tutoTouch = {id: e.pointerId, x: p.x, y: p.y, ly: p.y, dir: 0, acc: 0};
  }
  function tutoMove(e){
    if(!tutoTouch || e.pointerId !== tutoTouch.id) return; const p = pt(e), o = tutoObj;
    if(o.k === 'C' && Math.hypot(p.x - tutoTouch.x, p.y - tutoTouch.y) > 22){ const dir = {x: p.x - tutoTouch.x, y: p.y - tutoTouch.y}; tutoTouch = null; if(rightWay(o, dir)) tutoSuccess(dir); else tutoWrongMsg(); return; }
    if(o.k === 'S'){ const v = p.y - tutoTouch.ly; tutoTouch.ly = p.y; const sg = Math.sign(v);
      if(sg && sg !== tutoTouch.dir){ if(tutoTouch.acc > 12 || tutoTouch.dir === 0){ tutoCount++; I.wik(clock(), sg < 0); api.vibe(10); if(tutoCount >= TUTO.S.need){ tutoSuccess(); return; } }
        tutoTouch.dir = sg; tutoTouch.acc = 0; }
      tutoTouch.acc += Math.abs(v); }
  }
  function tutoUp(e){
    if(!tutoTouch || e.pointerId !== tutoTouch.id) return; const p = pt(e), o = tutoObj, st = tutoTouch, d = Math.hypot(p.x - st.x, p.y - st.y); tutoTouch = null;
    if(o.k === 'J'){ if(d < 18) tutoSuccess(); else tutoWrongMsg(); }
    if(o.k === 'C'){ if(d > 10){ const dir = {x: p.x - st.x, y: p.y - st.y}; if(rightWay(o, dir)) tutoSuccess(dir); else tutoWrongMsg(); } else tutoWrongMsg(); }
    if(o.k === 'H' && !tutoOk){ tutoHeld = 0; tutoWrongMsg(); }
    if(o.k === 'S' && !tutoOk){ tutoCount = 0; }
  }
  const nextTutoObj = () => { for(const o of objs){ if(o.done || !'CJHS'.includes(o.k)) continue; const db = o.beat - beatNow; if(db > .4 && db <= 2 && !api.load('tuto3.' + tk(o), false)) return o; } return null; };
  // un doigt cartoon
  function finger(x, y, press, a){
    ctx.save(); ctx.translate(x, y); ctx.rotate(a || -.35); ctx.scale(.72*(1 - press*.08), .72*(1 - press*.08));
    ctx.fillStyle = PAPER; ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-9, 0); ctx.quadraticCurveTo(-9, -8, 0, -8); ctx.quadraticCurveTo(9, -8, 9, 0); ctx.lineTo(9, 34); ctx.quadraticCurveTo(26, 30, 30, 42); ctx.quadraticCurveTo(34, 70, 14, 82); ctx.lineTo(-14, 82); ctx.quadraticCurveTo(-30, 66, -26, 46); ctx.quadraticCurveTo(-24, 36, -9, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5, -2); ctx.quadraticCurveTo(0, -6, 5, -2); ctx.stroke();
    ctx.lineWidth = 2; for(const yy of [46, 56, 66]){ ctx.beginPath(); ctx.moveTo(-22, yy); ctx.lineTo(-6, yy - 2); ctx.stroke(); }
    ctx.restore();
    if(press > .5){ ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 3; ctx.globalAlpha = press - .5; ctx.beginPath(); ctx.arc(x, y, 12 + (1 - press)*24, 0, 6.283); ctx.stroke(); ctx.globalAlpha = 1; }
  }
  // étiquette façon jeu : bandeau d'encre, texte crème, petite flèche vers la forme
  function tutoTag(txt, x, y, size, col, arrowTo){
    ctx.save(); ctx.font = `${size}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const w = Math.min(W - 24, ctx.measureText(txt).width + 22), h = size + 14, lx = Math.max(12 + w/2, Math.min(W - 12 - w/2, x));
    ctx.fillStyle = INK; rrect(lx - w/2, y - h/2, w, h, 8); ctx.fill();
    if(arrowTo != null){ ctx.beginPath(); ctx.moveTo(arrowTo - 8, y + h/2 - 1); ctx.lineTo(arrowTo + 8, y + h/2 - 1); ctx.lineTo(arrowTo, y + h/2 + 9); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = col; const fs = Math.min(size, size*(W - 44)/Math.max(1, ctx.measureText(txt).width)); ctx.font = `${fs}px ${FONT}`; ctx.fillText(txt, lx, y + 1); ctx.restore();
  }
  function drawTuto(rt){
    const o = tutoObj; if(!o) return; const dt = 1/60; tutoT += dt;
    const d = TUTO[tk(o)]; tutoWrong = Math.max(0, tutoWrong - dt/1.2);
    if(o.k === 'H' && tutoTouch && !tutoOk){ tutoHeld += dt; if(tutoHeld >= .8) tutoSuccess(); }
    if(tutoOk){ tutoOk -= dt; if(tutoOk <= 0){ tutoOk = 0; resumeTuto(); return; } }
    const x = xOf(o.beat), y = objY(o), long = o.k === 'H' || o.k === 'S', x2 = long ? Math.min(W - 6, xOf(o.endBeat)) : x;
    // tout s'assombrit sauf la vraie forme sur la bande et la ligne rouge
    ctx.save(); ctx.fillStyle = 'rgba(28,27,25,.62)'; ctx.beginPath(); ctx.rect(0, 0, W, H);
    if(long){ const rx = x - 26, ry = Y0 - 44, rw = x2 - x + 52, rh = 62, rr = 14; ctx.moveTo(rx + rr, ry); ctx.arcTo(rx, ry, rx, ry + rh, rr); ctx.arcTo(rx, ry + rh, rx + rw, ry + rh, rr); ctx.arcTo(rx + rw, ry + rh, rx + rw, ry, rr); ctx.arcTo(rx + rw, ry, rx, ry, rr); ctx.closePath(); } else { ctx.moveTo(x + 46, y); ctx.arc(x, y, 46, 0, 6.283, true); }
    ctx.rect(HXs - 9, Y0 - 6, 18, TT + 12); ctx.fill('evenodd'); ctx.restore();
    ctx.save(); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -rt*30; ctx.beginPath();
    if(long) rrect(x - 26, Y0 - 44, x2 - x + 52, 62, 14); else ctx.arc(x, y, 46 + Math.sin(rt*6)*2, 0, 6.283); ctx.stroke(); ctx.restore();
    // le geste dessiné sur la forme elle-même
    let fx = x + 6, fy = y + 10, pr = 0; const hold = tutoTouch || tutoOk;
    ctx.save(); ctx.strokeStyle = '#ffd23f'; ctx.fillStyle = '#ffd23f'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    if(o.k === 'C'){ const v = o.shape !== 'wide', k = (tutoT % 1.2)/1.2, e = 1 - Math.pow(1 - Math.min(1, Math.max(0, (k - .1)/.5)), 3);
      const sx = v ? x : x - 44, sy = v ? y + 40 : y, ex = v ? x : x + 44, ey = v ? y - 44 : y;
      ctx.globalAlpha = .9; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.save(); ctx.translate(ex, ey); ctx.rotate(v ? -Math.PI/2 : 0); ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-6, -13); ctx.lineTo(-6, 13); ctx.closePath(); ctx.fill(); ctx.restore();
      fx = sx + (ex - sx)*e; fy = sy + (ey - sy)*e; pr = k > .08 && k < .65 ? 1 : 0; }
    if(o.k === 'J'){ const k = (tutoT % .8)/.8; pr = k > .3 && k < .5 ? 1 : 0; fx = x + 2; fy = y + 4 - (pr ? 0 : 10);
      if(pr){ ctx.lineWidth = 3; ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); ctx.stroke(); } }
    if(o.k === 'H'){ const k = (tutoT % 1.6)/1.6; pr = hold || (k > .15 && k < .85) ? 1 : 0; fx = x + 2; fy = Y0 - 9 + (pr ? 0 : -10); const fill = tutoTouch ? Math.min(1, tutoHeld/.8) : tutoOk ? 1 : pr ? (k - .15)/.7 : 0;
      ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, Y0 - 32); ctx.lineTo(x + (x2 - x)*fill, Y0 - 32); ctx.stroke(); }
    if(o.k === 'S'){ fx = x + 8 + (tutoT*60 % Math.max(20, x2 - x - 16)); fy = Y0 - 10 + Math.sin(tutoT*18)*16; pr = 1; }
    ctx.restore();
    if(!tutoOk) finger(fx, fy, pr);
    // la consigne, juste au-dessus de la bande
    const ly = Y0 - (o.k === 'C' && o.shape === 'tall' ? 92 : 76);
    if(tutoOk) tutoTag('OUI ! SUR LA LIGNE ROUGE, EN RYTHME', W/2, ly, 15, '#7cf05a', HXs);
    else if(tutoWrong > 0) tutoTag(o.k === 'J' ? 'SANS GLISSER !' : o.k === 'H' ? 'TIENS PLUS LONGTEMPS !' : o.k === 'C' ? 'DANS LE SENS DE LA FLÈCHE !' : 'PLUS VITE !', W/2, ly, 16, LABELRED, x);
    else { tutoTag(d.verb, W/2, ly, 18, PAPER, x); ctx.save(); ctx.textAlign = 'center'; ctx.font = `700 13px "Chakra Petch", sans-serif`; ctx.fillStyle = PAPER; ctx.fillText(o.k === 'S' ? `${d.hint} · ${tutoCount}/${d.need}` : `essaie maintenant, ${d.hint}`, W/2, ly - 26); ctx.restore(); }
  }
  // aide au-dessus de chaque bloc ou rond qui arrive : bien visible au début, elle s'efface quand tu as compris
  function drawCue(o, x, y){
    const d = TUTO[tk(o)], n = cueN[tk(o)] || 0, fade = 1 - n/8; if(!d || !d.cue || fade <= 0) return; const bd = o.beat - beatNow; if(bd > 3 || bd < -.1) return;
    ctx.save(); ctx.globalAlpha = fade*Math.min(1, (3 - bd)*1.5); ctx.textAlign = 'center'; ctx.font = `11px ${FONT}`; const w = ctx.measureText(d.cue).width + 12, top = o.k === 'C' && o.shape === 'tall' ? 50 : 36;
    ctx.fillStyle = INK; rrect(x - w/2, y - top - 16, w, 18, 5); ctx.fill(); ctx.fillStyle = bd < .35 ? '#ffd23f' : PAPER; ctx.textBaseline = 'middle'; ctx.fillText(d.cue, x, y - top - 7); ctx.restore();
  }

  /* ---------- célébrations : mots et illustrations à l'encre en fond, pendant que la partie continue ---------- */
  const WORDS = [[], ['BIEN JOUÉ', 'ÇA GROOVE', 'QUEL RYTHME'], ['EN FEU !', 'TU TIENS LA TRANSE', 'ÇA CHAUFFE'], ['HYPNOTIQUE', 'IMPARABLE', 'TU VOLES'], ['ROI DU RYTHME', 'LÉGENDAIRE', 'NIRVANA']];
  let celeb = null;
  function celebrate(tier, word){ celeb = {tier, word: word || WORDS[tier][Math.floor(Math.random()*WORDS[tier].length)], t: 0, seed: Math.random()*1000}; }
  function inkBlob(x, y, r, a){ ctx.globalAlpha = a; ctx.fillStyle = INK; ctx.beginPath(); for(let i=0;i<=24;i++){ const an = i/24*6.283, rr = r*(.75 + .25*Math.sin(an*5 + x)); i ? ctx.lineTo(x + Math.cos(an)*rr, y + Math.sin(an)*rr) : ctx.moveTo(x + Math.cos(an)*rr, y + Math.sin(an)*rr); } ctx.fill(); }
  function drawIllu(rt, ek){
    const lvl = trance; if(!lvl && !celeb) return;
    const cx = W/2, cy = H*.2, pop = celeb ? Math.min(1, celeb.t*3) : 1, base = celeb && celeb.t < 2.2 ? .85 : .3;
    ctx.save();
    if(lvl >= 1){ ctx.globalAlpha = base*.8; ctx.fillStyle = INK; for(let i=0;i<6;i++){ const a = rt*.8 + i*1.047, R = W*.32*pop*(1 + ek*.06), x = cx + Math.cos(a)*R, y = cy + Math.sin(a)*R*.55; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(rt*2 + i)*.3); ctx.scale(1.4, 1.4);
        ctx.beginPath(); ctx.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); ctx.fill(); ctx.fillRect(1.5, -14, 3, 20); ctx.beginPath(); ctx.moveTo(4.5, -14); ctx.quadraticCurveTo(14, -10, 10, 0); ctx.quadraticCurveTo(11, -7, 4.5, -7); ctx.fill(); ctx.restore(); } }
    if(lvl >= 2){ ctx.globalAlpha = base*.7; for(let i=0;i<5;i++){ const x = W*(.1 + i*.2), h = H*.16*pop*(1 + Math.sin(rt*6 + i)*.15 + ek*.2); ctx.fillStyle = i % 2 ? INK : LABELRED; ctx.beginPath(); ctx.moveTo(x - 26, H*.36); ctx.quadraticCurveTo(x - 30, H*.36 - h*.6, x + Math.sin(rt*4 + i)*10, H*.36 - h); ctx.quadraticCurveTo(x + 30, H*.36 - h*.5, x + 26, H*.36); ctx.closePath(); ctx.fill(); } }
    if(lvl >= 3){ ctx.globalAlpha = base*.6; ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); for(let a=0;a<6.283*4;a+=.12){ const r = a*W*.017*pop, x = cx + Math.cos(a - rt*2)*r, y = cy + Math.sin(a - rt*2)*r*.8; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    if(lvl >= 4){ ctx.globalAlpha = Math.min(1, base + .2); const s = W*.0022*pop*(1 + ek*.05); ctx.save(); ctx.translate(cx, cy - 6); ctx.scale(s*100, s*100); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-1, .5); ctx.lineTo(-1.1, -.6); ctx.lineTo(-.55, -.05); ctx.lineTo(0, -.85); ctx.lineTo(.55, -.05); ctx.lineTo(1.1, -.6); ctx.lineTo(1, .5); ctx.closePath(); ctx.fill(); ctx.fillStyle = LABELRED; for(const x of [-.55, 0, .55]){ ctx.beginPath(); ctx.arc(x, .2, .12, 0, 6.283); ctx.fill(); } ctx.fillStyle = '#e0a800'; ctx.beginPath(); ctx.arc(0, -.85, .1, 0, 6.283); ctx.arc(-1.1, -.6, .08, 0, 6.283); ctx.arc(1.1, -.6, .08, 0, 6.283); ctx.fill(); ctx.restore(); }
    if(celeb){ const t = celeb.t, a = t < 2.4 ? 1 : Math.max(0, 1 - (t - 2.4)/1.2), sc = t < .18 ? .4 + t/.18*.75 : 1.15 - Math.min(.15, (t - .18)*.5);
      if(a > 0){ const r = rngFrom('c' + celeb.seed); for(let i=0;i<14;i++) inkBlob(cx + (r() - .5)*W*.8, H*.3 + (r() - .5)*H*.12, 3 + r()*9*pop, a*.8);
        ctx.globalAlpha = a; ctx.save(); ctx.translate(cx, H*.3); ctx.rotate(-.08); ctx.scale(sc, sc); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const fs = Math.min(42, W*.9/Math.max(6, celeb.word.length)*1.5); ctx.font = `${fs}px ${FONT}`; ctx.lineWidth = 9; ctx.strokeStyle = PAPERBG; ctx.strokeText(celeb.word, 0, 0); ctx.fillStyle = celeb.tier >= 3 ? LABELRED : INK; ctx.fillText(celeb.word, 0, 0); ctx.restore(); } }
    ctx.restore();
  }
  // le public en bas de l'écran : plus tu enchaînes, plus il se lève
  let hudSplat = null;
  function makeHudSplat(col){ const c = document.createElement('canvas'), w = 150, h = 120; c.width = w*2; c.height = h*2; const g = c.getContext('2d'); g.scale(2, 2); const r = rngFrom('hud');
    g.fillStyle = col || '#f7cf2a'; g.beginPath(); for(let i=0;i<=26;i++){ const a = i/26*6.283, rr = (i % 4 === 0 ? 1.12 : .92 + r()*.1); g.lineTo(w/2 + Math.cos(a)*w*.42*rr, h*.45 + Math.sin(a)*h*.34*rr); } g.closePath(); g.fill();
    for(let i=0;i<3;i++){ const x = w*(.3 + i*.2), len = 14 + r()*26; g.fillRect(x - 2.5, h*.7, 5, len); g.beginPath(); g.arc(x, h*.7 + len, 4, 0, 6.283); g.fill(); }
    for(let i=0;i<18;i++){ g.beginPath(); g.arc(w/2 + (r() - .5)*w, h*.45 + (r() - .5)*h*.8, r()*3, 0, 6.283); g.fill(); }
    return c; }
  function drawCrowd(ek){
    const n = Math.ceil(W/30) + 2, base = H + 6, rims = TH().rim;
    for(const pass of [0, 1]) for(let i=0;i<n;i++){
      const x = i*30 - 8 + (i % 2)*9, sz = 1 + ((i*37) % 10)/22, up = (i*7 % 5) < 1 + trance + (ek > .6 ? 1 : 0), jump = ek*(trance >= 2 ? 8 : 3)*((i % 3) ? 1 : .5), y = base - jump - (i % 2)*6;
      ctx.save(); ctx.translate(x + (pass ? 0 : -2.5), y + (pass ? 0 : -2.5)); ctx.scale(sz, sz); ctx.fillStyle = pass ? INK : rims[i % rims.length];
      ctx.beginPath(); ctx.arc(0, -46, 11, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -16, 17, 22, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-17, -16, 34, 30);
      if(up){ const w2 = Math.sin(beatNow*Math.PI + i)*5; ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(i % 2 ? 12 : -12, -28); ctx.lineTo((i % 2 ? 20 : -20) + w2, -66); ctx.stroke();
        ctx.beginPath(); ctx.arc((i % 2 ? 20 : -20) + w2, -70, 5, 0, 6.283); ctx.fill(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo((i % 2 ? 18 : -22) + w2, -72); ctx.lineTo((i % 2 ? 16 : -24) + w2, -82); ctx.moveTo((i % 2 ? 23 : -17) + w2, -72); ctx.lineTo((i % 2 ? 25 : -15) + w2, -82); ctx.stroke(); }
      ctx.restore(); }
  }
  /* ---------- dessin ---------- */
  // ombre dure façon sérigraphie : pas de flou (le flou coûte cher sur mobile et ferait décrocher le rythme)
  function shadow(on, blur, oy){ if(on){ ctx.shadowColor = 'rgba(40,20,0,.22)'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = Math.max(2, (oy == null ? 6 : oy)*.6); } else { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; } }
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
      // debout = coupe de bas en haut, couché = coupe de gauche à droite : les chevrons montrent le sens
      if(o.shape === 'tall' || o.shape === 'wide'){ const v = o.shape === 'tall'; ctx.save(); if(!v) ctx.rotate(Math.PI/2);
        ctx.fillStyle = PAPER; rrect(-12, -27, 24, 54, 7); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.save(); rrect(-12, -27, 24, 54, 7); ctx.clip(); ctx.fillStyle = 'rgba(28,27,25,.12)'; ctx.fillRect(-12, -27, 7, 54); ctx.restore();
        const ph = (beatNow*2) % 1, chv = TH().chev; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for(let i=0;i<3;i++){ const yy = 14 - i*13 - ph*5; ctx.strokeStyle = chv[2 - i] || RED; ctx.globalAlpha = .7 + i*.15; ctx.beginPath(); ctx.moveTo(-7, yy + 5); ctx.lineTo(0, yy - 3); ctx.lineTo(7, yy + 5); ctx.stroke(); }
        ctx.globalAlpha = 1; ctx.restore(); }
      else if(o.shape === 'flyer'){ ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 6.283); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 9, rot, rot + 1.4); ctx.stroke(); }
      else { ctx.fillStyle = PAPER; rrect(-14, -14, 28, 28, 5); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.save(); rrect(-14, -14, 28, 28, 5); ctx.clip(); ctx.strokeStyle = 'rgba(28,27,25,.18)'; ctx.lineWidth = 1; for(let i=-28;i<28;i+=5){ ctx.beginPath(); ctx.moveTo(i, 14); ctx.lineTo(i + 28, -14); ctx.stroke(); } ctx.restore(); ctx.fillStyle = RED; ctx.fillRect(-14, -4, 28, 6); ctx.fillStyle = INK; ctx.fillRect(-8, 6, 16, 2); }
    } else if(o.k === 'J' && !o.bomb){ // rond = un tap : un gros bouton qui s'enfonce sur le temps
      const pr = Math.max(0, 1 - Math.abs(o.beat - beatNow)*4); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 3, 16, 0, 6.283); ctx.fill(); shadow(false);
      ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(0, -1 + pr*3, 13, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke();
      { const hk = 1 + energy.kick*.25, hy2 = -1 + pr*3; ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(0, hy2 + 5*hk); ctx.bezierCurveTo(-9*hk, hy2 - 1*hk, -5*hk, hy2 - 8*hk, 0, hy2 - 3.5*hk); ctx.bezierCurveTo(5*hk, hy2 - 8*hk, 9*hk, hy2 - 1*hk, 0, hy2 + 5*hk); ctx.fill(); } }
    else if(o.bomb){ ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 2, 13, 0, 6.283); ctx.fill(); shadow(false); ctx.fillStyle = INK; ctx.fillRect(-4, -14, 8, 5); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -14); ctx.quadraticCurveTo(6, -22, 10, -18); ctx.stroke(); ctx.fillStyle = energy.hat > .5 ? PAPER : '#ffd23f'; ctx.beginPath(); ctx.arc(10, -18, 2.5 + energy.kick*2, 0, 6.283); ctx.fill(); }
    else if(o.k === 'N' || o.k === 'A'){ ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); ctx.fill(); shadow(false); ctx.fillRect(1.5, -12, 3, 18); ctx.beginPath(); ctx.moveTo(4.5, -12); ctx.quadraticCurveTo(14, -8, 10, 0); ctx.quadraticCurveTo(11, -6, 4.5, -6); ctx.fill(); if(o.k === 'A'){ ctx.strokeStyle = PAPER; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 17, 0, 6.283); ctx.stroke(); } }
    else if(o.k === 'L'){ ctx.fillStyle = RED; rrect(-10, -13, 20, 26, 4); ctx.fill(); shadow(false); ctx.fillStyle = PAPER; ctx.font = `12px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('+', 0, 1); ctx.textBaseline = 'alphabetic'; }
    shadow(false); ctx.restore();
  }
  function drawDeco(rt){
    const k = energy.kick, d = tr.deco, cx = W/2, cy = H*.2;
    ctx.save();
    if(d === 'rays'){ // boule à facettes qui tourne, éclats sur le temps
      const bx = W*.66, by = H*.17, R = W*.13 + k*3; ctx.save(); ctx.beginPath(); ctx.arc(bx, by, R, 0, 6.283); ctx.clip();
      ctx.fillStyle = '#8f9bd6'; ctx.fillRect(bx - R, by - R, R*2, R*2);
      for(let yy=-R; yy<R; yy+=R/6){ const rw = Math.sqrt(Math.max(0, R*R - yy*yy)); for(let q=0;q<14;q++){ const a = q/14*6.283 + rot*.4, xx = Math.cos(a)*rw; if(Math.sin(a) < 0) continue; const lum = (q*7 + Math.floor(yy) + Math.floor(beatNow*2)) % 5; ctx.fillStyle = ['#e9ecff', '#b4bdf2', '#29e0ff', '#ff3d9a', '#6f7cc4'][lum]; ctx.fillRect(bx + xx - R/12, by + yy, R/6.5, R/6.5); } }
      ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, R, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx, by - R); ctx.stroke(); ctx.fillStyle = INK; ctx.fillRect(bx - 5, by - R - 6, 10, 7);
      if(k > .4){ ctx.fillStyle = `rgba(255,255,255,${k})`; for(let q=0;q<5;q++){ const a = q*1.3 + rot, x = bx + Math.cos(a)*R*.6, y = by + Math.sin(a)*R*.6, s2 = 4 + k*8; ctx.fillRect(x - s2, y - .8, s2*2, 1.6); ctx.fillRect(x - .8, y - s2, 1.6, s2*2); } } }
    if(d === 'vinyl'){ ctx.fillStyle = 'rgba(28,27,25,.08)'; for(let y=8;y<H*.4;y+=12) for(let x=(y/12 % 2)*6; x<W; x+=12) ctx.fillRect(x, y, 2 + energy.snare*2, 2 + energy.snare*2);
      ctx.translate(W*.86, H*.15); ctx.rotate(rot*.5); const R = W*.38 + k*6; ctx.fillStyle = 'rgba(28,27,25,.85)'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; for(let r=R*.4; r<R; r+=4){ ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.stroke(); } ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, R*.32, 0, 6.283); ctx.fill(); ctx.fillStyle = PAPER; ctx.fillRect(-R*.2, -3, R*.4, 6); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 4, 0, 6.283); ctx.fill(); }
    if(d === 'grid'){ const hz = H*.33; ctx.fillStyle = `rgba(255,236,170,${.85})`; ctx.beginPath(); ctx.arc(cx, hz, W*.26 + k*6, Math.PI, 0); ctx.fill(); ctx.fillStyle = tr.bg[0]; for(let i=0;i<5;i++) ctx.fillRect(cx - W*.3, hz - 8 - i*11, W*.6, 3 + i*.6);
      ctx.strokeStyle = `rgba(28,27,25,${.25 + k*.2})`; ctx.lineWidth = 1.5; const off = (beatNow % 1); for(let i=0;i<9;i++){ const z = (i + 1 - off)/9, y = hz + z*z*(Y0 - hz); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for(let i=-8;i<=8;i++){ ctx.beginPath(); ctx.moveTo(cx + i*12, hz); ctx.lineTo(cx + i*W*.16, Y0); ctx.stroke(); } }
    if(d === 'speakers'){ // guirlande d'ampoules qui se balance et clignote sur le temps
      ctx.translate(0, 96); ctx.strokeStyle = INK; ctx.lineWidth = 2; const sag = 26 + Math.sin(rot*.6)*4; ctx.beginPath(); ctx.moveTo(-10, 6); ctx.quadraticCurveTo(W/2, 6 + sag*2, W + 10, 6); ctx.stroke();
      const cols = ['#d7263d', '#f2c21b', '#2e8b3e']; for(let q=0;q<9;q++){ const tq = (q + .5)/9, x = -10 + tq*(W + 20), y = 6 + 2*tq*(1 - tq)*sag*2, on = (q + Math.floor(beatNow)) % 3 === 0;
        ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 8); ctx.stroke(); if(on){ ctx.fillStyle = cols[q % 3] + '55'; ctx.beginPath(); ctx.arc(x, y + 15, 12 + k*6, 0, 6.283); ctx.fill(); } ctx.fillStyle = on ? '#fff6c2' : cols[q % 3]; ctx.beginPath(); ctx.ellipse(x, y + 14, 4.5, 6, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.stroke(); ctx.lineWidth = 2; } }
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
    if(fresco && !window.__nofresco){ ctx.save(); ctx.globalAlpha = .8; ctx.drawImage(fresco, 0, 0, W, FH); ctx.restore(); }
    if(trance >= 1){
      ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = `hsl(${(rt*50) % 360},90%,60%)`; ctx.globalAlpha = .25 + trance*.12; ctx.fillRect(-20, -20, W + 40, H + 40); ctx.restore();
      if(trance >= 3){ ctx.save(); ctx.translate(W/2, H*.22); ctx.rotate(rt*.6); const R = W*.75*(1 + ek*.1); for(let i=0;i<14;i++){ ctx.rotate(6.283/14); ctx.fillStyle = i % 2 ? 'rgba(244,240,230,.16)' : 'rgba(28,27,25,.1)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R, -R*.22); ctx.lineTo(R, R*.22); ctx.closePath(); ctx.fill(); } ctx.restore(); }
      if(trance >= 4){ ctx.save(); ctx.translate(W/2, H*.22); for(let i=0;i<48;i++){ const a = i*2.39996, z = ((rt*.9 + i*.137) % 1), r0 = z*z*W, r1 = r0 + 8 + z*40; ctx.strokeStyle = `hsla(${(i*30 + rt*120) % 360},95%,65%,${z})`; ctx.lineWidth = 1 + z*3; ctx.beginPath(); ctx.moveTo(Math.cos(a)*r0, Math.sin(a)*r0); ctx.lineTo(Math.cos(a)*r1, Math.sin(a)*r1); ctx.stroke(); } ctx.restore(); }
      for(const g of rings){ ctx.strokeStyle = `rgba(244,240,230,${g.a*.7})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(HXs, Y0, g.r, 0, 6.283); ctx.stroke(); }
      if(trance >= 3 && !api.reduced && ((beatNow % 4) + 4) % 4 < .07){ ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-20, -20, W + 40, H + 40); }
    }
    drawIllu(rt, ek);
    // égaliseur qui danse
    const chans = ['kick','bass','snare','chords','lead','hat'], bw = (W - 32)/18;
    for(let i=0;i<18;i++){ const e = energy[chans[i % 6]]*(.6 + .4*Math.sin(i*1.7 + rt*3)), h = 4 + e*36; { const eqc = TH().eq; ctx.fillStyle = eqc[Math.floor(i/2) % eqc.length]; } rrect(16 + i*bw + 1, EQY - h, bw - 3, h, 2); ctx.fill(); }
    drawCrowd(ek);
    // bobines
    const prog = Math.max(0, Math.min(1, beatNow/4/totalBars)), lx = W*.27, rx = W*.73;
    const rL = REELR*(.55 + .45*prog), rR = REELR*(1 - .45*prog), hubR = REELR*.5;
    ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(14, TAPEY); ctx.lineTo(lx - rL, REELY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(W - 14, TAPEY); ctx.lineTo(rx + rR, REELY); ctx.stroke();
    shadow(true, 22, 10); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(lx, REELY, rL + ek*2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(rx, REELY, rR + ek*2, 0, 6.283); ctx.fill(); shadow(false);
    ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1; for(const [cx2, rr2] of [[lx, rL], [rx, rR]]){ for(let q=hubR + 4; q<rr2; q+=4){ ctx.beginPath(); ctx.arc(cx2, REELY, q, 0, 6.283); ctx.stroke(); } }
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.lineCap = 'round'; for(const [cx2, rr2, sg] of [[lx, rL, -1], [rx, rR, 1]]){ for(let q=0;q<3;q++){ const a0 = -rot*(sg < 0 ? 1 : .9) + q*2.1; ctx.beginPath(); ctx.arc(cx2, REELY, rr2 + 9 + q*3, a0, a0 + .5); ctx.stroke(); } }
    shadow(true, 8, 3); { const th2 = TH(); for(const [cx2, rr2, a2] of [[lx, rL, -rot], [rx, rR, -rot*.9]]){ th2.vinyl.forEach((c2, q) => { ctx.strokeStyle = c2; ctx.lineWidth = Math.max(3, (rr2 - hubR)*.22); ctx.beginPath(); ctx.arc(cx2, REELY, hubR + (rr2 - hubR)*.55, a2 + q*2.1, a2 + q*2.1 + 1.6); ctx.stroke(); }); } hub(lx, REELY, hubR, -rot, th2.hub[0]); hub(rx, REELY, hubR, -rot*.9, th2.hub[1]); } shadow(false);
    ctx.textAlign = 'center'; ctx.font = `10px ${FONT}`; ctx.fillStyle = 'rgba(28,27,25,.6)'; ctx.fillText(`FACE ${tr.face} · ${tr.name.toUpperCase()} · ${Math.round(prog*100)} %`, W/2, REELY + REELR + 24);
    // bande
    if(trance >= 3){ ctx.fillStyle = 'rgba(215,38,61,.55)'; ctx.fillRect(-4, Y0 - 3, W + 8, TT); ctx.fillStyle = 'rgba(61,220,255,.45)'; ctx.fillRect(4, Y0 + 3, W, TT); }
    shadow(true, 18, 8); ctx.fillStyle = INK; ctx.fillRect(0, Y0, W, TT); shadow(false);
    for(let b=Math.floor(beatNow) - 2; b<beatNow + W/PPB + 2; b++){ const x = xOf(b), barLine = ((b % 4) + 4) % 4 === 0, pulse = Math.max(0, 1 - Math.abs(beatNow - b)*3);
      ctx.fillStyle = barLine ? RED : '#f2c21b'; const hh = (barLine ? 14 : 9) + pulse*8; ctx.fillRect(x - (barLine ? 2 : 1), Y0 + TT/2 - hh/2, barLine ? 4 : 2, hh); }
    // tête de lecture
    shadow(true, 10, 4); ctx.fillStyle = RED; rrect(HXs - 11, Y0 + TT + 2, 22, 20 + ek*5, 5); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = RED; ctx.fillRect(HXs - 2, Y0 + 2, 4, TT);
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
      if((o.k === 'C' || o.k === 'J') && bd < 1.6 && bd > -.15){ const r = (o.shape === 'tall' || o.shape === 'wide' ? 36 : 22) + Math.max(0, bd)*70, a = Math.min(1, (1.6 - bd)*1.2);
        ctx.strokeStyle = o.bomb ? `rgba(215,38,61,${a})` : o.k === 'J' ? `rgba(28,27,25,${a})` : `rgba(244,240,230,${a})`; ctx.lineWidth = 3 + (bd < .25 ? 2 : 0); ctx.setLineDash([10, 6]); ctx.lineDashOffset = -beatNow*20; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
      drawObj(o, x, y, dance);
      if((o.k === 'C' || o.k === 'J') && state === 'play') drawCue(o, x, y);
      if((o.k === 'C' || o.k === 'J') && bd < .7 && bd > -.1){ const a2 = 1 - bd/.7; ctx.strokeStyle = `rgba(28,27,25,${a2})`; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; const top = o.shape === 'tall' ? 32 : 18; for(let q=0;q<3;q++){ const an = -1.1 + q*.45; ctx.beginPath(); ctx.moveTo(x + Math.cos(an)*(top + 4), y + Math.sin(an)*(top + 4)); ctx.lineTo(x + Math.cos(an)*(top + 11 + a2*4), y + Math.sin(an)*(top + 11 + a2*4)); ctx.stroke(); } }
    }
    // héros
    const jp = 0, popE = jumpT < .45 ? Math.exp(-jumpT*9)*(1 + Math.sin(jumpT*38)*.35) : 0; if(stretch){ stretch.t += 1/60; if(stretch.t > .4) stretch = null; }
    // la petite roue grossit avec les notes avalées (et gonfle à chaque bouchée)
    gulp = Math.max(0, gulp - 1/60*3.5); const hs = 1 + Math.min(notesRun, 30)*.012 + gulp*.35;
    let mo = 0; for(const o of objs){ if(o.done || (o.k !== 'N' && o.k !== 'A')) continue; const db = o.beat - beatNow; if(db > -.05 && db < .8){ mo = Math.max(mo, 1 - Math.max(0, db)/.8); } if(db > .8) break; }
    const hy = Y0 - 14*hs - jp*70 - (jp ? 0 : ek*4), sq = jp ? 1 : 1 + ek*.15;
    if(!(hurtT > 0 && Math.floor(rt*18) % 2)){
      ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(HXs, Y0 - 1, 13*hs*(1 - jp*.5), 3, 0, 0, 6.283); ctx.fill();
      if(popE > .05){ ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.lineCap = 'round'; const R0 = 18*hs + (1 - popE)*16; for(let q=0;q<10;q++){ const a = q/10*6.283; ctx.beginPath(); ctx.moveTo(HXs + Math.cos(a)*R0, hy + Math.sin(a)*R0); ctx.lineTo(HXs + Math.cos(a)*(R0 + 8*popE + 4), hy + Math.sin(a)*(R0 + 8*popE + 4)); ctx.stroke(); } }
      ctx.save(); ctx.translate(HXs, hy);
      if(stretch){ const e = Math.exp(-stretch.t*10)*Math.cos(stretch.t*26); ctx.rotate(stretch.a); ctx.scale(1 + .7*e, 1 - .35*e); ctx.rotate(-stretch.a); }
      ctx.scale(hs/sq*(1 + popE*.6), hs*sq*(1 + popE*.6));
      ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; for(let q=0;q<3;q++){ const yy = -7 + q*7, l = 8 + ((q + Math.floor(rot*3)) % 2)*5; ctx.beginPath(); ctx.moveTo(-20 - l, yy); ctx.lineTo(-19, yy); ctx.stroke(); }
      shadow(true, 8, 4); hub(0, 0, 14, rot*2, '#f2c21b'); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 14.5, 0, 6.283); ctx.stroke();
      ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
      if(hurtT > 0){ for(const ex of [-3, 4]){ ctx.beginPath(); ctx.moveTo(ex - 2, -5); ctx.lineTo(ex + 2, -1); ctx.moveTo(ex + 2, -5); ctx.lineTo(ex - 2, -1); ctx.stroke(); } }
      else if(trance >= 3){ ctx.fillStyle = LABELRED; for(const ex of [-3, 4]){ ctx.beginPath(); for(let i=0;i<10;i++){ const a = i*Math.PI/5 - Math.PI/2, rr = i % 2 ? 1.2 : 3; ctx.lineTo(ex + Math.cos(a)*rr, -3 + Math.sin(a)*rr); } ctx.fill(); } }
      else if(trance >= 1){ for(const ex of [-3, 4]){ ctx.beginPath(); ctx.arc(ex, -2, 2.2, Math.PI*1.1, Math.PI*1.9); ctx.stroke(); } ctx.beginPath(); ctx.arc(.5, 2, 3, .2, Math.PI - .2); ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(4, -3, 2.2, 0, 6.283); ctx.arc(-3, -3, 2.2, 0, 6.283); ctx.fill(); }
      // la bouche s'ouvre quand une note arrive, et mâche après la bouchée
      { const m = Math.max(mo, gulp > .4 ? Math.abs(Math.sin(gulp*18))*.6 : 0); if(m > .08){ ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(0, 4); ctx.arc(0, 4, 12, -.6*m, .6*m); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff6fa0'; ctx.beginPath(); ctx.arc(7, 4, 2.6*m, 0, 6.283); ctx.fill(); } }
      if(holdState || scratchState){ ctx.strokeStyle = RED; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 19 + ek*4, 0, 6.283); ctx.stroke(); }
      ctx.restore();
    }
    for(const sw of swallows){ sw.t += 1/60; const p = Math.min(1, sw.t/.16), e = p*p, x = sw.x + (HXs + 8*hs - sw.x)*e, y = sw.y + (hy + 4 - sw.y)*e, sc = 1 - p*.75;
      ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate(p*3); ctx.fillStyle = sw.gold ? '#ffd23f' : INK; ctx.beginPath(); ctx.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); ctx.fill(); ctx.fillRect(1.5, -12, 3, 18); ctx.restore();
      if(p >= 1 && !sw.done){ sw.done = true; gulp = 1; } }
    swallows = swallows.filter(sw => !sw.done);
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
    if(rate < .995 && state === 'play'){ const k = (1 - rate)/(1 - SLOW); ctx.fillStyle = `rgba(110,80,40,${.22*k})`; ctx.fillRect(0, 0, W, H);
      ctx.save(); ctx.translate(W/2, 98); ctx.textAlign = 'center'; ctx.font = `14px ${FONT}`; ctx.fillStyle = TH().text; ctx.globalAlpha = .6 + .4*Math.abs(Math.sin(rt*3)); ctx.fillText('◀◀ BANDE RALENTIE x' + rate.toFixed(2), 0, 0); ctx.globalAlpha = 1;
      if(slowed){ const w = 120; ctx.fillStyle = 'rgba(28,27,25,.25)'; ctx.fillRect(-w/2, 8, w, 6); ctx.fillStyle = RED; ctx.fillRect(-w/2, 8, w*recHits/REC, 6); }
      ctx.restore(); }

    // interface
    const th = TH(); if(!hudSplat || hudSplat.for !== th){ hudSplat = makeHudSplat(th.hud); hudSplat.for = th; }
    { const z = 1 + ek*.04; ctx.drawImage(hudSplat, -8, -6, 150*z, 120*z); ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(hudSplat, -8, -6, 150*z, 120*z); ctx.restore(); }
    ctx.textAlign = 'left'; ctx.fillStyle = th.hudInk; ctx.font = `${Math.min(30, 30*96/Math.max(96, String(score).length*20)) + bump*6 + ek*2}px ${FONT}`; ctx.fillText(score, 18, 46);
    ctx.font = `16px ${FONT}`; ctx.fillStyle = th.hudInk; ctx.fillText(`♪ ${notesRun}`, 20, 70);
    { const pc = rhythmPct(), nd = pc == null ? 0 : diff.disc.filter(x => pc >= x).length; ctx.textAlign = 'right'; ctx.font = `${26 + ek*2}px ${FONT}`; ctx.fillStyle = pc == null ? th.hudInk + '88' : nd >= 2 && th.hudInk === INK ? RED : th.hudInk; ctx.fillText((pc == null ? '--' : pc) + '%', W - 16, 40);
      ctx.font = `13px ${FONT}`; for(let i=0;i<3;i++){ ctx.fillStyle = i < nd ? th.hudInk : 'rgba(0,0,0,0)'; ctx.beginPath(); ctx.arc(W - 24 - (2 - i)*20, 60, 8, 0, 6.283); ctx.fill(); ctx.strokeStyle = th.hudInk; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = i < nd ? th.hud : 'rgba(0,0,0,0)'; ctx.beginPath(); ctx.arc(W - 24 - (2 - i)*20, 60, 2.5, 0, 6.283); ctx.fill(); } ctx.textAlign = 'left'; }
    if(combo > 2){ ctx.textAlign = 'right'; ctx.fillStyle = th.text; ctx.font = `${15 + Math.min(combo, 60)/4 + ek*3}px ${FONT}`; ctx.fillText(combo + 'x', W - 16, 104);
      if(trance){ ctx.font = `${11 + ek*3}px ${FONT}`; ctx.fillStyle = RED; ctx.fillText(TNAME[trance] + ' · x' + TMULT[trance], W - 16, 122); } }
    if(state === 'play' && isListen(bar)){ ctx.textAlign = 'center'; ctx.font = `14px ${FONT}`; ctx.fillStyle = th.text; ctx.globalAlpha = .45 + ek*.55; ctx.fillText('ÉCOUTE', W/2, Y0 - 112); ctx.globalAlpha = 1; }
    if(state === 'play' && beatNow < 4){ const n = 4 - Math.floor(Math.max(0, beatNow)); ctx.textAlign = 'center'; ctx.font = `${44 + ek*14}px ${FONT}`; ctx.fillStyle = th.text; ctx.fillText(n > 1 ? n - 1 : 'GO', W/2, Y0 - 100); }
    for(const j of judges){
      const k = j.t/(j.big ? 1.5 : .6), s = j.t < .08 ? .6 + j.t/.08*.6 : 1.2 - Math.min(.2, (j.t - .08)*2);
      ctx.save(); ctx.translate(Math.max(58, Math.min(W - 58, j.x)), j.y - j.t*30); ctx.scale(s, s); ctx.globalAlpha = 1 - k*k; ctx.textAlign = 'center';
      if(j.rot == null) j.rot = (Math.random() - .5)*.3; ctx.rotate(j.rot);
      const jc = j.g === 'miss' ? RED : j.g === 'perfect' ? '#f2c21b' : j.big ? RED : INK;
      if(j.g === 'miss' && !j.big){ ctx.fillStyle = 'rgba(215,38,61,.85)'; for(let q=0;q<9;q++){ const a = q*.7 + j.rot*9, d = 14 + (q % 3)*7; ctx.beginPath(); ctx.arc(Math.cos(a)*d*1.6, -6 + Math.sin(a)*d*.7, 2 + (q % 3), 0, 6.283); ctx.fill(); } ctx.fillRect(-3, 0, 4, 14 + j.t*30); }
      ctx.font = `${j.big ? 26 : j.g === 'perfect' ? 21 : 17}px ${FONT}`; if(j.big){ const w = ctx.measureText(j.txt).width; if(w > W - 40) ctx.font = `${26*(W - 40)/w}px ${FONT}`; } ctx.lineJoin = 'round';
      ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.strokeText(j.txt, 2, 3); ctx.lineWidth = 6; ctx.strokeStyle = jc === INK ? PAPER : jc; ctx.strokeText(j.txt, 0, 0);
      ctx.fillStyle = jc === INK ? INK : '#fff'; ctx.fillText(j.txt, 0, 0);
      if(j.sub){ ctx.font = '600 13px "Chakra Petch", sans-serif'; ctx.fillStyle = INK; ctx.fillText(j.sub, 0, 22); }
      ctx.restore();
    }
    if(state === 'tuto') drawTuto(rt);
    if(holdHint && holdState){ ctx.textAlign = 'center'; ctx.font = `16px ${FONT}`; ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.strokeText('GARDE APPUYÉ…', W/2, H*.14); ctx.fillStyle = PAPER; ctx.fillText('GARDE APPUYÉ…', W/2, H*.14); } else holdHint = 0;
  }

  const stopBtn = document.createElement('button');
  stopBtn.textContent = '■'; stopBtn.setAttribute('aria-label', 'Retour aux cassettes');
  stopBtn.style.cssText = `position:absolute;top:12px;left:50%;transform:translateX(-50%);width:50px;height:44px;border:3px solid #fff;border-radius:12px;background:${INK};color:#fff;font-size:18px;z-index:3;cursor:pointer;box-shadow:0 0 0 3px ${INK},0 4px 0 3px ${INK}`;
  stage.appendChild(stopBtn);
  stopBtn.onclick = () => { if(holdState){ if(holdState.voice) holdState.voice.stop(); holdState = null; } if(useAudio && music) music.gain.setValueAtTime(0, actx.currentTime); if(state === 'play' && notesRun){ api.save('notes', bank() + notesRun); notesRun = 0; } state = 'menu'; showMenu(); };
  /* ---------- menu des cassettes ---------- */
  /* ---------- mur street art pour le menu ---------- */
  const SPRAY = ['#ff3d7f', '#ffd23f', '#29c4ff', '#7cf05a', '#ff8a2a', '#b06bff'];
  function splat(g, r, x, y, rad, col, drips){
    const al = col.length > 7 ? parseInt(col.slice(7), 16)/255 : 1; col = col.slice(0, 7); g.save(); g.globalAlpha = al;
    const gr = g.createRadialGradient(x, y, rad*.1, x, y, rad); gr.addColorStop(0, col); gr.addColorStop(.55, col); gr.addColorStop(1, col + '00');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 6.283); g.fill();
    g.fillStyle = col; for(let i=0;i<120;i++){ const a = r()*6.283, d = rad*(.7 + r()*.9); g.globalAlpha = (.3 + r()*.6)*al; g.beginPath(); g.arc(x + Math.cos(a)*d, y + Math.sin(a)*d, r()*1.6, 0, 6.283); g.fill(); } g.globalAlpha = al;
    for(let i=0;i<(drips || 0);i++){ const dx = x + (r() - .5)*rad*1.1, top = y + rad*.4, len = 20 + r()*rad*2.2, w = 2 + r()*3; g.fillStyle = col; g.fillRect(dx - w/2, top, w, len); g.beginPath(); g.arc(dx, top + len, w*.9, 0, 6.283); g.fill(); }
    g.restore();
  }
  function tag(g, r, x, y, s, col){
    g.save(); g.translate(x, y); g.rotate((r() - .5)*.4); g.strokeStyle = col; g.lineWidth = 3.5*s; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); let px = 0, py = 0; g.moveTo(0, 0);
    for(let i=0;i<9;i++){ const nx = px + (12 + r()*16)*s, ny = (r() - .5)*30*s; g.bezierCurveTo(px + 6*s, py - 26*s*r(), nx - 8*s, ny + 26*s*r(), nx, ny); px = nx; py = ny; } g.stroke();
    g.beginPath(); g.moveTo(-6*s, 18*s); g.quadraticCurveTo(px/2, 30*s, px + 10*s, 12*s); g.stroke();
    g.fillStyle = col; g.beginPath(); g.moveTo(px + 6*s, -24*s); g.lineTo(px + 10*s, -36*s); g.lineTo(px + 15*s, -26*s); g.lineTo(px + 21*s, -38*s); g.lineTo(px + 24*s, -24*s); g.closePath(); g.fill();
    g.restore();
  }
  function poster(g, r, x, y, w, h, col){
    g.save(); g.translate(x, y); g.rotate((r() - .5)*.12);
    g.fillStyle = '#efe6d0'; g.beginPath(); g.moveTo(0, 0); for(let i=0;i<=10;i++) g.lineTo(w*i/10, (r() - .5)*6); for(let i=0;i<=8;i++) g.lineTo(w + (r() - .5)*6, h*i/8); for(let i=10;i>=0;i--) g.lineTo(w*i/10, h + (r() - .5)*8); for(let i=8;i>=0;i--) g.lineTo((r() - .5)*6, h*i/8); g.closePath(); g.fill();
    g.save(); g.clip(); g.fillStyle = col; for(let yy=8; yy<h*.62; yy+=7) for(let xx=8; xx<w - 4; xx+=7){ const rr = 2.6*(1 - yy/(h*.7))*(.6 + .4*Math.sin(xx*.05)); if(rr > .3){ g.beginPath(); g.arc(xx, yy, rr, 0, 6.283); g.fill(); } }
      g.fillStyle = INK; g.fillRect(8, h*.7, w*.75, h*.08); g.fillRect(8, h*.82, w*.5, h*.05); g.restore();
    g.fillStyle = 'rgba(232,217,168,.85)'; g.fillRect(-8, -6, 30, 12); g.fillRect(w - 22, -6, 30, 12);
    g.restore();
  }
  // giclée nette : une tache aux bords piquants, des gouttes autour, des coulures
  function crisp(g, r, x, y, R, col, drips){
    g.save(); g.fillStyle = col; g.beginPath(); const n = 22;
    for(let i=0;i<=n;i++){ const a = i/n*6.283, sp = i % 3 === 0 ? 1.15 + r()*.35 : .78 + r()*.2, rr = R*sp; const px = x + Math.cos(a)*rr, py = y + Math.sin(a)*rr*.9; i ? g.lineTo(px, py) : g.moveTo(px, py); }
    g.closePath(); g.fill();
    for(let i=0;i<14;i++){ const a = r()*6.283, d = R*(1.15 + r()*.7), rr = 1 + r()*R*.09; g.beginPath(); g.arc(x + Math.cos(a)*d, y + Math.sin(a)*d*.9, rr, 0, 6.283); g.fill(); }
    for(let i=0;i<(drips || 0);i++){ const dx = x + (r() - .5)*R*1.2, top = y + R*.3, len = 18 + r()*R*1.4, w = 3 + r()*4; g.fillRect(dx - w/2, top, w, len); g.beginPath(); g.arc(dx, top + len, w*.85, 0, 6.283); g.fill(); }
    g.restore();
  }
  function makeWall(w, h){
    const c = document.createElement('canvas'), sc = 2; c.width = w*sc; c.height = h*sc; const g = c.getContext('2d'); g.scale(sc, sc); const r = rngFrom('mur-k7');
    const COLS = ['#ff3d7f', '#29c4ff', '#ffd23f'];
    g.fillStyle = '#ede5d3'; g.fillRect(0, 0, w, h);
    // vieilles affiches délavées
    for(let i=0;i<8;i++){ g.save(); g.globalAlpha = .3; poster(g, r, r()*w - 40, r()*h - 30, 80 + r()*120, 90 + r()*110, SPRAY[i % SPRAY.length]); g.restore(); }
    grain(g, w, h, w*h/18, true);
    // trames de points
    const dots = (x, y, R, col) => { g.fillStyle = col; for(let yy=-R; yy<R; yy+=7) for(let xx=-R; xx<R; xx+=7){ const d = Math.hypot(xx, yy)/R; if(d < 1){ g.beginPath(); g.arc(x + xx, y + yy, 2.6*(1 - d), 0, 6.283); g.fill(); } } };
    for(let i=0;i<8;i++) dots(r()*w, r()*h, 40 + r()*50, i % 3 ? COLS[i % 3] : INK);
    // grosses giclées rose / cyan / jaune
    for(let i=0;i<10;i++){ g.globalAlpha = .85; crisp(g, r, r()*w, r()*h, 22 + r()*45, COLS[i % 3], 1 + Math.floor(r()*4)); g.globalAlpha = 1; }
    // coups de pinceau noirs
    for(let i=0;i<6;i++){ const x = r()*w, y = r()*h, a = (r() - .5)*1.2, l = 50 + r()*90; brush(g, r, x, y, x + Math.cos(a)*l, y + Math.sin(a)*l, 10 + r()*12, .85); }
    // couronnes, étoiles, zigzags, notes
    const crown = (x, y, s, col) => { g.save(); g.translate(x, y); g.rotate((r() - .5)*.6); g.strokeStyle = col; g.lineWidth = 3; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-s, s*.5); g.lineTo(-s, -s*.3); g.lineTo(-s*.5, s*.1); g.lineTo(0, -s*.6); g.lineTo(s*.5, s*.1); g.lineTo(s, -s*.3); g.lineTo(s, s*.5); g.closePath(); g.stroke(); g.restore(); };
    const star = (x, y, s, col) => { g.fillStyle = col; g.beginPath(); for(let i=0;i<10;i++){ const a = i*Math.PI/5 - Math.PI/2, rr = i % 2 ? s*.42 : s; g.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr); } g.closePath(); g.fill(); };
    for(let i=0;i<6;i++) crown(r()*w, r()*h, 12 + r()*14, i % 2 ? INK : COLS[i % 3]);
    for(let i=0;i<14;i++) star(r()*w, r()*h, 4 + r()*7, INK);
    for(let i=0;i<4;i++){ const x = r()*w, y = r()*h; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); for(let k=0;k<5;k++) g.lineTo(x + k*9, y + (k % 2 ? -10 : 0)); g.stroke(); }
    scratches(g, r, w, h, 18);
    return c;
  }
  const GRAF = '"Sedgwick Ave Display", "Permanent Marker", ' + FONT, MARKER = '"Permanent Marker", "Chakra Petch", sans-serif';
  /* ---------- la cassette mascotte : yeux-bobines, gants, baskets ---------- */
  function rrp(g, x, y, w, h, r){ g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function glove(g, x, y, rot, kind){
    g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = 4; g.lineJoin = 'round';
    if(kind === 'peace'){ for(const a of [-.28, .22]){ g.save(); g.rotate(a); rrp(g, -6, -36, 12, 30, 6); g.fill(); g.stroke(); g.restore(); } }
    g.beginPath(); g.ellipse(0, 0, 17, 15, 0, 0, 6.283); g.fill(); g.stroke();
    if(kind === 'peace'){ g.beginPath(); g.ellipse(-11, 2, 6, 9, -.6, 0, 6.283); g.fill(); g.stroke(); }
    else { g.lineWidth = 2.5; for(const yy of [-5, 2, 9]){ g.beginPath(); g.moveTo(4, yy); g.lineTo(13, yy - 1); g.stroke(); } }
    g.fillStyle = '#fff'; g.lineWidth = 4; rrp(g, -11, 12, 22, 9, 3); g.fill(); g.stroke();
    g.restore();
  }
  function sneaker(g, x, y, s, col){
    g.save(); g.translate(x, y); g.scale(s, 1); g.strokeStyle = INK; g.lineWidth = 4; g.lineJoin = 'round';
    g.fillStyle = col; g.beginPath(); g.moveTo(-16, 2); g.quadraticCurveTo(-16, -16, 0, -16); g.quadraticCurveTo(14, -15, 22, -4); g.quadraticCurveTo(34, -2, 34, 6); g.lineTo(-16, 6); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#fff'; rrp(g, -19, 3, 56, 10, 5); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(22, -4); g.quadraticCurveTo(33, -2, 34, 5); g.lineTo(22, 5); g.closePath(); g.fill(); g.stroke();
    g.lineWidth = 2.5; for(const xx of [2, 9]){ g.beginPath(); g.moveTo(xx - 3, -13); g.lineTo(xx + 3, -6); g.stroke(); }
    g.restore();
  }
  function mascot(g, t, idx, open, sel, time, look){
    const col = open ? SPRAY[idx % SPRAY.length] : '#a39d92', beat = time*104/60*Math.PI, bob = sel ? Math.abs(Math.sin(beat))*9 : Math.abs(Math.sin(beat))*3;
    // ombre au sol
    g.fillStyle = 'rgba(28,27,25,.3)'; g.beginPath(); g.ellipse(0, 166, 128 - bob*2, 11, 0, 0, 6.283); g.fill();
    // jambes et baskets qui battent la mesure
    const step = sel && open ? Math.sin(beat) : 0;
    for(const s of [-1, 1]){ const lift = Math.max(0, s*step)*12; g.strokeStyle = INK; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(s*55, 88 - bob); g.quadraticCurveTo(s*62, 120, s*66, 146 - lift); g.stroke(); sneaker(g, s*66 - (s > 0 ? 0 : 10), 150 - lift, s, open ? LABELRED : '#8b857b'); }
    g.save(); g.translate(0, -bob); g.rotate(sel ? Math.sin(beat)*.025 : 0);
    // bras : un poing à gauche, un « peace » qui salue à droite
    const wave = open ? Math.sin(time*6)*.3 : 0;
    g.strokeStyle = INK; g.lineWidth = 8; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-146, 10); g.quadraticCurveTo(-172, 20, -176, 48); g.stroke(); glove(g, -176, 56, .2, 'fist');
    const hx = open ? 186 + wave*14 : 176, hy = open ? -72 : 40;
    g.beginPath(); g.moveTo(146, -8); g.quadraticCurveTo(178, open ? -20 : 20, hx, hy + (open ? 14 : -10)); g.stroke(); glove(g, hx, hy, open ? .15 + wave*.5 : -.2, open ? 'peace' : 'fist');
    // le boîtier
    g.fillStyle = '#3b3835'; g.strokeStyle = INK; g.lineWidth = 7; rrp(g, -152, -96, 304, 192, 22); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.08)'; rrp(g, -146, -90, 292, 22, 14); g.fill();
    for(const [sx, sy] of [[-136, -80], [136, -80], [-136, 80], [136, 80]]){ g.fillStyle = '#d8d2c6'; g.beginPath(); g.arc(sx, sy, 7, 0, 6.283); g.fill(); g.lineWidth = 2.5; g.stroke(); g.beginPath(); g.moveTo(sx - 4, sy - 4); g.lineTo(sx + 4, sy + 4); g.moveTo(sx + 4, sy - 4); g.lineTo(sx - 4, sy + 4); g.stroke(); }
    // étiquette de couleur, un peu usée
    g.save(); rrp(g, -126, -80, 252, 118, 10); g.clip(); g.fillStyle = col; g.fillRect(-126, -80, 252, 118);
    g.fillStyle = 'rgba(255,255,255,.35)'; for(let i=0;i<5;i++) g.fillRect(-126, -24 + i*7, 252, 2);
    g.fillStyle = 'rgba(28,27,25,.18)'; for(let i=0;i<40;i++){ const a = (i*97 % 360)/57.3, d = (i*53 % 120); g.beginPath(); g.arc(Math.cos(a)*d, -20 + Math.sin(a)*d*.5, (i % 3) + 1, 0, 6.283); g.fill(); }
    g.restore(); g.lineWidth = 4; g.strokeStyle = INK; rrp(g, -126, -80, 252, 118, 10); g.stroke();
    g.font = `30px ${GRAF}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 7; g.strokeStyle = INK; g.strokeText('FACE ' + t.face, 0, -52); g.fillStyle = '#fff'; g.fillText('FACE ' + t.face, 0, -52);
    // la fenêtre et les yeux-bobines
    g.fillStyle = PAPER; rrp(g, -100, -30, 200, 68, 16); g.fill(); g.lineWidth = 5; g.stroke();
    const blink = ((time + idx*1.7) % 3.6) < .13;
    for(const s of [-1, 1]){
      const ex = s*48, ey = 4;
      g.fillStyle = '#fff'; g.beginPath(); g.arc(ex, ey, 27, 0, 6.283); g.fill(); g.lineWidth = 4.5; g.stroke();
      // dents de bobine qui tournent
      g.save(); g.translate(ex, ey); g.rotate(time*(sel && open ? 3 : .6)); g.fillStyle = INK; for(let k=0;k<6;k++){ g.rotate(1.047); g.fillRect(-2.5, -26, 5, 6); } g.restore();
      if(!open){ g.lineWidth = 5; g.beginPath(); g.arc(ex, ey + 2, 12, .2, Math.PI - .2); g.stroke(); continue; }
      if(blink){ g.lineWidth = 5; g.beginPath(); g.moveTo(ex - 14, ey); g.quadraticCurveTo(ex, ey + 8, ex + 14, ey); g.stroke(); continue; }
      const px = ex + look.x*7, py = ey + look.y*5;
      g.fillStyle = INK; g.beginPath(); g.arc(px, py, sel ? 14 : 12, 0, 6.283); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(px - 5, py - 5, 5, 0, 6.283); g.fill(); g.beginPath(); g.arc(px + 5, py + 4, 2.2, 0, 6.283); g.fill();
    }
    // joues et bouche
    if(open){ g.fillStyle = '#ffd23f'; for(const s of [-1, 1]){ g.beginPath(); g.ellipse(s*84, 26, 9, 6, 0, 0, 6.283); g.fill(); } }
    g.strokeStyle = INK; g.lineWidth = 4;
    if(open){ const m = sel ? 1 : .7; g.fillStyle = INK; g.beginPath(); g.moveTo(-12*m, 14); g.quadraticCurveTo(0, 36*m, 12*m, 14); g.closePath(); g.fill(); g.fillStyle = '#ff6fa0'; g.beginPath(); g.ellipse(0, 14 + 15*m, 6*m, 4*m, 0, 0, 6.283); g.fill(); }
    else { g.beginPath(); g.moveTo(-9, 26); g.quadraticCurveTo(-4, 22, 0, 26); g.quadraticCurveTo(4, 30, 9, 26); g.stroke(); }
    // l'étiquette du bas avec le nom
    g.fillStyle = INK; g.beginPath(); g.moveTo(-80, 46); g.lineTo(80, 46); g.lineTo(94, 94); g.lineTo(-94, 94); g.closePath(); g.fill();
    g.font = `25px ${MARKER}`; g.fillStyle = '#fff'; g.fillText(t.name.toUpperCase(), 0, 68);
    g.strokeStyle = '#ffd23f'; g.lineWidth = 3.5; g.beginPath(); g.moveTo(-40, 84); g.quadraticCurveTo(0, 79, 46, 83); g.stroke();
    // verrou
    if(!open){ g.fillStyle = LABELRED; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(0, -8, 20, Math.PI, 0); g.stroke(); rrp(g, -28, -10, 56, 44, 9); g.fill(); g.stroke(); g.fillStyle = PAPER; g.beginPath(); g.arc(0, 6, 6, 0, 6.283); g.fill(); g.fillRect(-2.5, 8, 5, 12);
      g.font = `20px ${MARKER}`; g.fillStyle = INK; g.fillText('z', 110, -112); g.font = `14px ${MARKER}`; g.fillText('z', 126, -128); }
    g.restore();
  }
  // « TOUCHE ! » en gros graffiti jaune
  function drawTouche(g, x, y, t, maxW){
    g.font = `56px ${GRAF}`; const size = Math.min(56, 56*maxW/(g.measureText('TOUCHE !').width + 14)), wob = Math.sin(t*5)*.03;
    g.save(); g.translate(x, y); g.rotate(-.09 + wob); g.scale(1 + Math.sin(t*6)*.03, 1 + Math.sin(t*6)*.03);
    g.font = `${size}px ${GRAF}`; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.lineJoin = 'round';
    for(let e=7;e>0;e--){ g.fillStyle = INK; g.fillText('TOUCHE !', e*.8, e); }
    g.lineWidth = size*.2; g.strokeStyle = INK; g.strokeText('TOUCHE !', 0, 0);
    const gr = g.createLinearGradient(0, -size*.8, 0, 0); gr.addColorStop(0, '#fff07a'); gr.addColorStop(1, '#ffc21f'); g.fillStyle = gr; g.fillText('TOUCHE !', 0, 0);
    g.lineWidth = 2; g.strokeStyle = 'rgba(255,255,255,.9)'; g.strokeText('TOUCHE !', -1.5, -1.5);
    // bande de pinceau noire
    g.rotate(.03); g.font = `17px ${MARKER}`; const fs = Math.min(17, 17*(maxW - 20)/g.measureText('POUR LANCER LA CASSETTE').width); g.font = `${fs}px ${MARKER}`; const bw = g.measureText('POUR LANCER LA CASSETTE').width + 22, n = 12;
    g.fillStyle = INK; g.beginPath(); g.moveTo(-4, 14); for(let i=0;i<=n;i++) g.lineTo(i*bw/n, 12 + (i % 2 ? -3 : 2)); g.lineTo(bw + 4, 26 + fs*.6); for(let i=n;i>=0;i--) g.lineTo(i*bw/n, 18 + fs*1.4 + (i % 2 ? 3 : -2)); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.fillText('POUR LANCER LA CASSETTE', 10, 16 + fs*1.15);
    g.restore();
  }
  function graffiti(g, txt, x, y, size, t, k, pop){
    g.save(); g.font = `${size}px ${GRAF}`; g.textBaseline = 'alphabetic'; let cx = x; const ws = [...txt].map(ch => g.measureText(ch).width + size*.02);
    [...txt].forEach((ch, i) => {
      const w = ws[i], jy = Math.sin(t*4 - i*.8)*3 - (i % 2 ? k*3 : 0), rot = Math.sin(t*2.4 + i*1.3)*.07 - .06, ps = pop ? pop(i) : 1;
      if(ps <= 0){ cx += w; return; }
      g.save(); g.translate(cx + w/2, y + jy - (ps - 1)*size*.4); g.rotate(rot + (ps - 1)*.3); g.scale(ps, ps);
      for(let e=7;e>0;e--){ g.fillStyle = INK; g.fillText(ch, -w/2 + e, e); }
      g.lineJoin = 'round'; g.lineWidth = size*.16; g.strokeStyle = INK; g.strokeText(ch, -w/2, 0);
      const gr = g.createLinearGradient(0, -size*.8, 0, 0); const pair = i < 2 ? ['#ff3d7f', '#ffd23f'] : ['#29c4ff', '#7cf05a']; gr.addColorStop(0, pair[0]); gr.addColorStop(1, pair[1]); g.fillStyle = gr; g.fillText(ch, -w/2, 0);
      g.lineWidth = 2; g.strokeStyle = 'rgba(255,255,255,.85)'; g.strokeText(ch, -w/2 - 1.5, -1.5);
      if(ch !== ' '){ const dl = (t*14 + i*23) % 60; g.fillStyle = pair[1]; g.strokeStyle = INK; g.lineWidth = 2; const dx = -w*.1 + (i % 3)*w*.2; g.beginPath(); g.roundRect ? g.roundRect(dx - 3, -4, 6, 8 + dl*.6, 3) : g.rect(dx - 3, -4, 6, 8 + dl*.6); g.fill(); g.stroke(); }
      g.restore(); cx += w;
    });
    for(let i=0;i<3;i++){ const ph = (t*1.3 + i*.37) % 1, sx = x + (cx - x)*(.15 + i*.35), sy = y - size*.85 + i*8, s = Math.sin(ph*Math.PI)*9; g.fillStyle = PAPER; g.beginPath(); g.moveTo(sx, sy - s); g.lineTo(sx + s*.25, sy - s*.25); g.lineTo(sx + s, sy); g.lineTo(sx + s*.25, sy + s*.25); g.lineTo(sx, sy + s); g.lineTo(sx - s*.25, sy + s*.25); g.lineTo(sx - s, sy); g.lineTo(sx - s*.25, sy - s*.25); g.closePath(); g.fill(); }
    g.restore(); return cx - x;
  }

  /* ---------- menu cartoon : scène animée, cassettes qui suivent le doigt ---------- */
  if(!document.getElementById('k7-menu-css')){ const st = document.createElement('style'); st.id = 'k7-menu-css'; st.textContent = `
    .k7m{position:absolute;inset:0;z-index:4;overflow:hidden;font-family:"Chakra Petch",sans-serif;color:${INK};touch-action:none;user-select:none;-webkit-user-select:none}
    .k7m canvas{position:absolute;inset:0;width:100%;height:100%}
    .k7m .ui{position:absolute;left:0;right:0;display:flex;padding:0 16px;pointer-events:none}
    .k7m .ui > *{pointer-events:auto}
    .k7btn{border:3px solid ${INK};border-radius:14px;background:${PAPER};color:${INK};font-family:${MARKER};cursor:pointer;box-shadow:0 5px 0 ${INK},0 0 0 5px #fff;transition:transform .12s cubic-bezier(.3,1.6,.5,1),box-shadow .12s}
    .k7btn:active{transform:translateY(4px) scale(.97);box-shadow:0 1px 0 ${INK}}
    .k7btn:focus-visible{outline:3px solid ${LABELRED};outline-offset:3px}
    .k7play{background:#ff3d7f;color:#fff;font-family:${GRAF};font-size:38px;line-height:1;padding:8px 14px 8px 30px;border:5px solid ${INK};border-radius:999px;display:flex;align-items:center;gap:12px;animation:k7pulse 1.15s ease-in-out infinite;-webkit-text-stroke:2px ${INK};paint-order:stroke fill;text-shadow:3px 4px 0 ${INK};box-shadow:0 6px 0 ${INK},0 0 0 5px #fff,0 6px 0 5px #fff}
    .k7pi{display:grid;place-items:center;width:46px;height:40px;background:#fff;border:4px solid ${INK};border-radius:10px;-webkit-text-stroke:0;text-shadow:none}
    .k7badge{background:#ffd23f;border:4px solid ${INK};border-radius:16px;padding:6px 12px 7px;box-shadow:0 5px 0 ${INK},0 0 0 5px #fff;transform:rotate(-2deg);font-family:${MARKER};font-size:21px;line-height:1.05;color:${INK};white-space:nowrap}
    .k7badge small{display:block;font-family:"Chakra Petch",sans-serif;font-weight:700;font-size:12.5px}
    .k7sq{width:50px;height:46px;padding:0;display:grid;place-items:center;border-width:4px}
    .k7round{width:50px;height:50px;padding:0;border-radius:50%;display:grid;place-items:center;border-width:4px;box-shadow:0 0 0 5px #ffd23f,0 0 0 8px ${INK},0 5px 0 8px ${INK}}
    .k7round:active{box-shadow:0 0 0 5px #ffd23f,0 0 0 8px ${INK}}
    .k7card{position:relative;background:#f3ead7;padding:10px 18px 12px;text-align:center;max-width:330px;margin:0 auto;transform:rotate(-1.2deg);filter:drop-shadow(0 6px 0 rgba(28,27,25,.85));clip-path:polygon(0 4%,7% 0,19% 3%,33% 0,50% 3%,66% 0,81% 3%,94% 0,100% 5%,99% 35%,100% 66%,98% 96%,85% 100%,69% 97%,52% 100%,35% 97%,18% 100%,3% 97%,1% 68%,0 38%)}
    .k7card .st{position:absolute;top:14px;font-style:normal;font-size:20px}.k7card .st.l{left:22px;transform:rotate(-14deg)}.k7card .st.r{right:22px;transform:rotate(12deg)}
    .k7card .nm{display:inline-block;font-family:${MARKER};font-size:31px;line-height:1.15;padding:0 10px;background:linear-gradient(transparent 52%,#ffd23f 52%,#ffd23f 86%,transparent 86%)}
    .k7card .mt{font-size:14px;font-weight:600;padding-bottom:5px;border-bottom:2px solid ${INK};margin:0 6px 5px}
    .k7card .ss{font-family:${MARKER};font-size:17px;color:#ff3d7f}
    .k7diff{position:relative;display:inline-flex;flex-direction:column;align-items:center;background:#ffd23f;padding:7px 26px 8px 22px;transform:rotate(-2deg);clip-path:polygon(0 8%,4% 0,8% 10%,12% 0,100% 0,97% 12%,100% 25%,96% 40%,100% 55%,97% 70%,100% 85%,96% 100%,0 100%,3% 85%,0 70%,4% 55%,0 40%,3% 25%)}
    .k7diff .dn{display:flex;align-items:center;gap:6px;font-family:${MARKER};font-size:23px;line-height:1.1}.k7diff .dn span{background:#fff;padding:0 7px;transform:rotate(1deg)}
    .k7diff small{font-weight:700;font-size:12px;text-decoration:underline wavy #ff3d7f;text-underline-offset:4px}
    .k7mult{position:absolute;right:-26px;top:-16px;z-index:2;background:#ff3d7f;color:#fff;font-family:${MARKER};font-size:19px;padding:9px 9px 7px;border-radius:46% 54% 42% 58%/55% 45% 55% 45%;transform:rotate(-12deg);text-shadow:2px 2px 0 ${INK};border:3px solid ${INK}}
    @keyframes k7pulse{0%,100%{transform:scale(1) rotate(-1deg)}50%{transform:scale(1.06) rotate(1deg)}}
    .k7bubble{position:relative;background:#efe6d0;padding:12px 16px 14px;box-shadow:0 8px 14px rgba(20,15,10,.35);text-align:center;max-width:330px;margin:0 auto;transform:rotate(-1.5deg);clip-path:polygon(0 3%,8% 0,20% 2%,34% 0,50% 3%,66% 0,80% 2%,93% 0,100% 4%,99% 30%,100% 60%,98% 96%,86% 100%,70% 97%,52% 100%,35% 97%,18% 100%,4% 97%,1% 70%,0 40%)}
    .k7bubble b{font-family:${MARKER};font-weight:400}
    .k7tape{display:inline-block;background:rgba(232,217,168,.95);padding:6px 18px;transform:rotate(-2deg);clip-path:polygon(0 8%,4% 0,8% 10%,12% 0,100% 0,97% 12%,100% 25%,96% 40%,100% 55%,97% 70%,100% 85%,96% 100%,0 100%,3% 85%,0 70%,4% 55%,0 40%,3% 25%);box-shadow:0 3px 6px rgba(0,0,0,.2)}
    .k7pop{animation:k7popin .45s cubic-bezier(.2,1.6,.4,1)}
    @keyframes k7popin{from{transform:scale(.7) rotate(-3deg);opacity:0}}
    .k7sheet{position:absolute;inset:0;z-index:6;background:rgba(28,27,25,.45);display:flex;align-items:flex-end;justify-content:center}
    .k7sheet > div{width:100%;max-width:420px;background:${PAPERBG};border:3px solid ${INK};border-bottom:0;border-radius:22px 22px 0 0;padding:18px 18px 26px;display:flex;flex-direction:column;gap:12px;animation:k7up .35s cubic-bezier(.2,1.3,.4,1)}
    @keyframes k7up{from{transform:translateY(100%)}}
    @media (prefers-reduced-motion:reduce){.k7play{animation:none}.k7pop,.k7sheet > div{animation:none}}`; document.head.appendChild(st); }
  const menu = document.createElement('div'); menu.className = 'k7m'; stage.appendChild(menu);
  const mcv = document.createElement('canvas'), mdpr = Math.min(window.devicePixelRatio || 1, 2); mcv.width = W*mdpr; mcv.height = H*mdpr; menu.appendChild(mcv);
  const mx = mcv.getContext('2d'); mx.setTransform(mdpr, 0, 0, mdpr, 0, 0);
  const artCache = {}, imgCache = {};
  let cur = Math.min(TRACKS.length - 1, api.load('cur', 0)), dIdx = api.load('diff', 0);
  let mPos = cur, mVel = 0, mTarget = cur, drag = null, squash = 0, mFloat = [], mTime = 0, mOpen = false;
  for(let i=0;i<14;i++) mFloat.push({x: Math.random()*W, y: Math.random()*H, s: .6 + Math.random()*.9, v: 14 + Math.random()*22, ph: Math.random()*6});
  const menuBg = makeWall(Math.round(W) + 40, Math.round(H) + 40);
  let stackTop = H*.62, badgeLeft = W*.55, bgSplat = null;
  function layoutMenu(){ const b = menu.querySelector('.k7bottom'), tl = menu.querySelector('#k7tal'); if(!b || menu.hidden) return; const r = b.getBoundingClientRect(), m = menu.getBoundingClientRect(); if(m.height){ stackTop = (r.top - m.top)*H/m.height; badgeLeft = (tl.getBoundingClientRect().left - m.left)*W/m.width; } }
  // giclées nettes derrière la cassette, peintes une fois
  function makeBgSplat(){ const c = document.createElement('canvas'), S = 420; c.width = c.height = S*2; const g = c.getContext('2d'); g.scale(2, 2); const r = rngFrom('giclee'); crisp(g, r, S*.34, S*.55, 92, '#ff3d7f', 4); crisp(g, r, S*.7, S*.64, 74, '#29c4ff', 3); crisp(g, r, S*.6, S*.3, 54, '#ffd23f', 2); for(let i=0;i<40;i++){ g.fillStyle = INK; g.globalAlpha = .7; g.beginPath(); g.arc(r()*S, r()*S, r()*3, 0, 6.283); g.fill(); } return c; }
  window.addEventListener('resize', layoutMenu);
  const wrapI = i => ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
  function cassImg(t){ const open = unlocked(t) || discs() >= t.cost, key = t.id + (open ? 1 : 0); if(!imgCache[key]){ const im = new Image(); im.src = makeCassette(t, open); imgCache[key] = im; } return imgCache[key]; }
  const ui = {};
  menu.insertAdjacentHTML('beforeend', `
    <div class="ui" style="top:14px;justify-content:flex-end;gap:10px;align-items:flex-start">
      <button id="k7back" class="k7btn k7sq" aria-label="Mes œuvres" style="margin-right:auto;position:relative"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${INK}"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="${INK}" stroke-width="2.2"/><path d="M12 13v4M8 21h8l-1-4H9z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></svg><span class="k7dot" id="k7bdot" hidden></span></button>
      <div id="k7tal" class="k7badge"></div>
      <button id="k7gear" class="k7btn k7sq" aria-label="Réglages"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z"/><circle cx="12" cy="12" r="3.4"/></svg></button></div>
    <div class="ui k7bottom" style="bottom:22px;flex-direction:column;gap:16px;align-items:stretch">
      <div id="k7info" class="k7card"></div>
      <div style="display:flex;align-items:center;justify-content:center;gap:16px">
        <button id="k7dl" class="k7btn k7round" aria-label="Difficulté plus facile"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 3 6 10l7 7" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div id="k7diffbox" style="text-align:center"></div>
        <button id="k7dr" class="k7btn k7round" aria-label="Difficulté plus dure"><svg width="20" height="20" viewBox="0 0 20 20"><path d="m7 3 7 7-7 7" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
      <div style="display:flex;justify-content:center"><button id="k7play" class="k7btn k7play"></button></div></div>`);
  ['k7back','k7tal','k7gear','k7info','k7dl','k7dr','k7diffbox','k7play'].forEach(id => ui[id] = menu.querySelector('#' + id));

  function refreshUI(pop){
    const t = TRACKS[cur], open = unlocked(t), afford = !open && discs() >= t.cost, d = DIFFS[dIdx], bk = bests()[t.id + '.' + d.id];
    ui.k7tal.innerHTML = `◉ ${discs()} &nbsp;♪ ${bank()}<small>${titleOf(bank())}</small>`; { const bd = menu.querySelector('#k7bdot'); if(bd) bd.hidden = !api.load('artNew', false); }
    const st = open ? (bk ? `${DISC(bk.discs || 0)} · ${bk.pct || 0} % de rythme` : 'Jamais jouée à ce niveau') : afford ? 'Tu as assez de disques pour l\'ouvrir !' : `Il te faut ${t.cost} disques (tu en as ${discs()})`;
    ui.k7info.innerHTML = `<i class="st l">★</i><i class="st r">★</i><div class="nm">${t.name}</div><div class="mt">${t.label} · ${t.gestures}</div><div class="ss">${st}</div>`;
    if(pop){ ui.k7info.classList.remove('k7pop'); void ui.k7info.offsetWidth; ui.k7info.classList.add('k7pop'); }
    ui.k7diffbox.innerHTML = `<div style="position:relative;display:inline-block"><div class="k7diff"><div class="dn"><svg width="24" height="18" viewBox="0 0 24 18"><path d="M2 16V5l5 5 5-8 5 8 5-5v11z" fill="#fff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/></svg><span style="color:${dIdx >= 3 ? LABELRED : INK}">${d.name}</span></div><small>${d.note}</small></div><span class="k7mult">x${d.mult}</span></div>`;
    ui.k7play.innerHTML = open ? `JOUER<span class="k7pi"><svg width="20" height="22" viewBox="0 0 20 22"><path d="M3 2l15 9-15 9z" fill="#29c4ff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/></svg></span>` : afford ? 'OUVRIR !' : `${t.cost} ◉`;
    requestAnimationFrame(layoutMenu);
    ui.k7play.style.filter = open || afford ? '' : 'grayscale(1)';
  }
  ui.k7back.onclick = () => home.querySelector('#k7trophy').onclick();
  ui.k7dl.onclick = () => { dIdx = Math.max(0, dIdx - 1); api.save('diff', dIdx); api.sfx.click(); refreshUI(); squash = .6; };
  ui.k7dr.onclick = () => { dIdx = Math.min(DIFFS.length - 1, dIdx + 1); api.save('diff', dIdx); api.sfx.click(); refreshUI(); squash = .6; };
  ui.k7play.onclick = () => {
    const t = TRACKS[cur], open = unlocked(t), afford = !open && discs() >= t.cost;
    if(!open && !afford){ api.sfx.lose(); squash = -1; return; }
    if(!open){ api.save('unlock.' + t.id, true); api.sfx.coin(); squash = 1.2; for(let i=0;i<24;i++) mFloat.push({x: W/2, y: H*.42, s: 1, v: 0, ph: 0, burst: {vx: (Math.random() - .5)*500, vy: -200 - Math.random()*400, life: 1.2}}); refreshUI(true); return; }
    diff = DIFFS[dIdx]; startTrack(t);
  };
  ui.k7gear.onclick = () => {
    const sh = document.createElement('div'); sh.className = 'k7sheet';
    sh.innerHTML = `<div><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-family:${FONT};font-size:18px">RÉGLAGES</b><button class="k7btn" id="k7x" style="width:40px;height:38px;padding:0;font-size:16px" aria-label="Fermer">✕</button></div>
      <button class="k7btn" id="k7mute" style="padding:12px;font-size:13px">${api.store.load('muted', false) ? 'SON : COUPÉ' : 'SON : ACTIVÉ'}</button>
      <button class="k7btn" id="k7voice" style="padding:12px;font-size:13px">${api.load('voice', true) ? 'VOIX : SUR LES COMBOS' : 'VOIX : COUPÉE'}</button>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:14px">Calage du rythme <span style="display:flex;gap:8px;align-items:center"><button class="k7btn" id="k7offm" style="width:40px;height:38px;padding:0">−</button><b id="k7off" style="font-family:${FONT};min-width:62px;text-align:center">${api.load('offset', 0)} ms</b><button class="k7btn" id="k7offp" style="width:40px;height:38px;padding:0">+</button></span></div>
      <div style="font-size:12.5px;opacity:.8;margin-top:-6px">Si tes coupes s'affichent « en retard » alors que tu es dans le temps, monte le calage.</div>
      <button class="k7btn" id="k7intro" style="padding:12px;font-size:13px">REJOUER L'INTRO</button>
      <button class="k7btn" id="k7tuto" style="padding:12px;font-size:13px">REVOIR LES TUTOS</button>
      <div style="text-align:center;font-family:${FONT};font-size:11px;opacity:.6">K7 CUT · version ${VERSION}</div></div>`;
    menu.appendChild(sh);
    const close = () => sh.remove();
    sh.onclick = e => { if(e.target === sh) close(); }; sh.querySelector('#k7x').onclick = close;
    sh.querySelector('#k7voice').onclick = e => { api.save('voice', !api.load('voice', true)); e.target.textContent = api.load('voice', true) ? 'VOIX : SUR LES COMBOS' : 'VOIX : COUPÉE'; };
    sh.querySelector('#k7mute').onclick = e => { api.store.save('muted', !api.store.load('muted', false)); e.target.textContent = api.store.load('muted', false) ? 'SON : COUPÉ' : 'SON : ACTIVÉ'; };
    const setOff = d => { const v = Math.max(-200, Math.min(200, api.load('offset', 0) + d)); api.save('offset', v); sh.querySelector('#k7off').textContent = v + ' ms'; };
    sh.querySelector('#k7offm').onclick = () => setOff(-10); sh.querySelector('#k7offp').onclick = () => setOff(10);
    sh.querySelector('#k7intro').onclick = () => { close(); intro = {stage: 'wait', t: 0}; introGo(); };
    sh.querySelector('#k7tuto').onclick = e => { ['CV','CH','J','H','S'].forEach(k => api.save('tuto3.' + k, false)); e.target.textContent = 'TUTOS RÉACTIVÉS ✓'; api.sfx.coin(); };
  };

  // glisser : la cassette suit le doigt, l'élan décide où elle se pose, un ressort la cale
  const SP = () => W*.66;
  mcv.addEventListener('pointerdown', e => { drag = {x: e.clientX, pos: mPos, last: e.clientX, lt: performance.now(), v: 0}; try{ mcv.setPointerCapture(e.pointerId); }catch(err){} });
  mcv.addEventListener('pointermove', e => { if(!drag) return; const now2 = performance.now(), dt2 = Math.max(1, now2 - drag.lt); drag.v = drag.v*.6 + ((e.clientX - drag.last)/dt2)*.4; drag.last = e.clientX; drag.lt = now2; mPos = drag.pos - (e.clientX - drag.x)/SP(); });
  const release = () => { if(!drag) return; const fling = -drag.v*1000/SP()*.28; const moved = Math.abs(mPos - drag.pos); drag = null;
    let tgt = Math.round(mPos + Math.max(-1.2, Math.min(1.2, fling)));
    if(moved < .03) return; mTarget = tgt; mVel = 0; };
  mcv.addEventListener('pointerup', release); mcv.addEventListener('pointercancel', release);
  menu.addEventListener('keydown', e => { if(e.key === 'ArrowLeft') mTarget = Math.round(mPos) - 1; if(e.key === 'ArrowRight') mTarget = Math.round(mPos) + 1; });
  mcv.addEventListener('click', e => { const r = mcv.getBoundingClientRect(), x = e.clientX - r.left; if(Math.abs(mPos - mTarget) > .02) return; if(x < W*.22) mTarget = Math.round(mPos) - 1; else if(x > W*.78) mTarget = Math.round(mPos) + 1; });

  /* ---------- intro du menu : ta voix chante K-7-C-U-T, les lettres giclent une à une ---------- */
  let intro = {stage: 'wait', t: 0}; // à chaque lancement
  const IBPM = 104, ISTEP = 60/IBPM/2, ILET = [0, 1, 3, 4, 5]; // syllabe i -> lettre (l'espace saute)
  function introGo(){
    if(!intro || intro.stage !== 'wait') return;
    intro.stage = 'load'; intro.t = 0;
    try{ muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted; if(actx && actx.state === 'suspended') actx.resume(); loadVoice(); }catch(e){}
  }
  function introPlay(){
    intro.stage = 'play'; intro.t = 0;
    if(!useAudio) return;
    events = []; t0 = 0; resetRate(); const s0 = actx.currentTime + .08, f = [196, 220, 247, 294, 330, 392, 392];
    for(let i=0;i<7;i++){ const at = s0 + i*ISTEP*(i === 6 ? 1.5 : 1);
      if(i % 2 === 0){ osc(master, 'sine', 160, at, .3, .8, {glide: 42, gt: .1}); noise(master, at, .012, .2, 'highpass', 2500); }
      if(!sing(vox, at, f[i], i, i === 6 ? .9 : .75, {long: i === 6, rev: .3, dly: i === 6 ? .3 : 0})) osc(master, 'triangle', f[i]*2, at, .18, .2);
    }
    try{ I.crash(s0 + 6*ISTEP*1.5); I.clap(s0 + 6*ISTEP*1.5, .4); }catch(e){}
  }
  function introPop(i){
    if(!intro) return 1;
    if(intro.stage !== 'play') return 0;
    const si = ILET.indexOf(i); if(si < 0) return intro.t > ILET.length*ISTEP ? 1 : 0;
    const dt2 = intro.t - .08 - si*ISTEP, last = intro.t - .08 - 6*ISTEP*1.5;
    if(dt2 < 0) return 0;
    const b = 1 + Math.exp(-dt2*9)*Math.sin(dt2*30)*.45 + (dt2 < .06 ? .6 - dt2*10 : 0);
    return last > 0 ? b + Math.exp(-last*6)*.35 : b;
  }
  mcv.addEventListener('pointerdown', introGo, true); menu.addEventListener('pointerdown', introGo, true);
  function introFrame(g, dt){
    if(!intro) return;
    intro.t += dt;
    if(intro.stage === 'load' && (voiceBuf || !useAudio || intro.t > 1.5)) introPlay();
    if(intro.stage === 'play'){
      const pt2 = intro.t - .08 - ILET.length*ISTEP;
      for(let i=0;i<ILET.length;i++){ const d2 = intro.t - .08 - i*ISTEP; if(d2 > 0 && d2 < dt + .001){ mFloat.push(...Array.from({length: 6}, () => ({x: 30 + ILET[i]*W*.11, y: 50, v: 0, s: .8 + Math.random()*.6, ph: Math.random()*6, burst: {vx: (Math.random() - .5)*380, vy: -200 - Math.random()*250, life: 1}}))); squash = .4; } }
      if(intro.t > 2.6) intro = null;
      return;
    }
  }
  function menuFrame(dt){
    mTime += dt;
    if(!drag){ const k = 120, c = 17; const f = (mTarget - mPos)*k - mVel*c; mVel += f*dt; mPos += mVel*dt; if(Math.abs(mTarget - mPos) < .0015 && Math.abs(mVel) < .01){ mPos = mTarget; mVel = 0; } }
    const ni = wrapI(Math.round(mPos)); if(ni !== cur){ cur = ni; api.save('cur', cur); api.sfx.click(); squash = .5; refreshUI(true); }
    squash *= Math.pow(.02, dt);
    const g = mx; g.clearRect(0, 0, W, H);
    g.drawImage(menuBg, -20 + Math.sin(mTime*.3)*8, -20, W + 40, H + 40);
    const cassR = Math.min(W*.37, Math.max(64, (stackTop - 178)/2.1)), cx = W/2, cy = 178 + (stackTop - 178)*.47, beat = mTime*104/60, bt = beat - Math.floor(beat), kick = Math.max(0, 1 - bt*4);
    // giclées de peinture derrière la cassette, qui pulsent sur le temps
    { if(!bgSplat) bgSplat = makeBgSplat(); const z = cassR/150*1.15*(1 + kick*.035); g.drawImage(bgSplat, cx - 210*z, cy - 210*z, 420*z, 420*z); }
    // notes qui s'envolent
    for(const n of mFloat){
      if(n.burst){ n.burst.vy += 900*dt; n.x += n.burst.vx*dt; n.y += n.burst.vy*dt; n.burst.life -= dt; }
      else { n.y -= n.v*dt; n.x += Math.sin(mTime*1.5 + n.ph)*12*dt; if(n.y < -30){ n.y = H + 20; n.x = Math.random()*W; } }
      g.save(); g.translate(n.x, n.y); g.rotate(Math.sin(mTime*2 + n.ph)*.3); g.scale(n.s, n.s); g.globalAlpha = n.burst ? Math.max(0, n.burst.life) : .55; g.fillStyle = n.burst ? SPRAY[Math.floor(n.ph*10) % SPRAY.length] : (n.ph > 3 ? INK : SPRAY[Math.floor(n.ph*2) % SPRAY.length]);
      g.beginPath(); g.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); g.fill(); g.fillRect(1.5, -14, 3, 20); g.beginPath(); g.moveTo(4.5, -14); g.quadraticCurveTo(14, -10, 10, 0); g.quadraticCurveTo(11, -7, 4.5, -7); g.fill(); g.restore();
    }
    mFloat = mFloat.filter(n => !n.burst || n.burst.life > 0);
    // titre : « TOUCHE ! » avant l'intro, puis K7 CUT en graffiti
    if(intro && intro.stage === 'wait') drawTouche(g, 18, 118, mTime, W*.8);
    else graffiti(g, 'K7 CUT', W*.5 - Math.min(60, W*.15)*2.6, 122, Math.min(60, W*.16, W*.15), mTime, kick, intro && intro.stage === 'play' ? introPop : null);
    introFrame(g, dt);
    // les cassettes mascottes : voisines qui dépassent sur les côtés, celle du centre qui danse
    const base = Math.floor(mPos), look = drag ? {x: Math.max(-1, Math.min(1, -drag.v*3)), y: 0} : {x: Math.sin(mTime*.7)*.6, y: Math.sin(mTime*1.1)*.4};
    for(const off of [-2, -1, 2, 1, 0].map(o => o + (mPos - base > .5 ? 1 : 0))){
      const i = base + off, d = i - mPos, ad = Math.abs(d); if(ad > 2.2) continue;
      const t = TRACKS[wrapI(i)], open = unlocked(t) || discs() >= t.cost, sel = ad < .5;
      const sc = cassR/150*Math.max(.5, 1 - ad*.38), x = cx + d*W*.62, y = cy + ad*18;
      const sq = sel ? squash : 0;
      g.save(); g.translate(x, y); g.rotate(d*.14); g.scale(sc*(1 + sq*.08), sc*(1 - sq*.08)); g.globalAlpha = Math.max(.35, 1 - ad*.4);
      mascot(g, t, wrapI(i), open, sel, mTime, look); g.restore();
    }
    // flèches cartoon
    for(const s2 of [-1, 1]){ const ax = cx + s2*W*.43, ay = cy - 10; g.save(); g.translate(ax + s2*Math.sin(mTime*4)*3, ay); g.fillStyle = '#ffd23f'; g.strokeStyle = INK; g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-s2*12, -22); g.lineTo(s2*16, 0); g.lineTo(-s2*12, 22); g.closePath(); g.fill(); g.stroke(); g.restore(); }
  }
  /* ---------- écran d'accueil : TOUCHÉ, trois gros boutons, deux cassettes qui dansent sur scène ---------- */
  if(!document.getElementById('k7-home-css')){ const st = document.createElement('style'); st.id = 'k7-home-css'; st.textContent = `
    .k7home{position:absolute;inset:0;z-index:5;overflow:hidden}
    .k7home canvas{position:absolute;inset:0;width:100%;height:100%}
    .k7plate{position:relative;display:flex;align-items:center;justify-content:center;gap:14px;width:100%;border:5px solid ${INK};border-radius:12px;font-family:${GRAF};color:${INK};cursor:pointer;box-shadow:0 6px 0 ${INK};padding:0 18px;transition:transform .12s cubic-bezier(.3,1.6,.5,1),box-shadow .12s;background-clip:padding-box}
    .k7plate:active{transform:translateY(5px);box-shadow:0 1px 0 ${INK}}
    .k7plate:focus-visible{outline:3px solid #29c4ff;outline-offset:3px}
    .k7plate::before{content:"";position:absolute;left:0;top:0;bottom:0;width:14px;background:var(--stripe);border-right:4px solid ${INK};border-radius:6px 0 0 6px}
    .k7plate i{position:absolute;width:9px;height:9px;border-radius:50%;background:#d8d2c6;border:2px solid ${INK}}
    .k7plate i:nth-of-type(1){left:20px;top:5px}.k7plate i:nth-of-type(2){right:6px;top:5px}.k7plate i:nth-of-type(3){left:20px;bottom:5px}.k7plate i:nth-of-type(4){right:6px;bottom:5px}
    .k7plate.big{height:76px;font-size:40px;background:#e8344f;color:#fff;-webkit-text-stroke:2px ${INK};paint-order:stroke fill;text-shadow:3px 4px 0 ${INK};--stripe:#ffd23f;transform:rotate(-1.5deg)}
    .k7plate.big:active{transform:rotate(-1.5deg) translateY(5px)}
    .k7plate.mid{height:58px;font-size:28px;background:#f3ead7;--stripe:#ffd23f;width:86%;margin:0 auto;transform:rotate(.8deg)}
    .k7plate.opt{height:58px;font-size:28px;background:#ffd23f;--stripe:#29c4ff;width:80%;margin:0 auto;transform:rotate(-.6deg)}
    .k7dot{position:absolute;right:-5px;top:-5px;width:14px;height:14px;border-radius:50%;background:#e8344f;border:3px solid ${INK}}
    .k7gal{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-height:60vh;overflow-y:auto}
    .k7gal figure{margin:0;background:#fff;border:3px solid ${INK};border-radius:10px;overflow:hidden;cursor:pointer}
    .k7gal img{display:block;width:100%;aspect-ratio:9/10;object-fit:cover}
    .k7gal .empty{display:grid;place-items:center;aspect-ratio:9/10;background:repeating-linear-gradient(45deg,#ece5d3 0 10px,#e2dac6 10px 20px);font-family:${MARKER};font-size:14px;text-align:center;padding:8px}
    .k7gal figcaption{padding:5px 8px;font-family:${MARKER};font-size:14px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:0 6px}`; document.head.appendChild(st); }
  const home = document.createElement('div'); home.className = 'k7home'; menu.appendChild(home);
  const hcv = document.createElement('canvas'); hcv.width = W*mdpr; hcv.height = H*mdpr; home.appendChild(hcv); const hx = hcv.getContext('2d'); hx.setTransform(mdpr, 0, 0, mdpr, 0, 0);
  const TROPHY = `<svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${INK}"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="${INK}" stroke-width="2.2"/><path d="M12 13v4M8 21h8l-1-4H9z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></svg>`;
  const GEAR = ui.k7gear.innerHTML, BARS = `<svg width="30" height="26" viewBox="0 0 30 26"><g fill="${INK}"><rect x="1" y="16" width="5" height="9"/><rect x="8" y="10" width="5" height="15"/><rect x="15" y="4" width="5" height="21"/><rect x="22" y="12" width="5" height="13"/></g></svg>`;
  home.insertAdjacentHTML('beforeend', `
    <div class="ui" style="top:14px;justify-content:space-between;align-items:flex-start">
      <div id="k7htal" class="k7badge" style="transform:rotate(-1.5deg)"></div>
      <div style="display:flex;gap:10px"><button id="k7trophy" class="k7btn k7sq" aria-label="Mes œuvres" style="position:relative">${TROPHY}<span class="k7dot" hidden></span></button><button id="k7hgear" class="k7btn k7sq" aria-label="Options">${GEAR}</button></div></div>
    <div class="ui k7hbtns" style="flex-direction:column;gap:14px;padding:0 34px">
      <button id="k7hplay" class="k7plate big"><i></i><i></i><i></i><i></i>JOUER<svg width="34" height="36" viewBox="0 0 34 36"><path d="M5 4l25 14L5 32z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></svg></button>
      <button id="k7hlvl" class="k7plate mid"><i></i><i></i><i></i><i></i>NIVEAUX ${BARS}</button>
      <button id="k7hopt" class="k7plate opt"><i></i><i></i><i></i><i></i>OPTIONS ${GEAR}</button></div>`);
  const hb = home.querySelector('.k7hbtns'); hb.style.top = Math.round(Math.max(H*.31, 200)) + 'px'; let hbBottom = H*.62;
  const layoutHome = () => { const r = hb.getBoundingClientRect(), m = home.getBoundingClientRect(); if(m.height) hbBottom = (r.bottom - m.top)*H/m.height; };
  let homeOn = false, hTime = 0; home.hidden = true;
  const showHome = () => { homeOn = true; home.hidden = false; refreshHome(); };
  function refreshHome(){ requestAnimationFrame(layoutHome); home.querySelector('#k7htal').innerHTML = `◉ ${discs()} &nbsp;♪ ${bank()}<small>${titleOf(bank())}</small>`; home.querySelector('.k7dot').hidden = !api.load('artNew', false); }
  home.addEventListener('pointerdown', introGo, true);
  home.querySelector('#k7hlvl').onclick = () => { api.sfx.click(); homeOn = false; home.hidden = true; showMenu(); };
  home.querySelector('#k7hopt').onclick = () => { api.sfx.click(); ui.k7gear.onclick(); };
  home.querySelector('#k7hgear').onclick = () => { api.sfx.click(); ui.k7gear.onclick(); };
  home.querySelector('#k7hplay').onclick = () => {
    // JOUER : la dernière cassette jouable, au niveau choisi
    let t = TRACKS[cur]; if(!unlocked(t)) t = TRACKS.filter(unlocked).pop() || TRACKS[0];
    api.sfx.coin(); diff = DIFFS[dIdx]; homeOn = false; home.hidden = true; startTrack(t);
  };
  home.querySelector('#k7trophy').onclick = () => {
    api.sfx.click(); api.save('artNew', false); refreshHome(); { const bd = menu.querySelector('#k7bdot'); if(bd) bd.hidden = true; }
    const sh = document.createElement('div'); sh.className = 'k7sheet'; const b = bests();
    const cells = TRACKS.map(t => { const arts = artsOf(t.id), n = discsOf(t), pct = Math.max(0, ...DIFFS.map(d => (b[t.id + '.' + d.id] || {}).pct || 0)), cap = `<span>${t.name}</span><span>${DISC(n)}${pct ? ' ' + pct + '%' : ''}</span>`;
      if(!arts.length) return `<figure data-id="${t.id}"><div class="empty">${unlocked(t) ? 'Pas encore peinte' : 'Cassette fermée'}</div><figcaption>${cap}</figcaption></figure>`;
      return arts.map((a, k) => `<figure data-id="${t.id}"><img src="${a.img}" alt="Toile ${t.name}"><figcaption>${a.title ? `<span style="flex-basis:100%">« ${a.title} »</span>` : ''}${k ? `<span>${t.name}</span><span>${a.acc} %</span>` : cap}</figcaption></figure>`).join(''); }).join('');
    sh.innerHTML = `<div><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-family:${FONT};font-size:18px">MES ŒUVRES</b><button class="k7btn" id="k7gx" style="width:40px;height:38px;padding:0;font-size:16px" aria-label="Fermer">✕</button></div>
      <div style="font-size:13px;opacity:.8;margin-top:-4px">Tes 3 dernières toiles par cassette : chaque partie en peint une différente. Rond net = pile · jets = en avance · coulures = en retard · gris = raté.</div><div class="k7gal">${cells}</div></div>`;
    menu.appendChild(sh); const close = () => sh.remove(); sh.onclick = e => { if(e.target === sh) close(); }; sh.querySelector('#k7gx').onclick = close;
    sh.querySelectorAll('figure img').forEach(im => im.onclick = async () => { const id = im.closest('figure').dataset.id, name = `k7cut-${id}.jpg`;
      if(window.claude && window.claude.use){ try{ const dl = await window.claude.use('downloads'); if(dl){ await dl.save({filename: name, data: await (await fetch(im.src)).blob()}); return; } }catch(e){ return; } }
      const a = document.createElement('a'); a.href = im.src; a.download = name; document.body.appendChild(a); a.click(); a.remove(); });
  };
  // titre TOUCHÉ : jaune, le É en rouge, les lettres giclent avec la voix
  function homePop(i){ if(!intro) return 1; if(intro.stage !== 'play') return 1; const dt2 = intro.t - .08 - Math.min(i, 5)*ISTEP; if(dt2 < 0) return .001; const last = intro.t - .08 - 6*ISTEP*1.5; const b = 1 + Math.exp(-dt2*9)*Math.sin(dt2*30)*.5 + (dt2 < .06 ? .7 - dt2*10 : 0); return last > 0 ? b + Math.exp(-last*6)*.4 : b; }
  function drawHomeTitle(g, cx, y, t){
    const txt = [...'TOUCHÉ']; g.font = `100px ${GRAF}`; const ws = txt.map(c => g.measureText(c).width), tw = ws.reduce((a, b) => a + b, 0), size = Math.min(110, 100*W*.84/tw, H*.12), k = size/100;
    g.save(); g.translate(cx - tw*k/2, y); g.rotate(-.05 + Math.sin(t*2)*.01); g.font = `${size}px ${GRAF}`; g.textBaseline = 'alphabetic'; g.lineJoin = 'round';
    let x = 0; txt.forEach((c, i) => { const w = ws[i]*k, p = homePop(i), jy = Math.sin(t*4 - i*.7)*3; g.save(); g.translate(x + w/2, jy); g.scale(p, p); g.rotate((i % 2 ? .04 : -.03));
      for(let e=8;e>0;e--){ g.fillStyle = INK; g.fillText(c, -w/2 + e*.8, e); }
      g.lineWidth = size*.18; g.strokeStyle = INK; g.strokeText(c, -w/2, 0);
      const gr = g.createLinearGradient(0, -size*.8, 0, 0); if(i === 5){ gr.addColorStop(0, '#ff5a6e'); gr.addColorStop(1, '#d7263d'); } else { gr.addColorStop(0, '#fff07a'); gr.addColorStop(1, '#ffc21f'); } g.fillStyle = gr; g.fillText(c, -w/2, 0);
      g.fillStyle = 'rgba(28,27,25,.25)'; for(let d=0;d<3;d++) g.fillRect(-w/2 + w*(.2 + d*.25), -size*.05, 3, 6 + ((i*7 + d*5) % 12));
      g.restore(); x += w; });
    g.restore();
    // bande noire « POUR LANCER LA CASSETTE »
    g.save(); g.translate(cx, y + size*.32); g.rotate(-.03); g.font = `${Math.min(20, W*.05)}px ${MARKER}`; const bw = g.measureText('POUR LANCER LA CASSETTE').width + 30;
    g.fillStyle = INK; g.beginPath(); g.moveTo(-bw/2, -15); for(let i=0;i<=10;i++) g.lineTo(-bw/2 + i*bw/10, -15 + (i % 2 ? -3 : 2)); g.lineTo(bw/2 + 6, 0); for(let i=10;i>=0;i--) g.lineTo(-bw/2 + i*bw/10, 15 + (i % 2 ? 3 : -2)); g.lineTo(-bw/2 - 6, 0); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('POUR LANCER LA CASSETTE', 0, 1); g.restore();
  }
  function crowd(g, y, t, kick){ g.fillStyle = INK; for(let i=0;i<18;i++){ const x = i*W/16 - 10 + (i % 2)*8, h = 26 + ((i*37) % 14), jump = Math.max(0, Math.sin(t*104/60*Math.PI + i))*6*(.4 + kick); g.beginPath(); g.arc(x, y - h - jump, 12, 0, 6.283); g.fill(); g.beginPath(); g.ellipse(x, y - h*.35 - jump, 18, h*.6, 0, Math.PI, 0); g.fill(); g.fillRect(x - 18, y - h*.35 - jump, 36, 60); if(i % 3 === 0){ g.lineWidth = 6; g.strokeStyle = INK; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 10, y - h - jump + 6); g.lineTo(x + 18, y - h - 28 - jump); g.stroke(); } } }
  function reel(g, x, y, R, t){ g.fillStyle = INK; g.beginPath(); g.arc(x, y, R, 0, 6.283); g.fill(); g.fillStyle = '#f3ead7'; g.beginPath(); g.arc(x, y, R*.55, 0, 6.283); g.fill(); g.lineWidth = 3; g.strokeStyle = INK; g.stroke(); g.fillStyle = '#ffd23f'; g.beginPath(); g.arc(x, y, R*.4, 0, 6.283); g.fill(); g.save(); g.translate(x, y); g.rotate(t*1.2); g.fillStyle = '#f3ead7'; for(let i=0;i<6;i++){ g.rotate(1.047); g.fillRect(-R*.06, -R*.42, R*.12, R*.12); } g.restore(); }
  function homeFrame(dt){
    hTime += dt; introFrame(null, dt); const g = hx, beat = hTime*104/60, kick = Math.max(0, 1 - (beat % 1)*4);
    g.clearRect(0, 0, W, H); g.drawImage(menuBg, -20 + Math.sin(hTime*.3)*6, -20, W + 40, H + 40);
    // rayons de scène
    g.save(); g.globalAlpha = .1 + kick*.05; g.fillStyle = '#fff'; g.translate(W/2, -20); for(let i=0;i<7;i++){ g.rotate(i ? .16 : -.5); g.beginPath(); g.moveTo(0, 0); g.lineTo(-30, H); g.lineTo(30, H); g.closePath(); g.fill(); } g.restore();
    drawHomeTitle(g, W/2, Math.max(H*.19, 76 + Math.min(110, H*.12)*.72), hTime);
    // la scène : piste, obstacles, bobines, foule
    const ty = H*.86; reel(g, W*.1, ty + 20, W*.2, hTime); reel(g, W*.9, ty + 20, W*.2, -hTime);
    g.fillStyle = INK; g.save(); g.translate(0, ty); g.rotate(-.04); g.fillRect(-20, -12, W + 40, 24); g.fillStyle = LABELRED; for(let i=0;i<6;i++) g.fillRect((i*W/5 + hTime*60) % (W + 40) - 20, -2, 14, 4); g.restore();
    for(const [x, v] of [[W*.3, 1], [W*.7, 1]]){ g.save(); g.translate(x, ty - 36); g.rotate(-.04); g.fillStyle = '#f3ead7'; g.strokeStyle = INK; g.lineWidth = 3; rrp(g, -11, -26, 22, 52, 6); g.fill(); g.stroke(); g.strokeStyle = LABELRED; g.lineWidth = 3.5; for(let i=0;i<3;i++){ const yy = 12 - i*12; g.beginPath(); g.moveTo(-6, yy + 4); g.lineTo(0, yy - 3); g.lineTo(6, yy + 4); g.stroke(); } g.restore(); }
    g.save(); g.translate(W/2, ty - 18); g.fillStyle = INK; g.beginPath(); g.arc(0, 2, 14, 0, 6.283); g.fill(); g.fillStyle = '#f3ead7'; g.beginPath(); g.arc(0, -1, 11, 0, 6.283); g.fill(); g.fillStyle = LABELRED; g.beginPath(); g.arc(0, -1, 4.5 + kick*1.5, 0, 6.283); g.fill(); g.restore();
    // deux cassettes qui dansent sur scène
    const room = H*.86 - 40 - hbBottom, sc = Math.max(.24, Math.min(.42, W/900, room/330)), my = hbBottom + 30 + 150*sc, j1 = Math.abs(Math.sin(beat*Math.PI))*22, j2 = Math.abs(Math.sin(beat*Math.PI + 1.6))*22;
    g.save(); g.translate(W*.22, my - j1); g.rotate(-.22 + Math.sin(beat*Math.PI)*.08); g.scale(sc, sc); mascot(g, TRACKS[0], 0, true, true, hTime, {x: .6, y: -.3}); g.restore();
    g.save(); g.translate(W*.78, my - 8 - j2); g.rotate(.2 - Math.sin(beat*Math.PI)*.08); g.scale(sc, sc); mascot(g, TRACKS[1], 1, true, true, hTime + 1, {x: .6, y: -.3}); g.restore();
    crowd(g, H + 30, hTime, kick);
  }
  let mLast = performance.now();
  (function mLoop(t){ const dt = Math.min(.05, (t - mLast)/1000); mLast = t; if(!menu.hidden){ if(homeOn) homeFrame(dt); else menuFrame(dt); } requestAnimationFrame(mLoop); })(mLast);

  function showMenu(){
    { const rw = stage.querySelector('.k7rw'); if(rw) rw.remove(); }
    api.closeEnd(); state = 'menu'; tutoOpen = false; { const ov = stage.querySelector('#k7tutoov'); if(ov) ov.remove(); } if(useAudio && music) music.gain.setValueAtTime(.8, actx.currentTime);
    api.hud(''); for(const k in imgCache) delete imgCache[k];
    mPos = mTarget = cur; mVel = 0; refreshUI(true);
    menu.hidden = false; stopBtn.hidden = true; requestAnimationFrame(layoutMenu);
  }
  function hideMenu(){ menu.hidden = true; stopBtn.hidden = false; }

  window.__k7 = {home: () => showHome(), bars: () => Array.from({length: totalBars}, (_, b) => buildBar(b)), get bpm(){ return tr.bpm; }, get voice(){ return voiceBuf ? voiceBuf.duration : 0; }, get jumpT(){ return jumpT; }, get hs(){ return holdState; }, pick: t => pickAt(t), now: () => now(), get objs(){ return objs; }, get state(){ return state; }, get stats(){ return stats; }, get combo(){ return combo; }, get hearts(){ return hearts; }, set hearts(v){ hearts = v; }, get bpb(){ return bpb; }, get ppb(){ return PPB; }, get rate(){ return rate; }, get lost(){ return lostTime; }, start: (i, d) => { if(d != null) diff = DIFFS[d]; startTrack(TRACKS[i]); }, tracks: TRACKS, cv};
  showMenu();
  return () => { try{ if(holdState && holdState.voice) holdState.voice.stop(); if(actx) actx.close(); }catch(e){} };
}};
})();
