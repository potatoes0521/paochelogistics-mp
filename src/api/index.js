/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-06 11:52:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import user from './modules/user.js'; // 用户接口
import offer from './modules/offer.js'; // 询价接口
import order from './modules/order.js'; // 订单接口
import city from './modules/city.js'; // 城市接口
import customer from './modules/customer.js'; // 客户信息接口
import pay from './modules/pay.js'; // 客户信息接口
import index from './modules/index.js'; // 首页的接口

export default {
  index,
  user,
  offer,
  order,
  city,
  customer,
  pay
}