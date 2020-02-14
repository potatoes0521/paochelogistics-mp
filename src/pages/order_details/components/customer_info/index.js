/*
 * @Author: guorui
 * @description: 客户信息
 * @Date: 2019-12-06 09:21:26
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 13:35:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.styl'

class CustomerInfoComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { }
  }

  copy(item) {
    Taro.setClipboardData({
      data: item.orderCode
    })
  }
  callThem() { 
    let { item }  = this.props
    Taro.makePhoneCall({
      phoneNumber: item.mobile
    })
  }
  render() {
    let { item }  = this.props
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>所属客户:</View>
          <View className='details-form-content'>{item.realName || ''}</View>
        </View>
        <View className='details-form-item' onClick={this.callThem}>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>{item.mobile || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>订单编号:</View>
          <View className='details-form-content'>
            <Text selectable>{item.orderCode || ''}</Text>
            <Text onClick={this.copy.bind(this, item)} className='copy-btn'>复制</Text>
          </View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>下单时间:</View>
          <View className='details-form-content'>
            <Text selectable>{ item.createTimeDesc || '' }</Text>
          </View>
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

CustomerInfoComponent.defaultProps = {
  item: {}
}

CustomerInfoComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(CustomerInfoComponent)