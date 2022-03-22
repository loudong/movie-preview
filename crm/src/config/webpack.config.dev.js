const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
console.log(merge)
const config = {
    mode: 'development',
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        // contentBase: './dist'
    }
}

module.exports = merge(config, baseConfig) 