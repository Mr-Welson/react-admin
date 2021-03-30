const addProxy = () => (config) => {
  config.proxy = {
    '/api/': {
      target: 'http://localhost:4000/api/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
    },
  };
  return config;
}

module.exports = addProxy;