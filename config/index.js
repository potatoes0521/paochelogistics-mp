/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-17 11:53:57
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-03 14:12:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

const path = require('path')

const config = {
  projectName: 'paochelogistics-mp',
  date: '2019-9-17',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  // babel、csso、uglify 等配置从 plugins 配置中移出来
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }]
    ]
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@c': path.resolve(__dirname, '..', 'src/components'),
    '@img': path.resolve(__dirname, '..', 'src/assets/img'),
    '@js': path.resolve(__dirname, '..', 'src/assets/js_sdk'),
    '@store': path.resolve(__dirname, '..', 'src/store'),
    '@css': path.resolve(__dirname, '..', 'src/assets/css'),
    '@api': path.resolve(__dirname, '..', 'src/api'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@config': path.resolve(__dirname, '..', 'src/config')
  },
  // 小程序配置从 weapp 改为 mini，可以删掉很多小配置
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  // 可以删掉很多小配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
