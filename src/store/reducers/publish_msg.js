/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 18:24:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import {
  CHANGEEDITDATA,
  CLEAREDITMSG
} from '../constants/index.js'

const INITIAL_STATE = {
  remark: '',
  editMsg: {}
}

export default function publishMsg(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGEEDITDATA:   // 修改编辑信息
      const newEditData = Object.assign({}, state.editMsg, action.data)
      return {
        ...state,
        editMsg: newEditData
      }
    case CLEAREDITMSG:   // 清除编辑信息
      return {
        ...state,
        editMsg: {}
      }
    default:
      return state
  }
}