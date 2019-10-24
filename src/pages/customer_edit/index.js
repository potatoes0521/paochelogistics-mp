/*
 * @Author: liuYang
 * @description: 修改添加客户信息
 * @Date: 2019-09-27 15:47:35
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-23 19:41:56
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
import { defaultResourceConfigURL } from '@config/request_config.js'
import api from '@api/index.js'
import './index.styl'

class CustomerEdit extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      remarkName: '',
      mobile: '',
      // merchantId: '',
      merchantName: '',
      idCard: '',
      districtId: '',
      districtName: '',
      merchantTypeId: '',
      merchantTypeName: '',
    }
    this.pageParams = {}
    this.customerInfo = {}
    this.districList = []
    this.merchantTypeList = []
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    this.getMerchantType()
    if (this.pageParams.pageType === 'edit') {
      Taro.setNavigationBarTitle({
        title: '编辑客户信息'
      })
      this.getCustomerDetails()
    }
  }
  
  componentWillUnmount() {
    Storage.removeStorage('customer_details')
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
        idCard: res.idCard,
        districtId: res.districtId,
        districtName: res.districtName,
        merchantName: res.merchantName,
        merchantTypeId: res.merchantType,
        merchantTypeName: res.merchantTypeDesc
      })
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
   * 经销商名字
   * @param {Object} e event对象
   * @return void
   */
  merchantNameInput(e) {
    this.setState({
      merchantName: e.target.value
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
      merchantName,
      merchantTypeId,
      // merchantId: '',
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
    // if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard))) {
    //   this.toast('客户身份证号格式有误')
    //   return
    // }
    // if (!merchantName) {
    //   this.toast('请填写经销商')
    //   return
    // }
    // if (!merchantTypeId) {
    //   this.toast('请选择经销商类型')
    //   return
    // }
    // if (!districtId) {
    //   this.toast('请选择所属区域')
    //   return
    // }
    let sendData = {
      userId: this.customerInfo.userId,
      mobile,
      merchantName,
      merchantType: merchantTypeId,
      // merchantId: '',
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
    if (this.merchantTypeList.length > 5) {
      Taro.navigateTo({
        url: '/pages/choose_item/index?pageType=merchantType'
      })
    } else {
      let stringMerchantTypeName = this.merchantTypeList.map(item => item.merchantTypeName)
      Taro.showActionSheet({
          itemList: stringMerchantTypeName
        })
        .then(res => {
          this.setState({
            merchantTypeId: this.merchantTypeList[res.tapIndex].merchantTypeId,
            merchantTypeName: this.merchantTypeList[res.tapIndex].merchantTypeName,
          })
        })
        .catch(err => console.log(err.errMsg))
    }
  }
  /**
   * 选择区域
   * @description: 
   * @param {type} 
   * @return: 
   */
  chooseDistrictId() {
    Taro.navigateTo({
      url: '/pages/choose_item/index?pageType=district'
    })
  }
  /**
   * 获取经销商类型
   * @return void
   */
  getMerchantType() {
    Taro.request({
      url: `${defaultResourceConfigURL}merchantType.json`,
      method: 'get',
      success: (res) => {
        this.merchantTypeList = res.data.data
      }
    })
  }
  config = {
    navigationBarTitleText: '添加客户'
  }
  render() { 
    let {
      remarkName,
      mobile,
      merchantName,
      merchantTypeName,
      // idCard,
      districtName
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='customer-info-wrapper'>
          <View className='info-item'>
            <View className='start-icon'>*</View>
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
            <View className='start-icon'>*</View>
            <View className='item-label'>联系方式</View>
            <View className='item-text'>
              <Input
                type='number'
                className='input-public'
                placeholder='请输入客户联系方式'
                placeholderClass='placeholder-style'
                value={mobile}
                maxLength='11'
                onInput={this.phoneInput}
              ></Input>
            </View>
          </View>
          <View className='info-item'>
            <View className='start-icon'></View>
            <View className='item-label'>经销商类型</View>
            <View
              className='item-text'
              onClick={this.chooseMerchant}
            >
              {
                merchantTypeName ?
                  <Text className='edit-text'>{merchantTypeName}</Text>
                  :
                  <Text>请选择经销商类型</Text>
              }
            </View>
          </View>
          <View className='info-item'>
            <View className='start-icon'></View>
            <View className='item-label'>经销商名称</View>
            <View className='item-text'>
              <Input
                className='input-public'
                placeholder='请输入经销商名称'
                placeholderClass='placeholder-style'
                value={merchantName}
                onInput={this.merchantNameInput}
              ></Input>
            </View>
          </View>
          <View className='info-item'>
            <View className='start-icon'></View>
            <View className='item-label'>所属区域</View>
            <View
              className='item-text'
              onClick={this.chooseDistrictId}
            >
              {
                districtName ?
                  <Text className='edit-text'>{districtName}</Text>
                  :
                  <Text>请选择所属区域</Text>
              }
            </View>
          </View>
          {/* <View className='info-item'>
            <View className='start-icon'></View>
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
          </View> */}
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