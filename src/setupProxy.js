// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/images', {
      target: 'http://ydy.cqhtxxkj.com/',
      changeOrigin: true,
      pathRewrite: {
      }
    })
  );

  app.use(
    proxy('/api', {
      target: 'http://ydy.cqhtxxkj.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};
