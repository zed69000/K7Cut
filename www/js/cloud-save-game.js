/* BEAT SPLASH : sauvegarde en ligne par Google Play Jeux (voir cloud-save.js).
   Voyagent les records, les cassettes, les réglages et les pochettes gagnées (k7cut.*), sauf le compteur
   d'offres de pub. Le Premium est rendu par Google Play lui-même. Les pochettes sont des images : si la
   sauvegarde devient trop lourde pour Google Play, elles restent sur le téléphone. */
CloudSave.setup({
  name: "beat-splash",
  keep: k => k.startsWith("k7cut.") && k !== "k7cut.offerN",
  optional: k => k.startsWith("k7cut.arts.") || k.startsWith("k7cut.art."),
  // disques gagnés d'abord, puis parties jouées
  progress: get => {
    const b = JSON.parse(get("k7cut.bests") || "{}") || {};
    let discs = 0;
    for (const k in b) discs += (b[k] && b[k].discs) || 0;
    return discs * 100000 + Math.min(99999, JSON.parse(get("k7cut.runs") || "0") || 0);
  },
  describe: get => {
    const b = JSON.parse(get("k7cut.bests") || "{}") || {};
    let discs = 0;
    for (const k in b) discs += (b[k] && b[k].discs) || 0;
    return discs + " disques";
  }
});
