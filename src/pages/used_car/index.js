/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-17 12:28:08
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-17 12:28:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import api from '@api/index.js'
import FloatBtn from '@c/float_btn/index.js'

import './index.styl'

class UsedCar extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '车源' 
  }

  render() {
    return (
      <View className='page-wrapper'>
        <View className='tabs-wrapper'>
          <View className='tabs-item'>
            <Text className='tab-text'>地区</Text>
            <Text className='car-tab-icon iconfont iconsanjiaoxing'></Text>
          </View>
          <View className='tabs-item'>
            <Text className='tab-text'>品牌</Text>
            <Text className='car-tab-icon iconfont iconsanjiaoxing'></Text>
          </View>
          <View className='tabs-item'>
            <Text className='tab-text'>价格</Text>
            <Text className='car-tab-icon iconfont iconsanjiaoxing'></Text>
          </View>
        </View>
        <View className='car-list-wrapper'>
          <View className='car-item'>
            <View className='car-img-wrapper'>
              <Image src='' mode='aspectFill' className='car-imag'></Image>
            </View>
            <View className='car-des-wrapper'>
              <View className='car-des-title'>111</View>
              <View className='car-des-time'>111</View>
              <View className='car-des-money'>
                <Text className='car-des-price'>999</Text>
                <View className='car-des-data'>
                  <View className='car-des-data-wrapper' >
                    <Text className='history-icon iconfont iconliulan'></Text>
                    <Text className='history-text'>99</Text>
                  </View>
                  <View className='car-des-data-wrapper has-width'>
                    <Text className='history-icon iconfont iconlianxiwomen'></Text>
                    <Text className='history-text'>99</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <FloatBtn></FloatBtn>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(UsedCar)