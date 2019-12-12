/*
 * @Author: guorui
 * @description: 支付详情  本页面注释信息为，别人代付时显示的支付页面
 * @Date: 2019-10-08 09:30:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-12 10:12:52
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
// eslint-disable-next-line import/first
import BargainBox from '@c/bargain/index.js' // 砍价过期 弹框 
import './index.styl'

class PayDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotedPriceDesc: 0, //报价
      bargainPriceDesc: 0, //帮砍价
      promotionsPrice: 0, //支付立减
      payPriceDesc: 0, //应付金额
      fail: false,
      showBargainBox: false
     }
    this.pageParams = {}
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
  /**
   * 获取订单信息
   * @return void
   */
  getOrderDetails() {
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderDetails(sendData, this).then(res => {
      this.setState({
        quotedPriceDesc: res.inquiryOrderVO.quotedPriceDesc,
        bargainPriceDesc: res.bargainPriceDesc,
        promotionsPrice: res.promotionsPrice,
        payPriceDesc: res.payPriceDesc
      })
      const nowTimer = new Date().getTime()
      console.log('现在的时间戳' + nowTimer, '到期的时间戳' + res.discountDueTime, nowTimer - res.discountDueTime, nowTimer > res.discountDueTime)
      if (nowTimer > res.discountDueTime) {
        this.setState({
          fail: true
        })
      }
    })
  }
  /**
   * 请求支付内容
   * @return void
   */
  payMoney() { 
    let sendData = {
      orderCode: this.pageParams.order_code,
      isPaytoll: 0
    }
    api.pay.getPayParams(sendData, this).then(res => {
      this.weChatPay(res)
    })
    
  }
  /**
   * 支付
   * @param {Object} params 后端返回的支付的参数
   * @return void
   */
  weChatPay(params) {
    Taro.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        if (!res) return
        Taro.redirectTo({
          url: `/pages/pay_success/index?order_code=${this.pageParams.order_code}`
        })
      },
      fail: (res) => {
        console.log(res)
      }
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
  /**
   * 点击了我知道了
   * @return void
   */
  bargainBoxClick() {
    this.setState({
      showBargainBox: false
    })
  }
  //页面内的配置
  config = {
    navigationBarTitleText: '支付详情'
  } 

  render() {
    // let { userInfo } = this.props
    let {
      quotedPriceDesc,
      bargainPriceDesc,
      promotionsPrice,
      payPriceDesc,
      fail,
      showBargainBox
    } = this.state
    const item = {
      quotedPriceDesc,
      bargainPriceDesc,
      promotionsPrice,
      payPriceDesc
    }
    return (
      <View className='page-wrapper'>
        <View className='pay-wrapper'>
          <NoTitleCard>
            <PriceDetailsComponent
              item={item}
              fail={fail}
              onClick={this.clickWhyNotUse.bind(this)}
            ></PriceDetailsComponent>
          </NoTitleCard>
        </View>
        <View
          className='pay-button'
          onClick={this.payMoney}
        >确认支付</View>
        <BargainBox
          show={showBargainBox}
          type='fail'
          onClick={this.bargainBoxClick.bind(this)}
        ></BargainBox>
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