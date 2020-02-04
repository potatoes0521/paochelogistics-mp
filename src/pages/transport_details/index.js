/*
 * @Author: liuYang
 * @description: 运力信息详情
 * @Date: 2019-09-27 15:43:53
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 20:01:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Storage from '@utils/storage.js'
import api from '@api/index.js'
import './index.styl'

class TransportDetails extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      transportInfo: {}
    }
    this.pageParams = {}
  }
  componentDidShow() {
    this.pageParams = this.$router.params || {}
    this.getTransportDetails()
  }
  /**
   * 获取运力信息详情
   * @return void
   */
  getTransportDetails() {
    if (!this.pageParams.userId) {
      Taro.navigateBack()
      return;
    }
    let sendData = {
      userId: this.pageParams.userId,
      createUserId: this.props.userInfo.userId
    }
    api.transport.getTransportDetails(sendData, this).then(res => {
      if (!res) return
      this.setState({
        transportInfo: res
      })
      Storage.setStorage('transport_details', res)
    })
  }
  /**
   * 导航到运力详情
   * @return void
   */
  navigatorTo() { 
    Taro.navigateTo({
      url: '/pages/transport_edit/index?pageType=edit'
    })
  }
  config = {
    navigationBarTitleText: '运力信息'
  }
  render() { 
    let {transportInfo} = this.state
    return (
      <View className='page-wrapper'>
        <View className='transport-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>{transportInfo.remarkName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>{transportInfo.mobile || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>经销商类型</View>
            <View className='item-text'>{transportInfo.merchantTypeDesc || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>经销商名称</View>
            <View className='item-text'>{transportInfo.merchantName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属区域</View>
            <View className='item-text'>{transportInfo.districtName || ''}</View>
          </View>
          {/* <View className='info-item'>
            <View className='item-label'>身份证号</View>
            <View className='item-text'>{transportInfo.idCard || ''}</View>
          </View> */}
          <View className='info-item'>
            <View className='item-label'>添加时间</View>
            <View className='item-text'>{transportInfo.createTimeDesc || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>最后更新时间</View>
            <View className='item-text'>{transportInfo.updateTimeDesc || ''}</View>
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
export default connect(mapStateToProps)(TransportDetails)