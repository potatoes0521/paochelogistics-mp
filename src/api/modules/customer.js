/*
 * @Author: liuYang
 * @description: 客户管理
 * @Date: 2019-10-08 15:54:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-12 15:30:43
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取客户列表 / 搜索客户列表
  getCustomerList(data, that) {
    return requestHandle.get('user/customerlist', data, that);
  },
  // 编辑客户信息
  editCustomer(data, that) {
    return requestHandle.post('user/editCustomer', data, that);
  },
  // 获取商户列表
  getMerchantList(data, that) {
    return requestHandle.get('merchant/list', data, that);
  }
}