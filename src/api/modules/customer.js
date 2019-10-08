/*
 * @Author: liuYang
 * @description: 客户管理
 * @Date: 2019-10-08 15:54:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 15:55:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取城市信息
  getLocationMsg(data, that) {
    return requestHandle.get('location/cities', data, that);
  },
}