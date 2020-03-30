/*
 * @Author: liuYang
 * @description: 支付详情
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-30 14:42:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'

import './index.styl'

class CarProxyPaySuccess extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      payPriceDesc: '',
      proxyOrderCode: '',
      createTimeDesc: '',
      payTimeDesc: ''
    }
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    this.getCarProxyDetails()
  }
  getCarProxyDetails() {
    let sendData = {
      carProxyOrderId: this.pageParams.id,
      businessType: 1
    }
    api.carProxy.getCarProxyDetails(sendData, this).then(res => {
      this.setState(res)
    })
  }
  navigatorBack() { 
    Taro.navigateBack()
  }
  navigatorToListPage() { 
    Taro.redirectTo({
      url: '/pages/car_proxy/index'
    })
  }
  config = {
    navigationBarTitleText: '支付详情'
  }

  render() {
    let {
      payPriceDesc,
      proxyOrderCode,
      createTimeDesc,
      payTimeDesc
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='top-bg'>
          <Text className='iconfont iconzhifuchenggong1 pay-icon'></Text>
          <Text className='top-tips'>支付成功</Text>
        </View>
        <View className='position-wrapper'>
          <View className='twig'></View>
          <View className='twig-blur'></View>
          <View className='order-details-wrapper'>
            <View className='money-wrapper'>
              {payPriceDesc && <Text className='money-icon'>¥</Text>}
              <Text className='money'>{payPriceDesc}</Text>
            </View>
            <View className='msg-wrapper'>
              <View className='public-item'>
                <View className='public-label'>订单编号</View>
                <View className='public-content'>{proxyOrderCode || ''}</View>
              </View>
              <View className='public-item'>
                <View className='public-label'>下单时间</View>
                <View className='public-content'>{createTimeDesc || ''}</View>
              </View>
              <View className='public-item'>
                <View className='public-label'>付款时间</View>
                <View className='public-content'>{payTimeDesc || ''}</View>
              </View>
            </View>
          </View>
          <View className='btn-public btn-see' onClick={this.navigatorBack}>查看订单</View>
          <View className='btn-public btn-back' onClick={this.navigatorToListPage}>返回列表页</View>
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
export default connect(mapStateToProps)(CarProxyPaySuccess)