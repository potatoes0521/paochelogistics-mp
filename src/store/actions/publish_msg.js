/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 18:23:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */


import {
  CHANGEEDITDATA,
  CLEAREDITMSG
} from '../constants/index.js'

/**
 * 编辑信息修改
 * @param {Object} data 参数描述
 * @return void
 */
export const changeEditData = (data) => {
  return {
    type: CHANGEEDITDATA,
    data
  }
}
/**
 * 清除编辑信息
 * @param {Object} data 参数描述
 * @return void
 */
export const clearEditData = (data) => {
  return {
    type: CLEAREDITMSG,
    data
  }
}

