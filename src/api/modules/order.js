/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-26 11:23:34
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-08 18:56:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取订单详情
  getOrderDetails(data, that) {
    return requestHandle.get(`order/detailbycode/${data.orderCode}`, data, that);
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
    return requestHandle.post(`order/submit`, data, that);
  },
  // 根据订单id获取位置
  getOrderTransportList(data, that) { 
    return requestHandle.get(`position/list/${data.orderId}`, data, that);
  },
  // 获取订单砍价详情
  getOrderBargainDetail(data, that) {
    return requestHandle.get(`order/orderbargaindetail/${data.orderCode}`, data, that);
  },
  // 分享砍价接口
  bargainPrice(data, that) {
    return requestHandle.post(`order/bargainprice`, data, that);
  },
}