const resolve = dir => require('path').join(__dirname, dir)

/**
 * 解决 WebStorm 找不到 Vue CLI 3 以上无 webpack 配置的问题。（别名路径跳转失效）
 *
 * @type {{resolve: {alias: {'@': string}}}}
 * @author 钟俊 (zhongjun), e-mail: zhongjun@toguide.cn, date: 1/6/2021 10:22 AM
 */
module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
