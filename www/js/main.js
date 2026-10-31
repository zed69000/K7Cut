(function(){
const stage = document.getElementById('stage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  load(k, d){ try{ const v = localStorage.getItem('k7cut.' + k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
  save(k, v){ try{ localStorage.setItem('k7cut.' + k, JSON.stringify(v)); }catch(e){} }
};
let AC = null;
function tone(f, d, type, v, f2){ if(store.load('muted', false)) return; try{ AC = AC || new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ return; } const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); if(f2) o.frequency.exponentialRampToValueAtTime(f2, t + d); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d + .03); }
const sfx = {
  coin(){ tone(988, .07, 'square', .05); setTimeout(() => tone(1319, .14, 'square', .05), 70); },
  lose(){ tone(220, .2, 'sawtooth', .05, 140); },
  click(){ tone(900, .03, 'square', .035); }
};
const cleanups = [];
const api = {
  store, sfx, reduced,
  load: (k, d) => store.load(k, d), save: (k, v) => store.save(k, v),
  vibe(ms){ try{ navigator.vibrate && navigator.vibrate(ms); }catch(e){} },
  canvas(){ const r = stage.getBoundingClientRect(); const W = Math.max(280, Math.floor(r.width)), H = Math.max(400, Math.floor(r.height)); const dpr = Math.min(window.devicePixelRatio || 1, 2); const cv = document.createElement('canvas'); cv.width = W*dpr; cv.height = H*dpr; cv.className = 'cv'; stage.appendChild(cv); const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); const pt = e => { const b = cv.getBoundingClientRect(); return {x: (e.clientX - b.left)*W/b.width, y: (e.clientY - b.top)*H/b.height}; }; return {cv, ctx, W, H, pt, dpr}; },
  loop(fn){ let last = performance.now(); const step = t => { const dt = Math.min(.05, (t - last)/1000); last = t; fn(dt, t/1000); requestAnimationFrame(step); }; requestAnimationFrame(step); },
  on(el, ev, fn, opt){ el.addEventListener(ev, fn, opt); },
  after(ms, fn){ return setTimeout(fn, ms); },
  hud(){},
  shake(px){ if(reduced) return; const k = []; for(let i=0;i<6;i++){ const f = (px || 8)*(1 - i/6); k.push({transform: `translate(${(Math.random()*2 - 1)*f}px,${(Math.random()*2 - 1)*f}px)`}); } k.push({transform: 'translate(0,0)'}); stage.animate(k, {duration: 280, easing: 'ease-out'}); },
  banner(){},
  closeEnd(){ stage.querySelectorAll('.end').forEach(e => e.remove()); },
  end({title, text, win, actions, img, caption}){
    api.closeEnd();
    const o = document.createElement('div'); o.className = 'end ' + (win ? 'win' : 'lose');
    o.innerHTML = '<div class="end-card"><div class="end-label"><p class="end-title"></p></div><div class="end-stripe"></div><p class="end-text"></p><div class="end-actions"></div></div>';
    o.querySelector('.end-title').textContent = title; o.querySelector('.end-text').textContent = text;
    if(img){ const fig = document.createElement('figure'); fig.className = 'end-art'; const im = new Image(); im.src = img; im.alt = caption || 'Ton œuvre'; fig.appendChild(im); if(caption){ const fc = document.createElement('figcaption'); fc.textContent = caption; fig.appendChild(fc); } o.querySelector('.end-stripe').after(fig); }
    const box = o.querySelector('.end-actions');
    (actions || []).forEach((a, i) => { const b = document.createElement('button'); b.className = 'btn' + (i ? ' ghost' : ''); b.textContent = a.label; b.onclick = () => { sfx.click(); if(!a.keep) o.remove(); a.fn && a.fn(); }; box.appendChild(b); });
    stage.appendChild(o);
  }
};
// marges de sécurité : quand la vue passe sous la barre d'état (appli Android plein écran) sans annoncer d'encoche, on en garde une quand même
function safeArea(){
  const probe = document.createElement('div'); probe.style.cssText = 'position:fixed;top:0;height:var(--sat);width:1px;visibility:hidden'; document.body.appendChild(probe);
  const top = probe.offsetHeight; probe.remove();
  const full = window.innerHeight >= screen.height - 2, phone = Math.min(screen.width, screen.height) < 600;
  if(!top && full && phone){ document.documentElement.style.setProperty('--sat', '30px'); document.documentElement.style.setProperty('--sab', 'max(16px, env(safe-area-inset-bottom, 0px))'); }
}
function boot(){ try{ safeArea(); }catch(e){}
 try{ GAMES.trancheroute.mount(stage, api); }catch(e){ stage.innerHTML = '<p style="padding:24px">Le jeu n\'a pas pu démarrer : ' + e.message + '</p>'; } }
// écran d'ouverture MusclorDuck : il s'efface seul ; un toucher le passe tout de suite
(function(){
  const root = document.documentElement, el = document.getElementById('splash'), art = document.getElementById('spArt');
  if(!el || !root.classList.contains('splash')) return;
  // le trait gravé tremble légèrement, comme une animation dessinée image par image
  let step = 0; const boil = setInterval(() => { step = (step + 1) % 3; art.setAttribute('filter', 'url(#spWob' + (step + 1) + ')'); }, 170);
  // la fin de l'écran prévient le jeu, qui lance son intro (un toucher sur l'écran compte comme geste pour le son)
  const end = () => { clearInterval(boil); root.classList.remove('splash'); window.dispatchEvent(new Event('bs-splash-end')); };
  const timer = setTimeout(end, 2850);
  el.addEventListener('pointerdown', () => { clearTimeout(timer); end(); }, {once: true});
})();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
