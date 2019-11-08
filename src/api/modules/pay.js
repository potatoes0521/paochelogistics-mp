/*
 * @Author: liuYang
 * @description: 支付
 * @Date: 2019-10-10 11:26:30
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-08 19:39:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  getPayParams(data, that) {
    return requestHandle.post(`pay/wxpay/${data.orderId}`, data, that);
  },
  payCallBack(data, that) {
    return requestHandle.post(`pay/wxnotify`, data, that);
  },
}