/*
 * @Author: guorui
 * @description: 订单详情--底部详情 订单状态status 10 待支付 20 待交车 30 已取消 40 已完成
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-08 18:52:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro' 
import {
  View,
  Button
} from '@tarojs/components'
import OrderFooterCard from '../order_footer_card/index.js'
// eslint-disable-next-line import/first
import { connect } from '@tarojs/redux'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
import './index.styl'

class FooterDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  } 
  
  /**
   * 立即支付
   * @return void
   */
  paymentButton() {
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/pay_details/index?order_code=${item.orderCode}`
    })
  }
  
  /**
   * 分享砍价
   * @return void
   */
  shareBargain() {
    // this.onShareAppMessage()
  }

  /**
   * 分享给客户
   * @return void
   */
  shareCustomer() { }
  
  /**
   * 查看运输状态
   * @return void
   */
  transportStatus() {
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/transport_state/index?order_id=${item.orderId}`
    })
  }

  buttonsFun(e) {
    switch (e) {
      case 'logisticsDetail':
        this.transportStatus()
        break;
      // case 'inviteCustomer':
      //   this.shareCustomer()
      //   break;
      case 'payOrder':
        this.paymentButton()
        break;
      // case 'shareOrder':
      //   this.shareBargain()
      //   break;
      default:
        return
    }
  }
  
  render() {
    let { item } = this.props
    const buttonsList = item.buttons && item.buttons.map((itemList) => {
      const key = itemList.key
      if (itemList.key == 'inviteCustomer') {
        return (
          <Button
            openType='share'
            data-type='inviteCustomer'
            data-item={item}
            className={itemList.key}
            key={key}
          >{itemList.name}</Button>
        )
      } else if (itemList.key == 'shareOrder') {
        return (
          <Button
            openType='share'
            data-type='shareOrder'
            data-item={item}
            className={itemList.key}
            key={key}
          >{itemList.name}</Button>
        )
      }
      return (
        <Button className={itemList.key} key={key} onClick={() => this.buttonsFun(itemList.key)}>{itemList.name}</Button>
      )
    })
    return (
      <View className='footer-details-wrapper'>
        <OrderFooterCard>
          <View className='status-wrapper'>
            {
              buttonsList
            }
          </View>
          {/* <View className='status-wrapper'>
            {
              (item.logisticsDetailsDesc) ?
                <View className='share-wrapper'>
                  <View className='collect-button buttons' onClick={this.transportStatus}>查看运输状态</View>
                </View>
                : null
            }
            {
              (userInfo.userType === 0) ?
                <View className='share-wrapper'>
                  <View className='customer-button buttons' onClick={this.shareCustomer}>分享给客户</View>
                </View>
                :
                null
            }
            {
              (item.status === 10 && userInfo.userType !== 0) ?
                <View className={payButtonClassName} onClick={this.paymentButton}>立即支付
                  {
                    (item.promotionsPrice) ?
                      <Text className='reduce-price'>(立减{item.promotionsPrice}元)</Text>
                      : null
                  }
                </View>
                : null
            }
            {
              (item.shareOutDesc && userInfo.userType !== 0) ?
                <View className='share-wrapper'>
                  <Button className='share-button buttons' onClick={this.shareBargain} openType='share'>分享砍价</Button>
                </View>
                : null
            }
            
          </View> */}
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