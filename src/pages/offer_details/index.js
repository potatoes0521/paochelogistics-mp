/*
 * @Author: guorui
 * @description: 询价单详情
 * @Date: 2019-09-23 14:33:39
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-27 15:17:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import OfferDetailsComponent from './components/offer_details/index.js'
import './index.styl'

export default class OfferDetails extends Component {
  constructor(props) {
    super(props);
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '询价单详情'
  } 

  render() {
    return (
      <View className='page-wrapper'>
        <OfferDetailsComponent></OfferDetailsComponent>
      </View>
    )
  }
}