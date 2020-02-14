/*
 * @Author: guorui
 * @description: 实名认证
 * @Date: 2019-11-07 14:30:48
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 20:48:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image } from '@tarojs/components'
import certificationImage from '@img/certification_modal/certification_img.png'
import './index.styl'

export default class CertificationModal extends Component {
  constructor(props) { 
    super(props)
    this.state = {}
  }

  goToCertificationModal() {
    let url = `/pages/real_name_authentication/index?page_back=1`
    if (this.props.redirect) { 
      Taro.redirectTo({url})
    } else {
      Taro.navigateTo({url})
    }
    this.closeCertificationModal()
  }

  stopCertificationModal(e) {
    e.stopPropagation()
  }

  closeCertificationModal() {
    this.props.onClick(...arguments)
  }

  render() {
    let { visible } = this.props
    return visible ? (
      <View className='certification-wrapper' onClick={this.closeCertificationModal.bind(this, 'certification')}>
        <View className='certification-card' onClick={this.stopCertificationModal}>
          <View className='image-wrapper'>
            <Image className='certification-image' src={certificationImage}></Image>
          </View>
          <View className='certification-title'>实名认证</View>
          <View className='certification-tips'>请提交身份信息，完成认证</View>
          <View className='certification-btn' onClick={this.goToCertificationModal}>去认证</View>
        </View>
      </View>
    ) : null
  }
}

CertificationModal.defaultProps = {
  visible: false,
  redirect: false,
  onClick: () => {}
}

CertificationModal.propTypes = {
  redirect: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}