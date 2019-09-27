/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-27 15:47:35
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 15:47:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class MineInfo extends Component { 
  config = {
    navigationBarTitleText: '添加客户'
  }
  render() { 
    return (
      <View className='page-wrapper'>
        我的 基本信息 
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