/*
 * @Author: liuYang
 * @description: 没有订单的样式
 * @Date: 2019-09-29 15:00:46
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-29 15:52:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
import noDataImg from '@img/order/no_data.png'
import './index.styl'

export default class NoData extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View className='no-data-wrapper'>
        <View className='main'>
          <Image
            className='image'
            src={noDataImg}
          ></Image>
          <View className='tips'>亲，暂时没有相关订单哦～</View>
          <View className='btn'>去询价</View>
        </View>
      </View>
    )
  }
}