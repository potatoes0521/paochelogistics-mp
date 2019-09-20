/*
 * @Author: liuYang
 * @description: 刷新token的操作
 * @Date: 2019-09-03 10:24:49
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-19 15:46:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import api from '@api/index.js'
import Storage from './storage.js.js'
// eslint-disable-next-line import/first
import Actions from '@store/actions/index.js'
// eslint-disable-next-line import/first
import requestHandle from '@api/request_handle.js';

const refreshToken = (that, url, data, method) => {
  console.log(that.props)
  const { userInfo } = that.props || {};
  let sendData = {
    userId: userInfo.userId,
    openId: userInfo.openId,
    token: userInfo.token
  }
  api.refreshToken(sendData,that).then(res => {
    Actions.changeUserInfo(res)
    setNewToken(res.token)
    console.log(url, data)
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