var webpack = require("webpack");
var libraryName = require("./package.json").name;
var withLocalesSuffix = "-i18n";
var withAsyncSuffix = "-async";

module.exports = {
  entry: {
    [libraryName]: "./src/cronstrue.ts",
    [libraryName + ".min"]: "./src/cronstrue.ts",
    [libraryName + withLocalesSuffix]: "./src/cronstrue-i18n.ts",
    [libraryName + withLocalesSuffix + ".min"]: "./src/cronstrue-i18n.ts",
    [libraryName + withAsyncSuffix]: "./src/cronstrue-async.ts",
    [libraryName + withAsyncSuffix + ".min"]: "./src/cronstrue-async.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    library: libraryName,
    libraryTarget: "umd"
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
        loader: "ts-loader",
        options: {
          compilerOptions: {
            outDir: "../dist",
            declaration: true,
            sourceMap: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sideEffects: false
    })
  ]
};
