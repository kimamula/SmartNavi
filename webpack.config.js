module.exports = {
    entry: {
        'index': './index.js'
    },
    output: {
        path: './public/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-react-jsx']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
