// 获取视频详情数据
(async () => {
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    // 首先进去预告片详情页面
    const trailerDetailBaseLink = `https://movie.douban.com/subject/`
    const trailerId = '34884712'
    console.log('开始访问', trailerDetailBaseLink + trailerId);
    page.goto(trailerDetailBaseLink + trailerId)
    
    await page.waitForSelector('.related-pic-video')

    const detailLink = await page.evaluate(()=>{
        const $ = window.$
        const $tarilerVideo = $('.related-pic-video')
        if($tarilerVideo && $tarilerVideo.length > 0) {
            const detailHref = $tarilerVideo.attr('href')
            return detailHref
        }
        return ''
    })

    console.log('获取到预告片视频地址：', detailLink)

    page.goto(detailLink)

    await sleep(1000)

    const videoLink = await page.evaluate(() => {
        const $ = window.$
        const $video = $('source')
        if($video && $video.length > 0) {
            const video = $video.attr('src')
            return video
        }
        return ''
    })

    // console.log('获取视频地址:', videoLink);
    browser.close()
    process.send(videoLink)
    // browser.close()
    
    function sleep (time) {
        return new Promise((reslove) => {
            setTimeout(reslove, time)
        })
    }
})()
