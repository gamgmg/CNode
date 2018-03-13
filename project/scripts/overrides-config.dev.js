const baseConfig = require('./overrides-config.base.js')
const autoprefixer = require('autoprefixer')
module.exports = function(config) {

    // Use your ESLint
    /*let eslintLoader = config.module.rules[0];
    eslintLoader.use[0].options.useEslintrc = true;*/

    // Add the stylus loader second-to-last
    // (last one must remain as the "file-loader")
    let loaderList = config.module.rules[1].oneOf;
    loaderList.splice(loaderList.length - 1, 0, {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
        },{
            loader: 'css-loader'
        },{
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-nested'),
                require('postcss-import'),
                require('postcss-cssnext')(),
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
        }]
        // use: ["style-loader", "css-loader", "sass-loader"]
    });

    // Use Poststylus Plugin to handle stylus
// config.plugins.push(baseConfig.loaderOptionsPlugin);

    // Define the root path alias
    let alias = config.resolve.alias;
    alias["@"] = baseConfig.rootPath;
};