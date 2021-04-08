const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  publicPath: './',
  outputDir: '../view/static',
  devServer: {
    open: true,
    port: 8082
  },
  productionSourceMap: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'dev') {
      config.devtool('source-map')
    } else {
      config.optimization.splitChunks({
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 512 * 1024,
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `chunk.${packageName.replace('@', '')}`
            },
            priority: 10
          }
        }
      })
      // let BundleAnalyzerPlugin1 = new BundleAnalyzerPlugin()
      // config.plugins = []
    }
  },
  css: {
    sourceMap: true
  }
}
