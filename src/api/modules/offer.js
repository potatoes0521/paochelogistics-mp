/*
 * @Author: liuYang
 * @description: 询价单接口
 * @Date: 2019-09-26 11:23:26
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 15:08:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js'

export default {
  // 询价单新增
  submitOffer(data, that) {
    return requestHandle.post(`inquiryorder/add`, data, that);
  },
  // 询价单取消询价
  cancelOffer(data, that) {
    return requestHandle.post(`inquiryorder/cancel/${data.inquiryId}`, data, that);
  },
  // 询价单详情
  getOfferDetails(data, that) {
    return requestHandle.get(`inquiryorder/detail`, data, that);
  },
  // 获取询价单列表
  getOfferList(data, that) {
    return requestHandle.get(`inquiryorder/list`, data, that)
  },
  // 询价单失效，再次询价
  getReinquiryOrder(data, that) {
    return requestHandle.post(`inquiryorder/reinquiry/${data.inquiryId}`, data, that);
  },
  // 询价单催报价
  getPromptOffer(data, that) {
    return requestHandle.post(`inquiryorder/urge/${data.inquiryId}`, data, that);
  },
}