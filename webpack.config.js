var webpack = require("webpack");
const TerserJsPlugin = require('terser-webpack-plugin');
var libraryName = require("./package.json").name;
var withLocalesSuffix = "-i18n";
var fs = require('fs');
var path = require('path');

var entryPoints = {
  [libraryName]: "./src/cronstrue.ts",
  [libraryName + ".min"]: "./src/cronstrue.ts",
  [libraryName + withLocalesSuffix]: "./src/cronstrue-i18n.ts",
  [libraryName + withLocalesSuffix + ".min"]: "./src/cronstrue-i18n.ts"
};

var localeEntryPoints = {};
for (let locale of fs.readdirSync("./src/i18n/locales")) {
    const code = path.basename(locale, path.extname(locale));
    localeEntryPoints["locales/" + code] = "./src/i18n/locales/" + locale;
}

module.exports = [
    {
      mode: "production",
      entry: entryPoints,
      output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        library: libraryName,
        libraryTarget: "umd",
        umdNamedDefine: true,
      },
      resolve: {
        extensions: [".js", ".ts"]
      },
      module: {
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
          new TerserJsPlugin({
            include: /\.min\.js$|i18n\/locales/
          })
        ]
      }
    },
    {
      mode: "production",
      entry: localeEntryPoints,
      output: {
        path: __dirname,
        filename: "[name].js",
        library: '[name]',
        libraryTarget: "umd",
        umdNamedDefine: true,
      },
      resolve: {
        extensions: [".js", ".ts"]
      },
      externals: {
        cronstrue: "cronstrue",
      },
      module: {
        rules: [
          {
            test: /i18n[\/\\]locales/,
            loader: "custom-loader",
            options: {
              process: function (resourcePath, source) {
                let localeCode = resourcePath.match(/i18n[\/\\]locales[\/\\]([a-zA-Z_]+)\.ts$/)[1];
                source = "import Cronstrue from \"cronstrue\";" + 
                    source + `\nCronstrue.locales["${localeCode}"] = new ${localeCode}();`;
                return source;
              }
            }
          },
          {
            test: /\.ts$/,
            loader: "ts-loader"
          }
        ]
      },
      resolveLoader: {
        alias: {
          "custom-loader": path.resolve(__dirname, "scripts/custom-loader"),
        },
      }
    }
];
