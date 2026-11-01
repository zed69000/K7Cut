/* ===== BEAT SPLASH : publicité (même système que Date Gravity, ads.js) =====
   Point d'entrée unique pour la pub. Le jeu n'appelle que :
     BSAds.maybeInterstitial({trackIndex})  -> Promise, résolue quand le jeu peut continuer

   Pas de vidéo récompensée dans BEAT SPLASH : rien ne s'achète avec une pub, le classement reste
   le même pour tout le monde.

   Deux fournisseurs :
     "fake"  : de faux encarts, sur le site web, pour juger le rythme et l'emplacement ;
     "admob" : les vraies pubs Google, uniquement dans l'application iOS / Android (Capacitor).
   Le choix est automatique. Brancher une autre régie = ajouter une entrée dans `providers`.

   Tests rapides :  index.html?ads=debug  (interstitiel à chaque fin de morceau)
                    index.html?ads=off    (aucune pub)
*/
(function(){
  const param = new URLSearchParams(location.search).get('ads');
  const tr = s => window.BSi18n ? BSi18n.t(s) : s;

  const config = {
    enabled: param !== 'off',
    debug: param === 'debug',
    provider: 'fake',             // remplacé par "admob" plus bas quand on tourne dans l'application
    admobTesting: !!window.BS_TEST_BUILD, // défini dans index.html
    freeTracks: 2,                // jamais de pub autour des 2 premières cassettes
    interstitialEveryRuns: 3,     // au plus un interstitiel tous les N morceaux joués
    minSecondsBetweenAds: 180,    // et jamais deux pubs à moins de N secondes (le lancement du jeu compte)
    fakeInterstitialSkipAfter: 2, // secondes avant que "Passer" soit actif
    fakeInterstitialSeconds: 5    // fermeture automatique
  };

  let runsSinceAd = 0;
  let lastAdAt = Date.now();      // pas de pub dans les premières minutes de jeu
  let showing = false;

  function now(){ return Date.now(); }
  function readLastAd(){
    try{ return Math.max(lastAdAt, Number(sessionStorage.getItem('bs_last_ad_at')) || 0); }catch(e){ return lastAdAt; }
  }
  function markAdShown(){
    lastAdAt = now();
    runsSinceAd = 0;
    try{ sessionStorage.setItem('bs_last_ad_at', String(lastAdAt)); }catch(e){}
  }

  function injectStyle(){
    if(document.getElementById('bsAdsStyle')) return;
    const st = document.createElement('style');
    st.id = 'bsAdsStyle';
    st.textContent =
      '#bsAdOverlay{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;padding:calc(18px + var(--sat,0px)) 18px calc(18px + var(--sab,0px));background:rgba(28,27,25,.82);font-family:Rubik,Arial,sans-serif;color:#1c1b19;animation:bsAdIn .18s ease both}' +
      '@keyframes bsAdIn{from{opacity:0}to{opacity:1}}' +
      '.bsAdCard{width:min(92vw,360px);border-radius:14px;overflow:hidden;background:#efe5cf;border:4px solid #1c1b19;box-shadow:0 6px 0 #1c1b19}' +
      '.bsAdTop{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;font-size:11px;font-weight:800;letter-spacing:.06em;opacity:.8}' +
      '.bsAdTag{padding:3px 7px;border-radius:5px;background:#ffd23f;border:2px solid #1c1b19}' +
      '.bsAdCreative{aspect-ratio:6/5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:16px;background:repeating-linear-gradient(135deg,#29c4ff 0 14px,#5fd3ff 14px 28px);border-block:3px solid #1c1b19}' +
      '.bsAdCreative b{font:900 24px/1 Rubik,Arial,sans-serif;text-transform:uppercase}' +
      '.bsAdCreative span{font-size:12.5px;font-weight:700;line-height:1.35}' +
      '.bsAdBottom{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px}' +
      '.bsAdInfo{font-size:12.5px;font-weight:800;opacity:.75}' +
      '.bsAdBtn{appearance:none;border:3px solid #1c1b19;border-radius:999px;padding:10px 16px;font:800 14px/1 Rubik,Arial,sans-serif;color:#1c1b19;background:#ffd23f;cursor:pointer;touch-action:manipulation}' +
      '.bsAdBtn:disabled{opacity:.45;cursor:default}' +
      '.bsAdBar{height:5px;background:#d8d2c6}' +
      '.bsAdBar i{display:block;height:100%;width:0;background:#e8344f;transition:width .25s linear}';
    document.head.appendChild(st);
  }

  // Faux encart. Résout {completed, skipped}.
  function fakeAd(opts){
    return new Promise(resolve => {
      injectStyle();
      const total = opts.seconds;
      const ov = document.createElement('div');
      ov.id = 'bsAdOverlay';
      ov.setAttribute('role', 'dialog');
      ov.setAttribute('aria-modal', 'true');
      ov.setAttribute('aria-label', tr('Publicité'));
      ov.innerHTML =
        '<div class="bsAdCard">' +
          '<div class="bsAdTop"><span><span class="bsAdTag">PUB</span> &nbsp;' + opts.kind + '</span><span>' + tr('fausse pub de test') + '</span></div>' +
          '<div class="bsAdCreative"><b>' + tr('Votre pub ici') + '</b><span>' + opts.text + '</span></div>' +
          '<div class="bsAdBar"><i></i></div>' +
          '<div class="bsAdBottom"><span class="bsAdInfo"></span><button class="bsAdBtn" type="button"></button></div>' +
        '</div>';
      const info = ov.querySelector('.bsAdInfo');
      const btn = ov.querySelector('.bsAdBtn');
      const bar = ov.querySelector('.bsAdBar i');
      const started = now();
      let done = false;

      // Tant que la pub est affichée, aucune touche ne doit atteindre le jeu.
      const swallow = e => { e.stopPropagation(); if(e.key !== 'Tab') e.preventDefault(); };
      window.addEventListener('keydown', swallow, true);

      function finish(result){
        if(done) return;
        done = true;
        clearInterval(timer);
        window.removeEventListener('keydown', swallow, true);
        ov.remove();
        resolve(result);
      }
      function tick(){
        const elapsed = (now() - started)/1000;
        const left = Math.max(0, Math.ceil(total - elapsed));
        bar.style.width = Math.min(100, elapsed/total*100) + '%';
        const canSkip = elapsed >= opts.skipAfter;
        info.textContent = (canSkip ? tr('Reprise dans') : 'Pub ·') + ' ' + left + ' s';
        btn.textContent = tr('Passer') + ' ›';
        btn.disabled = !canSkip;
        btn.onclick = () => finish({completed: false, skipped: true});
        if(elapsed >= total) finish({completed: true});
      }
      const timer = setInterval(tick, 200);
      document.body.appendChild(ov);
      tick();
      btn.focus({preventScroll: true});
    });
  }

  /* --- AdMob (application seulement) ---
     Les blocs d'annonces BEAT SPLASH du compte AdMob de Date Gravity (l'identifiant d'application est dans
     tools/app/configure-native.mjs). Tant que admobTesting est vrai, le plugin les remplace par les pubs
     de test de Google : elles s'affichent pareil mais ne rapportent rien. */
  const cap = window.Capacitor;
  const AdMob = cap && cap.isNativePlatform && cap.isNativePlatform() && cap.Plugins ? cap.Plugins.AdMob : null;
  const ADMOB_UNITS = {
    ios: {interstitial: 'ca-app-pub-9972694417557701/5996294561'},
    android: {interstitial: 'ca-app-pub-9972694417557701/5175709476'}
  };
  let admobReady = null;
  function admobUnits(){ return ADMOB_UNITS[cap.getPlatform()] || ADMOB_UNITS.android; }
  function admobInit(){
    // À la première pub seulement : consentement RGPD, puis autorisation de suivi sur iPhone.
    if(!admobReady) admobReady = (async () => {
      // pubs « tout public » seulement : le jeu est joué par des ados et des familles (même réglage dans la console AdMob)
      await AdMob.initialize({initializeForTesting: config.admobTesting, maxAdContentRating: 'General'});
      try{
        const info = await AdMob.requestConsentInfo();
        if(info && info.isConsentFormAvailable && info.status === 'REQUIRED') await AdMob.showConsentForm();
      }catch(e){ console.warn('[ADS] consentement', e); }
      try{ if(cap.getPlatform() === 'ios') await AdMob.requestTrackingAuthorization(); }catch(e){}
    })();
    return admobReady;
  }
  // Résolue au premier des événements cités (ou au bout de 90 s, pour ne jamais bloquer le jeu).
  function admobOnce(names){
    return new Promise(resolve => {
      const handles = [];
      const done = v => { handles.forEach(h => { try{ h && h.remove && h.remove(); }catch(e){} }); resolve(v); };
      names.forEach(n => Promise.resolve(AdMob.addListener(n, () => done(n))).then(h => handles.push(h)));
      setTimeout(() => done('timeout'), 90000);
    });
  }
  // L'interstitiel est chargé à l'avance, pendant les morceaux qui précèdent : le charger au moment du clic
  // ferait attendre le joueur devant un écran figé. S'il n'est pas prêt à temps, on n'en montre pas.
  let interReady = null;
  const admob = {
    preload(){
      if(!interReady) interReady = (async () => {
        await admobInit();
        await AdMob.prepareInterstitial({adId: admobUnits().interstitial, isTesting: config.admobTesting});
        return true;
      })().catch(e => { console.warn('[ADS] interstitiel non chargé', e); interReady = null; return false; });
      return interReady;
    },
    async interstitial(){
      const ready = await Promise.race([admob.preload(), new Promise(r => setTimeout(() => r(false), 1200))]);
      if(!ready) return {completed: false, notShown: true};
      interReady = null;
      const closed = admobOnce(['interstitialAdDismissed', 'interstitialAdFailedToShow']);
      await AdMob.showInterstitial();
      await closed;
      return {completed: true};
    }
  };
  if(AdMob) config.provider = 'admob';

  const providers = {
    admob,
    // pub maison (promo.js) : nos autres jeux, gratuitement, aux mêmes moments qu'un interstitiel
    house: {interstitial(){ return window.BSPromo ? BSPromo.show() : Promise.resolve({completed: false, notShown: true}); }},
    fake: {
      interstitial(){
        return fakeAd({kind: tr('Interstitiel'), text: tr('Encart plein écran entre deux morceaux.'),
          seconds: config.fakeInterstitialSeconds, skipAfter: config.fakeInterstitialSkipAfter});
      }
    }
  };

  async function run(kind, arg, provider){
    if(showing) return {completed: false};
    showing = true;
    try{ BSAds.onStart && BSAds.onStart(kind); }catch(e){}
    let result = {completed: false};
    try{
      result = await providers[provider || config.provider][kind](arg);
    }catch(e){
      console.warn('[ADS] échec', kind, e);
    }
    if(!result.notShown) markAdShown();
    showing = false;
    try{ BSAds.onEnd && BSAds.onEnd(kind); }catch(e){}
    return result;
  }

  const BSAds = {
    config,
    onStart: null,  // le jeu y coupe le son
    onEnd: null,    // et l'y remet

    /* Appelé quand le joueur quitte l'écran de fin d'un morceau (ou les records d'une Cassette de la mort).
       N'affiche une pub que si toutes les règles de fréquence sont respectées. */
    async maybeInterstitial(ctx){
      if(!config.enabled) return false;
      if(window.BSPremium && BSPremium.isOn()) return false; // Premium : plus aucune pub
      runsSinceAd++;
      const early = (ctx && ctx.trackIndex || 0) < config.freeTracks;
      // dans l'application, la prochaine pub se charge pendant le morceau qui précède
      if(config.provider === 'admob' && !early && runsSinceAd >= config.interstitialEveryRuns - 1) admob.preload();
      if(!config.debug){
        if(early) return false;
        if(runsSinceAd < config.interstitialEveryRuns) return false;
        if((now() - readLastAd())/1000 < config.minSecondsBetweenAds) return false;
      }
      // une partie de ces pubs fait connaître nos autres jeux plutôt qu'un annonceur
      const house = !!(window.BSPromo && BSPromo.available().length && Math.random() < BSPromo.SHARE);
      const r = await run('interstitial', null, house ? 'house' : null);
      return !r.notShown;
    }
  };

  window.BSAds = BSAds;
})();
