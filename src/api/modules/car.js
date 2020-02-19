/*
 * @Author: guorui
 * @description: 车源相关接口
 * @Date: 2020-02-19 10:30:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-19 21:02:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取车源列表
  getCarSourceList(data, that) {
    return requestHandle.post('carsource/submit', data, that);
  },
  // 获取车源详情
  getCarSourceDetails(data, that) {
    return requestHandle.get('carsource/detail', data, that);
  },
  // 获取汽车品牌
  getCarBrand(data, that) {
    return requestHandle.get('carsource/brandlist', data, that);
  },
  // 获取汽车品牌
  submitPublish(data, that) {
    return requestHandle.post('carsource/submit', data, that);
  },
}