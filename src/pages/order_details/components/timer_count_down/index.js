/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-14 13:44:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-14 15:18:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View,Text,Block } from '@tarojs/components'
// import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.styl'

export default class index extends Component { 

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }


  render() {
    let {
      day,
      hour,
      minute,
      second,
      tipContent
    } = this.props
    return (
      <View className='bargain-tips-wrapper'>
        <View className='time-tips'>
          <View className='tips'>优惠倒计时</View>
          <View className='timer'>
            {
              day > 0 ?
                <Block>
                  <Text className='timer-box'>{day}</Text>
                  <Text className='tips'>天</Text>
                </Block>
                : null
            }
            <Text className='timer-box'>{hour}</Text>
            <Text className='tips'>:</Text>
            <Text className='timer-box'>{minute}</Text>
            <Text className='tips'>:</Text>
            <Text className='timer-box'>{second}</Text>
          </View>
        </View>
        <View className='tips-text'>{tipContent}</View>
      </View>
    )
  }

}

index.defaultProps = {
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
  tipContent: '',
  onClick: () => {}
}

index.propTypes = {
  onClick: PropTypes.func.isRequired
}