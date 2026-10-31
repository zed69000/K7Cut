# Bot de test

Joue une cassette entière en envoyant de vrais gestes tactiles au jeu, avec une imprécision réglable.

```
cd www && python3 -m http.server 8768 &
python3 tests/run_bot.py <cassette 0-5> <imprécision en s, ex 0.04> <right|wrong|sloppy> <difficulté 0-3>
```

- `right` : le bon geste (glisser sur les blocs, taper sur les pics)
- `wrong` : le mauvais geste exprès (taper sur les blocs, glisser sur les pics) : doit marcher quand même
- `sloppy` : un geste au hasard, doigt qui bouge un peu

Le rapport signale tout saut déclenché par une coupe (`SAUT_SUR_COUPE`), tout pic non sauté alors que le geste était dans le temps (`PAS_DE_SAUT`) et tout obstacle laissé sans réponse.
