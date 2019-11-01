/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-01 16:19:38
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
const env = process.env.NODE_ENV;

if (env === 'development') {
  INITIAL_STATE['userInfo'] = {
    appVersion: null,
    createTime: "2019-10-17T12:53:22.000+0000",
    dueTime: "2019-10-25T09:29:44.000+0000",
    isActive: 1,
    loginId: 451,
    loginType: 2,
    mobile: "",
    systemId: 0,
    terminalIp: "192.168.3.191",
    terminalType: 0,
    openId: "11akshahsdgjhasgk", // 测试环境被添加的客户的openid   手机号是  13312345678
    userId: 158,
    userType: 2, // 13312345678
    // openId: "oYl965Zw_TG2G_xiNCkS3yRE-FaU", // 测试环境刘洋的openId
    // userId: 144,  // 测试环境刘洋的userId
    // userType: 1,
    token: "",
    updateTime: "2019-10-18T09:29:44.000+0000",
    userAgent: "",
  }
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGEUSERINFO:  // 修改用户信息
      if (!action.data) return
      if (env === 'development' && action.data.token) {
        const newUserInfoData = Object.assign({}, state.userInfo, action.data)
        return {
          ...state,
          userInfo: newUserInfoData
        }
      }
      const newUserInfoData = Object.assign({}, state.userInfo, action.data)
      return {
        ...state,
        userInfo: newUserInfoData
      }
    default:
      return state
  }
}
