/*
 * @Author: guorui
 * @description: 请填写描述信息
 * @Date: 2020-02-19 15:10:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-20 20:13:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.styl'

export default class UsedCarItem extends Component {
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  constructor(props) {
    super(props)
  }
  /**
   * 跳转到车源详情
   * @return void
   */
  navigatorToUsedCarDetails() {
    let {
      item,
      from
    } = this.props
    if (from && from === 'publish') {
      this.props.onClickEditBtn(item)
    } else {
      Taro.navigateTo({
        url: `/pages/used_car_details/index?carSourceId=${item.carSourceId}`
      })
    }
  }
  lowerCarMsg(event) { 
    event.stopPropagation();
    Taro.showModal({
      title: '提示',
      content: '改操作会下架车源信息, 是否确认',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
  render() {
    let {
      item,
      from
    } = this.props
    return (
      <View className='car-item' onClick={this.navigatorToUsedCarDetails}>
        <View className='car-img-wrapper'>
          <Image src={item.carImg} mode='aspectFill' className='car-imag'></Image>
        </View>
        <View className='car-des-wrapper'>
          <View className='car-des-title'>
            <Text className='car-title' space='ensp'>{item.masterBrandName || ''} </Text>
            <Text className='car-title' space='ensp'>{item.carSerial || ''} </Text>
            <Text className='car-title' space='ensp'>{item.yearType || ''}款 </Text>
            <Text className='car-title' space='ensp'>{item.gasDisplacement || ''} </Text>
            <Text className='car-title'>{item.carBasic || ''}</Text>
          </View>
          <View className='car-des'>
            <Text className='car-des-time'>{item.yearType || ''}年</Text>
            <Text className='car-des-time'>/</Text>
            <Text className='car-des-time'>{item.mileage || ''}万公里</Text>
          </View>
          <View className='car-des-money'>
            <Text className='car-des-price'>{item.carPrice / 100}万</Text>
            <View className='car-des-data'>
              {
                from !== 'publish' ?
                  <Block>
                    <View className='car-des-data-wrapper' >
                      <Text className='history-icon iconfont iconliulan'></Text>
                      <Text className='history-text'>{item.browseHistoryCount || 0}</Text>
                    </View>
                    <View className='car-des-data-wrapper has-width'>
                      <Text className='history-icon iconfont iconlianxiwomen'></Text>
                      <Text className='history-text'>{item.callHistoryCount || 0}</Text>
                    </View>
                  </Block>
                  : 
                  <Block>
                    <View className='lower-btn' onClick={this.lowerCarMsg.bind(this)}>下架</View>
                  </Block>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

UsedCarItem.defaultProps = {
  item: {},
  from: 'publish'
}

UsedCarItem.propTypes = {
  item: PropTypes.object,
  from: PropTypes.string
}