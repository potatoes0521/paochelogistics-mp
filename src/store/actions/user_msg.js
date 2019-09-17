/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 12:07:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import {
  CHANGEUSERINFO
} from '../constants/index.js'
/**
 * 修改用户信息
 * @param {Object} data 参数描述
 * @return void
 */
export const changeUserInfo = (data) => {
  return {
    type: CHANGEUSERINFO,
    data
  }
}
/**
 * 刷新login  没用
 * @param {Object} data 参数描述
 * @return void
 */
export const handleLogin = (data) => {
  return {
    type: 'REFRESHTOKEN',
    data
  }
}

