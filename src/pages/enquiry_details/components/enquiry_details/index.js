/*
 * @Author: guorui
 * @description: 询价单详情组件
 * @Date: 2019-09-23 14:39:59
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-23 16:51:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import NoTitleCard from '@c/no_title_card/index.js'
import EnquiryInfoComponent from '../enquiry_info/index.js'
import './index.styl'

export default class EnquiryDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true //判断询价单状态
    }
  }

  componentWillUnmount () {}
  
  componentDidShow() { }
  
  render() {
    let {
      visible
    } = this.state
    return (
      <View className='details-wrapper'>
        <NoTitleCard>
          <EnquiryInfoComponent></EnquiryInfoComponent>
        </NoTitleCard>
        {
          (visible === true) ?
            <View className='place-order'>立即下单</View>
            :
            <View className='enquiry-button'>
              <View className='cancel-enquiry'>取消询价</View>
              <View className='prompt-quotation'>催报价</View>
            </View>
        }
      </View>
    )
  }
}