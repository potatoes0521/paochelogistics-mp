/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-04 15:38:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-21 17:30:59
 * @mustParam: 必传参数
 * openMode 打开方式 
 * 1 应用内打开H5 
 * 2 应用内页面 
 * 3 是跳转小程序
 * @optionalParam: 选传参数
 */

import Taro from '@tarojs/taro'

// eslint-disable-next-line import/prefer-default-export
export const navigatorToChannel = (item, redirect=false) => {
  if (item !== 'page' && !item.openMode) {
    item.openMode = 1
  }
  if (+item.openMode === 2 || item === 'page') {
    Taro.navigateTo({
      url: item.locationUrl,
    })
  } else if (+item.openMode === 1) {
    let {
      locationUrl,
      title,
      toolName,
    } = item
    if (!locationUrl) return
    locationUrl = encodeURIComponent(locationUrl)
    if (title) {
      title = encodeURIComponent(title)
    } else if (toolName) {
      title = encodeURIComponent(toolName)
    } else {
      title = "跑车物流"
    }
    let url = `/pages/webview/index?url=${locationUrl}&title=${title}`
    if (redirect) {
      Taro.redirectTo({
        url
      })
    } else {
      Taro.navigateTo({
        url
      })
    }
  } else if (+item.openMode === 3) {
    Taro.navigateToMiniProgram({
      appId: item.appId,
      path: decodeURIComponent(item.locationUrl),
      // envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('res', res)
      }
    })
  }
}