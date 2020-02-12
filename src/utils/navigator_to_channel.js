/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-04 15:38:51
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-12 12:34:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro from '@tarojs/taro'

// eslint-disable-next-line import/prefer-default-export
export const navigatorToChannel = (item) => {
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
      title
    } = item
    if (!locationUrl) return
    locationUrl = encodeURIComponent(locationUrl)
    title = encodeURIComponent(title)
    Taro.navigateTo({
      url: `/pages/webview/index?url=${locationUrl}&title=${title}`
    })
  } else if (+item.openMode === 3) {
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