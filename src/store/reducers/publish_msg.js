/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 12:07:48
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

const INITIAL_STATE = {
  chooseCity: {},
  remark: '',
  editMsg: {}
}

export default function publishMsg(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHOOSECITY:  // 选择城市
      if (!action.data) return
      const newCityData = Object.assign({}, state.chooseCity, action.data)
      return {
        ...state,
        chooseCity: newCityData
      }
    case CLEARCITY:  // 清除城市信息
      if (!action.data) return
      return {
        ...state,
        chooseCity: {}
      }
    case EDITREMARK:  // 编辑备注
      return {
        ...state,
        remark: action.data
      }
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