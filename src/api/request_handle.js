/*
 * @Author: liuYang
 * @description: 请求方法的公共方法封装
 * @Date: 2019-08-12 17:39:29
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 18:07:20
 */

// 默认请求连接
/**
 * 请求公共方法
 * @param {String} url 请求接口
 * @param {String} requestData 请求参数
 * @param {String} method POST GET
 * @return void
 */

import Taro from '@tarojs/taro'
// eslint-disable-next-line import/first
import refreshToken from '@utils/refreshToken.js'
// import { backReload } from '@utils/common.js'
import {
  HTTP_STATUS
} from '../config/request_config.js'
import createSignData from './secret.js'

// let defaultURL = 'http://192.168.3.133:8082/' // 李斌
// let defaultURL = 'http://192.168.3.191:8082/'   // 测试环境
let defaultURL = 'https://api.bang.paoche56.com/'
const sign_id = 'wxb633da0aa161b42c'
const contentType = 'application/json;charset=UTF-8'
export const appVersion = '0.8.7'
export default {
  baseOptions(url, data, that, method = 'GET') {
    const sign = createSignData(data, sign_id)[1]

    console.log(JSON.stringify(data), "sign=" + sign, url)

    const {
      userInfo
    } = that.props || {};
    const headerUserLogin = JSON.stringify({
      'token': userInfo.token || '',
      'mobile': userInfo.mobile || '',
      'openId': userInfo.openId || '',
      'userId': userInfo.userId || '', // 常用请求全部放在请求头上
      'unionId': userInfo.unionId || '',
      'terminalType': userInfo.terminalType || 1,
      'userType': userInfo.userType || 1,
      'sourceId': userInfo.sourceId || 1,
      'userAgent': userInfo.userAgent || '',
      'appVersion': appVersion
    })

    return new Promise((resolve, reject) => {
      Taro.request({
        isShowLoading: true,
        loadingText: '正在加载',
        url: defaultURL + url,
        data: data,
        method: method,
        header: {
          'content-type': contentType,
          'user-login': headerUserLogin,
          'sign': sign || ''
        },
        success(res) {
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            Taro.showToast({
              title: '请求资源不存在',
              icon: 'none',
              duration: 2000
            })
          } else if (res.statusCode === HTTP_STATUS.CLIENT_ERROR) {
            Taro.showToast({
              title: '参数缺失',
              icon: 'none',
              duration: 2000
            })
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            Taro.showToast({
              title: '服务端出现了问题',
              icon: 'none',
              duration: 2000
            })
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            Taro.showToast({
              title: '无权限访问',
              icon: 'none',
              duration: 2000
            })
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            if (res.data) {
              let resData = res.data
              // "200002" 是未注册
              if (!+resData.code || +resData.code === 200002 || +resData.code == 200) {
                resolve(resData.data)
              } else {
                if (+resData.code === 200003) {
                  console.log(that)
                  refreshToken.refreshToken(that, url, data, method)
                } else {
                  Taro.showToast({
                    title: resData.message,
                    icon: "none",
                    duration: 2000
                  })
                  // backReload(1800)
                }
              }
            } else {
              Taro.hideLoading()
              Taro.showToast({
                title: res.message,
                duration: 2000
              })
              // backReload(1800)
            }
          }
        },
        fail(e) {
          Taro.hideLoading()
          Taro.showToast({
            title: '网络连接超时',
            icon: 'none'
          })
          console.log('请求接口出现问题')
          reject('api', '请求接口出现问题', e)
        }
      })
    })
  },
  get(url, data, that) {
    return this.baseOptions(url, data, that, 'GET')
  },
  post(url, data, that) {
    return this.baseOptions(url, data, that, 'POST')
  }
}