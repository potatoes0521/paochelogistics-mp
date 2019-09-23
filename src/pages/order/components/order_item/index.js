/*
 * @Author: liuYang
 * @description: 订单item
 * @Date: 2019-09-23 14:42:25
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-23 16:32:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import '../../../../assets/icon_font/icon.scss'
import './index.styl'

export default class OrderItem extends Component {
  constructor(props) {
    super(props)
  }

  navigatorToOfferDetails() { 
    let { item } = this.props
    console.log(item)
  }
  
  render() {
    let {item}  = this.props
    const allWrapperClassName = classNames(
      'order-item',
      {
        'order-over': item.isActive !== 1
      }
    )
    return (
      <View
        className={allWrapperClassName}
        onClick={this.navigatorToOfferDetails}
      >
        <View className='msg-wrapper'>
          <View className='list-item'>
            <View className='item-city'>
              <Text>北京</Text>
              <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
              <Text>
                北京北京北京
              </Text>
              <Text className='service-type'>(点到门)</Text>
            </View>
            <View className='price-wrapper price-state'>待支付</View>
          </View>
          <View className='list-item list-item-msg'>
            <View className='order-msg'>
              <Text>小客车</Text>
              <Text>1000辆</Text>
            </View>
            <View className='price-wrapper price-wrapper-lang'>¥9999,9999.00</View>
          </View>
        </View>
        <View className='btn-group'>
          {/* <View className='btn cancel-order'>取消订单</View> */}
          <View className='btn cancel-order'>运输状态</View>
          <View className='btn pay-btn'>
            立即支付
            <Text>(立减50元)</Text>
          </View>
        </View>
      </View>
    )
  }
}

OrderItem.defaultProps = {
  item: {}
}

OrderItem.propTypes = {
  item: PropTypes.object
}