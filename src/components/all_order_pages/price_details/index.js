/*
 * @Author: guorui
 * @description: 订单详情中发车城市、收车城市的组件
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 16:50:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import '../send_city/index.styl'
import './index.styl'

export default class PriceDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true //判断立即支付立减字段是否显示
    }
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render() { 
    let {
      visible
    } = this.state
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>报价:</View>
          <View className='details-form-price'>￥2189.00</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>帮砍价:</View>
          <View className='details-form-price'>-￥38.21</View>
        </View>
        {
          (visible ) ?
            <View className='details-form-item'>
              <View className='details-form-label'>立即支付立减:</View>
              <View className='details-form-price'>-￥50</View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>应付金额:</View>
          <View className='details-form-price'>￥2100.79</View>
        </View>
      </View>
    )
  }
}