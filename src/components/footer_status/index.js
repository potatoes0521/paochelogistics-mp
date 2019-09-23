/*
 * @Author: guorui
 * @description: 订单底部组件
 * @Date: 2019-09-23 10:00:22
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-23 10:17:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */ 

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'

export default class FooterStatusComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render () {
    return (
      <View className='status-wrapper'>
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
    )
  }
}