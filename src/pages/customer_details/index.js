/*
 * @Author: liuYang
 * @description: 客户信息详情
 * @Date: 2019-09-27 15:43:53
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-14 17:28:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Storage from '@utils/storage.js'
import api from '@api/index.js'
import './index.styl'

class CustomerDetails extends Component { 
  constructor() { 
    super()
    this.state = {
      customerInfo: {}
    }
    this.pageParams = {}
  }
  componentWillUnmount() { 
    // Storage.removeStorage('customer_details')
  }
  componentDidShow() {
    this.pageParams = this.$router.params || {}
    this.getCustomerDetails()
  }
  /**
   * 获取客户信息详情
   * @return void
   */
  getCustomerDetails() {
    if (!this.pageParams.userId) {
      Taro.navigateBack()
      return;
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      userId: this.pageParams.userId
    }
    console.log(this,'this')
    api.customer.getCustomerDetails(sendData, this).then(res => {
      if (!res) return
      this.setState({
        customerInfo: res
      })
      Storage.setStorage('customer_details', res)
    })
  }
  /**
   * 导航到客户详情
   * @return void
   */
  navigatorTo() { 
    Taro.navigateTo({
      url: '/pages/customer_edit/index?pageType=edit'
    })
  }
  config = {
    navigationBarTitleText: '客户信息'
  }
  render() { 
    let {customerInfo} = this.state
    return (
      <View className='page-wrapper'>
        <View className='customer-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>{customerInfo.remarkName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>{customerInfo.mobile || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属经销商</View>
            <View className='item-text'>{customerInfo.merchantName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属区域</View>
            <View className='item-text'>{customerInfo.districtName || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>身份证号</View>
            <View className='item-text'>{customerInfo.idCard || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>添加时间</View>
            <View className='item-text'>{customerInfo.createTimeDesc || ''}</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>最后更新时间</View>
            <View className='item-text'>{customerInfo.updateTimeDesc || ''}</View>
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
export default connect(mapStateToProps)(CustomerDetails)