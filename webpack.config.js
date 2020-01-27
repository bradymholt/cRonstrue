var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var libraryName = require("./package.json").name;
var withLocalesSuffix = "-i18n";

module.exports = {
  mode: "production",
  entry: {
    [libraryName]: "./src/cronstrue.ts",
    [libraryName + ".min"]: "./src/cronstrue.ts",
    [libraryName + withLocalesSuffix]: "./src/cronstrue-i18n.ts",
    [libraryName + withLocalesSuffix + ".min"]: "./src/cronstrue-i18n.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    // Workaround for webpack 4 umd bug (Ref: https://github.com/webpack/webpack/issues/6522)
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    /*
         * Each loader needs an associated Regex test that goes through each
         * of the files you've included (or in this case, all files but the
         * ones in the excluded directories) and finds all files that pass
         * the test. Then it will apply the loader to that file. I haven't
         * installed ts-loader yet, but will do that shortly.
         */
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};
