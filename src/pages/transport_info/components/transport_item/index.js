/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-10-12 10:44:03
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-05 09:54:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.styl'

export default class TransportItem extends Component {
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  render() {
    let {item} = this.props
    return (
      <View className='transport-item'>
        <View className='transport-left'>
          <View className='transport-msg'>
            <View className='name'>{item.remarkName || ''}</View>
            <View className='phone'>{item.mobile || ''}</View>
            {/* {item.usableDiscountNum ? <View className='discount'>砍价剩余{item.usableDiscountNum || ''}次</View> : null} */}
          </View>
          <View className='transport-company'>{item.merchantName || ''}</View>
        </View>
        <View className='transport-right'>
          <View className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></View>
        </View>
      </View>
    )
  }
}

TransportItem.defaultProps = {
  item: {}
}

TransportItem.propTypes = {
  item: PropTypes.object
}