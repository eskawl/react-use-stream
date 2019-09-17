
const { resolve } = require('path');
const babelConfig = require('./babel.config');

module.exports = {
    devtool: 'none',
    mode: 'production',
    entry: {
        index: [resolve(__dirname, 'src/index.js')],
    },
    output: {
        path: resolve(__dirname, 'lib'),
        library: 'react-use-stream',
        libraryTarget: 'umd',
        filename: 'react-use-stream.min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: babelConfig.presets,
                    },
                },
            },
        ],
    },
};
