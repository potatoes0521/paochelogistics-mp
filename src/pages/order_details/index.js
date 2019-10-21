/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-17 20:13:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import SendCityComponent from './components/send_city/index.js'
import ReceiveCityComponent from './components/receive_city/index.js'
import ServiceDetailsComponent from './components/service_details/index.js'
import PriceDetailsComponent from './components/price_details/index.js'
import FooterDetailsComponent from './components/footer_details/index.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
import './index.styl'

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetailsInfo: {} //订单信息
    }
    this.pageParams = {}
  }

  componentDidShow() {
    this.pageParams = this.$router.params || {}
    this.getOrderDetails()
  }
  
  //页面内的配置
  config = {
    navigationBarTitleText: '订单详情'
  } 

  /**
   * 获取订单详情--发车城市信息
   * @return void
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
          orderDetailsInfo: res
        })
        Taro.hideLoading()
      })
  }

  render() {
    let {
      orderDetailsInfo
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <NoTitleCard>
            <SendCityComponent item={orderDetailsInfo}></SendCityComponent>
            <View className='dividing-line'></View>
            <ReceiveCityComponent item={orderDetailsInfo}></ReceiveCityComponent>
            <View className='dividing-line'></View>
            <ServiceDetailsComponent item={orderDetailsInfo}></ServiceDetailsComponent>
            <View className='dividing-line'></View>
            <PriceDetailsComponent item={orderDetailsInfo}></PriceDetailsComponent>
          </NoTitleCard>
        </View>
        <View className='page-footer'>
          <FooterDetailsComponent item={orderDetailsInfo}></FooterDetailsComponent>
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
export default connect(mapStateToProps)(OrderDetails)

