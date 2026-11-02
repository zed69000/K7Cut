# Assemble la page autonome (un seul fichier) publiée sur claude.ai à partir de www/
import pathlib
w = pathlib.Path(__file__).parent / 'www'
# toutes les langues sont embarquées : la page autonome ne peut pas charger js/lang/<code>.js à part
langs = '\n'.join(f.read_text(encoding='utf-8') for f in sorted((w/'js/lang').glob('*.js')))
css = (w/'css/style.css').read_text(); game = (w/'js/tuning.js').read_text(encoding='utf-8') + '\n' + 'window.BS_LANGS_INLINE = true;\n' + (w/'js/i18n.js').read_text(encoding='utf-8') + '\n' + langs + '\n' + (w/'js/voice.js').read_text() + '\n' + (w/'js/game.js').read_text(); main = (w/'js/main.js').read_text()
assert '</script' not in game + main
html = f'''<title>BEAT SPLASH</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Knewave&family=Permanent+Marker&family=Sedgwick+Ave+Display&family=Chakra+Petch:wght@400;600;700&display=swap">
<style>
{css}</style>
<div id="stage"></div>
<script>
{game}
</script>
<script>
{main}
</script>
'''
(pathlib.Path(__file__).parent / 'dist').mkdir(exist_ok=True)
(pathlib.Path(__file__).parent / 'dist/k7cut-artifact.html').write_text(html)
print('ok', len(html))
