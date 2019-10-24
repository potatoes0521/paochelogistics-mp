/*
 * @Author: liuYang
 * @description: 订单列表页
 * @Date: 2019-09-20 13:24:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-24 14:58:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper ,SwiperItem } from '@tarojs/components'
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
      waitPayList: [], // 待支付
      payOverList: [], // 待交车
      allOrderList: [] // 全部
    }
    this.waitPayPage = 1
    this.payOverPage = 1
    this.allOrderPage = 1
    this.waitPayFlag = false
    this.payOverFlag = false
    this.allOrderFlag = false
  }
  componentDidShow() {
    let { userInfo } = this.props
    if (userInfo.userId) {
      this.getOrderList('', 1, true)
      this.getOrderList(10, 1, false)
      this.getOrderList(20, 1, false)
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
        if (status === 10) { // 待支付
          this.waitPayFlag = true
        } else if (status === '') { // 全部
          this.allOrderFlag = true
        } else if (status === 20) { // 已支付
          this.payOverFlag = true
        }
      }
      let {
        waitPayList,
        payOverList,
        allOrderList
      } = this.state

      if (pageNum === 1) {
        this.updateState(status, [...res])
      } else {
        if (status === 10) { // 全部
          this.updateState(status, [...waitPayList, ...res])
        } else if (status === '') { // 未报价
          this.updateState(status, [...allOrderList, ...res])
        } else if (status === 20) { // 已支付
          this.updateState(status, [...payOverList, ...res])
        }
      }
      Taro.hideLoading()
    })
  }
  /**
   * 函数功能描述
   * @param {Number || String} status 状态
   * @param {Array} value 要改的值
   * @return void
   */
  updateState(status, value) {
    switch (status) {
      case 10:  // 未支付
        this.waitPayPage += 1
        this.setState({
          waitPayList: value
        })
        break
      case '': // 全部
        this.allOrderPage += 1
        this.setState({
          allOrderList: value
        })
        break
      case 20: // 已支付
        this.payOverPage += 1
        this.setState({
          payOverList: value
        })
        break
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
  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.waitPayPage = 1
    this.payOverPage = 1
    this.allOrderPage = 1
    this.waitPayFlag = false
    this.payOverFlag = false
    this.allOrderFlag = false
    this.getOrderList('', 1, true)
    this.getOrderList(10, 1, false)
    this.getOrderList(20, 1, false)
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
    let {
      current
    } = this.state
    if (current === 0) {
      if (this.waitPayFlag) return
      this.getOrderList('', this.waitPayPage, true)
    } else if (current === 1) {
      if (this.payOverFlag) return
      this.getOrderList(20, this.payOverPage, true)
    } else if (current === 2) {
      if (this.allOrderFlag) return
      this.getOrderList(10, this.allOrderPage, true)
    }
  }
  /**
   * 触发了分享
   * @param {Object} event 参数描述
   * @return void
   */
  onShareAppMessage(event) {
    const { item } = event.target.dataset
    const offerMsg = item && item.inquiryOrderVO
    let path = `/pages/share_bargain/index?order_id=${item.orderId}`
    let title = `砍价标题`
    if (event.from === 'button') {
      let {
        type
      } = event.target.dataset
      // share_type = 1 发送给客户  不管谁点进来  去订单详情
      // c_id 是customerID的缩写  主要判断是不是这个用户的单 如果不是就让他进了首页
      if (type === 'inviteCustomer') { // 分享给客户
        path = `/pages/index/index?share_type=1&order_id=${item.orderId}&c_id=${item.userId}`
        title = `${offerMsg.sendCityName}发往${offerMsg.receiveCityName}的${offerMsg.carAmount}辆${offerMsg.carInfo}已经发车了`
      }
      return {
        title: title,
        path: path,
        imageUrl: ``
      }
    }
  }

  config = {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true
  }

  render() {
    let {
      current,
      waitPayList,
      payOverList,
      allOrderList
    } = this.state
    let { userInfo } =  this.props
    const waitPayItemList = waitPayList.map(item => {
      const key = item.orderId + '1'
      return (
        <OrderItem
          key={key}
          item={item}
          userInfo={userInfo}
        ></OrderItem>
      )
    })
    const payOverItemList = payOverList.map(item => {
      const key = item.orderId + '2'
      return (
        <OrderItem
          key={key}
          item={item}
          userInfo={userInfo}
        ></OrderItem>
      )
    })
    const allOrderItemList = allOrderList.map(item => {
      return (
        <OrderItem
          key={item.orderId}
          item={item}
          userInfo={userInfo}
        ></OrderItem>
      )
    })
    return (
      <View className='order-wrapper'>
        {
          userInfo.userId ? 
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
                <SwiperItem className='swiper-item'>
                  {
                    waitPayList.length > 0 ?
                      waitPayItemList
                      :
                      <NoData pageType='order'></NoData>
                  }
                </SwiperItem>
                <SwiperItem className='swiper-item'>
                  {
                    payOverList.length > 0 ?
                      payOverItemList
                      :
                      <NoData pageType='order'></NoData>
                  }
                </SwiperItem>
                <SwiperItem className='swiper-item'>
                  {
                    allOrderList.length > 0 ?
                    allOrderItemList
                    :
                    <NoData pageType='order'></NoData>
                  }
                </SwiperItem>
              </Swiper>
            </Tabs>
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