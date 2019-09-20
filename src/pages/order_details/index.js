/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-20 17:05:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
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
            <Button className='pay-button buttons'>立即支付
              <Text className='reduce-price'>(立减50元)</Text>
            </Button>
            <Button className='share-button buttons'>分享砍价</Button>
          </View>
          <View className='lower-button'>
            <Button className='cancel-button buttons'>取消订单</Button>
            <Button className='collect-button buttons'>车到付款</Button>
          </View>
        </View>
      </View>
    )
  }
}