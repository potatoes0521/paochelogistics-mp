/*
 * @Author: liuYang
 * @description: 订单列表页
 * @Date: 2019-09-20 13:24:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-24 09:54:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper ,SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tabs from '@c/tabs/index.js'
import OrderItem from './components/order_item/index.js'
// eslint-disable-next-line import/first
import { orderTabs } from '@config/text_config.js'

import './index.styl'

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      allOfferList: [{}]
    }
  }
  /**
   * 处理tabs点击事件
   * @param {Number} value 参数描述
   * @return void
   */
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  /**
   * swiper onChange事件
   * @param {Object} e 参数描述
   * @return void
   */
  changeSwiper(e) {
    this.setState({
      current: e.detail.current
    })
  }
  config = {
    navigationBarTitleText: '订单'
  }

  render() {
    let { current, allOfferList } = this.state
    const AllOfferItemList = allOfferList.map(item => {
      return (
        <OrderItem
          key={item}
        ></OrderItem>
      )
    })
    const hasOfferItemList = allOfferList.map(item => {
      return (
        <OrderItem
          key={item}
        ></OrderItem>
      )
    })
    const onOfferItemList = allOfferList.map(item => {
      return (
        <OrderItem
          key={item}
        ></OrderItem>
      )
    })
    return (
      <View className='order-wrapper'>
        <Tabs
          activeIndex={current}
          options={orderTabs}
          onClick={this.handleClick.bind(this)}
        >
          <Swiper
            duration={300}
            current={current}
            className='swiper-wrapper'
            onChange={this.changeSwiper}
          >
            <SwiperItem>
              {
                AllOfferItemList
              }
            </SwiperItem>
            <SwiperItem>
              {
                hasOfferItemList
              }
            </SwiperItem>
            <SwiperItem>
              {
                onOfferItemList
              }
            </SwiperItem>
          </Swiper>
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Order)