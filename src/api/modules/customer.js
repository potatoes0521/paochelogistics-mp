/*
 * @Author: liuYang
 * @description: 客户管理
 * @Date: 2019-10-08 15:54:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-14 11:58:21
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
    return requestHandle.post('user/editcustomer', data, that);
  },
  // 获取商户列表
  getMerchantList(data, that) {
    return requestHandle.get('merchant/list', data, that);
  },
  // 获取区域列表
  getDistricList(data, that) {
    return requestHandle.get('district/list', data, that);
  }
}