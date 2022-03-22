const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    entry: './src/index.js',
    // output: {
    //     path: path.resolve(__dirname, '../dist'),
    // },
    plugins: [
        // 生成html，并把entry文件打包进去
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{ 
            // 用来处理jsx格式的内容，否则会报错
            test: /\.js|jsx$/, 
            exclude: /node_modules/, 
            loader: 'babel-loader',
            // options: { 
                //写在这里会导致配置文件过大，所以可以新建一个.babelrc.js
                //用这种方式就需要使用@babel/poly-fill
                //而babel/poly-fill又有些弊端，所以一般使用@babel/plugin-transfer-runtime
                // presets: [['@babel/preset-env',{
                //     // targets: {
                //     //     chrome: '>67',
                //     // },
                //     useBuiltIns: 'usage' 
                // }]], //es6转es5的模块
                // plugins: [['@babel/plugin-transform-runtime',{
                //     "absoluteRuntime": false,
                //     "corejs": 3,
                //     "helpers": true,
                //     "regenerator": true,
                //     "useESModules": false
                // }]]
            // }
        }]
    }
}