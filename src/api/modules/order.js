/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-26 11:23:34
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 14:56:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取订单列表
  getOrderList(data, that) {
    return requestHandle.get(`order/list`, data, that);
  },
}