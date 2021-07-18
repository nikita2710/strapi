const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins(
    [withImages], // All next plugins go here
    // Below is the main Next.js config object
    { webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
          config.node = {
            fs: 'empty'
          }
        }
    
        return config
      },
        images: {
            domains: ['10.204.206.254']
        },
    }
);