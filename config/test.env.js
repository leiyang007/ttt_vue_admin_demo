/*var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://13.229.230.131:8100"'
})*/
module.exports = {
  NODE_ENV: '"test"',
  API_ROOT: '"http://3.16.211.215:8080/PPMS_Test"'   //测试API
}
