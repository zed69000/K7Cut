# Génère www/css/menus.css : la direction artistique des menus (maquettes de novembre 2026).
# Les images (traînée cyan, étincelles, éclair, couronne, enceintes, nuages) sont des SVG intégrés en data URI.
#   python tools/menus_css.py
from pathlib import Path
from urllib.parse import quote

INK = '#15141a'; PINK = '#ff1f7a'; CYAN = '#22e3ff'; YEL = '#ffd60a'
def uri(svg): return 'url("data:image/svg+xml,%s")' % quote(svg.replace('\n', ''), safe='=:/,;()-.')

# traînée cyan derrière les titres, avec ses trames de points
pts = '8,80 62,62 40,52 122,46 104,30 192,40 232,16 252,34 334,22 314,42 414,32 364,60 404,70 330,78 350,96 262,90 240,112 200,96 120,106 136,90 48,98 72,86'
def halo(cx, cy, R, k):
    return ''.join(f'<circle cx="{x}" cy="{y}" r="{max(.4, k - ((x-cx)**2+(y-cy)**2)**.5/(R/2.2)):.1f}" fill="{CYAN}"/>'
                   for x in range(cx - R, cx + R, 9) for y in range(max(2, cy - R), min(140, cy + R), 9) if ((x-cx)**2+(y-cy)**2)**.5 < R)
BURST = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 140" preserveAspectRatio="none">{halo(380, 30, 58, 2.6)}{halo(30, 110, 46, 2.2)}<polygon points="{pts}" fill="{CYAN}"/></svg>'
RAYS = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g stroke="{YEL}" stroke-width="5" stroke-linecap="round"><path d="M8 32 3 21"/><path d="M17 27V10"/><path d="M26 31 35 21"/></g></svg>'
BOLT = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 -19 22 38"><path d="M2 -17 -9 2H-1L-4 17 9 -3H1L5 -17Z" fill="{YEL}" stroke="{INK}" stroke-width="1.8" stroke-linejoin="round"/></svg>'
CROWN = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 40"><g stroke="{YEL}" stroke-width="3" stroke-linecap="round"><path d="M30 6 33 1"/><path d="M36 10 42 7"/><path d="M38 17h5"/></g><path d="M4 36V16l9 8 9-14 9 14 9-8v20z" fill="{YEL}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/></svg>'
def SPK(m): return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160"><g transform="{m}"><path d="M2 22 96 4 116 158H2z" fill="#1d1c25" stroke="{PINK}" stroke-width="4" stroke-linejoin="round"/>'
                    f'<path d="M8 28 92 12 108 152H8z" fill="none" stroke="#2c2b36" stroke-width="2"/><circle cx="57" cy="104" r="33" fill="{YEL}" stroke="{INK}" stroke-width="3"/>'
                    f'<circle cx="57" cy="104" r="20" fill="#1d1c25"/><circle cx="57" cy="104" r="9" fill="{YEL}"/><circle cx="54" cy="46" r="13" fill="#2c2b36" stroke="#3d3c48" stroke-width="3"/></g></svg>')
SPKL = SPK(''); SPKR = SPK('translate(120 0) scale(-1 1)')
CLOUDS = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><path d="M0 62V40A22 22 0 0 1 42 30 26 26 0 0 1 92 27 23 23 0 0 1 137 31 26 26 0 0 1 186 33 16 16 0 0 1 200 40V62z" fill="#121118" stroke="{CYAN}" stroke-width="3"/></svg>'
# Noël (décembre, html.xmas) : neige posée sur les boutons, guirlande en haut des panneaux
SNOWCAP = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24" preserveAspectRatio="none"><path d="M2 16C6 6 18 3 32 6S58 2 74 5 104 1 122 5 152 2 168 5 192 4 198 15C198 19 190 18 186 17 182 24 174 24 172 17L128 17C124 22 116 22 114 17L58 17C54 23 44 23 42 17L8 18C4 18 2 18 2 16z" fill="#fff" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/></svg>')
GARL = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 30"><path d="M0 6Q30 20 60 6T120 6" fill="none" stroke="#0a1226" stroke-width="2.4"/>'
        + ''.join(f'<ellipse cx="{x}" cy="{y}" rx="4.2" ry="6" fill="{c}" stroke="{INK}" stroke-width="1.6"/>' for x, y, c in [(15, 18, '#e8343f'), (45, 18, '#ffd23f'), (75, 18, '#2fbf71'), (105, 18, '#29c4ff')]) + '</svg>')
HALF = 'radial-gradient(circle,rgba(255,255,255,.13) 1.3px,transparent 1.9px)'
PINKBG = f'linear-gradient(90deg,transparent 0 22%,{PINK} 42%),radial-gradient(circle,rgba(255,255,255,.3) 1.4px,transparent 2px) 0 0/8px 8px,{PINK}'
HEAD = 'italic 900 {} "Rubik",sans-serif'

css = Path(__file__).with_name('menus_css.template.css').read_text(encoding='utf-8')
for k, v in {'INK': INK, 'PINK': PINK, 'CYAN': CYAN, 'YEL': YEL, 'HALF': HALF, 'PINKBG': PINKBG,
             'BURST': uri(BURST), 'RAYS': uri(RAYS), 'BOLT': uri(BOLT), 'CROWN': uri(CROWN),
             'SPKL': uri(SPKL), 'SPKR': uri(SPKR), 'CLOUDS': uri(CLOUDS), 'SNOWCAP': uri(SNOWCAP), 'GARL': uri(GARL)}.items():
    css = css.replace('%' + k + '%', v)
out = Path(__file__).resolve().parents[1] / 'www' / 'css' / 'menus.css'
out.write_text(css, encoding='utf-8')
print(out, len(css))
