/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-19 14:49:29
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-19 16:06:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro from '@tarojs/taro'
import {
  appVersion
} from '@api/request_handle.js'

/**
 * 同步存储到本地
 * @param {String} key 存储在本地的字段名
 * @param {Object} value 要存储的数据
 * @return void
 */
const setStorage = (key, value) => {
  Taro.setStorageSync('pao_che_bang_' + appVersion + '_' + key, JSON.stringify(value))
}
/**
 * 获取存储信息
 * @param {String} key 存储在本地的字段名
 * @return void
 */
const getStorage = (key) => {
  return new Promise(async (resolve) => {
    const data = await Taro.getStorageSync('pao_che_bang_' + appVersion + '_' + key)
    if (data) {
      resolve(JSON.parse(data))
    } else {
      resolve('')
    }
  })
}
 /**
  * 函数功能描述
  * @param {String} key 存储在本地的字段名
  * @return void
  */
const removeStorage = (key) => {
  Taro.removeStorageSync('pao_che_bang_' + appVersion + '_' + key)
}

export default {
  setStorage,
  getStorage,
  removeStorage
}