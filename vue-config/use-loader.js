const path = require('path')

const dir = path.resolve(__dirname, 'loader')

module.exports = function(config) {
  config.resolveLoader.modules.add(dir)
}
