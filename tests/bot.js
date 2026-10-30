["C","J","H","S"].forEach(k => localStorage.setItem("k7cut.tuto." + k, "true"));
window.__bot = function(sigma, mode){
  const k = window.__k7, cv = k.cv; const r = cv.getBoundingClientRect(); const cx = r.left + r.width*.6, cy = r.top + r.height*.3;
  const seen = new Set(), plan = []; let pid = 10;
  const gauss = () => { let u = 0, v = 0; while(!u) u = Math.random(); while(!v) v = Math.random(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); };
  const fire = (type, x, y, id) => cv.dispatchEvent(new PointerEvent(type, {clientX: x, clientY: y, pointerId: id, bubbles: true, pointerType: 'touch', isPrimary: true}));
  window.__rep = {flags: [], misses: [], acts: 0, unresolved: []};
  function tick(){
    if(k.state === 'play'){
      const t = k.now();
      for(const o of k.objs){ if(seen.has(o) || o.done || !['C','J','H','S'].includes(o.k)) continue;
        if(o.time - t < .4){ seen.add(o); plan.push({o, at: o.time + gauss()*sigma, stage: 0, id: pid++}); } }
      for(const a of plan){ if(a.fin) continue; const o = a.o;
        if(a.stage === 0 && t >= a.at){ a.jt0 = k.jumpT; fire('pointerdown', cx, cy, a.id); a.stage = 1; a.t1 = t; a.err = Math.round((t - o.time)*1000); continue; }
        if(a.stage === 1){
          let style = mode === 'wrong' ? (o.k === 'C' ? 'tap' : (o.bomb ? 'tap' : 'swipe')) : mode === 'sloppy' ? (o.bomb ? 'tap' : (Math.random() < .5 ? 'tap' : 'swipe')) : (o.k === 'C' ? 'swipe' : 'tap');
          if(o.k === 'C' || o.k === 'J'){
            if(style === 'swipe'){ fire('pointermove', cx + 25, cy + 30, a.id); fire('pointerup', cx + 30, cy + 36, a.id); }
            else { fire('pointermove', cx + 4, cy + 5, a.id); fire('pointerup', cx + 5, cy + 6, a.id); }
            a.fin = true; a.check = t;
          }
          else if(o.k === 'H' && t >= o.endTime){ fire('pointerup', cx, cy, a.id); a.fin = true; }
          else if(o.k === 'S'){ const ph = Math.floor((t - a.t1)/(k.bpb/4)); const y = cy + (ph % 2 ? 40 : 0); fire('pointermove', cx, y, a.id); if(t >= o.endTime){ fire('pointerup', cx, y, a.id); a.fin = true; } }
          if(a.fin){ window.__rep.acts++;
            if(o.k === 'C' && k.jumpT < .05) window.__rep.flags.push('SAUT_SUR_COUPE ' + o.beat);
            if(o.k === 'J' && !o.bomb && k.jumpT > .05 && Math.abs(a.err) < 150) window.__rep.flags.push('PAS_DE_SAUT ' + o.beat);
            if((o.k === 'C' || o.k === 'J') && !o.done && Math.abs(a.err) < 150) window.__rep.unresolved.push(o.k + o.beat + ':' + a.err);
          }
        } }
      for(const o of k.objs) if(o.result === 'miss' && !o.__rep){ o.__rep = 1; const a = plan.find(x => x.o === o); window.__rep.misses.push(o.k + (o.bomb ? 'b' : '') + o.beat + ':' + (a ? a.err : 'none')); }
    }
    requestAnimationFrame(tick);
  }
  tick();
};
