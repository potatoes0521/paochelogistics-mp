/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 19:22:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-12 20:07:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View,Input } from '@tarojs/components'
// import classNames from 'classnames'
import PropTypes from 'prop-types'
import RadioGroups from '@c/radio_group/index.js'
import {
  CarConditionList
} from '@config/text_config.js'

import './index.styl'

export default class MsgForm extends Component { 

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount() {
  }

  /**
   * 单选 选择车辆性质
   * @param {Object} e event对象
   * @return void
   */
  chooseRadio(e) {
    console.log('e', e)
  }

  render() {
    let { } = this.props
    let {activeIndex} = this.state
    return (
      <View className='msg-form-wrapper'>
        <View className='msg-form-item'>
          <View className='msg-form-label'>
            <View className='important'>*</View>
            <View className='label-text'>车辆信息:</View>
          </View>
          <View className='msg-form-content'>
            <Input 
              className='input-class'
              placeholderClass='placeholder-class'
              placeholder='请输入车辆信息，如大众迈腾'
            ></Input>
          </View>
        </View>
        <View className='msg-form-item'>
          <View className='msg-form-label'>
            <View className='important'>*</View>
            <View className='label-text'>车牌号:</View>
          </View>
          <View className='msg-form-content'>
            <Input 
              className='input-class'
              placeholderClass='placeholder-class'
              placeholder='请输入车牌号'
            ></Input>
          </View>
        </View>
        <View className='msg-form-item'>
          <View className='msg-form-label'>
            <View className='important'>*</View>
            <View className='label-text'>车况:</View>
          </View>
          <View className='msg-form-content-radio'>
            <RadioGroups
              options={CarConditionList}
              activeIndex={activeIndex}
              onClick={this.chooseRadio.bind(this)}
            ></RadioGroups>
          </View>
        </View>
        <View className='msg-form-item'>
          <View className='msg-form-label'>
            <View className='important'></View>
            <View className='label-text'>备注:</View>
          </View>
          <View className='msg-form-content'>
            <Input 
              className='input-class'
              placeholderClass='placeholder-class'
              placeholder='您可在此填写备注信息描述清楚车况'
            ></Input>
          </View>
        </View>
      </View>
    )
  }

}

MsgForm.defaultProps = {
  onClick: () => {}
}

MsgForm.propTypes = {
  onClick: PropTypes.func.isRequired
}