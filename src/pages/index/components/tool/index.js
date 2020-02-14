/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-03 15:42:18
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 14:54:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  Block
} from '@tarojs/components'
import PropTypes from 'prop-types'
import {navigatorToChannel} from '@utils/navigator_to_channel.js'
import './index.styl'

export default class Tool extends Component {

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state = {}
  }
  /**
   * 跳转到工具界面
   * @param {Object} item 参数
   * @return void
   */
  navigatorToTool(item) {
    if (item === 'type') {
      item.locationUrl = '/pages/tool/index'
    }
    navigatorToChannel(item)
  }
  render() {
    let { toolList } = this.props
    let newArray = []
    if (toolList && toolList.length > 2) {
      for (var i = 0; i < toolList.length; i += 3) {
        newArray.push(toolList.slice(i, i + 3));
      }
    }
    // 工具swiper列表
    const toolListRender = toolList.map(item => {
      const key = item.toolId
      return (
        <SwiperItem key={key}>
          <View className='tool-swiper-item'>
            <Image
              className='tool-swiper-image'
              src={item.logo}
              onClick={this.navigatorToTool.bind(this, item)}
            ></Image>
          </View>
        </SwiperItem>
      )
    })
    const gridListRender = newArray.map((item, index) => {
      const key = item
      return (
        <Block key={key}>
          <View className='tool-grid-line'>
            {
              item.map(ite => {
                const keys = ite
                return (
                  <View className='tool-grid-item' onClick={this.navigatorToTool.bind(this, ite)} key={keys}>
                    <Image className='tool-grid-item-image' src={ite.logo}></Image>
                    <Text className='tool-grid-item-text'>{ite.toolName}</Text>
                  </View>
                )
              })
            }
          </View>
          {index !== newArray.length - 1 && <View className='tool-grid-item-line'></View>}
      </Block>
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
                      onClick={this.navigatorToTool.bind(this, {})}
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

Tool.defaultProps = {
  toolList: [],
  onClick: () => {}
}

Tool.propTypes = {
  toolList: PropTypes.array,
  onClick: PropTypes.func.isRequired
}