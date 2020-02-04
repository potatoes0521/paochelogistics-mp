/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-03 15:42:18
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 14:53:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image
} from '@tarojs/components'
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
  /**
   * 跳转到工具界面
   * @param {Object} item 参数
   * @return void
   */
  navigatorToTool(item) {
    console.log(item)
    if (item === 'page') { 
      Taro.navigateTo({
        url: '/pages/tool/index',
      })
    }
  }
  render() {
    let { toolList } = this.props
    let newArray = []
    if (toolList && toolList.length > 2) {
      for (var i = 0; i < toolList.length; i += 3) {
        newArray.push(toolList.slice(i, i + 3));
      }
    }
    console.log('newArray', newArray)
    // 工具swiper列表
    const toolListRender = toolList.map(item => {
      const key = item.id
      return (
        <SwiperItem key={key}>
          <View className='tool-swiper-item'>
            <Image
              className='tool-swiper-image'
              src={item.img}
              onClick={this.navigatorToWebView.bind(this, item)}
            ></Image>
          </View>
        </SwiperItem>
      )
    })
    const gridListRender = newArray.map(item => {
      const key = item
      return (
        <View className='tool-grid-line' key={key}>
          {
            item.map(ite => {
              const keys = ite
              return (
                <View className='tool-grid-item' key={keys}>
                  <Image className='tool-grid-item-image' src='https://resource.paoche56.com/paochelogistics/mp_img/banner/stop_run.png'></Image>
                  <Text className='tool-grid-item-text'>{ite}</Text>
                </View>
              )
            })
          }
          
        </View>
      )
    })
    return (
      toolList && toolList.length ?
      // 小于等于两个是swiper形式
        toolList.length <= 2 ?
          (
            <View className='tool-letter-wrapper'>
              <Swiper
                className='tool-swiper'
                autoplay
                indicatorDots
                circular
                indicatorActiveColor='#2A80C0'
                interval='3000'
              >
                {
                  toolList.length ?
                    toolListRender
                    :
                    <SwiperItem
                      onClick={this.navigatorToWebView.bind(this, {})}
                    ></SwiperItem>
                }
              </Swiper>
            </View>
          ) : (
            <View className='tool-wrapper'>
              <View className='tool-title-wrapper'>
                <Text className='tool-title'>工具</Text>
                <View className='tool-more-wrapper' onClick={this.navigatorToTool.bind(this, 'page')}>
                  <Text className='tool-more'>更多工具</Text>
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
                </View>
              </View>
              <View className='tool-grid-wrapper'>
                {gridListRender}
              </View>
            </View>
          )
        : null
    )
  }

}

index.defaultProps = {
  toolList: [],
  onClick: () => {}
}

index.propTypes = {
  toolList: PropTypes.array,
  onClick: PropTypes.func.isRequired
}