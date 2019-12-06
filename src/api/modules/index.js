/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-05 13:44:42
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-06 15:47:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js'

export default {
  // 获取banner数据
  getBannerList(data, that) {
    return requestHandle.get('banner/list', data, that)
  },
  getRecommendList(data, that) {
    return requestHandle.get('hotline/gethotline', data, that)
  }
}