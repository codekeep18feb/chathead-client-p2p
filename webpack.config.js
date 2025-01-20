const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
    // Load environment variables from .env file
    const envConfig = dotenv.config().parsed;

    // Prepare environment variables for DefinePlugin
    const envKeys = Object.keys(envConfig || {}).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(envConfig[next]);
        return prev;
    }, {});

    console.log('Loaded Environment Variables:', envKeys);

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            library: 'chathead_p2p',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            // new webpack.DefinePlugin(envKeys) // Inject environment variables
            new webpack.DefinePlugin({
                'process.env.CUSTOM_ENV': JSON.stringify('production'),
                'process.env.WS_SERVER': JSON.stringify('wss://dev.addchat.tech'),
            }),
        ],
        resolve: {
            extensions: ['.js']
        },
        mode: env.production ? 'production' : 'development',
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            compress: true,
            port: 9030,
            open: true,
            hot: true,
            devMiddleware: {
                writeToDisk: true,
            }
        }
    };
};
