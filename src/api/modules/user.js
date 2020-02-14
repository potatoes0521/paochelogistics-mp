/*
 * @Author: liuYang
 * @description: 用户中心
 * @Date: 2019-09-26 11:23:16
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 13:41:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // code换openID
  codeExchangeOpenID(data, that) {
    return requestHandle.get(`user/getwechatopenid`, data, that, false);
  },
  // openID登录
  loginUseOpenID(data, that) {
    return requestHandle.post('user/login', data, that, false)
  },
  // 注册
  register(data, that) {
    return requestHandle.post('user/expresslogin', data, that);
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
    return requestHandle.post('code/sendverificationcode', data, that, '短信发送中...');
  },
  // 根据ID获取更多用户信息
  getUserInfo(data, that) {
    return requestHandle.get('user/getuserinfobyuserid', data, that);
  },
  // 编辑用户信息
  editUserInfo(data, that) {
    return requestHandle.post('user/edituser', data, that);
  },
  // banner或者其他活动入口进入检测中间页
  // 判断是否实名 未实名状态返回null 已实名返回跳转的页面
  checkUserRealNameStatus(data, that) {
    return requestHandle.get('active/activeurl', data, that);
  },
  // 身份证识别ORC
  OCR(data, that) {
    return requestHandle.get('user/wechatocr', data, that, '识别中...');
  },
  // 实名认证
  realNameAuthentication(data, that) {
    return requestHandle.post('user/addIdCard', data, that, '实名认证中...');
  },
  // 获取实名信息
  getUserAuthorizeMsg(data, that) {
    return requestHandle.get('user/idcard', data, that);
  },
}