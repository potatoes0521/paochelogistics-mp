/*
 * @Author: liuYang
 * @description: 询价单公共组件页面
 * @Date: 2019-09-23 10:49:11
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-23 14:25:43
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
    console.log(item)
  }

  render() {
    let {item}  = this.props
    const allWrapperClassName = classNames(
      'offer-item',
      {
        'disabled-text'  : item.isActive !== 1
      }
    )
    return (
      <View
        className={allWrapperClassName}
        onClick={this.navigatorToOfferDetails}
      >
        <View className='item-title-wrapper'>
          <View className='title-time'>2019-09-11 10:30:56</View>
          <View className='offer-state'>已报价</View>
        </View>
        <View className='item-main'>
          <View className='item-city'>
            <Text>北京</Text>
            <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
            <Text>北京</Text>
          </View>
          <View className='list-item'>发车时间：2019-09-20</View>
          <View className='list-item'>服务：点到门</View>
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