/*
 * @Author: liuYang
 * @description: 没有订单的样式
 * @Date: 2019-09-29 15:00:46
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-18 20:32:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import noOrderDataImg from '@img/no_data/no_order.png'
import noOfferDataImg from '@img/no_data/no_offer.png'
import noCustomerDataImg from '@img/no_data/no_customer.png'
import './index.styl'

export default class NoData extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  navigatorTo(e) { 
    e.stopPropagation()
    let { pageType } = this.props
    switch (pageType) {
      case 'offer':
        Taro.switchTab({
          url: '/pages/index/index'
        })
        break;
      case 'order':
        Taro.switchTab({
          url: '/pages/index/index'
        })
        break;
      case 'customer':
        Taro.navigateTo({
          url: '/pages/customer_edit/index'
        })
        break;
      case 'login':
        Taro.navigateTo({
          url: '/pages/register/index'
        })
        break;
      default:
        Taro.switchTab({
          url: '/pages/index/index'
        })
        return
    }
  }
  render() {
    let { pageType } = this.props
    let imgSrc = ''
    let text = '去询价'
    let tips = '亲，暂时没有相关订单哦～'
    switch (pageType) {
      case 'offer':
        imgSrc = noOfferDataImg
        break;
      case 'order': 
        imgSrc = noOrderDataImg
        break;
      case 'customer':
        imgSrc = noCustomerDataImg
        text = '去添加'
        tips = '暂无联系人'
        break;
      case 'login':
        imgSrc = noCustomerDataImg
        text = '去登录'
        tips = '亲，登录后可以查看自己相关的订单哦～'
        break;
      default:
        imgSrc = noOfferDataImg
        return
    }
    const imageClassName = classNames(
      'image',
      {
        'login-image' : pageType === 'login' || pageType === 'customer'
      }
    )
    return (
      <View className='no-data-wrapper'>
        <View className='main'>
          <Image
            className={imageClassName}
            src={imgSrc}
          ></Image>
          <View className='tips'>{tips}</View>
          <View
            className='btn'
            onClick={this.navigatorTo}
          >{text}</View>
        </View>
      </View>
    )
  }
}

NoData.defaultProps = {
  pageType: 'offer'
}

NoData.propTypes = {
  pageType: PropTypes.string
}
