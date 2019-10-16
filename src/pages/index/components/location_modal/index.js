/*
 * @Author: guorui
 * @description: 地址授权模态框
 * @Date: 2019-10-16 09:27:37
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-16 11:45:37
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import '@/app.styl'
import './index.styl'

export default class LocationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  cancelModal = () => {
    this.props.onModalCallBack(true)
  }

  render() {
    return (
      <View className='modal-wrapper'>
        <View className='modal-box'>
          <View className='modal-main'>标题</View>
          <View className='modal-content'>告知当前状态，信息和解决方法</View>
          <View className='modal-btn-wrapper'>
            <View className='modal-btn model-btn-cancel'
              onClick={() => this.cancelModal()}
            >取消</View>
            <Button
              className='modal-btn model-btn-ok'
              openType='openSetting'
            >允许</Button>
          </View>
        </View>
      </View>
    )
  }
}