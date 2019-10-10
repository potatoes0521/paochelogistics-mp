/*
 * @Author: guorui
 * @description: 支付详情
 * @Date: 2019-10-08 09:30:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-10 09:36:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import login from '@utils/login.js'
import NoTitleCard from '@c/no_title_card/index.js'
import PriceDetailsComponent from '@c/all_order_pages/price_details/index.js'
import './index.styl'

class PayDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true //判断是本人支付还是别人代付
    }
    this.pageParams = {}
  }
  componentDidShow() { 
    this.pageParams = this.$router.params
    const { userInfo } = this.props
    if (!userInfo.userId) {
      login.getCode(this)
    }
  }
  
  payMoney() { 
    
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