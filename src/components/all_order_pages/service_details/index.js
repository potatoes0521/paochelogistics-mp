/*
 * @Author: guorui
 * @description: 订单详情中发车城市、收车城市的组件
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 17:04:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import '../send_city/index.styl'

export default class ServiceDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render () {
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>服务:</View>
          <View className='details-form-content'>上门提车，上门送车</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>发车时间:</View>
          <View className='details-form-content'>2019-09-20</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>车辆信息:</View>
          <View className='details-form-content'>小客车</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>台数:</View>
          <View className='details-form-content'>1辆</View>
        </View>
      </View>
    )
  }
}