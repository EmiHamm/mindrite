const webpack = require('webpack');
const path = require('path');
const publicPath = path.resolve(process.cwd(), './public');
const distPath = path.resolve(process.cwd(), './dist');
const env = (process.env.NODE_ENV || 'development');
const isProd = env === 'production';
const isDev = !isProd;

module.exports = {
    devtool: isDev ? 'source-map' : '',
    stats: {
        colors: true,
        children: false,
        chunks: false,
        assetSort: 'name'
    },
    cache: !isProd,
    bail: isProd,
    target: 'web',
    entry: {
        contact: `${publicPath}/static/scripts/contact.js`,
        admin: `${publicPath}/static/scripts/admin.js`,
        login: `${publicPath}/static/scripts/login.js`,
        vendor: ['axios']
    },

    output: {
        filename: isProd ? '[name].[chunkhash].js' : '[name].js',
        publicPath: '/',
        path: distPath,
        pathinfo: !isProd
    },

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: [publicPath],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },

            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            stats: {
                colors: true
            },
            options: {
                context: publicPath,
                output: {
                    path: distPath
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.NamedModulesPlugin()
    ]
};


