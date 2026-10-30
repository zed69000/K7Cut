# Journal des versions

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
