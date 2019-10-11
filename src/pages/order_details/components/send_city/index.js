/*
 * @Author: guorui
 * @description: 订单详情中发车城市的组件
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-11 10:15:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import './index.styl'

class SendCityComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendCityId: 0, //发车城市
      sendCityName: '', //发车城市名称
      sendAddress: '', //发车城市详细地址
      sendPerson: '', //发车城市联系人
      sendMobile: '', //发车城市联系方式
      sendCardNo: '' //发车城市联系人身份证号
    }
    this.pageParams = {}
  }
  
  componentDidShow() {
    this.pageParams = this.$router.params || {}
    console.log(this.pageParams, "页面参数")
    this.getOrderDetails()
  }
  
  /**
   * @description: 获取订单详情--发车城市信息
   * @param {type} 
   * @return: 
   */
  getOrderDetails() {
    if (!this.pageParams.order_id) {
      Taro.navigateBack()
      return;
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      orderId: this.pageParams.order_id
    }
    api.order.getOrderDetails(sendData, this)
      .then(res => {
        this.setState({
          sendCityId: res.sendCityId,
          sendCityName: res.sendCityName,
          sendAddress: res.sendAddress,
          sendPerson: res.sendPerson,
          sendMobile: res.sendMobile,
          sendCardNo: res.sendCardNo
        })
        Taro.hideLoading()
      })
    }
  
  render() {
    let {
      sendCityId,
      sendCityName,
      sendAddress,
      sendPerson,
      sendMobile,
      sendCardNo
    } = this.state
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>发车城市:</View>
          <View className='details-form-content'>{sendCityId !== 0 ? sendCityName : ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>详细信息:</View>
          <View className='details-form-content'>{sendAddress}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系人:</View>
          <View className='details-form-content'>{sendPerson}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>{sendMobile}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>身份证号:</View>
          <View className='details-form-content'>{sendCardNo}</View>
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
export default connect(mapStateToProps)(SendCityComponent)