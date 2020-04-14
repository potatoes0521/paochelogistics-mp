/*
 * @Author: liuYang
 * @description: 询价单公共组件页面
 * @Date: 2019-09-23 10:49:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-14 12:14:33
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
import RescueIcon from '@c/rescue_icon/index.js'
import './index.styl'

export default class OfferItem extends Component { 
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
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
        'disabled-text': item.status === 30 || item.status === 40
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
          <View className='title-time'>{item.inquiryTimeDesc || ''}</View>
          <View className={offerStatusClassName}>{item.statusDesc || ''}</View>
        </View>
        <View className='item-main'>
          <View className='item-city'>
            <Text>{item.sendCityName || ''}</Text>
            <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
            <Text>{item.receiveCityName || ''}</Text>
          </View>
          <View className='list-item'>发车时间：{item.sendTimeDesc || ''}</View>
          {
            ((item.storePickup || item.homeDelivery) && item.inquiryType === 1) && (
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
              )
          }
          {
            item.inquiryType === 2 && (
              <View className='rescue-icon-position-wrapper'>
                <RescueIcon type='big' />
              </View>
            )
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