var webpack = require('webpack');
var path = require('path');
var libraryName = 'cronglish';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/lib/expressionDescriptor.ts',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    /*
     * Each loader needs an associated Regex test that goes through each
     * of the files you've included (or in this case, all files but the
     * ones in the excluded directories) and finds all files that pass
     * the test. Then it will apply the loader to that file. I haven't
     * installed ts-loader yet, but will do that shortly.
     */
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        
      }
    ]
  }
  
  
};

module.exports = config;
