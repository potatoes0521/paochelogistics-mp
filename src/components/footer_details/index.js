/*
 * @Author: guorui
 * @description: 订单详情--底部详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-23 10:59:37
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro' 
import { View } from '@tarojs/components'
import OrderFooterCard from '../order_footer_card/index.js'
import FooterStatusComponent from '../footer_status/index.js'
import './index.styl'

export default class FooterDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  } 

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render () {
    return (
      <View className='footer-details-wrapper'>
        <OrderFooterCard>
          <FooterStatusComponent></FooterStatusComponent>
        </OrderFooterCard>
      </View>
    )
  }
}