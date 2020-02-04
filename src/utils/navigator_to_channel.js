/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-04 15:38:51
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 15:51:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro from '@tarojs/taro'

// eslint-disable-next-line import/prefer-default-export
export const navigatorToChannel = (item) => {
  if (item !== 'page' && !item.type) {
    item.type = 'h5'
  }
  if (item === 'page') {
    Taro.navigateTo({
      url: '/pages/tool/index',
    })
  } else if (item.type === 'h5') {
    let {
      locationUrl,
      title
    } = item
    if (!locationUrl) return
    locationUrl = encodeURIComponent(locationUrl)
    title = encodeURIComponent(title)
    Taro.navigateTo({
      url: `/pages/webview/index?url=${locationUrl}&title=${title}`
    })
  } else if (item.type === 'mp') {
    Taro.navigateToMiniProgram({
      appId: item.appId,
      path: decodeURIComponent(item.path),
      // envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('res', res)
      }
    })
  }
}