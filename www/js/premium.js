/* ===== BEAT SPLASH PREMIUM (même système que Date Gravity, premium.js) =====
   Un achat unique qui retire toutes les pubs. Il ne change rien d'autre : ni le score, ni le classement.

     BSPremium.isOn()     -> true si le joueur a le Premium
     BSPremium.price()    -> le prix à afficher, dans la langue du joueur
     BSPremium.buy()      -> Promise<boolean>, true si l'achat a abouti
     BSPremium.restore()  -> Promise<boolean>, true si un achat a été retrouvé (bouton exigé par Apple)
     BSPremium.onChange   -> rappel quand l'état change

   Deux magasins :
     - dans l'application : le vrai achat Google Play / App Store (plugin @capgo/native-purchases).
       Le produit PRODUCT_ID doit exister en « produit intégré » (non consommable) dans la Play Console
       et dans App Store Connect. Le prix affiché est celui du magasin, dans la monnaie du joueur.
     - sur le site : aucun paiement possible. En version de test (BS_TEST_BUILD) une fenêtre simule
       l'achat pour juger le parcours ; sinon le bouton invite à passer par l'application.
   L'achat n'est jamais retiré tout seul : « Restaurer mes achats » le retrouve après une réinstallation
   ou un « Recommencer depuis le début ».
*/
(function(){
  const PRODUCT_ID="com.zed69000.beatsplash.premium";
  const PRICE_EUR=2.99;          // prix affiché tant que le magasin n'a pas répondu
  const PRICE_KEY="bs_premium_price";
  const cap=window.Capacitor;
  const IAP=cap&&cap.isNativePlatform&&cap.isNativePlatform()&&cap.Plugins?cap.Plugins.NativePurchases:null;
  const TEST_PURCHASES=!IAP&&!!window.BS_TEST_BUILD;
  const KEY="bs_premium";

  function isOn(){try{return localStorage.getItem(KEY)==="1";}catch(e){return false;}}
  function setOn(v){
    try{if(v)localStorage.setItem(KEY,"1");else localStorage.removeItem(KEY);}catch(e){}
    apply();
    try{BSPremium.onChange&&BSPremium.onChange(isOn());}catch(e){}
  }
  function apply(){if(document.body)document.body.classList.toggle("premium",isOn());}

  /* Fenêtre d'achat de test. Résout true si le joueur « achète ». */
  function fakeCheckout(){
    return new Promise(resolve=>{
      const ov=document.createElement("div");
      ov.setAttribute("role","dialog");
      ov.setAttribute("aria-modal","true");
      ov.style.cssText="position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;padding:calc(18px + var(--sat,0px)) 18px calc(18px + var(--sab,0px));background:rgba(28,27,25,.82);font-family:Rubik,Arial,sans-serif;color:#1c1b19";
      ov.innerHTML='<div style="width:min(92vw,340px);padding:20px;border-radius:14px;background:#efe5cf;border:4px solid #1c1b19;box-shadow:0 6px 0 #1c1b19;text-align:center">'+
        '<div style="font-size:11px;font-weight:800;letter-spacing:.08em;opacity:.75">ACHAT DE TEST · AUCUN PAIEMENT RÉEL</div>'+
        '<div style="margin:14px 0 4px;font:900 22px/1.1 Rubik,Arial,sans-serif;text-transform:uppercase">BEAT SPLASH Premium</div>'+
        '<div style="font-size:13px;opacity:.75">'+PRODUCT_ID+'</div>'+
        '<div style="margin:14px 0;font:900 30px/1 Rubik,Arial,sans-serif;color:#e8344f">'+price()+'</div>'+
        '<button type="button" data-ok style="display:block;width:100%;padding:13px;border:3px solid #1c1b19;border-radius:999px;background:#ffd23f;color:#1c1b19;font:900 15px/1 Rubik,Arial,sans-serif;cursor:pointer">Acheter (test)</button>'+
        '<button type="button" data-no style="display:block;width:100%;margin-top:8px;padding:11px;border:0;border-radius:999px;background:#1c1b19;color:#fff;font:800 14px/1 Rubik,Arial,sans-serif;cursor:pointer">Annuler</button></div>';
      const done=v=>{ov.remove();resolve(v);};
      ov.querySelector("[data-ok]").onclick=()=>done(true);
      ov.querySelector("[data-no]").onclick=()=>done(false);
      document.body.appendChild(ov);
    });
  }

  function eurPrice(){
    try{return new Intl.NumberFormat((window.BSi18n&&BSi18n.lang)||"fr",{style:"currency",currency:"EUR"}).format(PRICE_EUR);}
    catch(e){return PRICE_EUR.toFixed(2).replace(".",",")+" €";}
  }
  // Google Play renvoie purchaseState "1" pour un achat payé ("2" = paiement en attente) ; l'App Store ne le renseigne pas.
  const paid=t=>!!t&&t.productIdentifier===PRODUCT_ID&&(t.purchaseState==null||String(t.purchaseState)==="1");

  const nativeStore={
    price(){try{return localStorage.getItem(PRICE_KEY)||eurPrice();}catch(e){return eurPrice();}},
    // le prix local est demandé au magasin une fois au lancement, puis gardé pour l'affichage suivant
    async loadPrice(){
      const r=await IAP.getProducts({productIdentifiers:[PRODUCT_ID],productType:"inapp"});
      const p=r&&r.products&&r.products[0];
      if(p&&p.priceString){
        try{localStorage.setItem(PRICE_KEY,p.priceString);}catch(e){}
        try{BSPremium.onChange&&BSPremium.onChange(isOn());}catch(e){}
      }
    },
    async buy(){
      try{
        return paid(await IAP.purchaseProduct({productIdentifier:PRODUCT_ID,productType:"inapp"}));
      }catch(e){
        // achat annulé, ou déjà possédé (Google répond « item already owned ») : on vérifie ce que le magasin connaît
        console.warn("[PREMIUM] achat",e);
        return nativeStore.restore();
      }
    },
    async restore(){
      const r=await IAP.getPurchases({productType:"inapp"});
      return !!(r&&r.purchases&&r.purchases.some(paid));
    }
  };
  const webStore={
    price:eurPrice,
    buy(){return TEST_PURCHASES?fakeCheckout():Promise.resolve(false);},
    restore(){return Promise.resolve(false);} // un achat de test ne laisse aucune trace à retrouver
  };
  const store=IAP?nativeStore:webStore;
  function price(){return store.price();}

  const BSPremium={
    PRODUCT_ID,
    onChange:null,
    isOn,
    price,
    canBuy:!!IAP||TEST_PURCHASES,  // false sur le site public : le Premium s'achète dans l'application
    async buy(){
      if(isOn())return true;
      let ok=false;
      try{ok=!!(await store.buy());}catch(e){console.warn("[PREMIUM] achat",e);}
      if(ok)setOn(true);
      return ok;
    },
    async restore(){
      let ok=false;
      try{ok=!!(await store.restore());}catch(e){console.warn("[PREMIUM] restauration",e);}
      if(ok)setOn(true);
      return ok||isOn();
    },
    // retire le Premium de ce téléphone ; un vrai achat revient avec « Restaurer mes achats »
    reset(){setOn(false);}
  };
  window.BSPremium=BSPremium;
  if(IAP)nativeStore.loadPrice().catch(e=>console.warn("[PREMIUM] prix",e));
  if(document.body)apply();else document.addEventListener("DOMContentLoaded",apply);
})();
