const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withTypescript = require('@zeit/next-typescript');
const withImages = require('next-images');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (phase, { defaultConfig }) => {
  const config = withImages({
    inlineImageLimit: -1,
    ...withTypescript({
      webpack: (cfg, options) => {
        const originalEntry = cfg.entry;
        cfg.entry = async () => {
          const entries = await originalEntry();
          if (entries['main.js'] && !entries['main.js'].includes('./client/core/polyfills.js')) {
            entries['main.js'].unshift('./client/core/polyfills.js');
          }
          return entries;
        };

        const plugin = cfg.plugins.find(function(x) {
          return x.constructor.name === 'FriendlyErrorsWebpackPlugin';
        });
        if (plugin) {
          plugin.shouldClearConsole = false;
        }

        // .web.js is for React Native Web.
        cfg.resolve.extensions = [...new Set(['.web.js', '.web.ts', '.web.tsx', '.mjs', ...cfg.resolve.extensions])];

        // only add plugin in development to client webpack config .

        if (false && phase === PHASE_DEVELOPMENT_SERVER && !options.isServer) {
          console.log('>>>>>>>>>>> phase', phase, 'isServer', options.isServer);
          cfg.plugins.push(new ForkTsCheckerWebpackPlugin());
        }

        return cfg;
      },
    }),
  });
  return config;
};
