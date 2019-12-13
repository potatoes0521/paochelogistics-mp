/*
 * @Author: liuYang
 * @description: 请求方法的公共方法封装
 * @Date: 2019-08-12 17:39:29
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-13 16:08:45
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
import refreshToken from '@utils/refresh_token.js'
import {
  HTTP_STATUS,
  defaultApiURL
} from '../config/request_config.js'
import createSignData from './secret.js'

const sign_id = 'wx90c791e28c3c7d4d'
const contentType = 'application/json;charset=UTF-8'
export const appVersion = '1.0.0'

export default {
  baseOptions(url, data, that, loadingTitle, method = 'GET') {
    let loadingTimer = null
    const { userInfo } = that.props || {};
    if (userInfo.nickName && userInfo.userPhoto) {
      data = Object.assign({}, {
        nickName: encodeURIComponent(userInfo.nickName),
        userPhoto: userInfo.userPhoto
      }, data)
    }
    for (let i in data) { 
      if (data[i] === '') { 
        delete data[i]
      }
    }
    const sign = createSignData(data, sign_id)[1]
    const headerUserLogin = JSON.stringify({
      'token': userInfo.token || '',
      'mobile': userInfo.mobile || '',
      'openId': userInfo.openId || '',
      'userId': userInfo.userId || '', // 常用请求全部放在请求头上
      'unionId': userInfo.unionId || '',
      'userType': userInfo.userType, // 0 驿站人员  1 自主注册   2 驿站人员添加客户
      'terminalType': 1, // 终端类型  1 小程序   2 H5  3 APP
      'sourceId': 3, // 1 跑车帮小程序 2 跑车帮app 3 跑车物流小程序 4 跑车物流运营平台
      'userAgent': userInfo.userAgent || '',  // 系统信息
      'appVersion': appVersion, // 版本号
      'appType': 1, // 1 微信小程序 2 支付宝小程序
      'systemId': 2 // 1 跑车帮   2 跑车物流
    })
    console.log(data, '接口是' + url)
    if (loadingTitle) {
      if (method === 'POST') {
        Taro.showLoading({
          title: loadingTitle,
          mask: true
        })
      } else {
        loadingTimer = setTimeout(() => {
          Taro.showLoading({
            title: loadingTitle,
            mask: true
          })
        }, 350)
      }
    }
    return new Promise((resolve, reject) => {
      Taro.request({
        url: defaultApiURL + url,
        data: data,
        method: method,
        header: {
          'content-type': contentType,
          'user-login': headerUserLogin,
          'sign': sign || '',
          'terminal-type': 1, // 终端类型  1 小程序   2 H5  3 APP
          'source-id': 3, // 1 跑车帮小程序注册 2 跑车帮APP注册 3 跑车物流小程序注册 4 跑车物流小程序添加
          'system-info': userInfo.userAgent || '', // 系统信息
          'app-version': appVersion, // 版本号
          'app-type': 1, // 1 微信小程序 2 支付宝小程序
          'system-id': 2 // 1 跑车帮   2 跑车物流
        },
        success(res) {
          Taro.hideLoading()
          clearTimeout(loadingTimer)
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            Taro.showToast({
              title: '请求资源不存在',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题', '404')
          } else if (res.statusCode === HTTP_STATUS.CLIENT_ERROR) {
            Taro.showToast({
              title: '参数缺失',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题', '参数缺失')
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            Taro.showToast({
              title: '服务端出现了问题',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题', '500')
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            Taro.showToast({
              title: '无权限访问',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题', '403')
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            if (res.data) {
              let resData = res.data
              // '200002' 是未注册
              console.log(resData, '接口是' + url)
              if (!+resData.code || +resData.code === 200002 || +resData.code == 200) {
                if (url === 'user/customerlist') {
                  resolve(resData)
                } else {
                  resolve(resData.data)                  
                }
              } else {
                if (+resData.code === 200003) {
                  console.log(refreshToken, 'refreshToken')
                  refreshToken.refreshToken(that, url, data, method)
                } else {
                  Taro.showToast({
                    title: resData.message,
                    icon: 'none',
                    duration: 2000
                  })
                  reject(url + '接口出现问题', resData)
                  // backReload(1800)
                }
              }
            } else {
              Taro.showToast({
                title: res.message,
                duration: 2000
              })
              reject(url + '接口出现问题', res)
              // backReload(1800)
            }
          }
        },
        fail(e) {
          clearTimeout(loadingTimer)
          Taro.showToast({
            title: '网络连接超时',
            icon: 'none'
          })
          reject(url + '接口出现问题', e)
        }
      })
    })
  },
  get(url, data, that, loadingTitle = '加载中...') {
    return this.baseOptions(url, data, that, loadingTitle, 'GET')
  },
  post(url, data, that, loadingTitle = '提交中...') {
    return this.baseOptions(url, data, that, loadingTitle, 'POST')
  }
}