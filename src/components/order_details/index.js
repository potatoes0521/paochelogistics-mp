/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 15:26:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.styl'
import OrderComponent from '../order_card/index.js'
import NoTitleCard from '../no_title_card/index.js'

export default class OrderDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render () {
    return (
      <View className='details-wrapper'>
        <NoTitleCard>
          <OrderComponent></OrderComponent>
          <View className='dividing-line'></View>
          <OrderComponent></OrderComponent>
        </NoTitleCard>
      </View>
    )
  }
}