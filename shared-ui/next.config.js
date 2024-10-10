// const NextFederationPlugin = require('@module-federation/nextjs-mf');

// module.exports = {
//   webpack(config, options) {
//     config.plugins.push(
//       new NextFederationPlugin({
//         name: 'shared_ui', 
//         filename: 'static/chunks/remoteEntry.js',
//         exposes: {
//           './Navbar': './components/navbar.tsx', 
//         },
//         shared: {
//           react: {
//             singleton: true,
//             requiredVersion: false,
//           },
//           'react-dom': {
//             singleton: true,
//             requiredVersion: false,
//           },
//         },
//       })
//     );
//     return config;
//   },
// };

// // Set the environment variable
// process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';