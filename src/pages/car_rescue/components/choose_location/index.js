/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 19:18:29
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-12 19:20:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.styl'

export default class ChooseLocation extends Component { 

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
    let {  } = this.props
    return (
      <View className='choose-location-wrapper'>
        <View className='choose-location-item'>
          <View className='item-left-wrapper'>
            <View className='circular-public now-location'></View>
            <View className='label placeholder-class'></View>
          </View>
          <View className='right-icon iconfont iconxiangyouxuanzejiantoux'></View>
        </View>
        <View className='line'></View>
        <View className='choose-location-item'>
          <View className='item-left-wrapper'>
            <View className='circular-public target-location'></View>
            <View className='label placeholder-class'></View>
          </View>
          <View className='right-icon iconfont iconxiangyouxuanzejiantoux'></View>
        </View>
      </View>
    )
  }

}

ChooseLocation.defaultProps = {
  onClick: () => {}
}

ChooseLocation.propTypes = {
  onClick: PropTypes.func.isRequired
}