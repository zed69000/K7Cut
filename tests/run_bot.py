import asyncio, sys, json
from playwright.async_api import async_playwright
TRACK=int(sys.argv[1]); SIG=float(sys.argv[2]); MODE=sys.argv[3]; DIFF=int(sys.argv[4])
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']); pg=await b.new_page(viewport={'width':390,'height':780}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route('**fonts.g**', lambda r: r.abort())
        await pg.add_init_script(path='tests/bot.js')
        await pg.goto('http://localhost:8768/index.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(500)
        await pg.evaluate(f"window.__k7.start({TRACK}, {DIFF}); window.__bot({SIG}, '{MODE}')")
        for i in range(400):
            await pg.wait_for_timeout(1000)
            st=await pg.evaluate("window.__k7.state")
            if st!='play': break
        res=await pg.evaluate("({state: window.__k7.state, stats: window.__k7.stats, rep: window.__rep})")
        name=['Robots','Lune','Racines','Collines','Autoroute','Garage'][TRACK]
        print(name, MODE, 'diff', DIFF, json.dumps(res, ensure_ascii=False), 'ERR', errs[:2]); await b.close()
asyncio.run(main())
