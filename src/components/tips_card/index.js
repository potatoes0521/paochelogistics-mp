/*
 * @Author: guorui
 * @description: 删除订单时的弹框
 * @Date: 2019-12-09 17:04:32
 * @LastEditors: guorui
 * @LastEditTime: 2019-12-10 15:05:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import './index.styl'

export default class TipsCard extends Component {
  constructor(props) { 
    super(props)
    this.state = {}
  }

  stopTipsCard(e) {
    e.stopPropagation()
  }

  cancelTips() { 
    this.props.onClick('cancel')
  }

  submitTips() { 
    this.props.onClick('submit')
  }

  render() {
    return (
      <View className='tips-wrapper'>
        <View className='tips-card' onClick={this.stopTipsCard}>
          <View className='tips-title'>标题</View>
          <View className='tips-content'>该操作会取消该订单,操作不可撤回,是否继续操作?</View>
          <View className='tips-btn'>
            <View className='cancel' onClick={this.cancelTips.bind(this, 'cancel')}>取消</View>
            <View className='confirm' onClick={this.submitTips.bind(this, 'submit')}>确认</View>
          </View>
        </View>
      </View>
    )
  }
}

TipsCard.defaultProps = {
  onClick: () => {}
}

TipsCard.propTypes = {
  onClick: PropTypes.func.isRequired
}