/*
 * @Author: guorui
 * @description: 地址授权模态框
 * @Date: 2019-10-16 09:27:37
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-13 11:28:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import PropTypes from 'prop-types'

import '@/app.styl'
import './index.styl'

export default class LocationModal extends Component {
  constructor(props) {
    super(props)
  }

  cancelModal() {
    this.props.onClick('1')
  }

  render() {
    let {
      showModal,
      modalTextType
    } = this.props
    let text = '授权地理位置信息,可自动定位显示默认发车城市'
    if (modalTextType === 'carRescue') {
      text = '授权地理位置信息才可以使用地图定位哦'
    }
    return showModal ? (
      <View className='modal-wrapper'>
        <View className='modal-box'>
          <View className='modal-main'>提示</View>
          <View className='modal-content'>{text}</View>
          <View className='modal-btn-wrapper'>
            <View className='modal-btn model-btn-cancel'
              onClick={this.cancelModal.bind(this)}
            >取消</View>
            <Button
              className='modal-btn model-btn-ok'
              openType='openSetting'
            >允许</Button>
          </View>
        </View>
      </View>
    ) : null
  }
}

LocationModal.defaultProps = {
  showModal: false,
  modalTextType: 'default',
  onClick: () => {}
}

LocationModal.propTypes = {
  showModal: PropTypes.bool,
  modalTextType: PropTypes.string,
  onClick: PropTypes.func
}