const child_process = require('child_process')
const path = require('path')
const scriptPath = path.resolve(__dirname, '../crawler/trailer-detail')
const child = child_process.fork(scriptPath)

child.on('message', (data) => {
    console.log('message', data);
})