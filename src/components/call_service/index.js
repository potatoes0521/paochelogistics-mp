/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-23 13:50:52
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-12 18:52:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.styl'

const phoneNumberList = {
  carProxy: '400-9698-256',
  carRescue: '110'
}
export default class CallService extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state={}
  }
  
  callService() { 
    Taro.makePhoneCall({
      phoneNumber: phoneNumberList[this.props.phoneNumberType]
    })
  }
  render() {
    return (
      <View className='call-service-wrapper' onClick={this.callService}>
        <Text className='iconkefu iconfont call-service-icon'></Text>
        <View className='call-service-text'>{this.props.text}</View>
      </View>
    )
  }

}

CallService.defaultProps = {
  phoneNumberType: 'carProxy',// 车务客服电话
  text: '客服'
}

CallService.propTypes = {
  phoneNumberType: PropTypes.string.isRequired,
  text: PropTypes.string
}
