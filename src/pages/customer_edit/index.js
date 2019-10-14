/*
 * @Author: liuYang
 * @description: 修改添加客户信息
 * @Date: 2019-09-27 15:47:35
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-14 17:43:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text
} from '@tarojs/components'
import Storage from '@utils/storage.js'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import './index.styl'

class CustomerEdit extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      remarkName: '',
      mobile: '',
      merchantId: '',
      merchantName: '',
      idCard: '',
      districtId: '',
      districtName: ''
    }
    this.pageParams = {}
    this.customerInfo = {}
  }
  componentWillUnmount() {
    Storage.removeStorage('customer_details')
  }
  
  componentDidShow() { 
    this.pageParams = this.$router.params
    if (this.pageParams.pageType === 'edit') {
      Taro.setNavigationBarTitle({
        title: '编辑客户信息'
      })
      this.getCustomerDetails()
    }
    this.getMerchantList()
    this.getDistricList()
  }
  /**
   * 获取客户信息详情
   * @return void
   */
  getCustomerDetails() {
    Storage.getStorage('customer_details').then(res => {
      this.customerInfo = res
      this.setState({
        remarkName: res.remarkName,
        mobile: res.mobile,
        merchantId: res.merchantId,
        merchantName: res.merchantName,
        idCard: res.idCard,
        districtId: res.districtId,
        districtName: res.districtName
      })
    })
  }
  getMerchantList() { 
    api.customer.getMerchantList({}, this)
      .then(res => {
        if(!res) return
        this.merchantList = res
      })
  }
  getDistricList() {
    api.customer.getDistricList({}, this)
      .then(res => {
        if (!res) return
        this.districList = res
      })
  }
  /**
   * 姓名
   * @param {Object} e event对象
   * @return void
   */
  remarkNameInput(e) { 
    this.setState({
      remarkName: e.target.value
    })
  }
  /**
   * 手机号
   * @param {Object} e event对象
   * @return void
   */
  phoneInput(e) {
    this.setState({
      mobile: e.target.value
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
      mobile,
      merchantId,
      idCard,
      remarkName,
      districtId
    } = this.state
    if (!(/^[\u4E00-\u9FA5]{2,8}$/).test(remarkName)) {
      this.toast('请输入2-8位的中文姓名')
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(mobile))) {
      this.toast('手机号格式有误')
      return
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard))) {
      this.toast('客户身份证号格式有误')
      return
    }
    if (!merchantId) {
      this.toast('请选择所属经销商')
      return
    }
    if (!districtId) {
      this.toast('请选择所属区域')
      return
    }
    let sendData = {
      userId: this.customerInfo.userId,
      mobile,
      merchantId,
      idCard,
      remarkName,
      districtId
    }
    Taro.showLoading({
      title: '提交中...',
      mask: true
    })
    api.customer.editCustomer(sendData, this)
      .then(() => {
        Taro.hideLoading()
        let title = '添加成功'
        if (this.pageParams.pageType === 'edit') { 
          title = '编辑成功'
        }
        Taro.showToast({ title })
        setTimeout(() => {
          Taro.navigateBack()
        },1800)
      })
  }
  toast(msg) {
    Taro.showToast({
      title: msg,
      icon: 'none'
    })
  }
  /**
   * 选择经销商列表
   * @return void
   */
  chooseMerchant() { 
    if (this.pageParams.pageType === 'edit') return
    let stringMerchantList = this.merchantList.map(item => item.merchantName)
    Taro.showActionSheet({
        itemList: stringMerchantList
      })
      .then(res => {
        this.setState({
          merchantId: this.merchantList[res.tapIndex].merchantId,
          merchantName: this.merchantList[res.tapIndex].merchantName
        })
      })
      .catch(err => console.log(err.errMsg))
  }
  /**
   * 选择区域
   * @description: 
   * @param {type} 
   * @return: 
   */
  chooseDistricId() {
    if (this.pageParams.pageType === 'edit') return
    let stringDistricList = this.districList.map(item => item.districtName)
    // console.log(stringDistricList, 'stringDistricList')
    // console.log(this.districList, 'this.districList')
    Taro.showActionSheet({
        itemList: stringDistricList
      })
      .then(res => {
        this.setState({
          districtId: this.districList[res.tapIndex].districtId,
          districtName: this.districList[res.tapIndex].districtName
        })
      })
      .catch(err => console.log(err.errMsg))
  }
  config = {
    navigationBarTitleText: '添加客户'
  }
  render() { 
    let {
      remarkName,
      mobile,
      merchantName,
      idCard,
      districtName
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='customer-info-wrapper'>
          <View className='info-item'>
            <View className='item-label'>姓名</View>
            <View className='item-text'>
              <Input
                className='input-public'
                placeholder='请输入姓名'
                placeholderClass='placeholder-style'
                value={remarkName}
                onInput={this.remarkNameInput}
              ></Input>
            </View>
          </View>
          <View className='info-item'>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>
              {
                this.pageParams.pageType === 'edit' ?
                  <Text className='edit-text'>{mobile}</Text>
                  :
                  <Input
                    type='number'
                    className='input-public'
                    placeholder='请输入客户联系方式'
                    placeholderClass='placeholder-style'
                    value={mobile}
                    maxLength='11'
                    onInput={this.phoneInput}
                  ></Input>
              }
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
            <View className='item-label'>所属经销商</View>
            <View
              className='item-text'
              onClick={this.chooseMerchant}
            >
              {
                merchantName ? 
                  <Text className='edit-text'>{merchantName}</Text>
                  :
                  <Text>请选择所属经销商</Text>
              }
            </View>
          </View>
          <View className='info-item'>
            <View className='item-label'>所属区域</View>
            <View
              className='item-text'
              onClick={this.chooseDistricId}
            >
              {
                districtName ?
                  <Text className='edit-text'>{districtName}</Text>
                  :
                  <Text>请选择所属区域</Text>
              }
            </View>
          </View>
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
export default connect(mapStateToProps)(CustomerEdit)