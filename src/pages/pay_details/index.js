/*
 * @Author: guorui
 * @description: 支付详情
 * @Date: 2019-10-08 09:30:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-12 09:51:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import loginHandle from '@utils/login.js'
import NoTitleCard from '@c/no_title_card/index.js'
import PriceDetailsComponent from '../order_details/components/price_details/index.js'
import './index.styl'

class PayDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true //判断是本人支付还是别人代付
    }
    this.pageParams = {}
    this.orderCode = ''
  }
  componentDidShow() { 
    this.pageParams = this.$router.params
    const { userInfo } = this.props
    if (!userInfo.userId) {
      loginHandle.getCode(this)
      setTimeout(() => {
        this.getOrderDetails()
      },1000)
    } else {
      this.getOrderDetails()
    }
  }
  getOrderDetails() { 
    let sendData = {
      orderId: this.pageParams.order_id
    }
    api.order.getOrderDetails(sendData, this).then(res => {
      this.orderCode = res.orderCode
    })
  }
  payMoney() { 
    let sendData = {
      orderCode: this.orderCode
    }
    api.pay.getPayParams(sendData, this).then(res => {
      this.weChatPay(res)
    })
    
  }
  weChatPay(params) {
    eval('console.log(1+2,"aaa")')
    Taro.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        
      },
      fail: (res) => {
        
      }
    })
  }
  //页面内的配置
  config = {
    navigationBarTitleText: '支付详情'
  } 

  render() {
    let {
      visible
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='pay-wrapper'>
          <NoTitleCard>
            {
              (visible) ?
              <PriceDetailsComponent></PriceDetailsComponent>
              :
              <View className='others-pay'>
                <View className='pay-title'>应付金额</View>
                <View className='pay-number'>￥2100.79</View>
              </View>
            }
          </NoTitleCard>
        </View>
        <View
          className='pay-button'
          onClick={this.payMoney}
        >确认支付</View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(PayDetails)