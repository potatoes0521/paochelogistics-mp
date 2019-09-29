/*
 * @Author: liuYang
 * @description: 客户信息详情
 * @Date: 2019-09-27 15:43:53
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-29 14:34:24
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
      url: '/pages/customer_edit/index'
    })
  }
  config = {
    navigationBarTitleText: '客户信息'
  }
  render() { 
    return (
      <View className='page-wrapper'>
        <View className='customer-info-wrapper'>
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
            <View className='item-label'>添加时间</View>
            <View className='item-text'>365789015789781678</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>最后更新时间</View>
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