/*
 * @Author: liuYang
 * @description: 用户中心
 * @Date: 2019-09-26 11:23:16
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-12 16:07:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

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
  // 获取手机验证码
  getVerificationCode(data, that) {
    return requestHandle.post('code/sendverificationcode', data, that);
  },
  // 根据ID获取更多用户信息
  getUserInfo(data, that) {
    return requestHandle.get('user/getuserinfobyuserid', data, that);
  },
  // 编辑用户信息
  editUserInfo(data, that) {
    return requestHandle.post('user/editUser', data, that);
  }
}