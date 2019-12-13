/*
 * @Author: guorui
 * @description: 订单详情
 * @Date: 2019-09-20 10:16:14
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-13 15:29:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Block,
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { defaultResourceImgURL } from '@config/request_config.js'
import classNames from 'classnames'
import NoTitleCard from '@c/no_title_card/index.js'
import SendCityComponent from './components/send_city/index.js'
import ReceiveCityComponent from './components/receive_city/index.js'
import ServiceDetailsComponent from './components/service_details/index.js'
import PriceDetailsComponent from './components/price_details/index.js'
import FooterDetailsComponent from './components/footer_details/index.js'
import CustomerInfoComponent from './components/customer_info/index.js'
import HelpPayMsg from './components/help_pay/index.js'
// eslint-disable-next-line import/first
import BargainBox from '@c/bargain/index.js' // 砍价过期 弹框 
// eslint-disable-next-line import/first
import api from '@api/index.js'
// eslint-disable-next-line import/first
import login from '@utils/login.js'
// eslint-disable-next-line import/first
import { handleShareInOrderDetails } from '@utils/handle_share.js'
import {handleOrderButtons} from '../../config/button_config.js'
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
      pageParams: {},
      open: false
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
    this.setState({
      pageParams: this.pageParams
    })
    if (this.pageParams.share_type) {
      let {userInfo} = this.props
      if (userInfo && !userInfo.userId) {
        await login.getCode(this)
        const next = await handleShareInOrderDetails(this.pageParams, this.props.userInfo)
        if (!next) return
      }
      this.handleGetOrderDetails()
    } else {
      this.getOrderDetails()
    }
  }
  handleGetOrderDetails() {
    if (this.pageParams.share_type !== '3') {
      this.getOrderDetails()
    } else {
      // 代付详情
      this.getOrderHelpPayment()
    }
  }
  /**
   * 获取订单详情
   * @return void
   */
  getOrderDetails() {
    if (!this.pageParams.order_code) {
      Taro.showToast({
        icon: 'none',
        title: 'order_code is null'
      })
      return;
    }
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderDetails(sendData, this)
      .then(res => {
        this.handleResponse(res)
      })
  }
  /**
   * 获取代付订单详情
   * @return void
   */
  getOrderHelpPayment() {
    if (!this.pageParams.order_code) {
      Taro.showToast({
        icon: 'none',
        title: 'order_code is null'
      })
      return;
    }
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderHelpPaymentDetails(sendData, this)
      .then(res => {
        this.handleResponse(res)
      })
  }
  /**
   * 处理返回值
   * @param {Object} res 订单详情数据
   * @return void
   */
  handleResponse(res) { 
    if (!res) return
    const obj = Object.assign({}, res, this.pageParams)
    const button = handleOrderButtons(obj.buttons)
    obj.buttons = button
    this.setState({
      orderDetailsInfo: obj,
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
    } else {
      this.countDown(res.discountDueTime)
    }
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
    const shareMsg = `order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
    const shareTitle = `${inquiryOrderVO.sendCityName}发往${inquiryOrderVO.receiveCityName}的${inquiryOrderVO.carAmount}台${inquiryOrderVO.carInfo}已经发车了`
    if (event.from === 'button') {
      // 来自页面内转发按钮
      let { type } = event.target.dataset
      // share_type = 1 发送给客户  不管谁点进来  去订单详情
      // c_id 是customerID的缩写  主要判断是不是这个用户的单 如果不是就让他进了首页
      if (type === 'inviteCustomer') { // 分享给客户
        path = `/pages/order_details/index?share_type=1&${shareMsg}`
        title = `${shareTitle}`
        imageUrl = `${defaultResourceImgURL}share_to_c.png`
      }
      // share_type = 2 分享砍价  本人去订单详情  其他人去砍价
      if (type === 'shareOrder') { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&${shareMsg}`
        title = `我要运车,需要大侠助我一臂之力!!`
        imageUrl = `${defaultResourceImgURL}share_to_bargain.png`
      }
      // share_type = 3 找人代付
      if (type === 'otherOnePayOrder') { // 分享给客户
        path = `/pages/order_details/index?share_type=3&${shareMsg}`
        title = `我要运车,需要大侠助我一臂之力!!`
        // imageUrl = `${defaultResourceImgURL}share_to_help_pay.png`
        imageUrl = ''
      }
    }
    if (event.from === 'menu') {
      if (userInfo.userType === 0 && +this.pageParams.share_type !== 3) { // 分享给客户
        path = `/pages/order_details/index?share_type=1&${shareMsg}`
        title = `${shareTitle}`
        imageUrl = `${defaultResourceImgURL}share_to_c.png`
      } else {
        path = `/pages/order_details/index?share_type=3&${shareMsg}`
        title = `我要运车,需要大侠助我一臂之力!!`
        // imageUrl = `${defaultResourceImgURL}share_to_help_pay.png`
        imageUrl = ''
      }
      // share_type = 2 分享砍价  本人去订单详情  其他人去砍价
      // if (userInfo.userType === 2 || userInfo.userType === 1) { // 分享给客户
      //   path = `/pages/share_bargain/index?share_type=2&order_code=${orderDetailsInfo.orderCode}&c_id=${orderDetailsInfo.userId}`
      //   title = `我要运车,需要大侠助我一臂之力!!!`
      //   imageUrl = `${defaultResourceImgURL}share_to_bargain.png`
      // }
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
  clickOpenBtn() { 
    let { open } = this.state
    this.setState({
      open: !open
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
      pageParams,
      open
      // canBargain
    } = this.state
    // 1. 请求到数据没有 2. 有没有展示文案 3. 没有过期 4 订单的支付状态是 未支付 5. 不是代付
    const showTipsView = showTips && tipContent && !fail && orderDetailsInfo.payStatus === 0 && pageParams.share_type !== '3'
    const orderMsgClassName = classNames({
      'order-msg': pageParams.share_type !== '3',
      'help-order-msg': pageParams.share_type === '3',
    })
    const isOpen = (pageParams.share_type !== '3') || (pageParams.share_type === '3' && open )
    const iconClassName = classNames({
      'icon-for-bottom': !isOpen,
      'icon-for-top': isOpen,
    })
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          {
            pageParams.share_type === '3' ?
              <HelpPayMsg orderDetailsInfo={orderDetailsInfo} />
              :
              <View className='pay-tips-wrapper'>
                <Text className='pay-text'>{ orderDetailsInfo.statusDesc || '' }</Text>
              </View>
          }
          <View className={orderMsgClassName}>
            <NoTitleCard>
              {
                pageParams.share_type !== '3' && (
                  <Block>
                    <CustomerInfoComponent item={orderDetailsInfo}></CustomerInfoComponent>
                    <View className='dividing-line'></View>
                  </Block>
                )
              }
              <SendCityComponent item={orderDetailsInfo}></SendCityComponent>
              <View className='dividing-line'></View>
              {
                isOpen && (
                  <Block>
                    <ReceiveCityComponent item={orderDetailsInfo}></ReceiveCityComponent>
                    <View className='dividing-line'></View>
                    <ServiceDetailsComponent item={orderDetailsInfo}></ServiceDetailsComponent>
                    <View className='dividing-line'></View>
                  </Block>
                )
              }
              {
                pageParams.share_type !== '3' && (
                  <PriceDetailsComponent
                    item={orderDetailsInfo}
                    fail={fail}
                    onClick={this.clickWhyNotUse.bind(this)}
                  ></PriceDetailsComponent>
                 )
              }
              {
                pageParams.share_type === '3' && (
                  <View className='open-btn' onClick={this.clickOpenBtn}>
                    <Text>{ isOpen ? '收起' : '查看'}订单详情</Text>
                    <View className={iconClassName}>
                      <Text className='iconfont iconxiangyouxuanzejiantoux icon-open'></Text>
                    </View>
                  </View>
                )
              }
            </NoTitleCard>
            {
              pageParams.share_type === '3' && (
                <View className='show-price-wrapper'>
                  <PriceDetailsComponent
                    item={orderDetailsInfo}
                    fail={fail}
                    onClick={this.clickWhyNotUse.bind(this)}
                  ></PriceDetailsComponent>
                </View>
                )
            }
          </View>
        </View>
        {
          orderDetailsInfo.buttons && orderDetailsInfo.buttons.length && (
              <View className='page-footer'>
                <FooterDetailsComponent
                  onGetOrderDetails={this.handleGetOrderDetails.bind(this)}
                  item={orderDetailsInfo}
                ></FooterDetailsComponent>
              </View>
            )
        }
        {
          showTipsView && (
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
          )
        }
        {
          fail && orderDetailsInfo.payStatus === 0 ?
            <BargainBox
              show={showBargainBox}
              type='fail'
              onClick={this.bargainBoxClick.bind(this)}
            ></BargainBox>
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

