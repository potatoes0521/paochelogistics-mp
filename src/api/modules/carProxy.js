/*
 * @Author: liuYang
 * @description: 车务相关接口
 * @path: 引入路径
 * @Date: 2020-03-27 11:22:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-31 15:09:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取车务列表
  getCarProxyList(data, that) {
    return requestHandle.get('carproxy/list', data, that);
  },
  // 车务代办项目列表
  getCarProxyProjectList(data, that) {
    return requestHandle.get('carproxy/itemlist', data, that);
  },
  // 提交快递单号
  submitCarProxyExpressNum(data, that) {
    return requestHandle.post('carproxy/submitexpressnum', data, that);
  },
  // 发布编辑车务
  publishCarProxy(data, that) {
    return requestHandle.post('carproxy/submit', data, that);
  },
  // 可办理车务的城市
  getCarProxyProjectCityList(data, that) {
    return requestHandle.get('carproxy/itemlocationlist', data, that);
  },
  // 获取车务详情
  getCarProxyDetails(data, that) {
    return requestHandle.get('carproxy/detail', data, that);
  },
  // 车务退款
  carProxyRefund(data, that) {
    return requestHandle.post('carproxy/refund', data, that);
  },
}