const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/gh',
    proxy({
      target: process.env.API_HOST || 'https://gitcard.antonybudianto.com',
      secure: false,
      pathRewrite: {
        '^/api/gh': process.env.API_PROXY_REWRITE || '/api/gh'
      },
      changeOrigin: true
    })
  );
};
