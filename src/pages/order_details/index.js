/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 17:53:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import OrderDetailsComponent from '@c/order_details/index.js'
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
          <OrderDetailsComponent></OrderDetailsComponent>
        </View>
        <View className='page-footer'>
          <View className='upper-button'>
            <View className='pay-button buttons'>立即支付
              <Text className='reduce-price'>(立减50元)</Text>
            </View>
            <View className='share-button buttons'>分享砍价</View>
          </View>
          <View className='lower-button'>
            <View className='cancel-button buttons'>取消订单</View>
            <View className='collect-button buttons'>车到付款</View>
          </View>
        </View>
      </View>
    )
  }
}