const child_process = require('child_process')
const { resolve } = require('path')

const filePath = resolve(__dirname, '../crawler/trailer-list')
const child = child_process.fork(filePath)
child.on('message', (data) => {
    console.log('message', data);
})