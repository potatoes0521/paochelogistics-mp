/*
 * @Author: guorui
 * @description: 实名认证页面
 * @Date: 2019-11-04 10:29:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-14 13:39:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Image,
  Text,
  // Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
  uploadImage,
  deleteImage
} from '@api/upload_request_handle.js'
import Actions from '@store/actions/index.js'
import {
  validateIdCard,
  realNamePatter
} from '@utils/patter.js'
import classNames from 'classnames'
import api from '@api/index.js'
import './index.styl'

class RealName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beforeImage: '',
      afterImage: '',
      idCard: '',
      realName: '',
      realFlag: false,
    }
    this.timer = null
  }

  componentDidMount() { 
    let { userInfo } = this.props
    if (userInfo.realNameAuthStatus) {
      this.handleAlreadyAuthorize()
    }
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
  }
  /**
   * 处理已经授权的情况  // 后端接口还没有
   * @return void
   */
  handleAlreadyAuthorize() { 
    api.user.getUserAuthorizeMsg({}, this)
      .then(res => {
        this.setState({
          beforeImage: res.idCardFace || '',
          afterImage: res.idCardBack || '',
          idCard: res.idCard || '',
          realName: res.realName || '',
        })
      })
  }
  /**
   * 上传照片
   * @param {String} type before 身份证正面 after身份证反面
   * @param {Object} e 
   * @return void
   */
  chooseImageUpload(type, e) { 
    e.stopPropagation()
    let businessType = 1
    uploadImage({
      count: 1,
      that: this,
      businessType
    }).then(res => { 
      if (res && res.length) { 
        if (type === 'before') {
          this.setState({
            beforeImage: res[0]
          }, () => {
            this.imageOCR(res[0])
            // this.imageOCR('https://resource.paoche56.com/zhengmian.png')
          })
        } else if (type === 'after') {
          this.setState({
            afterImage: res[0]
          })
        }
      } else {
        Taro.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
      }
    })
  }
  /**
   * 身份证ocr识别
   * @param {String} imageUrl url
   * @return void
   */
  imageOCR(imageUrl) {
    let sendData = {
      idCardFace: imageUrl
    }
    api.user.OCR(sendData, this).then(res => {
      const data = JSON.parse(res)
      if (data.errcode === 0 && data.errmsg === 'ok') {
        this.setState({
          idCard: data.id,
          realName: data.name,
          realFlag: false
        })
      } else {
        this.setState({
          realFlag: true
        })
        Taro.showToast({
          title: '识别失败,请换一张试试~',
          icon: 'none',
          duration: 3000,
        })
        let sendDataImage = {
          virthPath: imageUrl
        }
        this.timer = setTimeout(() => {
          deleteImage(sendDataImage, this)
        }, 1800)
      }
    })
  }
  /**
   * 输入姓名
   * @return void
   */
  realNameOnInput(e) { 
    const { value } = e.target
    this.setState({
      realName: value
    })
  }
  /**
   * 输入身份证号
   * @return void
   */
  icCardOnInput(e) { 
    const { value } = e.target
    this.setState({
      idCard: value.toUpperCase()
    })
  }
  /**
   * 提交去实名认证
   * @return void
   */
  submit() { 
    let {
      beforeImage,
      afterImage,
      idCard,
      realName,
      realFlag,
    } = this.state
    
    let {userInfo} = this.props
    let showEditIdCard = (userInfo.realNameAuthStatus === 0)
    if (showEditIdCard) {
      if (realFlag) {
        Taro.showToast({
          title: '您的身份证认证还没有通过哦~',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (!beforeImage) {
        Taro.showToast({
          title: '上传身份证正面照片',
          icon: 'none'
        })
        return
      }
      if (!afterImage) {
        Taro.showToast({
          title: '上传身份证背面照片',
          icon: 'none'
        })
        return
      }
      if (!realNamePatter.test(realName)) {
        Taro.showToast({
          title: '请填写真实姓名',
          icon: 'none'
        })
        return
      }
      if (!validateIdCard(idCard)) {
        Taro.showToast({
          title: '身份号格式有误',
          icon: 'none'
        })
        return
      }
    }
    let imageList = []
    
    let sendData = {
      realName,
      idCard,
      idCardBack: afterImage,
      idCardFace: beforeImage,
      imageList,
    }
    api.user.realNameAuthentication(sendData, this).then(() => {
      Taro.showToast({
        title: '实名认证成功',
        icon: 'none'
      })
      Actions.changeUserInfo({realNameAuthStatus: 1})
      this.handleAlreadyAuthorize()
      setTimeout(() => {
        Taro.navigateBack()
      }, 1800)
    })
  }
  
  /**
   * 显示图片
   * @param {String} type 参数描述
   * @return void
   */
  showImage(type) {
    let current = ''
    let {
      beforeImage,
      afterImage,
    } = this.state
    if (type === 'before') {
      current = beforeImage
    } else if (type === 'after') {
      current = afterImage
    } 
    Taro.previewImage({
      current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表
    })
  }

  config = {
    navigationBarTitleText: '实名认证'
  }

  render() {
    let {
      beforeImage,
      afterImage,
      idCard,
      realName,
      realFlag,
    } = this.state
    let { userInfo } = this.props
    const beforeClassName = classNames('id-photo', {
      'bg-before': !beforeImage
    })
    const afterClassName = classNames('id-photo', {
      'bg-after': !afterImage
    })
    return (
      <View className='page-wrapper'>
        <View className='msg-wrapper'>
          {/* 身份证 */}
          <View className='msg-wrapper'>
            <View className='image-wrapper'>
              <View className='photo-tips'>{userInfo.realNameAuthStatus ? '身份证照片' : '拍摄二代身份证原件，请确保图片清晰，四角完整'}</View>
              <View className='image-area-wrapper'>
                <View className='photo-area'>
                  <View className={beforeClassName}>
                    <Image
                      mode='aspectFill'
                      src={beforeImage}
                      onClick={this.showImage.bind(this, 'before')}
                    ></Image>
                  </View>
                  {
                    beforeImage && !realFlag ?
                      null :
                      <View
                        className='add-pictures-style'
                        onClick={this.chooseImageUpload.bind(this, 'before')}
                      >
                        <View className='add-pictures-icon iconfont iconjiahao'></View>
                        <View className='add-content'>拍摄人像页</View>
                      </View>
                  }
                </View>
                <View className='photo-area'>
                  <View className={afterClassName}>
                    <Image
                      mode='aspectFill'
                      src={afterImage}
                      onClick={this.showImage.bind(this, 'after')}
                    ></Image>
                  </View>
                  {
                    afterImage ? 
                      null :
                      <View
                        className='add-pictures-style'
                        onClick={this.chooseImageUpload.bind(this, 'after')}
                      >
                        <View className='add-pictures-icon iconfont iconjiahao'></View>
                        <View className='add-content'>拍摄国徽页</View>
                      </View>
                  }
                </View>
              </View>
            </View>
            <View className='user-wrapper'>
              <View className='user-form-item'>
                <View className='start-icon'>*</View>
                <View className='user-form-label'>真实姓名</View>
                <View className='user-form-content'>
                  {
                    userInfo.realNameAuthStatus ?
                      <Text>{realName}</Text>
                      :
                      <Input
                        className='user-form-input'
                        onInput={this.realNameOnInput}
                        placeholder='请输入真实姓名'
                        placeholderClass='placeholder-style'
                        value={realName}
                        maxLength='10'
                      ></Input>
                  }
                </View>
              </View>
              <View className='user-form-item'>
                <View className='start-icon'>*</View>
                <View className='user-form-label'>身份证号</View>
                <View className='user-form-content'>
                  {
                    userInfo.realNameAuthStatus ?
                      <Text>{idCard}</Text>
                      :
                      <Input
                        className='user-form-input'
                        onInput={this.icCardOnInput}
                        placeholder='请输入身份证号'
                        placeholderClass='placeholder-style'
                        value={idCard}
                        type='idcard'
                        maxLength='20'
                      ></Input>
                  }
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* {
          userInfo.realNameAuthStatus >= 3 ?
            null : */}
        <View className='submit-wrapper'>
          <View className='submit-btn' onClick={this.submit}>提交</View>
        </View>
        {/* } */}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(RealName)