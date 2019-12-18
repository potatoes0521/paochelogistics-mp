/*
 * @Author: liuYang
 * @description: 刷新token的操作
 * @Date: 2019-09-03 10:24:49
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-18 11:29:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import Storage from './storage.js'

const setNewToken = (token) => {
  const storageData = {
    token,
    time: (new Date).getTime()
  }
  Storage.setStorage('token', storageData)
}

export default {
  setNewToken
};