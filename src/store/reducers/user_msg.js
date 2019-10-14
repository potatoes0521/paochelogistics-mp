/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-12 18:55:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import {
  CHANGEUSERINFO,
} from '../constants/index.js'

// import api from '@api/index.js'

const INITIAL_STATE = {
  userInfo: {},
}
// const env = process.env.NODE_ENV;

// if (env === 'development') {
//   INITIAL_STATE['userInfo'] = {
//     mobile: '13370130024',
//     openId: 'oLgd75eZdM9Cp-dSE0YpU9gKxJoE',
//     userId: '74',
//     token: 'e56eeabf15316920137dbf850cf0e48e',
//     unionId: 'fjlfjsalfjsalkfjjfdsafjfkdsj',
//     terminalType: '1',
//     userAgent: '',
//     userType: 0
//   }
// }

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGEUSERINFO:  // 修改用户信息
      if (!action.data) return
      const newUserInfoData = Object.assign({}, state.userInfo, action.data)
      return {
        ...state,
        userInfo: newUserInfoData
      }
    default:
      return state
  }
}
