/*
 * @Author: guorui
 * @description: 订单详情中发车城市、收车城市的组件
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-11 18:11:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.styl'

class PriceDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      visible: false
    }
  }

  render() { 
    let { item } = this.props
    let {
      visible
    } = this.state
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>报价:</View>
          <View className='details-form-price'>￥{item.inquiryOrderVO.quotedPriceDesc}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>帮砍价:</View>
          <View className='details-form-price'>-￥38.21</View>
        </View>
        {
          (visible ) ?
            <View className='details-form-item'>
              <View className='details-form-label'>立即支付立减:</View>
              <View className='details-form-price'>-￥50</View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>应付金额:</View>
          <View className='details-form-price'>￥{item.payPriceDesc}</View>
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

PriceDetailsComponent.defaultProps = {
  item: {}
}

PriceDetailsComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(PriceDetailsComponent)