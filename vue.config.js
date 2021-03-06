const path = require('path');
const webpack = require('webpack');

let resolve = (dir) => {
  return path.join(__dirname, './', dir)
}

module.exports = {
  assetsDir: 'assets',
  publicPath: '/',
  lintOnSave: true, // 是否开启编译时是否不符合eslint提示
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/brah_553': {
        target: 'http://192.168.2.230', // 接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        ws: true,
        pathRewrite: {
          '^/': '/' //需要rewrite的,
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      // 全局配置jquery
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  // 配置别名
  chainWebpack: (config) => {
      config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('static', resolve('src/static'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `
               @import "@/assets/css/variable.scss"; 
               @import "@/assets/css/common.scss";
               @import "@/assets/css/mixin.scss";
               @import "@/assets/css/transition.scss";
               @import "@/assets/css/media/media.scss";
              `
      }
    }
  },
}