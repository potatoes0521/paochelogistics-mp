/*
 * @Author: guorui
 * @description: 订单详情中发车城市的组件
 * @Date: 2019-09-20 09:58:08
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 12:52:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import '../public.styl'

class SendCityComponent extends Component {
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  constructor(props) {
    super(props)
    this.state = { }
  }
  callThem() {
    let {
      item
    } = this.props
    if (!item.orderCarriagePersonVo) return
    Taro.makePhoneCall({
      phoneNumber: item.orderCarriagePersonVo.sendMobile
    })
  }
  render() {
    let { item }  = this.props
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>发车城市:</View>
          <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.sendCityName || ''}</View>
        </View>
        {
          (item.inquiryOrderVO && item.inquiryOrderVO.sendAddress) ?
            <View className='details-form-item'>
              <View className='details-form-label'>详细信息:</View>
              <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.sendAddress || ''}</View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>联系人:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.sendPerson || ''}</View>
        </View>
        <View className='details-form-item' onClick={this.callThem}>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.sendMobile || ''}</View>
        </View>
        {
          item.orderCarriagePersonVo && item.orderCarriagePersonVo.sendCardNo ?
            <View className='details-form-item'>
              <View className='details-form-label'>身份证号:</View>
              <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.sendCardNo || ''}</View>
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

SendCityComponent.defaultProps = {
  item: {}
}

SendCityComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(SendCityComponent)