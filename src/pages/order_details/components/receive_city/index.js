/*
 * @Author: guorui
 * @description: 订单详情中收车城市的组件
 * @Date: 2019-10-09 16:41:49
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-12 16:53:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.styl'

class ReceiveCityComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  
  render() {
    let { item }  = this.props
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>收车城市:</View>
          <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.receiveCityName || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>详细信息:</View>
          <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.receiveAddress || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系人:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.receivePerson || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.receiveMobile || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>身份证号:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.receiveCarNo || ''}</View>
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

ReceiveCityComponent.defaultProps = {
  item: {}
}

ReceiveCityComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(ReceiveCityComponent)