/* ===== BEAT SPLASH : traductions (même système que Date Gravity) =====
   Le français est la langue du code : la clé d'un texte, c'est le texte français lui-même.

     tx("Il te faut {n} disques", {n: 3})
       -> la phrase dans la langue du joueur, ou la phrase française si la traduction manque.

   Une langue = un fichier js/lang/<code>.js qui appelle BSi18n.add("<code>", { "texte français": "traduction", ... }).
   Seul le fichier de la langue choisie est chargé. Ajouter une langue : créer son fichier et l'inscrire dans LANGS.

   Choix de la langue : ?lang=xx dans l'adresse, sinon le réglage du joueur (réglages),
   sinon la langue du téléphone, sinon l'anglais.
   Le labo (outil de choix des morceaux) reste en français : les joueurs ne le voient pas.
*/
(function(){
  const LANGS = {fr: 'Français', en: 'English', es: 'Español', de: 'Deutsch', pt: 'Português', zh: '中文', ja: '日本語', ko: '한국어'};
  const KEY = 'bs_lang';
  const tables = {};
  const missing = new Set(); // clés demandées sans traduction : BSi18n.missing, pour repérer les oublis

  function detect(){
    const asked = new URLSearchParams(location.search).get('lang');
    if(LANGS[asked]) return asked;
    try{ const saved = localStorage.getItem(KEY); if(LANGS[saved]) return saved; }catch(e){}
    const wanted = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for(const l of wanted){ const code = String(l).slice(0, 2).toLowerCase(); if(LANGS[code]) return code; }
    return 'en';
  }
  const lang = detect();

  function t(key, vars){
    if(!key) return '';
    let s = key;
    if(lang !== 'fr'){ const table = tables[lang]; if(table && Object.prototype.hasOwnProperty.call(table, key)) s = table[key]; else missing.add(key); }
    return vars ? s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? vars[k] : m) : s;
  }
  function setLang(code){
    if(!LANGS[code] || code === lang) return;
    try{ localStorage.setItem(KEY, code); }catch(e){}
    const url = new URL(location.href); url.searchParams.delete('lang'); location.replace(url.toString());
  }

  window.BSi18n = {lang, LANGS, t, setLang, missing, add(code, table){ tables[code] = Object.assign(tables[code] || {}, table); }};
  window.tx = t;
  document.documentElement.lang = lang;
  // chargé tout de suite, avant le jeu : les textes sont prêts dès leur premier affichage
  // la page autonome (build-artifact.py) embarque déjà toutes les langues
  if(lang !== 'fr' && !window.BS_LANGS_INLINE) document.write('<script src="js/lang/' + lang + '.js"><\/script>');
})();
