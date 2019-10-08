/*
 * @Author: guorui
 * @description: 支付详情
 * @Date: 2019-10-08 09:30:22
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-08 11:40:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import NoTitleCard from '@c/no_title_card/index.js'
import PriceDetailsComponent from '@c/all_order_pages/price_details/index.js'
import './index.styl'

export default class PayDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true //判断是本人支付还是别人代付
    }
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '支付详情'
  } 

  render() {
    let {
      visible
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='pay-wrapper'>
          <NoTitleCard>
            {
              (visible) ?
              <PriceDetailsComponent></PriceDetailsComponent>
              :
              <View className='others-pay'>
                <View className='pay-title'>应付金额</View>
                <View className='pay-number'>￥2100.79</View>
              </View>
            }
          </NoTitleCard>
        </View>
        <View className='pay-button'>确认支付</View>
      </View>
    )
  }
}