/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-23 14:30:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import OrderComponent from '../order_card/index.js.js.js'
// eslint-disable-next-line import/first
import NoTitleCard from './node_modules/@c/no_title_card/index.js.js'
import ServiceDetailsComponent from '../service_details/index.js.js.js'
import PriceDetailsComponent from '../price_details/index.js.js.js'

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
        <NoTitleCard>
          <OrderComponent></OrderComponent>
          <View className='dividing-line'></View>
          <OrderComponent></OrderComponent>
          <View className='dividing-line'></View>
          <ServiceDetailsComponent></ServiceDetailsComponent>
          <View className='dividing-line'></View>
          <PriceDetailsComponent></PriceDetailsComponent>
        </NoTitleCard>
      </View>
    )
  }
}