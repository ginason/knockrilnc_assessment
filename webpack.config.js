
module.exports = {
    mode: 'development',
    context: __dirname,
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.css'],
    },

    entry: ['./src/client.js'],
    devtool: '#source-map',
    output: {
        path: __dirname,
        publicPath: '/public/App',
        filename: './bundle.js',
    },
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/public/App',
        historyApiFallback: true,
        proxy: {
            "**": "http://localhost:8080"
        }
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [['env', { modules: false }], 'react']
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                ],
            },
        ],
    },
};
