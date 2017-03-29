var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //webpack-dev-server入口目录设置
    devServer: {
        contentBase: "./src/html"
  },
    entry: {
        index: './src/router.js',
        vendors:['react','react-dom','react-router']
    },
    output: {
        path: './swzxClient/public/',
        publicPath: '/',
        filename: 'js/index.js'
    },
    module: {
    loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?-url') 
        }, { 
            test: /\.less$/, 
            loader: ExtractTextPlugin.extract('css!less') 
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot-loader/webpack', 'babel?presets[]=react,presets[]=es2015']
        }, { 
            test: /\.(png|jpg)$/, 
            loader: 'url?limit=8192&name=img/[name].[ext]' 
        }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors','js/vendors.js'),
    new ExtractTextPlugin("css/bundle.css"),
    // 压缩配置
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ]
};