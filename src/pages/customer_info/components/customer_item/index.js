/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-10-12 10:44:03
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-25 14:36:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import '../../../../assets/icon_font/icon.scss'

import './index.styl'

export default class CustomerItem extends Component {
  render() {
    let {item} = this.props
    return (
      <View className='customer-item'>
        <View className='customer-left'>
          <View className='customer-msg'>
            <View className='name'>{item.remarkName || ''}</View>
            <View className='phone'>{item.mobile || ''}</View>
          </View>
          <View className='customer-company'>{item.merchantName || ''}</View>
        </View>
        <View className='customer-right'>
          <View className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></View>
        </View>
      </View>
    )
  }
}

CustomerItem.defaultProps = {
  item: {}
}

CustomerItem.propTypes = {
  item: PropTypes.object
}