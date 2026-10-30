# Journal des versions

## 0.18.0 — Son plus pêchu, ronds-cœurs batteurs, phrases rythmiques, tutos repensés, toiles uniques
- **Apprenti par défaut** pour une première partie (le choix déjà enregistré d'un joueur est gardé).
- **Musique plus pêchue.** Le compresseur laisse passer les attaques, une saturation douce colle le tout, grosse caisse avec plus de corps et un clic, caisse claire plus épaisse, sous-basse sous les basses, toute la musique pompe sur la grosse caisse. Le premier couplet n'est plus étouffé (le filtre part de 2,6 kHz au lieu de 900 Hz et s'ouvre en 4 mesures).
- **La voix se mêle mieux.** Elle a son propre bus (grave coupé, présence, compression), elle entre sur un temps fort (1 ou 3), la musique se pousse et la mélodie de fond se tait pendant qu'elle chante, sa hauteur reste à moins d'une quinte de la voix naturelle, et les doublures n'arrivent qu'à partir de 20 de combo.
- **Les ronds-cœurs font la caisse claire.** Taper un rond-cœur joue le clap ou la caisse claire du style (plus un tom accordé), et le morceau laisse ce coup vide : si tu rates, il manque au groove. Dans les rythmes, ils tombent surtout sur les temps 2 et 4.
- **Motifs en phrases.** Chaque section est faite de phrases de 4 mesures A A A' B tirées d'une bibliothèque de rythmes (`RHY`) : on découvre un motif, on le rejoue, il varie, puis une mesure de relance (qui porte les notes tenues et scratchs). Les appels/réponses répètent le même motif.
- **Tutos repensés.** Ils s'ouvrent au début de la mesure qui précède la nouvelle forme (plus jamais au moment de la jouer) : la forme en grand, le doigt qui montre, on essaie sur place, puis « BRAVO ! Fais-le quand elle touche la ligne rouge » avec une flèche sur la tête de lecture. En Apprenti, pendant les 3 premières parties, le geste est écrit au-dessus de chaque forme qui arrive. Les tutos sont réaffichés une fois pour tout le monde.
- **Chaque toile est unique.** Une composition (nuée, spirale, vague, cœur, explosion, pluie, diagonale, constellation) et une palette (dont papier kraft et papier nuit) sont tirées à chaque partie, et la toile reçoit un titre (« Spirale hypnotique n°12 »). Elle est en grand en haut de la page de récompense, et la galerie garde les 3 dernières toiles de chaque cassette.

## 0.17.0 — Paliers de difficulté, son calé, personnage élastique, page de récompense
- **Progression en paliers.** Chaque morceau monte d'une marche puis souffle sur un palier : intro → couplet facile → couplet → pause → refrain → refrain plus dense → final. Chaque niveau a un plafond :

  | Niveau | Palier max | Écart minimal entre deux gestes |
  |---|---|---|
  | Apprenti | 1 | 0,55 s |
  | Musicien | 2 | 0,34 s |
  | Virtuose | 3 | 0,24 s |
  | Roi | 3 | 0,19 s |

  En Apprenti, il y a moins de notes tenues et de scratchs, on ne change de geste qu'avec le temps de réfléchir, et les fenêtres sont plus larges. Résultat : 35 à 61 gestes par minute au lieu de 50 à 108.
- **Tes coupes jouent la mélodie que le morceau te laisse.** La mélodie de fond se tait là où il y a un bloc. Ta note sort devant, avec une attaque nette, et la musique se pousse un instant pour la laisser passer.
- **Chaque geste réussi est salué par un petit coup de batterie bien calé**, différent selon le style (clap, rimshot ou caisse claire), avec une basse ronde sur l'accord en cours. Toutes les 8 parfaits, un scintillement de cymbale.
- **Tout est calé sur la grille du morceau :** la voix de combo démarre sur la croche, l'accord de transe sur le temps suivant, et le « blop » d'une note avalée sur le temps de la note. La musique est un peu plus basse pour laisser la place aux récompenses.
- **Le personnage ne saute plus.** Il s'étire dans le sens du glissé, ou gonfle et éclate avec des traits BD quand on tape : c'est lui qui donne le tempo. Les notes dorées sont avalées sans sauter.
- **Nouvelle page de récompense** (d'après la maquette) :
  - en haut, le titre, le nom de l'œuvre, le % qui défile et la toile en polaroïd ;
  - un bandeau « N DISQUES GAGNÉS » où les disques tombent un par un sur les temps, avec éclats, confettis et une note chantée ;
  - le score qui défile, le combo, le talent, la bande ralentie ou intacte ;
  - le nouveau titre, la nouvelle cassette et le record ;
  - les boutons REJOUER, GARDER MON ŒUVRE, CASSETTES et FACE SUIVANTE.

  Le tout est animé sur un petit air de fin tonique au tempo de la face (kick, clap, basse, accords), avec la foule qui saute.

## 0.16.0 — Un habillage par style de musique, retour direct aux cassettes
- **Chaque style a son univers en jeu** (d'après les maquettes) :
  - **Métal** : papier crème, pinceaux noir et rouge, éclairs, tête de mort, enceintes, chevrons rouges, bobines rouges, foule liserée de rouge.
  - **Punk** : rose fluo et vert acide, bouts de scotch, croix au feutre.
  - **Disco** : dégradé bleu-violet-rose, boule à facettes qui tourne et scintille sur le temps, rayons cyan et rose, foule néon, score en noir et blanc.
  - **Reggae** : papier jaune, soleil, palmiers, enceintes, guirlande d'ampoules qui clignote sur le temps, chevrons rouge-jaune-vert, vinyles rasta, score dans une tache jaune.
  - **Hip-hop** : mur de briques, couronne dorée, tag violet.
  - **Synthwave** : nuit violette étoilée, soleil couchant, grille, cyan et rose.
  - **French touch** : nuit, rayons dorés, pyramide de lumière.
  - **Drum'n'bass** : vert profond et traits vert acide.
  
  Les couleurs des chevrons, des bobines, de l'égaliseur, de la foule et du score suivent le style. Les textes restent lisibles sur les fonds sombres.
- **Plus de page d'accueil** : le jeu s'ouvre directement sur les cassettes. Le « TOUCHE ! » lance l'intro chantée, puis le titre K7 CUT s'affiche sur sa propre ligne. Le trophée de la galerie « Mes œuvres » est en haut à gauche.

## 0.15.0 — En jeu façon BD explosive
- **Nouveau fond** (d'après la maquette) : papier crème, grandes bandes de pinceau noires et rouges en diagonale, trames de points, giclées, étoiles, éclairs, traits de vitesse et confettis. Chaque cassette garde sa couleur d'accent.
- **Score et pourcentage dans des taches jaunes qui coulent**, avec de gros chiffres et des disques cerclés. Le bouton du haut devient un carré noir bordé de blanc.
- **Jugements en autocollants** : PARFAIT en jaune, RATÉ en rouge avec une éclaboussure qui coule, le reste en noir.
- **La scène :**
  - la roue est un jeton jaune cerclé d'encre, avec des traits de vitesse ;
  - les ronds à taper ont un cœur ;
  - les obstacles qui arrivent ont des traits d'action et un anneau en pointillés ;
  - la piste a des graduations jaunes et une tête de lecture rouge ;
  - les bobines sont des vinyles avec sillons et arcs de mouvement ;
  - l'égaliseur est noir, rouge et jaune ;
  - la foule est en contre-jour, avec des liserés de couleur et des mains « cornes » levées.
- **Les textes des tutos tiennent dans l'écran** : chaque ligne s'ajuste à la largeur du téléphone. Les grands messages et les jugements près des bords restent aussi visibles.

## 0.14.0 — Accueil, ralenti de bande, roue gourmande, toile vivante
- **Écran d'accueil** (d'après la maquette) :
  - le titre TOUCHÉ, avec le É en rouge, dont les lettres giclent sur ta voix ;
  - les plaques rivetées JOUER (lance directement ta cassette), NIVEAUX (la sélection) et OPTIONS ;
  - deux cassettes qui dansent sur scène, avec la piste, les bobines et la foule ;
  - un trophée qui ouvre **Mes œuvres**, la galerie de tes toiles, avec un point rouge quand il y en a une nouvelle.
- **Perdre le fil.** Après deux ratés d'affilée, la bande ralentit à ×0,78, et la musique descend un peu comme une vraie K7. Chaque geste réussi la relance peu à peu, et au bout de 10 elle repart à vitesse normale (« ÇA REPART ! »). Pendant le ralenti, les points sont divisés par deux et il n'y a pas de « parfait ». Le temps perdu s'affiche à la fin.
- **La petite roue avale les notes.** Sa bouche s'ouvre quand une note arrive, la note est aspirée, la roue mâche et gonfle. Elle grossit au fil des notes avalées.
- **La toile raconte ta partie :**
  - couleur = geste (coupe bleu-canard, tap orange, maintien violet, scratch magenta) ;
  - forme = timing (rond net = pile, jets à goutte = en avance, coulures = en retard) ;
  - taille = combo ;
  - zone de la toile = partie du morceau ;
  - salissures grises = ratés.
  
  L'œuvre finale est rejouée sur une grande feuille de papier ancien.

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
