/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-31 17:43:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View,Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'

import './index.styl'

class CarProxy extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      refundReason: '请输入退款原因',
      payPrice: '0',
      payPriceDesc: '0',
    }
    this.pageParams = {}
    this.timer = null
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    this.getCarProxyDetails()
  }

  componentWillUnmount() { 
    if (!this.timer) return;
    clearTimeout(this.timer)
  }
  
  /**
   * 获取订单详情
   * @return void
   */
  getCarProxyDetails() {
    let sendData = {
      carProxyOrderId: this.pageParams.id,
      businessType: 1
    }
    api.carProxy.getCarProxyDetails(sendData, this).then(res => {
      this.setState(res)
    })
  }
  
  onReasonInput(e) { 
    let { value } = e.target
    this.setState({
      refundReason: value
    })
  }
  
  /**
   * 提交退款申请
   * @return void
   */
  submit() { 
    let {
      refundReason,
      payPrice
    } = this.state
    let sendData = {
      carProxyOrderId: this.pageParams.id,
      refundReason,
      refundAmount: payPrice
    }
    api.carProxy.carProxyRefund(sendData, this).then(() => {
      Taro.showToast({
        icon: 'none',
        title: '退款申请已提交'
      })
      this.timer = setTimeout(() => {
        Taro.navigateBack()
      }, 1800)
    })
  }

  config = {
    navigationBarTitleText: '申请退款'
  }

  render() {
    let {
      refundReason,
      payPriceDesc
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='msg-wrapper'>
          <View className='public-item'>
            <View className='item-label'>
              <View className='important'>*</View>
              <Text className='label-text'>退款原因</Text>
            </View>
            <View className='item-content'>
              <Input
                className='public-input'
                placeholder-class='placeholder-class'
                placeholder='请填写退款原因'
                value={refundReason}
                onInput={this.onReasonInput}
              ></Input>
            </View>
          </View>
          <View className='refund-wrapper'>
            <View className='top-wrapper'>
              <View className='item-label'>
                <View className='important'></View>
                <Text className='label-text'>退款金额</Text>
              </View>
              <View className='item-content'>
                ¥{payPriceDesc}
              </View>
            </View>
            <View className='tips'>不可修改，最多¥{payPriceDesc}</View>
          </View>
        </View>
        <View className='btn' onClick={()=>this.submit()}>提交申请</View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(CarProxy)