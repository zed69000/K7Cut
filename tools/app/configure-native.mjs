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
//   - icône : tools/app/android-res (dessinée par le jeu, voir tests/store_art.py).
import { cpSync, readFileSync, writeFileSync } from "node:fs";

const m = readFileSync("www/js/game.js", "utf8").match(/const VERSION = '(\d+)\.(\d+)\.(\d+)'/);
if (!m) throw new Error("www/js/game.js : VERSION 'a.b.c' introuvable");
const [major, minor, patch] = m.slice(1).map(Number);
if (minor > 99 || patch > 99) throw new Error("VERSION : b et c doivent rester sous 100");
const VERSION = major + "." + minor + "." + patch;
const BUILD = major * 10000 + minor * 100 + patch;

function edit(path, fn) {
  const before = readFileSync(path, "utf8");
  const after = fn(before);
  if (after !== before) writeFileSync(path, after);
}

edit("android/app/src/main/AndroidManifest.xml", s => s.includes("android:screenOrientation") ? s
  : s.replace('android:name=".MainActivity"', 'android:name=".MainActivity"\n            android:screenOrientation="portrait"'));
console.log("AndroidManifest.xml prêt : portrait");

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
