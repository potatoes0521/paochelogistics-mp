/*
 * @Author: liuYang
 * @description: 注册页面
 * @Date: 2019-08-22 11:58:25
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-14 13:36:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Input,
  Button
} from '@tarojs/components'
import { phoneNumberPatter } from '@utils/patter.js'
import { connect } from '@tarojs/redux'
import { defaultResourceConfigURL } from '@config/request_config.js'
import api from '@api/index.js'
import refreshToken from '@utils/refresh_token.js'
import Actions from '@store/actions/index.js'
import classNames from 'classnames'
import { handleRegisterShare } from '@utils/handle_share.js'
import login from '@utils/login.js'

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
      agreementsParagraphList: [], //协议内容，weight:0  字体加粗， weight:1 字体不加错
      agreementsMainList: [],
      disabled: true,
      // eslint-disable-next-line react/no-unused-state
    }
    this.verificationCode = '' // 验证码
    this.phoneNumber = ''       // 手机号
    this.timer = null
    this.pageParams = {}
  }
  
  
  componentDidMount() { 
    this.pageParams = this.$router.params
    console.log('params', this.pageParams)
    this.getAgreement()
    login.getCode(this, true)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  /**
   * 输入手机号
   * @param {Object} e event对象
   * @return void
   */
  onPhoneInputChange(e) {
    let { value } = e.detail
    
    if ((phoneNumberPatter.test(value)) && (/^\d{4,6}\b/.test(this.verificationCode))) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
    this.phoneNumber = value
  }
  /**
   * 输入验证码
   * @param {Object} e event对象
   * @return void
   */
  onVerificationCodeInputChange(e) {
    let { value } = e.detail
    if ((phoneNumberPatter.test(this.phoneNumber)) && (/^\d{4,6}\b/.test(value))) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
    this.verificationCode = value
  }
  /**
   * 提交注册
   * @return void
   */
  submitRegister(e) { 
    if (!(phoneNumberPatter.test(this.phoneNumber))) {
      Taro.showToast({
        title: '手机号输入格式有误',
        icon: 'none'
      })
      return
    }
    if (!(/^\d{4,6}\b/.test(this.verificationCode))) {
      Taro.showToast({
        title: '验证码格式有误',
        icon: 'none'
      })
      return
    }
    if (!this.state.agreementRadio) {
      Taro.showToast({
        title: '请阅读和勾选注册协议',
        icon: 'none'
      })
      return
    }
    const wxUserInfo = e.target.userInfo
    if (!wxUserInfo) {
      Taro.showToast({
        title: '需要获取一下您的头像和昵称哦~',
        icon: 'none',
        duration: 3000
      })
      return
    }
    this.handleRegister(this.phoneNumber, this.verificationCode, wxUserInfo)
  }
  /**
   * 注册
   * @param {String || Number} phoneNumber 手机号
   * @param {Number} verificationCode 验证码
   * @return void
   */
  handleRegister(phoneNumber, verificationCode = '', wxUserInfo) {
    let sendData = Object.assign({}, wxUserInfo, {
      mobile: phoneNumber,
      verificationCode,
      openId: this.props.userInfo.openId,
      userPhoto: wxUserInfo.avatarUrl,
      nickName: encodeURIComponent(wxUserInfo.nickName),
    })
    api.user.register(sendData, this).then(res => {
      if (res) {
        let resData = Object.assign({}, res)
        if (!sendData.token || sendData.token !== resData.token) {
          refreshToken.setNewToken(resData.token)
        }
        Actions.changeUserInfo(resData)
        // 给redux一个反应时间
        setTimeout(() => {
          if (this.pageParams.pageType === 'token') {
            Taro.switchTab({
              url: '/pages/index/index'
            })
          } else {
            handleRegisterShare({
              pageParams: this.pageParams,
              userInfo: this.props.userInfo,
              wxUserInfo,
              that: this
            })
          }
        }, 300)
      }
    })
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
    if (!(phoneNumberPatter.test(this.phoneNumber))) {
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
   * 选中用户协议
   * @return void
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
   * 获取用户数据
   * @return void
   */
  getAgreement() {
    Taro.request({
      url: `${defaultResourceConfigURL}agreement.json`,
      method: 'get',
      success: (res) => {
        this.setState({
          agreementsMainList: res.data && res.data.main,
          agreementsParagraphList: res.data && res.data.paragraph
        })
      }
    })
  }
  /**
   * 打开用户协议
   * @return void
   */
  showRegistrationAgreement() {
    this.setState({
      isShow: true
    })
  }
  /**
   * 关闭用户协议
   * @return void
   */
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
      // agreementRadio,
      isShow,
      agreementsParagraphList,
      agreementsMainList,
      disabled
    } = this.state
    const getVerificationCodeClassName = classNames({
      'btn-code': true,
      'disabled-btn': timerFlag
    })
    // const registrationAgreementRadio = classNames({
    //   'agreement-radio': !agreementRadio,
    //   'agree-agreement iconfont iconduigoux': agreementRadio
    // })
    const agreementsParagraphListR = agreementsParagraphList.map((item) => (
      <View className='paragraph agreements-font' key={item}>
        { item.text }
      </View>
    ))
    const agreementsList = agreementsMainList.map((item) => {
      const textClassName = classNames({
        'agreements-font-bold': +item.weight === 1,
        'agreements-font': +item.weight === 0,
      })
      return (
        <View className={textClassName} key={item}>{item.text}</View>
      )
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
          <Button
            openType='getUserInfo'
            disabled={disabled}
            lang='zh_CN'
            className='submit-btn'
            onGetUserInfo={this.submitRegister}
          >同意协议并登录</Button>
          <View className='agreement-wrapper'>
            {/* <View
              className={registrationAgreementRadio}
              onClick={this.getRegistrationAgreementRadio}
            ></View> */}
            <View className='agreement-text'>
              <Text>我已阅读并同意跑车物流</Text>
              <Text className='agreement' onClick={this.showRegistrationAgreement}>注册协议</Text>
            </View>
          </View>
        </View>
        {
          isShow ?
            <View className='agreements-wrapper'>
              <View className='agreements-box'>
                <View className='agreements-title'>用户注册协议</View>
                <View className='line'></View>
                <View className='agreements-content'>
                  {
                    agreementsParagraphListR
                  }
                  {
                    agreementsList
                  }
                </View>
                <View className='agreements-button' onClick={this.closeRegistrationAgreement}>我知道了</View>
              </View>
            </View>
            : null
        }
        
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