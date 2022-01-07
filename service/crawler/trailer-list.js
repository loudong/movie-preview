// 获取预告片列表
(async () => {
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    console.log('访问');
    page.goto('https://movie.douban.com/explore#!type=movie')
    await sleep(2000)

    await page.waitForSelector('.more')
    console.log('more ready');

    for(let i = 0; i< 2; i++) {
        page.click('.more')
        console.log('more点击' + i);
        await sleep(1000)
    }

    const result = await page.evaluate(() => {
        const $ = window.$
        const list = $('.list-wp a')
        const arr = []
        list.each((index, item) => {
            const it = $(item)
            const $img = it.find('img')
            const id = it.find('div').data('id')
            const name = $img.attr('alt')
            const image = $img.attr('src')
            const $rate = it.find('strong')
            const rate = $rate.text()
            if(id) {
                arr.push({
                    name,
                    id,
                    image,
                    rate,
                })
            }
            
        })
        return arr
    })

    // console.log('res', result);
    process.send(result)
    browser.close()
    function sleep(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
        })
    }
})()




