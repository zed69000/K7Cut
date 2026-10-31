# Vérifie chaque langue : captures de l'accueil, du menu, des réglages et d'une partie, et textes restés sans traduction.
#   python -m http.server 8770 --directory www   (dans un autre terminal)
#   python tests/lang_shots.py dossier_de_sortie [codes...]
import asyncio, json, pathlib, sys
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = pathlib.Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
CODES = sys.argv[2:] or ['en', 'es', 'de', 'pt', 'zh', 'ja', 'ko']
TUTO = "['C','CV','CH','CD','J','H','S','O','W','D'].forEach(k => localStorage.setItem('k7cut.tuto3.' + k, 'true'));"

async def one(b, code, sem):
    async with sem:
        pg = await b.new_page(viewport={'width': 360, 'height': 740}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.add_init_script(TUTO)
        await pg.goto(f'http://127.0.0.1:8770/index.html?lang={code}'); await pg.wait_for_function('window.__k7', timeout=60000)
        await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(3200)
        await pg.screenshot(path=str(OUT / f'{code}-1-accueil.png'))
        await pg.click('#k7hlvl'); await pg.wait_for_timeout(900); await pg.screenshot(path=str(OUT / f'{code}-2-menu.png'))
        await pg.click('#k7gear'); await pg.wait_for_timeout(700); await pg.screenshot(path=str(OUT / f'{code}-3-reglages.png'))
        await pg.evaluate("document.querySelector('.k7sheet').remove(); window.__k7.start(1, 0)"); await pg.wait_for_timeout(9000)
        await pg.screenshot(path=str(OUT / f'{code}-4-partie.png'))
        miss = await pg.evaluate("[...BSi18n.missing]")
        print(code, 'lang', await pg.evaluate("BSi18n.lang"), 'manquants', json.dumps(miss, ensure_ascii=False), 'ERR', errs[:2], flush=True)
        await pg.close()

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']); sem = asyncio.Semaphore(3)
        await asyncio.gather(*[one(b, c, sem) for c in CODES]); await b.close()

asyncio.run(main())
