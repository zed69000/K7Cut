# Liste les textes à traduire : chaque chaîne passée à tx(...) dans le jeu, plus les mots tirés au sort (célébrations, humeurs).
#   python tools/i18n_keys.py            -> tools/i18n_keys.json
#   python tools/i18n_keys.py --check    -> les clés qui manquent dans chaque www/js/lang/<code>.js
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / 'www' / 'js' / 'game.js').read_text(encoding='utf-8')
LIT = re.compile(r"'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\"")

def unq(x):
    return x.replace("\\'", "'").replace('\\"', '"')

keys = []
CODE = {'muted', 'voice'}  # clés de réglage, pas du texte
def add(k):
    if k and len(k) > 1 and k not in CODE and k not in keys:
        keys.append(k)

# tx( ... ) : toutes les chaînes du premier argument (ternaires compris), pas celles des variables
i = 0
while True:
    i = src.find('tx(', i)
    if i < 0:
        break
    if i > 0 and (src[i - 1].isalnum() or src[i - 1] in '_$.'):
        i += 3
        continue
    j, depth, k = i + 3, 1, i + 3
    first_end = None
    while depth:
        c = src[j]
        if c in '\'"':
            q = c; j += 1
            while src[j] != q:
                j += 2 if src[j] == '\\' else 1
        elif c in '([{':
            depth += 1
        elif c in ')]}':
            depth -= 1
        elif c == ',' and depth == 1 and first_end is None:
            first_end = j
        j += 1
    arg = src[k:first_end if first_end else j - 1]
    for m in LIT.finditer(arg):
        add(unq(m.group(1) if m.group(1) is not None else m.group(2)))
    i = j

# mots tirés au sort et humeurs, traduits par variable
for m in re.finditer(r"const WORDS = (\[\[.*?\]\])\.map", src):
    for w in LIT.finditer(m.group(1)):
        add(unq(w.group(1)))
for m in re.finditer(r"moods = (\[[^\]]*\])|const mood = tx\((\[[^\]]*\])", src):
    for w in LIT.finditer(m.group(1) or m.group(2)):
        add(unq(w.group(1)))

if '--check' in sys.argv:
    for f in sorted((ROOT / 'www' / 'js' / 'lang').glob('*.js')):
        t = f.read_text(encoding='utf-8')
        have = set(unq(a or b) for a, b in re.findall(r'^\s*"((?:[^"\\]|\\.)*)"\s*:|^\s*\'((?:[^\'\\]|\\.)*)\'\s*:', t, re.M))
        miss = [k for k in keys if k not in have]
        print(f.stem, len(keys) - len(miss), '/', len(keys), 'manquent :', miss[:8])
else:
    (ROOT / 'tools' / 'i18n_keys.json').write_text(json.dumps(keys, ensure_ascii=False, indent=1), encoding='utf-8')
    print(len(keys), 'clés écrites dans tools/i18n_keys.json')
