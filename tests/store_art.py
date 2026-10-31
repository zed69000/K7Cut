# Dessine l'icône Android et les images de la fiche Google Play à partir du jeu lui-même (window.__k7.art).
#   python -m http.server 8770 --directory www   (dans un autre terminal)
#   python tests/store_art.py
# Écrit tools/app/android-res/ (copié dans le projet Android au build) et store/ (icône 512, bannière 1024 x 500).
import asyncio, base64, io, pathlib
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
RES, STORE = ROOT / 'tools' / 'app' / 'android-res', ROOT / 'store'
DENS = {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        await pg.goto('http://127.0.0.1:8770/index.html'); await pg.wait_for_function('window.__k7', timeout=60000)
        await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1500)
        async def art(w, h, kind):
            url = await pg.evaluate(f"window.__k7.art({w}, {h}, '{kind}')")
            return Image.open(io.BytesIO(base64.b64decode(url.split(',')[1]))).convert('RGBA')
        STORE.mkdir(exist_ok=True)
        (await art(512, 512, 'icon')).convert('RGB').save(STORE / 'icon-512.png')
        (await art(1024, 500, 'banner')).convert('RGB').save(STORE / 'feature-1024x500.png')
        icon, fg = await art(768, 768, 'icon'), await art(864, 864, 'fg')
        for d, px in DENS.items():
            out = RES / f'mipmap-{d}'; out.mkdir(parents=True, exist_ok=True)
            sq = icon.resize((px, px), Image.LANCZOS); sq.save(out / 'ic_launcher.png')
            mask = Image.new('L', (px*4, px*4), 0); ImageDraw.Draw(mask).ellipse((0, 0, px*4 - 1, px*4 - 1), fill=255)
            rnd = Image.new('RGBA', (px, px)); rnd.paste(sq, (0, 0), mask.resize((px, px), Image.LANCZOS)); rnd.save(out / 'ic_launcher_round.png')
            fg.resize((px*9//4, px*9//4), Image.LANCZOS).save(out / 'ic_launcher_foreground.png')
        vals = RES / 'values'; vals.mkdir(parents=True, exist_ok=True)
        (vals / 'ic_launcher_background.xml').write_text('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#E4D5B3</color>\n</resources>\n', encoding='utf-8')
        await b.close()
        print('icônes et images écrites dans', RES, 'et', STORE)

asyncio.run(main())
