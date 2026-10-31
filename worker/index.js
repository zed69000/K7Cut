/* Serveur des records de BEAT SPLASH, sur Cloudflare (comme Cosmos). Les fichiers de www/ sont servis tels quels ;
   seul /api arrive ici.
   - Board (un Durable Object, SQLite) garde le classement de la cassette de la mort : le meilleur score de chaque joueur,
     avec son pseudo et le nombre de morceaux tenus. */
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

export class Board extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.storage.sql.exec("CREATE TABLE IF NOT EXISTS death (id TEXT PRIMARY KEY, name TEXT NOT NULL, score INTEGER NOT NULL, songs INTEGER NOT NULL, seen INTEGER NOT NULL)");
    // le pays du joueur (pour son petit drapeau), ajouté après coup aux classements déjà commencés
    try { ctx.storage.sql.exec("ALTER TABLE death ADD COLUMN cc TEXT"); } catch (e) {}
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
      let name = String(body.name || "").replace(/[\u0000-\u001f<>&"]/g, "").trim().slice(0, 14);
      if (!name || /^(moi|me|yo|ich|eu|我|わたし|나)$/i.test(name)) name = `joueur${id.slice(0, 4)}`;
      // un morceau rapporte au plus quelques centaines de milliers de points : au-delà, c'est trafiqué
      const songs = Math.max(0, Math.min(500, Math.round(Number(body.songs) || 0)));
      const score = Math.max(0, Math.min(800000 * (songs + 1), Math.round(Number(body.score) || 0)));
      // le pays : celui envoyé avec le score s'il y en a un, sinon celui que Cloudflare voit (adresse de connexion)
      const cc = [body.cc, request.cf && request.cf.country].map(v => String(v || "").toUpperCase()).find(v => /^[A-Z]{2}$/.test(v) && v !== "XX" && v !== "T1") || null;
      const old = this.ctx.storage.sql.exec("SELECT score, songs FROM death WHERE id = ?", id).toArray()[0];
      const best = old && old.score >= score ? old : { score, songs };
      this.ctx.storage.sql.exec("INSERT INTO death (id, name, score, songs, seen, cc) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET name = excluded.name, score = excluded.score, songs = excluded.songs, seen = excluded.seen, cc = COALESCE(excluded.cc, death.cc)", id, name, best.score, best.songs, Date.now(), cc);
      return json(this.rank(id));
    }
    if (url.pathname === "/api/top") return json(this.rank(url.searchParams.get("id") || ""));
    return json({ error: "route" }, 404);
  }

  /* Le haut du classement, et le joueur avec ses voisins. Ceux qui n'ont encore rien marqué n'y figurent pas. */
  rank(id) {
    const rows = this.ctx.storage.sql.exec("SELECT id, name, score, songs, cc FROM death WHERE score > 0 ORDER BY score DESC, name ASC").toArray();
    const list = rows.map((r, i) => ({ r: i + 1, n: r.name, s: r.score, k: r.songs, ...(r.cc ? { c: r.cc } : {}), ...(r.id === id ? { me: 1 } : {}) }));
    const at = list.findIndex(r => r.me);
    return {
      total: list.length,
      me: at >= 0 ? at + 1 : null,
      top: list.slice(0, 100),
      around: at >= 0 ? list.slice(Math.max(0, at - 3), at + 4) : []
    };
  }
}
