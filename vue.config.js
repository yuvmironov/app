const path = require('path')

// ====Define function addStyleResource===
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, 'src/Styles/Global.styl')
      ] // The path that follows is the path where you put the public stylus variable yourself
    })
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/modeller' : '/',
  filenameHashing: false,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  // Configure to use stylus global variables
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"]
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    )
  }
}
