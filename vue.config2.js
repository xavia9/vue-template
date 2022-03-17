'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'xavia的网站' // title 网站标题

// 默认端口
// mac 下非root用户是无法使用小于1024的常用端口 运行 npm run serve时 记得加 sudo
const port = process.env.port || process.env.npm_config_port || 80

module.exports = {
  publicPath: '/', // 站点根目录路径
  outputDir: 'dist', // 生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源的目录
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    port: port, // 端口
    open: true, // 运行完是否自动打开浏览器
    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。是否显示警告和错误：
    overlay: {
      warnings: false, // 警告
      errors: process.env.ENV !== 'master', // 错误
    },
  },
  configureWebpack: {
    name: name, // 网站标题名
    resolve: {
      alias: {
        '@': resolve('src'), // import '@' 相当于 import '/src'
      },
    },
  },
  // 配置进行更细粒度的修改
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', (config) =>
        // config.devtool('cheap-source-map')
        config.devtool('cheap-module-eval-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
}
