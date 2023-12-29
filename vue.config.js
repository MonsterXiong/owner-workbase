const path = require('path')

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    // proxy: {
    //   '^/layer': {
    //     target: process.env.VUE_APP_BASE_URL,
    //     changeOrigin: true,
    //   },
    //   '^/picture': {
    //     target: process.env.VUE_APP_BASE_URL,
    //     changeOrigin: true,
    //   },
    // },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/style/variables.less')],
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: (config) => {
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
    config.externals = {
      cesium: 'Cesium',
    }
  },
}
