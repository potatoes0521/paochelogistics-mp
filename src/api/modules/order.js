/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-26 11:23:34
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-26 11:23:34
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