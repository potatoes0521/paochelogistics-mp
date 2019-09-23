/*
 * @Author: guorui
 * @description: 订单详情底部--订单状态组件
 * @Date: 2019-09-23 09:38:16
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-23 10:27:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro' 
import { View } from '@tarojs/components'
import './index.styl'

export default class OrderFooterCard extends Component {
  static options = {
    addGlobalClass: true    // 允许外部样式修改组件样式
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View className='footer-wrapper'>
        {this.props.children}
      </View>
    )
  }
}