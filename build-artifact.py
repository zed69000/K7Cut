# Assemble la page autonome (un seul fichier) publiée sur claude.ai à partir de www/
import pathlib
w = pathlib.Path(__file__).parent / 'www'
css = (w/'css/style.css').read_text(); game = (w/'js/voice.js').read_text() + '\n' + (w/'js/game.js').read_text(); main = (w/'js/main.js').read_text()
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
