/*
 * @Author: liuYang
 * @description: 司机信息面板
 * @Date: 2019-09-24 13:45:15
 * @LastEditors: guorui
 * @LastEditTime: 2019-11-28 14:01:58
 * @mustParam: 必传参数
 *    title  String  左边显示什么
 *    item  Object  司机的基本信息
 * 
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.styl'

export default class DriverItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() { 
    const {
      item,
      title
    } = this.props
    return (
      <View className='driver-wrapper'>
        <View className='driver-item'>
          <View className='driver-title'>{title}:</View>
          <View className='driver-name driver'>{item.realName}</View>
        </View>
        <View className='driver'>{item.mobile}</View>
        <View className='driver'>{item.idCard}</View>
      </View>
    )
  }
}

DriverItem.defaultProps = {
  item: {},
  title: '提车司机'
}

DriverItem.propTypes = {
  title: PropTypes.string,
  item: PropTypes.object
}
