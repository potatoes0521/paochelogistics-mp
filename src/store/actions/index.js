/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 12:07:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import { bindActionCreators } from 'redux'
import store from '../index.js'

import { changeUserInfo } from './user_msg.js'  // 用户信息
import {
  chooseCity,
  clearCity,
  editRemark,
  changeEditData,
  clearEditData
} from './publish_msg.js' // 城市信息

const createAction = (actionType) => {
  return (payload) => ({
    type: actionType,
    payload
  })
}

// 把多个action绑定到dispatch上
export default bindActionCreators({
  createAction,
  changeUserInfo,
  // 发布信息
  chooseCity,
  clearCity,
  editRemark,
  changeEditData,
  clearEditData
}, store.dispatch)