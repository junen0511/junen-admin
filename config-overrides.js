const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { legacy: true }], config);

    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);

    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true
    })(config, env);

    config.resolve = {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            components: path.resolve(__dirname, 'src/components/')
        }
    };

    return config;
};
