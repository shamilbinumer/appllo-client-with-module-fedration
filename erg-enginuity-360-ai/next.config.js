const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'erg-enginuity-360-ai',
        remotes: {
          erg_product_backlog_management: `erg_product_backlog_management@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          erg_resource_management: `erg_resource_management@http://localhost:3002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          shared_ui: `shared_ui@http://localhost:3004/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
      })
    );
    return config;
  },

  // Set the share strategy in initOptions
  experimental: {
    appDir: true,
    shared: {
      strategy: 'separate', // Use 'separate' or another valid strategy
    },
  },

  async rewrites() {
    return [
      {
        source: '/backlog', // The route in the main app
        destination: 'http://localhost:3001/backlog', // Redirects to the backlog app
      },
    ];
  },
};
