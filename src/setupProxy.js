const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://118.24.24.110:3001/', changeOrigin: true }));
};
