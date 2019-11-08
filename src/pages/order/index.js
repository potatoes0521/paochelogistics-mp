/*
 * @Author: liuYang
 * @description: 订单列表页
 * @Date: 2019-09-20 13:24:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-08 12:00:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tabs from '@c/tabs/index.js'
import OrderItem from './components/order_item/index.js'
// eslint-disable-next-line import/first
import NoData from '@c/no_data/index.js'
// eslint-disable-next-line import/first
import { orderTabs } from '@config/text_config.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
import './index.styl'

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      orderList: [] // 全部
    }
    this.orderPage = 1
    this.orderFlag = false
    this.status = 10
  }
  componentDidShow() {
    let { userInfo } = this.props
    if (userInfo.userId) {
      this.orderPage = 1
      this.getOrderList(this.status, this.orderPage, false)
    }
  }
  /**
   * 获取订单列表
   * @param {Number} status='' 订单状态 10 待支付 20 已支付 30 已取消
   * @param {Number} pageNum=1 页数
   * @param {Boolean} showLoading=true 是否显示loading
   * @param {Number} pageSize=10 条数
   * @return void
   */
  getOrderList(status = '', pageNum = 1, showLoading = true, pageSize = 10) {
    if (showLoading) {
      Taro.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    let sendData = {
      status,
      pageNum,
      pageSize
    }
    api.order.getOrderList(sendData, this).then(res => {
      if (res && res.length < pageSize) {
        this.orderFlag = true
      }
      let { orderList } = this.state
      this.orderPage += 1
      if (pageNum === 1) {
        this.setState({
          orderList: res
        })
      } else {
        this.setState({
          orderList: [...orderList, ...res]
        })
      }
      Taro.hideLoading()
    })
  }
  /**
   * 处理tabs点击事件
   * @param {Number} value 参数描述
   * @return void
   */
  handleClick(value) {
    this.orderPage = 1
    this.orderFlag = false
    this.setState({
      current: value,
      orderList: []
    }, () => {
      this.handleRequest()
    })
  }
  handleRequest() { 
    //  10 待支付 20 已支付 30 已取消
    let { current } = this.state
    this.status = ''
    if (current === 0) {
      this.status = 10
    } else if (current === 1) {
      this.status = 20
    } else if (current === 2) {
      this.status = ''
    }
    this.getOrderList(this.status, this.orderPage, true)
  }
  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.orderPage = 1
    this.orderFlag = false
    this.setState({
      orderList: []
    }, () => {
      this.handleRequest()        
    })
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }


  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    console.log('触底')
    if (this.orderFlag) return
    this.handleRequest()
  }
  /**
   * 触发了分享
   * @param {Object} event 参数描述
   * @return void
   */
  onShareAppMessage(event) {
    let imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_mp.png`
    let path = `/pages/index/index`
    let title = `欢迎您进入跑车物流~`
    if (event.from === 'button') {
      let { type, item } = event.target.dataset
      const offerMsg = item && item.inquiryOrderVO
      // share_type = 1 发送给客户  不管谁点进来  去订单详情
      // c_id 是customerID的缩写  主要判断是不是这个用户的单 如果不是就让他进了首页
      if (type === 'inviteCustomer') { // 分享给客户
        path = `/pages/order_details/index?share_type=1&order_id=${item.orderId}&c_id=${item.userId}`
        title = `${offerMsg.sendCityName}发往${offerMsg.receiveCityName}的${offerMsg.carAmount}辆${offerMsg.carInfo}已经发车了`
        imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_c.png`
      }
      if (type === 'shareOrder') { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&order_code=${offerMsg.orderCode}&c_id=${offerMsg.userId}`
        title = `我要运车,需要你助我一臂之力!`
        imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_bargain.png`
      }
    }
    return {
      title,
      path,
      imageUrl
    }
  }

  config = {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true
  }

  render() {
    let {
      current,
      orderList
    } = this.state
    let { userInfo } =  this.props
    const orderItemList = orderList.map(item => {
      const key = item.orderId
      return (
        <OrderItem
          key={key}
          item={item}
          userInfo={userInfo}
        ></OrderItem>
      )
    })
    return (
      <View className='order-wrapper'>
        {
          userInfo.userId ? 
            <Block>
              <View className='tabs-wrapper'>
                <Tabs
                  activeIndex={current}
                  options={orderTabs}
                  onClick={this.handleClick.bind(this)}
                ></Tabs>
              </View>
              <View className='swiper-wrapper'>
                {
                  orderList.length > 0 ?
                    orderItemList
                    :
                    <NoData pageType='order'></NoData>
                }
              </View>
            </Block>
            :
            <NoData pageType='login'></NoData>
        }
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