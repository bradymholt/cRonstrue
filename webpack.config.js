var libraryName = require('./package.json').name;

var config = {
    entry: {
        [libraryName]: './lib/expressionDescriptor.ts' 
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['', '.js', '.ts']
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
                loader: "awesome-typescript-loader"
            }
        ]
    }
};

module.exports = config;
