const path = require('path')

const resolve = (dir) => path.join(__dirname, dir) //当前目录,即项目根目录解析
const publicPath = process.env.VUE_APP_PUBLIC_PATH // 部署路径

const pxtoviewport = require('postcss-px-to-viewport')
// const designWidth = webpack.resourcePath.includes(
//   path.join('node_modules', 'vant')
// )
//   ? 375
//   : 750
const postcss = pxtoviewport({
  unitToConvert: 'px', // 要转化的单位
  // viewportWidth: designWidth, // UI设计稿的宽度
  viewportWidth: 1920, // UI设计稿的宽度
  unitPrecision: 6, // 转换后的精度，即小数点位数
  propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  // selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配 // 引入elemntUI组件库时需要注释该项
})
const exportsConfig = {
  publicPath: publicPath,
  // npm run build时，生成的文件目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源文件（js、css、img、fonts），项目打包之后静态资源会放在这个文件夹下
  assetsDir: 'static',
  // lintOnSave: false,
  devServer: {
    //开发环境下设置为编译好以后直接打开浏览器浏览
    // open: true,
    host: '0.0.0.0', // "localhost"
    port: 9080,
    proxy: {
      '/api': {
        target: 'http://192.168.230.63:8000/ruleEngin',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // productionSourceMap: false,
  configureWebpack(config) {
    return {
      // public/index.html可以使用此处的name作为title
      name: 'xavia的项目',
      resolve: {
        alias: {
          '@': resolve('src'),
          components: resolve('src/components'),
          assets: resolve('src/assets'),
          static: resolve('public/static'),
        },
      },
      output: {
        filename: 'static/[name].[hash:8].js',
      },
      // devtool:
      //   process.env.NODE_ENV === 'development'
      //     ? 'cheap-module-eval-source-map'
      //     : 'cheap-module-source-map',
      devtool:
        process.env.NODE_ENV === 'development'
          ? 'cheap-module-source-map'
          : 'cheap-module-source-map',
      // plugins: [
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //       },
      //     },
      //     sourceMap: config.build.productionSourceMap,
      //     parallel: true,
      //   }),
      // ],
    }
    // config.devtool = "source-map"
  },
  chainWebpack(config) {
    // 单页时删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // config.optimization.minimize(false)
  },
  css: {
    requireModuleExtension: true, //设置为false则elementUI样式无法生效
    extract: true,
    sourceMap: false,
    loaderOptions: {
      // sass: {
      //   implementation: require('sass'),
      // },
      // css: {
      //   // exclude: /(main|main_ext).css/,
      // },
      postcss: {
        plugins: [postcss],
      },
    },
  },
}
module.exports = exportsConfig
