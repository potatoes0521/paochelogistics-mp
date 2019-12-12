/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-11 13:59:53
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-12 09:53:57
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Text
} from '@tarojs/components'
// import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.styl'

export default class index extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    let { orderDetailsInfo } = this.props
    const nickName = decodeURIComponent(orderDetailsInfo.nickName)
    return (
      <View className='help-pay-tips-wrapper'>
        <View className='help-tips'>
          <View className='user-icon'>
            <Image src={orderDetailsInfo.userPhoto}></Image>
          </View>
          <View className='text'>
            <Text className='nick-name'>{nickName || ''}</Text>
            发给朋友的代付邀请
          </View>
        </View>
        <View className='tips-main'>
          <View className='money-box'>
            <View className='money-title'>{orderDetailsInfo.payStatus ? '已支付' : '需支付'}</View>
            <View className='money'>¥{orderDetailsInfo.payPriceDesc || ''}</View>
          </View>
          <View className='tips'>
            <View className='title'>付款说明：</View>
            <View>1、付款金额以当前页面展示为准</View>
            <View className='tips-weight'>2、付款前请您务必和亲友再次确认，避免遇到诈骗行为</View>
          </View>
        </View>
      </View>
    )
  }

}

index.defaultProps = {
  orderDetailsInfo: {},
  onClick: () => {}
}

index.propTypes = {
  orderDetailsInfo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}