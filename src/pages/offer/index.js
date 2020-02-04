/*
 * @Author: liuYang
 * @description: 询价单页面
 * @Date: 2019-09-20 13:24:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-09 09:46:04
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
import OfferItem from './components/offer_item/index.js'
// eslint-disable-next-line import/first
import EmptyData from '@c/empty_data/index.js'
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
      offerList: []
    }
    this.offerPage = 1
    this.offerFlag = false
    this.status = 10
  }
  
  componentDidMount() { 
    let { userInfo } = this.props
    if (userInfo.userId) {
      this.getOfferList(this.status, this.offerPage)
    }
  }
  /**
   * 获取询价单列表
   * @param {Number} status='' 询价单状态 10 未报价 20 已报价 30 已失效 40 已取消
   * @param {Number} pageNum=1 页数
   * @param {Number} pageSize=10 条数
   * @return void
   */
  getOfferList(status = '', pageNum = 1, pageSize = 10) {
    let sendData = {
      status,
      pageNum,
      pageSize
    }
    api.offer.getOfferList(sendData, this).then(res => {
      if (res && res.length < pageSize) {
        this.offerFlag = true
      }
      this.offerPage += 1
      let { offerList } = this.state
      if (pageNum === 1) {
        this.setState({
          offerList: res
        })
      } else {
        this.setState({
          offerList: [...offerList, ...res]
        })
      }
    })
  }
  /**
   * 处理tabs点击事件
   * @param {Number} value 参数描述
   * @return void
   */
  handleClick(value) {
    this.offerPage = 1
    this.offerFlag = false
    this.setState({
      current: value,
      offerList: []
    }, () => {
      this.handleRequest()
    })
  }
  handleRequest() { 
    let { current } = this.state
    this.status = ''
    if (current === 2) {
      this.status = ''
    } else if (current === 1) {
      this.status = 20
    } else if (current === 0) {
      this.status = 10
    }
    this.getOfferList(this.status, this.offerPage)
  }
  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.offerPage = 1
    this.offerFlag = false
    this.setState({
      offerList: []
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
    if (this.offerFlag) return
    this.handleRequest()
  }
  config = {
    navigationBarTitleText: '我的询价单',
    enablePullDownRefresh: true
  }
  render() {
    let {
      current,
      offerList
    } = this.state
    let { userInfo } = this.props
    const offerItemList = offerList.map(item => {
      const key = item.inquiryId
      return (
        <OfferItem
          key={key}
          item={item}
        ></OfferItem>
      )
    })
    return (
      <View className='page-wrapper'>
        {
          userInfo.userId ? 
            <Block>
              <View className='tabs-wrapper'>
                <Tabs
                  activeIndex={current}
                  options={offerTabs}
                  onClick={this.handleClick.bind(this)}
                ></Tabs>
              </View>                
              <View className='swiper-wrapper'>
                {
                  offerList.length > 0 ?
                    offerItemList
                    :
                    <EmptyData pageType='offer'></EmptyData>
                }
              </View>
            </Block>
            : <EmptyData pageType='login'></EmptyData>
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