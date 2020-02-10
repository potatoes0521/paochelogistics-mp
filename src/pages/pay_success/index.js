/*
 * @Author: guorui
 * @description: 支付成功
 * @Date: 2019-10-15 11:14:50
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-08 18:48:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import api from '@api/index.js'
import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import './index.styl'

class PaySuccessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      payPriceDesc: 0
    }
    this.pageParams = {}
  }
  componentDidShow() {
    this.pageParams = this.$router.params
    this.getOrderDetails()
  }
  
  /**
   * 获取详情
   * @return void
   */
  getOrderDetails() {
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderDetails(sendData, this).then(res => {
      this.orderCode = res.orderCode
      this.setState({
        payPriceDesc: res.payPriceDesc
      })
    })
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '支付详情'
  }

  render() {
    let {
      payPriceDesc
    } = this.state
    return (
      <View className='page-wrapper'>
        <NoTitleCard>
          <View className='pay-content-style'>
            <View className='iconfont iconzhifuchenggong icon-success-style'></View>
            <View className='pay-success-style'>支付成功</View>
            <View className='pay-notice'>您已向跑车科技支付运费{payPriceDesc}元，我们会尽快将您的货物送达！</View>
          </View>
        </NoTitleCard>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(PaySuccessDetails)