/*
 * @Author: liuYang
 * @description: 支付
 * @Date: 2019-10-10 11:26:30
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-12 10:12:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取支付信息
  getPayParams(data, that) {
    return requestHandle.post(`pay/orderpay`, data, that);
  },
}