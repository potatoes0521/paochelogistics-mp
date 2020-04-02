/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-23 13:50:52
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-01 18:01:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'

import './index.styl'

export default class index extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state={}
  }
  callService() { 
    Taro.makePhoneCall({
      phoneNumber: '400-9698-256'
    })
  }
  render() {
    return (
      <View className='call-service-wrapper' onClick={this.callService}>
        <Text className='iconkefu iconfont call-service-icon'></Text>
        <View className='call-service-text'>客服</View>
      </View>
    )
  }

}