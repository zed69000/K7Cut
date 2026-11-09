/* Serveur des records de BEAT SPLASH, sur Cloudflare (comme Cosmos). Les fichiers de www/ sont servis tels quels ;
   seul /api arrive ici.
   - Board (un Durable Object, SQLite) garde le classement de la cassette de la mort : le meilleur score de chaque joueur
     et de chaque saison, avec son pseudo et le nombre de morceaux tenus.
   - Une saison change seulement quand un réglage change vraiment les scores possibles (réglage classement.saison du GDD) :
     les scores restent comparables, et la saison précédente reste consultable. */
import { DurableObject } from "cloudflare:workers";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
      return env.BOARD.get(env.BOARD.idFromName("death")).fetch(request);
    }
    return env.ASSETS.fetch(request);
  }
};

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });

// pseudos refusés : liens et mots grossiers ou injurieux courants (français, anglais), même écrits avec des chiffres ou des accents
const BAD = /(https?|www\.|\.com|\.fr|\.net|discord|putain|salope|encul|connard|connasse|batard|niquet|tamere|bougnoul|youpin|negre|fuck|bitch|whore|slut|nigg|faggot|hitler|nazi|porn|penis)/;
function cleanName(raw, id) {
  let name = String(raw || "").replace(/[\u0000-\u001f<>&"]/g, "").trim().slice(0, 14);
  const flat = name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/0/g, "o").replace(/1|!/g, "i").replace(/3/g, "e").replace(/4|@/g, "a").replace(/5|\$/g, "s").replace(/7/g, "t").replace(/[^a-z.]/g, "");
  if (!name || /^(moi|me|yo|ich|eu|我|わたし|나)$/i.test(name) || BAD.test(flat)) name = `joueur${id.slice(0, 4)}`;
  return name;
}
const seasonOf = v => Math.max(1, Math.min(999, Math.round(Number(v) || 1)));

export class Board extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const sql = ctx.storage.sql;
    sql.exec("CREATE TABLE IF NOT EXISTS death (id TEXT PRIMARY KEY, name TEXT NOT NULL, score INTEGER NOT NULL, songs INTEGER NOT NULL, seen INTEGER NOT NULL)");
    // le pays du joueur (pour son petit drapeau), ajouté après coup aux classements déjà commencés
    try { sql.exec("ALTER TABLE death ADD COLUMN cc TEXT"); } catch (e) {}
    // les saisons : le classement d'avant les saisons devient la saison 1
    sql.exec("CREATE TABLE IF NOT EXISTS board (id TEXT NOT NULL, season INTEGER NOT NULL, name TEXT NOT NULL, score INTEGER NOT NULL, songs INTEGER NOT NULL, seen INTEGER NOT NULL, cc TEXT, PRIMARY KEY (id, season))");
    if (!sql.exec("SELECT COUNT(*) AS n FROM board").toArray()[0].n) sql.exec("INSERT OR IGNORE INTO board (id, season, name, score, songs, seen, cc) SELECT id, 1, name, score, songs, seen, cc FROM death");
  }

  async fetch(request) {
    try { return await this.route(request); } catch (e) { return json({ error: String(e && e.message || e) }, 500); }
  }

  async route(request) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/score") {
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: "json" }, 400); }
      const id = String(body.id || "");
      if (!/^[a-z0-9]{16,40}$/.test(id)) return json({ error: "id" }, 400);
      const name = cleanName(body.name, id), season = seasonOf(body.season);
      // un morceau rapporte au plus quelques centaines de milliers de points : au-delà, c'est trafiqué
      const songs = Math.max(0, Math.min(500, Math.round(Number(body.songs) || 0)));
      const score = Math.max(0, Math.min(800000 * (songs + 1), Math.round(Number(body.score) || 0)));
      // le pays : celui envoyé avec le score s'il y en a un, sinon celui que Cloudflare voit (adresse de connexion)
      const cc = [body.cc, request.cf && request.cf.country].map(v => String(v || "").toUpperCase()).find(v => /^[A-Z]{2}$/.test(v) && v !== "XX" && v !== "T1") || null;
      const old = this.ctx.storage.sql.exec("SELECT score, songs FROM board WHERE id = ? AND season = ?", id, season).toArray()[0];
      const best = old && old.score >= score ? old : { score, songs };
      this.ctx.storage.sql.exec("INSERT INTO board (id, season, name, score, songs, seen, cc) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id, season) DO UPDATE SET name = excluded.name, score = excluded.score, songs = excluded.songs, seen = excluded.seen, cc = COALESCE(excluded.cc, board.cc)",
        id, season, name, best.score, best.songs, Date.now(), cc);
      // le pseudo change aussi dans les autres saisons du joueur
      this.ctx.storage.sql.exec("UPDATE board SET name = ? WHERE id = ?", name, id);
      return json(this.rank(id, season));
    }
    if (url.pathname === "/api/top") return json(this.rank(url.searchParams.get("id") || "", seasonOf(url.searchParams.get("season"))));
    return json({ error: "route" }, 404);
  }

  /* Le haut du classement d'une saison, et le joueur avec ses voisins. Ceux qui n'ont encore rien marqué n'y figurent pas. */
  rank(id, season) {
    const rows = this.ctx.storage.sql.exec("SELECT id, name, score, songs, cc FROM board WHERE season = ? AND score > 0 ORDER BY score DESC, name ASC", season).toArray();
    const list = rows.map((r, i) => ({ r: i + 1, n: r.name, s: r.score, k: r.songs, ...(r.cc ? { c: r.cc } : {}), ...(r.id === id ? { me: 1 } : {}) }));
    const at = list.findIndex(r => r.me);
    const prev = season > 1 ? this.ctx.storage.sql.exec("SELECT COUNT(*) AS n FROM board WHERE season = ? AND score > 0", season - 1).toArray()[0].n : 0;
    return {
      season,
      previous: prev,
      total: list.length,
      me: at >= 0 ? at + 1 : null,
      top: list.slice(0, 100),
      around: at >= 0 ? list.slice(Math.max(0, at - 3), at + 4) : []
    };
  }
}
