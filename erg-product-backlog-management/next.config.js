const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options; // Get isServer from options

    config.plugins.push(
      new NextFederationPlugin({
        name: 'erg_product_backlog_management', 
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Backlog': './component/backlog.tsx', 
        },
        remotes: {
          erg_resource_management: `erg_resource_management@http://localhost:3002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );
    return config;
  },
};

// Set the environment variable
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
