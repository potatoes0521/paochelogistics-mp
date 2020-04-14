/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 19:22:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-14 12:42:40
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

  constructor(props) {
    super(props)
    this.state = {
      carNo: '',
      carSituation: 1,
      carInfo: '',
      remark: ''
    }
  }
 
  onCarNoInput(e) {
    let { value } = e.target
    this.setState({
      carNo: value
    }, () => {
      this.handleProps()
    })
  }
  onCarInfoInput(e) {
    let { value } = e.target
    this.setState({
      carInfo: value
    }, () => {
      this.handleProps()
    })
  }
  onRemarksInput(e) {
    let { value } = e.target
    this.setState({
      remark: value
    }, () => {
      this.handleProps()
    })
  }
  /**
   * 单选 选择车辆性质
   * @param {Object} e event对象
   * @return void
   */
  chooseRadio(e) {
    console.log('e', e)
    this.setState({
      carSituation: e.id
    }, () => {
      this.handleProps()
    })
  }
  handleProps() { 
    this.props.onFormValueChange(this.state)
  }
  render() {
    let {
      carSituation,
      carNo,
      carInfo,
      remark
    } = this.state
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
              maxLength='20'
              onInput={this.onCarInfoInput}
              value={carInfo}
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
              maxLength='10'
              onInput={this.onCarNoInput}
              value={carNo}
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
              activeIndex={carSituation}
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
              onInput={this.onRemarksInput}
              value={remark}
            ></Input>
          </View>
        </View>
      </View>
    )
  }

}

MsgForm.defaultProps = {
  onFormValueChange: () => {}
}

MsgForm.propTypes = {
  onFormValueChange: PropTypes.func.isRequired
}