/*
 * @Author: liuYang
 * @description: 修改个人信息
 * @Date: 2019-09-27 15:42:38
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 18:19:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input
} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class EditMineInfo extends Component { 
  
  config = {
    navigationBarTitleText: '个人信息完善'
  }

  render() { 
    return (
      <View className='page-wrapper'>
        <View className='mine-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>微信名字</View>
            <View className='item-text'>赚大钱</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>
              <Input
                className='input-public'
                placeholder='请输入姓名'
                placeholderClass='placeholder-style'
                maxLength='6'
              ></Input>
            </View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>12345678</View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属经销商</View>
            <View className='item-text'>
              <Input
                className='input-public'
                placeholder='请输入客户所属经销商'
                placeholderClass='placeholder-style'
              ></Input>
            </View>
          </View>
          <View className='info-item'>
            <View className='item-label'>身份证号</View>
            <View className='item-text'>
              <Input
                className='input-public'
                placeholder='请输入客户身份证号'
                placeholderClass='placeholder-style'
                maxLength='20'
                type='number'
              ></Input>
            </View>
          </View>
        </View>
        <View className='edit-btn-group'>
          <View
            className='btn cancel'
          >取消</View>
          <View
            className='btn submit'
          >保存</View>
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
export default connect(mapStateToProps)(EditMineInfo)