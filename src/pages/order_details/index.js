/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-11 10:54:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import NoTitleCard from '@c/no_title_card/index.js'
import SendCityComponent from './components/send_city/index.js'
import ReceiveCityComponent from './components/receive_city/index.js'
import ServiceDetailsComponent from './components/service_details/index.js'
import PriceDetailsComponent from './components/price_details/index.js'
import FooterDetailsComponent from './components/footer_details/index.js'
import './index.styl'

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
      <View className='page-wrapper'>
        <View className='page-main'>
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
        <View className='page-footer'>
          <FooterDetailsComponent></FooterDetailsComponent>
        </View>
      </View>
    )
  }
}