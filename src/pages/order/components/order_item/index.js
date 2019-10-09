/*
 * @Author: liuYang
 * @description: 订单item
 * @Date: 2019-09-23 14:42:25
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-09 15:35:39
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

  navigatorTo(pageName) { 
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/${pageName}/index?order_id=${item.orderId}`
    })
  }
  
  render() {
    let { item } = this.props
    const offerMsg = item && item.inquiryOrderVO
    const allWrapperClassName = classNames(
      'order-item',
      {
        'order-over': item.isActive !== 1
      }
    )
    return (
      <View
        className={allWrapperClassName}
        onClick={()=>{this.navigatorTo('offer_details')}}
      >
        <View className='msg-wrapper'>
          <View className='list-item'>
            <View className='item-city'>
              <Text>{offerMsg.sendCityName}</Text>
              <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
              <Text>
                {
                  offerMsg.receiveCityName
                }
              </Text>
              <Text className='service-type'>
                {
                  offerMsg.storePickup ? '上门提车' : ''
                }
                {
                  offerMsg.storePickup && offerMsg.homeDelivery ? '，' : ''
                }
                {
                  offerMsg.homeDelivery ? '上门送车' : ''
                }
              </Text>
            </View>
            <View className='price-wrapper price-state'>{ item.statusDesc }</View>
          </View>
          <View className='list-item list-item-msg'>
            <View className='order-msg'>
              <Text className='order-car-info'>{ offerMsg.carInfo }</Text>
              <Text>
                {
                  offerMsg.carAmount
                }
                辆
              </Text>
            </View>
            <View className='price-wrapper price-wrapper-lang'>¥{ item.payPrice ? item.payPrice : '' }</View>
          </View>
        </View>
        <View className='btn-group'>
          {/* <View className='btn cancel-order'>取消订单</View> */}
          <View
            className='btn cancel-order'
            onClick={() =>{this.navigatorTo('transport_state')}}
          >运输状态</View>
          <View className='btn pay-btn'>
            立即支付
            <Text className='small-text'>(立减50元)</Text>
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