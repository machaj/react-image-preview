module.exports = {
    devtool: '#inline-source-map',
    entry: {
        demo: './demo/example.js'
    },
    output: {
        path: './demo',
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loader: 'babel'
            }
        ]
    }
};
