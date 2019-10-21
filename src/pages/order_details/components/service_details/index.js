/*
 * @Author: guorui
 * @description: 订单详情中发车城市、 收车城市的组件 usedType: 1, //车辆类型  1新车  2二手车
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-21 16:35:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.styl'

class ServiceDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  
  render() {
    let { item }  = this.props
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>发车时间:</View>
          <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.sendTimeDesc || ''}</View>
        </View>
        {
          (item.inquiryOrderVO.storePickup || item.inquiryOrderVO.homeDelivery) ?
            <View className='details-form-item'>
              <View className='details-form-label'>服务:</View>
              <View className='details-form-content'>
                {
                  item.inquiryOrderVO && !item.inquiryOrderVO.storePickup ? '上门提车' : ''
                }
                {
                  (item.inquiryOrderVO && !item.inquiryOrderVO.storePickup) && (item.inquiryOrderVO && !item.inquiryOrderVO.homeDelivery) ? '，' : ''
                }
                {
                  item.inquiryOrderVO && !item.inquiryOrderVO.homeDelivery ? '上门送车' : ''
                }
              </View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>车辆信息:</View>
          <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.carInfo || ''}</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>车辆类型:</View>
          <View className='details-form-content'>
            {
              item.inquiryOrderVO && item.inquiryOrderVO.usedType === 1 ? '新车' : '二手车'
            }
          </View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>台数:</View>
          <View className='details-form-content'>{item.inquiryOrderVO && item.inquiryOrderVO.carAmount || ''}辆</View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>车架号:</View>
          <View className='details-form-content'>{item.vins || ''}</View>
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

ServiceDetailsComponent.defaultProps = {
  item: {}
}

ServiceDetailsComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(ServiceDetailsComponent)