/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-26 11:23:34
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-08 17:23:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取订单详情
  getOrderDetails(data, that) {
    return requestHandle.get(`order/detail`, data, that);
  },
  // 获取订单列表
  getOrderList(data, that) {
    return requestHandle.get(`order/list`, data, that);
  },
  // 订单立即支付
  payOrder(data, that) {
    return requestHandle.post(`order/pay`, data, that);
  },
  // 订单下单
  placeOrder(data, that) {
    return requestHandle.post(`order/place`, data, that);
  },
}