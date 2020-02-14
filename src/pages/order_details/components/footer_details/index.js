/*
 * @Author: guorui
 * @description: 订单详情--底部详情 订单状态status 10 待支付 20 待交车 30 已取消 40 已完成
 * @Date: 2019-09-20 09:58:08
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 18:23:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro' 
import {
  View,
  Button
} from '@tarojs/components'
import OrderFooterCard from '../order_footer_card/index.js'
import HelpPayBtn from '../pay_btn/index.js'
// eslint-disable-next-line import/first
import { connect } from '@tarojs/redux'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
// eslint-disable-next-line import/first
import api from '@api/index.js'
// eslint-disable-next-line import/first
import classNames from 'classnames'
import './index.styl'

class FooterDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  } 
  
  /**
   * 请求支付
   * @return void
   */
  paymentButton() {
    let { item } = this.props
    // Taro.navigateTo({
    //   url: `/pages/pay_details/index?order_code=${item.orderCode}`
    // })
    let sendData = {
      orderCode: item.order_code,
      isPaytoll: 0
    }
    api.pay.getPayParams(sendData, this).then(res => {
      Taro.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        success: (response) => {
          if (!response) return
          Taro.redirectTo({
            url: `/pages/pay_success/index?order_code=${item.order_code}`
          })
        },
        fail: (response) => {
          console.log(response)
        }
      })
    })
  }
  
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
  orderTransport(type) { 
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/order_transport/index?type=${type}&order_id=${item.orderId}&order_code=${item.orderCode}`
    })
  }
  getOrderDetails() {
    this.props.onGetOrderDetails()
  }
  buttonsFun(e) {
    switch (e) {
      case 'logisticsDetail':
        this.transportStatus()
        break;
      case 'payOrder':
        this.paymentButton()
        break;
      case 'submitOrderTransport':
        this.orderTransport('submit')
        break;
      case 'seeOrderTransport':
        this.orderTransport('see')
        break;
      default:
        return
    }
  }
  
  render() {
    let { item } = this.props
    const buttonsList = item.buttons && item.buttons.map((itemList, index) => {
      const textClassName = classNames(itemList.key, {
        'margin-top': index > 2
      })
      const key = itemList.key
      if (itemList.key == 'inviteCustomer') {
        return (
          <Button
            openType='share'
            data-type='inviteCustomer'
            data-item={item}
            className={textClassName}
            key={key}
          >{itemList.name}</Button>
        )
      } else if (itemList.key == 'otherOnePayOrder') {
        // 请别人代付
        return (
          <Button
            openType='share'
            data-type='otherOnePayOrder'
            data-item={item}
            className={textClassName}
            key={key}
          >{itemList.name}</Button>
        )
      } else if (itemList.key == 'shareOrder') {
        return (
          <Button
            openType='share'
            data-type='shareOrder'
            data-item={item}
            className={textClassName}
            key={key}
          >{itemList.name}</Button>
        )
      } else if (itemList.key === 'helpPayOrder') {
        return (
          <HelpPayBtn
            item={itemList}
            orderCode={item.orderCode}
            onPayOver={this.getOrderDetails.bind(this)}
          />
        )
      }
      return (
        <Button className={textClassName} key={key} onClick={() => this.buttonsFun(itemList.key)}>{itemList.name}</Button>
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
  item: {},
  onGetOrderDetails: ()=>{}
}

FooterDetailsComponent.propTypes = {
  item: PropTypes.object,
  onGetOrderDetails: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(FooterDetailsComponent)