/*
 * @Author: liuYang
 * @description: 刷新token的操作
 * @Date: 2019-09-03 10:24:49
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-21 10:19:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import api from '@api/index.js'
import Storage from './storage.js'
// eslint-disable-next-line import/first
import Actions from '@store/actions/index.js'
// eslint-disable-next-line import/first
import requestHandle from '@api/request_handle.js';

const refreshToken = (that, url, data, method) => {
  const { userInfo } = that.props || {};
  let sendData = {
    userId: userInfo.userId,
    openId: userInfo.openId,
    token: userInfo.token
  }
  api.user.refreshToken(sendData, that).then(res => {
    if(!res) return
    Actions.changeUserInfo(res)
    setNewToken(res.token)
    // 500ms后重新调用刚刚的接口
    setTimeout(() => {
      if (method === 'GET') {
        return requestHandle.get(url, data, that)
      } else {
        return requestHandle.post(url, data, that)
      }
    }, 500)
  })
}

const setNewToken = (token) => {
  const storageData = {
    token,
    time: (new Date).getTime()
  }
  Storage.setStorage('token', storageData)
}

export default {
  refreshToken,
  setNewToken
};