const path = require('path');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const ApiLocalProxyList = {
  '/api/design': {
    target: 'http://114.55.57.154:8919/',
    // target: 'http://localhost:6601',
    pathRewrite: {
      '^/api/design': ''
    },
    secure: false
  }
};

/**
 * 线上代理接口
 */
const ApiOnlineProxyList = {
  '/api': {
    target: 'http://114.55.57.154:8919/',
    // target: 'http://114.55.57.154:8064/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    secure: false
  },
  '/common': {
    target: 'http://114.55.57.154:8919/common',
    // target: 'http://114.55.57.154:8064/common',
    changeOrigin: true,
    pathRewrite: {
      '^/common': ''
    },
    secure: false
  }
};

module.exports = {
  assetsDir: 'static',
  publicPath: '/',
  chainWebpack: (config) => {
    // 修改入口文件
    config
      .entry('app')
      .clear()
      // .add('babel-polyfill')
      .add('./src/main.ts');
    config.plugin('define').tap((args) => {
      let options = args[0];
      let rst = [
        {
          ...options,
          // 增加 环境变量 __DEV__
          __DEV__: !isProduction
        }
      ];
      return rst;
    });

    // config.plugin('externals').use(HtmlWebpackExternalsPlugin, [
    //   {
    //     externals: [
    //       {
    //         module: 'moment',
    //         entry: 'min/moment-with-locales.min.js',
    //         global: 'moment'
    //       },
    //       {
    //         module: 'vue',
    //         entry: 'dist/vue.min.js',
    //         global: 'Vue'
    //       },
    //       {
    //         module: 'vuex',
    //         entry: 'dist/vuex.min.js',
    //         global: 'Vuex'
    //       },
    //       {
    //         module: 'vue-router',
    //         entry: 'dist/vue-router.min.js',
    //         global: 'VueRouter'
    //       },
    //       {
    //         module: 'axios',
    //         entry: 'dist/axios.min.js',
    //         global: 'axios'
    //       },
    //       {
    //         module: 'ant-design-vue',
    //         entry: 'dist/antd-with-locales.min.js',
    //         global: 'antd'
    //       },
    //       {
    //         type: 'css',
    //         module: 'ant-design-vue',
    //         entry: 'dist/antd.min.css'
    //       }
    //     ]
    //   }
    // ]);
  },
  transpileDependencies: [
    'resize-detector',
    'element-resize-detector',
    'vue-to-pdf',
    'vue-easy-printer',
    'ant-design-vue'
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: [path.join(__dirname, 'assets')],
    port: 8080,
    hot: true,
    proxy: isProduction ? ApiLocalProxyList : ApiOnlineProxyList,
  },
  productionSourceMap: false, // 生产环境禁用map文件
  lintOnSave: false,
};
