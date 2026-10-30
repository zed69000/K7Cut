# Journal des versions

## 0.13.0 — Nouveau menu « cassette mascotte »
- **La cassette devient une mascotte cartoon.** Ses bobines sont des yeux qui suivent le mouvement et clignent. Elle a des joues, un sourire avec la langue, des gants (un poing et un « peace » qui salue) et des baskets qui battent la mesure.
- Une cassette verrouillée dort : yeux fermés, cadenas, « zz ».
- Les cassettes voisines dépassent sur les côtés.
- **Nouveau mur street art clair** : giclées nettes rose, cyan et jaune avec coulures, trames de points, coups de pinceau noirs, couronnes et étoiles. De grosses giclées derrière la cassette pulsent sur le temps.
- **« TOUCHE ! » en gros graffiti jaune** sur une bande noire « POUR LANCER LA CASSETTE ». Sa taille s'ajuste pour ne jamais passer sous le badge.
- **Le reste du menu adopte le même style :**
  - badge jaune pour les disques, le talent et le titre ;
  - carte en papier déchiré avec le nom surligné au feutre jaune ;
  - bande jaune avec une couronne pour la difficulté et une tache rose pour le multiplicateur ;
  - boutons ronds cerclés de jaune ;
  - gros bouton JOUER rose avec une icône lecture.
- La cassette prend la place libre entre le titre et le bas, et tient sur les petits écrans.

## 0.12.0 — La fresque, une voix de combo, plus de chevauchements
- **Ta fresque street art.** Chaque geste réussi peint le mur au-dessus de la piste, de gauche à droite au fil du morceau :
  - une coupe = un trait de bombe dans le sens du geste ;
  - un tap = une tache de peinture ;
  - un maintien = un rouleau qui coule ;
  - un scratch = un tag ;
  - une note ramassée = une étoile.
  
  Plus le combo monte, plus les traits sont gros. Chaque palier de transe ajoute des couleurs, et un pochoir (étoile, couronne, cœur, éclair) tombe tous les 25 combos. Un raté laisse juste une coulure grise. À la fin, l'œuvre s'affiche avec son nom (« Robot nirvana »…), on peut la télécharger, et la dernière de chaque cassette est gardée.
- **La voix récompense le combo.** Elle chante tous les 10 de combo, et la phrase grandit : 1 note à 10, 2 à 20, 3 à 30 avec un chœur à la tierce, jusqu'à 5 notes avec la quinte, puis l'octave à 100. Les syllabes changent à chaque palier.
- **La voix prend la couleur du style** : écho dub en reggae, filtre téléphone et bégaiement en hip-hop, robot en French touch, chorus spatial en synthwave, saturation et octave grave en punk et métal.
- **Un vrai instrument par style pour la mélodie de tes coupes** : cloche en hip-hop, mélodica en reggae, supersaw en synthwave, talkbox en French touch, guitare en punk et métal, pluck en disco et DnB.
- **Fini les chevauchements.** Les formes sont plus compactes, il y a au moins 54 px entre deux croches, et jamais deux blocs couchés côte à côte. Le bot n'a trouvé aucun chevauchement sur les 8 cassettes en niveau Roi.
- **La bombe est retirée.**
- **Optimisation.** Ombres dures sans flou, nettement moins coûteuses sur mobile. Le geste est jugé à l'heure exacte du toucher, pas à l'image suivante, donc une image qui traîne ne te met plus « en retard ». La fresque coûte moins de 1 ms par coup de pinceau.

## 0.10.0 — La forme dit le geste, plus de vies
- **Chaque forme a son geste.** Bloc debout = glisser de bas en haut. Bloc couché = glisser de gauche à droite. Les chevrons rouges montrent le sens. Rond = un tap. Ruban = tenir. Zigzag = gratter.
- Le mauvais sens coupe quand même, mais compte au mieux « OK », avec « coupe vers le haut ↑ » ou « coupe vers la droite → » affiché.
- **Tutos plus clairs.** « FORME DEBOUT = GLISSE VERS LE HAUT », etc. Une grosse flèche et le doigt montrent le sens. Un geste dans le mauvais sens affiche « PAS DANS CE SENS ! » et on recommence. Un tuto par forme.
- **Sons plus doux.** Le scratch joue un petit « tchic » accordé à la musique au lieu du bruit. Le doigt maintenu joue une nappe douce lancée par ta voix au lieu du synthé criard.
- **Plus de vies ni de game over.** On joue toujours la face jusqu'au bout. Un pourcentage de super rythme s'affiche en direct, et la fin de face donne 0 à 3 disques selon ce pourcentage. Les seuils dépendent du niveau : Apprenti 70/85/95 %, Musicien 60/80/92 %, Virtuose 55/75/90 %, Roi 50/70/86 %.
- **Les disques ouvrent les cassettes** : 0, 2, 4, 6, 9, 12, 15, 18 disques. On compte le meilleur résultat par cassette, 3 disques maximum chacune. Le talent ♪ sert toujours aux titres.

## 0.9.0 — Gestes stricts + intro chantée
- **Taper = sauter, glisser = couper, point.** Un tap ne coupe plus jamais un bloc, un glissé ne fait plus jamais sauter. Le geste est jugé à l'instant où le doigt touche l'écran, sur le premier obstacle du bon type.
- Glisser près d'une bombe coupe le bloc en priorité au lieu de faire exploser la bombe.
- Un bloc ou un pic encore à jouer passe avant la note longue ou le scratch qui le suit (avant, la note longue « volait » le toucher).
- **Intro du menu chantée avec ta voix** : on touche l'écran, les 5 lettres K-7-C-U-T giclent une à une sur les syllabes, avec beat et crash. À chaque lancement, et rejouable depuis les réglages.
- Bot : nouveaux contrôles COUPE_SUR_TAP et SAUT_SUR_GLISSE. 0 sur les 8 cassettes (modes juste, faux, au hasard).

## 0.8.0
- Ta voix dans le jeu : les 7 syllabes chantées du mémo deviennent un instrument. Chaque coupe réussie chante la note de la mélodie, transposée automatiquement ; les appels « écoute », le compte à rebours et les paliers de transe (en chœur) chantent aussi
- Réglage « Mélodie : ta voix / synthé » dans l'engrenage

## 0.7.2
- Plus aucune devinette sur le geste : l'obstacle visé décide (bloc = coupe, pic = saut), seule la bombe exige un tap
- Les obstacles sont joués dans l'ordre, comme une partition : un geste un peu en retard ne vole plus l'obstacle suivant
- Bot de test ajouté (tests/) : 8 cassettes jouées en entier, bons et mauvais gestes, 0 coupe transformée en saut

## 0.7.1
- Obstacles rapprochés : c'est l'obstacle dans le rond qui décide de l'action. Seulement des blocs autour : tout geste coupe, dès le toucher. Seulement des sauts : tout geste fait sauter, même si le doigt bouge un peu. Bloc et saut mélangés : il faut un glissé franc pour couper

## 0.7.0
- Tutos en jeu : arrêt sur image quand l'obstacle arrive, projecteur, doigt animé qui montre le geste, on le fait sur le vrai écran et la partie repart
- Menu street art : mur en béton, affiches collées, coulures de bombe, tags, titre graffiti qui dégouline, cassettes en stickers, difficulté sur du scotch

## 0.6.0
- Menu cartoon animé : cassettes voisines visibles, glissé qui suit le doigt avec élan et ressort, bobines qui tournent, titre qui danse, notes qui s'envolent, cadenas sur les faces fermées
- Difficulté choisie avec deux flèches, bulle d'info, gros bouton JOUER qui pulse
- Réglages (son, calage, tutos, version) rangés dans un panneau derrière l'engrenage

## 0.5.0
- Menu : une seule cassette à l'écran, on glisse pour changer de face
- 4 difficultés (Apprenti, Musicien, Virtuose, Roi) qui multiplient le talent gagné ; titres de joueur jusqu'à « Roi du scratch et du rythme »
- Tutos interactifs à la première apparition de chaque geste (pause, démonstration, entraînement)
- Célébrations aux paliers de combo : mots et illustrations à l'encre en fond, public qui se lève, émotions du héros
- Musique : refrain AABA joué par le lead, nappes, filtre qui s'ouvre au fil des sections, coupure avant le refrain
- Correctif : deux notes longues collées ne se bloquent plus
- Numéro de version affiché dans le menu

## 0.4.0
- Style papier et encre, 8 cassettes, mode transe, son retravaillé, gestes fiabilisés

## 0.3.0
- Coupes plus fiables : latence audio compensée, glissés rapides reconnus, calage réglable

## 0.2.0
- Premier import : 4 cassettes, menu, 4 gestes
