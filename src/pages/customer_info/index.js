/*
 * @Author: liuYang
 * @description: 客户信息列表
 * @Date: 2019-09-27 15:38:07
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-29 13:47:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class MineInfo extends Component { 
  config = {
    navigationBarTitleText: '客户信息列表'
  }
  render() { 
    return (
      <View className='page-wrapper'>
        <View className='search-wrapper'>
          <View className='search-main'>
            <View className='iconfont iconyunshuzhong icon-search-style'></View>
            <View className='input'>
              <Input></Input>
            </View>
          </View>
        </View>
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