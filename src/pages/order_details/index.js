/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-23 11:11:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import OrderDetailsComponent from '@c/all_order_pages/order_details/index.js'
import FooterDetailsComponent from '@c/all_order_pages/footer_details/index.js'
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
          <FooterDetailsComponent></FooterDetailsComponent>
        </View>
      </View>
    )
  }
}