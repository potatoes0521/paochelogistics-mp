/*
 * @Author: guorui
 * @description: 订单详情中收车城市的组件
 * @Date: 2019-10-09 16:41:49
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 17:03:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'

export default class ReceiveCityComponent extends Component {
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
          <View className='details-form-label'>收车城市:</View>
          <View className='details-form-content'>上海</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>详细信息:</View>
          <View className='details-form-content'>海淀区中关村52号创业公社B区32号楼跑车物流</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系人:</View>
          <View className='details-form-content'>张玉超</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>18611671676</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>身份证号:</View>
          <View className='details-form-content'>132674199803234567</View>
        </View>
      </View>
    )
  }
}