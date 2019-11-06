/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-06 18:58:22
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
// eslint-disable-next-line import/first
import login from '@utils/login.js'
// eslint-disable-next-line import/first
import { handleShareInOrderDetails } from '@utils/handleShare.js'
import './index.styl'

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetailsInfo: {} //订单信息
    }
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params || {}
    if (this.pageParams.share_type) { 
      await login.getCode(this)
      const next = await handleShareInOrderDetails(this.pageParams, this.props.userInfo)
      if (!next) return
      this.getOrderDetails()
    } else {
      this.getOrderDetails()      
    }
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
  /**
   * 触发了分享
   * @param {Object} event 参数描述
   * @return void
   */
  onShareAppMessage(event) {
    let { userInfo } = this.props
    let { orderDetailsInfo } = this.state
    let { inquiryOrderVO } = orderDetailsInfo
    let path = `/pages/index/index`
    let title = `欢迎您进入跑车物流平台~`
    let imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_mp.png`
    if (event.from === 'button') {
      // 来自页面内转发按钮
      let { type } = event.target.dataset
      // share_type = 1 发送给客户  不管谁点进来  去订单详情
      // c_id 是customerID的缩写  主要判断是不是这个用户的单 如果不是就让他进了首页
      if (type === 'inviteCustomer') { // 分享给客户
        path = `/pages/order_details/index?share_type=1&order_id=${orderDetailsInfo.orderId}&c_id=${orderDetailsInfo.userId}`
        title = `${inquiryOrderVO.sendCityName}发往${inquiryOrderVO.receiveCityName}的${inquiryOrderVO.carAmount}辆${inquiryOrderVO.carInfo}已经发车了`
        imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_c.png`
      }
      // share_type = 2 分享砍价  本人去订单详情  其他人去砍价
      if (type === 'shareOrder') { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
        title = `我要运车,需要你助我一臂之力!`
        imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_bargain.png`
      }
    }
    if (event.from === 'menu') {
      if (userInfo.userType === 0) { // 分享给客户
        path = `/pages/order_details/index?share_type=1&order_id=${orderDetailsInfo.orderId}&c_id=${orderDetailsInfo.userId}`
        title = `${inquiryOrderVO.sendCityName}发往${inquiryOrderVO.receiveCityName}的${inquiryOrderVO.carAmount}辆${inquiryOrderVO.carInfo}已经发车了`
        imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_c.png`
      }
      // share_type = 2 分享砍价  本人去订单详情  其他人去砍价
      if (userInfo.userType === 2 || userInfo.userType === 1) { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
        title = `我要运车,需要你助我一臂之力!`
        imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_bargain.png`
      }
    }
    return {
      title,
      path,
      imageUrl
    }
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

