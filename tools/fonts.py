# Piste 132 : polices embarquées dans le jeu (www/fonts) au lieu de Google Fonts et de jsdelivr.
# On garde les jeux de caractères latin et latin étendu (français, espagnol, allemand, portugais) ;
# le chinois, le japonais et le coréen utilisent déjà les polices du téléphone.
import re, urllib.request
from pathlib import Path
W = Path(__file__).resolve().parents[1] / 'www'; F = W / 'fonts'; F.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
URL = 'https://fonts.googleapis.com/css2?family=Bungee&family=Knewave&family=Bowlby+One&family=Rubik:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600;1,700;1,800;1,900&display=swap'
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': UA}), timeout=30).read()
css = get(URL).decode()
blocks = re.findall(r'/\* ([a-z\-]+) \*/\s*(@font-face \{.*?\})', css, re.S)
out = ['/* Polices du jeu, embarquées (générées par tools/fonts.py : latin et latin étendu). */']
seen = {}
for subset, block in blocks:
    if subset not in ('latin', 'latin-ext'): continue
    fam = re.search(r"font-family: '([^']+)'", block).group(1)
    style = re.search(r'font-style: (\w+)', block).group(1)
    url = re.search(r'url\((https://[^)]+\.woff2)\)', block).group(1)
    name = f"{fam.replace(' ', '')}-{style}-{subset}.woff2"
    if url not in seen:
        (F / name).write_bytes(get(url)); seen[url] = name
    out.append(block.replace(url, '../fonts/' + seen[url]))
(W / 'css' / 'fonts.css').write_text('\n'.join(out) + '\n', encoding='utf-8')
(F / 'TwemojiCountryFlags.woff2').write_bytes(get('https://cdn.jsdelivr.net/npm/country-flag-emoji-polyfill@0.1.8/dist/TwemojiCountryFlags.woff2'))
print(len(out) - 1, 'blocs', sorted(set(seen.values())), sum((F / n).stat().st_size for n in set(seen.values())) // 1024, 'Ko')
