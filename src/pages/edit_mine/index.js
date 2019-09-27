/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-27 15:42:38
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 15:42:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class MineInfo extends Component { 
  config = {
    navigationBarTitleText: '个人信息完善'
  }
  render() { 
    return (
      <View className='page-wrapper'>
        个人信息完善 
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