/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-20 10:38:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import OrderDetailsComponent from '@c/order_details/index.js'

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '订单详情'
  }

  render() {
    return (
      <View>
        <OrderDetailsComponent></OrderDetailsComponent>
      </View>
    )
  }
}