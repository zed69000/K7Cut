# BEAT SPLASH

Jeu de rythme mobile en cassettes : on coupe, saute, maintient et scratche sur une bande, et chaque coupe réussie joue la mélodie du morceau. 10 faces (de Robots de minuit à La Forge, de la French house au métal) à débloquer avec les disques gagnés.

Tout est en HTML, CSS et JavaScript, sans dépendance ni fichier audio : la musique est synthétisée en direct avec la Web Audio API.

## Arborescence

```
www/
  index.html      page du jeu
  css/style.css   colonne au format téléphone, écran de fin
  js/game.js      le jeu : cassettes, motifs, moteur audio, rendu, menu
  js/main.js      petite couche d'outils (canvas, boucle, sauvegarde, sons de menu, écran de fin)
capacitor.config.json
package.json
.github/workflows/pages.yml   publication automatique sur GitHub Pages
```

## Jouer en local

```
npx serve www
```

Puis ouvrir l'adresse affichée. Le son démarre au premier toucher (règle des navigateurs).

## Publier

- **GitHub Pages** : dans Settings > Pages du dépôt, choisir « GitHub Actions » comme source. Chaque push sur `main` publie le dossier `www`.
- **Cloudflare Pages** : dossier de sortie `www`, aucune commande de build.

## Application mobile (Capacitor)

```
npm install
npm run cap:android     # puis ouvrir le dossier android dans Android Studio, ou builder avec Codemagic
npm run cap:ios         # nécessite un Mac ou Codemagic
```

Les polices viennent de Google Fonts : hors ligne, le jeu bascule sur des polices de secours.

## Où modifier quoi

| Je veux… | Dans `www/js/game.js` |
| --- | --- |
| Ajouter ou régler une cassette | le tableau `SONGS` (tempo, gamme, accords, couleurs, sections, partition `song`), puis la liste `TRACKS` |
| Écrire la musique d'une cassette | `song` : motifs de batterie sur 16 pas (`x` coup, `o` fantôme), ligne de basse, accords, guitares, arpège, et la mélodie `hook` (4 mesures de 8 croches) que le joueur joue en coupant |
| Changer les sons | la batterie rendue au démarrage (`renderKit`), les instruments (`I`, `leadOf`, `pluckStr`, `pianoNote`) |
| Changer les rythmes des obstacles | la bibliothèque `RHY` (phrases de 4 mesures A A A' B) |
| Changer les fenêtres de timing | la fonction `grade` |
| Changer les prix de déblocage | `cost` de chaque cassette |
| Tester de nouvelles briques ou morceaux | le labo (`LAB`, Réglages → « LABO », ou `?labo` dans l'adresse) |

Les motifs d'obstacles sont générés à partir d'une graine propre à chaque cassette : ils sont identiques à chaque partie.

## Google Play

Appli Android `com.zed69000.beatsplash`, construite par Capacitor et envoyée par la chaîne commune [game-pipeline](https://github.com/zed69000/game-pipeline).

- **Version** : `VERSION` dans `www/js/game.js`. Le numéro Play (versionCode) en découle : a*10000 + b*100 + c (0.24.0 -> 2400), il doit augmenter à chaque envoi.
- **Build automatique** : `.github/workflows/play-release.yml` se lance quand la ligne `VERSION` change sur `main` (ou à la main dans Actions).
- **Réglages natifs** (portrait, version, signature, icône) : `tools/app/configure-native.mjs`, appliqué après `npx cap add android`.
- **Icône et images de la fiche** : dessinées par le jeu, `python tests/store_art.py` (serveur local sur le port 8770) écrit `tools/app/android-res/` et `store/`.
- **Clé d'envoi** : `beatsplash-upload.jks` et `keystore.properties` à la racine, jamais commités. À sauvegarder à part (gestionnaire de mots de passe).
