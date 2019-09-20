/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-20 14:39:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import OrderComponent from '@c/order_card/index.js'

export default class OrderDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render () {
    return (
      <View className='details-wrapper'>
        <OrderComponent></OrderComponent>
        <View className='dividing-line'></View>
        <OrderComponent></OrderComponent>
      </View>
    )
  }
}