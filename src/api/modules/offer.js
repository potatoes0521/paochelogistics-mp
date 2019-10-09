/*
 * @Author: liuYang
 * @description: 询价单接口
 * @Date: 2019-09-26 11:23:26
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-09 09:28:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js'

export default {
  submitOffer(data, that) {
    return requestHandle.post(`inquiryorder/add`, data, that)
  },
  // 获取询价单列表
  getOfferList(data, that) {
    return requestHandle.get(`inquiryorder/list`, data, that)
  },
}