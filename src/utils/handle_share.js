/*
 * @Author: liuYang
 * @description: 处理进入小程序的分享
 * @Date: 2019-11-06 12:25:04
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-06 14:07:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
 /**
  * 处理分享的时候  判断用户是不是注册了 
  * 注册了根据 shareType干活
  * 没注册就去注册
  * @param {Object} pageParams 分享参数
  * @param {Object} userInfo 用户信息
  * @return void
  */
export const handleShare = (pageParams, userInfo) => {
  if (!pageParams.share_type) return // 没有页面参数返回
  if (pageParams.share_type === '1') {
    if (+userInfo.userId === +pageParams.c_id) {  // 当前用户是订单客户
      navigateToOrderDetails(pageParams)  // 去详情页
    } else if (!userInfo.userId) {  // 如果没有注册去注册
      let str = ''
      for (let i in pageParams) {
        str += i + '=' + pageParams[i] + '&'
      }
      Taro.navigateTo({
        url: `/pages/register/index?${str}`
      })
    }
    return
  }
}
/**
* 处理分享的时候  判断用户是不是注册了 
* 注册了根据 shareType干活
* 没注册就去注册
* @param {Object} pageParams 分享参数
* @param {Object} userInfo 用户信息
* @return void
*/
export const handleShareInOrderDetails = (pageParams, userInfo) => {
  if (!pageParams.share_type) return // 没有页面参数返回
  if (pageParams.share_type === '1') {
    if (+userInfo.userId === +pageParams.c_id) { // 当前用户是订单客户
      return Promise.resolve(true)
    } else if (!userInfo.userId) { // 如果没有注册去注册
      let str = ''
      for (let i in pageParams) {
        str += i + '=' + pageParams[i] + '&'
      }
      Taro.redirectTo({
        url: `/pages/register/index?${str}`
      })
      return Promise.resolve(false)
    } else if (+userInfo.userId !== +pageParams.c_id) { // 不是本人的订单就去首页
      Taro.switchTab({
        url: '/pages/index/index'
      })
      return Promise.resolve(false)
    }
    return
  }
}
 /**
  * 处理注册后面的分享
  * @param {Object} pageParams 分享参数
  * @param {Object} userInfo 用户信息
  * @return void
  */
export const handleRegisterShare = (pageParams, userInfo) => {
  if (pageParams.share_type === '1') {
    if (+userInfo.id === +pageParams.c_id) {
      redirectToOrderDetails(pageParams)  // 是客户本身  
    } else if (+userInfo.id !== +pageParams.c_id) {
      // 不是客户本人
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }
  } else {
    Taro.navigateBack()
  }
}
 /**
  * 导航到详情页
  * @param {Object} pageParams 参数描述
  * @return void
  */
export const navigateToOrderDetails = (pageParams) => {
  Taro.navigateTo({
    url: `/pages/order_details/index?order_id=${pageParams.order_id}`
  })
}
 /**
  * 关闭当前页面进入详情页
  * @param {Object} pageParams 参数描述
  * @return void
  */
export const redirectToOrderDetails = (pageParams) => {
  Taro.redirectTo({
    url: `/pages/order_details/index?order_id=${pageParams.order_id}`
  })
}
