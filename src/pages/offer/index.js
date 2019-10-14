/*
 * @Author: liuYang
 * @description: 询价单页面
 * @Date: 2019-09-20 13:24:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-14 16:37:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper ,SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tabs from '@c/tabs/index.js'
import OfferItem from './components/offer_item/index.js'
// eslint-disable-next-line import/first
import NoData from '@c/no_data/index.js'
// eslint-disable-next-line import/first
import { offerTabs } from '@config/text_config.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
import './index.styl'

class Offer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      allOfferList: [],   // 全部报价单
      hasOfferList: [],   // 已报价
      noOfferList: []     // 未报价
    }
    this.allOfferPage = 1
    this.hasOfferPage = 1
    this.noOfferPage = 1
    this.allOfferFlag = false
    this.hasOfferFlag = false
    this.noOfferFlag = false
  }

  componentDidShow() { 
    let { userInfo } = this.props
    if (userInfo.userId) { 
      this.getOfferList('', 1, true)
      this.getOfferList(10, 1, true)
      this.getOfferList(20, 1, true)
    }
  }

  /**
   * 获取询价单列表
   * @param {Number} status='' 询价单状态 10 未报价 20 已报价 30 已失效 40 已取消
   * @param {Number} pageNum=1 页数
   * @param {Boolean} showLoading=true 是否显示loading
   * @param {Number} pageSize=10 条数
   * @return void
   */
  getOfferList(status = '', pageNum = 1, showLoading = true,pageSize = 10) {
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
    api.offer.getOfferList(sendData, this).then(res => {
      if (res && res.length < pageSize) {
        if (status === '') {          // 全部
          this.allOfferFlag = true   
        } else if (status === 10) {   // 未报价
          this.noOfferFlag = true
        } else if (status === 20){    // 已报价
          this.hasOfferFlag = true          
        }
      }
      let {
        allOfferList,
        hasOfferList,
        noOfferList
      } = this.state
      
      if (pageNum === 1) {
        this.updateState(status, [...res])
      } else {
        if (status === '') { // 全部
          this.updateState(status, [...allOfferList, ...res])
        } else if (status === 10) { // 未报价
          this.updateState(status, [...noOfferList, ...res])
        } else if (status === 20) { // 已报价
          this.updateState(status, [...hasOfferList, ...res])
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
      case '': 
        this.allOfferPage += 1        
        this.setState({
          allOfferList: value
        })
        break
      case 10:  // 未报价
        this.noOfferPage += 1
        this.setState({
          noOfferList: value
        })
        break
      case 20:  // 已报价
        this.hasOfferPage += 1
        this.setState({
          hasOfferList: value
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
    this.allOfferPage = 1
    this.hasOfferPage = 1
    this.noOfferPage = 1
    this.allOfferFlag = false
    this.hasOfferFlag = false
    this.noOfferFlag = false
    this.getOfferList('', 1, true)
    this.getOfferList(10, 1, false)
    this.getOfferList(20, 1, false)
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
    let { current } = this.state
    if (current === 0) {
      if (this.allOfferFlag) return
      this.getOfferList('', this.allOfferPage, true)
    } else if (current === 1) {
      if (this.hasOfferFlag) return
      this.getOfferList(20, this.hasOfferPage, true)
    } else if (current === 2) {
      if (this.noOfferFlag) return
      this.getOfferList(10, this.noOfferPage, true)
    }
  }
  config = {
    navigationBarTitleText: '我的询价单',
    enablePullDownRefresh: true
  }
  render() {
    let {
      current,
      allOfferList,
      hasOfferList,
      noOfferList
    } = this.state
    let { userInfo } = this.props
    const AllOfferItemList = allOfferList.map(item => {
      return (
        <OfferItem
          key={item.inquiryId}
          item={item}
        ></OfferItem>
      )
    })
    const hasOfferItemList = hasOfferList.map(item => {
      return (
        <OfferItem
          key={item.inquiryId}
          item={item}
        ></OfferItem>
      )
    })
    const onOfferItemList = noOfferList.map(item => {
      return (
        <OfferItem
          key={item.inquiryId}
          item={item}
        ></OfferItem>
      )
    })
    return (
      <View className='offer-wrapper'>
        {
          userInfo.userId ? 
            <Tabs
              activeIndex={current}
              options={offerTabs}
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
                    allOfferList.length > 0 ?
                      AllOfferItemList
                      :
                      <NoData pageType='offer'></NoData>
                  }
                </SwiperItem>
                <SwiperItem className='swiper-item'>
                  {
                    hasOfferList.length > 0 ?
                      hasOfferItemList
                      :
                      <NoData pageType='offer'></NoData>
                  }
                </SwiperItem>
                <SwiperItem className='swiper-item'>
                  { 
                    noOfferList.length > 0 ?
                      onOfferItemList
                      :
                      <NoData pageType='offer'></NoData>
                  }
                </SwiperItem>
              </Swiper>
            </Tabs>
            : <NoData pageType='login'></NoData>
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
export default connect(mapStateToProps)(Offer)