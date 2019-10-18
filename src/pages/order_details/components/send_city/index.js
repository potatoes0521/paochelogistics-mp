/*
 * @Author: guorui
 * @description: 订单详情中发车城市的组件
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-18 17:14:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.styl'

class SendCityComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    let { item }  = this.props
    // console.log(this.props, '测试')
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
        <View className='details-form-item'>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.sendMobile || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>身份证号:</View>
          <View className='details-form-content'>{item.orderCarriagePersonVo && item.orderCarriagePersonVo.sendCardNo || ''}</View>
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

SendCityComponent.defaultProps = {
  item: {}
}

SendCityComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(SendCityComponent)