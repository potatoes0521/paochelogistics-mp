/*
 * @Author: liuYang
 * @description: 针对微信方法等公共系统方法的封装
 * @Date: 2019-08-13 12:26:51
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 10:36:47
 */

import Taro from '@tarojs/taro'
import {
  showModalText,
  showModalTextContent
} from '@config/text_config'
/**
 * 检查一个字符串有没有中文
 * @param {String} str 要检查的文字字符串
 * @return false 是没有中文  true有中文
 */
export const isChinese = (str) => {
  if (escape(str).indexOf("%u") < 0) return false
  return true
}

/**
 * 处理长姓名
 * @param {String} str 要处理的文字字符串
 * @return 中文截取4位   英文截取7位
 */
export const handleName = (str) => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
}
/**
 * 处理emoj表情
 * @param {Type} str 参数描述
 * @return void
 */
export const emoj2str = (str) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}

/**
 * 获取当前页面的URL
 * @return 当前页面的URL
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}
/**
 * 获取用户系统信息
 * @return 用户手机信息
 */
export const getSysteminfo = () => {
  try {
    let deviceInfo = Taro.getSystemInfoSync()
    const device = JSON.stringify(deviceInfo)
    return device
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message) 
  }
}
/**
 * 时间戳转时间
 * @param {String} date 时间戳
 * @return yyyy-mm--dd hh-mm-ss 时间
 */
export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 转换双数
 * @param {String} n 要转换的数字
 * @return 转换好的数字
 */
export const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 获取用户地理位置信息
 * @return void
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'gcj02'
    }).then(res => {console.log(res)

      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}
 /**
  * 获取用户曾经授权
  * @return void
  */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    Taro.getSetting().then(res => {
      resolve(res)
    }).catch(err => {
      reject('noAuthorize',err)
    })
  })
}
 /**
  * 针对某项打开授权
  * @param {Type} scope 参数描述
  * @return void
  */
export const Authorize = (scope) => {
  return new Promise((resolve, reject) => { 
    Taro.authorize({
      scope: scope
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject('noAuthorize')
    })
  })
}

/**
* 返回并重载上个页面
* @param {Type} sleepTime 参数描述
* @return void
*/
export const backReload = (sleepTime) => {
  setTimeout(() => {
    Taro.navigateBack({
      success: () => {
        // const pageArray = Taro.getCurrentPages()
        // console.log(pageArray,'页面栈xxxxxxxxxxxxxx',pageArray.length)
        // pageArray[pageArray.length -2].onReady()
      }
    })
  }, sleepTime)
}
 /**
  * 弹框询问并导向注册
  * @param {String} params='' 后面要拼接的参数
  * @return void
  */
export const showModalAndRegister = (params = '') => {
  let url = '/pages/register/index' + params
  Taro.showModal({
    title: showModalText,
    content: showModalTextContent,
    success: (res) => {
      if (res.confirm) {
        Taro.navigateTo({
          url
        })
      } else if (res.cancel) {
        return
      }
    }
  })
}
 /**
  * 对象转换为字符串   未测试
  * @param {Type} params={} 参数描述
  * @param {Type} symbol='&' 参数描述
  * @return void
  */
export const objectConversionString = (params = {}, symbol = '&') => {
  let string = '?'
  for (const key in params) {
    if (params.hasOwnProperty(key)) { 
      string += `${key}=${params.key}${symbol}`
    }
  }
  return string
}