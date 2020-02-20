/*
 * @Author: guorui
 * @description: 请填写描述信息
 * @Date: 2020-02-19 15:10:11
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-20 09:20:46
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.styl'

export default class UsedCarItem extends Component {
  constructor(props) {
    super(props)
  }
  /**
   * 跳转到车源详情
   * @return void
   */
  navigatorToUsedCarDetails() {
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/used_car_details/index?carSourceId=${item.carSourceId}`
    })
  }
  render() {
    let {item} = this.props
    return (
      <View className='car-item' onClick={this.navigatorToUsedCarDetails}>
        <View className='car-img-wrapper'>
          <Image src={item.carImg} mode='aspectFill' className='car-imag'></Image>
        </View>
        <View className='car-des-wrapper'>
          <View className='car-des-title'>
            <Text className='car-title' space='ensp'>{item.masterBrandName || ''}</Text>
            <Text className='car-title' space='ensp'>{item.carSerial || ''}</Text>
            <Text className='car-title' space='ensp'>{item.carBasic || ''}款</Text>
            <Text className='car-title' space='ensp'>{item.gasDisplacement || ''}</Text>
            <Text className='car-title'>{item.carSerial || ''}</Text>
          </View>
          <View className='car-des'>
            <Text className='car-des-time'>{item.yearType || ''}年</Text>
            <Text className='car-des-time'>/</Text>
            <Text className='car-des-time'>{item.mileage || ''}万公里</Text>
          </View>
          <View className='car-des-money'>
            <Text className='car-des-price'>{item.carPrice}万</Text>
            <View className='car-des-data'>
              <View className='car-des-data-wrapper' >
                <Text className='history-icon iconfont iconliulan'></Text>
                <Text className='history-text'>{item.browseHistoryCount || '222'}</Text>
              </View>
              <View className='car-des-data-wrapper has-width'>
                <Text className='history-icon iconfont iconlianxiwomen'></Text>
                <Text className='history-text'>{item.callHistoryCount || '222'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

UsedCarItem.defaultProps = {
  item: {}
}

UsedCarItem.propTypes = {
  item: PropTypes.object
}