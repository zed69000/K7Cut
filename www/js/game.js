window.GAMES = window.GAMES || {};
(function(){
const G = window.GAMES = window.GAMES || {};

/* =========================================================
   BEAT SPLASH — un runner rythmique en cassettes
   ========================================================= */
const INK = '#1c1b19', PAPER = '#f4f0e6', RED = '#d7263d';
const FONT = '"Bungee", "Rubik", sans-serif';
// icônes des menus (direction artistique de novembre 2026) : c = couleur du trait
const BSI = {
  spk: c => `<svg viewBox="0 0 32 28" width="32" height="28"><path d="M3 10h6l8-7v22l-8-7H3z" fill="${c}"/><path d="M21 9a6 6 0 0 1 0 10M24.5 5.5a11 11 0 0 1 0 17" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  mute: c => `<svg viewBox="0 0 32 28" width="32" height="28"><path d="M3 10h6l8-7v22l-8-7H3z" fill="${c}"/><path d="M21 9l8 10M29 9l-8 10" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  mic: c => `<svg viewBox="0 0 24 30" width="22" height="28"><rect x="7" y="2" width="10" height="16" rx="5" fill="${c}"/><path d="M3 14a9 9 0 0 0 18 0M12 23v5M7 28h10" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  play: c => `<svg viewBox="0 0 30 32" width="28" height="30"><path d="M5 3l22 13L5 29z" fill="#fff" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/></svg>`,
  cap: c => `<svg viewBox="0 0 40 30" width="38" height="28"><path d="M20 3 38 11 20 19 2 11z" fill="${c}"/><path d="M9 15v7c0 3 5 5 11 5s11-2 11-5v-7l-11 5z" fill="${c}"/><path d="M36 12v9" stroke="${c}" stroke-width="2.5"/><circle cx="36" cy="22" r="2.4" fill="${c}"/></svg>`,
  lock: c => `<svg viewBox="0 0 26 30" width="24" height="28"><path d="M7 13V9a6 6 0 0 1 12 0v4" fill="none" stroke="${c}" stroke-width="3.6"/><rect x="3" y="12" width="20" height="16" rx="3" fill="${c}"/><circle cx="13" cy="19.5" r="2.4" fill="#16151c"/></svg>`,
  phones: c => `<svg viewBox="0 0 34 30" width="34" height="30"><path d="M4 20v-4a13 13 0 0 1 26 0v4" fill="none" stroke="${c}" stroke-width="3.6"/><rect x="2" y="17" width="8" height="12" rx="3" fill="${c}"/><rect x="24" y="17" width="8" height="12" rx="3" fill="${c}"/></svg>`,
  crown: c => `<svg viewBox="0 0 40 30" width="36" height="27"><path d="M3 26V8l9 8 8-13 8 13 9-8v18z" fill="#ffd60a" stroke="${c}" stroke-width="3" stroke-linejoin="round"/></svg>`,
  redo: c => `<svg viewBox="0 0 30 30" width="30" height="30"><path d="M24 15a9 9 0 1 1-3-6.7" fill="none" stroke="${c}" stroke-width="4.2" stroke-linecap="round"/><path d="M16.5 3.5h8v8z" fill="${c}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
  back: c => `<svg viewBox="0 0 28 30" width="26" height="28"><path d="M22 4 5 15l17 11z" fill="${c}" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  fwd: c => `<svg viewBox="0 0 28 30" width="26" height="28"><path d="M6 4l17 11L6 26z" fill="${c}" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  // petits triangles dans les liens et boutons texte (les caractères ◀ ▶ deviennent des emojis bleus sur iPhone)
  triL: () => `<svg viewBox="0 0 10 12" width=".62em" height=".75em" style="vertical-align:-.05em"><path d="M9 1 1 6l8 5z" fill="currentColor"/></svg>`,
  triR: () => `<svg viewBox="0 0 10 12" width=".62em" height=".75em" style="vertical-align:-.05em"><path d="M1 1l8 5-8 5z" fill="currentColor"/></svg>`,
  close: c => `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 5l14 14M19 5 5 19" stroke="${c}" stroke-width="4" stroke-linecap="round"/></svg>`,
  cup: c => `<svg viewBox="0 0 24 24" width="30" height="30"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${c}"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="${c}" stroke-width="2.2"/><path d="M12 13v4M8 21h8l-1-4H9z" fill="${c}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
  gal: c => `<svg width="30" height="30" viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="15" rx="1.5" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M5 16l4.5-5 3.5 3.5 2.5-2.5L19 16z" fill="${c}"/><circle cx="15.5" cy="8.5" r="1.8" fill="#ff1f7a"/></svg>`,
  gear: c => `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z" fill="none" stroke="${c}" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
  bars: c => `<svg width="22" height="18" viewBox="0 0 30 26"><g fill="${c}"><rect x="1" y="16" width="6" height="9" rx="1"/><rect x="11" y="9" width="6" height="16" rx="1"/><rect x="21" y="2" width="6" height="23" rx="1"/></g></svg>`,
  vinyl: () => `<svg class="vn" viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" fill="#16151c" stroke="#fff" stroke-width="3"/><circle cx="30" cy="30" r="19" fill="none" stroke="#3a3944" stroke-width="2"/><circle cx="30" cy="30" r="10" fill="#ffd60a"/><circle cx="30" cy="30" r="3" fill="#16151c"/><path d="M45 12a24 24 0 0 1 6 9M49 7a30 30 0 0 1 8 12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  bulb: () => `<svg viewBox="0 0 40 44" width="38" height="42"><g stroke="#16151c" stroke-width="2.6" stroke-linecap="round"><path d="M20 2v5M6 8l3.5 3.5M34 8l-3.5 3.5M2 22h5M33 22h5"/></g><path d="M20 11a10 10 0 0 0-6 18v4h12v-4a10 10 0 0 0-6-18z" fill="#ffd60a" stroke="#16151c" stroke-width="2.6"/><path d="M15 37h10M16 41h8" stroke="#16151c" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  disk: c => `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 3h13l4 4v14H4z" fill="${c}"/><rect x="7" y="4.5" width="9" height="5" rx="1" fill="#fff"/><rect x="7" y="13" width="11" height="6" rx="1" fill="#fff"/></svg>`,
  pad: c => `<svg viewBox="0 0 32 22" width="26" height="18"><path d="M8 3h16a7 7 0 0 1 6.6 9.3l-1.8 5.2a3.4 3.4 0 0 1-5.6 1.2L19.6 15h-7.2l-3.6 3.7a3.4 3.4 0 0 1-5.6-1.2l-1.8-5.2A7 7 0 0 1 8 3z" fill="${c}"/><path d="M9 7v6M6 10h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="8.5" r="1.6" fill="#fff"/><circle cx="25" cy="11.5" r="1.6" fill="#fff"/></svg>`,
  lockS: c => `<svg viewBox="0 0 26 30" width="11" height="13" style="vertical-align:-1px"><path d="M7 13V9a6 6 0 0 1 12 0v4" fill="none" stroke="${c}" stroke-width="3.6"/><rect x="3" y="12" width="20" height="16" rx="3" fill="${c}"/></svg>`,
  ch: () => `<svg class="ch" viewBox="0 0 22 30"><path d="M6 5l10 10-10 10" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dch: () => `<svg class="chev" viewBox="0 0 30 30" style="width:32px"><path d="M4 5l10 10-10 10M15 5l10 10-10 10" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
// un bouton des menus : icône | libellé (classes : pink, yellow, dark, cta, pill)
const bsBtn = (cls, id, ic, label, extra = '') => `<button class="bs-btn ${cls}"${id ? ` id="${id}"` : ''} ${extra}>${ic ? `<span class="ic">${ic}</span><span class="sep"></span>` : ''}<span class="bl">${label}</span></button>`; // titres, boutons, chiffres : Bungee (lisible, enseigne de rue) ; le texte courant est en Rubik
const MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10];
// Noël : en décembre, la cassette de Noël s'ajoute en tête de l'étagère et tout se décore (neige, bonnet de K7) ; ?noel pour la voir avant
const XMAS = new Date().getMonth() === 11 || /[?&]noel\b/.test(location.search);
if(XMAS) document.documentElement.classList.add('xmas'); // décos de Noël des menus : menus.css
const ALL = ['kick','snare','hat','bass','chords','arp','perc','lead','gtr'];

const DOR = [0, 2, 3, 5, 7, 9, 10], PHR = [0, 1, 3, 5, 7, 8, 10];
// trame commune : intro en appel/réponse, couplet, (nouveau geste), couplet = palier, pause, refrain x2, final
// slow : morceaux lents (Velours, Racines) — pause plus longue, second refrain et final plus courts, pour ne pas étirer la même trame à 3 minutes
function plan(L, o){
  o = o || {}; const all = o.all || 'CJ', nw = o.newAct;
  // une marche, un palier, une marche, un palier : on monte puis on souffle
  const s = [{name: tx('Intro'), bars: 4, tier: 0, call: true, acts: 'CJ', layers: L[0]}, {name: tx('Couplet'), bars: 8, tier: 0, acts: o.verseActs || 'CJ', layers: L[1]}];
  if(nw) s.push({name: o.newName, bars: 4, tier: 0, call: true, acts: nw + 'C', layers: L[1]});
  s.push({name: tx('Couplet'), bars: 8, tier: 1, acts: all, layers: L[2]}, {name: tx('Pause'), bars: o.slow ? 6 : 4, tier: 'rest', acts: 'C', layers: L[3]},
    {name: tx('Refrain'), bars: 8, tier: 1, acts: all, layers: L[4]}, {name: tx('Refrain'), bars: o.slow ? 4 : 8, tier: 2, acts: all, layers: L[5]},
    {name: tx('Final'), bars: o.finalBars || (o.slow ? 4 : 8), tier: 3, acts: all, layers: L[5]}, {name: tx('Fin'), bars: 2, tier: 'rest', acts: '', layers: L[6]});
  return s;
}

/* rythmes d'une mesure (8 croches) : C = coupe (la mélodie, souvent sur les temps), J = rond-cœur (la caisse claire, sur 2 et 4), n = note à ramasser */
const RHY = [
  ['C...J...', 'C...C...', 'C.....J.', 'C...n.J.', 'C.n.C...', 'C...J.n.'],
  ['C.J.C.J.', 'C.J...J.', 'C...C.J.', 'C.C.J...', 'C.J.C.n.', 'C..CJ...', 'C.J.CC..'],
  ['C.JCC.J.', 'C.J.CCJ.', 'CC.JC.J.', 'C.JC.CJ.', 'C..CJ.C.', 'C.J..CJC', 'CCJ.C.J.'],
  ['CCJCCCJC', 'C.JCCJCJ', 'CCJ.CCJC', 'C.JCC.JC', 'CCJCC.JJ', 'C.JCCJ.C']
];
/* ---------- le labo : des morceaux composés (batterie, basse, accords, mélodie écrite) à écouter et à choisir ----------
   motifs de 16 doubles croches : x = coup, o = coup fantôme, . = rien
   basse : [pas, degré au-dessus de l'accord, durée en doubles croches]
   mélodie : 4 mesures de 8 croches, en degrés de la gamme (null = on tient / silence) : c'est elle que tu joues en coupant
   chaque morceau est « dans l'esprit » d'une référence (style, sons, énergie), avec une mélodie originale */
const MIX = [0, 2, 4, 5, 7, 9, 10];
const LL = () => [['kick','hat'], ['kick','snare','hat','bass'], ['kick','snare','hat','bass','chords','lead'], ['chords','arp','lead'], ['kick','snare','hat','bass','chords','perc','lead','gtr'], ALL, ['chords']];
const SONGS = [
  { id: 'test', face: 'T', name: 'Niveau test : nouvelles briques', style: 'disco', label: 'Pop funk · 108 BPM', ref: 'diagonale, deux doigts', bpm: 108, root: 65.41, scale: DOR, prog: [0, 0, 3, 3], swing: 0, cost: 0,
    bg: ['#ffd23f', '#e8344f'], deco: 'rays', gestures: 'Nouvelles briques', delay: .5, desc: 'Chaque nouvelle brique a sa section et son tuto, puis tout se mélange à la fin. À la souris, le double rond se joue au clic droit.',
    song: {kick: 'kick', snare: 'snareclap', bass: {kind: 'slap', line: [[0, 0, 2], [3, 7, 1], [6, 0, 1], [8, 0, 2], [11, 7, 1], [14, 4, 2]]},
      chords: {kind: 'brass', steps: [3, 11], dur: 1, seventh: true}, lead: 'synthbrass', perc: 'snap',
      drums: {kick: 'x.......x.x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.', perc: '....x.......x...'},
      drums2: {kick: 'x.....x.x.x.....', snare: '....x.......x...', hat: 'xoxoxoxoxoxoxoxo', perc: '....x.......x...'},
      hook: [0, null, 2, 3, null, 2, 0, null,  3, null, 4, null, 3, 2, 0, null,  0, null, 2, 3, null, 4, 5, null,  4, 3, 2, null, 0, null, null, null]},
    sections: [{name: 'Intro', bars: 4, tier: 0, call: true, acts: 'CJ', layers: ['kick','hat','bass']},
      {name: 'Diagonale', bars: 8, tier: 1, acts: 'CG', layers: ['kick','snare','hat','bass','chords']},
      {name: 'Deux doigts', bars: 8, tier: 1, acts: 'JD', layers: ['kick','snare','hat','bass','chords','perc','lead']},
      {name: 'Tout mélangé', bars: 8, tier: 1, acts: 'CJGD', layers: ALL},
      {name: 'Fin', bars: 2, tier: 'rest', acts: '', layers: ['chords']}] },
  // --- le labo : morceaux à l'essai, percutants et de tous styles (visibles seulement dans la version de test) ---
  { id: 'lab_electro', lab: true, dens: 0.9, face: 'L1', name: "Surtension", style: 'synthwave', label: 'Electro house · 128 BPM', ref: '', bpm: 128, root: 55, scale: MIN, prog: [0, 5, 2, 6], swing: 0, cost: 0,
    bg: ['#29e0ff', '#6a3fe0'], deco: 'grid', gestures: 'Labo', delay: .5, desc: "Grosse caisse sur chaque temps, basse à contretemps qui pompe, accords filtrés et gros synthé en nappe",
    song: {kick: 'kick', snare: 'clap', pump: true, bass: {kind: 'saw', line: [[2, 0, 2], [6, 0, 2], [10, 0, 2], [14, 7, 2]]},
      chords: {kind: 'filter', steps: [0, 3, 6, 10, 13], dur: 1, seventh: true, sweep: true}, lead: 'supersaw', perc: 'shaker', arp: {notes: [0, 4, 7, 4], every: 1, oct: 8},
      drums: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.'},
      drums2: {kick: 'x...x...x...x...', snare: '....x.......x..o', ohat: '..x...x...x...x.', hat: 'xoxoxoxoxoxoxoxo', perc: 'o.oo.oo.o.oo.oo.'},
      hook: [4, null, 4, null, 7, null, 6, 4, 2, null, null, 2, 4, null, null, null, 4, null, 4, null, 7, null, 9, 7, 6, null, 4, null, 2, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_dnb', lab: true, dens: 1.5, face: 'L2', name: "Jungle express", style: 'dnb', label: 'Drum and bass · 174 BPM', ref: '', bpm: 87, root: 58.27, scale: MIN, prog: [0, 0, 5, 6], swing: 0, cost: 0,
    bg: ['#b6ff3b', '#2fd3b0'], deco: 'speakers', gestures: 'Labo', delay: .5, desc: "Batterie cassée à toute vitesse, basse qui gronde, piano qui plane au-dessus",
    song: {kick: 'kickRock', snare: 'rock', bass: {kind: 'reese', line: [[0, 0, 5], [5, 0, 1], [8, 0, 3], [11, 3, 2], [13, 2, 3]]},
      chords: {kind: 'pad', steps: [0], dur: 16}, lead: 'piano', perc: 'shaker', arp: {notes: [0, 2, 4, 7], every: 2, oct: 8, kind: 'glock'},
      drums: {kick: 'x....x..x....x..', snare: '..x...x...x...x.', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x....x..x..x.x..', snare: '..x...x..ox...xo', hat: 'xxxxxxxxxxxxxxxx', perc: 'o.o.o.o.o.o.o.o.'},
      hook: [7, null, null, 6, null, null, 4, null, 2, null, null, null, 4, null, null, null, 7, null, null, 6, null, null, 9, null, 7, null, null, null, null, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_trap', lab: true, dens: 1.6, face: 'L3', name: "Boss final", style: 'hiphop', label: 'Trap · 140 BPM', ref: '', bpm: 70, root: 51.91, scale: PHR, prog: [0, 0, 1, 0], swing: 0, cost: 0,
    bg: ['#7b3fbf', '#1c1b19'], deco: 'speakers', gestures: 'Labo', delay: .5, desc: "Basse 808 énorme qui glisse, charleston en rafales, cloche inquiétante",
    song: {kick: 'kick808', snare: 'snareclap', bass: {kind: '808', line: [[0, 0, 5], [6, 0, 2], [10, 4, 2], [13, 0, 3]]},
      chords: {kind: 'choir', steps: [0], dur: 16}, lead: 'bell', perc: 'snap', arp: {notes: [0, 1, 4, 1], every: 4, oct: 8, kind: 'glock'},
      drums: {kick: 'x.....x...x.....', snare: '........x.......', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x.....x...x..x..', snare: '........x.......', hat: 'x.xxx.x.xxxxx.xx', perc: '....x.......x...'},
      hook: [4, null, null, 4, null, 3, null, null, 1, null, 0, null, null, null, null, null, 4, null, null, 4, null, 5, null, 4, 3, null, 1, null, 0, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_funk', lab: true, dens: 0.9, face: 'L4', name: "Coup de cuivres", style: 'disco', label: 'Funk · 110 BPM', ref: '', bpm: 110, root: 73.42, scale: DOR, prog: [0, 0, 3, 4], swing: 0.06, cost: 0,
    bg: ['#ffb347', '#e8344f'], deco: 'rays', gestures: 'Labo', delay: .5, desc: "Basse claquée bondissante, clavinet qui gratte, section de cuivres qui répond à chaque phrase",
    song: {kick: 'kick', snare: 'snareclap', bass: {kind: 'slap', line: [[0, 0, 1], [3, 0, 1], [4, 7, 1], [6, 0, 1], [8, 0, 1], [10, 6, 1], [11, 7, 1], [14, 4, 1], [15, 5, 1]]},
      chords: {kind: 'clav', steps: [2, 3, 6, 10, 11, 14], dur: 1, seventh: true}, organ: {steps: [4, 12]}, lead: 'brass', perc: 'cowbell',
      drums: {kick: 'x.....x.x.......', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x..x..x.x.....x.', snare: '....x..o.o..x...', hat: 'xoxoxoxoxoxoxoxo', ohat: '..............x.', perc: 'x...x...x...x...'},
      hook: [0, null, 2, 4, null, 4, null, null, 7, null, 6, 4, null, null, null, null, 0, null, 2, 4, null, 4, null, 6, 7, null, 9, null, 7, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_punk', lab: true, dens: 0.55, face: 'L5', name: "Trois accords", style: 'punk', label: 'Punk rock · 176 BPM', ref: '', bpm: 176, root: 82.41, scale: MAJ, prog: [0, 3, 4, 3], swing: 0, cost: 0,
    bg: ['#ff2e7e', '#c8f04a'], deco: 'scribble', gestures: 'Labo', delay: .5, desc: "Tout à fond : guitares saturées en croches, batterie qui galope, refrain à hurler",
    song: {kick: 'kickRock', snare: 'rock', bass: {kind: 'grit', line: [[0, 0, 2], [2, 0, 2], [4, 0, 2], [6, 0, 2], [8, 0, 2], [10, 0, 2], [12, 0, 2], [14, 4, 2]]},
      chords: {kind: 'power', steps: [0, 4, 8, 12], dur: 4}, gtr: {steps: [0, 2, 4, 6, 8, 10, 12, 14], dur: 2, palm: [2, 6, 10]}, lead: 'gtrlead',
      drums: {kick: 'x.......x.x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x...x.x.x...x.x.', snare: '....x.......x...', ride: 'x.x.x.x.x.x.x.x.', perc: 'x...............'},
      hook: [4, null, 4, null, 5, null, 4, null, 2, null, null, null, 0, null, null, null, 4, null, 4, null, 5, null, 7, null, 9, null, null, null, 7, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_latin', lab: true, dens: 1, face: 'L6', name: "Feu de joie", style: 'reggae', label: 'Latin · 104 BPM', ref: '', bpm: 104, root: 55, scale: MIN, prog: [0, 3, 4, 0], swing: 0, cost: 0,
    bg: ['#f2c21b', '#d7263d'], deco: 'rays', gestures: 'Labo', delay: .5, desc: "Piano qui tourne en boucle, basse qui anticipe, cloche et percussions qui ne lâchent rien",
    song: {kick: 'kick', snare: 'rim', bass: {kind: 'log', line: [[3, 0, 2], [6, 4, 2], [11, 0, 2], [14, 4, 2]]},
      chords: {kind: 'piano', steps: [0, 3, 6, 8, 11, 14], dur: 1}, lead: 'marimba', perc: 'cowbell', arp: {notes: [0, 2, 4, 2], every: 2, oct: 8, kind: 'glock'},
      drums: {kick: 'x.......x.......', snare: '..x..x....x.x...', perc: 'x..x..x...x.x...'},
      drums2: {kick: 'x.....x.x.....x.', snare: '..x..x....x.x...', hat: 'xoxoxoxoxoxoxoxo', perc: 'x..x..x...x.x...'},
      hook: [4, null, 2, 4, null, 5, 4, null, 2, null, 0, null, null, null, null, 2, 4, null, 2, 4, null, 5, 7, null, 5, 4, null, 2, null, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_techno', lab: true, dens: 0.8, face: 'L7', name: "L'usine", style: 'french', label: 'Techno · 136 BPM', ref: '', bpm: 136, root: 55, scale: PHR, prog: [0, 0, 0, 1], swing: 0, cost: 0,
    bg: ['#d9b44a', '#141219'], deco: 'leds', gestures: 'Labo', delay: .5, desc: "Grosse caisse sèche et dure, basse qui roule en doubles croches, une alarme au refrain",
    song: {kick: 'tight', snare: 'clap', pump: true, bass: {kind: 'reese', line: [[2, 0, 1], [3, 0, 1], [6, 0, 1], [7, 0, 1], [10, 0, 1], [11, 0, 1], [14, 0, 1], [15, 3, 1]]},
      chords: {kind: 'filter', steps: [0, 6, 12], dur: 2, sweep: true}, lead: 'talk', perc: 'siren', arp: {notes: [0, 7, 0, 4], every: 1, oct: 8, kind: 'chip'},
      drums: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.'},
      drums2: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.', hat: 'xxxxxxxxxxxxxxxx', perc: 'x...............'},
      hook: [0, null, 0, null, 3, null, 0, null, 1, null, 0, null, null, null, null, null, 0, null, 0, null, 3, null, 4, null, 3, null, 1, null, 0, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_bigbeat', lab: true, dens: 0.9, face: 'L8', name: "Gros son", style: 'punk', label: 'Big beat · 124 BPM', ref: '', bpm: 124, root: 61.74, scale: MIX, prog: [0, 0, 6, 3], swing: 0, cost: 0,
    bg: ['#c8f04a', '#1c1b19'], deco: 'speakers', gestures: 'Labo', delay: .5, desc: "Batterie rock énorme sur une basse saturée, voix de robot et riff qui tourne en boucle",
    song: {kick: 'kickRock', snare: 'rock', bass: {kind: 'grit', line: [[0, 0, 2], [3, 0, 1], [6, 6, 2], [8, 0, 2], [11, 0, 1], [12, 3, 2], [14, 4, 2]]},
      chords: {kind: 'clav', steps: [2, 6, 10, 14], dur: 1}, gtr: {steps: [0, 3, 6, 8, 11, 14], dur: 2, palm: [3, 11]}, lead: 'talk', perc: 'cowbell',
      drums: {kick: 'x.....x...x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x..x..x...x..x..', snare: '....x..o....x..o', hat: 'xxxxxxxxxxxxxxxx', ohat: '......x.......x.', perc: 'x.x.x.x.x.x.x.x.'},
      hook: [0, null, 0, 3, null, 4, null, null, 6, null, 4, null, 3, null, null, null, 0, null, 0, 3, null, 4, null, 6, 7, null, 6, null, 4, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_gospel', lab: true, dens: 1.1, face: 'L9', skin: 'soul', name: "Lève-toi", style: 'hiphop', label: 'Gospel · 100 BPM', ref: '', bpm: 100, root: 58.27, scale: MAJ, prog: [0, 3, 5, 4], swing: 0.12, cost: 0,
    bg: ['#e8b04a', '#5a1a33'], deco: 'rays', gestures: 'Labo', delay: .5, desc: "Piano qui danse, orgue, claquements de mains sur 2 et 4, et le chœur qui monte",
    song: {kick: 'kick', snare: 'snareclap', bass: {kind: 'walk', line: [[0, 0, 3], [4, 2, 2], [6, 4, 2], [8, 5, 3], [12, 4, 2], [14, 2, 2]]},
      chords: {kind: 'piano', steps: [0, 3, 6, 10, 12], dur: 2, seventh: true}, organ: {steps: [2, 6, 10, 14]}, lead: 'piano', perc: 'snap',
      drums: {kick: 'x.......x.x.....', snare: '....x.......x...', perc: '....x.......x...'},
      drums2: {kick: 'x..x....x.x...x.', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.', perc: '....x.......x...'},
      hook: [4, null, 4, 5, null, 7, null, null, 5, null, 4, null, 2, null, null, null, 4, null, 4, 5, null, 7, null, 9, 8, null, 7, null, null, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_chip', lab: true, dens: 0.65, face: 'L10', name: "Borne d'arcade", style: 'synthwave', label: 'Chiptune · 156 BPM', ref: '', bpm: 156, root: 65.41, scale: MAJ, prog: [0, 5, 3, 4], swing: 0, cost: 0,
    bg: ['#ff3d9a', '#29e0ff'], deco: 'grid', gestures: 'Labo', delay: .5, desc: "Tout en sons de console 8 bits : mélodie qui file, arpèges éclairs, batterie en bruit blanc",
    song: {kick: 'chip', snare: 'chip', bass: {kind: 'chip', line: [[0, 0, 2], [2, 7, 2], [4, 0, 2], [6, 7, 2], [8, 0, 2], [10, 7, 2], [12, 4, 2], [14, 7, 2]]},
      chords: {kind: 'chip', steps: [0, 4, 8, 12], dur: 2}, lead: 'chip', perc: 'shaker', arp: {notes: [0, 2, 4, 7], every: 1, oct: 8, kind: 'chip'},
      drums: {kick: 'x...x...x...x...', snare: '....x.......x...'},
      drums2: {kick: 'x...x.x.x...x.x.', snare: '....x.......x.xx', hat: 'x.x.x.x.x.x.x.x.'},
      hook: [7, null, 4, null, 2, null, 4, null, 7, null, 9, null, 7, null, null, null, 5, null, 4, null, 2, null, 4, 5, 7, null, null, null, 4, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'lab_epic', lab: true, dens: 0.85, face: 'L11', name: "Assaut final", style: 'metal', label: 'Orchestral épique · 132 BPM', ref: '', bpm: 132, root: 55, scale: MIN, prog: [0, 5, 3, 4], swing: 0, cost: 0,
    bg: ['#d7263d', '#1c1b19'], deco: 'stripes', gestures: 'Labo', delay: .5, desc: "Cordes qui martèlent, cuivres héroïques, toms de guerre et timbales : la bande-annonce",
    song: {kick: 'kick808', snare: 'rock', bass: {kind: 'sub', line: [[0, 0, 4], [4, 0, 2], [6, 0, 2], [8, 0, 4], [12, 4, 4]]},
      chords: {kind: 'strings', steps: [0, 2, 4, 6, 8, 10, 12, 14], dur: 1}, lead: 'brass', perc: 'tom', arp: {notes: [0, 4, 7, 4], every: 2, oct: 8, kind: 'glock'},
      drums: {kick: 'x.......x.......', snare: '........x.......', perc: 'x..x..x.x..x..x.'},
      drums2: {kick: 'x.....x.x.....x.', snare: '....x.......x...', perc: 'x..x..x.x..xx.xx', ride: 'x...x...x...x...'},
      hook: [0, null, null, 2, 4, null, null, null, 5, null, 4, null, 2, null, null, null, 0, null, null, 2, 4, null, null, 7, 6, null, 4, null, 5, null, null, null]},
    sections: plan(LL(), {all: 'CJ'}) },
  { id: 'facettes', dens: 0.82, face: 'C', name: tx('Boule à facettes'), style: 'disco', label: tx('Disco · 120 BPM'), ref: 'disco funk, guitare rythmique serrée', bpm: 120, root: 61.74, scale: DOR, prog: [0, 5, 3, 4], swing: 0, cost: 4,
    bg: ['#ff9ad5', '#d4479a'], deco: 'leds', gestures: tx('+ Diagonale'), delay: .5, desc: 'Basse en octaves qui rebondit, cordes qui s\'envolent, guitare funky et charleston ouvert sur chaque contretemps',
    song: {kick: 'kick', snare: 'clap', bass: {kind: 'funk', line: [[0, 0, 1], [2, 7, 1], [4, 0, 1], [6, 7, 1], [8, 0, 1], [10, 7, 1], [12, 2, 1], [14, 7, 1]]},
      chords: {kind: 'strings', steps: [0], dur: 16}, organ: {steps: [2, 6, 10, 14]}, lead: 'brass', arp: {notes: [0, 4, 7, 4], every: 2, oct: 8, kind: 'cleangtr'},
      drums: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.'},
      drums2: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.', hat: 'x.x.x.x.x.x.x.x.', perc: '......x.......x.'},
      hook: [4, null, 4, 5, null, 4, 2, null,  0, null, 2, null, 4, null, null, null,  4, null, 4, 5, null, 7, 6, null,  5, null, 4, null, 2, null, null, null]},
    sections: plan(LL(), {newAct: 'G', newName: tx('En diagonale !'), all: 'CJG'}) },
  { id: 'trottoir', face: 'D', name: tx('Trottoir 90'), style: 'hiphop', label: tx('Hip-hop boom bap · 88 BPM'), ref: 'hip-hop jazzy boom bap', bpm: 88, root: 55, scale: MIN, prog: [0, 0, 5, 6], swing: .12, cost: 5,
    bg: ['#ffb347', '#d9822b'], deco: 'speakers', gestures: tx('+ Deux doigts'), delay: .75, desc: 'Grosse caisse lourde, caisse claire sèche, piano électrique jazzy et basse 808 qui glisse',
    song: {kick: 'kick', snare: 'snareclap', bass: {kind: '808', line: [[0, 0, 4], [7, 0, 2], [10, 4, 2], [12, 3, 4]]},
      chords: {kind: 'rhodes', steps: [0, 7, 10], dur: 3, seventh: true}, lead: 'bell', perc: 'shaker',
      drums: {kick: 'x.....x...x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x.....x.x.x...x.', snare: '....x.......x..o', hat: 'xxx.xxx.xxx.xxx.', perc: '..o...o...o...o.'},
      hook: [7, null, 6, null, 4, null, null, 3,  4, null, null, null, 0, null, null, null,  7, null, 6, null, 4, null, 6, 7,  9, null, 7, null, null, null, null, null]},
    sections: plan(LL(), {newAct: 'DJ', newName: tx('À deux doigts !'), all: 'CJD'}) },
  { id: 'velours', dens: 1.55, face: 'H', skin: 'soul', name: tx('Velours'), style: 'synthwave', label: tx('Néo-soul · 72 BPM'), ref: 'néo-soul chaude aux claviers', bpm: 72, root: 58.27, scale: MAJ, prog: [0, 3, 1, 4], swing: .1, cost: 13,
    bg: ['#c9a2ff', '#7e57c2'], deco: 'stripes', gestures: tx('Notes longues + deux doigts'), delay: .75, desc: 'Lent et moelleux : basse qui marche, accords de piano électrique, caisse claire sur le bord',
    song: {kick: 'kick', snare: 'rim', bass: {kind: 'walk', line: [[0, 0, 3], [4, 2, 2], [6, 4, 2], [8, 0, 3], [12, 5, 2], [14, 4, 2]]},
      chords: {kind: 'rhodes', steps: [0, 6, 10], dur: 4, seventh: true}, lead: 'piano', perc: 'shaker', arp: {notes: [0, 2, 4, 6], every: 4, oct: 8, kind: 'glock'},
      drums: {kick: 'x.......x.x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x......xx.x.....', snare: '....x.......x...', hat: 'xoxoxoxoxoxoxoxo', perc: 'o.o.o.o.o.o.o.o.'},
      hook: [4, null, null, 5, 4, null, 2, null,  0, null, null, null, null, null, 1, 2,  4, null, null, 5, 4, null, 7, null,  6, null, 4, null, null, null, null, null]},
    sections: plan(LL(), {newAct: 'DJ', newName: tx('À deux doigts !'), all: 'CJHD', slow: true}) },
  { id: 'forge', face: 'J', name: tx('La Forge'), style: 'metal', label: tx('Métal · 150 BPM'), ref: 'métal à riffs galopants', bpm: 150, root: 82.41, scale: PHR, prog: [0, 1, 0, 6], swing: 0, cost: 18,
    bg: ['#ff6b4a', '#b0301c'], deco: 'scribble', gestures: tx('Le grand final : toutes les briques'), delay: .5, desc: 'Double grosse caisse, guitares saturées en rafale, et tout ce que tu as appris d\'un coup',
    song: {kick: 'kickRock', snare: 'rock', bass: {kind: 'grit', line: [[0, 0, 1], [2, 0, 1], [4, 0, 1], [6, 0, 1], [8, 0, 1], [10, 0, 1], [12, 1, 1], [14, 0, 1]]},
      chords: {kind: 'power', steps: [0, 8], dur: 6}, gtr: {steps: [0, 2, 4, 6, 8, 10, 12, 14], dur: 2, palm: [2, 4, 10, 12]}, lead: 'gtrlead', arp: {notes: [0, 1, 4, 1], every: 2, oct: 2, kind: 'cleangtr'},
      drums: {kick: 'x.x.x.x.x.x.x.x.', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'xxxxxxxxxxxxxxxx', snare: '....x.......x...', ride: 'x.x.x.x.x.x.x.x.', perc: 'x.......x.......'},
      hook: [7, null, 8, null, 7, null, 4, null,  3, null, 4, null, 1, null, 0, null,  7, null, 8, null, 10, null, 8, null,  7, null, null, null, null, null, null, null]},
    sections: plan([['kick','arp'], ['kick','snare','hat','bass','arp'], ['kick','snare','hat','bass','gtr','lead'], ['chords','arp'], ['kick','snare','hat','bass','gtr','perc','lead'], ['kick','snare','hat','bass','gtr','perc','lead','chords'], ['chords']], {all: 'CJSHGD'}) },
  { id: 'robots', dens: 0.62, face: 'A', name: tx('Robots de minuit'), style: 'french', label: tx('French house · 122 BPM'), ref: 'french house robotique filtrée', bpm: 122, root: 73.42, scale: DOR, prog: [0, 0, 3, 4], swing: 0, cost: 0,
    bg: ['#b7a6ff', '#6b55d6'], deco: 'leds', gestures: tx('Couper · Taper'), delay: .75, desc: 'Boucle disco filtrée qui s\'ouvre et se ferme, pompe énorme, voix de robot',
    song: {kick: 'kick', snare: 'clap', pump: true, bass: {kind: 'funk', line: [[0, 0, 2], [3, 0, 1], [6, 7, 1], [8, 0, 2], [10, 4, 1], [11, 0, 1], [14, 7, 2]]},
      chords: {kind: 'filter', steps: [0, 3, 6, 8, 11, 14], dur: 1, seventh: true, sweep: true}, lead: 'talk', perc: 'shaker',
      drums: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.', perc: 'oooooooooooooooo'},
      drums2: {kick: 'x...x...x...x...', snare: '....x.......x...', ohat: '..x...x...x...x.', hat: 'x.x.x.x.x.x.x.x.', perc: 'oxoooxoooxoooxoo'},
      hook: [7, null, null, 7, null, 9, 7, null,  5, null, 4, null, 2, null, null, null,  7, null, null, 7, null, 9, 11, null,  9, 7, null, 5, null, 4, null, null]},
    sections: plan(LL()) },
  { id: 'autoroute', dens: 1.18, face: 'G', name: tx('Autoroute 86'), style: 'synthwave', label: tx('Synthwave de nuit · 112 BPM'), ref: 'synthwave de nuit, basse arpégée', bpm: 112, root: 61.74, scale: MIN, prog: [0, 5, 2, 6], swing: 0, cost: 11,
    bg: ['#f58fb2', '#c9568a'], deco: 'grid', gestures: tx('Scratch + notes longues'), delay: .75, desc: 'Basse en doubles croches qui fonce, caisse claire années 80 géante, cuivre synthé sombre',
    song: {kick: 'kick', snare: 'gated', pump: true, bass: {kind: 'saw', line: [[0, 0, 1], [1, 0, 1], [2, 7, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 7, 1], [7, 0, 1], [8, 0, 1], [9, 0, 1], [10, 7, 1], [11, 0, 1], [12, 0, 1], [13, 0, 1], [14, 7, 1], [15, 0, 1]]},
      chords: {kind: 'strings', steps: [0], dur: 16}, lead: 'synthbrass', arp: {notes: [0, 2, 4, 7], every: 2, oct: 8},
      drums: {kick: 'x.......x.......', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x...x...x...x...', snare: '....x.......x...', hat: 'xxxxxxxxxxxxxxxx', perc: '..............x.'},
      hook: [4, null, null, 3, null, null, 2, null,  0, null, null, null, null, null, -1, 0,  4, null, null, 3, null, null, 7, null,  6, null, 4, null, 3, null, 2, null]},
    sections: plan(LL(), {newAct: 'SH', newName: tx('Mélange !'), all: 'CJSHG'}) },
  { id: 'garage', dens: 1.05, face: 'I', name: tx('Cri du garage'), style: 'punk', label: tx('Rock alternatif · 138 BPM'), ref: 'rock alternatif calme puis fort', bpm: 138, root: 82.41, scale: MIX, prog: [0, 6, 3, 0], swing: 0, cost: 15,
    bg: ['#c8f04a', '#86b22a'], deco: 'scribble', gestures: tx('Tout, vite et fort'), delay: .5, desc: 'Couplet calme à la guitare claire, puis le refrain explose en guitares saturées',
    song: {kick: 'kickRock', snare: 'rock', bass: {kind: 'grit', line: [[0, 0, 2], [2, 0, 2], [4, 0, 2], [6, 0, 2], [8, 0, 2], [10, 0, 2], [12, 0, 2], [14, 0, 2]]},
      chords: {kind: 'cleangtr', steps: [0, 6, 12], dur: 4}, gtr: {steps: [0, 2, 4, 6, 8, 10, 12, 14], dur: 2, palm: [2, 6, 10, 14]}, lead: 'gtrlead', arp: {notes: [0, 4, 7, 4], every: 2, oct: 2, kind: 'cleangtr'},
      drums: {kick: 'x.......x.......', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x.....x.x.x.....', snare: '....x.......x...', ride: 'x.x.x.x.x.x.x.x.', perc: 'x...............'},
      hook: [7, null, 6, null, 4, null, null, null,  3, null, 4, null, 6, null, 4, null,  7, null, 6, null, 4, null, 7, null,  8, null, 7, null, null, null, null, null]},
    sections: plan([['kick','arp'], ['kick','snare','hat','bass','arp'], ['kick','snare','hat','bass','arp','lead'], ['chords','arp'], ['kick','snare','hat','bass','gtr','perc','lead'], ['kick','snare','hat','bass','gtr','perc','lead'], ['chords']], {all: 'CJSHD'}) },
  { id: 'collines', dens: 1.3, face: 'F', skin: 'pastoral', name: tx('Vent des collines'), style: 'dnb', label: tx('Orchestral · 92 BPM'), ref: 'orchestral pastoral, flûte et cordes', bpm: 92, root: 65.41, scale: MAJ, prog: [5, 3, 4, 0], swing: 0, cost: 9,
    bg: ['#8fce6a', '#3f8a4f'], deco: 'stripes', gestures: tx('Notes longues + diagonale'), delay: .5, desc: 'Piano qui raconte, grandes cordes, carillon, et timbales au refrain',
    song: {kick: 'kick808', snare: 'snap', bass: {kind: 'sub', line: [[0, 0, 8], [8, 4, 8]]},
      chords: {kind: 'strings', steps: [0], dur: 16}, lead: 'piano', perc: 'tom', arp: {notes: [0, 2, 4, 7, 9, 7, 4, 2], every: 2, oct: 8, kind: 'glock'},
      drums: {kick: 'x.......x.......', snare: '........x.......', perc: '................'},
      drums2: {kick: 'x.......x.....x.', snare: '....x.......x...', perc: '............x.x.', hat: '..x...x...x...x.'},
      hook: [2, null, 4, null, 7, null, 6, 4,  5, null, null, null, 4, null, 2, null,  2, null, 4, null, 7, null, 9, null,  7, null, null, null, null, null, null, null]},
    sections: plan([['chords','lead'], ['kick','snare','bass','chords'], ['kick','snare','bass','chords','arp','lead'], ['chords','arp','lead'], ['kick','snare','hat','bass','chords','perc','lead'], ALL, ['chords']], {newAct: 'H', newName: tx('Tiens la note !'), all: 'CJHG'}) },
  { id: 'racines', dens: 1.25, face: 'E', name: tx('Racines'), style: 'reggae', label: tx('Reggae roots · 76 BPM'), ref: 'reggae roots à contretemps', bpm: 76, root: 58.27, scale: MAJ, prog: [0, 3, 4, 3], swing: .15, cost: 7,
    bg: ['#8fce6a', '#3f8a4f'], deco: 'speakers', gestures: tx('+ Notes longues'), delay: .75, desc: 'One drop : tout tombe sur le 3e temps, guitare skank, orgue qui bulle, basse qui chante',
    song: {kick: 'kick', snare: 'rim', bass: {kind: 'dub', line: [[0, 0, 3], [4, 4, 2], [6, 2, 2], [8, 0, 3], [12, 4, 1], [13, 5, 1], [14, 4, 2]]},
      chords: {kind: 'cleangtr', steps: [4, 12], dur: 1}, organ: {steps: [2, 3, 6, 7, 10, 11, 14, 15]}, lead: 'melodica', perc: 'shaker',
      drums: {kick: '........x.......', snare: '........x.......', hat: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: '........x.......', snare: '........x.....o.', hat: 'xoxoxoxoxoxoxoxo', perc: 'o.o.o.o.o.o.o.o.'},
      hook: [4, null, 4, null, 2, null, 0, null,  2, null, null, null, 4, null, null, null,  4, null, 4, null, 5, null, 4, 2,  0, null, null, null, null, null, null, null]},
    sections: plan(LL(), {newAct: 'H', newName: tx('Tiens la note !'), all: 'CJH', slow: true}) },
  { id: 'noel', dens: 0.8, face: 'N', skin: 'noel', name: tx('Traîneau turbo'), style: 'disco', label: tx('Pop de Noël · 132 BPM'), ref: 'Jingle Bells (domaine public) en pop qui fonce, grelots et cuivres', bpm: 132, root: 65.41, scale: MAJ, prog: [0, 0, 3, 4], swing: 0, cost: 0,
    bg: ['#ff6b6b', '#c62839'], deco: 'leds', gestures: tx('Couper · Taper'), delay: .5, desc: 'Grelots de traîneau en doubles croches, basse qui rebondit en octaves, cuivres sur les contretemps et glockenspiel',
    song: {kick: 'kick', snare: 'snareclap', bass: {kind: 'funk', line: [[0, 0, 1], [2, 7, 1], [4, 0, 1], [6, 7, 1], [8, 0, 1], [10, 7, 1], [12, 4, 1], [14, 7, 1]]},
      chords: {kind: 'brass', steps: [2, 6, 10, 14], dur: 1}, lead: 'bell', perc: 'sleigh', arp: {notes: [0, 2, 4, 7, 4, 2], every: 2, oct: 8, kind: 'glock'},
      drums: {kick: 'x...x...x...x...', snare: '....x.......x...', perc: 'x.x.x.x.x.x.x.x.'},
      drums2: {kick: 'x...x...x...x.x.', snare: '....x.......x...', ohat: '..x...x...x...x.', perc: 'xoxoxoxoxoxoxoxo'},
      hook: [2, null, 2, null, 2, null, null, null,  2, null, 2, null, 2, null, null, null,  2, null, 4, null, 0, null, null, 1,  2, null, null, null, null, null, null, null]},
    sections: plan([['kick','perc'], ['kick','snare','perc','bass'], ['kick','snare','perc','bass','chords','lead'], ['chords','arp','lead'], ['kick','snare','hat','bass','chords','perc','lead','arp'], ALL, ['chords']]) },
  { id: 'lune', dens: 0.88, face: 'B', name: tx('Pas de lune'), style: 'disco', label: tx('Pop funk · 116 BPM'), ref: 'pop funk, basse claquée', bpm: 116, root: 65.41, scale: DOR, prog: [0, 0, 3, 3], swing: 0, cost: 2,
    bg: ['#f2cd4c', '#d6a93a'], deco: 'rays', gestures: tx('+ Scratch'), delay: .5, desc: 'Basse synthé en doubles croches, claquements de doigts, cuivres secs, batterie serrée',
    song: {kick: 'kick', snare: 'snareclap', bass: {kind: 'slap', line: [[0, 0, 1], [2, 0, 1], [3, 7, 1], [5, 0, 1], [7, 6, 1], [8, 0, 1], [10, 0, 1], [11, 7, 1], [13, 4, 1], [14, 3, 1]]},
      chords: {kind: 'brass', steps: [3, 6, 11], dur: 1, seventh: true}, lead: 'synthbrass', perc: 'snap',
      drums: {kick: 'x.......x.x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.', perc: '....x.......x...'},
      drums2: {kick: 'x.....x.x.x.....', snare: '....x.......x...', hat: 'xoxoxoxoxoxoxoxo', ohat: '..............x.', perc: '....x.......x...'},
      hook: [0, null, 2, 3, null, 2, 0, null,  3, null, 4, null, 3, 2, 0, null,  0, null, 2, 3, null, 4, 5, null,  4, 3, 2, null, 0, null, null, null]},
    sections: plan(LL(), {newAct: 'S', newName: tx('Scratch !'), all: 'CJS'}) }
];
const byId = id => SONGS.find(t => t.id === id);
// les cassettes du jeu, de la plus facile à la plus dure ; le labo garde le niveau test des nouvelles briques
const TRACKS = ['robots', 'lune', 'facettes', 'trottoir', 'racines', 'collines', 'autoroute', 'velours', 'garage', 'forge'].map(byId);
const LAB = [byId('test'), ...SONGS.filter(t => t.lab)];
// l'étagère des menus : en décembre la cassette de Noël passe devant ; elle reste hors campagne (pas de disque) et hors Cassette de la mort
const NOEL = byId('noel'), SHELF = XMAS ? [NOEL, ...TRACKS] : TRACKS;

const VERSION = '0.33.1';
window.K7_VERSION = window.GAME_VERSION = VERSION; // read by the studio kit
// tuning values are read on use, so the GDD preview reacts at once
const discAt = list => list.map(x => x + Tuning.num("disques.ecart", 0));
const DIFFS = [
  {id: 'apprenti', name: tx('Apprenti'), note: tx('Pour apprendre, tout en douceur'), mult: 1, get win(){ return Tuning.num("niveau.apprenti.tolerance", 1.55); }, get dens(){ return Tuning.num("niveau.apprenti.densite", .6); }, cap: 1, gap: .55, easy: true, get disc(){ return discAt([70, 85, 95]); }},
  {id: 'musicien', name: tx('Musicien'), note: tx('Le jeu tel qu\'il est pensé'), mult: 1.5, get win(){ return Tuning.num("niveau.musicien.tolerance", 1.15); }, get dens(){ return Tuning.num("niveau.musicien.densite", .85); }, cap: 2, gap: .34, get disc(){ return discAt([60, 80, 92]); }},
  {id: 'virtuose', name: tx('Virtuose'), note: tx('Plus dense, plus précis, plus rapide'), mult: 2.5, get win(){ return Tuning.num("niveau.virtuose.tolerance", .85); }, get dens(){ return Tuning.num("niveau.virtuose.densite", 1.25); }, speed: 1.1, cap: 3, gap: .24, get disc(){ return discAt([55, 75, 90]); }},
  {id: 'roi', name: tx('Roi'), note: tx("Pas de mesure d'écoute, très serré : 3 ratés de suite et la bande casse"), mult: 4, get win(){ return Tuning.num("niveau.roi.tolerance", .62); }, get dens(){ return Tuning.num("niveau.roi.densite", 1.75); }, cap: 3, gap: .15, speed: 1.25, noCall: true, get ko(){ return Tuning.num("niveau.roi.ko", 3); }, boost: 1, get disc(){ return discAt([50, 70, 86]); }}
];
const TITLES = [[0, tx('Apprenti')], [60, tx('Musicien')], [180, tx('Virtuose')], [400, tx('Maître du scratch')], [800, tx('Roi du scratch et du rythme')]];
function rngFrom(str){ let h = 2166136261; for(const c of str){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } let s = h >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; }; }

G.trancheroute = { mount(stage, api){
  // les polices sont embarquées (css/fonts.css, dossier fonts) : rien à charger en ligne
  const {cv, ctx, W, H, pt} = api.canvas();
  let muted = api.store.load('muted', false);
  const TAPEY = Math.round(H*.48), TT = 30, Y0 = TAPEY - TT/2, HXs = Math.round(W*.26);
  const REELY = Math.round(H*.83), REELR = Math.min(W*.19, H*.11), EQY = Math.round(H*.665);
  let PPB = 100;
  let actx = null, master = null, music = null, pump = null, t0 = 0, useAudio = false;
  const MBPM = 118; // tempo de la musique des menus : les cassettes dansent dessus
  let diff = DIFFS[0], tr = null, sections, totalBars, bpb, objs, bits, judges, state = 'menu', score, combo, maxCombo, hearts, stats, beatNow, nextStep, jumpT, hurtT, energy, events, bump, flashR, gesture, motif, notesRun, holdState, scratchState, rot, finished, trance = 0, rings = [], hookMask = [1,0,0,1,0,1,0,0];

  /* ---------- sauvegarde ---------- */
  const bank = () => api.load('notes', 0);
  const bests = () => api.load('bests', {});
  // les disques : le meilleur résultat de chaque cassette (0 à 3), tous niveaux confondus
  const discsOf = t => { const b = bests(); return Math.max(b[t.id] ? b[t.id].discs || 0 : 0, ...DIFFS.map(d => b[t.id + '.' + d.id] ? b[t.id + '.' + d.id].discs || 0 : 0)); };
  const discs = () => TRACKS.reduce((a, t) => a + discsOf(t), 0);
  const DISC = n => '◉'.repeat(n) + '○'.repeat(3 - n);
  const titleOf = n => TITLES.filter(x => n >= x[0]).pop()[1];
  const unlocked = t => t.cost === 0 || (window.BS_TEST_BUILD && api.load('allOpen', false)) || api.load('unlock.' + t.id, false);

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
      master = actx.createGain(); master.gain.value = .7; master.connect(comp).connect(glue).connect(lim).connect(actx.destination); window.__k7out = lim; /* pour les tests : enregistrer la sortie */
      pump = actx.createGain(); pump.connect(master);
      shelf = actx.createBiquadFilter(); shelf.type = 'highshelf'; shelf.frequency.value = 5000; shelf.gain.value = 0; shelf.connect(pump);
      tone = actx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 20000; tone.Q.value = .8; tone.connect(shelf);
      // la musique se pousse quand la voix chante (gain séparé, pour ne pas se battre avec le reste)
      vduck = actx.createGain(); vduck.connect(tone);
      const low = actx.createBiquadFilter(); low.type = 'lowshelf'; low.frequency.value = 110; low.gain.value = 3.5; low.connect(vduck);
      music = actx.createGain(); music.gain.value = .8; music.connect(low);
      capInit(low);
      drumBus(); renderKit().catch(() => {});
      // bus de la voix : on coupe le grave qui bave, on avance la présence, on tient le volume
      const vhp = actx.createBiquadFilter(), vpk = actx.createBiquadFilter(), vcomp = actx.createDynamicsCompressor();
      vhp.type = 'highpass'; vhp.frequency.value = 230; vpk.type = 'peaking'; vpk.frequency.value = 2800; vpk.Q.value = 1; vpk.gain.value = 4;
      vcomp.threshold.value = -24; vcomp.ratio.value = 5; vcomp.attack.value = .004; vcomp.release.value = .1;
      vox = actx.createGain(); vox.gain.value = .8*voiceVol(); vox.connect(vhp).connect(vpk).connect(vcomp).connect(master);
      const rev = actx.createConvolver(); rev.buffer = impulse(2.4, 3); const revOut = actx.createGain(); revOut.gain.value = .32; revIn = actx.createGain(); revIn.connect(rev).connect(revOut).connect(master);
      setTimeout(loadVoice, 0);
      dly = actx.createDelay(2); const fb = actx.createGain(), dlf = actx.createBiquadFilter(), dlyOut = actx.createGain(); fb.gain.value = .42; dlf.type = 'lowpass'; dlf.frequency.value = 2400; dlyOut.gain.value = .38;
      dlyIn = actx.createGain(); dlyIn.connect(dly); dly.connect(dlf).connect(fb).connect(dly); dlf.connect(dlyOut).connect(master);
    }catch(e){ actx = null; }
  }
  /* ---------- banque de sons : une vraie batterie rendue une fois au démarrage (saturée, compressée, avec sa pièce), comme des échantillons ---------- */
  let kit = null, drums = null;
  function drumBus(){
    // bus batterie : saturation qui épaissit, compresseur à attaque lente qui fait claquer, et pas de pompe (la grosse caisse ne s'écrase plus elle-même)
    const sat = actx.createWaveShaper(), cmp = actx.createDynamicsCompressor(), out = actx.createGain();
    sat.curve = curve(1.5); sat.oversample = '2x'; cmp.threshold.value = -14; cmp.ratio.value = 3.5; cmp.attack.value = .007; cmp.release.value = .09; cmp.knee.value = 4; out.gain.value = 1.15;
    drums = actx.createGain(); drums.connect(sat).connect(cmp).connect(out).connect(master);
  }
  async function renderKit(){
    const sr = actx.sampleRate, OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if(!OAC) return;
    const noiseOf = oc => { const b = oc.createBuffer(1, sr*2, sr), d = b.getChannelData(0); for(let i=0;i<d.length;i++) d[i] = Math.random()*2 - 1; return b; };
    const roomOf = (oc, sec, dec) => { const n = Math.floor(sr*sec), b = oc.createBuffer(2, n, sr); for(let c=0;c<2;c++){ const d = b.getChannelData(c); for(let i=0;i<n;i++) d[i] = (Math.random()*2 - 1)*Math.pow(1 - i/n, dec); } return b; };
    const env = (g, peak, a, d, t0) => { t0 = t0 || 0; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(peak, t0 + a); g.gain.exponentialRampToValueAtTime(.0005, t0 + a + d); };
    async function R(dur, build){
      const oc = new OAC(2, Math.ceil(sr*dur), sr), out = oc.createGain(); out.connect(oc.destination); build(oc, out, noiseOf(oc));
      const b = await oc.startRendering(); let pk = 0; for(let c=0;c<2;c++){ const d = b.getChannelData(c); for(let i=0;i<d.length;i++) pk = Math.max(pk, Math.abs(d[i])); }
      for(let c=0;c<2;c++){ const d = b.getChannelData(c); for(let i=0;i<d.length;i++) d[i] *= .92/(pk || 1); } return b;
    }
    const osc2 = (oc, type, f, dst) => { const o = oc.createOscillator(); o.type = type; o.frequency.value = f; o.connect(dst); o.start(0); return o; };
    const shp = (oc, k, dst) => { const w = oc.createWaveShaper(); w.curve = curve(k); w.oversample = '4x'; w.connect(dst); return w; };
    const noiseThru = (oc, nb, type, f, q, dst) => { const s = oc.createBufferSource(), fl = oc.createBiquadFilter(); s.buffer = nb; fl.type = type; fl.frequency.value = f; fl.Q.value = q || 1; s.connect(fl).connect(dst); s.start(0); return fl; };
    const room = (oc, src, out, sec, dec, mix) => { const cv2 = oc.createConvolver(), g = oc.createGain(); cv2.buffer = roomOf(oc, sec, dec); g.gain.value = mix; src.connect(cv2).connect(g).connect(out); };
    const K = {};
    // grosse caisse : chute de hauteur rapide, corps saturé, clic du batteur
    K.kick = await R(.5, (oc, out, nb) => { const s = shp(oc, 2.4, out), g = oc.createGain(); g.connect(s); const o = osc2(oc, 'sine', 190, g); o.frequency.setValueAtTime(190, 0); o.frequency.exponentialRampToValueAtTime(55, .06); o.frequency.exponentialRampToValueAtTime(44, .4); env(g, 1, .002, .42);
      const c = oc.createGain(); c.connect(out); noiseThru(oc, nb, 'bandpass', 3500, .8, c); env(c, .55, .0005, .012); });
    K.kick808 = await R(1.1, (oc, out) => { const s = shp(oc, 1.8, out), g = oc.createGain(); g.connect(s); const o = osc2(oc, 'sine', 130, g); o.frequency.setValueAtTime(130, 0); o.frequency.exponentialRampToValueAtTime(46, .08); env(g, 1, .002, 1); });
    K.kickRock = await R(.4, (oc, out, nb) => { const s = shp(oc, 2, out), g = oc.createGain(); g.connect(s); const o = osc2(oc, 'sine', 150, g); o.frequency.setValueAtTime(150, 0); o.frequency.exponentialRampToValueAtTime(58, .035); env(g, 1, .001, .26);
      const c = oc.createGain(); c.connect(out); noiseThru(oc, nb, 'lowpass', 4000, .7, c); env(c, .7, .0005, .025); room(oc, s, out, .3, 4, .18); });
    // caisse claire : peau accordée + timbre, saturée, dans une petite pièce
    const snareB = (oc, out, nb, tone, noiseD, rv) => { const bus = oc.createGain(), s = shp(oc, 1.8, out); bus.connect(s);
      const g1 = oc.createGain(); g1.connect(bus); const o1 = osc2(oc, 'triangle', tone, g1); o1.frequency.setValueAtTime(tone*1.15, 0); o1.frequency.exponentialRampToValueAtTime(tone, .02); env(g1, .9, .001, .09);
      const g2 = oc.createGain(); g2.connect(bus); osc2(oc, 'sine', tone*1.75, g2); env(g2, .4, .001, .05);
      const g3 = oc.createGain(); g3.connect(bus); const hp = noiseThru(oc, nb, 'highpass', 1400, .7, g3); env(g3, .8, .001, noiseD);
      room(oc, s, out, rv[0], rv[1], rv[2]); };
    K.snare = await R(.6, (oc, out, nb) => snareB(oc, out, nb, 190, .2, [.35, 3, .25]));
    K.snareRock = await R(.7, (oc, out, nb) => snareB(oc, out, nb, 220, .26, [.5, 2.5, .3]));
    // caisse « années 80 » : grosse réverbération coupée net
    K.snareGated = await R(.45, (oc, out, nb) => { const gate = oc.createGain(); gate.connect(out); gate.gain.setValueAtTime(1, 0); gate.gain.setValueAtTime(1, .3); gate.gain.linearRampToValueAtTime(0, .34); snareB(oc, gate, nb, 180, .25, [1.2, 1.2, .9]); });
    K.clap = await R(.5, (oc, out, nb) => { const bus = oc.createGain(); bus.connect(out); const fl = noiseThru(oc, nb, 'bandpass', 1200, .9, bus);
      bus.gain.setValueAtTime(0, 0); [0, .011, .023, .036].forEach((t, i) => { bus.gain.setValueAtTime(i === 3 ? .9 : .75, t); bus.gain.exponentialRampToValueAtTime(.05, t + .009); }); bus.gain.setValueAtTime(.9, .036); bus.gain.exponentialRampToValueAtTime(.0005, .3); room(oc, bus, out, .4, 3, .3); });
    K.snap = await R(.2, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); noiseThru(oc, nb, 'bandpass', 2600, 2.5, g); env(g, 1, .0005, .05); room(oc, g, out, .25, 3, .25); });
    K.rim = await R(.15, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); osc2(oc, 'triangle', 1750, g); env(g, .8, .0005, .03); const g2 = oc.createGain(); g2.connect(out); noiseThru(oc, nb, 'bandpass', 3200, 3, g2); env(g2, .6, .0005, .02); });
    // charleston métallique (six carrés désaccordés, comme une boîte à rythmes), ouverts ou fermés
    const metal = (oc, dst, k) => { const fl = oc.createBiquadFilter(), hp = oc.createBiquadFilter(); fl.type = 'bandpass'; fl.frequency.value = 10000; hp.type = 'highpass'; hp.frequency.value = 7000; fl.connect(hp).connect(dst); [205.3, 304.4, 369.6, 522.7, 540, 800].forEach(f => osc2(oc, 'square', f*k, fl)); };
    K.hatC = await R(.12, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); metal(oc, g, 1); const g2 = oc.createGain(); g2.connect(out); noiseThru(oc, nb, 'highpass', 8000, .7, g2); env(g, .9, .0005, .045); env(g2, .5, .0005, .03); });
    K.hatO = await R(.6, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); metal(oc, g, 1); const g2 = oc.createGain(); g2.connect(out); noiseThru(oc, nb, 'highpass', 7500, .7, g2); env(g, .9, .001, .38); env(g2, .5, .001, .3); });
    K.crash = await R(2.2, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); metal(oc, g, 1.35); const g2 = oc.createGain(); g2.connect(out); noiseThru(oc, nb, 'highpass', 4500, .5, g2); env(g, .6, .002, 1.9); env(g2, 1, .002, 1.6); });
    K.ride = await R(1.2, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); metal(oc, g, 1.9); env(g, .7, .001, 1); const g2 = oc.createGain(); g2.connect(out); osc2(oc, 'sine', 3200, g2); env(g2, .25, .001, .5); });
    K.shaker = await R(.15, (oc, out, nb) => { const g = oc.createGain(); g.connect(out); noiseThru(oc, nb, 'highpass', 5500, .7, g); g.gain.setValueAtTime(0, 0); g.gain.linearRampToValueAtTime(.8, .015); g.gain.exponentialRampToValueAtTime(.0005, .09); });
    K.tom = await R(.6, (oc, out) => { const s = shp(oc, 1.6, out), g = oc.createGain(); g.connect(s); const o = osc2(oc, 'sine', 160, g); o.frequency.setValueAtTime(160, 0); o.frequency.exponentialRampToValueAtTime(100, .3); env(g, 1, .001, .45); room(oc, s, out, .5, 2.5, .3); });
    kit = K;
  }
  // joue un échantillon de la batterie (renvoie false tant que la banque n'est pas prête)
  function smp(name, at, vol, o2){
    if(!useAudio || !kit || !kit[name] || !drums) return false; o2 = o2 || {};
    const T = RT(at), s = actx.createBufferSource(), g = actx.createGain(); s.buffer = kit[name]; s.playbackRate.value = tapeK()*(o2.pitch || 1); g.gain.value = vol;
    route(s, g, o2.bus || drums, o2, T); s.start(T); return true;
  }
  /* ---------- cordes pincées (Karplus-Strong) : guitare claire ou saturée, calculée une fois par note ---------- */
  const ksCache = {};
  function ksBuf(f, dist, strs){
    const key = f.toFixed(2) + ':' + dist + ':' + strs.join(','); if(ksCache[key]) return ksCache[key];
    const sr = actx.sampleRate, n = Math.round(sr*(dist ? 1.4 : 1.1)), out = new Float32Array(n);
    strs.forEach((m, si) => { const N = Math.max(2, Math.round(sr/(f*m))), buf = new Float32Array(N); for(let i=0;i<N;i++) buf[i] = Math.random()*2 - 1;
      let idx = 0, prev = 0; const off = Math.round(si*sr*.007), damp = dist ? .997 : .994; // les cordes sont grattées l'une après l'autre
      for(let i=off;i<n;i++){ const cur = buf[idx]; buf[idx] = .5*(cur + prev)*damp; prev = cur; idx = (idx + 1) % N; out[i] += cur*.35; } });
    if(dist){ for(let i=0;i<n;i++) out[i] = Math.tanh(out[i]*7)*.55; }
    const b = actx.createBuffer(1, n, sr); b.getChannelData(0).set(out); return ksCache[key] = b;
  }
  function pluckStr(bus, at, f, vol, dur, dist, strs, o2){
    if(!useAudio) return; o2 = o2 || {}; const T = RT(at);
    for(const side of (o2.wide ? [-1, 1] : [0])){
      const s = actx.createBufferSource(), lp = actx.createBiquadFilter(), pk = actx.createBiquadFilter(), g = actx.createGain();
      s.buffer = ksBuf(f, dist, strs); s.playbackRate.value = tapeK()*(1 + side*.002);
      lp.type = 'lowpass'; lp.frequency.value = o2.palm ? 1100 : dist ? 4300 : 6000; pk.type = 'peaking'; pk.frequency.value = dist ? 1600 : 2500; pk.gain.value = 3;
      g.gain.setValueAtTime(vol, T); g.gain.setValueAtTime(vol, T + Math.max(.01, dur - .04)); g.gain.linearRampToValueAtTime(0, T + dur);
      s.connect(lp).connect(pk); route(pk, g, bus, {pan: side*.55 + (o2.pan || 0), rev: o2.rev ?? .12, dly: o2.dly || 0}, T); s.start(T); s.stop(T + dur + .05);
    }
  }
  /* ---------- piano : chaque note calculée une fois (partiels légèrement désaccordés comme une vraie corde, marteau) ---------- */
  const pnoCache = {};
  function pianoBuf(f){
    const key = Math.round(f*4); if(pnoCache[key]) return pnoCache[key];
    const sr = actx.sampleRate, n = Math.round(sr*2), d = new Float32Array(n);
    for(let k=1;k<=8;k++){ const fk = f*k*Math.sqrt(1 + .0003*k*k); if(fk > sr/2.3) break; const a = 1/Math.pow(k, 1.2), r = Math.exp(-(1.4 + k*.9)/sr), w = 2*Math.PI*fk/sr, ph = Math.random()*6.28; let e = a;
      for(let i=0;i<n;i++){ d[i] += e*Math.sin(w*i + ph); e *= r; } }
    const hm = Math.round(sr*.004); for(let i=0;i<hm;i++) d[i] += (Math.random()*2 - 1)*.25*(1 - i/hm);
    let pk = 0; for(let i=0;i<n;i++) pk = Math.max(pk, Math.abs(d[i])); for(let i=0;i<n;i++) d[i] *= .8/pk;
    const b = actx.createBuffer(1, n, sr); b.getChannelData(0).set(d); return pnoCache[key] = b;
  }
  function pianoNote(bus, at, f, vol, dur, o2){
    if(!useAudio) return; o2 = o2 || {}; const T = RT(at), s = actx.createBufferSource(), g = actx.createGain(), lp = actx.createBiquadFilter();
    s.buffer = pianoBuf(f); s.playbackRate.value = tapeK(); lp.type = 'lowpass'; lp.frequency.value = 5500; dur = Math.min(dur || 1.6, 1.9);
    g.gain.setValueAtTime(vol, T); g.gain.setValueAtTime(vol, T + dur); g.gain.linearRampToValueAtTime(0, T + dur + .12);
    s.connect(lp); route(lp, g, bus, {pan: o2.pan || 0, rev: o2.rev ?? .25}, T); s.start(T); s.stop(T + dur + .15);
  }
  /* ---------- la platine : on garde en continu les 3 dernières secondes de la musique, pour la scratcher pour de vrai ---------- */
  let ring = null, ringW = 0, ringT = 0;
  function capInit(src){
    try{ const cap = actx.createScriptProcessor(2048, 2, 1), z = actx.createGain(); ring = new Float32Array(Math.round(actx.sampleRate*3)); z.gain.value = 0;
      cap.onaudioprocess = e => { const ib = e.inputBuffer, a = ib.getChannelData(0), b = ib.numberOfChannels > 1 ? ib.getChannelData(1) : a;
        for(let i=0;i<a.length;i++){ ring[ringW] = (a[i] + b[i])*.5; ringW = (ringW + 1) % ring.length; } ringT = e.playbackTime || actx.currentTime; };
      src.connect(cap); cap.connect(z).connect(actx.destination); }catch(e){ ring = null; }
  }
  // le disque sous l'aiguille : le dernier temps entier du morceau (une attaque de batterie + l'accord), à l'endroit et à l'envers
  function grabRecord(){
    if(!useAudio || !ring || !ringT) return null;
    const sr = actx.sampleRate, len = Math.round(sr*.5), bt = (Math.floor(clock()/bpb) - 1)*bpb, back = Math.round((ringT - RT(bt))*sr);
    if(back < len || back > ring.length - 64) return null;
    const f = actx.createBuffer(1, len, sr), r = actx.createBuffer(1, len, sr), fd = f.getChannelData(0), rd = r.getChannelData(0); let e2 = 0;
    let pk = 0; for(let i=0;i<len;i++){ const v = ring[(ringW - back + i + ring.length) % ring.length]; fd[i] = v; e2 += v*v; pk = Math.max(pk, Math.abs(v)); }
    if(Math.sqrt(e2/len) < .002) return null;
    // on remet le disque à niveau (la musique a pu être baissée), puis on fabrique sa version à l'envers
    const k = Math.min(10, .8/pk); for(let i=0;i<len;i++){ fd[i] *= k; rd[len - 1 - i] = fd[i]; }
    // l'aiguille se pose sur l'attaque : le coup le plus fort du début du temps
    let cue = 0, best = 0; for(let i=0;i<Math.round(sr*.22);i++){ const v = Math.abs(fd[i]); if(v > best){ best = v; cue = i; } }
    return {f, r, len: .5, cue: Math.max(0, cue/sr - .004)};
  }
  // un coup de main sur le disque : vers l'avant on lit l'attaque, vers l'arrière on la relit à l'envers ; la vitesse suit le geste (lente, rapide, lente)
  function scratchHit(at, back, rec){
    if(!useAudio) return; rec = rec || (lastRec = lastRec || grabRecord()); if(!rec){ I.wik(at, back); return; }
    const T = RT(at), D = Math.min(.2, bpb/3), L = .12, src = actx.createBufferSource(), g = actx.createGain(), hp = actx.createBiquadFilter();
    src.buffer = back ? rec.r : rec.f; hp.type = 'highpass'; hp.frequency.value = 140;
    src.playbackRate.setValueAtTime(.25, T); src.playbackRate.linearRampToValueAtTime(1.5, T + D*.35); src.playbackRate.linearRampToValueAtTime(.12, T + D);
    g.gain.setValueAtTime(0, T); g.gain.linearRampToValueAtTime(.95, T + .006); g.gain.setValueAtTime(.95, T + D*.75); g.gain.linearRampToValueAtTime(0, T + D);
    src.connect(hp).connect(g).connect(master); src.start(T, back ? Math.max(0, rec.len - rec.cue - L) : rec.cue); src.stop(T + D + .03); hit('lead', at);
  }
  let lastRec = null;
  /* ---------- la voix : 7 syllabes chantées, transposées sur la mélodie ---------- */
  const VSEG = [[.05, .28, 183.9], [.65, .94, 216.2], [1.25, 1.54, 242.4], [1.91, 2.2, 280.7], [2.53, 2.84, 326.5], [3.13, 3.54, 363.6], [3.77, 4.6, 363.6]];
  let voiceBuf = null;
  function loadVoice(){
    if(voiceBuf || !actx || !window.K7_VOICE) return;
    try{ const bin = atob(window.K7_VOICE.split(',')[1]), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i);
      actx.decodeAudioData(u.buffer, buf => { voiceBuf = buf; }, () => {}); }catch(e){}
  }
  // nos enregistrements (mémos vocaux) : où commence et finit le son utile, sa hauteur, son crête pour le niveau
  const RECS = {titre: {url: 'audio/titre.m4a', a: 2.05, b: 3.65, peak: .374}, voix: {url: 'audio/voix.m4a', a: .62, b: 3.75, peak: .221, f0: 317}, bravo: {url: 'audio/bravo.m4a', a: 0, b: 4.95, peak: .143}};
  const recBuf = {};
  function loadRecs(){
    if(!actx) return;
    for(const [k, r] of Object.entries(RECS)) if(!recBuf[k] && !r.loading){ r.loading = true;
      fetch(r.url).then(x => x.arrayBuffer()).then(ab => new Promise((ok, ko) => actx.decodeAudioData(ab, ok, ko))).then(b => { recBuf[k] = b; }).catch(() => { r.loading = false; }); }
  }
  // joue un morceau d'enregistrement, niveau égalisé ; at = heure audio réelle
  function playRec(k, T, vol, o2){
    const b = recBuf[k], r = RECS[k]; if(!b || !useAudio) return false; o2 = o2 || {};
    const src = actx.createBufferSource(), gn = actx.createGain(), pr = o2.rate || 1, a = o2.seg ? o2.seg[0] : r.a + (o2.from || 0), len = Math.min(o2.len || 99, (o2.seg ? o2.seg[1] : r.b) - a), dur = len/pr, g = o2.seg ? vol*.1/o2.seg[3] : vol*.5/r.peak;
    src.buffer = b; src.playbackRate.value = pr;
    gn.gain.setValueAtTime(0, T); gn.gain.linearRampToValueAtTime(g, T + (o2.att || .01)); gn.gain.setValueAtTime(g, T + Math.max(.02, dur - (o2.rel || .08))); gn.gain.linearRampToValueAtTime(0, T + dur);
    let n = src; if(o2.hp){ const f2 = actx.createBiquadFilter(); f2.type = 'highpass'; f2.frequency.value = o2.hp; n.connect(f2); n = f2; }
    if(o2.lp){ const f2 = actx.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = o2.lp; n.connect(f2); n = f2; }
    route(n, gn, o2.bus || master, {rev: o2.rev ?? .15, dly: o2.dly || 0, pan: o2.pan || 0}, T); src.start(T, a, len + .02); src.stop(T + dur + .05);
    return true;
  }
  // la belle voix chante un arpège (la, do#, mi, sol#, la#) : ses notes tenues, mesurées sur l'enregistrement [début, fin, hauteur, niveau]
  const VSEGS = [[.80, 1.28, 223, .043], [1.48, 1.75, 281, .046], [2.50, 2.73, 333, .13], [3.08, 3.28, 416, .21], [3.40, 3.56, 452, .12]];
  // on prend la note tenue la plus proche de celle à chanter, pour la transposer le moins possible (et rester juste)
  function voiceNote(bus, at, f, vol, o2){
    if(!recBuf.voix) return false; o2 = o2 || {};
    const ft = f*tapeK(); let best = null;
    for(const sg of VSEGS){ let pr = ft/sg[2]; while(pr > 1.42) pr /= 2; while(pr < .71) pr *= 2;
      const cost = Math.abs(12*Math.log2(pr)) + (o2.long ? Math.max(0, .45 - (sg[1] - sg[0]))*12 : 0);
      if(!best || cost < best.cost) best = {sg, pr, cost}; }
    const {sg, pr} = best, len = Math.min(sg[1] - sg[0], o2.long ? 9 : .3*pr);
    playRec('voix', RT(at), vol*.9, {bus, seg: sg, rate: pr*(o2.det || 1), len, att: .02, rel: o2.long ? .2 : .08, hp: Math.max(160, o2.hp || 0), lp: o2.lp, rev: o2.rev ?? .3, dly: o2.dly || 0, pan: o2.pan || 0});
    hit('lead', at); return true;
  }
  // les applaudissements, plus ou moins nourris
  // une salle entière : on empile l'enregistrement, décalé, accéléré ou ralenti un peu et étalé en stéréo
  function applause(T, amount, bus){
    amount = Math.max(.3, Math.min(1, amount)); const n = Math.round(5 + 9*amount), len = 2.4 + 2.2*amount;
    for(let i=0;i<n;i++){ const pr = .86 + Math.random()*.28, from = Math.random()*Math.max(0, RECS.bravo.b - len*pr - .05);
      playRec('bravo', T + Math.random()*.3*(i ? 1 : 0), (.55 + .35*amount)*1.2/Math.sqrt(n), {bus, rate: pr, from, len: len*pr, att: .15 + Math.random()*.2, rel: .9 + Math.random()*.8, rev: .3, pan: (i/(n - 1)*2 - 1)*.85}); }
  }
  const voiceVol = () => api.load('voiceVol', api.load('voice', true) ? 100 : 0)/100;
  const voiceOn = () => voiceVol() > 0 && (voiceBuf || recBuf.voix);
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
  function leadOf(kind, at, f, v){
    switch(kind){
      case 'piano': pianoNote(music, at, f, v*1.6, .9); break;
      case 'talk': I.talk(at, f, .26); break;
      case 'melodica': I.melodica(at, f, .32); break;
      case 'gtrlead': pluckStr(music, at, f, v*3.2, .45, true, [1], {dly: .2, rev: .2}); break;
      case 'synthbrass': for(const dt of [-9, 0, 9]) osc(music, 'sawtooth', f, at, .26, v*.32, {a: .006, detune: dt, lp: [5200, 1400, 2.5], rev: .2, dly: .15}); osc(music, 'sawtooth', f/2, at, .26, v*.2, {lp: [2200, 700, 1]}); break;
      case 'brass': for(const dt of [-7, 7]) osc(music, 'sawtooth', f, at, .24, v*.4, {a: .015, detune: dt, lp: [3400, 1200, 2], vib: 5.5, rev: .15}); break;
      case 'piano': osc(music, 'triangle', f, at, .5, v*.9, {lp: [4200, 1500, 1], rev: .2}); osc(music, 'sine', f*2, at, .3, v*.25); break;
      case 'chip': osc(music, 'square', f, at, .13, v*.4, {dly: .15}); break;
      case 'whistle': osc(music, 'sine', f*2, at, .32, v*.85, {a: .02, vib: 6, rev: .35, dly: .2}); break;
      case 'marimba': osc(music, 'sine', f, at, .3, v*1.1, {rev: .15}); osc(music, 'sine', f*4, at, .05, v*.3); break;
      case 'bell': osc(music, 'sine', f, at, .45, v, {rev: .3, dly: .2}); osc(music, 'sine', f*2.76, at, .14, v*.3); break;
      case 'supersaw': I.supersaw(at, f, .22, v*.9); break;
      default: I.pluck(music, at, f, v, {dly: .2});
    }
  }
  function lead(at, f, v, player){
    // la note du joueur sort sur le bus principal (pas sous la musique), plus fort, avec une attaque nette
    const m0 = music; if(player) music = master;
    try{ if(tr.song) leadOf(tr.song.lead, at, f, v); else switch(tr.style){
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
  // comme dans Guitar Hero : tu joues une partie du morceau. Chaque geste réussi ajoute un coup d'orchestre du style
  // (l'accord du moment, la basse, une doublure qui grossit avec le combo) ; un raté fait décrocher ta partie une mesure
  const STAB = {french: 'filter', disco: 'brass', reggae: 'skank', synthwave: 'brass', dnb: 'piano', punk: 'power'};
  let stemCut = -9;
  function playerHit(o, g, at){
    if(!tr.song || !useAudio) return;
    const S = tr.song, deg = chordOf(Math.floor(o.beat/4)), v = g === 'perfect' ? 1 : g === 'good' ? .8 : .6, kind = STAB[tr.style] || 'brass', strong = Math.abs(o.beat - Math.round(o.beat)) < .01, m0 = music; music = master;
    try{
      if(g === 'perfect'){ osc(master, 'sine', 120, at, .1, .2, {glide: 52, gt: .08}); noise(master, at, .03, .07, 'highpass', 6000); }
      if(g === 'perfect' && trance >= 2 && strong) I.supersaw(at, freq(deg + 7, 4), bpb*.4, .12);
      if(combo >= 25 && combo % 25 === 0){ I.boom(at, .9); I.crash(at); I.swell(at, bpb); }
      if(o.k === 'J'){
        I.kick(at, .55*v);
        if(trance >= 1) I.chord(at, [deg, deg + 2, deg + 4], bpb*.22, kind, 4200);
        if(trance >= 3 && strong) I.crash(at);
      } else {
        I.chord(at, [deg, deg + 2, deg + 4].concat(trance >= 2 ? [deg + 7] : []), bpb*(o.k === 'C' ? .45 : .9), kind, 3600);
        if(strong || o.k !== 'C') I.bass(at, freq(deg, 1), bpb*.45, S.bass.kind);
        if(g === 'perfect' && trance >= 1 && o.k === 'C') leadOf(S.lead, at, freq(o.deg + 7, 4), .05*v); // la doublure à l'octave
      }
    } finally { music = m0; }
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
      if(!voiceNote(vox, at, f, vol*(last ? 1 : .8), base)) sing(vox, at, f, syl, vol*(last ? 1 : .8), base);
      // les doublures arrivent avec le combo : une voix seule d'abord, un chœur ensuite
      if(lvl >= 2 && fx.dbl && !voiceNote(vox, at, f*Math.pow(2, fx.dbl/12), vol*.28, {...base, pan: .3})) sing(vox, at, f*Math.pow(2, fx.dbl/12), syl, vol*.28, {...base, pan: .3});
      if(lvl >= 2 && fx.chorus){ for(const [dt, pn] of [[1.006, -.6], [.994, .6]]) if(!voiceNote(vox, at, f, vol*.3, {...base, det: dt, pan: pn})) sing(vox, at, f, syl, vol*.3, {...base, det: dt, pan: pn}); }
      if(fx.robot) I.talk(at, f, last ? .35 : .14);
      if(fx.stut && last && lvl >= 2){ sing(vox, at + bpb/2, f, syl, vol*.45, {...base, long: false}); }
      if(lvl >= 3 && last && !voiceNote(vox, at + .015, freq(deg + 2, 4), vol*.35, {...base, pan: -.4})) sing(vox, at + .015, freq(deg + 2, 4), syl + 1, vol*.35, {...base, pan: -.4});
      if(lvl >= 5 && last && !voiceNote(vox, at + .03, freq(deg + 4, 4), vol*.3, {...base, pan: .45})) sing(vox, at + .03, freq(deg + 4, 4), syl + 2, vol*.3, {...base, pan: .45});
    }
    // la mélodie de fond se tait et la musique se pousse le temps de la phrase
    voiceFrom = when; voiceUntil = end;
    if(useAudio && vduck){ const T0 = RT(when) - .02, T1 = RT(end); vduck.gain.cancelScheduledValues(T0); vduck.gain.setTargetAtTime(.62, T0, .015); vduck.gain.setTargetAtTime(1, T1, .12); }
    judges.push({txt: '♪ x' + combo, x: W/2, y: H*.3, t: 0, big: lvl >= 3});
  }
  function curve(k){ if(curves[k]) return curves[k]; const n = 1024, c = new Float32Array(n); for(let i=0;i<n;i++){ const x = i/(n - 1)*2 - 1; c[i] = Math.tanh(k*x)/Math.tanh(k); } return curves[k] = c; }
  let lat = 0;
  // vitesse de bande variable : temps du morceau = sA + (temps réel - rA) x vitesse
  let rate = 1, rateTgt = 1, sA = 0, rA = 0, slowed = false, missRun = 0, recHits = 0, lostTime = 0, missBy = {};
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
  let sendVia = null; // pendant la musique de fin : réverbe et écho passent par ses bus, pour pouvoir les couper aussi
  function route(n, gn, bus, o2, T){
    n.connect(gn); let out = gn;
    if(o2.pan && actx.createStereoPanner){ const p = actx.createStereoPanner(); p.pan.value = o2.pan; gn.connect(p); out = p; }
    out.connect(bus);
    if(o2.rev){ const s = actx.createGain(); s.gain.value = o2.rev; out.connect(s).connect(sendVia ? sendVia.rev : revIn); }
    if(o2.dly){ const s = actx.createGain(); s.gain.value = o2.dly; out.connect(s).connect(sendVia ? sendVia.dly : dlyIn); }
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
  function duck(at, depth){ if(!useAudio) return; const el = !tr || state === 'menu' || (tr.song ? !!tr.song.pump : ['disco','synthwave','french'].includes(tr.style)), T = RT(at); /* sans morceau (menus) : pompe électro */ pump.gain.cancelScheduledValues(T); pump.gain.setValueAtTime(depth || (el ? .35 : .72), T); pump.gain.linearRampToValueAtTime(1, T + 60/(tr && state !== 'menu' ? tr.bpm : MBPM)*(el ? .6 : .35)); }

  /* instruments */
  const I = {
    kick(at, v, kind){
      v = v || 1;
      if(smp(kind === 'tight' ? 'kickRock' : kind === 'dub' ? 'kick808' : kit && kit[kind] ? kind : 'kick', at, .95*v)){ duck(at); hit('kick', at); return; }
      if(kind === 'tight'){ osc(music, 'sine', 220, at, .18, 1.05*v, {glide: 50, gt: .05}); osc(music, 'square', 2200, at, .006, .1*v); noise(music, at, .02, .4*v, 'highpass', 3000); }
      else if(kind === 'dub'){ osc(music, 'sine', 120, at, .45, 1*v, {glide: 38, gt: .2}); }
      else { osc(music, 'sine', 170, at, .34, 1.1*v, {glide: 44, gt: .09}); osc(music, 'triangle', 95, at, .2, .35*v, {glide: 40}); osc(music, 'square', 1800, at, .008, .12*v); noise(music, at, .014, .3*v, 'highpass', 2500); }
      duck(at); hit('kick', at);
    },
    snare(at, v, o2){ v = v || 1; o2 = o2 || {}; if(smp(o2.kind || 'snare', at, .62*v, {rev: o2.rev ?? .1, dly: o2.dly || 0})){ hit('snare', at); return; } noise(music, at, .2, .5*v, 'bandpass', 2200, 1600, false, {q: .8, rev: o2.rev ?? .12, dly: o2.dly || 0}); noise(music, at, .09, .25*v, 'highpass', 5000); osc(music, 'triangle', 210, at, .11, .45*v, {glide: 150}); hit('snare', at); },
    rim(at, v){ if(smp('rim', at, .5*(v || 1), {dly: .45, rev: .2})){ hit('snare', at); return; } noise(music, at, .04, .3*(v || 1), 'bandpass', 2600, null, false, {q: 6, dly: .45, rev: .2}); osc(music, 'triangle', 820, at, .03, .15, {dly: .3}); hit('snare', at); },
    clap(at, rev){ if(smp('clap', at, .62, {rev: rev || .15})){ hit('snare', at); return; } for(let i=0;i<3;i++) noise(music, at + i*.012, .1, .28, 'bandpass', 1300, null, false, {rev: rev || .18, pan: (i - 1)*.3}); hit('snare', at); },
    hat(at, v, open, pan){ if(smp(open ? 'hatO' : 'hatC', at, Math.min(.8, v*4.2), {pan: pan || 0})){ hit('hat', at); return; } noise(music, at, open ? .2 : .04, v, 'highpass', open ? 7500 : 9000, null, false, {pan: pan || 0}); hit('hat', at); },
    ride(at, v){ if(smp('ride', at, .22*(v || 1), {pan: .35})){ hit('hat', at); return; } noise(music, at, .45, .07*(v || 1), 'bandpass', 5200, null, false, {q: 1.5, pan: .35}); osc(music, 'square', 3300, at, .3, .012); hit('hat', at); },
    crash(at){ if(smp('crash', at, .42, {rev: .2})){ hit('kick', at); return; } noise(music, at, 1.8, .26, 'highpass', 3000, null, false, {rev: .35}); osc(music, 'sine', 70, at, .6, .45, {glide: 34}); hit('kick', at); },
    // l'impact : une basse qui tombe, un souffle grave, et la musique qui s'écarte une demi-seconde
    boom(at, v){ v = v || 1; osc(master, 'sine', 170, at, .75, .5*v, {glide: 32, gt: .4}); osc(master, 'triangle', 90, at, .25, .22*v, {glide: 45, gt: .2, drive: 3});
      noise(master, at, .55, .16*v, 'lowpass', 1400, null, false, {rev: .35}); noise(master, at, .9, .07*v, 'highpass', 5000, null, false, {rev: .4}); duck(at, .3); hit('kick', at); },
    // la montée avant un refrain : une note qui grimpe de deux octaves
    uplift(at, dur){ for(const dt of [-12, 12]) osc(music, 'sawtooth', 196, at, dur, .035, {a: dur*.6, glide: 1568, gt: dur, detune: dt, lp: [7000, 2500, 2], rev: .3}); },
    tom(at, f){ if(smp('tom', at, .6, {pitch: f/160, rev: .15})){ hit('snare', at); return; } osc(music, 'sine', f, at, .22, .4, {glide: f*.55, rev: .15}); hit('snare', at); },
    bass(at, f, dur, kind){
      if(kind === 'sub'){ osc(music, 'sine', f, at, dur, .5, {a: .01}); osc(music, 'sine', f, at, dur, .14, {a: .01, drive: 5}); osc(music, 'triangle', f*2, at, dur*.5, .08); }
      else if(kind === 'dub'){ osc(music, 'sine', f, at, dur, .6, {a: .015}); osc(music, 'triangle', f, at, dur*.7, .18, {lp: [600, 300, 1]}); }
      else if(kind === 'reese'){ osc(music, 'sawtooth', f, at, dur, .16, {detune: -14, lp: [800, 300, 2]}); osc(music, 'sawtooth', f, at, dur, .16, {detune: 14, lp: [800, 300, 2]}); osc(music, 'sine', f/2, at, dur, .3); }
      else if(kind === 'grit'){ osc(music, 'sawtooth', f, at, dur, .2, {drive: 6, lp: [1400, 500, 1.5]}); osc(music, 'sine', f/2, at, dur, .25); }
      else if(kind === 'funk'){ osc(music, 'square', f, at, dur, .2, {lp: [2200, 300, 7]}); osc(music, 'sine', f, at, dur, .2); }
      else if(kind === 'slap'){ osc(music, 'square', f, at, dur, .2, {lp: [3200, 380, 6]}); osc(music, 'sine', f, at, dur, .26); noise(music, at, .012, .12, 'bandpass', 2400); }
      else if(kind === '808'){ osc(music, 'sine', f, at, dur, .7, {a: .003, glide: f*.94, gt: dur, drive: 2.5}); osc(music, 'triangle', f*3, at, .03, .15, {glide: f}); }
      else if(kind === 'log'){ osc(music, 'sine', f*2.2, at, .28, .55, {glide: f, gt: .04}); osc(music, 'triangle', f, at, .2, .28, {lp: [900, 300, 2]}); }
      else if(kind === 'chip'){ osc(music, 'square', f, at, dur*.9, .1); osc(music, 'triangle', f/2, at, dur*.9, .15); }
      else if(kind === 'walk'){ osc(music, 'triangle', f, at, Math.min(dur, .5), .5, {lp: [1400, 380, 1]}); osc(music, 'sine', f, at, Math.min(dur, .5), .2); noise(music, at, .015, .06, 'lowpass', 1200); }
      else { for(const dt of [-7, 7]) osc(music, 'sawtooth', f, at, dur, .15, {detune: dt, drive: 1.8, lp: [kind === 'acid' ? 2200 : 1700, 220, kind === 'acid' ? 10 : 4]}); osc(music, 'sine', f < 70 ? f : f/2, at, dur*.9, .26); }
      hit('bass', at);
    },
    chord(at, degs, dur, kind, extra){
      if(kind === 'power'){ I.gtr(at, freq(degs[0], 2), dur, false); return; }
      if(kind === 'cleangtr'){ const f0 = freq(degs[0], 2); pluckStr(music, at, f0, .32, Math.max(dur, .25), false, degs.slice(0, 3).map(d => freq(d, 2)/f0), {wide: true, rev: .2}); hit('chords', at); return; }
      degs.forEach((d, i) => {
        const f = freq(d, 4), pan = (i - 1)*.35;
        if(kind === 'piano') pianoNote(music, at, f, .09, Math.max(.5, dur), {pan});
        else if(kind === 'strings'){ for(const dt of [-14, -6, 0, 6, 14]) osc(music, 'sawtooth', f, at, .6, .011, {a: .35, sus: dur, detune: dt + i*2, lp: [2800, 1900, 1], vib: 5, pan: pan + dt/40, rev: .45}); }
        else if(kind === 'organ'){ osc(music, 'sine', f, at, .14, .05, {pan}); osc(music, 'sine', f*2, at, .12, .035, {pan}); osc(music, 'square', f*4, at, .06, .006, {pan}); }
        else if(kind === 'clav'){ osc(music, 'square', f*2, at, .12, .026, {hp: 600, lp: [4200, 1500, 4], pan}); }
        else if(kind === 'brass'){ for(const dt of [-8, 8]) osc(music, 'sawtooth', f, at, .2, .028, {a: .015, detune: dt, lp: [2600, 900, 2], pan, rev: .15}); }
        else if(kind === 'chip') osc(music, 'square', f, at, .09, .025, {pan});
        else if(kind === 'pad') osc(music, 'sawtooth', f, at, .4, .03, {a: .15, sus: dur, lp: [2000, 700, 1], detune: i*7 - 7, pan, rev: .3});
        else if(kind === 'rhodes'){ osc(music, 'sine', f, at, dur, .07, {pan, rev: .2}); osc(music, 'triangle', f*2, at, dur*.4, .015, {pan}); }
        else if(kind === 'skank'){ osc(music, 'square', f*2, at, .1, .035, {hp: 500, lp: [3500, 1500, 1], pan, dly: .35, rev: .1}); }
        else if(kind === 'filter'){ const cut = extra || 1500; for(const dt of [-10, 10]) osc(music, 'sawtooth', f, at, dur, .034, {lp: [cut, cut*.6, 7], pan: pan + dt/40, detune: dt + i*5}); osc(music, 'square', f*2, at, dur, .013, {lp: [cut, cut*.6, 6], pan: -pan}); }
        else if(kind === 'choir'){ osc(music, 'sawtooth', f, at, .5, .025, {a: .3, sus: dur, lp: [1200, 900, 8], vib: 5, pan, rev: .45}); }
        else osc(music, 'sawtooth', f, at, dur, .035, {lp: [3200, 800, 2], pan, rev: .15});
      }); hit('chords', at);
    },
    // guitare saturée : quinte + octave, deux cordes désaccordées, baffle simulé
    gtr(at, f, dur, palm){
      if(useAudio){ pluckStr(music, at, f, palm ? .5 : .42, palm ? Math.min(dur, .13) : Math.max(dur, .2), true, [1, 1.5, 2], {wide: true, palm}); hit('chords', at); return; }
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
      try{ if(tr && tr.song) snareOf(tr.song.snare, at, v); else switch(tr ? tr.style : 'disco'){
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
      else if(kind === 'shaker'){ if(!smp('shaker', at, .28, {pan: -.3})) noise(music, at, .05, .06, 'highpass', 6000, null, false, {pan: -.3}); }
      else if(kind === 'snap') smp('snap', at, .55, {pan: .2});
      else if(kind === 'sleigh'){ for(let i=0;i<3;i++) osc(music, 'sine', 2800 + Math.random()*1100, at + i*.007, .08, .011, {pan: .35}); noise(music, at, .07, .05, 'bandpass', 7800, null, false, {pan: .35, q: 2.5}); }
      else if(kind === 'tom') I.tom(at, 120);
      else if(kind === 'siren') osc(music, 'square', 600, at, .8, .03, {glide: 1400, gt: .7, dly: .4, lp: [3000, 2000, 2]});
      else noise(music, at, .05, .1, 'bandpass', 4000);
      hit('hat', at);
    },
    riser(at, dur){ noise(music, at, dur, .22, 'bandpass', 300, 7000, true, {rev: .2}); },
    swell(at, dur){ noise(music, at, dur, .16, 'highpass', 1500, 9000, true, {rev: .4}); }
  };

  /* ---------- séquenceur des morceaux composés ---------- */
  function kickOf(kind, at, v){ if(smp(kind, at, .95*v)){ duck(at); hit('kick', at); return; } if(kind === 'chip'){ osc(music, 'square', 180, at, .11, .4*v, {glide: 50, gt: .08}); duck(at); hit('kick', at); } else I.kick(at, v, kind); }
  function snareOf(kind, at, v){
    v = v || 1;
    if(kind === 'clap') I.clap(at, .2);
    else if(kind === 'rim') I.rim(at, v);
    else if(kind === 'gated'){ I.snare(at, 1.2*v, {kind: 'snareGated', rev: .1}); }
    else if(kind === 'snareclap'){ I.snare(at, .75*v, {rev: .12}); I.clap(at, .15); }
    else if(kind === 'rock'){ I.snare(at, 1.1*v, {kind: 'snareRock', rev: .15}); }
    else if(kind === 'snap'){ if(!smp('snap', at, .7*v, {rev: .3})) I.rim(at, v); hit('snare', at); }
    else if(kind === 'chip'){ noise(music, at, .09, .32*v, 'highpass', 1500); hit('snare', at); }
    else I.snare(at, v, {rev: .15});
  }
  const songIdx = (bar, slot) => (((bar - 1) % 4 + 4) % 4)*8 + slot;
  function songStep(S, at, p, bar, L, T, deg, mine, mineJ, brk, hk){
    const hitOf = str => { const c = str ? str[p] : '.'; return c === 'x' ? 1 : c === 'o' ? .5 : 0; }, D = T >= 2 && S.drums2 ? S.drums2 : S.drums; let v;
    if(L.has('kick') && !brk && (v = hitOf(D.kick))) kickOf(S.kick, at, v);
    if(L.has('snare') && !mineJ && (v = hitOf(D.snare))) snareOf(S.snare, at, v);
    if(L.has('hat') && (v = hitOf(D.hat))) I.hat(at, .085*v, false, p % 2 ? .25 : -.2);
    if(L.has('hat') && (v = hitOf(D.ohat))) I.hat(at, .1*v, true, .2);
    if((L.has('hat') || L.has('gtr')) && (v = hitOf(D.ride))) I.ride(at, v);
    if(L.has('perc') && (v = hitOf(D.perc))) I.perc(at, v < 1 ? 'shaker' : S.perc || 'shaker');
    if(L.has('bass') && !brk){ const n = S.bass.line.find(q => q[0] === p); if(n) I.bass(at, freq(deg + n[1], 1), n[2]*bpb/4, S.bass.kind); }
    if(at < stemCut){ L = new Set(L); ['chords', 'arp', 'lead', 'gtr'].forEach(k => L.delete(k)); } // ta partie a décroché
    if(L.has('chords') && S.chords && S.chords.steps.includes(p)){ const c = S.chords, cut = c.sweep ? 450 + 3800*(.5 - .5*Math.cos((bar - 1 + p/16)*Math.PI/4)) : 0; I.chord(at, [deg, deg + 2, deg + 4].concat(c.seventh ? [deg + 6] : []), c.dur*bpb/4, c.kind, cut); }
    if(L.has('chords') && S.organ && S.organ.steps.includes(p)) I.chord(at, [deg, deg + 2, deg + 4], .1, 'organ');
    if(L.has('gtr') && S.gtr && S.gtr.steps.includes(p)) I.gtr(at, freq(deg, 2), S.gtr.dur*bpb/4, (S.gtr.palm || []).includes(p));
    if(L.has('arp') && S.arp && p % S.arp.every === 0){ const a = S.arp, n = a.notes[(p/a.every) % a.notes.length], f = freq(deg + n, a.oct);
      if(a.kind === 'chip') osc(music, 'square', f, at, .06, .03, {pan: .3});
      else if(a.kind === 'glock'){ osc(music, 'sine', f, at, .6, .04, {rev: .4, pan: .3}); osc(music, 'sine', f*2.76, at, .2, .012, {pan: .3}); }
      else if(a.kind === 'cleangtr') pluckStr(music, at, f, .3, bpb*.9, false, [1], {pan: -.25, rev: .2, dly: .15});
      else I.pluck(music, at, f, .028, {dly: .2, pan: .3}); }
    if(L.has('lead') && !mine && hk && !(at >= voiceFrom && at < voiceUntil)) leadOf(S.lead, at, freq(motif[songIdx(bar, p >> 1)], 4), .055);
  }

  /* ---------- structure de la chanson ---------- */
  function sectionOf(bar){ if(bar < 1) return null; let b = 1; for(const s of sections){ if(bar < b + s.bars) return {...s, start: b, idx: sections.indexOf(s)}; b += s.bars; } return null; }
  function chordOf(bar){ return tr.prog[((bar - 1) % tr.prog.length + tr.prog.length) % tr.prog.length]; }
  function scheduleStep(s){
    const beat = s/4, bar = Math.floor(beat/4), p = s % 16, sw = (p % 2 ? tr.swing*bpb/4 : 0), at = beat*bpb + sw;
    if(bar === 0){ if(p % 4 === 0){ if(!(voiceOn() && sing(vox, at, freq([0, 2, 4, 7][p/4], 4), [0, 2, 4, 6][p/4], .8, {long: p === 12}))) osc(master, 'square', p === 0 ? 1568 : 1046, at, .06, .12); hit('kick', at); } if(p === 0) I.riser(at, 4*bpb); return; }
    const sec = sectionOf(bar); if(!sec) return;
    const L = new Set(sec.layers), st = tr.style, deg = chordOf(bar), chord = [deg, deg + 2, deg + 4], T = sec.tier === 'rest' ? 0 : sec.tier;
    const lastBar = bar === sec.start + sec.bars - 1, next = sectionOf(bar + 1), r = freq(deg, 1);
    const prev = bar === sec.start ? sectionOf(bar - 1) : null, drop = sec.tier !== 'rest' && (T >= 2 || (prev && prev.tier === 'rest'));
    if(bar === sec.start && p === 0 && bar > 1 && sec.tier !== 'rest'){ I.crash(at); if(drop) I.boom(at, T >= 3 ? 1 : .8); }
    // avant un refrain (ou la sortie de la pause) : la caisse claire roule de plus en plus serré, une note grimpe, puis un souffle de silence
    const build = lastBar && next && next.tier !== 'rest' && (next.tier >= 2 || sec.tier === 'rest');
    if(lastBar && next && next.tier !== 'rest' && p === 0){ I.riser(at, 4*bpb); if(build) I.uplift(at, 4*bpb); }
    if(build){ if(p < 8 ? p % 4 === 0 : p < 12 ? p % 2 === 0 : p < 15) I.snare(at, .3 + p*.045); if(p === 12 || p === 14) I.tom(at, p === 12 ? 190 : 140); }
    else if(lastBar && next && p >= 12 && L.has('snare')) I.snare(at, .4 + (p - 12)*.15);
    const brk = lastBar && next && next.tier !== 'rest' && next.tier >= 2 && sec.tier !== next.tier && p >= 8;
    if(p === 0 && bar === sec.start && useAudio && trance === 0){ const T0 = RT(at), T1 = RT(at + sec.bars*4*bpb); tone.frequency.cancelScheduledValues(T0);
      if(sec.tier === 0 || sec.tier === 'rest'){ tone.frequency.setValueAtTime(sec.tier === 'rest' ? 1100 : 2600, T0); tone.frequency.exponentialRampToValueAtTime(sec.tier === 'rest' ? 3500 : 16000, T0 + Math.min(T1 - T0, 4*4*bpb)); }
      else tone.frequency.setTargetAtTime(20000, T0, .05); }
    if(brk && p === 8 && useAudio){ tone.frequency.setValueAtTime(20000, RT(at)); tone.frequency.exponentialRampToValueAtTime(600, RT(at + 2*bpb)); }
    if(p === 0 && !tr.song && !['punk', 'metal'].includes(st) && sec.tier !== 0) I.chord(at, [deg, deg + 2, deg + 4, deg + 6], 4*bpb*.95, 'pad');
    if(sec.tier === 'rest' && !tr.song && p % 2 === 0) I.pluck(music, at, freq(deg + [0, 4, 7, 9, 11, 9, 7, 4][(p/2) % 8], 8), .02, {dly: .45, pan: (p % 4 ? .5 : -.5)});
    const K0 = L.has('kick'), B0 = L.has('bass');
    const myBar = p % 2 === 0 ? buildBar(bar) : null, mine = myBar && myBar[p >> 1] && myBar[p >> 1].k === 'C', mineJ = myBar && myBar[p >> 1] && myBar[p >> 1].k === 'J';
    const K = K0 && !brk, S = L.has('snare') && !mineJ, Hh = L.has('hat'), B = B0 && !brk, Ch = L.has('chords'), A = L.has('arp'), P = L.has('perc'), Ld = L.has('lead') && !mine && !(at >= voiceFrom && at < voiceUntil), Gt = L.has('gtr');
    const mel = motif[(bar % 4)*8 + (p >> 1)], hk = p % 2 === 0 && (tr.song ? tr.song.hook[songIdx(bar, p >> 1)] != null : hookMask[p >> 1] === 1);
    if(tr.song) songStep(tr.song, at, p, bar, L, T, deg, mine, mineJ, brk, hk);
    // refrain et final : le morceau frappe plus fort (cymbale toutes les 4 mesures, basse doublée, claps, roulement de toms au final)
    if(T >= 2 && sec.tier !== 'rest' && !build){ const k4 = (bar - sec.start) % 4;
      if(p === 0 && k4 === 0 && bar !== sec.start) I.crash(at);
      if(p === 0) I.bass(at, r/2, bpb*.8, 'sub');
      if(T >= 3){ if(p % 4 === 2) I.hat(at, .06, true, .3); if((p === 4 || p === 12) && st !== 'reggae') I.clap(at, .12); if(k4 === 3 && p >= 12 && !lastBar) I.tom(at, 210 - (p - 12)*28); } }
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
        if(e.k === 'S'){ const rec = grabRecord(); for(let i=0;i<e.len;i++) scratchHit(at + i*bpb/2, i % 2 === 1, rec); }
      }
    }
  }

  /* ---------- motifs déterministes : chaque cassette se joue toujours pareil ---------- */
  const isListen = bar => { const s = sectionOf(bar); return !!(s && s.call && !diff.noCall && (bar - s.start) % 2 === 0); };
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
      const tier0 = Math.min(sec.tier + (diff.boost || 0), diff.cap ?? 3), fast = tr.bpm >= 140 ? .4 : tr.bpm >= 125 ? .75 : 1;
      // une phrase = 4 mesures A A A' B, tirées une fois pour toutes : on découvre le motif, on le rejoue, il varie, puis il relance
      const k4 = (bar - sec.start) % 4, pr = rngFrom(tr.id + ':' + diff.id + ':' + sec.idx + ':' + Math.floor((bar - sec.start)/4)), pick = list => list[Math.floor(pr()*list.length)];
      const tier = tier0 >= 2 && pr() > fast && !diff.boost ? tier0 - 1 : tier0; // en Roi, on ne soulage pas les morceaux rapides
      const A = pick(RHY[tier]), B = pick(RHY[Math.min(tier + 1, diff.cap ?? 3)]), mut = 4 + Math.floor(pr()*4);
      shp = Array.from({length: 8}, () => pr() < .5 ? 'wide' : 'tall');
      const dm = diff.dens*(tr.dens || 1); /* chaque morceau a sa densité : la difficulté monte d'une cassette à l'autre */ const keep = Array.from({length: 8}, (_, i) => i === 0 || i === 4 || pr() < dm), extra = Array.from({length: 8}, () => pr() < (dm - 1)*.5*(tr.bpm >= 140 ? .4 : 1));
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
      if(/[GOWD]/.test(acts)){ const px = rngFrom(tr.id + ':' + diff.id + ':' + sec.idx + ':' + Math.floor((bar - sec.start)/4) + 'x');
        for(let i=0;i<8;i++){ const q = slots[i]; if(!q) continue;
          if(q.k === 'J' && acts.includes('D') && px() < .6) q.k = 'D';
          else if(q.k === 'C' && acts.includes('G') && px() < .65) q.diag = true; } }
    }
    // écart minimal entre deux gestes (selon le niveau) ; en Apprenti, on ne change de geste qu'avec du temps pour réfléchir
    if(sec.tier !== 'rest'){ const prevB = bar > 1 ? buildBar(bar - 1) : null; let lastT = -9, lastK = null;
      if(prevB) for(let i=7;i>=0;i--){ const q = prevB[i]; if(q && 'CJHSOWD'.includes(q.k)){ lastT = (i - 8)*bpb/2 + (q.len || 0)*bpb/2; lastK = q.k; break; } }
      for(let i=0;i<8;i++){ const q = slots[i]; if(!q || !'CJHSOWD'.includes(q.k)) continue; const tq = i*bpb/2;
        if('CJOWD'.includes(q.k) && tq - lastT < diff.gap*('OW'.includes(lastK) ? 2 : 1)){ slots[i] = rng() < .5 ? {k: 'N'} : null; continue; }
        if(diff.easy && (q.k === 'C' || q.k === 'J') && lastK && (lastK === 'C' || lastK === 'J') && lastK !== q.k && tq - lastT < .7) q.k = lastK;
        lastT = tq + (q.len || 0)*bpb/2; lastK = q.k; } }
    slots.forEach((s, i) => { if(s){ s.deg = mdeg(i); if(s.k === 'C' && s.diag) s.shape = 'diag'; else if(s.k === 'C') s.shape = i < 7 && !(slots[i - 1] && slots[i - 1].shape === 'wide') && (shp ? shp[i] === 'wide' : rng() < .5) ? 'wide' : 'tall'; if(s.k === 'C' && revOK(tr) && rng() < .25) s.rev = true; } });
    return barCache[bar] = slots;
  }
  function spawnBar(bar){
    const slots = buildBar(bar); if(!slots) return;
    slots.forEach((s, i) => { if(!s) return; const beat = bar*4 + i/2;
      objs.push({...s, beat, time: beat*bpb, endBeat: beat + (s.len || 0)/2, endTime: (beat + (s.len || 0)/2)*bpb, done: false, born: 0, holding: false, strokes: 0, need: Math.max(2, s.len || 0)}); });
  }

  /* ---------- partie ---------- */
  function startTrack(t){
    tr = t; sections = t.sections; totalBars = 1 + sections.reduce((a, s) => a + s.bars, 0); bpb = 60/t.bpm; PPB = Math.max(108, Math.max(90, W*.25)*Math.pow(100/t.bpm, .25))*(diff.speed || 1); // une croche = au moins 54 px : les formes ne se touchent plus
    const r = rngFrom(t.id + 'motif'); const phrase = (start, end) => { const a = []; let d = start; for(let i=0;i<8;i++){ if(i === 0 || i === 4) d = [0, 2, 4][Math.floor(r()*3)] + 7*(d >= 7 ? 1 : 0) || start; else d += [-2, -1, 1, 1, 2, -1, 0][Math.floor(r()*7)]; d = Math.max(0, Math.min(11, d)); a.push(i === 7 ? end : d); } return a; };
    const A = phrase(4, 2), A2 = A.slice(0, 6).concat([A[6] + 1, 4]), Bp = phrase(7, 4); motif = A.concat(A2, Bp, A);
    if(t.song){ let last = t.song.hook.find(x => x != null); const full = t.song.hook.map(x => last = x == null ? last : x); motif = Array.from({length: 32}, (_, i) => full[songIdx(Math.floor(i/8), i % 8)]); }
    hookMask = [[1,0,0,1,0,1,0,0],[1,0,1,1,0,1,1,0],[1,1,0,1,0,0,1,0],[1,0,1,0,1,1,0,1]][Math.floor(r()*4)];
    for(const k in barCache) delete barCache[k];
    frescoInit(); paintEv = []; gulp = 0; swallows = []; objs = []; bits = []; judges = []; score = 0; combo = 0; maxCombo = 0; hearts = 3; missBy = {}; stats = {perfect: 0, good: 0, ok: 0, miss: 0}; notesRun = 0;
    beatNow = 0; nextStep = 0; jumpT = 9; hurtT = 0; energy = {kick: 0, snare: 0, hat: 0, bass: 0, chords: 0, lead: 0}; events = []; bump = 0; flashR = 0; gestures.clear(); holdState = null; scratchState = null; rot = 0; finished = false; spawned = 1; secShown = -1;
    outroStop(); hideMenu(); api.closeEnd(); api.hud(`${tx('FACE')} ${t.face} · ${t.name.toUpperCase()}`);
    muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted; loadRecs();
    if(useAudio){ actx.resume(); master.gain.cancelScheduledValues(actx.currentTime); master.gain.setValueAtTime(.85, actx.currentTime); pump.gain.cancelScheduledValues(actx.currentTime); pump.gain.setValueAtTime(1, actx.currentTime); }
    if(useAudio){ dly.delayTime.setValueAtTime(tr.delay*bpb, actx.currentTime); tone.frequency.cancelScheduledValues(actx.currentTime); tone.frequency.setValueAtTime(20000, actx.currentTime); shelf.gain.setValueAtTime(0, actx.currentTime); }
    trance = 0; aliveReset(); lastRec = null; voiceFrom = voiceUntil = 0; stemCut = -9; paused = false; pauseEl.hidden = true; if(useAudio && vduck){ vduck.gain.cancelScheduledValues(actx.currentTime); vduck.gain.setValueAtTime(1, actx.currentTime); } rings = []; celeb = null; tutoOpen = false; tutoObj = null; holdHint = 0; { const ov = stage.querySelector('#k7tutoov'); if(ov) ov.remove(); }
    if(t.song && useAudio && (t.song.lead === 'piano' || (t.song.chords && t.song.chords.kind === 'piano'))) for(let d=-3;d<=16;d++){ pianoBuf(freq(d, 4)); }
    lat = (useAudio ? (actx.outputLatency || actx.baseLatency || 0) : 0) + api.load('offset', 0)/1000;
    resetRate(); t0 = (useAudio ? actx.currentTime : performance.now()/1000) + .25;
    cueN = api.load('cue', {});
    state = 'play';
  }
  let spawned = 1;

  const hitWin = () => Tuning.num("rythme.fenetre", 200)/1000*diff.win;
  const grade = d => { const a = Math.abs(d)/diff.win; return a < Tuning.num("rythme.parfait", 55)/1000 ? 'perfect' : a < Tuning.num("rythme.bien", 110)/1000 ? 'good' : 'ok'; };
  const LABEL = {perfect: tx('PARFAIT'), good: tx('BIEN'), ok: tx('OK'), miss: tx('RATÉ')};
  const ppbNow = () => PPB*Tuning.num("bande.vitesse", 1);
  const xOf = beat => HXs + (beat - beatNow)*ppbNow();
  const tiers = () => [0, Tuning.num("transe.seuil1", 10), Tuning.num("transe.seuil2", 25), Tuning.num("transe.seuil3", 50), Tuning.num("transe.seuil4", 100)], TNAME = ['', tx('EN RYTHME'), tx('TRANSE'), tx('HYPNOSE'), tx('NIRVANA')], TMULT = [1, 1.5, 2, 3, 4];
  function setTrance(n, t){
    if(n === trance) return; const up = n > trance; trance = n;
    if(up){ if(voiceOn()){ const d0 = chordOf(Math.floor(beatNow/4)), fx = VFX[tr.style] || {}; [0, 2, 4].forEach((k2, i) => { const o3 = {long: true, pan: (i - 1)*.5, rev: .45, drive: fx.drive, hp: fx.hp, lp: fx.lp}; if(!voiceNote(vox, qNext(t + .05, 1) + i*.03, freq(d0 + k2 + 7, 4), .45*(fx.vol || 1), o3)) sing(vox, qNext(t + .05, 1) + i*.03, freq(d0 + k2 + 7, 4), 6, .45*(fx.vol || 1), o3); }); } celebrate(n); if(n >= 4 && useAudio) applause(RT(t), .5); judges.push({txt: TNAME[n], sub: tx('points x{n}', {n: TMULT[n]}), x: W/2, y: H*.12, t: 0, big: true}); I.crash(t); I.swell(t, .5); I.boom(t, .7 + n*.08); bump = 1; api.vibe([20, 30, 40]);
      if(useAudio){ const T = actx.currentTime; tone.frequency.setTargetAtTime(20000, T, .05); shelf.gain.setTargetAtTime(n*1.5, T, .4); } }
  }
  function tapeStop(t){
    judges.push({txt: tx('TRANSE BRISÉE'), x: W/2, y: H*.3, t: 0, big: true});
    if(useAudio){ const T = actx.currentTime; tone.frequency.cancelScheduledValues(T); tone.frequency.setValueAtTime(18000, T); tone.frequency.exponentialRampToValueAtTime(260, T + .3); tone.frequency.setValueAtTime(260, T + .5); tone.frequency.exponentialRampToValueAtTime(20000, T + 1.8); shelf.gain.setTargetAtTime(0, T, .2); }
    osc(master, 'sawtooth', 420, t, 1, .16, {glide: 35, gt: .9, lp: [1800, 200, 2]});
  }
  // perdre le fil : deux ratés d'affilée et la bande ralentit ; chaque geste réussi la relance un peu
  const SLOW = .78, REC = () => Tuning.num("bande.reprise", 6);
  function loseThread(t){
    slowed = true; recHits = 0; rateTgt = SLOW;
    judges.push({txt: tx('LA BANDE RALENTIT'), x: W/2, y: H*.2, t: 0, big: true});
    osc(master, 'sawtooth', 300, t, .7, .1, {glide: 120, gt: .6, lp: [1600, 300, 1]}); api.vibe(60);
  }
  function resolve(o, g, t, dir){
    if(slowed && g === 'perfect') g = 'good'; // au ralenti, pas de « parfait » : ça rapporte moins
    o.done = true; o.result = g; stats[g]++; if(g === 'miss' && 'CJHSD'.includes(o.k)){ const k = tk(o); missBy[k] = (missBy[k] || 0) + 1; } cueLearn(o, g); if(!window.__nofresco) try{ const p0 = performance.now(); paint(o, g, dir); if(window.__pt) window.__pt.push(performance.now() - p0); }catch(e){}
    const x = xOf(Math.min(o.beat, Math.max(o.beat, beatNow))), y = objY(o);
    if(g === 'miss'){
      if(trance >= 1) tapeStop(t); setTrance(0, t);
      combo = 0; hurtT = .6; flashR = .6; bump = 1; missRun++; stemCut = t + (diff.easy ? 2 : 4)*bpb; if(diff.ko && missRun >= diff.ko && !auto){ judges.push({txt: tx('LA BANDE A CASSÉ'), sub: tx('{n} ratés de suite', {n: diff.ko}), x: W/2, y: H*.22, t: 0, big: true}); api.after(400, fail); } if(deathRun && !auto){ hearts--; deathHud(); if(hearts <= 0) api.after(400, fail); } if(missRun >= 2 && !slowed) loseThread(t);
      osc(master, 'sawtooth', 110, t, .3, .22, {glide: 50}); noise(master, t, .2, .3, 'lowpass', 900);
      api.vibe(120); api.shake(9); confetti(x, y, [INK, RED], 14, 1.1);
    } else {
      missRun = 0;
      if(slowed){ recHits++; rateTgt = SLOW + (1 - SLOW)*Math.min(1, recHits/REC()); if(recHits >= REC()){ slowed = false; rateTgt = 1; judges.push({txt: tx('ÇA REPART !'), x: W/2, y: H*.2, t: 0, big: true}); I.crash(Math.max(t, o.time)); I.boom(Math.max(t, o.time), .8); } }
      if(o.k === 'H' && useAudio && tr.song){ const d0 = chordOf(Math.floor(beatNow/4)), m0 = music; music = master; try{ I.chord(t, [d0, d0 + 4], bpb*.5, STAB[tr.style] || 'brass', 3000); } finally { music = m0; } }
      combo++; maxCombo = Math.max(maxCombo, combo); comboVoice(o.k !== 'H' && o.k !== 'S' ? Math.max(t, o.time) : t); try{ rewardBeat(o.k === 'H' || o.k === 'S' ? {time: t, beat: beatNow} : o, g, t); }catch(e){} setTrance(tiers().filter(x => combo >= x).length - 1, t);
      const base = g === 'perfect' ? 100 : g === 'good' ? 60 : 25; score += Math.round(base*(1 + Math.min(combo, 50)/10)*TMULT[trance]*(slowed ? .5 : 1));
      const when = Math.max(t, o.time);
      // le joueur joue la mélodie
      if(o.k === 'C'){ lead(when, freq(o.deg, 4), g === 'perfect' ? .17 : .13, true); split(o, dir); }
      if('CJOWD'.includes(o.k)) playerHit(o, g, when);
      if(o.k === 'D'){ I.tap(master, when, 1.1); I.crash(when); I.kick(when, .9); bump = Math.max(bump, .5); }
      if(o.k === 'J') I.tap(master, Math.max(t, Math.min(o.time, t + .03)), 1);
      confetti(x, y - 10, g === 'perfect' ? [RED, PAPER, INK] : [PAPER, INK], g === 'perfect' ? 16 : 8, 1);
      if(g === 'perfect') bump = Math.max(bump, .5);
      api.vibe(g === 'perfect' ? 16 : 8);
      if(combo > 100 && combo % 50 === 0) celebrate(4, tx('ENCORE {n} !', {n: combo}));
      if(combo % 25 === 0 && !tiers().includes(combo)) judges.push({txt: tx('{n} COMBO', {n: combo}), x: W/2, y: H*.2, t: 0, big: true});
    }
    judges.push({txt: LABEL[g], g, x: 'HS'.includes(o.k) ? HXs + 30 : x, y: Y0 - 74, t: 0, sub: o.wrongWay ? (o.shape === 'tall' ? tx('coupe vers le haut ↑') : o.shape === 'diag' ? tx('en diagonale ↗︎') : tx('coupe vers la droite →')) : (g === 'good' || g === 'ok') && o.dt != null ? (o.dt > 0 ? tx('en retard') : tx('en avance')) : null});
  }

  /* ---------- gestes : un geste par doigt, la cible est l'obstacle le plus proche dans le temps ---------- */
  const gestures = new Map();
  // dans l'ordre, comme une partition : le plus ancien obstacle encore jouable reçoit le geste,
  // sauf s'il est déjà très en retard alors que le suivant tombe pile
  function pickAt(t){
    const win = hitWin(), cand = [];
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
    // deux doigts posés ensemble (à la souris : clic droit) = le double rond
    if(e.button === 2 || [...gestures.values()].some(q => !q.done && t - q.t < .15)){ const dd = firstOf(t, q => q.k === 'D'); if(dd){ for(const q of gestures.values()) q.done = true; specialObj(dd, t); return; } }
    if(e.button === 2) return;
    const g0 = {t, x: p.x, y: p.y, done: false, pts: [p]}; gestures.set(e.pointerId, g0);
    { const cc = firstOf(t, q => q.k === 'C' || q.k === 'J' || q.k === 'D'); g0.diag = !!(cc && cc.shape === 'diag'); }
    // un rond-cœur à jouer maintenant (et pas de bloc avant lui) : le coup part dès le toucher, sans attendre que le doigt se lève
    const j = firstOf(t, q => q.k === 'J'), c = firstOf(t, q => q.k === 'C');
    if(j && !(c && c.time <= j.time + .05)){ g0.tapped = true; doJump(t); }
  });
  api.on(cv, 'pointermove', e => {
    if(state === 'tuto'){ tutoMove(e); return; }
    const p = pt(e), t = now();
    if(scratchState && scratchState.id === e.pointerId){ const s = scratchState, dy = p.y - s.last.y, dx = p.x - s.last.x, v = Math.abs(dy) > Math.abs(dx) ? dy : dx; s.last = p;
      const d = Math.sign(v); if(d && d !== s.dir){ if(s.acc > 10 || s.dir === 0){ if(t < s.o.endTime + .1){ s.o.strokes++; if(!s.o.rec) s.o.rec = grabRecord(); scratchHit(t, d < 0, s.o.rec); energy.lead = 1; confetti(HXs + 10, Y0 - 10, [PAPER, INK], 3, .5); } } s.dir = d; s.acc = 0; } s.acc += Math.abs(v); return; }
    const g = gestures.get(e.pointerId); if(!g || g.done) return;
    const dx = p.x - g.x, dy = p.y - g.y, d = Math.hypot(dx, dy);
    if(d > (g.diag ? 34 : 18)){ g.done = true; doCut(g.t, {x: dx, y: dy}); }
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
  api.on(cv, 'pointerup', up); api.on(cv, 'pointercancel', up); api.on(cv, 'contextmenu', e => e.preventDefault());
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

  // deux doigts : jugé sur l'instant où le geste commence
  function specialObj(o, t){ o.dt = t - o.time; resolve(o, grade(o.dt), t); }
  let slash = null;
  function nearest(t, f){ return objs.filter(o => !o.done && f(o) && Math.abs(t - o.time) < hitWin()).sort((a, b) => Math.abs(t - a.time) - Math.abs(t - b.time))[0]; }
  // parmi les obstacles du bon type : le plus ancien encore jouable, sauf s'il est très en retard et que le suivant tombe pile
  function firstOf(t, f){
    const win = hitWin(), c = objs.filter(o => !o.done && f(o) && Math.abs(t - o.time) <= win).sort((a, b) => a.time - b.time);
    if(c[1] && t - c[0].time > .13*diff.win && Math.abs(t - c[1].time) < .06) return c[1];
    return c[0] || null;
  }
  let stretch = null;
  function doCut(t, dir){
    const l = Math.hypot(dir.x, dir.y) || 1; slash = {dx: dir.x/l, dy: dir.y/l, t: 0}; stretch = {a: Math.atan2(dir.y, dir.x), t: 0};
    const o = firstOf(t, q => q.k === 'C');
    if(window.__k7log) window.__k7log.push({cut: t, got: o && (o.k + o.beat), near: objs.filter(q => Math.abs(q.time - t) < .35).map(q => q.k + q.beat + (q.done ? '✓' : '') + ':' + Math.round((t - q.time)*1000))});
    if(o) cutObj(o, t, dir); else noise(master, t, .04, .025, 'highpass', 4000);
  }
  function doJump(t){
    const o = firstOf(t, q => q.k === 'J');
    if(o) jumpObj(o, t); else { jumpT = 0; if(firstOf(t, q => q.k === 'D')) judges.push({txt: tx('DEUX DOIGTS !'), x: HXs + 30, y: Y0 - 74, t: 0}); }
  }
  const CUTCOL = {tall: '#ff8a2b', diag: '#ffd23f', wide: '#ff3d7f'}, CUTREV = {tall: '#29c4ff', diag: '#3ff0b0', wide: '#a35cff'};
  const cutCol = o => (o.rev ? CUTREV : CUTCOL)[o.shape];
  // les coupes « à l'envers » (vers le bas, la gauche, en diagonale vers le bas) : à partir de la 6e cassette, jamais en Apprenti
  const revOK = t => TRACKS.indexOf(t) >= 5 && !diff.easy;
  const wantDir = o => { const w = o.shape === 'tall' ? {x: 0, y: -1} : o.shape === 'wide' ? {x: 1, y: 0} : o.shape === 'diag' ? {x: .7071, y: -.7071} : null; return w && o.rev ? {x: -w.x, y: -w.y} : w; };
  function rightWay(o, dir){ const w = wantDir(o); if(!w) return true; const l = Math.hypot(dir.x, dir.y) || 1; return (dir.x*w.x + dir.y*w.y)/l > (o.shape === 'diag' ? .84 : .5); }
  function cutObj(o, t, dir){ o.dt = t - o.time; let g = grade(o.dt); if(!rightWay(o, dir)){ g = 'miss'; o.wrongWay = true; } resolve(o, g, t, dir); }
  function jumpObj(o, t){ jumpT = 0; o.dt = t - o.time; resolve(o, grade(o.dt), t); }
  function split(o, dir){
    const l = Math.hypot(dir.x, dir.y) || 1, d = {x: dir.x/l, y: dir.y/l}, n = {x: -d.y, y: d.x}, x = xOf(o.beat);
    for(const s of [1, -1]) bits.push({half: true, o: {...o}, s, d, x, y: objY(o), vx: n.x*s*160 - 60, vy: n.y*s*160 - 260, rot: 0, vr: s*(5 + Math.random()*5), life: 1.4});
  }
  function confetti(x, y, cols, n, power){ for(let i=0;i<n;i++){ const a = Math.random()*6.283, sp = (120 + Math.random()*260)*power; bits.push({x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - 120, rot: Math.random()*6, vr: (Math.random() - .5)*14, w: 4 + Math.random()*6, h: 3 + Math.random()*3, c: cols[i % cols.length], life: .8 + Math.random()*.5}); } }
  let gulp = 0, swallows = [];
  function collect(o, t){
    o.done = true; o.result = 'got'; swallows.push({x: xOf(o.beat), y: objY(o), t: 0, gold: o.k === 'A'});
    { notesRun++; paintNote(o); const at = Math.max(t, o.time), fr = freq(chordOf(Math.floor(o.beat/4)) + (o.k === 'A' ? 4 : 0), 3); I.bell(at, freq(o.deg + 7, 4), .05); score += 10; }
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
    {name: tx('Nuée'), at: (prog, si) => { const an = ANCH[si % ANCH.length]; return [an[0] + jit(.3), an[1] + jit(.3)]; }},
    {name: tx('Spirale'), at: prog => { const a = prog*5*Math.PI + compoPh, r = .06 + .42*prog; return [.5 + Math.cos(a)*r + jit(.04), .5 + Math.sin(a)*r*.95 + jit(.04)]; }},
    {name: tx('Vague'), at: prog => [.04 + prog*.92 + jit(.03), .5 + .3*Math.sin(prog*6.283*compoW + compoPh) + jit(.07)]},
    {name: tx('Cœur'), at: prog => { const t = prog*6.283 + jit(.08), x = 16*Math.pow(Math.sin(t), 3), y = 13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t); return [.5 + x/38 + jit(.025), .47 - y/34 + jit(.025)]; }},
    {name: tx('Explosion'), at: (prog, si) => { const a = si*2.4 + compoPh + jit(.5), r = .05 + Math.pow(frR(), .7)*.46; return [.5 + Math.cos(a)*r, .5 + Math.sin(a)*r]; }},
    {name: tx('Pluie'), at: (prog, si) => [(si + .5)/sections.length + jit(.05), frR()]},
    {name: tx('Diagonale'), at: prog => { const k = compoW % 2 ? prog : 1 - prog; return [prog + jit(.08), k + jit(.12)]; }},
    {name: tx('Constellation'), at: (prog, si) => { const r2 = rngFrom(tr.id + 'cst' + Math.floor(prog*14) + compoPh); return [.08 + r2()*.84 + jit(.03), .08 + r2()*.84 + jit(.03)]; }}
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
  function palette(){ const i0 = Math.max(0, TRACKS.indexOf(tr)), n = 2 + Math.min(trance, 4); return Array.from({length: n}, (_, i) => SPRAY[(i0 + i) % SPRAY.length]); }
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
      ev.e = o.dt != null ? Math.max(-1, Math.min(1, o.dt/(hitWin()))) : 0;
      ev.R = (g === 'perfect' ? 11 : g === 'good' ? 9 : 7)*(1 + Math.min(combo, 80)/60)*(o.k === 'H' ? 1.25 : 1);
      ev.hold = o.k === 'H'; ev.zig = o.k === 'S'; ev.big = combo && combo % 25 === 0;
    }
    paintEv.push(ev); renderEv(fg, W, FTOP, FH - FTOP, ev);
  }
  function paintNote(o){ if(!fg) return; paintN++; const at = (compo || COMPOS[0]).at(Math.max(0, Math.min(1, beatNow/(totalBars*4))), Math.max(0, sections.indexOf(sectionOf(Math.floor(beatNow/4))))), J = GCOL.J; const ev = {seed: 'n' + paintN, nx: at[0] + jit(.08), ny: at[1] + jit(.08), R: o.k === 'A' ? 4 : 2.5, col: J[o.k === 'A' ? J.length - 1 : 0], e: 0}; paintEv.push(ev); renderEv(fg, W, FTOP, FH - FTOP, ev); }
  // l'œuvre finale : on rejoue tous les coups de pinceau sur une grande toile en papier ancien
  // le titre de l'œuvre : la composition, l'humeur de la partie, un numéro de série
  let artTitle = '';
  function nameArt(){ const moods = ['brute', 'qui groove', 'en transe', 'hypnotique', 'nirvana'], m = tx(moods[tiers().filter(x => x && maxCombo >= x).length]), n = api.load('runs', 0);
    const t2 = tx('{oeuvre} {humeur} n°{n}', {oeuvre: (compo || COMPOS[0]).name, humeur: m, n}); return t2.charAt(0).toUpperCase() + t2.slice(1); /* « hypnotic Spiral » -> « Hypnotic Spiral » */ }
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
  // GARDER MON ŒUVRE : dans l'appli, l'image passe par le cache puis la feuille de partage du téléphone (galerie, messages...) ;
  // dans un navigateur qui sait partager un fichier, son partage ; sinon un téléchargement classique
  async function shareArt(src, name){
    const cap = window.Capacitor, P = cap && cap.isNativePlatform && cap.isNativePlatform() ? cap.Plugins : null, text = tx('Ma toile peinte en rythme dans BEAT SPLASH');
    if(P && P.Filesystem && P.Share){ try{ const b64 = src.startsWith('data:') ? src.split(',')[1] : await new Promise(async r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(',')[1]); fr.readAsDataURL(await (await fetch(src)).blob()); });
        const w = await P.Filesystem.writeFile({path: name, data: b64, directory: 'CACHE'}); await P.Share.share({title: 'BEAT SPLASH', text, files: [w.uri], dialogTitle: tx('GARDER MON ŒUVRE')}); return; }
      catch(e){ if(/cancel/i.test(String(e && (e.message || e)))) return; } }
    try{ const blob = await (await fetch(src)).blob(), f = new File([blob], name, {type: blob.type || 'image/jpeg'}); if(navigator.canShare && navigator.canShare({files: [f]})){ await navigator.share({files: [f], title: 'BEAT SPLASH', text}); return; } }
    catch(e){ if(e && e.name === 'AbortError') return; }
    if(window.claude && window.claude.use){ try{ const dl = await window.claude.use('downloads'); if(dl){ await dl.save({filename: name, data: await (await fetch(src)).blob()}); return; } }catch(e){ return; } }
    const a = document.createElement('a'); a.href = src; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }
  function saveArt(img, acc){
    let list = [{img, title: artTitle, acc}, ...artsOf(tr.id)].slice(0, 3);
    // si le stockage est plein, on garde moins de toiles plutôt que rien
    while(list.length){ try{ localStorage.removeItem('k7cut.art.' + tr.id); localStorage.setItem('k7cut.arts.' + tr.id, JSON.stringify(list)); api.save('artNew', true); return; }catch(e){ list = list.slice(0, list.length - 1); } }
  }
  function rhythmPct(){ const tot = stats.perfect + stats.good + stats.ok + stats.miss; return tot ? Math.round((stats.perfect + stats.good*.8 + stats.ok*.4)/tot*100) : null; }
  /* ---------- page de récompense : animée sur un petit air de fin, calé sur le tempo de la face ---------- */
  function rwCss(){ if(!document.getElementById('k7-rw-css')){ const st = document.createElement('style'); st.id = 'k7-rw-css'; st.textContent = `
    .k7rw{position:absolute;inset:0;z-index:12;overflow-y:auto;overflow-x:hidden;background:#efe5cf;font-family:"Rubik",sans-serif;color:${INK};-webkit-overflow-scrolling:touch}
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
    .k7rw .harder{width:100%;border:4px solid ${INK};border-radius:12px;background:#ffd23f;box-shadow:0 5px 0 ${INK};cursor:pointer;padding:10px 12px;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:2px 10px;text-align:left;color:${INK};animation:k7wig 1.6s ease-in-out infinite}
    .k7rw .harder span{font-family:${MARKER};font-size:14px;grid-row:1}.k7rw .harder b{font-family:${GRAF};font-size:clamp(20px,6vw,27px);grid-row:1/3;grid-column:2;text-align:right;color:#e8344f;-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill}.k7rw .harder small{font-size:12px;grid-row:2;opacity:.75}
    .k7rw .harder:active{transform:translateY(4px);box-shadow:0 1px 0 ${INK}}
    @keyframes k7wig{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg) scale(1.02)}}
    .k7rw .btns{display:grid;grid-template-columns:1.15fr 1fr;gap:12px;margin-top:4px}
    .k7rw .btns button{min-height:62px;border:4px solid ${INK};border-radius:12px;font-family:${GRAF};font-size:clamp(19px,5.6vw,26px);cursor:pointer;box-shadow:0 5px 0 ${INK};display:flex;align-items:center;justify-content:center;gap:8px;line-height:1}
    .k7rw .btns button:active{transform:translateY(4px);box-shadow:0 1px 0 ${INK}}
    .k7rw .again{background:#e8344f;color:#fff;-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill;text-shadow:2px 3px 0 ${INK}}
    .k7rw .keep{background:#f6efe0;color:${INK};font-size:clamp(15px,4.4vw,19px)!important}
    .k7rw .links{display:flex;justify-content:space-between;gap:10px}.k7rw .links button{flex:1;background:${INK};color:#fff;border:0;border-radius:10px;padding:11px;font-family:${MARKER};font-size:15px;cursor:pointer}
    @media (prefers-reduced-motion:reduce){.k7rw .pop{animation:none;opacity:1}.k7rw .disc.on .burst{animation:none}}`; document.head.appendChild(st); } }
  const discSvg = (on, col) => on ? `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="${INK}"/><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.5"/><circle cx="50" cy="50" r="33" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.5"/><circle cx="50" cy="50" r="22" fill="${col}" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="50" r="9" fill="${INK}"/><g fill="${INK}">${[0,1,2,3,4,5].map(i => `<rect x="47.5" y="27" width="5" height="6" transform="rotate(${i*60} 50 50)"/>`).join('')}</g><path d="M22 30a33 33 0 0 1 14-12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/></svg>`
    : `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="#8f8a82" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="50" r="30" fill="#c9c4ba" stroke="#6d6860" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="#6d6860"/><g fill="#6d6860">${[0,1,2,3,4,5].map(i => `<rect x="47.5" y="30" width="5" height="6" transform="rotate(${i*60} 50 50)"/>`).join('')}</g></svg>`;
  // la musique de fin est programmée d'avance (16 s) : elle passe par ses propres bus, qu'on coupe pour de bon
  // dès qu'on quitte l'écran de fin ou qu'on relance une partie (sinon les deux musiques se superposent)
  let outroBus = null;
  function outroStop(){
    if(!outroBus || !actx) return; const T = actx.currentTime;
    outroBus.forEach(g => { g.gain.cancelScheduledValues(T); g.gain.setValueAtTime(g.gain.value, T); g.gain.linearRampToValueAtTime(0, T + .06); setTimeout(() => { try{ g.disconnect(); }catch(e){} }, 300); });
    outroBus = null;
  }
  function outroMusic(at0, stars){
    if(!useAudio) return; outroStop();
    music.gain.cancelScheduledValues(actx.currentTime); music.gain.setValueAtTime(.8, actx.currentTime);
    const ob = actx.createGain(), od = actx.createGain(), ov = actx.createGain(), orv = actx.createGain(), odl = actx.createGain();
    ob.connect(music); od.connect(drums || master); ov.connect(vox || master); orv.connect(revIn); odl.connect(dlyIn); outroBus = [ob, od, ov, orv, odl];
    const m0 = music, dr0 = drums; music = ob; drums = od; sendVia = {rev: orv, dly: odl};
    try{ outroNotes(at0, stars, ov); } finally { music = m0; drums = dr0; sendVia = null; }
  }
  function outroNotes(at0, stars, vox){
    const B = bpb, d0 = chordOf(1), prog = [0, 3, 4, 0];
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
    // un disque ou plus : on propose la même face au niveau au-dessus
    const harder = R.stars >= 1 ? DIFFS[DIFFS.indexOf(diff) + 1] : null;
    rwCss();
    const old = stage.querySelector('.k7rw'); if(old) old.remove();
    const at0 = useAudio ? qNext(clock() + .12, 1) : 0, delay = useAudio ? Math.max(0, (at0 - clock())/rate) : 0;
    const el = document.createElement('div'); el.className = 'k7rw'; el.style.setProperty('--b', bpb + 's'); el.style.setProperty('--d', delay + 's');
    const P = (n, html, cls) => `<div class="pop ${cls || ''}" style="--n:${n}">${html}</div>`;
    const col = SPRAY[Math.max(0, TRACKS.indexOf(tr)) % SPRAY.length];
    const TT = tx(R.stars === 3 ? 'RYTHME PARFAIT !' : R.stars ? 'NIVEAU TERMINÉ !' : 'PRESQUE !');
    const ribbon = R.stars ? tx(R.stars > 1 ? '{n} DISQUES GAGNÉS' : '{n} DISQUE GAGNÉ', {n: R.stars}) : tx('PAS ENCORE DE DISQUE');
    const second = [];
    if(R.titleNew) second.push(`<div class="cell"><div class="ic" style="background:${INK};color:#ffd23f">★</div><div><div class="lb">${tx('NOUVEAU TITRE :')}</div><div class="title">${R.titleNew} !</div></div></div>`);
    if(R.opened.length) second.push(`<div class="cell"><div class="ic" style="background:#29c4ff">⏏</div><div><div class="lb">${tx('NOUVELLE CASSETTE')}</div><div class="vl" style="font-size:18px">${R.opened.map(x => x.name).join(', ')} !</div></div></div>`);
    else if(R.nextT && !unlocked(R.nextT)) second.push(`<div class="cell"><div class="ic" style="background:#d8d2c6">◎</div><div><b>${R.nextT.name} :</b><div class="sm">${tx(R.nextT.cost - discs() > 1 ? 'encore {n} disques' : 'encore {n} disque', {n: '<b>' + (R.nextT.cost - discs()) + '</b>'})}</div></div></div>`);
    if(R.rec) second.push(`<div class="cell"><div class="ic" style="background:#e8344f;color:#fff">♛</div><div><div class="lb">${tx('NOUVEAU RECORD')}</div><div class="sm">${tx('sur {cassette}, niveau {niveau}', {cassette: tr.name, niveau: diff.name})}</div></div></div>`);
    if(second.length === 1) second.push(`<div class="cell"><div class="ic">◉</div><div><div class="lb">${tx('DISQUES')}</div><div class="vl">${discs()}</div></div></div>`);
    el.innerHTML = `<canvas></canvas><div class="in">
      ${P(0, `<h2>${TT}</h2>`)}
      ${R.img ? P(1, `<div class="art"><img src="${R.img}" alt="${tx('Ta toile')}"><div class="cap"><b>« ${R.artTitle} »</b><span>${tr.name} · ${R.acc} %</span></div></div>`, 'artw') : ''}
      ${R.img ? P(1, `<div class="bs-legend">${tx('Rond net = pile · jets = en avance · coulures = en retard')}</div>`) : ''}
      <div class="top"><div class="ttl">${P(2, `<div class="band">${tr.name} ${R.mood}</div>`)}${P(2, `<div class="pct"><span data-count="${R.acc}">0</span> % ${tx('de super rythme')}</div>`)}</div></div>
      ${P(3, `<div class="panel"><div class="ribbon">${ribbon}</div><div class="discs">${[0, 1, 2].map(i => `<div class="disc pop ${i < R.stars ? 'on' : ''}" style="--n:${4 + i}">${i < R.stars ? '<div class="burst"></div>' : ''}${discSvg(i < R.stars, '#ffd23f')}</div>`).join('')}</div>
        <div class="next">${R.stars < 3 ? tx('PROCHAIN DISQUE À {n} %', {n: diff.disc[R.stars]}) : tx('LES 3 DISQUES, BRAVO !')}</div></div>`)}
      ${R.worst ? P(6, `<div class="bs-miss"><span>${tx('Le plus raté :')} <b>${TUTO[R.worst[0]] ? TUTO[R.worst[0]].verb : ''}</b> ×${R.worst[1]}</span><button class="retuto">${tx('REVOIR LE TUTO')}</button></div>`) : ''}
      ${P(7, `<div class="card"><div class="cell"><div class="ic">${BSI.cup(INK)}</div><div><div class="lb">${tx('SCORE')}</div><div class="vl" data-count="${score}">0</div><div class="sm">${tx('points')}</div></div></div><div class="cell"><div class="ic" style="background:#29c4ff">✸</div><div><div class="lb">${tx('COMBO MAX')}</div><div class="vl">${maxCombo}</div></div></div>
        <div class="cell row2"><div class="ic" style="background:#e8344f;color:#fff">♪</div><div><b>${tx('+{n} talent ♪', {n: R.gained})}</b><div class="sm">${tx('total {n}', {n: bank()})}</div></div></div><div class="cell row2"><div class="ic" style="background:#d8d2c6">▭</div><div>${lostTime > .3 ? `${tx('Bande ralentie :')}<br><b>${tx('+{n} s perdues', {n: lostTime.toFixed(1).replace('.', ',')})}</b>` : `${tx('Bande intacte :')}<br><b>${tx('jamais ralentie')}</b>`}</div></div></div>`)}
      ${P(8, `<div class="card">${second.slice(0, 2).join('')}</div>`)}
      ${harder ? P(2, `<button class="harder"><span>${tx('ENCORE ? REJOUE EN')}</span><b>${harder.name.toUpperCase()} ▲</b><small>${harder.note}</small></button>`) : ''}
      ${P(1, `<div class="btns"><button class="again">${tx('REJOUER')} ${BSI.triR()}</button>${R.img ? `<button class="keep">${tx('GARDER MON ŒUVRE')} ${BSI.disk(INK)}</button>` : `<button class="keep">${tx('CASSETTES')}</button>`}</div>`)}
      ${P(1, `<div class="links"><button class="tomenu">${BSI.triL()} ${tx('CASSETTES')}</button>${R.nextT && unlocked(R.nextT) ? `<button class="next2">${tx('FACE')} ${R.nextT.face} : ${R.nextT.name.toUpperCase()} ${BSI.triR()}</button>` : ''}</div>`)}
      </div>`;
    stage.appendChild(el);
    const close = () => { alive = false; el.remove(); outroStop(); if(useAudio){ music.gain.cancelScheduledValues(actx.currentTime); music.gain.setTargetAtTime(0, actx.currentTime, .05); setTimeout(() => { if(music) music.gain.setValueAtTime(.8, actx.currentTime); }, 300); } };
    const leave = go => { close(); adBreak(TRACKS.includes(tr) ? TRACKS.indexOf(tr) : TRACKS.length).then(go); };
    el.querySelector('.again').onclick = () => leave(() => briefing(tr, () => startTrack(tr)));
    { const rt = el.querySelector('.retuto'); if(rt) rt.onclick = () => { api.save('tuto3.' + R.worst[0], false); leave(() => briefing(tr, () => startTrack(tr))); }; }
    const hd = el.querySelector('.harder'); if(hd) hd.onclick = () => leave(() => { diff = harder; dIdx = DIFFS.indexOf(harder); api.save('diff', dIdx); briefing(tr, () => startTrack(tr)); });
    el.querySelector('.tomenu').onclick = () => leave(showMenu);
    const nx = el.querySelector('.next2'); if(nx) nx.onclick = () => leave(() => briefing(R.nextT, () => startTrack(R.nextT)));
    el.querySelector('.keep').onclick = R.img ? R.keep : () => leave(showMenu);
    outroMusic(at0, R.stars);
    if(useAudio && outroBus){ const sv = sendVia; sendVia = {rev: outroBus[3], dly: outroBus[4]}; applause(actx.currentTime + delay + .1, R.stars/3, outroBus[0]); sendVia = sv; }
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
  // pub entre deux morceaux (js/ads.js) : seulement quand on quitte un écran de fin, jamais pendant un morceau.
  // Le son est coupé pendant la pub, puis le moteur audio repart pour que le morceau suivant reste calé.
  // Garde-fou : une partie en cours (morceau, tuto, pause, Cassette de la mort) n'est jamais coupée par une pub.
  function adBreak(ti){ if(['play', 'tuto', 'pause'].includes(state) || paused || deathRun) return Promise.resolve(false); return window.BSAds ? BSAds.maybeInterstitial({trackIndex: ti}).then(shown => shown ? premiumOffer() : null).catch(() => false) : Promise.resolve(false); }
  // Premium (js/premium.js) : proposé juste après une pub, une fois sur trois, jamais plus. C'est le moment où le joueur
  // sait exactement ce qu'il achète. La promesse est résolue quand la fenêtre se ferme, pour reprendre le jeu.
  function premiumOffer(){
    if(!window.BSPremium || BSPremium.isOn() || !BSPremium.canBuy) return Promise.resolve();
    const n = api.load('offerN', 0) + 1; api.save('offerN', n); if(n % 3 !== 0) return Promise.resolve(); // 3e, 6e, 9e pub... jamais la première
    return new Promise(resolve => {
      const sh = document.createElement('div'); sh.className = 'k7sheet';
      sh.innerHTML = `<div style="justify-content:center"><div class="bs-panel" style="text-align:center;gap:16px"><div class="bs-title bolt">${tx('Jouer sans pub ?')}</div>
        <div class="bs-card">${tx('Plus aucune pub, pour toujours.')}</div>
        ${bsBtn('pink cta bs-sparks', '', '', BSI.crown(INK) + tx('PREMIUM · {price}', {price: BSPremium.price()}), 'data-a="buy" style="font-size:min(26px,6.4vw)"')}
        ${bsBtn('pill', '', '', tx('Plus tard'), 'data-a="later"')}</div></div>`;
      stage.appendChild(sh);
      const close = () => { pageOut(sh); resolve(); };
      sh.querySelector('[data-a=buy]').onclick = () => { api.sfx.click(); BSPremium.buy().then(close); };
      sh.querySelector('[data-a=later]').onclick = () => { api.sfx.click(); close(); };
    });
  }
  if(window.BSAds){ BSAds.onStart = () => { if(actx) actx.suspend(); }; BSAds.onEnd = () => { if(actx) actx.resume(); }; }
  function finishRun(won){
    if(auto){ auto = false; api.after(900, showLabo); return; }
    if(holdState){ if(holdState.voice) holdState.voice.stop(); holdState = null; }
    if(deathRun){ if(won) deathNext(); else deathOver(); return; }
    api.save('runs', api.load('runs', 0) + 1); api.save('cue', cueN);
    const acc = rhythmPct() || 0, stars = won ? diff.disc.filter(x => acc >= x).length : 0, discsBefore = discs(); // bande cassée (Roi) : pas de disque, le talent des notes reste
    const titleBefore = titleOf(bank()), gained = Math.round(notesRun*diff.mult + stars*5*diff.mult);
    api.save('notes', bank() + gained);
    const titleAfter = titleOf(bank());
    const bk = tr.id + '.' + diff.id, b = bests(), prev = b[bk] || {score: 0, stars: 0, discs: 0, pct: 0}; const rec = score > prev.score;
    b[bk] = {score: Math.max(prev.score, score), stars: Math.max(prev.stars || 0, stars), discs: Math.max(prev.discs || 0, stars), pct: Math.max(prev.pct || 0, acc)}; api.save('bests', b);
    const nextT = TRACKS.includes(tr) ? TRACKS[TRACKS.indexOf(tr) + 1] : null, got = discs() - discsBefore;
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
    const mood = tx(['brut', 'qui groove', 'en transe', 'hypnotique', 'nirvana'][tiers().filter(x => x && maxCombo >= x).length]);
    let img = null; try{ img = artwork(acc); saveArt(img, acc); }catch(e){}
    if(img) actions.splice(actions.length - 1, 0, {label: 'Garder mon œuvre', keep: true, fn: () => shareArt(img, `beat-splash-${tr.id}-${acc}.jpg`)});
    const keep = img ? actions.find(a => a.keep).fn : null;
    // le geste qui a coûté le plus de ratés (au moins 3) : conseil de l'écran de fin avec son tuto
    const worst = Object.entries(missBy).sort((x, y) => y[1] - x[1])[0], worstOk = worst && worst[1] >= 3 ? worst : null;
    api.after(700, () => showReward({acc, stars, img, artTitle, mood, gained, rec, nextT, opened, titleNew: titleAfter !== titleBefore ? titleAfter : null, keep, worst: worstOk}));
  }
  function fail(){ if(state !== 'play') return; state = 'over'; if(useAudio){ music.gain.setTargetAtTime(0, actx.currentTime, .2); osc(master, 'sawtooth', 220, now(), 1.2, .2, {glide: 40}); api.after(1500, () => { if(music) music.gain.setValueAtTime(.8, actx.currentTime); }); } finishRun(false); }
  function win(){ if(state !== 'play') return; state = 'over'; I.crash(now()); judges.push({txt: tx('FIN DE FACE'), x: W/2, y: H*.25, t: 0, big: true}); finishRun(true); }

  /* ---------- lecture automatique du labo : chaque geste est joué pile à l'heure ---------- */
  let auto = false, laboOn = false;
  function autoPlay(t){
    for(const o of objs){ if(o.done || o.auto || !'CJHSOWD'.includes(o.k) || t < o.time - .05) continue; o.auto = true;
      if(o.k === 'C') cutObj(o, o.time, wantDir(o) || {x: 1, y: 0});
      else if(o.k === 'J'){ jumpObj(o, o.time); }
      else if(o.k === 'D') specialObj(o, o.time);
      else if(o.k === 'H'){ o.dt = 0; lead(o.time, freq(o.deg, 4), .14, true); resolve(o, 'perfect', o.time); }
      else if(o.k === 'S'){ const rec = grabRecord(); for(let i=0;i<Math.max(2, o.len);i++) scratchHit(o.time + i*bpb/2, i % 2 === 1, rec); o.strokes = 99; o.dt = 0; resolve(o, 'perfect', o.time); } }
  }

  /* ---------- boucle ---------- */
  const objY = o => o.k === 'A' ? Y0 - 62 : o.shape === 'tall' ? Y0 - 28 : o.shape === 'diag' ? Y0 - 24 : o.k === 'D' ? Y0 - 16 : o.shape === 'wide' ? Y0 - 13 : o.k === 'N' ? Y0 - 14 : o.k === 'H' || o.k === 'S' ? Y0 - 8 : Y0 - 15;
  let lastBeatI = -1, secShown = -1;
  api.loop((dt, rt) => {
    if(state === 'play'){
      // la bande glisse vers sa vitesse cible : elle freine vite, repart doucement
      if(rate !== rateTgt){ const sp = (rateTgt < rate ? .9 : .12)*Math.min(dt, .05); setRate(rate + Math.sign(rateTgt - rate)*Math.min(Math.abs(rateTgt - rate), sp)); }
      if(rate < .999) lostTime += Math.min(dt, .05)*(1/rate - 1);
      const t = now();
      beatNow = t/bpb;
      if(auto) autoPlay(t);
      if(!tutoOpen && !auto){ const to = nextTutoObj(); if(to){ startTuto(to); draw(rt); return; } }
      while(nextStep/4*bpb < clock() + .15 && nextStep < totalBars*16){ scheduleStep(nextStep); nextStep++; }
      while(spawned*4 < beatNow + 10 && spawned < totalBars){ spawnBar(spawned); spawned++; }
      const air = jumpT < .42 && jumpT > .04;
      for(const o of objs){
        if(o.done) continue;
        if(o.k === 'N' && t >= o.time) collect(o, t);
        else if(o.k === 'A' && t >= o.time) collect(o, t);
        else if(o.k === 'A' && t > o.time + .12){ o.done = true; o.result = 'gone'; }
        else if('CJD'.includes(o.k) && t > o.time + hitWin() && !(pendingNear(o) && t < o.time + .6)) resolve(o, 'miss', t);
        else if(o.k === 'H'){ if(!o.holding && t > o.time + hitWin()) resolve(o, 'miss', t); else if(o.holding){ if(t > o.endTime + .04) endHold(t, o.startGrade); else if(Math.random() < .5) confetti(HXs, Y0 - 12, [RED, PAPER], 1, .3); } }
        else if(o.k === 'S' && t > o.endTime + .1){ const r = o.strokes/o.need; resolve(o, r >= 1.5 ? 'perfect' : r >= 1 ? 'good' : r > 0 ? 'ok' : 'miss', t); if(scratchState && scratchState.o === o) scratchState = null; }
      }
      objs = objs.filter(o => o.endBeat > beatNow - 3);
      for(let i=events.length - 1;i>=0;i--) if(events[i].at <= t){ energy[events[i].ch] = 1; events.splice(i, 1); }
      const bi = Math.floor(beatNow); if(bi !== lastBeatI){ lastBeatI = bi; if(trance >= 2) rings.push({r: 10, a: 1}); }
      const sec = sectionOf(Math.floor(beatNow/4));
      if(sec && sec.idx !== secShown){ secShown = sec.idx; judges.push({txt: sec.name.toUpperCase(), x: W/2, y: H*.2, t: 0, big: true, sub: sec.tier === 'rest' ? tx('souffle, ramasse les notes') : sec.call ? tx('écoute puis réponds') : null}); if(sec.idx) bump = 1; }
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
  const TITLEF = '"Knewave", "Permanent Marker", sans-serif';
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
    // Vent des collines : ciel clair, prairie, souffles de vent ; Velours : bordeaux et or, lumières douces
    pastoral:  {base: ['#cfe9f0', '#eef3d2'], dark: false, band: ['#3f8f4f', '#f2c21b'], acc: ['#3f8f4f', '#5aa6d6', '#f2c21b'], hud: '#3f8f4f', hudInk: '#fff', chev: ['#3f8f4f', '#6fb27c', '#a5d3ad'], hub: ['#5aa6d6', '#3f8f4f'], vinyl: ['#3f8f4f'], eq: ['#3f8f4f', '#5aa6d6', INK], rim: ['#3f8f4f', '#5aa6d6'], text: INK, art: 'pastoral'},
    soul:      {base: ['#2a0f1c', '#5a1a33', '#b5543c'], dark: true, band: ['#e8b04a', '#f4d9b0'], acc: ['#e8b04a', '#ff8a6b', '#f4d9b0'], hud: '#e8b04a', hudInk: INK, chev: ['#e8b04a', '#f0c674', '#f7dca6'], hub: ['#e8b04a', '#ff8a6b'], vinyl: ['#e8b04a'], eq: ['#e8b04a', '#ff8a6b', '#f4d9b0'], rim: ['#e8b04a', '#ff8a6b'], text: '#f4d9b0', art: 'soul'},
    noel:      {base: ['#0f1d3d', '#24427a', '#6b8fc4'], dark: true, band: ['#e8343f', '#f4f0e6'], acc: ['#e8343f', '#2fbf71', '#ffd23f'], hud: '#e8343f', hudInk: '#fff', chev: ['#e8343f', '#ff6b6b', '#ffa3a3'], hub: ['#2fbf71', '#e8343f'], vinyl: ['#e8343f'], eq: ['#e8343f', '#2fbf71', '#f4f0e6'], rim: ['#e8343f', '#2fbf71'], text: '#fff', art: 'noel'},
    dnb:       {base: ['#0f2a22', '#14463a'], dark: true, band: ['#b6ff3b', '#2fd3b0'], acc: ['#b6ff3b', '#2fd3b0', '#ffd23f'], hud: '#b6ff3b', hudInk: INK, chev: ['#b6ff3b', '#cdff7a', '#e3ffb3'], hub: ['#b6ff3b', '#2fd3b0'], vinyl: ['#2fd3b0'], eq: ['#b6ff3b', '#2fd3b0', '#f4f0e6'], rim: ['#b6ff3b', '#2fd3b0'], text: '#f4f0e6', art: 'dnb'}
  };
  const skinOf = t => t && (THEMES[t.skin] || THEMES[t.style]);
  const TH = () => skinOf(tr) || THEMES.metal;
  // petites illustrations peintes sur le fond
  function artSpeaker(g, x, y, w, h, lit){ g.fillStyle = INK; rrp(g, x, y, w, h, 6); g.fill(); for(const [cy2, rr2] of [[.3, .26], [.72, .34]]){ g.fillStyle = '#3a3734'; g.beginPath(); g.arc(x + w/2, y + h*cy2, w*rr2, 0, 6.283); g.fill(); g.fillStyle = lit || '#5a5650'; g.beginPath(); g.arc(x + w/2, y + h*cy2, w*rr2*.45, 0, 6.283); g.fill(); g.strokeStyle = 'rgba(255,255,255,.15)'; g.lineWidth = 1; g.beginPath(); g.arc(x + w/2, y + h*cy2, w*rr2*.75, 0, 6.283); g.stroke(); } }
  function artBolt(g, x, y, s, col){ g.fillStyle = col; g.beginPath(); g.moveTo(x, y); g.lineTo(x + s*.5, y); g.lineTo(x + s*.15, y + s*.6); g.lineTo(x + s*.55, y + s*.6); g.lineTo(x - s*.1, y + s*1.4); g.lineTo(x + s*.1, y + s*.8); g.lineTo(x - s*.25, y + s*.8); g.closePath(); g.fill(); }
  function artPalm(g, x, y, h, s){ g.save(); g.translate(x, y); g.scale(s, 1); g.strokeStyle = '#1d4a24'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(18, -h*.5, 6, -h); g.stroke(); g.fillStyle = '#1f6b2c';
    for(let i=0;i<7;i++){ const a = -Math.PI/2 + (i - 3)*.5, L = 60 + (i % 2)*20; g.save(); g.translate(6, -h); g.rotate(a); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(L*.5, -16, L, 8); g.quadraticCurveTo(L*.5, -2, 0, 4); g.closePath(); g.fill(); g.restore(); } g.restore(); }
  /* ---------- Noël : guirlande lumineuse et sapin enneigé (cassette de Noël, et toutes les cassettes en décembre) ---------- */
  const XBULBS = ['#e8343f', '#ffd23f', '#2fbf71', '#29c4ff', '#ff6fa0'];
  function xmasGarland(g, w, y0, y1, sag, r, lit){
    const cy = Math.max(y0, y1) + sag*2; g.strokeStyle = '#0a1226'; g.lineWidth = 2; g.beginPath(); g.moveTo(-10, y0); g.quadraticCurveTo(w/2, cy, w + 10, y1); g.stroke();
    for(let k=1;k<12;k++){ const t2 = k/12, x = -10 + (w + 20)*t2, y = (1 - t2)*(1 - t2)*y0 + 2*t2*(1 - t2)*cy + t2*t2*y1, c2 = XBULBS[k % XBULBS.length], on = lit == null ? 1 : lit(k);
      if(on > 0){ const gl = g.createRadialGradient(x, y + 6, 0, x, y + 6, 14); gl.addColorStop(0, c2 + (on > .5 ? 'aa' : '55')); gl.addColorStop(1, c2 + '00'); g.fillStyle = gl; g.beginPath(); g.arc(x, y + 6, 14, 0, 6.283); g.fill(); }
      g.fillStyle = c2; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.ellipse(x, y + 6, 3.6, 5.5, 0, 0, 6.283); g.fill(); g.stroke(); }
  }
  function xmasFir(g, x, y, s2){ g.fillStyle = '#5a3a22'; g.fillRect(x - 5*s2, y - 6*s2, 10*s2, 14*s2);
    for(let k=0;k<3;k++){ const yy = y - 6*s2 - k*22*s2, ww = (40 - k*9)*s2; g.fillStyle = '#1f7a4a'; g.strokeStyle = INK; g.lineWidth = 2.5; g.beginPath(); g.moveTo(x - ww, yy); g.lineTo(x, yy - 36*s2); g.lineTo(x + ww, yy); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x - ww*.55, yy - 15*s2); g.lineTo(x, yy - 36*s2); g.lineTo(x + ww*.55, yy - 15*s2); g.quadraticCurveTo(x, yy - 22*s2, x - ww*.55, yy - 15*s2); g.fill(); }
    const ty = y - 6*s2 - 2*22*s2 - 36*s2; g.fillStyle = '#ffd23f'; g.beginPath(); for(let k=0;k<10;k++){ const a = k*Math.PI/5 - Math.PI/2, rr = (k % 2 ? 4 : 9)*s2; g.lineTo(x + Math.cos(a)*rr, ty + Math.sin(a)*rr); } g.closePath(); g.fill(); }
  // en décembre, chaque cassette garde son style et se pare pour Noël : guirlande en haut, neige au sol, deux sapins sur les côtés, boules et houx
  function xmasDress(g, w, h, r){
    xmasGarland(g, w, h*.17, h*.19, h*.03, r);
    g.fillStyle = 'rgba(255,255,255,.92)'; g.beginPath(); g.moveTo(0, h); for(let x=0;x<=w;x+=10) g.lineTo(x, h*.8 + Math.sin(x/w*6.283*1.6)*10 + Math.sin(x/w*31)*3); g.lineTo(w, h); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(28,27,25,.35)'; g.lineWidth = 2; g.beginPath(); for(let x=0;x<=w;x+=10) g.lineTo(x, h*.8 + Math.sin(x/w*6.283*1.6)*10 + Math.sin(x/w*31)*3); g.stroke();
    xmasFir(g, w*.07, h*.84, .9); xmasFir(g, w*.94, h*.85, 1);
    for(const [x, y, c2] of [[w*.3, h*.27, '#e8343f'], [w*.62, h*.29, '#ffd23f'], [w*.82, h*.26, '#2fbf71']]){ g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y - 30); g.lineTo(x, y - 9); g.stroke(); g.fillStyle = c2; g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 9, 0, 6.283); g.fill(); g.stroke(); g.fillStyle = 'rgba(255,255,255,.6)'; g.beginPath(); g.arc(x - 3, y - 3, 2.6, 0, 6.283); g.fill(); }
    for(const [x, y] of [[w*.18, h*.08], [w*.9, h*.24]]){ g.fillStyle = '#1f7a4a'; g.strokeStyle = INK; g.lineWidth = 1.8; for(const s3 of [-1, 1]){ g.beginPath(); g.ellipse(x + s3*9, y, 11, 5, s3*.4, 0, 6.283); g.fill(); g.stroke(); } g.fillStyle = '#e8343f'; for(const [dx, dy] of [[-3, -3], [3, -3], [0, 2]]){ g.beginPath(); g.arc(x + dx, y + dy, 3.4, 0, 6.283); g.fill(); g.stroke(); } }
  }
  function themeArt(g, t, w, h, r){
    const th = skinOf(t) || THEMES.metal;
    if(th.art === 'metal' || th.art === 'punk'){
      artSpeaker(g, -10, h*.18, w*.2, h*.2); artSpeaker(g, w*.83, h*.14, w*.2, h*.24); artBolt(g, w*.8, h*.27, 34, th.acc[0]);
      for(let i=0;i<3;i++) artBolt(g, w*(.2 + i*.12), h*(.1 + i*.04), 26 + i*6, th.art === 'punk' && i === 1 ? th.acc[1] : INK);
      if(th.art === 'punk'){ g.save(); for(let i=0;i<4;i++){ g.translate(0, 0); g.fillStyle = 'rgba(244,240,230,.85)'; g.save(); g.translate(r()*w, r()*h*.4); g.rotate((r() - .5)*.8); g.fillRect(-36, -9, 72, 18); g.restore(); } g.restore(); g.fillStyle = th.acc[0]; for(let i=0;i<5;i++){ const x = r()*w, y = r()*h*.45; g.beginPath(); for(let k=0;k<10;k++){ const a = k*Math.PI/5 - Math.PI/2, rr = k % 2 ? 4.5 : 11; g.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr); } g.closePath(); g.fill(); } }
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
    if(th.art === 'pastoral'){ // collines qui ondulent, souffles de vent, quelques oiseaux
      for(const [y0, col, amp] of [[h*.42, '#9fd08a', 18], [h*.5, '#6fb27c', 24], [h*.6, '#3f8f4f', 16]]){ g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for(let x=0;x<=w;x+=12) g.lineTo(x, y0 + Math.sin(x/w*6.283*1.3 + y0)*amp); g.lineTo(w, h); g.closePath(); g.fill(); }
      g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 3; g.lineCap = 'round'; for(let i=0;i<7;i++){ const x = r()*w, y = r()*h*.35, L = 40 + r()*50; g.beginPath(); g.moveTo(x, y); g.bezierCurveTo(x + L*.4, y - 14, x + L*.7, y + 10, x + L, y - 4); g.arc(x + L - 6, y - 10, 6, Math.PI*.5, Math.PI*2.1); g.stroke(); }
      g.strokeStyle = INK; g.lineWidth = 2; for(let i=0;i<5;i++){ const x = r()*w, y = h*(.08 + r()*.2), s2 = 6 + r()*5; g.beginPath(); g.moveTo(x - s2, y); g.quadraticCurveTo(x - s2/2, y - s2*.7, x, y); g.quadraticCurveTo(x + s2/2, y - s2*.7, x + s2, y); g.stroke(); } }
    if(th.art === 'soul'){ // lumières douces floues et un vinyle doré
      for(let i=0;i<26;i++){ const x = r()*w, y = r()*h*.55, R = 10 + r()*34; const gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, i % 3 ? 'rgba(232,176,74,.45)' : 'rgba(255,138,107,.4)'); gr.addColorStop(1, 'rgba(232,176,74,0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, R, 0, 6.283); g.fill(); }
      g.save(); g.translate(w*.82, h*.2); g.fillStyle = '#1a0a12'; g.beginPath(); g.arc(0, 0, w*.2, 0, 6.283); g.fill(); g.strokeStyle = 'rgba(244,217,176,.18)'; g.lineWidth = 1; for(let k=w*.07; k<w*.2; k+=4){ g.beginPath(); g.arc(0, 0, k, 0, 6.283); g.stroke(); } g.fillStyle = '#e8b04a'; g.beginPath(); g.arc(0, 0, w*.06, 0, 6.283); g.fill(); g.restore(); }
    if(th.art === 'noel'){ // nuit d'hiver : lune, étoiles, guirlande, collines enneigées et sapins
      { const gr = g.createRadialGradient(w*.8, h*.13, 0, w*.8, h*.13, w*.22); gr.addColorStop(0, 'rgba(255,246,216,.5)'); gr.addColorStop(1, 'rgba(255,246,216,0)'); g.fillStyle = gr; g.beginPath(); g.arc(w*.8, h*.13, w*.22, 0, 6.283); g.fill(); g.fillStyle = '#fff6d8'; g.beginPath(); g.arc(w*.8, h*.13, w*.07, 0, 6.283); g.fill(); }
      for(let i=0;i<70;i++){ g.fillStyle = `rgba(255,255,255,${.3 + r()*.6})`; g.beginPath(); g.arc(r()*w, r()*h*.45, r()*1.7, 0, 6.283); g.fill(); }
      xmasGarland(g, w, h*.03, h*.07, h*.05, r); xmasGarland(g, w, h*.1, h*.05, h*.04, r);
      for(const [y0, col, amp] of [[h*.6, '#c9d9f0', 20], [h*.68, '#e6eefa', 26], [h*.78, '#ffffff', 16]]){ g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for(let x=0;x<=w;x+=12) g.lineTo(x, y0 + Math.sin(x/w*6.283*1.1 + y0)*amp); g.lineTo(w, h); g.closePath(); g.fill(); }
      xmasFir(g, w*.1, h*.66, 1.1); xmasFir(g, w*.24, h*.7, .75); xmasFir(g, w*.86, h*.64, 1.2); xmasFir(g, w*.72, h*.72, .7); xmasFir(g, w*.5, h*.8, .6);
      g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 1.6; g.lineCap = 'round'; for(let i=0;i<14;i++){ const x = r()*w, y = r()*h*.55, s2 = 3 + r()*5; g.beginPath(); for(let k=0;k<3;k++){ const a = k*Math.PI/3; g.moveTo(x - Math.cos(a)*s2, y - Math.sin(a)*s2); g.lineTo(x + Math.cos(a)*s2, y + Math.sin(a)*s2); } g.stroke(); }
    }
    if(th.art === 'dnb'){ g.strokeStyle = 'rgba(182,255,59,.5)'; g.lineCap = 'round'; for(let i=0;i<30;i++){ const x = r()*w, y = r()*h, l = 30 + r()*80; g.lineWidth = 1 + r()*2.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + l, y - l*.35); g.stroke(); } }
  }
  // fond « BD explosive » : papier crème, grandes bandes de pinceau en diagonale, trames, giclées, étoiles, éclairs
  function makeBackdrop(t, w, h, seed){
    const c = document.createElement('canvas'), sc = 2; c.width = w*sc; c.height = h*sc; const g = c.getContext('2d'); g.scale(sc, sc);
    const r = rngFrom(seed), th = skinOf(t) || THEMES.metal, acc = th.acc[0], B1 = th.band[0], B2 = th.band[1];
    if(th.base.length > 1){ const gr = g.createLinearGradient(0, 0, 0, h); th.base.forEach((c2, i) => gr.addColorStop(i/(th.base.length - 1), c2)); g.fillStyle = gr; } else g.fillStyle = th.base[0]; g.fillRect(0, 0, w, h);
    grain(g, w, h, w*h/30, !th.dark); grain(g, w, h, w*h/90, false);
    const dots = (x, y, R, col, step) => { g.fillStyle = col; for(let yy=-R; yy<R; yy+=step) for(let xx=-R; xx<R; xx+=step){ const d = Math.hypot(xx, yy)/R; if(d < 1){ g.beginPath(); g.arc(x + xx, y + yy, step*.4*(1 - d), 0, 6.283); g.fill(); } } };
    const DK = th.dark ? 'rgba(255,255,255,.35)' : 'rgba(28,27,25,.55)'; dots(w*.08, h*.08, w*.3, DK, 6); dots(w*.95, h*.55, w*.28, acc + '88', 6); dots(w*.1, h*.78, w*.25, (th.acc[1] || acc) + '99', 7);
    // bandes diagonales en haut à gauche et en bas à droite
    const band = (x0, y0, x1, y1, list) => { for(const [off, wd, col, al] of list){ const a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a)*off, ny = Math.cos(a)*off; if(col === INK) brush(g, r, x0 + nx, y0 + ny, x1 + nx, y1 + ny, wd, al); else { g.save(); g.strokeStyle = col; g.globalAlpha = al; g.lineCap = 'round'; for(let k=-wd/2; k<wd/2; k+=2){ g.lineWidth = 1.5 + r()*2; g.beginPath(); g.moveTo(x0 + nx - Math.sin(a)*k + r()*30, y0 + ny + Math.cos(a)*k); g.lineTo(x1 + nx - Math.sin(a)*k - r()*40, y1 + ny + Math.cos(a)*k); g.stroke(); } g.restore(); } } };
    if(!th.dark || th.art === 'disco'){ band(-40, h*.36, w*.6, -40, [[0, 46, B1, th.dark ? .5 : .92], [38, 16, B2, .9], [-40, 10, B2, .8], [70, 6, B1, .7]]);
    band(w*.45, h + 40, w + 40, h*.5, [[0, 40, B1, th.dark ? .5 : .9], [-34, 14, B2, .9], [40, 10, th.acc[1] || acc, .85]]); }
    themeArt(g, t || TRACKS[0], w, h, r);
    if(XMAS && (skinOf(t) || {}).art !== 'noel') xmasDress(g, w, h, r);
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
    g.fillStyle = PAPER; g.font = `13px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(tx('FACE') + ' ' + t.face, 160, 40);
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
    CV: {verb: tx('GLISSE VERS LE HAUT'), hint: tx('n\'importe où sur l\'écran'), need: 1, cue: tx('GLISSE ↑')},
    CH: {verb: tx('GLISSE VERS LA DROITE'), hint: tx('n\'importe où sur l\'écran'), need: 1, cue: tx('GLISSE →')},
    J: {verb: tx('TAPE UNE FOIS'), hint: tx('un tap sec, sans glisser'), need: 1, cue: tx('TAPE')},
    H: {verb: tx('POSE LE DOIGT ET TIENS'), hint: tx('jusqu\'au bout du ruban'), need: 1, cue: tx('TIENS')},
    S: {verb: tx('GRATTE'), hint: tx('allers-retours de haut en bas'), need: 4, cue: tx('GRATTE')},
    CD: {verb: tx('GLISSE EN DIAGONALE ↗︎'), hint: tx('vers le haut et la droite à la fois'), need: 1, cue: tx('GLISSE ↗︎')},
    CVR: {verb: tx('GLISSE VERS LE BAS'), hint: tx('brique bleue : le geste descend'), need: 1, cue: tx('GLISSE ↓')},
    CHR: {verb: tx('GLISSE VERS LA GAUCHE'), hint: tx('brique violette : le geste recule'), need: 1, cue: tx('GLISSE ←')},
    CDR: {verb: tx('GLISSE EN DIAGONALE ↙︎'), hint: tx('vers le bas et la gauche à la fois'), need: 1, cue: tx('GLISSE ↙︎')},
    D: {verb: tx('TAPE À DEUX DOIGTS'), hint: tx('deux doigts en même temps (souris : clic droit)'), need: 1, cue: tx('2 DOIGTS')}
  };
  const tk = o => o.k === 'C' ? (o.shape === 'wide' ? 'CH' : o.shape === 'diag' ? 'CD' : 'CV') + (o.rev ? 'R' : '') : o.k;
  // aides au-dessus des formes : elles s'effacent à mesure que tu réussis ce geste, et reviennent si tu le rates
  let cueN = {};
  function cueLearn(o, g){ if(!'CJOWD'.includes(o.k)) return; const k = tk(o); cueN[k] = Math.max(0, Math.min(10, (cueN[k] || 0) + (g === 'miss' ? -2 : 1))); }
  let tutoWrong = 0, tutoOk = 0, tutoHeld = 0;
  let tutoOpen = false, pauseRaw = 0, tutoObj = null, tutoT = 0, tutoCount = 0, tutoTouch = null, holdHint = 0;
  const rawNow = () => useAudio ? actx.currentTime : performance.now()/1000;
  // le tuto fige le jeu quand une forme jamais vue arrive sur la bande (deux temps avant la ligne rouge) : on montre le geste sur la vraie forme
  function startTuto(o){
    if(o.k === 'S' && !o.rec) o.rec = grabRecord(); // le disque est pris avant que la musique ne se baisse
    tutoOpen = true; tutoObj = o; tutoT = 0; tutoCount = 0; tutoTouch = null; tutoOk = 0; tutoWrong = 0; tutoHeld = 0; state = 'tuto'; pauseRaw = rawNow();
    if(useAudio && music){ music.gain.cancelScheduledValues(actx.currentTime); music.gain.setTargetAtTime(.15, actx.currentTime, .05); }
    gestures.clear(); api.vibe(30);
  }
  function tutoSuccess(dir){
    if(tutoOk) return; tutoOk = .8; tutoTouch = null; api.vibe([15, 30, 15]); const at = clock(), o = tutoObj;
    if(o.k === 'C'){ lead(at, freq(o.deg || 4, 4), .15, true); if(dir){ const l = Math.hypot(dir.x, dir.y) || 1; slash = {dx: dir.x/l, dy: dir.y/l, t: 0}; } }
    if(o.k === 'J'){ I.tap(master, at, 1); jumpT = 0; }
    if(o.k === 'H' || o.k === 'S') I.bell(at, freq(7, 4), .08);
    if(o.k === 'D'){ I.tap(master, at, 1.1); I.crash(at); }
  }
  function resumeTuto(){
    api.save('tuto3.' + tk(tutoObj), true);
    t0 += rawNow() - pauseRaw; tutoOpen = false; state = 'play';
    if(useAudio && music) music.gain.setTargetAtTime(.8, actx.currentTime, .04);
  }
  function tutoWrongMsg(){ tutoWrong = 1; api.vibe(40); }
  let tutoLastDown = -9;
  function tutoDown(e){
    if(tutoOk) return;
    const p = pt(e), rn = rawNow(); try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    if(tutoObj.k === 'D' && (e.button === 2 || rn - tutoLastDown < .15)){ tutoSuccess(); return; } tutoLastDown = rn; if(e.button === 2) return;
    tutoTouch = {id: e.pointerId, x: p.x, y: p.y, ly: p.y, dir: 0, acc: 0, pts: [p], t: rn};
  }
  function tutoMove(e){
    if(!tutoTouch || e.pointerId !== tutoTouch.id) return; const p = pt(e), o = tutoObj;
    if(o.k === 'C' && Math.hypot(p.x - tutoTouch.x, p.y - tutoTouch.y) > (o.shape === 'diag' ? 34 : 22)){ const dir = {x: p.x - tutoTouch.x, y: p.y - tutoTouch.y}; tutoTouch = null; if(rightWay(o, dir)) tutoSuccess(dir); else tutoWrongMsg(); return; }
    if(o.k === 'S'){ const v = p.y - tutoTouch.ly; tutoTouch.ly = p.y; const sg = Math.sign(v);
      if(sg && sg !== tutoTouch.dir){ if(tutoTouch.acc > 12 || tutoTouch.dir === 0){ tutoCount++; scratchHit(clock(), sg < 0, tutoObj.rec); api.vibe(10); if(tutoCount >= TUTO.S.need){ tutoSuccess(); return; } }
        tutoTouch.dir = sg; tutoTouch.acc = 0; }
      tutoTouch.acc += Math.abs(v); }
  }
  function tutoUp(e){
    if(!tutoTouch || e.pointerId !== tutoTouch.id) return; const p = pt(e), o = tutoObj, st = tutoTouch, d = Math.hypot(p.x - st.x, p.y - st.y); tutoTouch = null;
    if(o.k === 'J'){ if(d < 18) tutoSuccess(); else tutoWrongMsg(); }
    if(o.k === 'C'){ if(d > 10){ const dir = {x: p.x - st.x, y: p.y - st.y}; if(rightWay(o, dir)) tutoSuccess(dir); else tutoWrongMsg(); } else tutoWrongMsg(); }
    if(o.k === 'H' && !tutoOk){ tutoHeld = 0; tutoWrongMsg(); }
    if(o.k === 'S' && !tutoOk){ tutoCount = 0; }
    if(o.k === 'D' && !tutoOk && rawNow() - tutoLastDown > .15) tutoWrongMsg();
  }
  const nextTutoObj = () => { for(const o of objs){ if(o.done || !'CJHSOWD'.includes(o.k)) continue; const db = o.beat - beatNow; if(db > .4 && db <= 2 && !api.load('tuto3.' + tk(o), false)) return o; } return null; };
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
    ctx.save(); ctx.fillStyle = 'rgba(28,27,25,.7)'; ctx.beginPath(); ctx.rect(0, 0, W, H);
    if(long){ const rx = x - 26, ry = Y0 - 44, rw = x2 - x + 52, rh = 62, rr = 14; ctx.moveTo(rx + rr, ry); ctx.arcTo(rx, ry, rx, ry + rh, rr); ctx.arcTo(rx, ry + rh, rx + rw, ry + rh, rr); ctx.arcTo(rx + rw, ry + rh, rx + rw, ry, rr); ctx.arcTo(rx + rw, ry, rx, ry, rr); ctx.closePath(); } else { ctx.moveTo(x + 46, y); ctx.arc(x, y, 46, 0, 6.283, true); }
    ctx.rect(HXs - 9, Y0 - 6, 18, TT + 12); ctx.fill('evenodd'); ctx.restore();
    ctx.save(); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -rt*30; ctx.beginPath();
    if(long) rrect(x - 26, Y0 - 44, x2 - x + 52, 62, 14); else ctx.arc(x, y, 46 + Math.sin(rt*6)*2, 0, 6.283); ctx.stroke(); ctx.restore();
    // le geste dessiné sur la forme elle-même
    let fx = x + 6, fy = y + 10, pr = 0; const hold = tutoTouch || tutoOk;
    ctx.save(); ctx.strokeStyle = '#ffd23f'; ctx.fillStyle = '#ffd23f'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    if(o.k === 'C'){ const w = wantDir(o) || {x: 1, y: 0}, k = (tutoT % 1.2)/1.2, e = 1 - Math.pow(1 - Math.min(1, Math.max(0, (k - .1)/.5)), 3);
      const sx = x - w.x*44, sy = y - w.y*44, ex = x + w.x*44, ey = y + w.y*44;
      ctx.globalAlpha = .9; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.save(); ctx.translate(ex, ey); ctx.rotate(Math.atan2(w.y, w.x)); ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-6, -13); ctx.lineTo(-6, 13); ctx.closePath(); ctx.fill(); ctx.restore();
      fx = sx + (ex - sx)*e; fy = sy + (ey - sy)*e; pr = k > .08 && k < .65 ? 1 : 0; }
    if(o.k === 'J'){ const k = (tutoT % .8)/.8; pr = k > .3 && k < .5 ? 1 : 0; fx = x + 2; fy = y + 4 - (pr ? 0 : 10);
      if(pr){ ctx.lineWidth = 3; ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); ctx.stroke(); } }
    if(o.k === 'H'){ const k = (tutoT % 1.6)/1.6; pr = hold || (k > .15 && k < .85) ? 1 : 0; fx = x + 2; fy = Y0 - 9 + (pr ? 0 : -10); const fill = tutoTouch ? Math.min(1, tutoHeld/.8) : tutoOk ? 1 : pr ? (k - .15)/.7 : 0;
      ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, Y0 - 32); ctx.lineTo(x + (x2 - x)*fill, Y0 - 32); ctx.stroke(); }
    if(o.k === 'S'){ fx = x + 8 + (tutoT*60 % Math.max(20, x2 - x - 16)); fy = Y0 - 10 + Math.sin(tutoT*18)*16; pr = 1; }
    if(o.k === 'D'){ const k = (tutoT % .9)/.9; pr = k > .3 && k < .5 ? 1 : 0; ctx.restore(); if(!tutoOk){ finger(x - 14, y + 4 - (pr ? 0 : 10), pr, -.2); finger(x + 16, y + 6 - (pr ? 0 : 10), pr, .15); } ctx.save(); fx = -999; }
    ctx.restore();
    if(!tutoOk && fx > -900) finger(fx, fy, pr);
    // la consigne, juste au-dessus de la bande
    const ly = Y0 - (o.k === 'C' && o.shape !== 'wide' ? 92 : 76);
    if(tutoOk) tutoTag(tx('OUI ! SUR LA LIGNE ROUGE, EN RYTHME'), W/2, ly, 15, '#7cf05a', HXs);
    else if(tutoWrong > 0) tutoTag(tx(o.k === 'J' ? 'SANS GLISSER !' : o.k === 'H' ? 'TIENS PLUS LONGTEMPS !' : o.k === 'C' ? 'DANS LE SENS DE LA FLÈCHE !' : o.k === 'D' ? 'DEUX DOIGTS ENSEMBLE !' : 'PLUS VITE !'), W/2, ly, 16, LABELRED, x);
    else { tutoTag(d.verb, W/2, ly, 18, PAPER, x); ctx.save(); ctx.textAlign = 'center'; ctx.font = `700 13px "Rubik", sans-serif`; ctx.fillStyle = PAPER; ctx.fillText(o.k === 'S' ? `${d.hint} · ${tutoCount}/${d.need}` : tx('essaie maintenant, {h}', {h: d.hint}), W/2, ly - 26); ctx.restore(); }
  }
  // aide au-dessus de chaque bloc ou rond qui arrive : bien visible au début, elle s'efface quand tu as compris
  function drawCue(o, x, y){
    const d = TUTO[tk(o)], n = cueN[tk(o)] || 0, fade = 1 - n/8; if(!d || !d.cue || fade <= 0) return; const bd = o.beat - beatNow; if(bd > 3 || bd < -.1) return;
    ctx.save(); ctx.globalAlpha = fade*Math.min(1, (3 - bd)*1.5); ctx.textAlign = 'center'; ctx.font = `11px ${FONT}`; const w = ctx.measureText(d.cue).width + 12, top = o.k === 'C' && o.shape === 'tall' ? 50 : 36;
    ctx.fillStyle = INK; rrect(x - w/2, y - top - 16, w, 18, 5); ctx.fill(); ctx.fillStyle = bd < .35 ? '#ffd23f' : PAPER; ctx.textBaseline = 'middle'; ctx.fillText(d.cue, x, y - top - 7); ctx.restore();
  }

  /* ---------- célébrations : mots et illustrations à l'encre en fond, pendant que la partie continue ---------- */
  const WORDS = [[], ['BIEN JOUÉ', 'ÇA GROOVE', 'QUEL RYTHME'], ['EN FEU !', 'TU TIENS LA TRANSE', 'ÇA CHAUFFE'], ['HYPNOTIQUE', 'IMPARABLE', 'TU VOLES'], ['ROI DU RYTHME', 'LÉGENDAIRE', 'NIRVANA']].map(l => l.map(w => tx(w)));
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
    const n = Math.ceil(W/30) + 2, base = H + 6, rims = TH().rim, sad = slowed ? 1 - Math.min(1, recHits/REC()) : 0;
    for(const pass of [0, 1]) for(let i=0;i<n;i++){
      const x = i*30 - 8 + (i % 2)*9, sz = 1 + ((i*37) % 10)/22, up = slowed ? (i*7 % 5) < 5*(1 - sad) - .5 : (i*7 % 5) < 1 + trance + (ek > .6 ? 1 : 0), jump = ek*(trance >= 2 ? 8 : 3)*((i % 3) ? 1 : .5)*(1 - sad), y = base - jump - (i % 2)*6 + sad*7;
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
      if(o.shape === 'tall' || o.shape === 'wide' || o.shape === 'diag'){ const v = o.shape === 'tall'; ctx.save(); if(o.shape === 'wide') ctx.rotate(Math.PI/2); if(o.shape === 'diag') ctx.rotate(Math.PI/4); if(o.rev) ctx.rotate(Math.PI);
        ctx.fillStyle = cutCol(o); rrect(-12, -27, 24, 54, 7); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.save(); rrect(-12, -27, 24, 54, 7); ctx.clip(); ctx.fillStyle = 'rgba(28,27,25,.12)'; ctx.fillRect(-12, -27, 7, 54); ctx.restore();
        const ph = (beatNow*2) % 1, chv = TH().chev; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for(let i=0;i<3;i++){ const yy = 14 - i*13 - ph*5; ctx.strokeStyle = INK; ctx.globalAlpha = .7 + i*.15; ctx.beginPath(); ctx.moveTo(-7, yy + 5); ctx.lineTo(0, yy - 3); ctx.lineTo(7, yy + 5); ctx.stroke(); }
        ctx.globalAlpha = 1; ctx.restore(); }
      else { ctx.fillStyle = PAPER; rrect(-14, -14, 28, 28, 5); ctx.fill(); shadow(false); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); ctx.save(); rrect(-14, -14, 28, 28, 5); ctx.clip(); ctx.strokeStyle = 'rgba(28,27,25,.18)'; ctx.lineWidth = 1; for(let i=-28;i<28;i+=5){ ctx.beginPath(); ctx.moveTo(i, 14); ctx.lineTo(i + 28, -14); ctx.stroke(); } ctx.restore(); ctx.fillStyle = RED; ctx.fillRect(-14, -4, 28, 6); ctx.fillStyle = INK; ctx.fillRect(-8, 6, 16, 2); }
    }
    else if(o.k === 'D'){ // double rond : deux boutons reliés, deux doigts en même temps
      ctx.fillStyle = INK; rrect(-17, -3, 34, 11, 5); ctx.fill(); ctx.fillStyle = RED; ctx.fillRect(-12, 1, 24, 3);
      for(const sx of [-15, 15]){ const pr = Math.max(0, 1 - Math.abs(o.beat - beatNow)*4); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx, 3, 12, 0, 6.283); ctx.fill(); ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(sx, -1 + pr*3, 9.5, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.stroke(); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(sx, -1 + pr*3, 3.5, 0, 6.283); ctx.fill(); }
      shadow(false); ctx.fillStyle = INK; ctx.font = `9px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText('×2', 0, -16); }
    else if(o.k === 'J'){ // rond = un tap : un gros bouton qui s'enfonce sur le temps
      const pr = Math.max(0, 1 - Math.abs(o.beat - beatNow)*4); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 3, 16, 0, 6.283); ctx.fill(); shadow(false);
      ctx.fillStyle = PAPER; ctx.beginPath(); ctx.arc(0, -1 + pr*3, 13, 0, 6.283); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke();
      { const hk = 1 + energy.kick*.25, hy2 = -1 + pr*3; ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(0, hy2 + 5*hk); ctx.bezierCurveTo(-9*hk, hy2 - 1*hk, -5*hk, hy2 - 8*hk, 0, hy2 - 3.5*hk); ctx.bezierCurveTo(5*hk, hy2 - 8*hk, 9*hk, hy2 - 1*hk, 0, hy2 + 5*hk); ctx.fill(); } }
    else if(o.k === 'N' || o.k === 'A'){ ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); ctx.fill(); shadow(false); ctx.fillRect(1.5, -12, 3, 18); ctx.beginPath(); ctx.moveTo(4.5, -12); ctx.quadraticCurveTo(14, -8, 10, 0); ctx.quadraticCurveTo(11, -6, 4.5, -6); ctx.fill(); if(o.k === 'A'){ ctx.strokeStyle = PAPER; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 17, 0, 6.283); ctx.stroke(); } }
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
  /* le décor vivant : particules, traits de vitesse et ondes sur le tempo, de plus en plus fort avec le combo
     (EN RYTHME 10, TRANSE 25, HYPNOSE 50, NIRVANA 100). Coupé si le téléphone demande moins d'animations. */
  const alive = {parts: [], lines: [], waves: [], beat: -1, last: 0};
  function aliveReset(){ alive.parts.length = 0; alive.lines.length = 0; alive.waves.length = 0; alive.beat = -1; }
  function drawAlive(rt, ek){
    const A = alive, dt = Math.min(.05, Math.max(0, rt - A.last)); A.last = rt;
    if(api.reduced) return;
    const th = TH(), ink = th.dark ? '#ffffff' : INK, cols = th.acc.concat([ink]), heat = Math.min(1, combo/100), bi = Math.floor(beatNow);
    // sur chaque temps : une volée de particules qui montent ; une onde sur chaque mesure (sur chaque temps dès la TRANSE)
    if(bi !== A.beat && beatNow >= 0){ A.beat = bi; const barB = ((bi % 4) + 4) % 4 === 0;
      if(barB || trance >= 2) A.waves.push({r: 24, a: barB ? .6 : .35, c: cols[((bi % cols.length) + cols.length) % cols.length], w: barB ? 7 : 3});
      const n = Math.round(1 + trance*2.5 + heat*5);
      for(let i=0;i<n;i++) A.parts.push({x: Math.random()*W, y: H*(.55 + Math.random()*.4), vx: (Math.random() - .5)*30, vy: -(50 + Math.random()*80)*(1 + trance*.3), s: 3 + Math.random()*4*(1 + trance*.25), c: cols[Math.floor(Math.random()*cols.length)], k: Math.floor(Math.random()*4), r: Math.random()*6.283, vr: (Math.random() - .5)*4, life: 1, g: 0});
      // NIRVANA : une gerbe qui explose au centre à chaque mesure
      if(trance >= 4 && barB) for(let i=0;i<26;i++){ const a = Math.random()*6.283, sp = 140 + Math.random()*260; A.parts.push({x: W/2, y: H*.28, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, s: 4 + Math.random()*6, c: cols[i % cols.length], k: i % 4, r: 0, vr: 7, life: 1, g: 260}); }
      if(A.parts.length > 240) A.parts.splice(0, A.parts.length - 240);
    }
    ctx.save();
    // la neige de décembre, qui tombe plus fort avec la transe
    if(XMAS || tr === NOEL){ A.snow = A.snow || []; const want2 = 26 + trance*10; while(A.snow.length < want2) A.snow.push({x: Math.random()*W, y: Math.random()*H - H, s: 1.5 + Math.random()*2.8, v: 30 + Math.random()*50, ph: Math.random()*6.283});
      if(A.snow.length > want2) A.snow.length = want2; ctx.fillStyle = '#ffffff';
      for(const f of A.snow){ f.y += f.v*(1 + trance*.25)*dt; f.x += Math.sin(rt*1.3 + f.ph)*18*dt; if(f.y > H + 6){ f.y = -6; f.x = Math.random()*W; } ctx.globalAlpha = .8; ctx.beginPath(); ctx.arc(f.x, f.y, f.s, 0, 6.283); ctx.fill(); if(!th.dark){ ctx.strokeStyle = 'rgba(28,27,25,.45)'; ctx.lineWidth = 1.2; ctx.stroke(); } } ctx.globalAlpha = 1; }
    // les ondes
    for(const w of A.waves){ w.r += dt*(280 + trance*70); w.a -= dt*(.75 - trance*.06); if(w.a <= 0) continue; ctx.globalAlpha = w.a; ctx.strokeStyle = w.c; ctx.lineWidth = w.w; ctx.beginPath(); ctx.arc(W/2, H*.28, w.r, 0, 6.283); ctx.stroke(); }
    A.waves = A.waves.filter(w => w.a > 0);
    // les traits de vitesse : plus nombreux, plus rapides et en couleur avec le combo
    const want = 4 + trance*3; while(A.lines.length < want) A.lines.push({x: Math.random()*W*1.4 - W*.4, y: Math.random()*H*1.2, l: 30 + Math.random()*70, sp: .6 + Math.random(), c: Math.floor(Math.random()*cols.length)});
    if(A.lines.length > want) A.lines.length = want;
    ctx.lineCap = 'round';
    for(const L of A.lines){ const v = (90 + trance*80 + ek*240)*L.sp; L.x += v*.8*dt; L.y -= v*.6*dt;
      if(L.x > W + 60 || L.y < -60){ L.x = Math.random()*W*.9 - W*.4; L.y = H*(.4 + Math.random()*.8); }
      ctx.globalAlpha = trance >= 1 ? .55 : .3; ctx.strokeStyle = trance >= 1 ? cols[L.c] : ink; ctx.lineWidth = 1.5 + trance*.6; ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.lineTo(L.x + L.l*.8, L.y - L.l*.6); ctx.stroke(); }
    // les particules : points, étoiles, notes, confettis
    for(const q of A.parts){ q.vy += q.g*dt; q.x += (q.vx + Math.sin(rt*2 + q.r)*14)*dt; q.y += q.vy*dt; q.r += q.vr*dt; q.life -= dt*(q.g ? .7 : .3);
      if(q.life <= 0 || q.y < -20) continue; ctx.globalAlpha = Math.min(1, q.life*1.6)*.8; ctx.fillStyle = q.c; ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.r); const z2 = q.s*(1 + ek*.3);
      if(q.k === 0){ ctx.beginPath(); ctx.arc(0, 0, z2*.6, 0, 6.283); ctx.fill(); }
      else if(q.k === 1){ ctx.beginPath(); for(let i=0;i<10;i++){ const a = i*Math.PI/5, rr = i % 2 ? z2*.45 : z2; ctx.lineTo(Math.cos(a)*rr, Math.sin(a)*rr); } ctx.closePath(); ctx.fill(); }
      else if(q.k === 2){ ctx.beginPath(); ctx.ellipse(0, z2*.5, z2*.55, z2*.4, -.4, 0, 6.283); ctx.fill(); ctx.fillRect(z2*.35, -z2*1.2, z2*.22, z2*1.7); }
      else ctx.fillRect(-z2*.7, -z2*.35, z2*1.4, z2*.7);
      ctx.restore(); }
    A.parts = A.parts.filter(q => q.life > 0 && q.y >= -20);
    ctx.restore();
  }
  function draw(rt){
    const bar = Math.floor(beatNow/4), sec = sectionOf(bar), ek = energy.kick;
    const z = 1 + bump*.025 + ek*.008;
    ctx.save(); ctx.translate(W/2, H/2); ctx.scale(z, z); ctx.translate(-W/2, -H/2);
    if(backdropFor !== tr.id){ backdrop = makeBackdrop(tr, W + 40, H + 40, tr.id); backdropFor = tr.id; }
    { const sw = api.reduced ? 0 : 1, bz = 1 + sw*(.05 + ek*(.015 + trance*.01)), sh = trance >= 4 ? sw*ek*5 : 0, tilt = trance >= 3 ? Math.sin(beatNow*Math.PI/2)*.012 : 0;
      ctx.save(); ctx.translate(W/2 + sw*Math.sin(rt*.23)*9 + (Math.random() - .5)*sh, H/2 + sw*Math.cos(rt*.17)*7 + (Math.random() - .5)*sh); ctx.rotate(sw*(Math.sin(rt*.11)*.015 + tilt)); ctx.scale(bz, bz); ctx.translate(-W/2, -H/2); ctx.drawImage(backdrop, -20, -20, W + 40, H + 40); ctx.restore(); }
    drawDeco(rt);
    if(fresco && !window.__nofresco){ ctx.save(); ctx.globalAlpha = .8; ctx.drawImage(fresco, 0, 0, W, FH); ctx.restore(); }
    drawAlive(rt, ek);
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
    ctx.textAlign = 'center'; ctx.font = `10px ${FONT}`; ctx.fillStyle = 'rgba(28,27,25,.6)'; ctx.fillText(`${tx('FACE')} ${tr.face} · ${tr.name.toUpperCase()} · ${Math.round(prog*100)} %`, W/2, REELY + REELR + 24);
    // bande
    if(trance >= 3){ ctx.fillStyle = 'rgba(215,38,61,.55)'; ctx.fillRect(-4, Y0 - 3, W + 8, TT); ctx.fillStyle = 'rgba(61,220,255,.45)'; ctx.fillRect(4, Y0 + 3, W, TT); }
    shadow(true, 18, 8); ctx.fillStyle = INK; ctx.fillRect(0, Y0, W, TT); shadow(false);
    for(let b=Math.floor(beatNow) - 2; b<beatNow + W/ppbNow() + 2; b++){ const x = xOf(b), barLine = ((b % 4) + 4) % 4 === 0, pulse = Math.max(0, 1 - Math.abs(beatNow - b)*3);
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
        if(!o.done && xOf(o.beat) < W){ ctx.font = `10px ${FONT}`; ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText(tx('MAINTIENS'), x1 - 8, Y0 - 26); }
      } else {
        const act = !o.done && now() > o.time - .15; ctx.strokeStyle = o.result === 'miss' ? 'rgba(28,27,25,.35)' : act ? RED : PAPER; ctx.lineWidth = 4; ctx.lineJoin = 'round';
        ctx.beginPath(); for(let x=x1; x<=x2; x+=8){ const y = Y0 - 10 + ((x - x1)/8 % 2 ? -7 : 7)*(act ? 1 + energy.lead*.6 : 1); x === x1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
        if(!o.done){ ctx.font = `10px ${FONT}`; ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText(act ? `${tx('SCRATCH')} ${o.strokes}/${o.need}` : tx('SCRATCH'), x1, Y0 - 26); }
      }
    }
    // objets qui dansent
    const beatPhase = beatNow - Math.floor(beatNow), dance = Math.max(0, 1 - beatPhase*4)*.1;
    for(const o of objs){
      if(o.k === 'H' || o.k === 'S') continue;
      o.born += 1/60;
      if(o.done && o.result !== 'miss') continue;
      const x = xOf(o.beat); if(x > W + 40 || x < -40) continue;
      const y = objY(o) + (o.k === 'N' || o.k === 'A' ? Math.sin(beatNow*Math.PI*2)*3 : 0);
      o.tilt = o.done ? .3 : (Math.floor(beatNow) % 2 ? .08 : -.08)*('CJWD'.includes(o.k) ? 1 : 0);
      if(o.done){ drawObj(o, x, y - 4); continue; }
      const bd = o.beat - beatNow;
      if('CJOWD'.includes(o.k) && bd < 1.6 && bd > -.15){ const r = (o.shape === 'tall' || o.shape === 'wide' || o.shape === 'diag' || 'OWD'.includes(o.k) ? 36 : 22) + Math.max(0, bd)*70, a = Math.min(1, (1.6 - bd)*1.2);
        ctx.strokeStyle = o.k === 'J' ? `rgba(28,27,25,${a})` : `rgba(244,240,230,${a})`; ctx.lineWidth = 3 + (bd < .25 ? 2 : 0); ctx.setLineDash([10, 6]); ctx.lineDashOffset = -beatNow*20; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
      drawObj(o, x, y, dance);
      if('CJOWD'.includes(o.k) && state === 'play') drawCue(o, x, y);
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
      ctx.save(); ctx.translate(W/2, 98); ctx.textAlign = 'center'; ctx.font = `14px ${FONT}`; ctx.fillStyle = TH().text; ctx.globalAlpha = .6 + .4*Math.abs(Math.sin(rt*3)); ctx.globalAlpha = 1;
      if(slowed){ const w = 120; ctx.fillStyle = 'rgba(28,27,25,.25)'; ctx.fillRect(-w/2, 8, w, 6); ctx.fillStyle = RED; ctx.fillRect(-w/2, 8, w*recHits/REC(), 6); }
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
    if(state === 'play' && isListen(bar)){ ctx.textAlign = 'center'; ctx.font = `14px ${FONT}`; ctx.fillStyle = th.text; ctx.globalAlpha = .45 + ek*.55; ctx.fillText(tx('ÉCOUTE'), W/2, Y0 - 112); ctx.globalAlpha = 1; }
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
      if(j.sub){ ctx.font = '600 13px "Rubik", sans-serif'; ctx.fillStyle = INK; ctx.fillText(j.sub, 0, 22); }
      ctx.restore();
    }
    if(state === 'tuto') drawTuto(rt);
    if(holdHint && holdState){ ctx.textAlign = 'center'; ctx.font = `16px ${FONT}`; ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.strokeText(tx('GARDE APPUYÉ…'), W/2, H*.14); ctx.fillStyle = PAPER; ctx.fillText(tx('GARDE APPUYÉ…'), W/2, H*.14); } else holdHint = 0;
  }

  const stopBtn = document.createElement('button');
  stopBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="3" y="2" width="4.5" height="14" rx="1" fill="#fff"/><rect x="10.5" y="2" width="4.5" height="14" rx="1" fill="#fff"/></svg>'; stopBtn.setAttribute('aria-label', 'Pause');
  stopBtn.style.cssText = `position:absolute;top:12px;left:50%;transform:translateX(-50%);width:54px;height:46px;border:3px solid #fff;border-radius:12px;background:${INK};color:#fff;z-index:3;cursor:pointer;display:grid;place-items:center;box-shadow:0 0 0 3px ${INK},0 4px 0 3px ${INK}`;
  stage.appendChild(stopBtn);
  function quitRun(){ if(holdState){ if(holdState.voice) holdState.voice.stop(); holdState = null; } if(useAudio && music) music.gain.setValueAtTime(0, actx.currentTime); if((state === 'play' || paused) && notesRun){ api.save('notes', bank() + notesRun); notesRun = 0; } }
  // la pause fige tout : l'horloge du jeu est celle de l'audio, on suspend l'audio
  let paused = false, pausedFrom = 'play', pauseAt = 0;
  const pauseEl = document.createElement('div'); pauseEl.className = 'k7pause'; pauseEl.hidden = true;
  pauseEl.innerHTML = `<div class="k7pcard"><div class="k7ptitle">${tx('PAUSE')}</div><div class="k7psub"></div><button class="k7pb go bs-sparks">${tx('REPRENDRE')} ${BSI.play(INK)}</button><button class="k7pb re">${BSI.redo(INK)}<span class="sep"></span>${tx('RECOMMENCER')}</button><button class="k7pb out">${BSI.back(INK)}<span class="sep"></span>${tx('QUITTER')}</button></div>`;
  // le style de la pause est posé au premier appui (les polices sont définies plus bas)
  const pauseCss = () => { if(!document.getElementById('k7-pause-css')){ const st = document.createElement('style'); st.id = 'k7-pause-css'; st.textContent = `
    .k7pause{position:absolute;inset:0;z-index:8;background:rgba(28,27,25,.72);display:grid;place-items:center;padding:20px;animation:fade .2s}
    .k7pcard{background:#f3ead7;border:5px solid ${INK};border-radius:16px;box-shadow:0 8px 0 ${INK};padding:20px 20px 22px;width:100%;max-width:320px;display:flex;flex-direction:column;gap:12px;transform:rotate(-1deg)}
    .k7ptitle{font-family:${GRAF};font-size:40px;text-align:center;color:#e8344f;-webkit-text-stroke:2px ${INK};paint-order:stroke fill;text-shadow:3px 4px 0 ${INK}}
    .k7psub{font-family:${MARKER};font-size:15px;text-align:center;margin-top:-6px}
    .k7pb{min-height:56px;border:4px solid ${INK};border-radius:12px;font-family:${GRAF};font-size:22px;cursor:pointer;box-shadow:0 5px 0 ${INK};background:#fff;color:${INK}}
    .k7pb:active{transform:translateY(4px);box-shadow:0 1px 0 ${INK}}
    .k7pb.go{background:#e8344f;color:#fff;-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill}
    .k7pb.re{background:#ffd23f}`; document.head.appendChild(st); } };
  stage.appendChild(pauseEl);
  function pauseRun(){
    if(paused || (state !== 'play' && state !== 'tuto')) return;
    pauseCss(); paused = true; pausedFrom = state; state = 'pause'; pauseAt = performance.now()/1000; gestures.clear();
    if(holdState && holdState.voice){ holdState.voice.stop(); holdState.voice = null; }
    if(useAudio) actx.suspend();
    pauseEl.querySelector('.k7psub').textContent = `${tx('FACE')} ${tr.face} · ${tr.name} · ${diff.name}`; pauseEl.hidden = false; stopBtn.hidden = true;
  }
  function resumeRun(){
    if(!paused) return; paused = false; pauseEl.hidden = true; stopBtn.hidden = false;
    if(useAudio) actx.resume(); else t0 += performance.now()/1000 - pauseAt;
    state = pausedFrom;
  }
  pauseEl.querySelector('.go').onclick = () => { api.sfx.click(); resumeRun(); };
  pauseEl.querySelector('.re').onclick = () => { api.sfx.click(); quitRun(); paused = false; pauseEl.hidden = true; if(useAudio) actx.resume(); startTrack(tr); };
  pauseEl.querySelector('.out').onclick = () => { api.sfx.click(); quitRun(); paused = false; pauseEl.hidden = true; if(useAudio) actx.resume(); state = 'menu'; auto = false; if(laboOn) showLabo(); else showMenu(); };
  // l'appli passe en arrière-plan (appel, notification) : pause au lieu de perdre la partie
  document.addEventListener('visibilitychange', () => { if(document.hidden) pauseRun(); });
  stopBtn.onclick = () => { if(auto || (state !== 'play' && state !== 'tuto')){ quitRun(); state = 'menu'; auto = false; if(laboOn) showLabo(); else showMenu(); return; } api.sfx.click(); pauseRun(); };
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
  const GRAF = FONT, MARKER = FONT;
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
    const ti = TRACKS.indexOf(t), col = open ? (ti < 0 ? '#e8343f' : SPRAY[ti % SPRAY.length]) : '#a39d92', beat = time*MBPM/60*Math.PI, bob = sel ? Math.abs(Math.sin(beat))*9 : Math.abs(Math.sin(beat))*3;
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
    g.font = `30px ${GRAF}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 7; g.strokeStyle = INK; g.strokeText(tx('FACE') + ' ' + t.face, 0, -52); g.fillStyle = '#fff'; g.fillText(tx('FACE') + ' ' + t.face, 0, -52);
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
    if(XMAS) santaHat(g, time);
    g.restore();
  }
  // le bonnet de Noël, posé de travers sur le coin droit du boîtier
  function santaHat(g, time){ g.save(); g.translate(92, -94); g.rotate(.3 + Math.sin(time*3)*.04); g.strokeStyle = INK; g.lineWidth = 5; g.lineJoin = 'round';
    g.fillStyle = '#e8343f'; g.beginPath(); g.moveTo(-56, 0); g.quadraticCurveTo(-24, -66, 26, -88); g.quadraticCurveTo(54, -96, 66, -62); g.quadraticCurveTo(42, -66, 50, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(-36, -8); g.quadraticCurveTo(-12, -56, 22, -76); g.quadraticCurveTo(-4, -50, -20, -8); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(68, -58, 15, 0, 6.283); g.fill(); g.stroke(); rrp(g, -64, -14, 124, 26, 13); g.fill(); g.stroke(); g.restore(); }
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
    .k7m{position:absolute;inset:0;z-index:4;overflow:hidden;font-family:"Rubik",sans-serif;color:${INK};touch-action:none;user-select:none;-webkit-user-select:none}
    .k7m canvas{position:absolute;inset:0;width:100%;height:100%}
    .k7m .ui{position:absolute;left:0;right:0;display:flex;padding:0 16px;pointer-events:none}
    .k7m .ui > *{pointer-events:auto}
    .k7btn{border:3px solid ${INK};border-radius:14px;background:${PAPER};color:${INK};font-family:${MARKER};cursor:pointer;box-shadow:0 5px 0 ${INK},0 0 0 5px #fff;transition:transform .12s cubic-bezier(.3,1.6,.5,1),box-shadow .12s}
    .k7btn:active{transform:translateY(4px) scale(.97);box-shadow:0 1px 0 ${INK}}
    .k7btn:focus-visible{outline:3px solid ${LABELRED};outline-offset:3px}
    .k7play{background:#ff3d7f;color:#fff;font-family:${GRAF};font-size:38px;line-height:1;padding:8px 14px 8px 30px;border:5px solid ${INK};border-radius:999px;display:flex;align-items:center;gap:12px;animation:k7pulse 1.15s ease-in-out infinite;-webkit-text-stroke:2px ${INK};paint-order:stroke fill;text-shadow:3px 4px 0 ${INK};box-shadow:0 6px 0 ${INK},0 0 0 5px #fff,0 6px 0 5px #fff}
    .k7pi{display:grid;place-items:center;width:46px;height:40px;background:#fff;border:4px solid ${INK};border-radius:10px;-webkit-text-stroke:0;text-shadow:none}
    .k7badge{background:#ffd23f;border:4px solid ${INK};border-radius:16px;padding:6px 12px 7px;box-shadow:0 5px 0 ${INK},0 0 0 5px #fff;transform:rotate(-2deg);font-family:${MARKER};font-size:21px;line-height:1.05;color:${INK};white-space:nowrap}
    .k7badge small{display:block;font-family:"Rubik",sans-serif;font-weight:700;font-size:12.5px}
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
    .k7sheet{position:absolute;inset:0;z-index:6;background:rgba(28,27,25,.6);display:flex;align-items:center;justify-content:center;padding:22px 0}
    .k7sheet > div{position:relative;width:calc(100% - 40px);max-width:420px;background:radial-gradient(rgba(28,27,25,.06) 1px,transparent 1.4px) 0 0/7px 7px,#f6eedb;border:4px solid ${INK};border-radius:6px;box-shadow:8px 9px 0 ${INK};padding:18px 18px 22px;display:flex;flex-direction:column;gap:12px;animation:k7up .35s cubic-bezier(.2,1.3,.4,1)}
    @keyframes k7up{from{transform:scale(.85) rotate(-2deg);opacity:0}}
    .k7langs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.k7langs .k7btn{padding:8px 2px;font-size:12px}.k7langs .k7btn.on{background:#ffd23f}
    .k7sheet > div{max-height:88%;overflow-y:auto}
    @media (prefers-reduced-motion:reduce){.k7play{animation:none}.k7pop,.k7sheet > div{animation:none}}`; document.head.appendChild(st); }
  const menu = document.createElement('div'); menu.className = 'k7m'; stage.appendChild(menu);
  const mcv = document.createElement('canvas'), mdpr = Math.min(window.devicePixelRatio || 1, 2); mcv.width = W*mdpr; mcv.height = H*mdpr; menu.appendChild(mcv);
  const mx = mcv.getContext('2d'); mx.setTransform(mdpr, 0, 0, mdpr, 0, 0);
  const artCache = {}, imgCache = {};
  let cur = XMAS && api.load('xmasSeen', 0) !== new Date().getFullYear() ? (api.save('xmasSeen', new Date().getFullYear()), 0) : Math.min(SHELF.length - 1, api.load('cur', 0)), dIdx = api.load('diff', 0);
  let mPos = cur, mVel = 0, mTarget = cur, drag = null, squash = 0, mFloat = [], mTime = 0, mOpen = false;
  for(let i=0;i<(XMAS ? 30 : 14);i++) mFloat.push({x: Math.random()*W, y: Math.random()*H, s: .6 + Math.random()*.9, v: 14 + Math.random()*22, ph: Math.random()*6});
  const menuBg = makeWall(Math.round(W) + 40, Math.round(H) + 40);
  let stackTop = H*.62, badgeLeft = W*.55, bgSplat = null;
  function layoutMenu(){ const b = menu.querySelector('.k7bottom'), tl = menu.querySelector('#k7tal'); if(!b || menu.hidden) return; const r = b.getBoundingClientRect(), m = menu.getBoundingClientRect(); if(m.height){ stackTop = (r.top - m.top)*H/m.height; badgeLeft = (tl.getBoundingClientRect().left - m.left)*W/m.width; } }
  // giclées nettes derrière la cassette, peintes une fois
  function makeBgSplat(){ const c = document.createElement('canvas'), S = 420; c.width = c.height = S*2; const g = c.getContext('2d'); g.scale(2, 2); const r = rngFrom('giclee'); crisp(g, r, S*.34, S*.55, 92, '#ff3d7f', 4); crisp(g, r, S*.7, S*.64, 74, '#29c4ff', 3); crisp(g, r, S*.6, S*.3, 54, '#ffd23f', 2); for(let i=0;i<40;i++){ g.fillStyle = INK; g.globalAlpha = .7; g.beginPath(); g.arc(r()*S, r()*S, r()*3, 0, 6.283); g.fill(); } return c; }
  window.addEventListener('resize', layoutMenu);
  const wrapI = i => ((i % SHELF.length) + SHELF.length) % SHELF.length;
  function cassImg(t){ const open = unlocked(t) || discs() >= t.cost, key = t.id + (open ? 1 : 0); if(!imgCache[key]){ const im = new Image(); im.src = makeCassette(t, open); imgCache[key] = im; } return imgCache[key]; }
  const ui = {};
  menu.insertAdjacentHTML('beforeend', `
    <div class="ui" style="top:14px;justify-content:flex-end;gap:10px;align-items:flex-start">
      <button id="k7back" class="k7btn k7sq" aria-label="${tx('Mes œuvres')}" style="margin-right:auto;position:relative"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${INK}"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="${INK}" stroke-width="2.2"/><path d="M12 13v4M8 21h8l-1-4H9z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></svg><span class="k7dot" id="k7bdot" hidden></span></button>
      <div id="k7tal" class="k7badge"></div>
      <button id="k7gear" class="k7btn k7sq" aria-label="${tx('Réglages')}"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z"/><circle cx="12" cy="12" r="3.4"/></svg></button></div>
    <div class="ui k7bottom" style="bottom:22px;flex-direction:column;gap:16px;align-items:stretch">
      <div id="k7info" class="k7card"></div>
      <div style="display:flex;align-items:center;justify-content:center;gap:16px">
        <button id="k7dl" class="k7btn bs-back bs-nav" aria-label="${tx('Difficulté plus facile')}">${BSI.back(INK)}</button>
        <div id="k7diffbox" style="text-align:center"></div>
        <button id="k7dr" class="k7btn bs-back bs-nav" aria-label="${tx('Difficulté plus dure')}">${BSI.fwd(INK)}</button></div>
      <div style="display:flex;justify-content:center"><button id="k7play" class="k7btn k7play"></button></div></div>`);
  ['k7back','k7tal','k7gear','k7info','k7dl','k7dr','k7diffbox','k7play'].forEach(id => ui[id] = menu.querySelector('#' + id));

  function refreshUI(pop){
    const t = SHELF[cur], open = unlocked(t), afford = !open && discs() >= t.cost, d = DIFFS[dIdx], bk = bests()[t.id + '.' + d.id];
    ui.k7tal.innerHTML = `◉ ${discs()} &nbsp;♪ ${bank()}<small>${titleOf(bank())}</small>`; { const bd = menu.querySelector('#k7bdot'); if(bd) bd.hidden = !api.load('artNew', false); }
    const st = open ? (bk ? `${DISC(bk.discs || 0)} · ${tx('{n} % de rythme', {n: bk.pct || 0})}` : tx('Jamais jouée à ce niveau')) : afford ? tx('Tu as assez de disques pour l\'ouvrir !') : tx('Il te faut {n} disques (tu en as {m})', {n: t.cost, m: discs()});
    ui.k7info.innerHTML = `<i class="st l">★</i><i class="st r">★</i><div class="nm">${t.name}</div><div class="mt">${t.label} · ${t.gestures}</div><div class="ss">${st}</div>`;
    if(pop){ ui.k7info.classList.remove('k7pop'); void ui.k7info.offsetWidth; ui.k7info.classList.add('k7pop'); }
    ui.k7diffbox.innerHTML = `<div style="position:relative;display:inline-block"><div class="k7diff"><div class="dn"><svg width="24" height="18" viewBox="0 0 24 18"><path d="M2 16V5l5 5 5-8 5 8 5-5v11z" fill="#fff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/></svg><span style="color:${dIdx >= 3 ? LABELRED : INK}">${d.name}</span></div><small>${d.note}</small></div><span class="k7mult">x${d.mult}</span></div>`;
    ui.k7play.innerHTML = open ? `${tx('JOUER')}<span class="k7pi"><svg width="20" height="22" viewBox="0 0 20 22"><path d="M3 2l15 9-15 9z" fill="#29c4ff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/></svg></span>` : afford ? tx('OUVRIR !') : `${t.cost} ◉`;
    requestAnimationFrame(layoutMenu);
    ui.k7play.style.filter = open || afford ? '' : 'grayscale(1)';
  }
  ui.k7back.onclick = () => home.querySelector('#k7trophy').onclick();
  ui.k7dl.onclick = () => { dIdx = Math.max(0, dIdx - 1); api.save('diff', dIdx); api.sfx.click(); refreshUI(); squash = .6; };
  ui.k7dr.onclick = () => { dIdx = Math.min(DIFFS.length - 1, dIdx + 1); api.save('diff', dIdx); api.sfx.click(); refreshUI(); squash = .6; };
  ui.k7play.onclick = () => {
    const t = SHELF[cur], open = unlocked(t), afford = !open && discs() >= t.cost;
    if(!open && !afford){ api.sfx.lose(); squash = -1; return; }
    if(!open){ api.save('unlock.' + t.id, true); api.sfx.coin(); squash = 1.2; for(let i=0;i<24;i++) mFloat.push({x: W/2, y: H*.42, s: 1, v: 0, ph: 0, burst: {vx: (Math.random() - .5)*500, vy: -200 - Math.random()*400, life: 1.2}}); refreshUI(true); return; }
    diff = DIFFS[dIdx]; startTrack(t);
  };
  ui.k7gear.onclick = () => {
    const sh = document.createElement('div'); sh.className = 'k7sheet';
    const muted0 = api.store.load('muted', false), vv = Math.round(voiceVol()*100);
    // pour le joueur : son, voix, calage, tutos, langue, Premium ; les outils de test seulement dans la version de test
    sh.innerHTML = `<div><div class="bs-top"><div class="k7badge">${home.querySelector('#k7htal').innerHTML}</div><div class="bs-r"><button class="k7sq" data-a="gal" aria-label="${tx('Mes œuvres')}">${BSI.gal(INK)}</button><button class="k7sq" data-a="x" aria-label="${tx('Fermer')}">${BSI.gear(INK)}</button></div></div>
      <div class="bs-panel bs-set"><button class="bs-back x" id="k7x" aria-label="${tx('Retour')}">${BSI.back(INK)}</button><div class="bs-title">${tx('RÉGLAGES')}</div>
      ${bsBtn('', 'k7mute', (muted0 ? BSI.mute : BSI.spk)(INK), tx(muted0 ? 'SON : COUPÉ' : 'SON : ACTIVÉ'))}
      <label class="bs-vol"><span class="ic">${BSI.mic(INK)}</span><span class="sep"></span><span class="bl"><b>${tx('VOIX')}</b><small id="k7vv">${vv ? vv + ' %' : tx('COUPÉE')}</small></span><input id="k7voice" type="range" min="0" max="100" step="10" value="${vv}" aria-label="${tx('Volume de la voix')}"></label>
      <div class="bs-cal"><div class="row"><b>${tx('Calage')}</b><div class="st"><button id="k7offm" aria-label="−">−</button><span id="k7off">${api.load('offset', 0)} ms</span><button id="k7offp" aria-label="+">+</button></div></div><p>${tx('Coupes « en retard » ? Monte le calage, ou laisse le jeu le trouver.')}</p>${bsBtn('yellow pill', 'k7calib', '', tx('TROUVER MON CALAGE'))}</div>
      ${bsBtn('', 'k7tuto', BSI.cap(INK), tx('REVOIR LES TUTOS'))}
      <div class="bs-langs">${Object.entries(BSi18n.LANGS).map(([c, n]) => `<button class="${c === BSi18n.lang ? 'on' : ''}" data-lang="${c}" aria-label="${n}">${['zh', 'ja', 'ko'].includes(c) ? n : c.toUpperCase()}</button>`).join('')}</div>
      ${window.BSPremium ? bsBtn('pink pill', 'k7prem', BSI.crown(INK), '') + `<button class="bs-link" id="k7rest">${tx('Restaurer mes achats')}</button>` : ''}
      ${window.BS_TEST_BUILD ? `<div class="bs-testzone"><b>${tx('OUTILS DU DÉVELOPPEUR')}</b>
        ${bsBtn('dark', 'k7all', BSI.lock('#fff'), tx(api.load('allOpen', false) ? 'CASSETTES OUVERTES ✓' : 'TOUT DÉBLOQUER'))}
        ${bsBtn('yellow', 'k7labo', BSI.phones(INK), tx('LABO'))}</div>` : ''}
      <div class="bs-ver">BEAT SPLASH · version ${VERSION}</div></div></div>`;
    menu.appendChild(sh);
    const close = () => { pageOut(sh); if(window.BSPremium) BSPremium.onChange = null; };
    sh.querySelector('#k7x').onclick = close; sh.querySelector('[data-a=x]').onclick = close;
    sh.querySelector('[data-a=gal]').onclick = () => { close(); home.querySelector('#k7trophy').onclick(); };
    // Premium : un achat unique qui retire les pubs. Le bouton montre le prix (celui du magasin), puis « activé ».
    if(window.BSPremium){
      const prem = sh.querySelector('#k7prem'), rest = sh.querySelector('#k7rest');
      const showPrem = msg => { const on = BSPremium.isOn(); prem.querySelector('.bl').textContent = msg || tx(on ? 'PREMIUM ACTIVÉ ✓' : 'PREMIUM SANS PUB · {price}', {price: BSPremium.price()}); prem.disabled = on; rest.hidden = on; };
      showPrem(); BSPremium.onChange = () => showPrem(); // le prix local arrive du magasin après le lancement
      prem.onclick = async () => { if(BSPremium.isOn()) return; api.sfx.click();
        if(!BSPremium.canBuy){ showPrem(tx("Le Premium s'achète dans l'application BEAT SPLASH.")); return; }
        showPrem(await BSPremium.buy() ? tx('Premium activé. Merci !') : ''); };
      rest.onclick = async () => { api.sfx.click(); const ok = await BSPremium.restore(); showPrem(ok ? tx('Premium activé. Merci !') : tx('Aucun achat à restaurer.')); };
    }
    sh.querySelector('#k7voice').oninput = e => { const v = +e.target.value; api.save('voiceVol', v); sh.querySelector('#k7vv').textContent = v ? v + ' %' : tx('COUPÉE'); if(vox && actx) vox.gain.setTargetAtTime(.8*v/100, actx.currentTime, .05); };
    sh.querySelector('#k7calib').onclick = () => { api.sfx.click(); calibrate(v => { sh.querySelector('#k7off').textContent = v + ' ms'; }); };
    sh.querySelector('#k7mute').onclick = () => { const m = !api.store.load('muted', false); api.store.save('muted', m); sh.querySelector('#k7mute .bl').textContent = tx(m ? 'SON : COUPÉ' : 'SON : ACTIVÉ'); sh.querySelector('#k7mute .ic').innerHTML = (m ? BSI.mute : BSI.spk)(INK); };
    const setOff = d => { const v = Math.max(-200, Math.min(200, api.load('offset', 0) + d)); api.save('offset', v); sh.querySelector('#k7off').textContent = v + ' ms'; };
    sh.querySelector('#k7offm').onclick = () => setOff(-10); sh.querySelector('#k7offp').onclick = () => setOff(10);
    { const lb = sh.querySelector('#k7labo'); if(lb) lb.onclick = () => { close(); showLabo(); }; }
    const all = sh.querySelector('#k7all'); if(all) all.onclick = () => { const v = !api.load('allOpen', false); api.save('allOpen', v); api.sfx.coin(); sh.querySelector('#k7all .bl').textContent = tx(v ? 'CASSETTES OUVERTES ✓' : 'TOUT DÉBLOQUER'); refreshUI(); refreshHome(); };
    sh.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { api.sfx.click(); BSi18n.setLang(b.dataset.lang); });
    sh.querySelector('#k7tuto').onclick = () => { ['CV','CH','CD','CVR','CHR','CDR','J','D','H','S'].forEach(k => api.save('tuto3.' + k, false)); sh.querySelector('#k7tuto .bl').textContent = tx('TUTOS RÉACTIVÉS') + ' ✓'; api.sfx.coin(); };
  };

  /* calage guidé : le jeu joue des coups réguliers, le joueur tape dessus ; l'écart moyen entre ses taps et le moment où le son
     part donne le retard de son téléphone et de son casque, moins ce que le navigateur annonce déjà */
  function calibrate(done){
    try{ muted = api.store.load('muted', false); audioInit(); if(actx && actx.state === 'suspended') actx.resume(); }catch(e){}
    const sh = document.createElement('div'); sh.className = 'k7sheet';
    sh.innerHTML = `<div><div style="display:flex;flex-direction:row-reverse;justify-content:flex-end;align-items:center;gap:14px"><b class="bs-ptitle">${tx('CALAGE')}</b><button class="bs-back" data-a="x" aria-label="${tx('Retour')}">${BSI.back(INK)}</button></div>
      <div class="bs-card">${tx('Casque filaire conseillé. Tape pile sur chaque coup.')}</div>
      <button class="bs-pad" type="button" aria-label="${tx('Tape ici sur chaque coup')}"><i></i><b>${tx('TOUCHE POUR COMMENCER')}</b></button>
      <div class="bs-rank" data-a="res">${tx('Calage actuel : {n} ms', {n: api.load('offset', 0)})}</div>
      <div class="acts2" style="display:flex;gap:12px" hidden>${bsBtn('pink pill', '', '', tx('APPLIQUER'), 'data-a="ok"')}${bsBtn('pill', '', '', tx('RECOMMENCER'), 'data-a="again"')}</div></div>`;
    menu.appendChild(sh);
    const pad = sh.querySelector('.bs-pad'), lab = pad.querySelector('b'), res = sh.querySelector('[data-a=res]'), acts = sh.querySelector('.acts2');
    const step = 60/96, lead = 4, count = 8; let run = null, prop = null;
    const close = () => { if(run) run.stop = true; pageOut(sh); };
    sh.querySelector('[data-a=x]').onclick = close;
    function start(){
      if(!actx){ res.textContent = tx('Le son ne démarre pas : vérifie qu\'il n\'est pas coupé.'); return; }
      acts.hidden = true; prop = null; const t0c = actx.currentTime + .6, beats = Array.from({length: lead + count}, (_, i) => t0c + i*step);
      run = {beats, taps: [], stop: false};
      beats.forEach((t, i) => osc(master, 'square', i < lead ? 660 : 990, t, .05, .22, {lp: [5000, 2000, 1]}));
      (function tick(){ if(run.stop || !sh.isConnected) return; const now2 = actx.currentTime, k = beats.findIndex(t => t > now2 - .08);
        const ph = beats.reduce((m, t) => Math.min(m, Math.abs(now2 - t)), 9); pad.style.setProperty('--k', Math.max(0, 1 - ph*8).toFixed(2));
        const n = Math.max(0, Math.min(count, run.taps.length));
        lab.textContent = now2 < beats[lead] - .1 ? tx('ÉCOUTE…') + ' ' + Math.max(1, lead - Math.floor((now2 - t0c)/step)) : tx('TAPE !') + ' ' + n + '/' + count;
        if(now2 > beats[beats.length - 1] + .5) return finish();
        requestAnimationFrame(tick); })();
    }
    function finish(){
      const ds = run.taps.map(t => { const b = run.beats.slice(lead).reduce((m, x) => Math.abs(t - x) < Math.abs(t - m) ? x : m); return t - b; }).filter(d => Math.abs(d) < .35);
      run.stop = true;
      if(ds.length < 5){ lab.textContent = tx('TOUCHE POUR RECOMMENCER'); res.textContent = tx('Pas assez de taps : recommence en tapant sur chaque coup.'); return; }
      ds.sort((a, b) => a - b); const mid = ds.slice(1, ds.length - 1), avg = mid.reduce((a, b) => a + b, 0)/mid.length;
      const base = actx.outputLatency || actx.baseLatency || 0; prop = Math.max(-200, Math.min(200, Math.round((avg - base)*100)*10));
      lab.textContent = tx('TOUCHE POUR RECOMMENCER'); res.textContent = tx('Calage proposé : {n} ms (actuel : {m} ms)', {n: prop, m: api.load('offset', 0)}); acts.hidden = false;
    }
    pad.addEventListener('pointerdown', e => { e.preventDefault(); if(run && !run.stop){ run.taps.push(actx.currentTime); pad.classList.remove('hit'); void pad.offsetWidth; pad.classList.add('hit'); } else start(); });
    sh.querySelector('[data-a=again]').onclick = () => { api.sfx.click(); start(); };
    sh.querySelector('[data-a=ok]').onclick = () => { if(prop == null) return; api.save('offset', prop); api.sfx.coin(); done && done(prop); close(); };
  }
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
  // quand chaque lettre de BEAT SPLASH gicle : B-E-A-T sur « BEAT », S-P-L-A-S-H sur « SPLASH » (calé sur l'enregistrement)
  const POPT = [.1, .16, .22, .28, .58, .65, .72, .79, .86, .93];
  function introGo(){
    if(!intro || intro.stage !== 'wait') return;
    intro.stage = 'load'; intro.t = 0;
    try{ muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted; if(actx && actx.state === 'suspended') actx.resume(); loadVoice(); loadRecs(); }catch(e){}
  }
  function introPlay(){
    intro.stage = 'play'; intro.t = 0;
    if(!useAudio || actx.state !== 'running'){ intro.silent = true; return; }
    events = []; t0 = 0; resetRate(); const s0 = actx.currentTime + .08, f = [196, 220, 247, 294, 330, 392, 392];
    // votre « BEAT SPLASH », un coup de grosse caisse sur chaque mot, la cymbale quand le titre est complet
    if(playRec('titre', s0, 1, {rev: .3, dly: .2})){
      for(const at of [s0 + POPT[0], s0 + POPT[4]]){ osc(master, 'sine', 160, at, .3, .8, {glide: 42, gt: .1}); noise(master, at, .012, .2, 'highpass', 2500); }
      try{ I.crash(s0 + 1.2); I.clap(s0 + 1.2, .4); }catch(e){}
      return;
    }
    const shout = false;
    for(let i=0;i<7;i++){ const at = s0 + i*ISTEP*(i === 6 ? 1.5 : 1);
      if(i % 2 === 0){ osc(master, 'sine', 160, at, .3, .8, {glide: 42, gt: .1}); noise(master, at, .012, .2, 'highpass', 2500); }
      if(!shout && !sing(vox, at, f[i], i, i === 6 ? .9 : .75, {long: i === 6, rev: .3, dly: i === 6 ? .3 : 0})) osc(master, 'triangle', f[i]*2, at, .18, .2);
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
  // iPhone : le son ne s'ouvre que pendant un toucher. Chaque toucher le débloque (avec un son vide, l'astuce iOS),
  // et si le titre s'est animé sans le son, le cri repart tout de suite
  function unlockAudio(){
    try{
      muted = api.store.load('muted', false); audioInit(); useAudio = !!actx && !muted; if(!actx) return;
      if(actx.state !== 'running'){ actx.resume(); const sb = actx.createBufferSource(); sb.buffer = actx.createBuffer(1, 1, 22050); sb.connect(actx.destination); sb.start(0); }
      loadVoice(); loadRecs();
      if(useAudio && intro && (intro.silent || intro.stage === 'load' || (intro.stage === 'wait' && intro.shown))) intro = {stage: 'load', t: 0, shown: intro.shown};
    }catch(e){}
  }
  document.addEventListener('pointerdown', unlockAudio, true); document.addEventListener('touchend', unlockAudio, true);
  function introFrame(g, dt){
    if(!intro) return;
    intro.t += dt;
    if(intro.stage === 'load'){ const live = useAudio && actx && actx.state === 'running'; if((live && recBuf.titre) || !useAudio || intro.t > 1.5) introPlay(); }
    if(intro.stage === 'play'){
      const pt2 = intro.t - .08 - ILET.length*ISTEP;
      for(let i=0;i<POPT.length;i++){ const d2 = intro.t - .08 - POPT[i]; if(d2 > 0 && d2 < dt + .001){ mFloat.push(...Array.from({length: 4}, () => ({x: W*(.2 + i*.065), y: H*.16, v: 0, s: .8 + Math.random()*.6, ph: Math.random()*6, burst: {vx: (Math.random() - .5)*380, vy: -200 - Math.random()*250, life: 1}}))); squash = .4; } }
      // animé sans le son (pas encore le droit au son) : le prochain toucher rejouera le cri
      if(intro.t > 2.6) intro = intro.silent ? {stage: 'wait', t: 0, shown: true} : null;
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
    const cassR = Math.min(W*.37, Math.max(64, (stackTop - 178)/2.1)), cx = W/2, cy = 178 + (stackTop - 178)*.47, beat = mTime*MBPM/60, bt = beat - Math.floor(beat), kick = Math.max(0, 1 - bt*4);
    // giclées de peinture derrière la cassette, qui pulsent sur le temps
    { if(!bgSplat) bgSplat = makeBgSplat(); const z = cassR/150*1.15*(1 + kick*.035); g.drawImage(bgSplat, cx - 210*z, cy - 210*z, 420*z, 420*z); }
    // notes qui s'envolent
    for(const n of mFloat){
      if(n.burst){ n.burst.vy += 900*dt; n.x += n.burst.vx*dt; n.y += n.burst.vy*dt; n.burst.life -= dt; }
      else if(XMAS){ n.y += n.v*dt; n.x += Math.sin(mTime*1.5 + n.ph)*12*dt; if(n.y > H + 30){ n.y = -20; n.x = Math.random()*W; }
        g.save(); g.translate(n.x, n.y); g.rotate(mTime*.5 + n.ph); g.scale(n.s, n.s); g.globalAlpha = .85; g.strokeStyle = '#fff'; g.lineWidth = 2.4; g.lineCap = 'round'; g.beginPath(); for(let k=0;k<3;k++){ const a = k*Math.PI/3; g.moveTo(-Math.cos(a)*9, -Math.sin(a)*9); g.lineTo(Math.cos(a)*9, Math.sin(a)*9); } g.stroke(); g.restore(); continue; }
      else { n.y -= n.v*dt; n.x += Math.sin(mTime*1.5 + n.ph)*12*dt; if(n.y < -30){ n.y = H + 20; n.x = Math.random()*W; } }
      g.save(); g.translate(n.x, n.y); g.rotate(Math.sin(mTime*2 + n.ph)*.3); g.scale(n.s, n.s); g.globalAlpha = n.burst ? Math.max(0, n.burst.life) : .55; g.fillStyle = n.burst ? SPRAY[Math.floor(n.ph*10) % SPRAY.length] : (n.ph > 3 ? INK : SPRAY[Math.floor(n.ph*2) % SPRAY.length]);
      g.beginPath(); g.ellipse(-3, 6, 6, 4.5, -.4, 0, 6.283); g.fill(); g.fillRect(1.5, -14, 3, 20); g.beginPath(); g.moveTo(4.5, -14); g.quadraticCurveTo(14, -10, 10, 0); g.quadraticCurveTo(11, -7, 4.5, -7); g.fill(); g.restore();
    }
    mFloat = mFloat.filter(n => !n.burst || n.burst.life > 0);
    // titre : « TOUCHE ! » avant l'intro, puis BEAT SPLASH en graffiti
    drawMenuTitle(g, mTime);
    introFrame(g, dt);
    // les cassettes mascottes : voisines qui dépassent sur les côtés, celle du centre qui danse
    const base = Math.floor(mPos), look = drag ? {x: Math.max(-1, Math.min(1, -drag.v*3)), y: 0} : {x: Math.sin(mTime*.7)*.6, y: Math.sin(mTime*1.1)*.4};
    for(const off of [-2, -1, 2, 1, 0].map(o => o + (mPos - base > .5 ? 1 : 0))){
      const i = base + off, d = i - mPos, ad = Math.abs(d); if(ad > 2.2) continue;
      const t = SHELF[wrapI(i)], open = unlocked(t) || discs() >= t.cost, sel = ad < .5;
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
    .k7plate{position:relative;isolation:isolate;display:flex;align-items:center;justify-content:center;gap:14px;width:100%;border:0;background:none;font-family:${FONT};color:${INK};cursor:pointer;padding:0 22px;transition:transform .12s cubic-bezier(.3,1.6,.5,1)}
    .k7plate::before,.k7plate::after{content:"";position:absolute;inset:0;z-index:-1;clip-path:polygon(0 8%,4% 0,11% 6%,19% 1%,27% 7%,36% 0,45% 5%,55% 0,63% 6%,72% 1%,81% 7%,90% 0,96% 5%,100% 2%,98% 30%,100% 55%,97% 78%,100% 100%,91% 94%,83% 100%,74% 94%,64% 100%,55% 95%,45% 100%,36% 94%,27% 100%,18% 94%,9% 100%,2% 95%,0 70%,2% 48%,0 26%)}
    .k7plate::after{background:${INK};transform:translate(4px,6px);z-index:-2}
    .k7plate::before{background:var(--paper)}
    .k7plate{filter:drop-shadow(2.5px 0 0 ${INK}) drop-shadow(-2.5px 0 0 ${INK}) drop-shadow(0 2.5px 0 ${INK}) drop-shadow(0 -2.5px 0 ${INK})}
    .k7plate:active{transform:translateY(4px)}
    .k7plate:active::after{transform:translate(2px,2px)}
    .k7plate:focus-visible{outline:3px solid #29c4ff;outline-offset:6px}
    .k7plate .ico{flex:none;width:44px;height:30px;display:grid;place-items:center}
    .k7plate .lbl{flex:1;text-align:left;letter-spacing:.5px}
    .k7plate.big{--paper:#e8344f;height:84px;font-size:44px;color:#fff;-webkit-text-stroke:2.5px ${INK};paint-order:stroke fill;text-shadow:3px 4px 0 ${INK};transform:rotate(-2deg)}
    .k7plate.big .lbl{text-align:center}
    .k7plate.big:active{transform:rotate(-2deg) translateY(4px)}
    .k7plate.mid,.k7plate.opt{--paper:#f3ead7;height:60px;font-size:27px;width:90%;margin:0 auto}
    .k7plate.mid{transform:rotate(.8deg)}.k7plate.opt{transform:rotate(-.7deg);--paper:#ffd23f}
    .k7plate.mid::after{background:#29c4ff;transform:translate(-5px,7px)}
    @keyframes k7bob{0%,100%{translate:0 0}50%{translate:0 -4px}}
    @keyframes k7kick{0%,100%{scale:1}12%{scale:1.045}40%{scale:1}}
    .k7hbtns .k7plate,.k7tbtns .k7plate{animation:k7bob ${(120/MBPM).toFixed(3)}s ease-in-out infinite}
    .k7hbtns .k7plate:nth-child(2),.k7tbtns .k7plate:nth-child(2){animation-delay:-.25s}.k7hbtns .k7plate:nth-child(3),.k7tbtns .k7plate:nth-child(3){animation-delay:-.5s}.k7tbtns .k7plate:nth-child(4){animation-delay:-.75s}
    .k7hbtns .k7plate.big,.k7tbtns .k7plate.big{animation:k7kick ${(60/MBPM).toFixed(3)}s ease-out infinite}
    @media (prefers-reduced-motion:reduce){.k7hbtns .k7plate,.k7tbtns .k7plate{animation:none !important}}
    .k7plate.death{--paper:${INK};color:#fff}.k7plate.death::after{background:#e8344f}.k7plate .lbl{white-space:nowrap}
    .k7tbtns .k7plate.mid,.k7tbtns .k7plate.opt{height:54px;font-size:24px}.k7tbtns .k7plate.death{font-size:21px}
    .k7home.short .k7tbtns .k7plate.mid,.k7home.short .k7tbtns .k7plate.opt{height:42px;font-size:19px}.k7home.short .k7tbtns .k7plate.death{font-size:17px}
    .k7home.short .k7plate.big{height:64px;font-size:34px}.k7home.short .k7plate.big .lbl small{font-size:11.5px}.k7home.short .k7plate.mid,.k7home.short .k7plate.opt{height:46px;font-size:21px}.k7home.short .k7plate .drips{height:18px}
    .k7plate.big::before{background:radial-gradient(rgba(255,255,255,.2) 1.6px,transparent 2.2px) 0 0/8px 8px,var(--paper)}
    .k7plate .chev{flex:none;width:22px;height:30px}.k7plate > svg{flex:none}
    .k7plate .drips{position:absolute;left:18%;top:calc(100% - 4px);width:64%;height:30px;z-index:-1;pointer-events:none}
    .k7plate.big .lbl{display:flex;flex-direction:column;align-items:center;line-height:.95}
    .k7plate.big .lbl small{font-family:Rubik,sans-serif;font-weight:800;text-transform:uppercase;font-size:13px;-webkit-text-stroke:0;text-shadow:none;color:#fff;background:${INK};padding:2px 10px 1px;margin-top:4px;transform:rotate(1deg);letter-spacing:.3px;white-space:nowrap;max-width:62vw;overflow:hidden;text-overflow:ellipsis}
    .k7clist{display:flex;flex-direction:column;gap:9px}
    #k7cdiff .k7diff{padding:6px 30px 7px 14px}#k7cdiff .k7diff .dn{font-size:18px;white-space:nowrap}#k7cdiff .k7mult{right:-18px;top:-18px;font-size:16px;padding:7px 7px 5px}
    .k7crow{display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:4px 12px;text-align:left;background:#fff;border:3px solid ${INK};border-radius:12px;padding:8px 12px;box-shadow:0 4px 0 ${INK};font:inherit;color:${INK};cursor:pointer}
    .k7crow.on{background:#ffd23f}.k7crow.lock{background:#e4ddcc}
    .k7crow .sw{grid-row:span 2;width:38px;height:26px;border:3px solid ${INK};border-radius:5px;position:relative}
    .k7crow .sw::after{content:"";position:absolute;left:5px;right:5px;top:6px;height:8px;border-radius:3px;background:#f3ead7}
    .k7crow .nm{font-family:${MARKER};font-size:16px;line-height:1.1}.k7crow .mt{font-size:12px;font-weight:600;opacity:.75}
    .k7crow .ss{grid-row:span 2;font-family:${MARKER};font-size:14px;text-align:right;color:#d7263d;max-width:110px}
        .k7dot{position:absolute;right:-5px;top:-5px;width:14px;height:14px;border-radius:50%;background:#e8344f;border:3px solid ${INK}}
    .k7gal{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-height:60vh;overflow-y:auto}
    .k7gal figure{margin:0;background:#fff;border:3px solid ${INK};border-radius:10px;overflow:hidden;cursor:pointer}
    .k7gal img{display:block;width:100%;aspect-ratio:9/10;object-fit:cover}
    .k7gal .empty{display:grid;place-items:center;aspect-ratio:9/10;background:repeating-linear-gradient(45deg,#ece5d3 0 10px,#e2dac6 10px 20px);font-family:${MARKER};font-size:14px;text-align:center;padding:8px}
    .k7gal figcaption{padding:5px 8px;font-family:${MARKER};font-size:14px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:0 6px}`; document.head.appendChild(st); }
  const home = document.createElement('div'); home.className = 'k7home'; menu.appendChild(home);
  const hcv = document.createElement('canvas'); hcv.width = W*mdpr; hcv.height = H*mdpr; home.appendChild(hcv); const hx = hcv.getContext('2d'); hx.setTransform(mdpr, 0, 0, mdpr, 0, 0);
  const TROPHY = `<svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${INK}"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="${INK}" stroke-width="2.2"/><path d="M12 13v4M8 21h8l-1-4H9z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></svg>`;
  const CASS = `<svg width="42" height="28" viewBox="0 0 42 28"><rect x="2" y="2" width="38" height="24" rx="4" fill="${INK}"/><rect x="7" y="7" width="28" height="10" rx="2" fill="#f3ead7"/><circle cx="14" cy="12" r="3" fill="${INK}"/><circle cx="28" cy="12" r="3" fill="${INK}"/><path d="M11 26l3-5h14l3 5" fill="#f3ead7"/></svg>`;
  const GEAR = ui.k7gear.innerHTML, BARS = `<svg width="30" height="26" viewBox="0 0 30 26"><g fill="${INK}"><rect x="1" y="16" width="5" height="9"/><rect x="8" y="10" width="5" height="15"/><rect x="15" y="4" width="5" height="21"/><rect x="22" y="12" width="5" height="13"/></g></svg>`;
  const SKULL_HOME = `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 2C7 2 3.5 5.6 3.5 10.2c0 2.5 1.1 4.2 2.5 5.2V19c0 .6.4 1 1 1h1.6v-2.2h1.6V20h3.6v-2.2h1.6V20H17c.6 0 1-.4 1-1v-3.6c1.4-1 2.5-2.7 2.5-5.2C20.5 5.6 17 2 12 2z" fill="#fff"/><circle cx="8.7" cy="10.6" r="2.4" fill="${INK}"/><circle cx="15.3" cy="10.6" r="2.4" fill="${INK}"/><path d="M12 13.3l-1.4 2.4h2.8z" fill="${INK}"/></svg>`;
  home.insertAdjacentHTML('beforeend', `
    <div class="bs-logo"><div class="bs-title bolt">BEAT<span class="p">SPLASH</span></div></div>
    <div class="ui" style="top:14px;justify-content:space-between;align-items:flex-start">
      <div style="display:flex;gap:10px;align-items:flex-start"><button id="k7hback" class="k7btn k7sq bs-back" aria-label="${tx('Retour')}" hidden>${BSI.back(INK)}</button><div id="k7htal" class="k7badge" style="transform:rotate(-1.5deg)"></div></div>
      <div style="display:flex;gap:10px"><button id="k7trophy" class="k7btn k7sq" aria-label="${tx('Mes œuvres')}" style="position:relative"><svg width="26" height="26" viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="15" rx="1.5" fill="none" stroke="${INK}" stroke-width="2.4"/><path d="M5 16l4.5-5 3.5 3.5 2.5-2.5L19 16z" fill="${INK}"/><circle cx="15.5" cy="8.5" r="1.8" fill="#e8344f"/></svg><span class="k7dot" hidden></span></button><button id="k7hgear" class="k7btn k7sq" aria-label="${tx('Options')}">${GEAR}</button></div></div>
    <div class="ui k7hbtns" style="flex-direction:column;gap:14px;padding:0 34px">
      <button id="k7hplay" class="k7plate big"><span class="lbl"></span><svg width="38" height="40" viewBox="0 0 34 36"><path d="M5 4l25 14L5 32z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></svg><svg class="drips" viewBox="0 0 200 30" preserveAspectRatio="none"><g fill="#e8344f" stroke="${INK}" stroke-width="2.5"><path d="M14 0v14a5 5 0 0 0 10 0V0z"/><path d="M70 0v22a4 4 0 0 0 8 0V0z"/><path d="M128 0v10a5 5 0 0 0 10 0V0z"/><path d="M176 0v18a4 4 0 0 0 8 0V0z"/></g></svg></button>
      <button id="k7hlvl" class="k7plate mid"><span class="ico">${CASS}</span><span class="lbl">${tx('CASSETTES')}</span><svg class="chev" viewBox="0 0 22 30"><path d="M6 5l10 10-10 10" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button id="k7hopt" class="k7plate opt"><span class="ico">${GEAR}</span><span class="lbl">${tx('OPTIONS')}</span><svg class="chev" viewBox="0 0 22 30"><path d="M6 5l10 10-10 10" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
    <div class="ui k7tbtns" style="flex-direction:column;gap:14px;padding:0 34px">
      <button id="k7tcamp" class="k7plate big"><span class="lbl">${tx('CAMPAGNE')}<small id="k7tcsub"></small></span><svg width="38" height="40" viewBox="0 0 34 36"><path d="M5 4l25 14L5 32z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></svg><svg class="drips" viewBox="0 0 200 30" preserveAspectRatio="none"><g fill="#e8344f" stroke="${INK}" stroke-width="2.5"><path d="M14 0v14a5 5 0 0 0 10 0V0z"/><path d="M70 0v22a4 4 0 0 0 8 0V0z"/><path d="M128 0v10a5 5 0 0 0 10 0V0z"/><path d="M176 0v18a4 4 0 0 0 8 0V0z"/></g></svg></button>
      <button id="k7tdeath" class="k7plate mid death"><span class="ico" style="color:#fff">${SKULL_HOME}</span><span class="lbl">${tx('CASSETTE DE LA MORT')}</span>${BSI.dch()}</button>
      <button id="k7trec" class="k7plate mid"><span class="ico">${TROPHY}</span><span class="lbl">${tx('RECORDS')}</span><svg class="chev" viewBox="0 0 22 30"><path d="M6 5l10 10-10 10" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button id="k7topt" class="k7plate opt"><span class="ico">${GEAR}</span><span class="lbl">${tx('OPTIONS')}</span><svg class="chev" viewBox="0 0 22 30"><path d="M6 5l10 10-10 10" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`);
  const hb = home.querySelector('.k7hbtns'), tb = home.querySelector('.k7tbtns'); const shortH = H < 740; if(shortH) home.classList.add('short'); /* petit écran : tout se resserre pour laisser voir la scène */
  for(const b of [hb, tb]){ b.style.top = Math.round(shortH ? Math.max(H*.39, 236) : Math.max(H*.4, 300)) + 'px'; b.style.gap = shortH ? '11px' : '16px'; } let hbBottom = H*.62;
  home.querySelector('.bs-logo').style.top = (shortH ? 74 : 76) + 'px';
  // un libellé trop long pour son bouton (selon la langue) : la police rétrécit jusqu'à ce qu'il tienne sur une ligne
  const fitLabels = root => root.querySelectorAll('.k7plate:not(.big) .lbl').forEach(l => { l.style.fontSize = ''; let fs = parseFloat(getComputedStyle(l).fontSize); while(l.scrollWidth > l.clientWidth + 1 && fs > 11){ fs -= .5; l.style.fontSize = fs + 'px'; } });
  const layoutHome = () => { fitLabels(home); const r = (homeMode === 'camp' ? hb : tb).getBoundingClientRect(), m = home.getBoundingClientRect(); if(m.height) hbBottom = (r.bottom - m.top)*H/m.height; };
  let homeOn = false, hTime = 0, homeMode = 'title', hSnow = []; home.hidden = true;
  const showHome = mode => { if(mode) homeMode = mode; homeOn = true; home.hidden = false; hb.hidden = homeMode !== 'camp'; tb.hidden = homeMode === 'camp'; home.querySelector('#k7hback').hidden = homeMode !== 'camp'; refreshHome(); };
  function refreshHome(){ requestAnimationFrame(layoutHome); home.querySelector('#k7tcsub').textContent = tx('{n} cassettes', {n: SHELF.length}) + ' · ' + discs() + ' ◉'; home.querySelector('#k7htal').innerHTML = `◉ ${discs()} &nbsp;♪ ${bank()}<small>${titleOf(bank())}</small>`; home.querySelector('.k7dot').hidden = !api.load('artNew', false);
    const t = SHELF[cur], open = unlocked(t), afford = !open && discs() >= t.cost, pb = home.querySelector('#k7hplay');
    pb.querySelector('.lbl').innerHTML = `${open ? tx('JOUER') : afford ? tx('OUVRIR !') : t.cost + ' ◉'}<small>${t.name} · ${DIFFS[dIdx].name}</small>`; pb.style.filter = open || afford ? '' : 'grayscale(.7)'; }
  home.addEventListener('pointerdown', introGo, true);
  // changer de cassette : elle saute au centre de la scène
  let hSel = 1, hDir = 0;
  function pickCass(i){ i = wrapI(i); if(i === cur) return; const n = SHELF.length; hDir = ((i - cur + n) % n) <= n/2 ? 1 : -1; cur = i; api.save('cur', cur); hSel = 0; api.sfx.click(); refreshHome(); }
  function playCur(){
    const t = SHELF[cur], open = unlocked(t), afford = !open && discs() >= t.cost;
    if(!open && !afford){ api.sfx.lose(); hSel = .4; return; }
    if(!open){ api.save('unlock.' + t.id, true); api.sfx.coin(); hSel = 0; refreshHome(); return; }
    api.sfx.coin(); diff = DIFFS[dIdx]; briefing(t, () => { homeOn = false; home.hidden = true; startTrack(t); });
  }
  // la scène : glisser pour changer, toucher une voisine pour l'amener, toucher celle du centre pour la lancer
  let hDrag = null;
  hcv.addEventListener('pointerdown', e => { const r = hcv.getBoundingClientRect(); hDrag = {x: e.clientX, y: (e.clientY - r.top)*H/r.height, xi: (e.clientX - r.left)*W/r.width}; });
  hcv.addEventListener('pointerup', e => { if(!hDrag) return; const dx = e.clientX - hDrag.x, d = hDrag; hDrag = null; if(d.y < hbBottom) return; if(homeMode !== 'camp'){ api.sfx.click(); showHome('camp'); return; }
    if(Math.abs(dx) > 40) return pickCass(cur + (dx < 0 ? 1 : -1));
    if(d.xi < W*.27) pickCass(cur - 1); else if(d.xi > W*.73) pickCass(cur + 1); else playCur(); });
  hcv.addEventListener('pointercancel', () => { hDrag = null; });
  // CASSETTES : un volet par-dessus l'accueil, avec la liste et la difficulté
  home.querySelector('#k7hlvl').onclick = () => { api.sfx.click();
    const sh = document.createElement('div'); sh.className = 'k7sheet';
    const diffHtml = () => { const d = DIFFS[dIdx]; return `<div style="position:relative;display:inline-block"><div class="k7diff"><div class="dn"><svg width="24" height="18" viewBox="0 0 24 18"><path d="M2 16V5l5 5 5-8 5 8 5-5v11z" fill="#fff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/></svg><span style="color:${dIdx >= 3 ? LABELRED : INK}">${d.name}</span></div></div><span class="k7mult">x${d.mult}</span></div>`; };
    const rows = () => SHELF.map((t, i) => { const open = unlocked(t), bk = bests()[t.id + '.' + DIFFS[dIdx].id];
      const st = open ? (bk ? `${DISC(bk.discs || 0)} ${bk.pct || 0}%` : '') : `${BSI.lockS('#d7263d')} ${t.cost} ◉`;
      return `<button class="k7crow${i === cur ? ' on' : ''}${open ? '' : ' lock'}" data-i="${i}"><span class="sw" style="background:${TRACKS.includes(t) ? SPRAY[TRACKS.indexOf(t) % SPRAY.length] : '#e8343f'}"></span><span class="nm">${t.name}</span><span class="ss">${st}</span><span class="mt">${t.label} · ${t.gestures}</span></button>`; }).join('');
    sh.innerHTML = `<div><div style="display:flex;flex-direction:row-reverse;justify-content:flex-end;align-items:center;gap:14px"><b class="bs-ptitle">${tx('CASSETTES')}</b><button class="bs-back" id="k7cx" aria-label="${tx('Retour')}">${BSI.back(INK)}</button></div>
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:8px 10px 4px"><button class="k7btn bs-back bs-nav" id="k7cdl" aria-label="${tx('Difficulté plus facile')}">${BSI.back(INK)}</button><div id="k7cdiff"></div><button class="k7btn bs-back bs-nav" id="k7cdr" aria-label="${tx('Difficulté plus dure')}">${BSI.fwd(INK)}</button></div>
      <div class="k7clist"></div></div>`;
    menu.appendChild(sh); const close = () => pageOut(sh);
    const fill = () => { sh.querySelector('#k7cdiff').innerHTML = diffHtml(); sh.querySelector('.k7clist').innerHTML = rows();
      sh.querySelectorAll('.k7crow').forEach(b => b.onclick = () => { pickCass(+b.dataset.i); close(); }); };
    fill(); sh.onclick = e => { if(e.target === sh) close(); }; sh.querySelector('#k7cx').onclick = close;
    for(const [id, dd] of [['#k7cdl', -1], ['#k7cdr', 1]]) sh.querySelector(id).onclick = () => { dIdx = Math.max(0, Math.min(DIFFS.length - 1, dIdx + dd)); api.save('diff', dIdx); api.sfx.click(); fill(); refreshHome(); };
  };
  home.querySelector('#k7hopt').onclick = () => { api.sfx.click(); ui.k7gear.onclick(); };
  home.querySelector('#k7hgear').onclick = () => { api.sfx.click(); ui.k7gear.onclick(); };
  home.querySelector('#k7hplay').onclick = playCur; // JOUER : la cassette du centre, au niveau choisi

  /* ---------- avant chaque niveau : un petit chargement, la règle du jeu, et chaque brique de la cassette ---------- */
  if(!document.getElementById('k7-brief-css')){ const st = document.createElement('style'); st.id = 'k7-brief-css'; st.textContent = `
    .k7brief{position:absolute;inset:0;z-index:30;overflow-y:auto;background:rgba(28,27,25,.6);-webkit-overflow-scrolling:touch;display:grid;place-items:center;padding:22px 0}
    .k7brief .in{position:relative;margin:auto;width:calc(100% - 40px);max-width:420px;background:radial-gradient(rgba(28,27,25,.06) 1px,transparent 1.4px) 0 0/7px 7px,#f6eedb;border:4px solid ${INK};border-radius:6px;box-shadow:8px 9px 0 ${INK};transform:rotate(-.6deg);padding:16px 16px 18px;display:flex;flex-direction:column;gap:12px;color:${INK};animation:k7popin .35s cubic-bezier(.2,1.5,.4,1)}
    .k7brief .in::before{content:"";position:absolute;top:-15px;left:50%;width:120px;height:28px;margin-left:-60px;background:rgba(255,210,63,.88);transform:rotate(-3deg);box-shadow:0 2px 3px rgba(0,0,0,.18);clip-path:polygon(3% 0,97% 4%,100% 50%,96% 100%,2% 96%,0 50%)}
    .k7brief .in::after{content:"";position:absolute;right:-10px;top:30px;width:46px;height:46px;border-radius:50%;background:#ff3d7f;opacity:.85;clip-path:polygon(50% 0,62% 30%,98% 22%,72% 50%,100% 78%,62% 70%,50% 100%,38% 70%,2% 80%,28% 50%,0 20%,38% 30%);z-index:-1}
    .k7brief .hd{display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding-top:4px}
    .k7brief .hd b{text-decoration:underline;text-decoration-color:#ffd23f;text-decoration-thickness:.32em;text-underline-offset:-.12em;text-decoration-skip-ink:none}
    .k7brief .hd .face{display:inline-flex;align-items:center;gap:6px;background:${INK};color:#ffd23f;font-family:${FONT};font-size:12px;padding:5px 10px;border-radius:4px;transform:rotate(-2deg)}.k7brief .hd .face svg{width:20px;height:20px;display:block}
    .k7brief .hd b{font-family:${MARKER};font-weight:400;font-size:30px;line-height:1.05}
    .k7brief .hd small{font-size:13px;font-weight:700;opacity:.75}
    .k7brief .sub{font-family:${FONT};font-size:13px;letter-spacing:.5px;margin-top:2px}
    .k7brief .how{background:#fff;border:3px solid ${INK};border-radius:12px;padding:9px 12px;font-size:13.5px;line-height:1.35}
    .k7brief .how p{margin:4px 0}
    .k7brief .bricks{display:flex;flex-direction:column;gap:7px}
    .k7brief .br{display:grid;grid-template-columns:52px 1fr auto;align-items:center;gap:10px;background:#fff;border:3px solid ${INK};border-radius:12px;padding:4px 10px 4px 4px}
    .k7brief .br svg{width:52px;height:52px;display:block}
    .k7brief .br b{display:block;font-family:${MARKER};font-weight:400;font-size:16px;line-height:1.1}.k7brief .br small{font-size:12px;opacity:.75}
    .k7brief .br i{font-style:normal;font-family:${FONT};font-size:10px;background:#e8344f;color:#fff;padding:3px 6px;border-radius:6px;transform:rotate(4deg)}
    .k7brief .bar{height:12px;border:3px solid ${INK};border-radius:8px;overflow:hidden;background:#fff}.k7brief .bar i{display:block;height:100%;width:0;background:repeating-linear-gradient(45deg,#ffd23f 0 8px,#e8344f 8px 16px);transition:width .2s linear}
    .k7brief .go{border:4px solid ${INK};border-radius:999px;background:#ff3d7f;color:#fff;font-family:${GRAF};font-size:28px;padding:8px 18px;-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill;box-shadow:0 5px 0 ${INK};cursor:pointer}
    .k7brief .go{white-space:nowrap;font-size:24px}.k7brief .acts .go[data-go]{flex:1}
    .k7brief .go:disabled{filter:grayscale(1);opacity:.6}
    .k7brief .acts{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:nowrap;position:sticky;bottom:0;margin:0 -16px -18px;padding:10px 16px 14px;background:#f3ead7;border-top:3px solid ${INK};border-radius:0 0 14px 14px}
    .k7brief .lb{display:flex;flex-direction:column;gap:5px;max-height:min(30vh,212px);overflow-y:auto;overscroll-behavior:contain;padding:2px 4px 2px 0;-webkit-mask-image:linear-gradient(#000 85%,transparent);mask-image:linear-gradient(#000 85%,transparent)}  /* le classement défile dans son cadre : LANCER reste à l'écran */
    .k7brief .lb div{flex:none}
    .k7brief .lb span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.k7brief .lb small{font-weight:800;opacity:.55;margin-left:4px}
    /* écran Records / cassette de la mort : tient sur une page, seule la liste défile, les boutons restent visibles */
    .k7brief.fit{overflow:hidden;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.k7brief.fit .in{max-height:100%;box-sizing:border-box;margin:0}.k7brief.fit .in > *{flex:none}
    .k7brief.fit .in > .lb{flex:1 1 auto;min-height:92px;max-height:none}
    @media (max-height:660px){.k7brief.fit .how{display:none}}
    /* pages : chaque écran du menu remplace l'accueil en glissant depuis la droite, bord d'encre en biais devant
       (plus de fenêtre par-dessus) ; au retour il repart vers la droite */
    #stage .k7sheet,#stage .k7brief{padding:0;display:block;overflow:visible;animation:k7pgin .42s cubic-bezier(.2,.85,.25,1) both}
    #stage .k7sheet::before,#stage .k7brief::before{content:"";position:absolute;top:0;bottom:0;left:-46px;width:46px;background:linear-gradient(90deg,#ffd23f 0 9px,${INK} 9px);clip-path:polygon(0 0,62% 0,100% 100%,38% 100%);pointer-events:none}
    #stage .k7out{animation:k7pgout .3s cubic-bezier(.5,0,.75,.3) both;pointer-events:none}
    @keyframes k7pgin{from{transform:translateX(calc(100% + 40px))}}
    @keyframes k7pgout{to{transform:translateX(calc(100% + 40px))}}
    #stage .k7sheet > div,#stage .k7brief .in{width:100%;max-width:480px;height:100%;max-height:none;margin:0 auto;box-sizing:border-box;border:0;border-radius:0;box-shadow:none;transform:none;background:none;animation:none;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
    #stage .k7sheet > div > *{flex:none}
    #stage .k7brief .in::before,#stage .k7brief .in::after{display:none}
    #stage .k7gal figcaption{font-size:12px;line-height:1.25}
    #stage .k7gal{max-height:none;overflow:visible;grid-auto-rows:max-content}
    @media (prefers-reduced-motion:reduce){#stage .k7sheet,#stage .k7brief,#stage .k7out{animation:none}}
    .k7brief .lb div{display:grid;grid-template-columns:28px 1fr auto;gap:8px;align-items:center;background:#fff;border:2px solid ${INK};border-radius:9px;padding:5px 9px;font-size:14px}
    @font-face{font-family:"Twemoji Country Flags";unicode-range:U+1F1E6-1F1FF;src:url("fonts/TwemojiCountryFlags.woff2") format("woff2");font-display:swap}
    .k7brief .lb .fl{font-style:normal;font-family:"Twemoji Country Flags","Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}  /* drapeaux aussi sur Windows, qui n'en a pas */
    .k7brief .lb div.me{background:#ffd23f}.k7brief .lb b{font-family:${FONT};font-size:12px}
    .k7brief input{font:inherit;font-size:15px;border:3px solid ${INK};border-radius:10px;padding:8px 10px;width:100%;box-sizing:border-box}`; document.head.appendChild(st); }
  const SKULL = (eye) => `<svg viewBox="0 0 24 24"><path d="M12 2C7 2 3.5 5.6 3.5 10.2c0 2.5 1.1 4.2 2.5 5.2V19c0 .6.4 1 1 1h1.6v-2.2h1.6V20h3.6v-2.2h1.6V20H17c.6 0 1-.4 1-1v-3.6c1.4-1 2.5-2.7 2.5-5.2C20.5 5.6 17 2 12 2z" fill="currentColor"/><circle cx="8.7" cy="10.6" r="2.4" fill="${eye}"/><circle cx="15.3" cy="10.6" r="2.4" fill="${eye}"/><path d="M12 13.3l-1.4 2.4h2.8z" fill="${eye}"/></svg>`;
  const CUP = `<svg viewBox="0 0 24 24"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="currentColor"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 13v4M8 21h8l-1-4H9z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
  const CHV = '<path d="M-7 19l7-8 7 8M-7 6l7-8 7 8M-7-7l7-8 7 8" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
  const BTN = (x, y, r) => `<circle cx="${x}" cy="${y + 3}" r="${r + 3}" fill="${INK}"/><circle cx="${x}" cy="${y - 1}" r="${r}" fill="${PAPER}" stroke="${INK}" stroke-width="2.5"/>`;
  const BRICK = {
    CV: `<g transform="translate(30 30)"><rect x="-12" y="-27" width="24" height="54" rx="7" fill="${CUTCOL.tall}" stroke="${INK}" stroke-width="2.5"/>${CHV}</g>`,
    CH: `<g transform="translate(30 30) rotate(90)"><rect x="-12" y="-27" width="24" height="54" rx="7" fill="${CUTCOL.wide}" stroke="${INK}" stroke-width="2.5"/>${CHV}</g>`,
    CD: `<g transform="translate(30 30) rotate(45)"><rect x="-12" y="-25" width="24" height="50" rx="7" fill="${CUTCOL.diag}" stroke="${INK}" stroke-width="2.5"/>${CHV}</g>`,
    CVR: `<g transform="translate(30 30) rotate(180)"><rect x="-12" y="-27" width="24" height="54" rx="7" fill="${CUTREV.tall}" stroke="${INK}" stroke-width="2.5"/>${CHV}</g>`,
    CHR: `<g transform="translate(30 30) rotate(270)"><rect x="-12" y="-27" width="24" height="54" rx="7" fill="${CUTREV.wide}" stroke="${INK}" stroke-width="2.5"/>${CHV}</g>`,
    CDR: `<g transform="translate(30 30) rotate(225)"><rect x="-12" y="-25" width="24" height="50" rx="7" fill="${CUTREV.diag}" stroke="${INK}" stroke-width="2.5"/>${CHV}</g>`,
    J: `<g transform="translate(30 29)">${BTN(0, 0, 14)}<path d="M0 4C-9-2-5-9 0-4.5 5-9 9-2 0 4z" fill="${RED}"/></g>`,
    D: `<g transform="translate(30 32) scale(.82)"><rect x="-17" y="-3" width="34" height="11" rx="5" fill="${INK}"/>${BTN(-15, 0, 9.5)}${BTN(15, 0, 9.5)}<circle cx="-15" cy="-1" r="3.5" fill="${RED}"/><circle cx="15" cy="-1" r="3.5" fill="${RED}"/><text y="-17" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="${INK}">×2</text></g>`,
    H: `<g transform="translate(30 30)"><rect x="-26" y="-7" width="52" height="14" rx="7" fill="${PAPER}" stroke="${INK}" stroke-width="2.5"/><path d="M-14 0H22" stroke="${RED}" stroke-width="3" stroke-dasharray="5 4"/><circle cx="-18" cy="0" r="9" fill="${RED}" stroke="${INK}" stroke-width="2.5"/></g>`,
    S: `<g transform="translate(30 30)"><circle r="21" fill="${INK}"/><circle r="16" fill="none" stroke="#4a4640" stroke-width="1.5"/><circle r="12" fill="none" stroke="#4a4640" stroke-width="1.5"/><circle r="7" fill="${RED}"/><circle r="2" fill="${PAPER}"/><path d="M-5-26q5 4 0 8t0 8" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" transform="translate(30 6)"/></g>`
  };
  // les briques d'une cassette, dans l'ordre où on les apprend
  function brickKinds(list){ const a = new Set(list.map(t => t.sections.map(x => x.acts).join('')).join('')), ks = [];
    const rv = list.some(t => revOK(t));
    if(a.has('C')) ks.push('CV', 'CH'); if(a.has('G')) ks.push('CD'); if(a.has('C') && rv) ks.push('CVR', 'CHR'); if(a.has('G') && rv) ks.push('CDR'); if(a.has('J')) ks.push('J'); if(a.has('D')) ks.push('D'); if(a.has('H')) ks.push('H'); if(a.has('S')) ks.push('S'); return ks; }
  // une page s'en va en glissant vers la droite ; une page remplacée par une autre reste dessous le temps que la nouvelle arrive
  function pageOut(el){ if(!el || !el.isConnected) return; el.classList.add('k7out'); setTimeout(() => el.remove(), 320); }
  function pageUnder(sel){ for(const o of stage.querySelectorAll(sel)){ o.style.zIndex = '29'; setTimeout(() => o.remove(), 450); } }
  const twoTone = txt => { const w = String(txt).toUpperCase().split(' '), last = w.pop(); return `${w.join(' ')}${w.length ? ' ' : ''}<span class="p">${last}</span>`; };
  // les astuces de l'écran de chargement
  // les astuces du chargement : c'est K7, la cassette mascotte, qui parle (et Bobine, la petite roue qui file sur la bande)
  const TIPS = [tx("Glisse pile quand la brique touche la ligne rouge : c'est là que je chante le plus fort !"), tx("Enchaîne sans rater et je pars en transe. Les disques suivent !"), tx("Tes coupes arrivent en retard ? Mets un casque filaire et cale le rythme dans les réglages."), tx("Sur une note longue, garde le doigt posé jusqu'au bout. Bobine compte sur toi !"), tx("Bleu, violet, vert menthe : la brique descend. Orange, rose, jaune : elle monte."), tx("Rate une note et la bande ralentit. Six réussites et on repart à fond !")];
  /* écran de chargement : sobre mais soigné. Fond noir avec un halo de la couleur de la cassette qui bat au tempo, le nom de la cassette,
     une vraie bande où ses briques arrivent sur la cible ; là, un doigt montre le geste et la brique éclate en peinture. Une barre en bas. */
  function loadingScreen(t, d, death, go){
    const el = document.createElement('div'); el.className = 'bs-load bs-load2';
    const col = death ? '#e8344f' : (TRACKS.includes(t) ? SPRAY[TRACKS.indexOf(t) % SPRAY.length] : t.bg[0]), bpm = death ? 120 : t.bpm;
    el.innerHTML = `<canvas></canvas>
      <div class="bs-lhead"><small>${death ? tx('3 cœurs') : tx('FACE') + ' ' + t.face + ' · ' + d.name}</small><b>${death ? tx('Cassette de la mort') : t.name}</b></div>
      <div class="bs-lcap"><i hidden>${tx('NOUVEAU')}</i><b></b><small></small></div>
      <div class="bs-ldots"></div>
      <div class="bs-lbar" role="progressbar" aria-label="${tx('Chargement…')}"><i></i></div>
      <button class="bs-lgo" type="button" hidden>${tx('COMMENCER')} ${BSI.triR()}</button>`;
    stage.appendChild(el);
    const cv = el.querySelector('canvas'), g = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1), bar = el.querySelector('.bs-lbar i'), t0l = performance.now();
    // c'est aussi le tuto des briques : les nouvelles d'abord, chacune passe une fois sur la cible avec son nom
    const isNew = k => !api.load('tuto3.' + k, false), ks = brickKinds(death ? TRACKS : [t]).sort((a, b) => isNew(b) - isNew(a)), img = {};
    const cap = el.querySelector('.bs-lcap'), goBtn = el.querySelector('.bs-lgo'), dots = el.querySelector('.bs-ldots'); let skip = false, capK = null; goBtn.onclick = () => { skip = true; };
    dots.innerHTML = ks.map(() => '<i></i>').join('');
    for(const k of ks){ const im = new Image(); im.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">${BRICK[k]}</svg>`); img[k] = im; }
    const DIR = {CV: [0, -1], CH: [1, 0], CD: [.71, -.71], CVR: [0, 1], CHR: [-1, 0], CDR: [-.71, .71]};
    const INKOF = {CV: CUTCOL.tall, CH: CUTCOL.wide, CD: CUTCOL.diag, CVR: CUTREV.tall, CHR: CUTREV.wide, CDR: CUTREV.diag, J: '#e8344f', D: '#e8344f', H: '#ffd23f', S: '#29c4ff'};
    const GAP = 1.2, SPEED = 250, parts = [], fired = new Set();
    // le doigt qui montre le geste : un rond blanc cerclé de noir, avec sa traînée
    const finger = (x, y, a, x0, y0) => { g.save(); g.globalAlpha = a; if(x0 != null){ g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x, y); g.stroke(); }
      g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 15, 0, 6.283); g.fill(); g.stroke(); g.fillStyle = 'rgba(28,27,25,.18)'; g.beginPath(); g.arc(x - 3, y - 3, 6, 0, 6.283); g.fill(); g.restore(); };
    let done = false, last = t0l;
    (function frame(){ if(!el.isConnected) return; const nowP = performance.now(), el2 = nowP - t0l, tt = el2/1000, dt = Math.min(.05, (nowP - last)/1000); last = nowP;
      const w = cv.clientWidth, h = cv.clientHeight; if(cv.width !== Math.round(w*dpr) || cv.height !== Math.round(h*dpr)){ cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr); }
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
      const y = h*.47, lx = w*.3, S = Math.min(100, w*.25), beat = tt*bpm/60, pulse = Math.max(0, 1 - (beat % 1)*2.5);
      cap.style.top = Math.round(y + S*.95 + 26) + 'px'; dots.style.top = Math.round(y - S*.95 - 34) + 'px';
      // le halo de la cassette, qui bat au tempo, et une trame de points
      { const R = Math.max(w, h)*(.62 + pulse*.05), gr = g.createRadialGradient(lx, y, 10, lx, y, R); gr.addColorStop(0, col + '66'); gr.addColorStop(.45, col + '1c'); gr.addColorStop(1, col + '00'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
        g.fillStyle = 'rgba(255,255,255,.05)'; for(let yy = 6; yy < h; yy += 14) for(let xx = (yy/14 % 2)*7; xx < w; xx += 14){ g.beginPath(); g.arc(xx, yy, 1.1, 0, 6.283); g.fill(); } }
      // la bande : un ruban sombre bordé, avec ses repères qui défilent
      { const top = y - S*.72, bh = S*1.44; g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(0, top, w, bh); g.fillStyle = col; g.fillRect(0, top - 4, w, 4); g.fillRect(0, top + bh, w, 4);
        g.fillStyle = 'rgba(255,255,255,.16)'; const off = (tt*SPEED) % 46; for(let x = w - off; x > -10; x -= 46){ g.fillRect(x, top + 6, 3, 9); g.fillRect(x, top + bh - 15, 3, 9); } }
      // la cible : la ligne rouge et son anneau
      g.strokeStyle = '#e8344f'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(lx, y - S*.98); g.lineTo(lx, y + S*.98); g.stroke();
      g.strokeStyle = `rgba(255,255,255,${.35 + pulse*.4})`; g.lineWidth = 3; g.beginPath(); g.arc(lx, y, S*.5 + pulse*5, 0, 6.283); g.stroke();
      // chaque brique arrive de la droite ; sur la cible, le doigt fait le geste et elle éclate en peinture
      const n0 = Math.floor(tt/GAP), arrive = (w + S - lx)/SPEED; let atLine = null;
      for(let n = Math.max(0, n0 - 6); n <= n0; n++){
        const k = ks[n % ks.length], age = tt - n*GAP, im = img[k]; if(!im || !im.complete) continue;
        let x = w + S - age*SPEED, yy = y, a = 1, sc = 1, rot = 0; const after = age - arrive;
        if(age > arrive - .4 && after < .8) atLine = n;
        if(after > 0){ x = lx; const u = Math.min(1, after/.45), dv = DIR[k];
          if(!fired.has(n)){ fired.add(n); const pc = INKOF[k] || '#fff'; for(let i = 0; i < 22; i++){ const an = dv ? Math.atan2(dv[1], dv[0]) + (Math.random() - .5)*1.6 : Math.random()*6.283, sp = 120 + Math.random()*320; parts.push({x: lx, y, vx: Math.cos(an)*sp, vy: Math.sin(an)*sp, r: 3 + Math.random()*7, c: i % 5 ? pc : '#fff', life: 1}); } }
          if(dv){ x += dv[0]*u*S*1.5; yy += dv[1]*u*S*1.5; a = 1 - u; rot = (dv[0] || 1)*u*.5; finger(lx + dv[0]*S*(-.5 + u*2), y + dv[1]*S*(-.5 + u*2), 1 - u*u, lx - dv[0]*S*.5, y - dv[1]*S*.5); }
          else if(k === 'H'){ const v = Math.min(1, after/.9); a = after > .9 ? Math.max(0, 1 - (after - .9)/.3) : 1; g.save(); g.globalAlpha = a; g.strokeStyle = '#ffd23f'; g.lineWidth = 7; g.beginPath(); g.arc(lx, y, S*.62, -Math.PI/2, -Math.PI/2 + v*6.283); g.stroke(); g.restore(); finger(lx, y + S*.1, a); }
          else if(k === 'S'){ rot = Math.sin(after*18)*.6; a = after > .7 ? Math.max(0, 1 - (after - .7)/.3) : 1; const fy = y + Math.sin(after*18)*S*.4; finger(lx + S*.1, fy, a, lx + S*.1, y); }
          else { sc = 1 + u*.5; a = 1 - u; g.save(); g.globalAlpha = 1 - u; g.strokeStyle = '#fff'; g.lineWidth = 5; g.beginPath(); g.arc(lx, y, S*(.45 + u*.7), 0, 6.283); g.stroke(); g.restore();
            if(k === 'D'){ finger(lx - S*.3, y + S*.05, 1 - u); finger(lx + S*.3, y + S*.05, 1 - u); } else finger(lx, y + S*.05, 1 - u); }
          if(a <= 0) continue; }
        else { // la traînée de la brique qui arrive
          for(let q = 3; q >= 1; q--){ g.save(); g.globalAlpha = .1*(4 - q)/3; g.drawImage(im, x + q*16 - S/2, yy - S/2, S, S); g.restore(); } }
        g.save(); g.globalAlpha = a; g.translate(x, yy + Math.sin(tt*5 + n)*2); g.rotate(rot); g.scale(sc, sc); g.shadowColor = 'rgba(0,0,0,.6)'; g.shadowBlur = 14; g.shadowOffsetY = 6; g.drawImage(im, -S/2, -S/2, S, S); g.restore();
      }
      // la peinture qui gicle
      for(const q of parts){ q.vy += 500*dt; q.x += q.vx*dt; q.y += q.vy*dt; q.life -= dt*1.5; if(q.life <= 0) continue; g.globalAlpha = Math.min(1, q.life*1.6); g.fillStyle = q.c; g.beginPath(); g.arc(q.x, q.y, q.r*Math.max(.3, q.life), 0, 6.283); g.fill(); }
      g.globalAlpha = 1; for(let i = parts.length - 1; i >= 0; i--) if(parts[i].life <= 0) parts.splice(i, 1);
      if(atLine != null){ const k = ks[atLine % ks.length]; if(k !== capK){ capK = k; cap.querySelector('i').hidden = !isNew(k); cap.querySelector('b').textContent = TUTO[k].verb; cap.querySelector('small').textContent = TUTO[k].hint; cap.classList.remove('pop'); void cap.offsetWidth; cap.classList.add('pop'); }
        dots.querySelectorAll('i').forEach((n, i) => n.className = i === atLine % ks.length ? 'on' : i < atLine || atLine >= ks.length ? 'ok' : ''); }
      // le son est prêt, et chaque brique est passée une fois (7 s au plus) ; COMMENCER fait démarrer plus tôt
      const need = Math.min(7, (ks.length - 1)*GAP + arrive + .7)*1000, ready = el2 > 1700 && (Object.keys(recBuf).length >= 2 || el2 > 4500);
      const ok = ready && (el2 >= need || skip), pct = ok ? 100 : Math.round(Math.min(ready ? 99 : 90, el2/Math.max(need, 1700)*100)); goBtn.hidden = !ready || ok;
      bar.style.width = pct + '%';
      if(ok && !done){ done = true; api.after(450, () => { if(!el.isConnected) return; el.remove(); go(); }); }
      requestAnimationFrame(frame); })();
  }
  // plus de page d'explications avant la cassette : le chargement montre ses briques et leur geste
  function briefing(t, go, death){
    pageUnder('.k7brief'); const d = death ? DIFFS[1] : DIFFS[dIdx];
    try{ muted = api.store.load('muted', false); audioInit(); loadRecs(); if(actx && actx.state === 'suspended') actx.resume(); }catch(e){}
    loadingScreen(t, d, death, go);
  }

  /* ---------- la cassette de la mort : 3 cœurs, les morceaux enchaînés du plus lent au plus rapide, un classement ---------- */
  let deathRun = null;
  const deathTop = () => api.load('deathTop', []);
  // le serveur des records : le jeu servi par Cloudflare lui parle directement, ailleurs (GitHub Pages, appli) on l'appelle par son adresse
  const RANK_API = `https://${/\.workers\.dev$/.test(location.hostname) ? location.host : 'beatsplash.sebastienalzamora.workers.dev'}/api`;
  const pid = () => { let v = api.load('pid', ''); if(!/^[a-z0-9]{16,40}$/.test(v)){ v = Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, '0')).join(''); api.save('pid', v); } return v; };
  const pseudo = () => api.load('pseudo', '');
  function sendScore(score, songs){ if(Tuning.preview || window.__k7bot) return Promise.resolve(null); /* ni l'aperçu du GDD ni les tests automatiques n'écrivent dans le vrai classement */ try{ return fetch(RANK_API + '/score', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: pid(), name: pseudo(), score, songs, season: SEASON()})}).then(r => r.json()).catch(() => null); }catch(e){ return Promise.resolve(null); } }
  // la saison du classement : on ne l'augmente (dans le GDD) que quand un réglage change vraiment les scores possibles
  const SEASON = () => Math.max(1, Math.round(Tuning.num("classement.saison", 1)));
  async function fetchTop(season){ try{ const r = await fetch(RANK_API + '/top?id=' + pid() + '&season=' + (season || SEASON()), {cache: 'no-store'}); if(!r.ok) return null; return await r.json(); }catch(e){ return null; } }
  const esc = v => String(v).replace(/[<>&"]/g, '');
  // le petit drapeau du pays (code à deux lettres -> emoji drapeau)
  const flag = c => /^[A-Z]{2}$/.test(c || '') ? `<i class="fl">${String.fromCodePoint(...[...c].map(l => 0x1F1A5 + l.charCodeAt(0)))}</i> ` : '';
  // la liste du classement : en ligne si le serveur répond, sinon celle du téléphone
  async function fillBoard(box, note, season){
    box.innerHTML = `<div><span></span><span>${tx('Chargement…')}</span><span></span></div>`;
    const cur = SEASON(), want = season || cur, g = await fetchTop(want), row = (r, i, me) => `<div class="${me ? 'me' : ''}"><b>${r}</b><span title="${tx(i.k > 1 ? '{n} morceaux' : '{n} morceau', {n: i.k})}">${flag(i.c)}${esc(i.n)}<small>♪${i.k}</small></span><b>${i.s.toLocaleString('fr-FR')}</b></div>`;
    if(g && g.top){
      box.innerHTML = g.top.length ? g.top.map(i => row(i.r, i, i.me)).join('') + (g.me && g.me > g.top.length && g.around ? '<div><span></span><span>…</span><span></span></div>' + g.around.map(i => row(i.r, i, i.me)).join('') : '') : `<div><span></span><span>${tx('Personne n\'a encore tenu : à toi !')}</span><span></span></div>`;
      const mine = box.querySelector('.me'); if(mine) box.scrollTop = mine.offsetTop - box.offsetTop - box.clientHeight/2 + mine.offsetHeight/2; // sa propre ligne au milieu du cadre
      if(note){ note.textContent = (cur > 1 ? tx('Saison {n}', {n: want}) + ' · ' : '') + (g.me ? tx('Ton rang : {n} sur {t}', {n: g.me, t: g.total}) : tx(g.total > 1 ? 'Classement mondial : {t} joueurs' : 'Classement mondial : {t} joueur', {t: g.total}));
        // un lien vers la saison précédente (ou retour à la saison en cours), quand il y en a une
        if(want < cur || g.previous){ const a = document.createElement('button'); a.type = 'button'; a.className = 'bs-season'; a.innerHTML = want < cur ? tx('Saison en cours') + ' ' + BSI.triR() : BSI.triL() + ' ' + tx('Saison précédente'); a.onclick = () => fillBoard(box, note, want < cur ? cur : want - 1); note.append(' ', a); } }
    } else {
      const top = deathTop(); box.innerHTML = top.length ? top.map((e, i) => row(i + 1, {n: e.name, s: e.score, k: e.songs}, false)).join('') : `<div><span></span><span>${tx('Personne n\'a encore tenu : à toi !')}</span><span></span></div>`;
      if(note) note.textContent = tx('Hors ligne : classement de ce téléphone');
    }
  }
  function recordsPage(){ deathBoard(null); } // les records sont ceux de la cassette de la mort : un seul écran

  function deathHud(){ if(deathRun && tr) api.hud(`☠ ${'♥'.repeat(Math.max(0, hearts))}${'♡'.repeat(Math.max(0, 3 - hearts))}  ·  ${deathRun.songs + 1}  ·  ${tr.name.toUpperCase()}`); }
  // une seule partie sans fin : premier tour du plus lent au plus rapide, puis les tours suivants mélangés, de plus en plus durs ;
  // le combo, la transe et le meilleur combo passent d'un morceau à l'autre
  function deathStart(){ deathRun = {i: 0, lap: 0, order: TRACKS.slice().sort((a, b) => a.bpm - b.bpm), score: 0, hearts: 3, songs: 0, combo: 0, maxCombo: 0, trance: 0}; homeOn = false; home.hidden = true; deathPlay(); }
  function deathPlay(){ const R = deathRun; diff = DIFFS[Math.min(3, 1 + R.lap)]; startTrack(R.order[R.i]); hearts = R.hearts; score = R.score; combo = R.combo; maxCombo = R.maxCombo; if(R.trance) setTrance(R.trance, now()); deathHud(); }
  function deathNext(){
    const R = deathRun; R.score = score; R.hearts = hearts; R.combo = combo; R.maxCombo = maxCombo; R.trance = trance; R.songs++; R.i++;
    if(R.i >= R.order.length){ R.i = 0; R.lap++; const last = R.order[R.order.length - 1], rr = rngFrom('mort' + R.lap); R.order = TRACKS.slice().sort(() => rr() - .5); if(R.order[0] === last) R.order.push(R.order.shift()); }
    // pas d'écran entre deux morceaux : la fin calme du morceau sert de transition, le suivant démarre tout de suite
    const nt = R.order[R.i], up = R.i === 0 ? ' · ' + DIFFS[Math.min(3, 1 + R.lap)].name.toUpperCase() : '';
    api.after(250, () => { if(deathRun !== R) return; deathPlay(); judges.push({txt: tx('MORCEAU TENU !'), sub: tx('Suivant : {nom} · {n} BPM', {nom: nt.name, n: nt.bpm}) + up, x: W/2, y: H*.26, t: 0, big: true}); });
  }
  function deathOver(){
    const R = deathRun; deathRun = null; R.score = score;
    const me = {name: api.load('pseudo', '') || tx('Moi'), score: R.score, songs: R.songs, at: Date.now()}, top = R.score > 0 ? deathTop().concat([me]).sort((a, b) => b.score - a.score).slice(0, 10) : deathTop(); if(R.score > 0){ api.save('deathTop', top); sendScore(R.score, R.songs); }
    api.after(900, () => deathBoard(me, top));
  }
  function deathBoard(me, top){
    pageUnder('.k7brief'); top = top || deathTop();
    const el = document.createElement('div'); el.className = 'k7brief fit bs-spk';
    const list = () => top.length ? top.map((e, i) => `<div class="${e === me ? 'me' : ''}"><b>${i + 1}</b><span>${String(e.name).replace(/[<>&]/g, '')}<small>♪${e.songs}</small></span><b>${e.score.toLocaleString('fr-FR')}</b></div>`).join('') : `<div><span></span><span>${tx('Personne n\'a encore tenu : à toi !')}</span><span></span></div>`;
    // une page lisible : un titre, une ligne de règle (ou ton résultat), le classement qui a de la place, ton pseudo, LANCER ; le retour est en haut
    el.innerHTML = `<div class="in"><div class="bs-panel bs-rec"><button class="bs-back x" data-a="x" aria-label="${tx('Retour')}">${BSI.back(INK)}</button><span class="bs-badge" style="color:#16151c">${SKULL('#ffd60a')}</span>
      <div class="bs-title">${twoTone(me ? tx('LA BANDE A CASSÉ') : tx('Cassette de la mort'))}</div>
      ${me ? `<div class="bs-card bs-res"><b>${me.score.toLocaleString('fr-FR')}</b><span>${tx(me.songs > 1 ? '{n} morceaux tenus' : '{n} morceau tenu', {n: me.songs})}</span></div>`
        : `<div class="bs-card bs-rule">${tx('3 cœurs : chaque raté en coûte un. Les morceaux s\'enchaînent, de plus en plus vite.')}</div>`}
      <div class="bs-rhead">${BSI.cup(INK)}<b>${tx('RECORDS')}</b><span class="nt bs-rank"></span></div><div class="lb">${list()}</div>
      <label class="bs-pseudo"><span>${tx('Ton pseudo')}</span><input class="bs-input" maxlength="14" placeholder="${tx('Ton pseudo')}" value="${String(api.load('pseudo', '')).replace(/"/g, '')}"></label>
      <div class="acts2">${bsBtn('pink cta', '', '', tx(me ? 'REJOUER' : 'LANCER') + ' ' + BSI.play(INK), 'data-a="go"')}</div></div></div>`;
    stage.appendChild(el); const box = el.querySelector('.lb'), nt = el.querySelector('.nt'); api.after(me ? 700 : 0, () => fillBoard(box, nt)); // le temps que le score arrive sur le serveur
    const inp = el.querySelector('input'); inp.onchange = async () => { const v = inp.value.trim().slice(0, 14); if(v === pseudo()) return; api.save('pseudo', v); if(me && v){ me.name = v; api.save('deathTop', top); } if(v){ await sendScore(0, 0); fillBoard(box, nt); } };
    const after = go => me ? adBreak(TRACKS.length).then(go) : go(); // après une Cassette de la mort, comme après un morceau
    el.querySelector('[data-a=go]').onclick = () => { inp.onchange(); after(() => briefing(null, deathStart, true)); };
    el.querySelector('[data-a=x]').onclick = () => { inp.onchange(); pageOut(el); if(me) after(() => { showMenu(); showHome('title'); }); };
  }
  home.querySelector('#k7tdeath').onclick = () => { api.sfx.click(); deathBoard(null); };
  home.querySelector('#k7tcamp').onclick = () => { api.sfx.click(); showHome('camp'); };
  home.querySelector('#k7trec').onclick = () => { api.sfx.click(); recordsPage(); };
  home.querySelector('#k7topt').onclick = () => { api.sfx.click(); ui.k7gear.onclick(); };
  home.querySelector('#k7hback').onclick = () => { api.sfx.click(); showHome('title'); };

  home.querySelector('#k7trophy').onclick = () => {
    api.sfx.click(); api.save('artNew', false); refreshHome(); { const bd = menu.querySelector('#k7bdot'); if(bd) bd.hidden = true; }
    const sh = document.createElement('div'); sh.className = 'k7sheet'; const b = bests();
    const cells = (artsOf('noel').length && !XMAS ? [...TRACKS, NOEL] : SHELF).map(t => { const arts = artsOf(t.id), n = discsOf(t), pct = Math.max(0, ...DIFFS.map(d => (b[t.id + '.' + d.id] || {}).pct || 0)), cap = `<span>${t.name}</span><span>${DISC(n)}${pct ? ' ' + pct + '%' : ''}</span>`;
      if(!arts.length) return `<figure data-id="${t.id}"><div class="empty">${tx(unlocked(t) ? 'Pas encore peinte' : 'Cassette fermée')}</div><figcaption>${cap}</figcaption></figure>`;
      return arts.map((a, k) => `<figure data-id="${t.id}"><img src="${a.img}" alt="${tx('Toile')} ${t.name}"><figcaption>${a.title ? `<span style="flex-basis:100%">« ${a.title} »</span>` : ''}${k ? `<span>${t.name}</span><span>${a.acc} %</span>` : cap}</figcaption></figure>`).join(''); }).join('');
    sh.innerHTML = `<div><div style="display:flex;flex-direction:row-reverse;justify-content:flex-end;align-items:center;gap:14px"><b class="bs-ptitle">${tx('MES ŒUVRES')}</b><button class="bs-back" id="k7gx" aria-label="${tx('Retour')}">${BSI.back(INK)}</button></div>
      <div class="bs-desc">${tx('Rond net = pile · jets = en avance · coulures = en retard')}</div><div class="k7gal">${cells}</div></div>`;
    menu.appendChild(sh); const close = () => pageOut(sh); sh.onclick = e => { if(e.target === sh) close(); }; sh.querySelector('#k7gx').onclick = close;
    sh.querySelectorAll('figure img').forEach(im => im.onclick = async () => { const id = im.closest('figure').dataset.id, name = `k7cut-${id}.jpg`;
      shareArt(im.src, name); });
  };
  // titre TOUCHÉ : jaune, le É en rouge, les lettres giclent avec la voix
  function homePop(i){ if(!intro) return 1; if(intro.stage !== 'play') return intro.shown ? 1 : .001; /* le titre attend son cri */ const dt2 = intro.t - .08 - POPT[Math.min(i, 9)]; if(dt2 < 0) return .001; const last = intro.t - 1.25; const b = 1 + Math.exp(-dt2*9)*Math.sin(dt2*30)*.5 + (dt2 < .06 ? .7 - dt2*10 : 0); return last > 0 ? b + Math.exp(-last*6)*.4 : b; }
  let titleSplat = null;
  function makeTitleSplat(){ const c = document.createElement('canvas'), S = 460; c.width = S*2; c.height = S*1.2; const g = c.getContext('2d'); g.scale(2, 2); const r = rngFrom('beatsplash');
    // coups de pinceau noirs en travers, puis les giclées jaune, cyan et rose
    g.fillStyle = INK; for(const [x, y, a, L] of [[S*.12, S*.5, -.42, S*.5], [S*.7, S*.08, -.42, S*.45]]){ g.save(); g.translate(x, y); g.rotate(a); for(let j=0;j<9;j++){ g.globalAlpha = .55 + r()*.4; g.fillRect(r()*20, j*4.5, L*(.6 + r()*.4), 2 + r()*3); } g.restore(); } g.globalAlpha = 1;
    crisp(g, r, S*.3, S*.28, 70, '#ffd23f', 3); crisp(g, r, S*.78, S*.36, 58, '#29c4ff', 3); crisp(g, r, S*.2, S*.4, 40, '#29c4ff', 2);
    crisp(g, r, S*.42, S*.33, 92, '#e8344f', 4); crisp(g, r, S*.64, S*.27, 76, '#ff3d7f', 3); crisp(g, r, S*.6, S*.44, 50, '#ffd23f', 3);
    // coulures
    for(let i=0;i<9;i++){ const x = S*(.22 + r()*.6), y = S*.42, L = 20 + r()*60, w = 4 + r()*5; g.fillStyle = ['#e8344f', '#ffd23f', '#29c4ff', '#ff3d7f'][i % 4]; g.fillRect(x - w/2, y, w, L); g.beginPath(); g.arc(x, y + L, w*.75, 0, 6.283); g.fill(); }
    // trame rose et éclaboussures
    for(let i=0;i<120;i++){ const x = S*(.05 + r()*.3), y = S*(.25 + r()*.25); g.fillStyle = '#ff3d7f'; g.globalAlpha = .6; g.beginPath(); g.arc(Math.round(x/7)*7, Math.round(y/7)*7, 2.2*(1 - Math.abs(x/S - .2)*3), 0, 6.283); g.fill(); }
    for(let i=0;i<80;i++){ const a = r()*6.283, d = 100 + r()*130; g.fillStyle = [INK, '#e8344f', '#ffd23f', '#29c4ff'][Math.floor(r()*4)]; g.globalAlpha = .55 + r()*.45; g.beginPath(); g.arc(S*.5 + Math.cos(a)*d*1.2, S*.3 + Math.sin(a)*d*.55, 1 + r()*3.5, 0, 6.283); g.fill(); }
    g.globalAlpha = 1; return c; }
  function star(g, x, y, R, rot){ g.save(); g.translate(x, y); g.rotate(rot); g.beginPath(); for(let i=0;i<10;i++){ const a = i*Math.PI/5 - Math.PI/2, rr = i % 2 ? R*.45 : R; g.lineTo(Math.cos(a)*rr, Math.sin(a)*rr); } g.closePath(); g.fill(); g.restore(); }
  function brushWord(g, word, x0, y, size, t, i0, fill){
    // chaque lettre : ombre noire décalée, contour épais, blanc cassé, et des traces de pinceau
    g.font = `${size}px ${TITLEF}`; let x = x0;
    [...word].forEach((c, k) => { const i = i0 + k, w = g.measureText(c).width, p = homePop(i), jy = Math.sin(t*4 - i*.6)*2.5;
      g.save(); g.translate(x + w/2, y + jy); g.scale(p, p); g.rotate(((i*37) % 7 - 3)*.012);
      g.lineJoin = 'round'; g.fillStyle = INK; g.fillText(c, -w/2 + size*.06, size*.07);
      g.lineWidth = size*.15; g.strokeStyle = INK; g.strokeText(c, -w/2, 0);
      g.fillStyle = fill || '#fbf6ea'; g.fillText(c, -w/2, 0);
      g.save(); g.globalCompositeOperation = 'source-atop'; g.fillStyle = 'rgba(28,27,25,.12)'; for(let d=0;d<4;d++) g.fillRect(-w/2 + w*(.12 + d*.22), -size*(.75 - d*.07), w*.07, size*.5); g.restore();
      g.restore(); x += w; });
  }
  // le titre en petit sur le menu des cassettes : une ligne, la même giclée rouge
  function drawMenuTitle(g, t){
    if(!titleSplat) titleSplat = makeTitleSplat(); g.save(); g.font = `100px ${TITLEF}`; const size = Math.min(46, 100*W*.6/g.measureText('BEAT SPLASH').width), z = W*.62/460;
    g.globalAlpha = .9; g.drawImage(titleSplat, W*.02, 64, 460*z, 276*z*.7); g.globalAlpha = 1;
    g.translate(0, 122); g.rotate(-.04); brushWord(g, 'BEAT SPLASH', 18, 0, size, t, 99); g.restore();
  }
  function drawHomeTitle(g, cx, y, t){
    g.save(); g.font = `100px ${TITLEF}`; const w1 = g.measureText('BEAT').width, w2 = g.measureText('SPLASH').width, size = Math.min(96, 100*W*.74/w2, H*(H < 740 ? .078 : .1)), k = size/100, top = y - size*1.05;
    if(!titleSplat) titleSplat = makeTitleSplat();
    { const z = W*1.05/460, kick = Math.max(0, 1 - ((t*MBPM/60) % 1)*4); g.drawImage(titleSplat, cx - 230*z*(1 + kick*.02), top - 40*z, 460*z*(1 + kick*.02), 276*z); }
    g.translate(cx, y); g.rotate(-.06);
    brushWord(g, 'BEAT', -w2*k/2 + size*.05, -size*.82, size*.88, t, 0);
    brushWord(g, 'SPLASH', -w2*k/2, size*.1, size, t, 4, '#ff3d7f');
    // couronne jaune sur le B, étoile noire au bout de SPLASH
    g.save(); g.translate(-w2*k/2 + size*.3, -size*1.62); g.rotate(-.18 + Math.sin(t*3)*.05); const cw = size*.42;
    g.beginPath(); g.moveTo(-cw/2, 0); g.lineTo(-cw/2, -cw*.55); g.lineTo(-cw/4, -cw*.2); g.lineTo(0, -cw*.7); g.lineTo(cw/4, -cw*.2); g.lineTo(cw/2, -cw*.55); g.lineTo(cw/2, 0); g.closePath();
    g.lineJoin = 'round'; g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); g.fillStyle = '#ffd23f'; g.fill(); g.restore();
    { const sx = w1*k*.88 - w2*k/2 + size*.55, sy = -size*1.1, rot = .2 + Math.sin(t*2)*.1; g.fillStyle = INK; star(g, sx, sy, size*.27, rot); g.fillStyle = '#ffd23f'; star(g, sx, sy, size*.2, rot); }
    g.restore();
    // étiquette jaune scotchée « TOUCHE POUR LANCER LA CASSETTE »
    g.save(); g.translate(cx + W*.04, y + size*.6); g.rotate(-.05); const txt = tx('TOUCHE POUR LANCER LA CASSETTE'); let fs = Math.min(19, W*.048); g.font = `${fs}px ${MARKER}`; const tw0 = g.measureText(txt).width; if(tw0 + 34 > W*.9){ fs *= (W*.9 - 34)/tw0; g.font = `${fs}px ${MARKER}`; } const bw = g.measureText(txt).width + 34; // l'étiquette tient dans l'écran, quelle que soit la langue
    g.fillStyle = INK; g.fillRect(-bw/2 + 4, -fs + 5, bw, fs*2); g.fillStyle = '#ffd23f'; g.beginPath(); g.moveTo(-bw/2, -fs); for(let i=0;i<=8;i++) g.lineTo(-bw/2 + i*bw/8, -fs + (i % 2 ? -2 : 1)); g.lineTo(bw/2, fs); for(let i=8;i>=0;i--) g.lineTo(-bw/2 + i*bw/8, fs + (i % 2 ? 2 : -1)); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,.55)'; g.save(); g.rotate(.5); g.fillRect(-bw/2 - 4, -fs - 18, 30, 12); g.restore();
    g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, 1); g.restore();
  }
  // le décor de l'accueil, peint une fois : papier beige taché, trame, poteaux électriques, enceintes
  let homeBg = null;
  function makeHomeBg(){ const c = document.createElement('canvas'), w = Math.round(W), h = Math.round(H); c.width = w*mdpr; c.height = h*mdpr; const g = c.getContext('2d'); g.scale(mdpr, mdpr); const r = rngFrom('papier');
    const gr = g.createRadialGradient(w*.5, h*.4, 40, w*.5, h*.5, h*.75); gr.addColorStop(0, '#efe3c6'); gr.addColorStop(1, '#cdbb94'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    for(let i=0;i<2600;i++){ g.fillStyle = r() < .5 ? 'rgba(80,60,30,.08)' : 'rgba(255,255,255,.12)'; g.fillRect(r()*w, r()*h, 1 + r()*2, 1 + r()*2); }
    // trame de points noirs dans les coins
    for(const [ox, oy] of [[0, 0], [w, h*.55]]) for(let i=0;i<500;i++){ const a = r()*6.283, d = Math.pow(r(), .7)*w*.45, x = ox + Math.cos(a)*d, y = oy + Math.sin(a)*d*.8; g.fillStyle = INK; g.globalAlpha = .7*(1 - d/(w*.45)); g.beginPath(); g.arc(x, y, 1 + r()*2.4, 0, 6.283); g.fill(); } g.globalAlpha = 1;
    // coups de bombe noirs en diagonale
    for(let i=0;i<5;i++){ g.save(); g.translate(r()*w, r()*h*.7); g.rotate(-.6 + r()*.2); g.globalAlpha = .18 + r()*.25; g.fillStyle = INK; for(let j=0;j<5;j++) g.fillRect(-60 + j*4, j*7, 120 + r()*80, 3 + r()*3); g.restore(); } g.globalAlpha = 1;
    // giclées de couleur un peu partout, avec leurs trames de points
    for(const [x, y, R, col] of [[w*.04, h*.22, 26, '#ff3d7f'], [w*.97, h*.46, 22, '#29c4ff'], [w*.08, h*.6, 16, '#ffd23f'], [w*.93, h*.72, 20, '#ff3d7f'], [w*.9, h*.17, 14, '#ffd23f'], [w*.03, h*.75, 14, '#29c4ff']]) crisp(g, r, x, y, R, col, 2);
    for(const [ox, oy, col] of [[w*.1, h*.3, '#ff3d7f'], [w*.88, h*.55, '#29c4ff'], [w*.82, h*.12, '#ff3d7f']]) for(let gx=-60;gx<=60;gx+=8) for(let gy=-40;gy<=40;gy+=8){ const d = Math.hypot(gx, gy*1.5)/60; if(d > 1) continue; g.fillStyle = col; g.globalAlpha = .7; g.beginPath(); g.arc(ox + gx, oy + gy, 2.6*(1 - d), 0, 6.283); g.fill(); } g.globalAlpha = 1;
    // grands coups de pinceau noirs, secs, en diagonale
    for(const [x, y, L, th] of [[w*.55, h*.04, w*.7, 34], [-w*.15, h*.47, w*.45, 26], [w*.7, h*.66, w*.5, 22]]){ g.save(); g.translate(x, y); g.rotate(-.42); g.fillStyle = INK; for(let j=0;j<th/3;j++){ g.globalAlpha = .5 + r()*.45; g.fillRect(r()*24, j*3.2, L*(.65 + r()*.35), 1.5 + r()*2.5); } g.restore(); } g.globalAlpha = 1;
    // échafaudages de scène derrière les enceintes
    g.strokeStyle = 'rgba(28,27,25,.45)'; g.lineWidth = 3;
    for(const [x0, x1] of [[-6, w*.22], [w*.8, w + 6]]){ for(const x of [x0, x1]){ g.beginPath(); g.moveTo(x, h*.7); g.lineTo(x, h); g.stroke(); } for(let y=h*.7; y<h; y+=h*.06){ g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.moveTo(x0, y); g.lineTo(x1, y + h*.06); g.stroke(); } }
    // éclairs roses et jaunes
    const bolt = (x, y, sz, rot, col) => { g.save(); g.translate(x, y); g.rotate(rot); g.scale(sz, sz); g.beginPath(); g.moveTo(2, -16); g.lineTo(-8, 2); g.lineTo(-1, 2); g.lineTo(-4, 16); g.lineTo(8, -3); g.lineTo(1, -3); g.lineTo(5, -16); g.closePath(); g.fillStyle = col; g.fill(); g.lineWidth = 2/sz*1.2; g.strokeStyle = INK; g.stroke(); g.restore(); };
    bolt(w*.9, h*.6, 1.3, .3, '#ff3d7f'); bolt(w*.13, h*.68, 1.4, -.2, '#ffd23f'); bolt(w*.84, h*.77, 1.2, .2, '#ff3d7f'); bolt(w*.2, h*.8, 1, -.3, '#ffd23f');
    // enceintes en bas, avec autocollants
    const sp = (x, y, sw, sh) => { g.fillStyle = INK; g.fillRect(x, y, sw, sh); g.strokeStyle = '#3a3733'; g.lineWidth = 3; g.strokeRect(x + 5, y + 5, sw - 10, sh - 10); for(const [cy2, rr] of [[.32, .26], [.72, .18]]){ g.fillStyle = '#2b2926'; g.beginPath(); g.arc(x + sw/2, y + sh*cy2, sw*rr, 0, 6.283); g.fill(); g.fillStyle = '#4a4640'; g.beginPath(); g.arc(x + sw/2, y + sh*cy2, sw*rr*.35, 0, 6.283); g.fill(); } };
    sp(-14, h*.84, w*.24, h*.2); sp(w*.2, h*.88, w*.2, h*.15); sp(w*.78, h*.86, w*.25, h*.18);
    g.fillStyle = '#ffd23f'; g.beginPath(); g.arc(w*.09, h*.9, 13, 0, 6.283); g.fill(); g.fillStyle = INK; g.beginPath(); g.arc(w*.09 - 4.5, h*.9 - 3.5, 2, 0, 6.283); g.arc(w*.09 + 4.5, h*.9 - 3.5, 2, 0, 6.283); g.fill(); g.lineWidth = 2; g.strokeStyle = INK; g.beginPath(); g.arc(w*.09, h*.9 + 1, 7, .3, Math.PI - .3); g.stroke();
    g.strokeStyle = '#f3ead7'; g.lineWidth = 2; g.save(); g.translate(w*.88, h*.91); g.beginPath(); for(let i=0;i<10;i++){ const a = i*Math.PI/5 - Math.PI/2, rr = i % 2 ? 6 : 13; g.lineTo(Math.cos(a)*rr, Math.sin(a)*rr); } g.closePath(); g.stroke(); g.restore();
    // giclées rouges
    for(const [x, y, R] of [[w*.9, h*.3, 16], [w*.15, h*.93, 12], [w*.6, h*.88, 10]]){ crisp(g, r, x, y, R, '#e8344f', 2); }
    return c; }
  function crowd(g, y, t, kick){ g.fillStyle = INK; for(let i=0;i<18;i++){ const x = i*W/16 - 10 + (i % 2)*8, h = 26 + ((i*37) % 14), jump = 0; g.beginPath(); g.arc(x, y - h - jump, 12, 0, 6.283); g.fill(); g.beginPath(); g.ellipse(x, y - h*.35 - jump, 18, h*.6, 0, Math.PI, 0); g.fill(); g.fillRect(x - 18, y - h*.35 - jump, 36, 60); if(i % 3 === 0){ g.lineWidth = 6; g.strokeStyle = INK; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 10, y - h - jump + 6); g.lineTo(x + 18 + Math.sin(t*MBPM/60*Math.PI*.5 + i)*4, y - h - 28 - jump); g.stroke(); } } }
  function reel(g, x, y, R, t){ g.fillStyle = INK; g.beginPath(); g.arc(x, y, R, 0, 6.283); g.fill(); g.fillStyle = '#f3ead7'; g.beginPath(); g.arc(x, y, R*.55, 0, 6.283); g.fill(); g.lineWidth = 3; g.strokeStyle = INK; g.stroke(); g.fillStyle = '#ffd23f'; g.beginPath(); g.arc(x, y, R*.4, 0, 6.283); g.fill(); g.save(); g.translate(x, y); g.rotate(t*1.2); g.fillStyle = '#f3ead7'; for(let i=0;i<6;i++){ g.rotate(1.047); g.fillRect(-R*.06, -R*.42, R*.12, R*.12); } g.restore(); }
  function homeFrame(dt){
    hTime += dt; introFrame(null, dt); const g = hx, beat = hTime*MBPM/60, kick = Math.max(0, 1 - (beat % 1)*4);
    g.clearRect(0, 0, W, H); // le décor (fond sombre, enceintes, nuages) et le logo sont en HTML/CSS : menus.css
    if(XMAS) xmasGarland(g, W, H*.025, H*.035, H*.03, null, k => ((k + Math.floor(beat)) % 3 === 0 ? 1 : .35));
    if(XMAS){ if(!hSnow.length) for(let i=0;i<46;i++) hSnow.push({x: Math.random()*W, y: Math.random()*H, s: 1.4 + Math.random()*2.6, v: 22 + Math.random()*40, ph: Math.random()*6.283});
      g.fillStyle = '#fff'; for(const f of hSnow){ f.y += f.v*dt; f.x += Math.sin(hTime*1.2 + f.ph)*14*dt; if(f.y > H + 6){ f.y = -6; f.x = Math.random()*W; } g.globalAlpha = .8; g.beginPath(); g.arc(f.x, f.y, f.s, 0, 6.283); g.fill(); } g.globalAlpha = 1; }
    // éclairs jaunes autour de la cassette, qui claquent sur le temps
    const room = H - 40 - hbBottom, sc = Math.max(.26, Math.min(.6, W/640, room/330)), jump = Math.sin(beat*Math.PI*.5)*3, mx2 = W*.5, my2 = hbBottom + 40 + 130*sc;
    g.save(); g.fillStyle = '#ffd60a'; g.strokeStyle = INK; g.lineWidth = 2.5; g.globalAlpha = .9 + kick*.1;
    for(const [ax, ay, ar] of [[mx2 - 150*sc, my2 - 120*sc, -.6], [mx2 + 160*sc, my2 - 140*sc, .5], [mx2 + 190*sc, my2 + 10*sc, 1.2]]){ g.save(); g.translate(ax, ay); g.rotate(ar); g.scale(1 + kick*.2, 1 + kick*.2); g.beginPath(); g.moveTo(-5, -22); g.lineTo(6, -22); g.lineTo(2, 22); g.closePath(); g.fill(); g.stroke(); g.restore(); }
    g.restore();
    // les voisines dansent sur les enceintes : on les touche pour les amener au centre
    const isOpen = t => unlocked(t) || discs() >= t.cost, iL = wrapI(cur - 1), iR = wrapI(cur + 1);
    // en campagne seulement : les voisines posées sur les enceintes, immobiles (on les touche pour les amener au centre)
    if(homeMode === 'camp'){ const s2 = sc*.45;
      g.save(); g.translate(W*.12, H*.84 - 6); g.rotate(-.18); g.scale(s2, s2); mascot(g, SHELF[iL], iL, isOpen(SHELF[iL]), false, 0, {x: .6, y: -.3}); g.restore();
      g.save(); g.translate(W*.88, H*.86 - 6); g.rotate(.16); g.scale(s2, s2); mascot(g, SHELF[iR], iR, isOpen(SHELF[iR]), false, 0, {x: -.6, y: -.3}); g.restore(); }
    // la grande cassette qui saute au milieu : celle qu'on va jouer ; elle arrive en rebondissant quand on en change
    { const gl = g.createRadialGradient(mx2, my2 + 150*sc, 4, mx2, my2 + 150*sc, 170*sc); gl.addColorStop(0, 'rgba(255,31,122,.55)'); gl.addColorStop(1, 'rgba(255,31,122,0)'); g.fillStyle = gl; g.beginPath(); g.ellipse(mx2, my2 + 150*sc, 190*sc, 40*sc, 0, 0, 6.283); g.fill();
      g.strokeStyle = 'rgba(255,31,122,.85)'; g.lineWidth = 3; g.beginPath(); g.ellipse(mx2, my2 + 158*sc, 150*sc, 22*sc, 0, 0, 6.283); g.stroke(); }
    hSel = Math.min(1, hSel + dt*3); const e2 = 1 - Math.pow(1 - hSel, 3), pop = 1 + Math.sin(hSel*Math.PI)*.12, slide = (1 - e2)*hDir*W*.5;
    g.save(); g.translate(mx2 + slide, my2 - jump); g.rotate(-.08 + Math.sin(beat*Math.PI*.5)*.025 + (1 - e2)*hDir*.4); g.scale(sc*pop, sc*pop); mascot(g, SHELF[cur], cur, isOpen(SHELF[cur]), false, hTime, {x: .4, y: -.4});
    // couronne jaune posée dessus
    g.save(); g.translate(-118, -96); g.rotate(-.45 + Math.sin(hTime*3)*.06); const cw = 70; g.beginPath(); g.moveTo(-cw/2, 0); g.lineTo(-cw/2, -cw*.55); g.lineTo(-cw/4, -cw*.2); g.lineTo(0, -cw*.7); g.lineTo(cw/4, -cw*.2); g.lineTo(cw/2, -cw*.55); g.lineTo(cw/2, 0); g.closePath(); g.lineJoin = 'round'; g.lineWidth = 8; g.strokeStyle = INK; g.stroke(); g.fillStyle = '#ffd23f'; g.fill(); g.restore();
    g.restore();
  }
  let mLast = performance.now();
  /* ---------- musique des menus : de la french house filtrée, 118 BPM ---------- */
  // une boucle d'accords « échantillonnée » derrière un filtre qui s'ouvre et se referme sur 16 mesures, la pompe sur chaque
  // grosse caisse, une basse funk en octaves, le charleston ouvert entre les temps, et une voix de robot qui répond toutes les 4 mesures
  // la grille : la m7, ré 7, sol maj7, mi m7 (fréquences des fondamentales en Hz, et les intervalles de chaque accord)
  const MM = {step: 60/MBPM/4, roots: [55, 73.42, 49, 82.41], ch: [[1, 1.189, 1.498, 1.782], [1, 1.26, 1.498, 1.782], [1, 1.26, 1.498, 1.888], [1, 1.189, 1.498, 1.782]], next: 0, n: 0, on: false};
  const MKICK = 'x...x...x...x...', MCLAP = '....x.......x...', MOHAT = '..x...x...x...x.', MSAMP = [0, 3, 6, 8, 10, 11, 14];
  const MBASS = [[0, 1, 2], [2, 2, 1], [4, 1, 1], [6, 2, 1], [8, 1, 2], [10, 2, 1], [11, 1.5, 1], [14, 2, 2]];
  // la voix de robot : [pas dans les 2 mesures, demi-tons au-dessus de la, durée en doubles croches]
  const MTALK = [[0, 12, 2], [3, 15, 2], [6, 17, 3], [10, 15, 2], [12, 12, 4], [20, 19, 2], [22, 17, 2], [24, 15, 6]];
  function menuMusic(){
    const want = !menu.hidden && state === 'menu' && !laboOn && useAudio && actx && actx.state === 'running' && !(intro && intro.stage !== 'wait');
    if(!want){ MM.on = false; return; }
    if(!MM.on){ // on reprend proprement : horloge du jeu sur celle de l'audio, bus de musique ouvert
      MM.on = true; t0 = 0; resetRate(); MM.next = actx.currentTime + .1; MM.n = 0;
      master.gain.cancelScheduledValues(actx.currentTime); master.gain.setTargetAtTime(.36, actx.currentTime, .3); // musique de fond : plus douce qu'en partie
      music.gain.cancelScheduledValues(actx.currentTime); music.gain.setTargetAtTime(.8, actx.currentTime, .05);
      tone.frequency.cancelScheduledValues(actx.currentTime); tone.frequency.setValueAtTime(20000, actx.currentTime); if(vduck){ vduck.gain.cancelScheduledValues(actx.currentTime); vduck.gain.setValueAtTime(1, actx.currentTime); }
    }
    if(!events) events = []; /* pas encore de partie ni d'intro sonore */ if(events.length > 200) events.length = 0; // en menu, personne ne consomme les impulsions visuelles
    while(MM.next < actx.currentTime + .2){
      const at = MM.next, p = MM.n % 16, bar = Math.floor(MM.n/16), k = bar % 4, r = MM.roots[k], sec = bar % 16, drop = sec === 15;
      // le filtre : fermé au début, grand ouvert à la mesure 12, il retombe ; la mesure 16 coupe la grosse caisse pour la relance
      const open = .5 - .5*Math.cos((bar % 16 + p/16)/16*Math.PI*2), cut = 380 + 4200*open;
      if(MKICK[p] === 'x' && !drop){ I.kick(at, .85); duck(at, .3); }
      if(drop && p === 0) noise(master, at, MM.step*16, .05, 'highpass', 600, 9000, false, {rev: .3});
      if(sec === 0 && p === 0 && bar) I.crash(at);
      if(MCLAP[p] === 'x' && sec >= 2) I.clap(at, .12);
      if(MOHAT[p] === 'x' && sec >= 1) I.hat(at, .07, true, .15); else if(p % 2 === 0 && sec >= 4) I.hat(at, .03, false, -.2);
      const b = MBASS.find(q => q[0] === p); if(b && sec >= 2 && !drop) I.bass(at, r*b[1], b[2]*MM.step*.85, 'funk');
      // les accords coupés comme un sample de disco, derrière le filtre
      if(MSAMP.includes(p)) MM.ch[k].forEach((m, i) => { for(const dt of [-9, 9]) osc(music, 'sawtooth', r*4*m, at, MM.step*1.7, .016, {lp: [cut, cut*.6, 7], pan: (i - 1.5)*.25 + dt/60, detune: dt + i*3, rev: .15}); osc(music, 'square', r*8*m, at, MM.step*1.2, .005, {lp: [cut*1.3, cut*.7, 5], pan: -(i - 1.5)*.25}); });
      // la voix de robot répond aux mesures 3-4 de chaque groupe de 4, quand le filtre est assez ouvert
      if(k >= 2 && open > .3){ const st = (k - 2)*16 + p, tk2 = MTALK.find(q => q[0] === st); if(tk2) I.talk(at, 220*Math.pow(2, tk2[1]/12), tk2[2]*MM.step*.95); }
      MM.next += MM.step; MM.n++;
    }
  }
  (function mLoop(t){ const dt = Math.min(.05, (t - mLast)/1000); mLast = t; if(!menu.hidden){ if(homeOn) homeFrame(dt); else menuFrame(dt); } try{ menuMusic(); }catch(e){ window.__mmErr = String(e && e.stack || e); } requestAnimationFrame(mLoop); })(mLast);

  function showMenu(){
    outroStop(); { const rw = stage.querySelector('.k7rw'); if(rw) rw.remove(); }
    api.closeEnd(); state = 'menu'; tutoOpen = false; { const ov = stage.querySelector('#k7tutoov'); if(ov) ov.remove(); } if(useAudio && music) music.gain.setValueAtTime(.8, actx.currentTime);
    api.hud(''); for(const k in imgCache) delete imgCache[k];
    mPos = mTarget = cur; mVel = 0; refreshUI(true);
    menu.hidden = false; stopBtn.hidden = true; requestAnimationFrame(layoutMenu); showHome(); deathRun = null;
  }
  function hideMenu(){ menu.hidden = true; stopBtn.hidden = false; pauseEl.hidden = true; paused = false; }
  function showLabo(){
    laboOn = true; state = 'menu'; auto = false; menu.hidden = true; stopBtn.hidden = true; homeOn = false; home.hidden = true; api.hud(''); api.closeEnd();
    for(const q of stage.querySelectorAll('.k7rw, .k7lab')) q.remove();
    if(useAudio && music){ music.gain.cancelScheduledValues(actx.currentTime); music.gain.setValueAtTime(.8, actx.currentTime); }
    if(!document.getElementById('k7-lab-css')){ const st = document.createElement('style'); st.id = 'k7-lab-css'; st.textContent = `
      .k7lab{position:absolute;inset:0;z-index:12;overflow-y:auto;background:#efe5cf;color:${INK};font-family:"Rubik",sans-serif;-webkit-overflow-scrolling:touch}
      .k7lab .in{padding:16px 14px 28px;display:flex;flex-direction:column;gap:12px;max-width:480px;margin:0 auto}
      .k7lab h2{margin:4px 0 0;font-family:${GRAF};font-weight:400;font-size:clamp(30px,9vw,42px);color:#ffd23f;-webkit-text-stroke:3px ${INK};paint-order:stroke fill;text-shadow:3px 4px 0 ${INK};transform:rotate(-3deg)}
      .k7lab .intro{font-size:14px;line-height:1.4}
      .k7lab .card{background:#fff;border:3px solid ${INK};border-radius:12px;padding:10px 12px;display:grid;grid-template-columns:auto 1fr;gap:4px 12px;box-shadow:0 4px 0 ${INK}}
      .k7lab .num{grid-row:span 2;font-family:${FONT};font-size:26px;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;border:3px solid ${INK}}
      .k7lab .nm{font-family:${MARKER};font-size:20px;line-height:1.1}.k7lab .gn{font-weight:800;font-size:12px;letter-spacing:.04em;opacity:.75}
      .k7lab .ds{grid-column:1/-1;font-size:13.5px}
      .k7lab .bt{grid-column:1/-1;display:flex;gap:8px;margin-top:4px}
      .k7lab button{border:3px solid ${INK};border-radius:10px;background:#f6efe0;font-family:${FONT};font-size:12px;padding:10px 8px;cursor:pointer;flex:1;color:${INK}}
      .k7lab button.play{background:#e8344f;color:#fff}.k7lab button.like.on{background:#ffd23f}
      .k7lab .sum{position:sticky;bottom:0;background:${INK};color:#fff;border-radius:12px;padding:12px;font-family:${MARKER};font-size:16px;text-align:center}
      .k7lab .back{background:${INK};color:#fff}
      .k7lab .send{background:#ff3d7f;color:#fff;font-size:16px;padding:14px 8px;box-shadow:0 4px 0 ${INK}}
      .k7lab .code{background:#fff;border:3px dashed ${INK};border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:6px;font-size:13.5px}
      .k7lab .code input{font:800 22px 'Rubik',sans-serif;text-align:center;border:3px solid ${INK};border-radius:10px;padding:8px;width:100%;background:#ffd23f;color:${INK};user-select:all;-webkit-user-select:all}
      .k7lab .code em{font-style:normal;font-weight:700;opacity:.75}`; document.head.appendChild(st); }
    const likes = new Set(api.load('labo.likes', [])), el = document.createElement('div'); el.className = 'k7lab';
    const code = () => 'LABO-' + LAB.map((t, i) => likes.has(t.id) ? i + 1 : 0).filter(Boolean).join('-');
    const sum = () => likes.size ? `${likes.size} ♥ : ${LAB.map((t, i) => likes.has(t.id) ? t.name : null).filter(Boolean).join(' · ')}` : 'Mets un ♥ aux morceaux qui te plaisent, puis ENVOYER';
    el.innerHTML = `<div class="in"><h2>LABO MUSIQUE</h2>
      <div class="intro"><b>ÉCOUTER</b> : le jeu joue tout seul. <b>JOUER</b> : tu joues en Apprenti. Le bouton pause te ramène ici. Mets des ♥, puis <b>ENVOYER</b> te donne un code à copier à Claude.</div>
      ${LAB.map((t, i) => `<div class="card" data-i="${i}"><div class="num" style="background:${t.bg[0]}">${i + 1}</div><div class="nm">${t.name}</div><div class="gn">${t.label.toUpperCase()}${t.ref ? ' · ' + t.ref.toUpperCase() : ''}</div>
        <div class="ds">${t.desc}</div><div class="bt"><button class="play">${BSI.triR()} ÉCOUTER</button><button class="game">${BSI.pad(INK)} JOUER</button><button class="like ${likes.has(t.id) ? 'on' : ''}">♥</button></div></div>`).join('')}
      <div class="sum"></div><button class="send">ENVOYER MES ♥</button><div class="code" hidden><span>Ton code, à copier à Claude :</span><input readonly><em></em></div><button class="back">${BSI.triL()} RETOUR AUX CASSETTES</button></div>`;
    stage.appendChild(el); el.querySelector('.sum').textContent = sum();
    el.querySelectorAll('.card').forEach(c => { const t = LAB[+c.dataset.i];
      c.querySelector('.play').onclick = () => { el.remove(); diff = DIFFS[1]; auto = true; startTrack(t); auto = true; };
      c.querySelector('.game').onclick = () => { el.remove(); diff = DIFFS[0]; auto = false; startTrack(t); };
      c.querySelector('.like').onclick = e => { likes.has(t.id) ? likes.delete(t.id) : likes.add(t.id); api.save('labo.likes', [...likes]); e.target.classList.toggle('on'); el.querySelector('.sum').textContent = sum(); }; });
    el.querySelector('.send').onclick = () => { const box = el.querySelector('.code'), inp = box.querySelector('input'), em = box.querySelector('em'); box.hidden = false;
      if(!likes.size){ inp.value = ''; em.textContent = 'Mets au moins un ♥ avant d\'envoyer.'; return; }
      inp.value = code(); inp.focus(); inp.select(); em.textContent = 'Appuie longtemps sur le code pour le copier.';
      try{ navigator.clipboard.writeText(inp.value).then(() => { em.textContent = 'Code copié ✓ Colle-le à Claude.'; }).catch(() => {}); }catch(e){} box.scrollIntoView({block: 'center'}); };
    el.querySelector('.back').onclick = () => { el.remove(); laboOn = false; showMenu(); };
  }

  // les commandes de test (lancer un morceau, lire et changer l'état) : seulement pour la version de test, le robot et l'aperçu du GDD ;
  // un joueur n'a que l'écran en cours, lu par le rapport de bug
  const K7TEST = {home: () => showHome(), death: () => deathStart(), get deathInfo(){ return deathRun ? {songs: deathRun.songs, hearts, score, track: tr && tr.id} : null; }, art: storeArt, get recs(){ return Object.keys(recBuf); }, get outro(){ return outroBus ? outroBus.length : 0; }, get menuMusic(){ return MM.on ? MM.n : 0; }, get intro(){ return intro ? intro.stage + (intro.silent ? ' muet' : '') + (intro.shown ? ' vu' : '') + ' ' + (actx ? actx.state : 'pas-audio') : 'fini ' + (actx ? actx.state : ''); }, bars: () => Array.from({length: totalBars}, (_, b) => buildBar(b)), get bpm(){ return tr.bpm; }, get voice(){ return voiceBuf ? voiceBuf.duration : 0; }, get jumpT(){ return jumpT; }, get hs(){ return holdState; }, pick: t => pickAt(t), now: () => now(), get objs(){ return objs; }, get state(){ return state; }, get stats(){ return stats; }, get combo(){ return combo; }, get trance(){ return trance; }, get hearts(){ return hearts; }, set hearts(v){ hearts = v; }, get bpb(){ return bpb; }, get ppb(){ return ppbNow(); }, get rate(){ return rate; }, get kit(){ return kit ? Object.keys(kit).length : 0; }, get tuto(){ return tutoObj && state === 'tuto' ? tk(tutoObj) : null; }, get lost(){ return lostTime; }, start: (i, d) => { if(d != null) diff = DIFFS[d]; startTrack(typeof i === 'string' ? byId(i) : TRACKS[i]); }, lab: (i, d, a) => { if(d != null) diff = DIFFS[d]; auto = !!a; startTrack(LAB[i]); }, tracks: TRACKS, cv};
  window.__k7 = window.BS_TEST_BUILD || window.__k7bot || (window.Tuning && Tuning.preview) ? K7TEST : {get state(){ return state; }};
  // images de la boutique (icône, bannière), dessinées par le jeu : tests/store_art.py les enregistre
  function storeArt(w, h, kind){
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); if(!titleSplat) titleSplat = makeTitleSplat();
    if(kind !== 'fg'){ const gr = g.createRadialGradient(w*.5, h*.45, 10, w*.5, h*.5, Math.max(w, h)*.7); gr.addColorStop(0, '#efe3c6'); gr.addColorStop(1, '#cdbb94'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      const r = rngFrom('icone'); for(let i=0;i<w*h/90;i++){ g.fillStyle = r() < .5 ? 'rgba(80,60,30,.08)' : 'rgba(255,255,255,.12)'; g.fillRect(r()*w, r()*h, 1 + r()*w/400, 1 + r()*w/400); } }
    if(kind === 'banner'){
      g.drawImage(titleSplat, w*.02, -h*.05, h*1.5, h*.9);
      g.save(); g.translate(w*.06, h*.5); g.rotate(-.06); g.font = `100px ${TITLEF}`; const sz = 100*w*.4/g.measureText('SPLASH').width; brushWord(g, 'BEAT', 0, -sz*.05, sz*.88, 0, 99); brushWord(g, 'SPLASH', 0, sz*.9, sz, 0, 99); g.restore();
      g.save(); g.translate(w*.74, h*.47); g.rotate(-.12); g.scale(h/520, h/520); mascot(g, TRACKS[0], 0, true, true, .3, {x: -.4, y: -.3}); g.restore();
      g.save(); g.translate(w*.94, h*.78); g.rotate(.25); g.scale(h/1500, h/1500); mascot(g, TRACKS[2], 2, true, true, 1.3, {x: -.6, y: -.3}); g.restore();
    } else {
      const z = kind === 'fg' ? .62 : .82; // l'icône adaptative garde son dessin dans le cercle central
      g.drawImage(titleSplat, w*(.5 - .8*z), h*(.5 - .62*z), w*1.6*z, w*.96*z);
      g.save(); g.translate(w/2, h*.47); g.rotate(-.1); g.scale(w*z/330, w*z/330); mascot(g, TRACKS[0], 0, true, true, .3, {x: .3, y: -.3}); g.restore();
    }
    return c.toDataURL('image/png');
  }
  // on arrive sur l'accueil (titre, JOUER, CASSETTES, OPTIONS) ; le menu des cassettes est derrière
  showMenu(); showHome('title');
  if(document.documentElement.classList.contains('splash')) window.addEventListener('bs-splash-end', () => introGo(), {once: true});
  else api.after(250, introGo);
  if(window.BS_TEST_BUILD && /labo/.test(location.search)) showLabo();
  return () => { try{ if(holdState && holdState.voice) holdState.voice.stop(); if(actx) actx.close(); }catch(e){} };
}};
})();
