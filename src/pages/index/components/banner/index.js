/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-03 14:17:04
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 13:22:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Swiper,
  SwiperItem,
  Image
} from '@tarojs/components'
// import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.styl'

export default class index extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }
  
  /**
   * 跳转到webview界面
   * @param {Object} item 参数
   * @return void
   */
  navigatorToWebView(item) {
    let {
      locationUrl,
      title
    } = item
    if (!locationUrl) return
    locationUrl = encodeURIComponent(locationUrl)
    title = encodeURIComponent(title)
    Taro.navigateTo({
      url: `/pages/webview/index?url=${locationUrl}&title=${title}`
    })
  }

  render() {
    let { bannerList} = this.props
    const bannerListRender = bannerList.map(item => {
      const key = item.id
      return (
        <SwiperItem key={key}>
          <View className='banner-item'>
            <Image
              className='banner-image'
              src={item.img}
              onClick={this.navigatorToWebView.bind(this, item)}
            ></Image>
          </View>
        </SwiperItem>
      )
    })
    return (
      <View className='swiper-wrapper'>
        <Swiper
          className='swiper'
          autoplay
          indicatorDots
          circular
          indicatorActiveColor='#ffffff'
          interval='3000'
        >
          {
            bannerList.length ?
              bannerListRender
              :
              <SwiperItem
                onClick={this.navigatorToWebView.bind(this, {})}
              ></SwiperItem>
          }
        </Swiper>
      </View> 
    )
  }

}

index.defaultProps = {
  bannerList: []
}

index.propTypes = {
  bannerList: PropTypes.array
}