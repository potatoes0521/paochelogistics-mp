/*
 * @Author: liuYang
 * @description: 工具页面
 * @path: 引入路径
 * @Date: 2020-02-04 14:53:48
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-05 14:18:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import {navigatorToChannel} from '@utils/navigator_to_channel.js'
import { handleToolButtons } from '../../config/button_config.js'

import './index.styl'

class Tool extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toolList: []
    }
  }

  componentDidMount() {
    this.getToolList()
  }
  /**
   * 获取工具列表
   * @return void
   */
  getToolList() { 
    api.tool.getAllToolList({}, this).then(res => {
      this.setState({
        toolList: handleToolButtons(res)
      })
    })
  }
  /**
   * 跳转到webview界面
   * @param {Object} item 参数
   * @return void
   */
  navigatorToTool(item) {
    console.log('item', item)
    navigatorToChannel(item)
  }
  config = {
    navigationBarTitleText: '工具' 
  }
  
  render() {
    const { toolList } = this.state
    const gridListRender = toolList.map((item, index) => {
      const key = item.toolId
      const itemClassName = classNames('tool-grid-item', {
        'grid-item-right-border': toolList.length % 4 !== 0 ? index % 3 !== 2 : ((index + 1) % 4 !== 0),
        'tool-grid-item-shot': toolList.length % 4 === 0,
      })
      return (
        <View className={itemClassName} onClick={this.navigatorToTool.bind(this, item)} key={key}>
          <Image className='tool-grid-item-image' src={item.smallLogo}></Image>
          <Text className='tool-grid-item-text'>{item.toolName}</Text>
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