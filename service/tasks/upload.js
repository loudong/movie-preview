const OSS = require('ali-oss')
const fs = require('fs');
const http = require('http');
const ossKey = require('../config')
const {
    Blob,
  } = require('buffer');
const { resolve } = require('path');
console.log(ossKey);
let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: ossKey.accessKeyId,
    accessKeySecret: ossKey.accessKeySecret,
    // bucket: 'trailer-info',
})

async function fetchList () {
    try{
        let result = await client.listBuckets();
        console.log(result);
    } catch (err) {
        console.log(err);
    } 
}

// fetchList()

async function upload () {
    try{
        const blob = new Blob(['https://vt1.doubanio.com/202201062203/2997d392c5c7d6be174ee05fcfb6e8b3/view/movie/M/402830204.mp4'])
        const bl = URL.createObjectURL(blob)
        const result = Buffer.from(bl)
        // const result = fs.createReadStream('https://vt1.doubanio.com/202201062203/2997d392c5c7d6be174ee05fcfb6e8b3/view/movie/M/402830204.mp4')
        // console.log(result);
        // const result = Buffer.from('https://vt1.doubanio.com/202201062203/2997d392c5c7d6be174ee05fcfb6e8b3/view/movie/M/402830204.mp4')
        client.useBucket('trailer-info');
        let results = await client.putStream('trailer.mp4', result)
        
        // http.get('http://vt1.doubanio.com/202201062203/2997d392c5c7d6be174ee05fcfb6e8b3/view/movie/M/402830204.mp4', (resp) => {
        //     let data = '';
            
        //     resp.on('data', (chunk) => {
        //         console.log('下载中...');
        //         data += chunk;
        //     });
            
        //     // The whole response has been received. Print out the result.
        //     resp.on('end', async () => {
        //         client.useBucket('trailer-info');
        //         let results = await client.putStream('trailer.mp4', new Buffer(data))
        //         console.log(results);
        //     });
        // })
        console.log(results);
    } catch (err) {
        console.log(err);
    }
}

upload()
