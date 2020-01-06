/*
 * @Author: liuYang
 * @description: 获取授权
 * @Date: 2019-11-07 13:45:09
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-06 11:15:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import api from '@api/index.js'
 /**
  * 获取授权列表查看已授权
  * @return void
  */
export const getSetting = () => {
  return new Promise(resolve => {
    Taro.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
  
}
 /**
  * 获取用户授权
  * @return void
  */
export const getUserInfo = () => {
  return new Promise(resolve => {
    Taro.getUserInfo({
      lang: 'zh_CN',
      success: (res) => {
        resolve(res.userInfo)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}
 /**
  * 砍价
  * @param {Object} that this
  * @param {Number} newUser // newUser 0 老客户  1新客户
  * @return void
  */
export const requestBargain = (that, newUser) => {
  return new Promise(resolve => {
    let { order_code } = that.pageParams
    let { userId } = that.props.userInfo
    console.log('that.state', that.state.userInfoFromWX)
    console.log('that.props', that.props.userInfo)
    let sendData = Object.assign({}, that.state.userInfoFromWX, {
      userPhoto: that.props.userInfo.avatarUrl,
      userId,
      orderCode: order_code,
      nickName: encodeURIComponent(that.props.userInfo.nickName),
      newUser
    })
    api.order.bargainPrice(sendData, that)
      .then(res => {
        Taro.hideLoading()
        resolve(res)
      })
  })
}
