const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/gh',
    proxy({
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api/gh': '/gh'
      },
      changeOrigin: true
    })
  );
};
