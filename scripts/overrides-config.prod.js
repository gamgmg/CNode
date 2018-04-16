const paths = require('react-scripts/config/paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./overrides-config.base.js')
const autoprefixer = require('autoprefixer')
// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {};

module.exports = function(config) {

    // Use your ESLint
    /*let eslintLoader = config.module.rules[0];
    eslintLoader.use[0].options.useEslintrc = true;*/

    // Add the stylus loader second-to-last
    // (last one must remain as the "file-loader")
    let loaderList = config.module.rules[1].oneOf;
    loaderList.splice(loaderList.length - 1, 0, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            Object.assign(
                {
                    fallback: {
                        loader: require.resolve('style-loader'),
                        options: {
                            hmr: false
                        }
                    },
                    use: [
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                              // Necessary for external CSS imports to work
                              // https://github.com/facebookincubator/create-react-app/issues/2677
                              ident: 'postcss',
                              plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-nested'),
                                require('postcss-import'),
                                autoprefixer({
                                  browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                  ],
                                  flexbox: 'no-2009',
                                }),
                              ],
                            },
                        }
                    ]
                }
            ), extractTextPluginOptions)
    });

    // 按需加载antd-mobile组件
    loaderList[1].options.plugins = [['import', {
        'libraryName': 'antd-mobile'
    }]]

    // Use Poststylus Plugin to handle stylus
// config.plugins.push(baseConfig.loaderOptionsPlugin);
    // Define the root path alias
    let alias = config.resolve.alias;
    alias["@"] = baseConfig.rootPath;
};
