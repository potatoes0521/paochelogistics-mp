/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 16:43:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import SendCityComponent from '../send_city/index.js'
import ReceiveCityComponent from '../receive_city/index.js'
// eslint-disable-next-line import/first
import NoTitleCard from '@c/no_title_card/index.js'
import ServiceDetailsComponent from '../service_details/index.js'
import PriceDetailsComponent from '../price_details/index.js'

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
          <SendCityComponent></SendCityComponent>
          <View className='dividing-line'></View>
          <ReceiveCityComponent></ReceiveCityComponent>
          <View className='dividing-line'></View>
          <ServiceDetailsComponent></ServiceDetailsComponent>
          <View className='dividing-line'></View>
          <PriceDetailsComponent></PriceDetailsComponent>
        </NoTitleCard>
      </View>
    )
  }
}