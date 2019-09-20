/*
 * @Author: liuYang
 * @description: 无标题卡片样式组件
 * @Date: 2019-09-20 15:19:28
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 17:33:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.styl'

export default class Card extends Component {
  static options = {
    addGlobalClass: true    // 允许外部样式修改组件样式
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View className='card-wrapper'>
        {this.props.children}
      </View>
    )
  }
}
