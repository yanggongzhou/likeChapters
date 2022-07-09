const path = require('path');
const _ = require('lodash')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: './', // 基本路径 baseURL已经过时
  outputDir: 'dist', // 输出文件目录
  lintOnSave: process.env.NODE_ENV !== 'production',  // eslint-loader 是否在保存的时候检查
  chainWebpack: (config) => {
    // 解决警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
    config.resolve.alias
      .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
      .set('components', '@/components')
    //
    config.plugin('AutoImport').use(
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css',
            exclude: new RegExp(/^(?!.*loading-directive).*$/)
          })
        ],
        dts: 'auto-imports.d.ts'
      })
    )
    config.plugin('Components').use(
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
        dts: 'components.d.ts'
      })
    )
    // svg rule loader
    config.module.rule('svg').exclude.add(path.resolve(__dirname, './src/assets/icons')).end();
    config.module.rule('icons').test(/\.svg$/).include.add(path.resolve(__dirname, './src/assets/icons')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' });
    // build选项
    config.optimization.minimizer('terser')
      .tap(args => {
        args[0] = _.defaultsDeep({
          terserOptions: {
            // 解析选项
            parse: {
              ecma: 8 // 指定EcmaScript标准版本
            },
            // 压缩选项
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false, // 是否对一些短句进行优化。!(a <= b) → a > b
              inline: 2,
              drop_console: true,
              drop_debugger: true
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: /BUILD METADATA/i,
              ascii_only: true
            }
          },
          extractComments: /LICENSE/i
        }, args[0])
        return args
      })
  }, // webpack配置
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  css: { // css相关配置
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {}, // css预设器配置项
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pluginOptions: {}, // 第三方插件配置
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    // port: 80,
    https: false,
    hotOnly: false,
    port: 3000,
    proxy: {
      '/dzapi': {
        target: 'http://192.168.8.142:8080', // 后端
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/dzapi': '' // 重写路径
        }
      },
      '/api': {
        target: 'http://127.0.0.1:1234',
        changeOrigin: true, // 是否跨域
      }
    },
    // before: app => {}
  }
}
