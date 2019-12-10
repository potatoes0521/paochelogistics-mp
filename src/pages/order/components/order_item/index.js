/*
 * @Author: liuYang
 * @description: 订单item
 * @Date: 2019-09-23 14:42:25
 * @LastEditors: guorui
 * @LastEditTime: 2019-12-10 15:47:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Button,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import api from '@api/index.js'
import '../../../../assets/icon_font/icon.scss'
import './index.styl'

export default class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  navigatorTo(pageName, e) {
    e.stopPropagation()
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/${pageName}/index?order_code=${item.orderCode}`
    })
  }

  buttonsFun(event) {
    let { item } = this.props
    event.stopPropagation()
    switch (event.target.dataset.key) {
      case 'logisticsDetail':
        Taro.navigateTo({
          url: `/pages/transport_state/index?order_id=${item.orderId}&order_code=${item.orderCode}`
        })
        break;
      case 'payOrder':
        Taro.navigateTo({
          url: `/pages/pay_details/index?order_code=${item.orderCode}`
        })
        break;
      default:
        return
    }
  }
  deleteOrder(e) { 
    e.stopPropagation()
    this.props.onClick(...arguments)
  }

  submitDeleteOrder() {
    let { item } = this.props
    let sendData = {
      orderCode: item.orderCode
    }
    api.order.deleteOrder(sendData, this).then(() => {
      Taro.showToast({
        title: '订单删除成功',
        icon: 'none'
      })
    })
  }

  render() {
    let {
      item,
      // userInfo
    } = this.props
    const offerMsg = item && item.inquiryOrderVO
    const allWrapperClassName = classNames(
      'order-item',
      {
        'order-over': item.isActive !== 1
      }
    )
    const fontClassName = classNames(
      'price-wrapper',
      {
        'font-style': item.status === 40 || item.status === 30
      }
    )
    const priceClassName = classNames(
      'price-wrapper',
      {
        'price-style': item.status === 40 || item.status === 30
      }
    )
    const buttonsList = item.buttons && item.buttons.map((itemList) => {
      if (itemList.key == 'inviteCustomer') {
        return (
          <Button openType='share' data-item={item} data-type='inviteCustomer' className={itemList.key} key={itemList} onClick={this.buttonsFun}>{itemList.name}</Button>
        )
      }
      return (
        <Button className={itemList.key} key={itemList} data-key={itemList.key} onClick={this.buttonsFun}>{itemList.name}</Button>
      )
    })
    return (
      <View
        className={allWrapperClassName}
        onClick={this.navigatorTo.bind(this, 'order_details')}
      >
        <View className='msg-wrapper'>
          <View className='list-item'>
            <View className='item-city'>
              <Text>
                {
                  offerMsg.sendCityName || ''
                }
              </Text>
              <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
              <Text>
                {
                  offerMsg.receiveCityName || ''
                }
              </Text>
            </View>
            <View className={fontClassName} onClick={this.deleteOrder.bind(this)}>
              <Text>{item.statusDesc || ''}</Text>
              {
                item.status === 40 || item.status === 30 ?
                  <Block>
                    <Text className='line'></Text>
                    <Text className='iconfont iconshanchu delete-icon'></Text>
                  </Block>
                  : null
              }
            </View>
          </View>
          <View className='list-item list-item-msg'>
            <View className='order-msg'>
              <Text className='order-car-info'>{ offerMsg.carInfo || '' }</Text>
              <Text>
                {
                  offerMsg.carAmount || 0
                }
                台
              </Text>
            </View>
            <View className={priceClassName}>¥{ item.payPrice ? item.payPriceDesc : '' }</View>
          </View>
        </View>
        <View className='btn-group'>
          {
            buttonsList
          }
        </View>
      </View>
    )
  }
}

OrderItem.defaultProps = {
  item: {},
  userInfo: {}
}

OrderItem.propTypes = {
  item: PropTypes.object,
  userInfo: PropTypes.object
}