/*
 * @Author: liuYang
 * @description: 处理进入小程序的分享
 * @Date: 2019-11-06 12:25:04
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-21 16:38:53
 * @mustParam: 
 * // share_type 
 *  1 分享给客户 
 *  2 分享砍价 
 *  3 找人代付 
 *  4 车源列表 
 *  5 车源详情
 *  6 车务列表
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import { requestBargain } from '@utils/get_user_info.js'
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
  } else if (pageParams.share_type === '4') {
    Taro.navigateTo({
      url: `/pages/used_car/index`
    })
  } else if (pageParams.share_type === '5') {
    if (+userInfo.userId) { // 注册了去详情页
      navigateToUsedCarDetails(pageParams)
    } else if (!userInfo.userId) { // 如果没有注册去注册
      let str = ''
      for (let i in pageParams) {
        str += i + '=' + pageParams[i] + '&'
      }
      Taro.navigateTo({
        url: `/pages/register/index?${str}`
      })
    }
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
  console.log(pageParams, '分享的参数')
  if (pageParams.share_type === '1' || pageParams.share_type === '2') {
    if (+userInfo.userId === +pageParams.c_id) { // 当前用户是订单客户
      console.log("当前用户")
      return Promise.resolve(true)
    } else if (!userInfo.userId) { // 如果没有注册去注册
      console.log("未注册")
      let str = ''
      for (let i in pageParams) {
        str += i + '=' + pageParams[i] + '&'
      }
      Taro.redirectTo({
        url: `/pages/register/index?${str}`
      })
      return Promise.resolve(false)
    } else if (+userInfo.userId !== +pageParams.c_id) { // 不是本人的订单就去首页
      console.log("去首页")
      Taro.switchTab({
        url: '/pages/index/index'
      })
      return Promise.resolve(false)
    }
  // 如果是代付
  } else if (pageParams.share_type === '3') {
    return Promise.resolve(true)
  }
}
 /**
  * 处理注册后面的分享
  * @param {Object} pageParams 分享参数
  * @param {Object} userInfo 用户信息
  * @param {wxUserInfo} wxUserInfo 微信授权信息
  * @param {that} that this
  * @return void
  */
export const handleRegisterShare = ({ pageParams, userInfo, wxUserInfo, that }) => {
  console.log(pageParams, userInfo, wxUserInfo)
  if (pageParams.share_type === '1') {
    console.log('pageParams', pageParams)
    if (+userInfo.userId === +pageParams.c_id) {
      redirectToOrderDetails(pageParams)  // 是客户本身  
    } else if (+userInfo.userId !== +pageParams.c_id) {
      // 不是客户本人
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }
  } else if (pageParams.share_type === '2') {
    // 分享砍价
    let pages = Taro.getCurrentPages(); //  获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    console.log('prevPage', prevPage)
    prevPage.$component.setState({
      userInfoFromWX: wxUserInfo
    }, () => {
        requestBargain(that, 1).then(res => {
        if (res && !res.code) {
          prevPage.$component.setState({
            bargainPrice: (res / 100).toFixed(2),
            showBargainBox: true
          }, () => {
            Taro.navigateBack()
          })
        } else {
          Taro.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            Taro.navigateBack()
          }, 1900)
        }
      })
    })
  } else if (pageParams.share_type === '5') {
    navigateToUsedCarDetails(pageParams)
  }else {
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
    url: `/pages/order_details/index?order_code=${pageParams.order_code}`
  })
}
 /**
  * 关闭当前页面进入详情页
  * @param {Object} pageParams 参数描述
  * @return void
  */
export const redirectToOrderDetails = (pageParams) => {
  Taro.redirectTo({
    url: `/pages/order_details/index?order_code=${pageParams.order_code}`
  })
}
/**
 * 导航到车源详情页
 * @param {Object} pageParams 参数描述
 * @return void
 */
export const navigateToUsedCarDetails = (pageParams) => {
  Taro.navigateTo({
    url: `/pages/used_car_details/index?carSourceId=${pageParams.carSourceId}`
  })
}
