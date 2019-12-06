/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: guorui
 * @LastEditTime: 2019-12-06 17:45:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { defaultResourceImgURL } from '@config/request_config.js'
import NoTitleCard from '@c/no_title_card/index.js'
import SendCityComponent from './components/send_city/index.js'
import ReceiveCityComponent from './components/receive_city/index.js'
import ServiceDetailsComponent from './components/service_details/index.js'
import PriceDetailsComponent from './components/price_details/index.js'
import FooterDetailsComponent from './components/footer_details/index.js'
import CustomerInfoComponent from './components/customer_info/index.js'
// eslint-disable-next-line import/first
import BargainBox from '@c/bargain/index.js' // 砍价过期 弹框 
// eslint-disable-next-line import/first
import api from '@api/index.js'
// eslint-disable-next-line import/first
import login from '@utils/login.js'
// eslint-disable-next-line import/first
import { handleShareInOrderDetails } from '@utils/handle_share.js'
// eslint-disable-next-line import/first
import { interValCountDown } from '@utils/timer_handle.js'
import './index.styl'

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetailsInfo: {}, //订单信息
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      showBargainBox: false,
      tipContent: '',
      fail: false,
      showTips: false, // 等数据请求到了再显示
      // canBargain: false
    }
    this.pageParams = {}
    this.timer = null
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  async componentDidShow() {
    this.pageParams = this.$router.params || {}
    console.log(this.pageParams)
    if (this.pageParams.share_type) {
      await login.getCode(this)
      console.log('登录休息鞋休息鞋先')
      const next = await handleShareInOrderDetails(this.pageParams, this.props.userInfo)
      console.log('登录休息鞋休息鞋先next', next)
      if (!next) return
      this.getOrderDetails()
    } else {
      this.getOrderDetails()
    }
  }
  /**
   * 获取订单详情--发车城市信息
   * @return void
   */
  getOrderDetails() {
    if (!this.pageParams.order_code) {
      Taro.navigateBack()
      return;
    }
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderDetails(sendData, this)
      .then(res => {
        this.setState({
          orderDetailsInfo: res,
          tipContent: res.tipContent,
          // canBargain: res.canBargain
        })
        const nowTimer = new Date().getTime()
        console.log('现在的时间戳' + nowTimer, '到期的时间戳' + res.discountDueTime, nowTimer - res.discountDueTime, nowTimer > res.discountDueTime)
        if (nowTimer > res.discountDueTime) {
          this.setState({
            fail: true,
            // showBargainBox: true
          })
        }
        this.countDown(res.discountDueTime)
      })
  }
  /**
   * 倒计时函数
   * @param {Number} targetTimeStamp 结束时间
   * @return void
   */
  countDown(targetTimeStamp) {
    interValCountDown({
      targetTimeStamp,
      that: this
    }, () => {
      let {
        day,
        hour,
        minute,
        second
      } = this.state
      if (day <= 0 && hour <= 0 && minute <= 0 && second <= 0) {
        this.setState({
          fail: true,
          showBargainBox: true,
        })
      }
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
    let title = `欢迎您进入跑车物流~`
    let imageUrl = `${defaultResourceImgURL}share_mp.png`
    if (event.from === 'button') {
      // 来自页面内转发按钮
      let { type } = event.target.dataset
      // share_type = 1 发送给客户  不管谁点进来  去订单详情
      // c_id 是customerID的缩写  主要判断是不是这个用户的单 如果不是就让他进了首页
      if (type === 'inviteCustomer') { // 分享给客户
        path = `/pages/order_details/index?share_type=1&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
        title = `${inquiryOrderVO.sendCityName}发往${inquiryOrderVO.receiveCityName}的${inquiryOrderVO.carAmount}台${inquiryOrderVO.carInfo}已经发车了`
        imageUrl = `${defaultResourceImgURL}share_to_c.png`
      }
      // share_type = 2 分享砍价  本人去订单详情  其他人去砍价
      if (type === 'shareOrder') { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
        title = `我要运车,需要大侠助我一臂之力!!`
        imageUrl = `${defaultResourceImgURL}share_to_bargain.png`
      }
    }
    if (event.from === 'menu') {
      if (userInfo.userType === 0) { // 分享给客户
        path = `/pages/order_details/index?share_type=1&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
        title = `${inquiryOrderVO.sendCityName}发往${inquiryOrderVO.receiveCityName}的${inquiryOrderVO.carAmount}台${inquiryOrderVO.carInfo}已经发车了`
        imageUrl = `${defaultResourceImgURL}share_to_c.png`
      }
      // share_type = 2 分享砍价  本人去订单详情  其他人去砍价
      if (userInfo.userType === 2 || userInfo.userType === 1) { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
        title = `我要运车,需要大侠助我一臂之力!!!`
        imageUrl = `${defaultResourceImgURL}share_to_bargain.png`
      }
    }
    return {
      title,
      path,
      imageUrl
    }
  }
  /**
   * 点击了我知道
   * @return void
   */
  bargainBoxClick() {
    this.setState({
      showBargainBox: false
    })
  }
  /**
   * 为什么不能用
   * @return void
   */
  clickWhyNotUse() { 
    this.setState({
      showBargainBox: true
    })
  }
  //页面内的配置
  config = {
    navigationBarTitleText: '订单详情'
  }
  render() {
    let {
      orderDetailsInfo,
      day,
      hour,
      minute,
      second,
      showBargainBox,
      tipContent,
      fail,
      showTips,
      // canBargain
    } = this.state
    return (
      <View className='page-wrapper'>
        {
          showTips && tipContent && !fail && orderDetailsInfo.status === 10 ?
            <View className='bargain-tips-wrapper'>
              <View className='time-tips'>
                <View className='tips'>优惠倒计时</View>
                <View className='timer'>
                  {
                    day > 0 ?
                      <Block>
                        <Text className='timer-box'>{day}</Text>
                        <Text>天</Text>
                      </Block>
                      : null
                  }
                  <Text className='timer-box'>{hour}</Text>
                  <Text>:</Text>
                  <Text className='timer-box'>{minute}</Text>
                  <Text>:</Text>
                  <Text className='timer-box'>{second}</Text>
                </View>
              </View>
              <View className='tips-text'>{tipContent}</View>
            </View>
            : null
        }
        {
          fail && orderDetailsInfo.status === 10 ?
            <BargainBox
              show={showBargainBox}
              type='fail'
              onClick={this.bargainBoxClick.bind(this)}
            ></BargainBox>
            : null
        }
        <View className='page-main'>
          <View className='pay-tips-wrapper'>
            <Text className='pay-text'>{ orderDetailsInfo.statusDesc || '' }</Text>
          </View>
          <NoTitleCard>
            <CustomerInfoComponent item={orderDetailsInfo}></CustomerInfoComponent>
            <View className='dividing-line'></View>
            <SendCityComponent item={orderDetailsInfo}></SendCityComponent>
            <View className='dividing-line'></View>
            <ReceiveCityComponent item={orderDetailsInfo}></ReceiveCityComponent>
            <View className='dividing-line'></View>
            <ServiceDetailsComponent item={orderDetailsInfo}></ServiceDetailsComponent>
            <View className='dividing-line'></View>
            <PriceDetailsComponent
              item={orderDetailsInfo}
              fail={fail}
              onClick={this.clickWhyNotUse.bind(this)}
            ></PriceDetailsComponent>
          </NoTitleCard>
        </View>
        {
          orderDetailsInfo.buttons && orderDetailsInfo.buttons.length ?
            <View className='page-footer'>
              <FooterDetailsComponent item={orderDetailsInfo}></FooterDetailsComponent>
            </View>
            : null
        }
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

