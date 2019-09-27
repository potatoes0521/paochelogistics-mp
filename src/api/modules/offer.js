/*
 * @Author: liuYang
 * @description: 询价单接口
 * @Date: 2019-09-26 11:23:26
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-26 13:37:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // code换openID
  fn(data, that) {
    return requestHandle.get(`user/getwechatopenid`, data, that);
  },
}