/*
 * @Author: guorui
 * @description: 订单详情--底部详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-15 18:27:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro' 
import {
  View,
  Text,
  Button
} from '@tarojs/components'
import OrderFooterCard from '../order_footer_card/index.js'
// eslint-disable-next-line import/first
import { connect } from '@tarojs/redux'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
// eslint-disable-next-line import/first
import classNames from 'classnames'
import './index.styl'

class FooterDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  } 
  
  /**
   * @description: 支付
   * @param {type} 
   * @return: 
   */
  paymentButton() {
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/pay_details/index?order_id=${item.orderId}`
    })
  }
  /**
   * 分享砍价
   * @description: 
   * @param {type} 
   * @return: 
   */
  shareBargain() {
    this.onShareAppMessage()
  }
  onShareAppMessage(res) {
    let { item } = this.props
    if (item.shareType !== 1) return
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `砍价信息`,
      path: `/pages/share_details/index?order_id=${item.orderId}`,
      imageUrl: ``
    }
  }
  render() {
    let {
      item,
      userInfo
    } = this.props
    const payButtonClassName = classNames({
      'pay-button buttons': true,
      'change-padding': !item.promotionsPrice
    })
    return (
      <View className='footer-details-wrapper'>
        <OrderFooterCard>
          <View className='status-wrapper'>
            <View className='immediate_payment'>
              {
                (userInfo.userType == 1) ?
                  <View className='lower-button'>
                    <View className='collect-button buttons'>分享给客户</View>
                  </View>
                  :
                  <View className='upper-button'>
                    <View className={payButtonClassName} onClick={this.paymentButton}>立即支付
                      {
                        (item.promotionsPrice) ?
                          <Text className='reduce-price'>(立减{item.promotionsPrice}元)</Text>
                          : null
                      }
                    </View>
                    {
                      (item.shareOutDesc) ?
                        <Button className='share-button buttons' onClick={this.shareBargain} openType='share'>分享砍价</Button>
                        : null
                    }
                  </View>
              }
            </View>
            {
              (item.logisticsDetailsDesc) ?
                <View className='lower-button'>
                  <View className='collect-button buttons'>查看运输状态</View>
                </View>
                : null
            }
          </View>
        </OrderFooterCard>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}

FooterDetailsComponent.defaultProps = {
  item: {}
}

FooterDetailsComponent.propTypes = {
  item: PropTypes.object
}

export default connect(mapStateToProps)(FooterDetailsComponent)