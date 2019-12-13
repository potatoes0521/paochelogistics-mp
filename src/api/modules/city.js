/*
 * @Author: liuYang
 * @description: 城市处理接口
 * @Date: 2019-10-08 15:54:20
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-13 16:08:35
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取城市信息
  getLocationMsg(data, that) {
    return requestHandle.get('location/cities', data, that);
  },
  cityNameChangeCityID(data, that) {
    return requestHandle.get('location/citybyname', data, that, false);
  }
}