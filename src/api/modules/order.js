/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-26 11:23:34
 * @LastEditors: guorui
 * @LastEditTime: 2019-12-10 12:09:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取订单详情
  getOrderDetails(data, that) {
    return requestHandle.get(`order/detailbycode?orderCode=${data.orderCode}`, data, that);
  },
  // 获取代付订单详情
  getOrderHelpPaymentDetails(data, that) {
    return requestHandle.get(`order/payrolldetail/orderCode=${data.orderCode}`, data, that);
  },
  // 获取订单列表
  getOrderList(data, that) {
    return requestHandle.get(`order/list`, data, that);
  },
  // 订单立即支付
  payOrder(data, that) {
    return requestHandle.post(`order/pay`, data, that);
  },
  // 订单代付支付
  payOrder(data, that) {
    return requestHandle.post(`pay/orderpay`, data, that);
  },
  // 订单下单
  placeOrder(data, that) {
    return requestHandle.post(`order/submit`, data, that);
  },
  // 订单删除
  deleteOrder(data, that) {
    return requestHandle.post(`order/delete`, data, that);
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
  // 获取司机信息
  getDriverDetail(data, that) {
    return requestHandle.get(`order/getdriver/${data.orderId}`, data, that);
  },
}