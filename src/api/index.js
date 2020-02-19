/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-19 10:52:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import user from './modules/user.js'; // 用户接口
import offer from './modules/offer.js'; // 询价接口
import order from './modules/order.js'; // 订单接口
import city from './modules/city.js'; // 城市接口
import customer from './modules/customer.js'; // 客户信息接口
import transport from './modules/transport.js'; // 运力信息接口
import pay from './modules/pay.js'; // 支付信息接口
import index from './modules/index.js'; // 首页的接口
import tool from './modules/tool.js'; // 工具的接口
import car from './modules/car.js'; // 车源的接口

export default {
  tool,
  index,
  user,
  offer,
  order,
  city,
  customer,
  transport,
  pay,
  car
}