/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 11:59:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import requestHandle from './request_handle.js';

export default {
  // code换openID
  codeExchangeOpenID(data, that) {
    return requestHandle.get(`user/getwechatopenid`, data, that);
  },
  // openID登录
  loginUseOpenID(data, that) {
    return requestHandle.post('user/login', data, that)
  },
  // 注册
  register(data, that) {
    return requestHandle.post('user/register', data, that);
  },
  // 换手机号
  codeExchangePhone(data, that) {
    return requestHandle.get('user/getwechatuserinfo', data, that);
  },
  // 刷新token
  refreshToken(data, that) {
    return requestHandle.post('user/refreshtoken', data, that);
  },
}