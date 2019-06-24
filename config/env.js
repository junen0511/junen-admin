'use strict';

module.exports = {
    start: {
        NODE_ENV: '"development"',
        ENV_HOST: '"dev"',
        BASE_API: '"/papi"'
    },
    test: {
        NODE_ENV: '"production"',
        ENV_HOST: '"ta"',
        BASE_API: '"http://api.annajunen.top"'
    },
    prod: {
        NODE_ENV: '"production"',
        ENV_HOST: '""',
        BASE_API: '"http://api.annajunen.top"'
    }
};
