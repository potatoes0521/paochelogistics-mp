/*
 * @Author: liuYang
 * @description: 修改个人信息
 * @Date: 2019-09-27 15:42:38
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-17 15:41:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  OpenData
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import Storage from '@utils/storage.js'
import './index.styl'

class EditMineInfo extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      realName: '',
      mobile: '',
      merchantName: '',
      idCard: ''
    }
  }
  componentDidShow() {
    this.getCustomerDetails()
  }
  /**
   * 获取用户信息详情
   * @return void
   */
  getCustomerDetails() {
    Storage.getStorage('mine_info_details').then(res => {
      this.setState({
        realName: res.realName,
        mobile: res.mobile,
        merchantName: res.merchantName,
        idCard: res.idCard
      })
    })
  }
  /**
   * 姓名
   * @param {Object} e event对象
   * @return void
   */
  realNameInput(e) {
    this.setState({
      realName: e.target.value
    })
  }
  /**
   * 身份证号
   * @param {Object} e event对象
   * @return void
   */
  idCardInput(e) {
    this.setState({
      idCard: e.target.value
    })
  }
  /**
   * 取消
   * @return void
   */
  cancel() {
    Taro.navigateBack()
  }
  /**
   * 提交客户信息
   * @return void
   */
  submit() { 
    let {
      idCard,
      realName
    } = this.state
    if (!(/^[\u4E00-\u9FA5]{2,8}$/).test(realName)) {
      Taro.showToast({
        title: '请输入2-8位的中文姓名',
        icon: 'none'
      })
      return
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard))) {
      Taro.showToast({
        title: '身份证号格式有误',
        icon: 'none'
      })
      return
    }
    let sendData = {
      userId: this.props.userInfo.userId,
      idCard,
      realName
    }
    Taro.showLoading({
      title: '提交中...',
      mask: true
    })
    api.user.editUserInfo(sendData, this)
      .then(() => {
        Taro.hideLoading()
        Taro.showToast({
          title: '编辑成功'
        })
        setTimeout(() => {
          Taro.navigateBack()
        }, 1800)
      })
  }
  config = {
    navigationBarTitleText: '个人信息完善'
  }

  render() { 
    let {
      realName,
      mobile,
      merchantName,
      idCard
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='mine-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>微信名字</View>
            <OpenData lang='zh_CN' className='item-text font-color' type='userNickName'></OpenData>
          </View>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>
              <Input
                className='input-public'
                placeholder='请输入姓名'
                placeholderClass='placeholder-style'
                value={realName}
                onInput={this.realNameInput}
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
                type='idcard'
                value={idCard}
                onInput={this.idCardInput}
              ></Input>
            </View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text font-color'>{mobile || ''}</View>
          </View>
          {
            merchantName ? 
              <View className='info-item'>
                <View className='item-label'>所属经销商</View>
                <View className='item-text font-color'> {merchantName || ''}</View>
              </View>
              : null
          }
        </View>
        <View className='edit-btn-group'>
          <View
            className='btn cancel'
            onClick={this.cancel}
          >取消</View>
          <View
            className='btn submit'
            onClick={this.submit}
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