# Captures d'écran pour la fiche Google Play (1080 x 1920), prises dans le vrai jeu.
#   python -m http.server 8770 --directory www   (dans un autre terminal)
#   python tests/store_shots.py
import asyncio, pathlib
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'store'
URL = 'http://127.0.0.1:8770/index.html'
TUTO = "['C','CV','CH','CD','J','H','S','O','W','D'].forEach(k => localStorage.setItem('k7cut.tuto3.' + k, 'true'));"

async def page(b):
    pg = await b.new_page(viewport={'width': 360, 'height': 640}, device_scale_factor=3)
    await pg.add_init_script(TUTO); await pg.add_init_script(path=str(ROOT / 'tests' / 'bot.js'))
    await pg.goto(URL); await pg.wait_for_function('window.__k7', timeout=60000)
    await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1500)
    return pg

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        pg = await page(b)
        await pg.screenshot(path=str(OUT / 'screen-1-accueil.png'))
        await pg.click('#k7hlvl'); await pg.wait_for_timeout(1200)
        await pg.screenshot(path=str(OUT / 'screen-2-cassettes.png'))
        # une partie jouée par le bot : capture en pleine transe, puis l'écran de fin
        await pg.evaluate("window.__k7.start(4, 1); window.__bot(0.03, 'right')")
        await pg.wait_for_timeout(52000); await pg.screenshot(path=str(OUT / 'screen-3-partie.png'))
        for _ in range(300):
            await pg.wait_for_timeout(1000)
            if await pg.evaluate("window.__k7.state") != 'play': break
        await pg.wait_for_timeout(9000); await pg.screenshot(path=str(OUT / 'screen-4-toile.png'))
        await b.close()
        print('captures écrites dans', OUT)

asyncio.run(main())
