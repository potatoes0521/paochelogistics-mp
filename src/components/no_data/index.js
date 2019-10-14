/*
 * @Author: liuYang
 * @description: 没有订单的样式
 * @Date: 2019-09-29 15:00:46
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-14 16:25:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
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
  navigatorTo() { 

  }
  render() {
    let { pageType } = this.props
    let imgSrc = ''
    let text = '去询价'
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
        break;
      case 'login':
        imgSrc = noCustomerDataImg
        text = '去登录'
        break;
      default:
        imgSrc = noOfferDataImg
        return
    }
    return (
      <View className='no-data-wrapper'>
        <View className='main'>
          <Image
            className='image'
            src={imgSrc}
          ></Image>
          <View className='tips'>亲，暂时没有相关订单哦～</View>
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
