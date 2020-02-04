/*
 * @Author: liuYang
 * @description: 工具页面
 * @path: 引入路径
 * @Date: 2020-02-04 14:53:48
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 16:38:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import api from '@api/index.js'
import navigatorToChannel from '@utils/navigator_to_channel.js'

import './index.styl'

class Tool extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toolList: []
    }
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '工具' 
  }
  /**
   * 跳转到webview界面
   * @param {Object} item 参数
   * @return void
   */
  navigatorToTool(item) {
    navigatorToChannel(item)
  }
  render() {
    const { toolList } = this.state
    const gridListRender = toolList.map((item, index) => {
      const key = item
      const itemClassName = classNames('tool-grid-item', {
        'grid-item-right-border': index % 3 !== 2
      })
      return (
        <View className={itemClassName} onClick={this.navigatorToTool.bind(this, item)} key={key}>
          <Image className='tool-grid-item-image' src='https://resource.paoche56.com/paochelogistics/mp_img/banner/stop_run.png'></Image>
          <Text className='tool-grid-item-text'>{item}</Text>
        </View>
      )
    })
    return (
      <View className='page-wrapper'>
        {gridListRender}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Tool)