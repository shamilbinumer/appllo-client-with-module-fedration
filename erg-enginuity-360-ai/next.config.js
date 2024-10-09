const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'erg-enginuity-360-ai', // this is the main zone
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

  async rewrites() {
    return [
      {
        source: '/backlog', // The URL path you want to use in the main app
        destination: 'http://localhost:3001/backlog', // Redirect to backlog app
      },
      {
        source: '/resources', // The URL path for the resource management app
        destination: 'http://localhost:3002/resources', // Redirect to resource management app
      },
      {
        source: '/shared-ui', // The URL path for the shared UI app
        destination: 'http://localhost:3004/shared-ui', // Redirect to shared UI app
      },
      // Add more rewrites as needed
    ];
  },
};

// Set the environment variable
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
