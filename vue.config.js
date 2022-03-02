module.exports = {
  filenameHashing: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
