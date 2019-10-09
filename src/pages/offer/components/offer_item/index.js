/*
 * @Author: liuYang
 * @description: 询价单公共组件页面
 * @Date: 2019-09-23 10:49:11
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-09 10:19:51
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

export default class OfferItem extends Component { 
  constructor(props) {
    super(props)
  }

  navigatorToOfferDetails() { 
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/offer_details/index?offer_id=${item.inquiryId}`
    })
  }

  render() {
    let { item } = this.props
    const allWrapperClassName = classNames(
      'offer-item',
      {
        'disabled-text': item.status === 30
      }
    )
    const offerStatusClassName = classNames(
      'offer-state',
      {
        'offer-state-has': item.status === 20,
        'offer-state-on': item.status === 10
      }
    )
    return (
      <View
        className={allWrapperClassName}
        onClick={this.navigatorToOfferDetails}
      >
        <View className='item-title-wrapper'>
          <View className='title-time'>{item.NewCreateTime}</View>
          <View className={offerStatusClassName}>{item.statusDesc}</View>
        </View>
        <View className='item-main'>
          <View className='item-city'>
            <Text>{item.sendCityName}</Text>
            <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
            <Text>{item.receiveCityName}</Text>
          </View>
          <View className='list-item'>发车时间：{item.sendTime && item.sendTime.split('T')[0]}</View>
          {
            (!item.storePickup && !item.homeDelivery) ?
              null :
              <View className='list-item'>
                服务：
                {
                  item.storePickup ? '上门提车' : ''
                }
                {
                  item.storePickup && item.homeDelivery ? '，' : ''
                }
                {
                  item.homeDelivery ? '上门送车' : ''
                }
              </View>
          }
        </View>
      </View>
    )
  }
}

OfferItem.defaultProps = {
  item: {}
}

OfferItem.propTypes = {
  item: PropTypes.object
}