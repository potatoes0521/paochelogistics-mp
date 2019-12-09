/*
 * @Author: liuYang
 * @description: 订单列表页
 * @Date: 2019-09-20 13:24:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-09 15:19:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { defaultResourceImgURL } from '@config/request_config.js'
import TabsCanSelect from '@c/tabs_select/index.js'
import OrderItem from './components/order_item/index.js'
// eslint-disable-next-line import/first
import Screen from '@c/screen/index.js'
// eslint-disable-next-line import/first
import Drawer from '@c/drawer/index.js'
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
      orderList: [], // 全部
      searchDrawerShow: false, // 控制左滑的抽屉显示
      sendCityId: '',
      sendCityName: '',
      receiveCityId: '',
      receiveCityName: ''
    }
    this.orderPage = 1
    this.orderFlag = false
    this.status = 10
  }
  
  componentDidMount() {
    let { userInfo } = this.props
    if (userInfo.userId) {
      this.getOrderList({})
    }
  }
  /**
   * 获取订单列表
   * @param {Number} status='' 订单状态 10 待支付 20 已支付 30 已取消
   * @param {Number} pageNum=1 页数
   * @param {Number} pageSize=10 条数
   * @param {String} sendCityId='' 收车城市id
   * @param {String} receiveCityId='' 发车城市id
   * @param {String} createTimeStart='' 开始时间
   * @param {String} createTimeEnd='' 结束时间
   * @return void
   */
  getOrderList({
    status = this.status,
    pageNum = this.orderPage,
    pageSize = 10,
    sendCityId = '',
    receiveCityId = '',
    createTimeStart = '',
    createTimeEnd = ''
  }) {
    let sendData = {
      status,
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
      createTimeStart,
      createTimeEnd
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
    })
  }
  /**
   * 处理tabs点击事件
   * @param {String} type 点的是tab还是筛选
   * @param {Number} value 参数描述
   * @return void
   */
  handleTabsClick(type, value) {
    if (type === 'tabs') {
      this.orderPage = 1
      this.orderFlag = false
      this.setState({
        current: value,
        orderList: []
      }, () => {
        this.handleRequest()
      })
    } else {
      let {
        searchDrawerShow
      } = this.state
      this.setState({
        searchDrawerShow: !searchDrawerShow
      })
    }
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
    this.getOrderList({})
  }
  /**
   * 抽屉关闭函数
   * @return void
   */
  drawerClose() {
    this.setState({
      searchDrawerShow: false
    })
  }
  handleSelectClick(type, params) {
    this.offerFlag = true
    this.offerPage = 1
    if (type === 'submit') {
      let {
        sendCityId,
        receiveCityId,
      } = this.state
      params.sendCityId = sendCityId
      params.receiveCityId = receiveCityId
      // 提交
      this.getOrderList(params)
    } else {
      // 重置
      this.setState(params, () => {
        this.getOrderList({})
      })
    }
    this.setState({
      searchDrawerShow: false
    })
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
    let imageUrl = `${defaultResourceImgURL}share_mp.png`
    let path = `/pages/index/index`
    let title = `欢迎您进入跑车物流~`
    if (event.from === 'button') {
      let { type, item } = event.target.dataset
      const offerMsg = item && item.inquiryOrderVO
      // share_type = 1 发送给客户  不管谁点进来  去订单详情
      // c_id 是customerID的缩写  主要判断是不是这个用户的单 如果不是就让他进了首页
      if (type === 'inviteCustomer') { // 分享给客户
        path = `/pages/order_details/index?share_type=1&order_code=${item.orderCode}&c_id=${item.userId}`
        title = `${offerMsg.sendCityName}发往${offerMsg.receiveCityName}的${offerMsg.carAmount}台${offerMsg.carInfo}已经发车了`
        imageUrl = `${defaultResourceImgURL}share_to_c.png`
      }
      if (type === 'shareOrder') { // 分享给客户
        path = `/pages/share_bargain/index?share_type=2&order_code=${offerMsg.orderCode}&c_id=${offerMsg.userId}`
        title = `我要运车,需要大侠助我一臂之力!!!`
        imageUrl = `${defaultResourceImgURL}share_to_bargain.png`
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
      orderList,
      searchDrawerShow,
      sendCityName,
      receiveCityName
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
                <TabsCanSelect
                  activeIndex={current}
                  options={orderTabs}
                  onClick={this.handleTabsClick.bind(this)}
                >
                </TabsCanSelect>
              </View>
              <View className='swiper-wrapper'>
                {
                  orderList.length > 0 ?
                    orderItemList
                    :
                    <NoData pageType='order'></NoData>
                }
              </View>
              <Drawer
                show={searchDrawerShow}
                mask
                right
                onClose={this.drawerClose.bind(this)}
              >
                <Screen
                  sendCityName={sendCityName}
                  receiveCityName={receiveCityName}
                  showType={['cities', 'times']}
                  onClick={this.handleSelectClick.bind(this)}
                ></Screen>
              </Drawer>
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