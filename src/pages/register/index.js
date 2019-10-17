/*
 * @Author: liuYang
 * @description: 注册页面
 * @Date: 2019-08-22 11:58:25
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-17 17:08:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Input
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import refreshToken from '@utils/refreshToken.js'
import Actions from '@store/actions/index.js'
import classNames from 'classnames'

import './index.styl'

class usePhoneNumberRegister extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      countDown: 90,
      timerFlag: false,
      agreementRadio: true, //协议是否选中
      isShow: false,
      // eslint-disable-next-line react/no-unused-state
      agreementsList: { //协议内容，weight:0  字体加粗， weight:1 字体不加错
        'paragraph': [
          {
            'text': '感谢您选择“跑车物流”服务平台（以下简称“平台”）'
          },
          {
            'text': '跑车物流服务使用协议（以下简称“本协议”）是深圳华供科技有限公司和您签订。'
          }
        ],
        'main': [
          {
            'text': '一、跑车物流协议的确认',
            'weight': '0'
          },
          {
            'text': '1、请您仔细阅读协议内容，特别是字体加粗部分。',
            'weight': '1'
          },
          {
            'text': '2、如果您对本协议内容存在疑虑或异议，勿进行下一步操作。',
            'weight': '1'
          }
        ]
      }
    }
    this.verificationCode = '' // 验证码
    this.phoneNumber = ''       // 手机号
    this.timer = null
  }
  
  componentWillUnmount() { 
    clearInterval(this.timer)
  }
  /**
   * 注册
   * @param {String || Number} phoneNumber 手机号
   * @param {Number} verificationCode 验证码
   * @return void
   */
  handleRegister(phoneNumber, verificationCode='') {
    let sendData = {
      mobile: phoneNumber,
      verificationCode,
      openId: this.props.userInfo.openId
    }
    api.user.register(sendData, this).then(res => {
      let resData = Object.assign({}, res.userInfo, res.userInfoExt)
      Actions.changeUserInfo(resData)
      this.login(this.props.userInfo.openId)
    })
  }
  /**
  * 使用openID登录
  * @param {String} openid
  * @return void
  */
  login(openId = this.props.userInfo.openId) {
    let sendData = {
      token: this.props.userInfo.token,
      openId
    }
    api.user.loginUseOpenID(sendData, this).then(res => {
      if (res) {
        let resData = Object.assign({}, res)
        if (!sendData.token || sendData.token !== resData.token) {
          refreshToken.setNewToken(resData.token)
        }
        Actions.changeUserInfo(resData)
        // 给redux一个反应时间
        setTimeout(() => {
          Taro.navigateBack()
        }, 300)
      }
    })
  }
  /**
   * 输入手机号
   * @param {Object} e event对象
   * @return void
   */
  onPhoneInputChange(e) {
    let { value } = e.detail
    this.phoneNumber = value
  }
  /**
   * 输入验证码
   * @param {Object} e event对象
   * @return void
   */
  onVerificationCodeInputChange(e) {
    let { value } = e.detail
    this.verificationCode = value
  }
  /**
   * 提交注册
   * @return void
   */
  submitRegister() { 
    if (!(/^1[3456789]\d{9}$/.test(this.phoneNumber))) {
      Taro.showToast({
        title: '手机号输入格式有误',
        icon: 'none'
      })
      return
    }
    if (!(/^\d{6}\b/.test(this.verificationCode))) {
      Taro.showToast({
        title: '验证码格式有误',
        icon: 'none'
      })
      return
    }
    if (!this.state.agreementRadio) {
      Taro.showToast({
        title: '请点击注册协议',
        icon: 'none'
      })
      return
    }
    this.handleRegister(this.phoneNumber, this.verificationCode)
  }
  /**
   * 获取验证码
   * @return void
   */
  getVerificationCode() { 
    let {
      countDown,
      timerFlag
    } = this.state
    if (timerFlag) return
    if (!(/^1[3456789]\d{9}$/.test(this.phoneNumber))) {
      Taro.showToast({
        title: '手机号输入格式有误',
        icon: 'none'
      })
      return
    }
    let sendData = {
      mobile: this.phoneNumber
    }
    this.setState({
      timerFlag: true
    })
    api.user.getVerificationCode(sendData, this)
      .then(() => {
        Taro.showToast({
          title: '验证码已发送'
        })
        this.handleCountDown(countDown, timerFlag)        
      })
  }
  /**
   * 倒计时
   * @param {Number} countDown 倒计时的数字
   * @param {Boolean} timerFlag 倒计时的开关
   * @return void
   */
  handleCountDown(countDown, timerFlag) {
    if (timerFlag) return
    console.log('获取验证码')
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      countDown -= 1
      if (countDown <= 0) {
        countDown = 0
        clearInterval(this.timer)
        this.setState({
          timerFlag: false
        })
        setTimeout(() => {
          this.setState({
            countDown: 90
          })
        }, 1000)
      } else {
        this.setState({
          countDown
        })
      }
    }, 1000)
  }

  /**
   * 注册协议
   * @description: agreementRadio 注册协议按钮
   * @param {type} 
   * @return: 
   */
  getRegistrationAgreementRadio() {
    let {
      agreementRadio
    } = this.state
    this.setState({
      agreementRadio: !agreementRadio
    })
  }

  /**
   * 用户注册协议
   * @description: 
   * @param {type} 
   * @return: 
   */
  showRegistrationAgreement() {
    this.setState({
      isShow: true
    })
  }

  closeRegistrationAgreement() {
    this.setState({
      isShow: false
    })
  }

  config = {
    navigationBarTitleText: '跑车物流'
  }

  render() {
    let {
      timerFlag,
      countDown,
      agreementRadio,
      isShow
    } = this.state
    const getVerificationCodeClassName = classNames({
      'btn-code': true,
      'disabled-btn': timerFlag
    })
    const registrationAgreementRadio = classNames({
      'agreement-radio': !agreementRadio,
      'agree-agreement iconfont iconduigoux': agreementRadio
    })
    const showAgreements = classNames({
      'agreements-wrapper': true,
      'show-agreements': isShow
    })
    return (
      <View className='page-wrapper'>
        <View className='register-from'>
          <View className='from-item'>
            <View className='input-wrapper'>
              <Input
                placeholder='请输入您的手机号'
                maxLength='11'
                className='input-style'
                type='number'
                onInput={this.onPhoneInputChange}
              ></Input>
            </View>
          </View>
          <View className='from-item'>
            <View className='input-wrapper'>
              <Input
                placeholder='请输入验证码'
                className='input-style'
                maxLength='6'
                type='number' 
                onInput={this.onVerificationCodeInputChange}
              ></Input>
            </View>
            <View
              className={getVerificationCodeClassName}
              onClick={this.getVerificationCode}
            >
              {
                !timerFlag ? '获取验证码': `${countDown}S后重试`
              }
            </View>
          </View>
          <View className='agreement-wrapper'>
            <View
              className={registrationAgreementRadio}
              onClick={this.getRegistrationAgreementRadio}
            ></View>
            <View className='agreement-text'>
              <Text>我已阅读并同意跑车物流</Text>
              <Text className='agreement' onClick={this.showRegistrationAgreement}>注册协议</Text>
            </View>
          </View>
          <View
            className='submit-btn'
            onClick={this.submitRegister}
          >登录</View>
        </View>
        <View className={showAgreements}>
          <View className='agreements-style'>
            <View className='agreements-title'>用户注册协议</View>
            <View className='line'></View>
            <View className='agreements-top'>
              <View className='agreements-content'></View>
              <View className='agreements-button' onClick={this.closeRegistrationAgreement}>我知道了</View>
            </View>
          </View>
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
export default connect(mapStateToProps)(usePhoneNumberRegister)