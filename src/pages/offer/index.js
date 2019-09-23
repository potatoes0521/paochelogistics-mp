/*
 * @Author: liuYang
 * @description: 询价单页面
 * @Date: 2019-09-20 13:24:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-23 10:56:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper ,SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tabs from '@c/tabs/index.js'

import './index.styl'

class Offer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  changeSwiper(e) { 
    this.setState({
      current: e.detail.current
    })
  }
  config = {
    navigationBarTitleText: '询价单'
  }
  render() {
    let { current } = this.state 
    const tabList = [
      {
        label: '全部',
        id: 0
      },
      {
        label: '已报价',
        id: 1
      },
      {
        label: '未报价',
        id: 2
      }
    ]
    return (
      <View className='offer-wrapper'>
        <View className='tabs-flex-wrapper'>
          <Tabs
            activeIndex={current}
            options={tabList}
            onClick={this.handleClick.bind(this)}
          >
            <Swiper
              duration={300}
              current={current}
              className='swiper-wrapper'
              onChange={this.changeSwiper}
            >
              <SwiperItem> 1 </SwiperItem>
              <SwiperItem>2</SwiperItem>
              <SwiperItem>3</SwiperItem>
            </Swiper>
          </Tabs>
        </View>
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