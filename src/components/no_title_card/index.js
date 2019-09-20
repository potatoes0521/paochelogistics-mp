/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-20 15:19:28
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 15:26:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.styl'

export default class Card extends Component {
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