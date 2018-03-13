const webpack = require('webpack');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const path = require('path');

function resolve(dir){
	return path.join(__dirname, '..', dir);
}

module.exports.rootPath = resolve('src');

// module.exports.loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
//     options: {
//       postcss: {
//         use: [
//           postcss([ 
//             require('postcss-flexbugs-fixes'),
//             require('postcss-nested'),
//             autoprefixer({
//               browsers: [
//                 '>1%',
//                 'last 4 versions',
//                 'Firefox ESR',
//                 'not ie < 9', // React doesn't support IE8 anyway
//               ],
//               flexbox: 'no-2009',
//             })
//           ])
//         ]
//       }
//     }
//   });