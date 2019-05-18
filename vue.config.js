const path = require('path')
const useLoader = require('./vue-config/use-loader')
const DIRS = {
  router: path.resolve(__dirname, 'src/router'),
  views: path.resolve(__dirname, 'src/views')
}
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    useLoader(config)

    config.module
      .rule('route-yml')
      .test(/\.route\.yml$/)
      .use('route-file-loader')
      .loader('route-file-loader')
      .options({ DIRS })

    config.module
      .rule('yml')
      .test(/\.yml$/)
      .use('yaml-loader')
      .loader('yaml-loader')

    // process.exit(1)
  }
}
