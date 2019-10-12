/*
 * @Author: guorui
 * @description: 订单详情--底部详情
 * @Date: 2019-09-20 09:58:08
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-11 18:20:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro' 
import {
  View,
  Text
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
    this.state = {
      visible: true, //判断订单详情底部状态
      isShow: false //判断立即支付按钮是否显示
    }
  } 
  
  render() {
    let {
      visible,
      isShow
    } = this.state
    let { item }  = this.props
    return (
      <View className='footer-details-wrapper'>
        <OrderFooterCard>
          <View className='status-wrapper'>
            {
              ( visible ) ?
                <View className='immediate_payment'>
                  {
                    ( isShow ) ?
                      <View className='lower-button'>
                        <View className='collect-button buttons'>分享给客户</View>
                      </View>
                      :
                      <View className='upper-button'>
                        <View className='pay-button buttons'>立即支付
                          {
                            (!item.promotionsPrice) ?
                              <Text className='reduce-price'>(立减{item.promotionsPrice}元)</Text>
                              : null
                          }
                        </View>
                        <View className='share-button buttons'>分享砍价</View>
                      </View>
                  }
                </View>
                :
                <View className='lower-button'>
                  <View className='collect-button buttons'>查看运输状态</View>
                </View>
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