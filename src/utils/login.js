/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-10-10 09:33:18
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-10 13:36:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import Actions from '@store/actions/index.js'
import refreshToken from './refresh_token.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
// eslint-disable-next-line import/first
import Storage from '@utils/storage.js'

export default {
  /**
   * 获取缓存的openId
   * @return void
   */
  getOpenId(that) {
    Storage.getStorage('openId').then(res => {
      if (res) {
        const openId = res
        Actions.changeUserInfo({
          openId: openId
        })
        this.login(openId, that);
      } else {
        this.getCode(that)
      }
    })
  },
  /**
   * 获取code  然后去换openid
   * @return void
   */
  getCode(that, notLogin = false) {
    return new Promise((resolve) => {
      Taro.getSystemInfo()
        .then(res => {
          const phoneMsg = res.model + '-' + res.system + '-' + res.SDKVersion
          Actions.changeUserInfo({
            userAgent: phoneMsg
          })
        })
      Taro.login().then(res => {
        this.codeExchangeOpenID(res.code, that, resolve, notLogin)
      }).catch(err => {
        console.log(err, 'code 获取失败')
      })
    })
  },
  /**
   * code换openid
   * @param {String} code wx.login获取的code
   * @return void
   */
  codeExchangeOpenID(code, that, resolve, notLogin = false) {
    let sendData = {
      code
    }
    api.user.codeExchangeOpenID(sendData, that).then(res => {
      let openId = res.openid;
      Storage.setStorage('openId', res.openid)
      Actions.changeUserInfo({
        openId: openId
      })
      if (notLogin) return
      this.login(openId, that, resolve);
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 使用openID登录
   * @param {String} openId
   * @param {Object} that   this对象
   * @return void
   */
  login(openId, that, resolve) {
    let sendData = {
      token: that.props.userInfo.token,
      openId
    }
    api.user.loginUseOpenID(sendData, that).then(res => {
      if (res) {
        Storage.setStorage('token', res.token)
        delete res.userAgent
        res.nickName = decodeURIComponent(res.nickName)
        for (let i in res) {
          if (i === null) {
            delete res[i]
          }
        }
        let resData = Object.assign({}, res)
        if (!sendData.token || sendData.token !== resData.token) {
          refreshToken.setNewToken(resData.token)
        }
        Actions.changeUserInfo(resData)
      }
      resolve()
    })
  }
}