// Réglages natifs Android, appliqués après `npx cap add android` :
//   node tools/app/configure-native.mjs
// Le projet android/ est régénéré à chaque build : ces réglages vivent donc ici, pas dans Android Studio.
// Chaque réglage vérifie s'il est déjà là : on peut relancer le script sans risque.
//
//   - écran : portrait uniquement ;
//   - version : lue dans www/js/game.js (VERSION 'a.b.c'). Le numéro interne, qui doit augmenter à chaque
//     envoi sur Google Play, en est déduit : a*10000 + b*100 + c (0.24.0 -> 2400) ;
//   - signature de release avec la clé d'envoi, décrite dans keystore.properties à la racine du dépôt
//     (jamais commité) ou dans les variables BS_STORE_FILE, BS_STORE_PASSWORD, BS_KEY_ALIAS, BS_KEY_PASSWORD.
//     Sans clé, l'App Bundle sort non signé : c'est le cas sur GitHub, où game-pipeline le signe ensuite ;
//   - icône : tools/app/android-res (dessinée par le jeu, voir tests/store_art.py) ;
//   - AdMob : identifiant d'application (les blocs d'annonces sont dans www/js/ads.js).
import { cpSync, readFileSync, writeFileSync } from "node:fs";

const m = readFileSync("www/js/game.js", "utf8").match(/const VERSION = '(\d+)\.(\d+)\.(\d+)'/);
if (!m) throw new Error("www/js/game.js : VERSION 'a.b.c' introuvable");
const [major, minor, patch] = m.slice(1).map(Number);
if (minor > 99 || patch > 99) throw new Error("VERSION : b et c doivent rester sous 100");
// les applications BEAT SPLASH du compte AdMob de Date Gravity (une par plateforme ; iOS servira à l'appli iPhone)
const ADMOB_APP_ID = {
  ios: "ca-app-pub-9972694417557701~2852798468",
  android: "ca-app-pub-9972694417557701~4952348195",
};
const VERSION = major + "." + minor + "." + patch;
const BUILD = major * 10000 + minor * 100 + patch;

function edit(path, fn) {
  const before = readFileSync(path, "utf8");
  const after = fn(before);
  if (after !== before) writeFileSync(path, after);
}

edit("android/app/src/main/AndroidManifest.xml", s => {
  if (!s.includes("com.google.android.gms.ads.APPLICATION_ID")) {
    const end = s.lastIndexOf("</application>");
    if (end < 0) throw new Error("AndroidManifest.xml inattendu");
    s = s.slice(0, end) + '    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="' + ADMOB_APP_ID.android + '"/>\n    ' + s.slice(end);
  }
  if (!s.includes("android:screenOrientation")) {
    s = s.replace('android:name=".MainActivity"', 'android:name=".MainActivity"\n            android:screenOrientation="portrait"');
  }
  return s;
});
console.log("AndroidManifest.xml prêt : AdMob, portrait");

edit("android/app/build.gradle", s => {
  s = s.replace(/versionCode \d+/, "versionCode " + BUILD).replace(/versionName "[^"]*"/, 'versionName "' + VERSION + '"');
  if (!s.includes("bsUploadKey")) {
    s = s.replace(/\nandroid \{\n/, `
android {
    // signature de release : clé d'envoi Google Play (keystore.properties à la racine du dépôt, ou variables BS_*)
    def bsUploadKey = new Properties()
    def bsKeyFile = rootProject.file("../keystore.properties")
    if (bsKeyFile.exists()) bsKeyFile.withInputStream { bsUploadKey.load(it) }
    def bsKey = { String name, String env -> bsUploadKey.getProperty(name) ?: System.getenv(env) }
    signingConfigs {
        release {
            if (bsKey("storeFile", "BS_STORE_FILE")) {
                def bsStore = bsKey("storeFile", "BS_STORE_FILE")
                storeFile new File(bsStore).isAbsolute() ? new File(bsStore) : rootProject.file("../" + bsStore)
                storePassword bsKey("storePassword", "BS_STORE_PASSWORD")
                keyAlias bsKey("keyAlias", "BS_KEY_ALIAS")
                keyPassword bsKey("keyPassword", "BS_KEY_PASSWORD")
            }
        }
    }
`);
    s = s.replace(/buildTypes \{\n(\s*)release \{\n/, (all, ind) => all + ind + "    if (signingConfigs.release.storeFile) signingConfig signingConfigs.release\n");
    if (!s.includes("bsUploadKey") || !s.includes("signingConfig signingConfigs.release")) throw new Error("android/app/build.gradle inattendu");
  }
  return s;
});
console.log("build.gradle prêt : version " + VERSION + " (" + BUILD + "), signature de release");

cpSync("tools/app/android-res", "android/app/src/main/res", { recursive: true });
console.log("icône Android en place");

// pas d'effet élastique d'Android quand on glisse le doigt : sinon toute l'interface bouge d'un bloc, comme sur des glissières
{
  const path = "android/app/src/main/java/com/zed69000/beatsplash/MainActivity.java";
  edit(path, s => {
    if (s.includes("OVER_SCROLL_NEVER")) return s;
    if (!/extends BridgeActivity\s*\{\s*\}/.test(s)) throw new Error("MainActivity.java inattendu : ajouter OVER_SCROLL_NEVER à la main");
    return `package com.zed69000.beatsplash;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView web = getBridge() != null ? getBridge().getWebView() : null;
        if (web != null) {
            web.setOverScrollMode(View.OVER_SCROLL_NEVER);
            web.setHorizontalScrollBarEnabled(false);
            web.setVerticalScrollBarEnabled(false);
        }
    }
}
`;
  });
  console.log("MainActivity prête : pas d'effet élastique");
}
