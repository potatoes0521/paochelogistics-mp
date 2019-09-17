/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-05 15:02:41
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */


import { combineReducers } from 'redux'
import user_msg from './user_msg'
import publish_msg from './publish_msg'

export default combineReducers({
  user_msg,
  publish_msg
})
