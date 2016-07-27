var config = require('./webpack.config.js');
var webpack = require('webpack');
var libraryName = require('./package.json').name;

config.devtool = null;
 
// produce a minified library (cronstrue.min.js)
config.entry[libraryName + ".min"] = './lib/expressionDescriptor.ts';
config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
    })
];

module.exports = config; 