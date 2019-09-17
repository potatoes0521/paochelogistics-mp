/*
 * @Author: liuYang
 * @description: 刷新token
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 12:08:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import api from '@api/index.js'
import {
  getStorage,
  setStorage
} from './common.js'
// eslint-disable-next-line import/first
import Actions from '@store/actions/index.js'

const handleToken = (that) => {
  getStorage('token')
    .then(res => {
      const { userInfo } = that.props || {};
      if (res && userInfo.token) return;
      // token有效期小于半天
      const time = ((new Date()).getTime() - res.time) / 1000 / 60 / 60 / 24 >= 6 ? true : false
      if (time && userInfo.token) {
        console.log('刷新用户token')
        refreshToken(that)
      } else if(res){
        console.log('有缓存读缓存取token')
        Actions.changeUserInfo(res)          
      } else {
        console.log('没缓存或者缓存过期了且还没有登录')
        return
      }
    })
}

const refreshToken = (that) => {
  const { userInfo } = that.props || {};
  let sendData = {
    userId: userInfo.userId,
    openId: userInfo.openId,
    token: userInfo.token
  }
  api.refreshToken(sendData,).then(res => {
    Actions.changeUserInfo(res)
    setNewToken(res.token)
  })
}

const setNewToken = (token) => {
  const storageData = {
    token,
    time: (new Date).getTime()
  }
  setStorage('token', storageData)
}

export default {
  handleToken,
  refreshToken,
  setNewToken
};