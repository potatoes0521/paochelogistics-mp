/*
 * @Author: guorui
 * @description: 询价单内容
 * @Date: 2019-09-23 14:51:02
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-23 17:13:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import '@c/all_order_pages/order_card/index.styl'
import './index.styl'

export default class OfferInfoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true //判断订单是否询价
    }
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render() {
    let {
      visible
    } = this.state
    return (
      <View className='info-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>报价状态:</View>
          {
            (visible === true) ?
              <View className='details-form-content font-color'>￥2189.00</View>
              :
              <View className='details-form-content font-color'>未报价</View>
          }
        </View>
        {
          (visible === true) ?
            <View className='details-form-item'>
              <View className='details-form-label'>报价有效期至:</View>
              <View className='details-form-content font-color'>2019-09-20</View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>预计发车时间:</View>
          <View className='details-form-content'>2019-09-20</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>发车城市:</View>
          <View className='details-form-content'>北京</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>收车城市:</View>
          <View className='details-form-content'>上海</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>服务:</View>
          <View className='details-form-content'>点到门</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>车辆信息:</View>
          <View className='details-form-content'>小客车</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>台数:</View>
          <View className='details-form-content'>1辆</View>
        </View>
        {
          (visible === true) ?
            <View className='details-form-item'>
              <View className='details-form-label'>报价时间:</View>
              <View className='details-form-content'>2019-09-17 15:30:54</View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>询价时间:</View>
          <View className='details-form-content'>2019-09-17 15:30:54</View>
        </View>
      </View>
    )
  }
}