["C","CV","CH","CD","J","D","H","S"].forEach(k => { localStorage.setItem("k7cut.tuto." + k, "true"); localStorage.setItem("k7cut.tuto2." + k, "true"); localStorage.setItem("k7cut.tuto3." + k, "true"); });
window.__bot = function(sigma, mode){
  const k = window.__k7, cv = k.cv; const r = cv.getBoundingClientRect(); const cx = r.left + r.width*.6, cy = r.top + r.height*.3;
  const seen = new Set(), plan = []; let pid = 10;
  const gauss = () => { let u = 0, v = 0; while(!u) u = Math.random(); while(!v) v = Math.random(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); };
  const fire = (type, x, y, id) => cv.dispatchEvent(new PointerEvent(type, {clientX: x, clientY: y, pointerId: id, bubbles: true, pointerType: 'touch', isPrimary: true}));
  window.__k7log = []; window.__rep = {flags: [], misses: [], acts: 0, unresolved: [], rates: []}; setInterval(() => { if(window.__k7.rate != null) window.__rep.rates.push(+window.__k7.rate.toFixed(2)); }, 1000);
  function tick(){
    if(k.state === 'play'){ 
      const t = k.now();
      { const hw = o => o.k === 'C' ? (o.shape === 'wide' ? 27 : 12) : o.k === 'J' ? 16 : o.k === 'A' ? 10 : o.k === 'N' ? 7 : 0;
        const vis = k.objs.filter(o => !o.done && hw(o) && o.beat - t/k.bpb < 6 && !o.__ov).sort((a, b) => a.beat - b.beat);
        for(let i=1;i<vis.length;i++){ const a = vis[i - 1], b = vis[i], gap = (b.beat - a.beat)*k.ppb, need = hw(a) + hw(b);
          const big = (a.k === 'C' || a.k === 'J') && (b.k === 'C' || b.k === 'J'); if(gap < need && big){ b.__ov = 1; window.__rep.flags.push('CHEVAUCHE ' + a.k + (a.shape || '') + '/' + b.k + (b.shape || '') + ' ' + Math.round(gap) + '<' + need); } } }
      for(const o of k.objs){ if(seen.has(o) || o.done || !['C','J','H','S','D'].includes(o.k)) continue;
        if(o.time - t < .4){ seen.add(o); if(mode === 'lose' && o.beat >= 60 && o.beat < 72 && (o.k === 'C' || o.k === 'J')){ continue; } plan.push({o, at: o.time + gauss()*sigma, stage: 0, id: pid++}); } }
      for(const a of plan){ if(a.fin) continue; const o = a.o;
        if(a.stage === 0 && t >= a.at && o.k === 'D'){ fire('pointerdown', cx - 20, cy, a.id); fire('pointerdown', cx + 20, cy, a.id + 5000); fire('pointerup', cx - 20, cy, a.id); fire('pointerup', cx + 20, cy, a.id + 5000); a.stage = 2; a.fin = true; a.err = Math.round((t - o.time)*1000); window.__rep.acts++; continue; }
        if(a.stage === 0 && t >= a.at){ a.jt0 = k.jumpT; fire('pointerdown', cx, cy, a.id); a.stage = 1; a.t1 = t; a.err = Math.round((t - o.time)*1000); continue; }
        if(a.stage === 1){
          let style = mode === 'wrong' ? (o.k === 'C' ? 'tap' : (o.bomb ? 'tap' : 'swipe')) : mode === 'lose' ? (o.k === 'C' ? 'swipe' : 'tap') : mode === 'backward' ? (o.k === 'C' ? 'swipe' : 'tap') : mode === 'sloppy' ? (o.bomb ? 'tap' : (Math.random() < .5 ? 'tap' : 'swipe')) : (o.k === 'C' ? 'swipe' : 'tap');
          if(o.k === 'C' || o.k === 'J'){
            const cutsB = k.objs.filter(q => q.k === 'C' && q.done && q.result !== 'miss').length, jt = k.jumpT;
            if(style === 'swipe'){ const v = o.shape === 'wide' ? [1, .25] : o.shape === 'tall' ? [.25, -1] : [1, -1]; /* diagonale : vers le haut et la droite */ const w = mode === 'backward' ? -1 : 1; fire('pointermove', cx + v[0]*28*w, cy + v[1]*28*w, a.id); fire('pointerup', cx + v[0]*36*w, cy + v[1]*36*w, a.id); }
            else { fire('pointermove', cx + 4, cy + 5, a.id); fire('pointerup', cx + 5, cy + 6, a.id); }
            a.fin = true; a.check = t;
            const cutsA = k.objs.filter(q => q.k === 'C' && q.done && q.result !== 'miss').length;
            if(style === 'tap' && cutsA > cutsB) window.__rep.flags.push('COUPE_SUR_TAP ' + o.beat);
            if(style === 'swipe' && k.jumpT < .02 && jt > .02) window.__rep.flags.push('SAUT_SUR_GLISSE ' + o.beat);
            a.style = style; if(o.wrongWay) window.__rep.flags.push('MAUVAIS_SENS ' + o.beat);
          }
          else if(o.k === 'H' && t >= o.endTime){ fire('pointerup', cx, cy, a.id); a.fin = true; }
          else if(o.k === 'S'){ const ph = Math.floor((t - a.t1)/(k.bpb/4)); const y = cy + (ph % 2 ? 40 : 0); fire('pointermove', cx, y, a.id); if(t >= o.endTime){ fire('pointerup', cx, y, a.id); a.fin = true; } }
          if(a.fin){ window.__rep.acts++;
            
            if(o.k === 'J' && !o.bomb && a.style === 'tap' && k.jumpT > .05 && Math.abs(a.err) < 150) window.__rep.flags.push('PAS_DE_SAUT ' + o.beat);
            if(mode === 'right' && (o.k === 'C' || o.k === 'J') && !o.done && Math.abs(a.err) < 150) window.__rep.unresolved.push(o.k + o.beat + ':' + a.err);
          }
        } }
      for(const o of k.objs) if(o.result === 'miss' && !o.__rep){ o.__rep = 1; const a = plan.find(x => x.o === o); window.__rep.misses.push(o.k + (o.bomb ? 'b' : '') + o.beat + ':' + (a ? a.err : 'none')); }
    }
    requestAnimationFrame(tick);
  }
  tick();
};
