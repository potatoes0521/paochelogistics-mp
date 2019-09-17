/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 12:07:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */


import {
  CHOOSECITY,
  CLEARCITY,
  EDITREMARK,
  CHANGEEDITDATA,
  CLEAREDITMSG
} from '../constants/index.js'
 /**
  * 选择城市
  * @param {Object} data 参数描述
  * @return void
  */
export const chooseCity = (data) => {
  return {
    type: CHOOSECITY,
    data
  }
}
/**
 * 清除城市
 * @param {Object} data 参数描述
 * @return void
 */
export const clearCity = (data) => {
  return {
    type: CLEARCITY,
    data
  }
}
/**
 * 修改备注
 * @param {Object} data 参数描述
 * @return void
 */
export const editRemark = (data) => {
  return {
    type: EDITREMARK,
    data
  }
}
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

