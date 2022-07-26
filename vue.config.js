const path = require('path')

const resolve = (dir) => path.join(__dirname, dir) //当前目录,即项目根目录解析
const publicPath = process.env.VUE_APP_PUBLIC_PATH // 部署路径

// vant适配
// const designWidth = webpack.resourcePath.includes(
//   path.join('node_modules', 'vant')
// )
//   ? 375
//   : 750

const pxtoviewport = require('postcss-px-to-viewport')
const postcss = pxtoviewport({
  unitToConvert: 'px', // 要转化的单位
  // viewportWidth: designWidth, // UI设计稿的宽度
  viewportWidth: 1920, // UI设计稿的宽度
  unitPrecision: 6, // 转换后的精度，即小数点位数
  propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  // selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
  // selectorBlackList: ['van', 'el'], // 指定不转换为视窗单位的类名，
  minPixelValue: 4, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配 // 引入elemntUI、vant组件库时需要注释该项
})

// 将行内样式px转vw
const options = {
  unitToConvert: 'px',
  ignoreUnitCase: true, // 默认会忽略大小写来转换unitToConvert的匹配值 如px、PX、Px、pX各个情况。如果设置为false 则只匹配 px
  viewportWidth: 1920,
  unitPrecision: 5,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  minPixelValue: 1,
}

console.log(process.env.VUE_APP_API_MAP)
const apiMap = JSON.parse(process.env.VUE_APP_API_MAP)
// 根据api印射表代理到不同的url
let proxyConfig
Object.keys(apiMap).forEach((api) => {
  proxyConfig = {
    ...proxyConfig,
    [api]: {
      // 服务地址，即你要访问的服务器地址
      target: apiMap[api],
      changeOrigin: true,
      // 路径重写，例如将'/ruleEngin/login'重写为'/login'
      pathRewrite: {
        [`^${api}`]: '',
      },
      // 所有信息都在命令行工具打印
      logLevel: 'debug',
    },
  }
})
console.log(proxyConfig)

const exportsConfig = {
  publicPath: publicPath,
  // npm run build时，生成的文件目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源文件（js、css、img、fonts），项目打包之后静态资源会放在这个文件夹下
  assetsDir: 'static',
  // lintOnSave: false,
  devServer: {
    //开发环境下设置为编译好以后直接打开浏览器浏览
    open: true,
    host: '0.0.0.0', // host: '127.0.0.1'
    port: 9080,
    // 浏览器未报跨域错误则代理成功
    // 根据前缀决定target请求地址 前缀为/mock走模拟数据 其余走服务器
    proxy: {
      // '/api': {
      //   target: 'http://192.168.230.63:8000/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '',
      //   },
      // },
      // 联调阶段：可为不同的接口配置不同的代理地址
      // [`${process.env.VUE_APP_BASE_API}/mock`]: {
      //   // 服务地址，即你要访问的服务器地址
      //   target: 'http://localhost:9080/',
      //   changeOrigin: true,
      //   // 路径重写，将'/goods/list'重写为'/list'
      //   pathRewrite: {
      //     [`${process.env.VUE_APP_BASE_API}/mock`]: '',
      //   },
      //   logLevel: 'debug',
      // },
      // [process.env.VUE_APP_BASE_API]: {
      //   // 服务地址，即你要访问的服务器地址
      //   target: process.env.VUE_APP_BASE_URL,
      //   changeOrigin: true,
      //   // 路径重写，将'/user/login'重写为'/login'
      //   pathRewrite: {
      //     '^/ruleEngin': '',
      //   },
      //   // 所有信息都在命令行工具打印
      //   logLevel: 'debug',
      // },
      ...proxyConfig,
    },
    before: process.env.VUE_APP_MOCK_ENABLE && require('./src/mock/mock.js'), // 引入 mock/index.js
  },
  // productionSourceMap: false,
  configureWebpack(config) {
    return {
      // public/index.html可以使用此处的name作为title
      name: 'ruleEngin',
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
    // 将行内样式px转vw
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('postcss-style-px-to-viewport')
      .loader('postcss-style-px-to-viewport')
      .options(options)
  },
  css: {
    requireModuleExtension: true, //设置为false则elementUI样式无法生效
    extract: {
      ignoreOrder: true,
    }, //mini-css-extract-plugin加载顺序错误导致的警告
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
