/*
 * @Author: guorui
 * @description: 订单底部组件
 * @Date: 2019-09-23 10:00:22
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-26 16:34:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */ 

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'

export default class FooterStatusComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true, //判断订单详情底部状态
      isShow: true //判断立即支付按钮是否显示
    }
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
   
  render() {
    let {
      visible,
      isShow
    } = this.state
    return (
      <View className='status-wrapper'>
        {
          (visible === true) ?
            <View className='immediate_payment'>
              <View className='upper-button'>
                <View className='pay-button buttons'>立即支付
                  <Text className='reduce-price'>(立减50元)</Text>
                </View>
                <View className='share-button buttons'>分享砍价</View>
              </View>
              {/* <View className='lower-button'>
                <View className='cancel-button buttons'>取消订单</View>
                <View className='collect-button buttons'>车到付款</View>
              </View> */}
            </View>
            :
            <View className='collect_payment'>
              <View className='lower-button'>
                <View className='collect-button buttons'>查看运输状态</View>
                {
                  (isShow === true) ?
                    <View className='immediate-pay buttons'>立即支付</View>
                    : null
                }
              </View>
            </View>
        }
      </View>
    )
  }
}