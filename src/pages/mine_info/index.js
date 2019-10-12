/*
 * @Author: liuYang
 * @description: 个人信息
 * @Date: 2019-09-27 15:38:29
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-12 15:57:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  OpenData
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import Storage from '@utils/storage.js'
import './index.styl'

class MineInfo extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      userDetailsInfo: {}
    }
  }
  componentWillUnmount() {
    Storage.removeStorage('mine_info_details')
  }
  componentDidShow() { 
    this.getUserInfo()
  }
  /**
   * 获取用户信息
   * @return void
   */
  getUserInfo() { 
    let {userInfo} = this.props
    let sendData = {
      userId: userInfo.userId
    }
    api.user.getUserInfo(sendData, this)
      .then(res => {
        if(!res) return
        this.setState({
          userDetailsInfo: res
        })
      Storage.setStorage('mine_info_details', res)
      })
  }
  /**
   * 导航到
   * @return void
   */
  navigatorTo() { 
    Taro.navigateTo({
      url: '/pages/mine_edit/index'
    })
  }

  config = {
    navigationBarTitleText: '我的基本信息'
  }
  
  render() { 
    let { userDetailsInfo } = this.state
    return (
      <View className='page-wrapper'>
        <View className='mine-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>微信名字</View>
            <OpenData lang='zh_CN' className='item-text' type='userNickName'></OpenData>
          </View>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>{userDetailsInfo.remarkName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>{userDetailsInfo.mobile || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属经销商</View>
            <View className='item-text'>{userDetailsInfo.merchantName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>身份证号</View>
            <View className='item-text'>{userDetailsInfo.idCard || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>注册时间</View>
            <View className='item-text'>{userDetailsInfo.createTimeDesc || ''}</View>
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