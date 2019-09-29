/*
 * @Author: liuYang
 * @description: 个人信息
 * @Date: 2019-09-27 15:38:29
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 17:40:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class MineInfo extends Component { 

  navigatorTo() { 
    Taro.navigateTo({
      url: '/pages/mine_edit/index'
    })
  }

  config = {
    navigationBarTitleText: '我的基本信息'
  }
  render() { 
    return (
      <View className='page-wrapper'>
        <View className='mine-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>微信名字</View>
            <View className='item-text'>赚大钱</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>名字</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>12345678</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属经销商</View>
            <View className='item-text'>上海瑞博祥云汽车服务祥云汽车服务</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>身份证号</View>
            <View className='item-text'>赚大钱</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>微信名字</View>
            <View className='item-text'>365789015789781678</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>注册时间</View>
            <View className='item-text'>2019-09-20 15:31:56</View>
          </View>
        </View>
        <View
          className='edit-btn'
          onClick={this.navigatorTo}
        >修改</View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(MineInfo)