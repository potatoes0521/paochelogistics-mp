/*
 * @Author: guorui
 * @description: 订单详情报价、 金额、 支付方式 
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-11 15:04:41
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import '../../../../assets/icon_font/icon.scss'
import './index.styl'

export default class PriceDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  click() { 
    this.props.onClick(...arguments)
  }
  render() { 
    let {
      item,
      fail
    } = this.props
    const payTypeClassName = classNames(
      'number',
      {
        'fail-price': item.payType === '--'
      }
    ) 
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>报价:</View>
          <View className='details-form-price'>￥{item.inquiryOrderVO && item.inquiryOrderVO.quotedPriceDesc || item.quotedPriceDesc || ''}</View>
          {/* <Text className='number'>/台</Text> */}
        </View>
        {
          (item.bargainPriceDesc) ?
            <View className='details-form-item'>
              <View className='details-form-label'>帮砍价:</View>
              {
                fail ? 
                  <Block>
                    <View
                      className='details-form-price fail-price'
                      onClick={this.click}
                    >
                      <Text>-￥{item.bargainPriceDesc}(不可用)</Text>
                      <Text className='iconfont icongantanhao icon-style'></Text>
                    </View>
                  </Block>
                  :
                  <View className='details-form-price'>-￥{item.bargainPriceDesc}</View>
              }
            </View>
            : null
        }
        {
          (item.promotionsPrice) ?
            <View className='details-form-item'>
              <View className='details-form-label'>立即支付立减:</View>
              <View className='details-form-price'>-￥{item.promotionsPrice}</View>
            </View>
            : null
        }
        <View className='details-form-item'>
          <View className='details-form-label'>应付金额:</View>
          <View className='details-form-price'>￥{item.payPriceDesc || ''}</View>
        </View>
        {
          item.share_type !== '3' && (
            <View className='details-form-item'>
              <View className='details-form-label'>支付方式:</View>
              <View className={payTypeClassName}>{item.payType || ''}</View>
            </View>
          )
        }
      </View>
    )
  }
}


PriceDetailsComponent.defaultProps = {
  item: {},
  fail: false,
  onClick: () => {},
}

PriceDetailsComponent.propTypes = {
  item: PropTypes.object,
  fail: PropTypes.bool,
  onClick: PropTypes.func,
}
