/*
 * @Author: guorui
 * @description: 下单
 * @Date: 2019-09-27 10:59:47
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-17 22:44:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Textarea
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import NoTitleCard from '@c/no_title_card/index.js'
// eslint-disable-next-line import/first
// eslint-disable-next-line import/first
import api from '@api/index.js'
// import '@assets/icon_font/icon.scss'
import './index.styl'

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inquiryId: 0, //询价单id
      sendCityId: 0, //发车城市
      sendCityName: '', //发车城市名称
      sendAddress: '', //发车城市详细地址
      sendPerson: '', //发车城市联系人
      sendMobile: '', //发车城市联系方式
      sendCardNo: '', //发车城市联系人身份证号
      receiveCityId: 0, //收车城市
      receiveCityName: '', //收车城市名称
      receiveAddress: '', //收车城市详细地址
      receivePerson: '', //收车城市联系人
      receiveMobile: '', //收车城市联系方式
      receiveCarNo: '', //收车城市联系人身份证号
      homeDelivery: 0, //送车上门 0否 1是
      storePickup: 1, //上门提车 0否 1是
      sendTimeDesc: '', //发车时间
      carInfo: '', //车辆信息
      usedType: 1, //车辆类型  1新车 2二手车
      carAmount: 1, //车辆台数
      vins: '', // 车架号
      quotedPriceDesc: 0, // 报价
      placeOrderCustomer: {} // 客户信息
    }
    this.pageParams = {}
  }
  
  componentDidShow() {
    this.pageParams = this.$router.params || {}
    this.getOfferDetails()
  }

  //页面内的配置
  config = {
  navigationBarTitleText: '下单'
  } 

  /**
   * 获取详情
   * @return void
   */
  getOfferDetails() {
    if (!this.pageParams.offer_id) {
      Taro.navigateBack()
      return;
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      inquiryId: this.pageParams.offer_id
    }
    api.offer.getOfferDetails(sendData, this)
      .then(res => {
        Taro.hideLoading()
        this.setState({
          inquiryId: res.inquiryId,
          quotedPriceDesc: res.quotedPriceDesc,
          sendTimeDesc: res.sendTimeDesc,
          sendCityId: res.sendCityId,
          sendCityName: res.sendCityName,
          sendAddress: res.sendAddress,
          receiveCityId: res.receiveCityId,
          receiveCityName: res.receiveCityName,
          receiveAddress: res.receiveAddress,
          homeDelivery: res.homeDelivery,
          storePickup: res.storePickup,
          carInfo: res.carInfo,
          carAmount: res.carAmount,
          usedType: res.usedType
        })
        Taro.hideLoading()
      })
  }
  
  /**
   * 名字验证
   * @param {Type} e 参数描述
   * @return void
   */
  verificationSendName(e) {
    let { value } = e.detail
    this.setState({
      sendPerson: value
    })
  }
  verificationReceiveName(e) {
    let { value } = e.detail
    this.setState({
      receivePerson: value
    })
  }

  /**
   * 手机号验证
   * @param {Type} e 参数描述
   * @return void
   */
  verificationSendPhone(e) {
    let { value } = e.detail
    this.setState({
      sendMobile: value
    })
  }
  verificationReceivePhone(e) {
    let { value } = e.detail
    this.setState({
      receiveMobile: value
    })
  }

  /**
   * 身份证号验证
   * @param {Type} e 参数描述
   * @return void
   */
  verificationSendCardNo(e) {
    let { value } = e.detail
    this.setState({
      sendCardNo: value
    })
  }
  verificationReceiveCardNo(e) {
    let { value } = e.detail
    this.setState({
      receiveCarNo: value
    })
  }
 
  /**
   * 车架号验证
   * @param {Type} e 参数描述
   * @return void
   */
  verificationVins(e) {
    //车架号只能是数字和字母
    let value = e.target.value
    value = value.replace(/，/g, ",")
    this.setState({
      vins: value
    })
  }

  /**
   * 选择代下单客户
   * @return void
   */
  chooseCustomer() {
    Taro.navigateTo({
      url: '/pages/customer_info/index?pageType=choose'
    })
  }

  /**
   * 提交订单
   * @return void
   */
  submitOrder() {
    let {
      inquiryId,
      sendCityId,
      sendCityName,
      sendAddress,
      sendPerson,
      sendMobile,
      sendCardNo,
      receiveCityId,
      receiveCityName,
      receiveAddress,
      receivePerson,
      receiveMobile,
      receiveCarNo,
      homeDelivery,
      storePickup,
      sendTimeDesc,
      carInfo,
      usedType,
      carAmount,
      vins,
      quotedPriceDesc,
      placeOrderCustomer
    } = this.state
    let { userInfo } = this.props
    if (userInfo.userType === 0 && !placeOrderCustomer.userId) {
      this.toast('请选择代下单的客户')
      return
    }
    if (!(/^[\u4e00-\u9fa5]{2,8}$/.test(sendPerson))) {
      this.toast('发车人名字输入格式有误')
      return
    }
    if (!(/^[\u4e00-\u9fa5]{2,8}$/.test(receivePerson))) {
      this.toast('收车人名字输入格式有误')
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(sendMobile))) {
      this.toast('发车人手机号输入格式有误')
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(receiveMobile))) {
      this.toast('收车人手机号输入格式有误')      
      return
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(sendCardNo))) {
      this.toast('发车人身份证号输入格式有误')
      return
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(receiveCarNo))) {
      this.toast('收车人身份证号输入格式有误')
      return
    }
    if (!(/^[0-9A-Za-z,]+$/.test(vins))) {
      this.toast('车架号输入格式有误')
      return
    }
    Taro.showLoading({
      title: '提交中...',
      mask: true
    })
    let sendData = {
      inquiryId,
      sendCityId,
      sendCityName,
      sendAddress,
      sendPerson,
      sendMobile,
      sendCardNo,
      receiveCityId,
      receiveCityName,
      receiveAddress,
      receivePerson,
      receiveMobile,
      receiveCarNo,
      homeDelivery,
      storePickup,
      sendTimeDesc,
      carInfo,
      usedType,
      carAmount,
      vins,
      quotedPriceDesc,
      userId: placeOrderCustomer.userId || userInfo.userId,
      createUserId: userInfo.userId
    }
    api.order.placeOrder(sendData, this)
      .then((res) => {
        Taro.hideLoading()
        Taro.showToast({
          title: '下单成功',
          icon: 'success'
        })
        Taro.redirectTo({
          url: `/pages/order_details/index?order_id=${res.orderId}`
        })
      })
  }

  toast(msg) {
    Taro.showToast({
      title: msg,
      icon: 'none'
    })
  }
  render() {
    let {
      sendCityName, //发车城市名称
      sendAddress, //发车城市详细地址
      sendPerson, //发车城市联系人
      sendMobile, //发车城市联系方式
      sendCardNo, //发车城市联系人身份证号
      receiveCityName, //收车城市名称
      receiveAddress, //收车城市详细地址
      receivePerson, //收车城市联系人
      receiveMobile, //收车城市联系方式
      receiveCarNo, //收车城市联系人身份证号
      homeDelivery, //送车上门 0否 1是
      storePickup, //上门提车 0否 1是
      sendTimeDesc, //发车时间
      carInfo, //车辆信息
      usedType, //车辆类型
      carAmount, //车辆台数
      vins, // 车架号
      quotedPriceDesc, // 报价
      placeOrderCustomer
    } = this.state
    let {userInfo} = this.props
    return (
      <View className='place-order-wrapper'>
        <View className='place-order-top'>
          {
            (userInfo.userType === 0) ?
              <View className='choose-customer'>
                <View className='customer-info'>
                  <View className='iconfont iconkehu customer-img'></View>
                  <View className='customer-name'>
                    {
                      placeOrderCustomer && placeOrderCustomer.remarkName ?
                        placeOrderCustomer.remarkName : '选择代下单客户'
                    }
                  </View>
                </View>
                <View className='iconfont iconxiangyouxuanzejiantoux choose-arrow' onClick={this.chooseCustomer}></View>
              </View>
              : null
          }
          <View className='no-card-style'>
            <View className='start-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>发车城市:</View>
                <View className='details-form-content'>{sendCityName || ''}</View>
              </View>
              {
                (storePickup !== 0) ?
                  <View className='details-form-item'>
                    <View className='details-form-label'>详细信息:</View>
                    <View className='details-form-content'>{sendAddress || ''}</View>
                  </View>
                  : null
              }
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    onInput={this.verificationSendName}
                    placeholder='请填写联系人姓名'
                    placeholderClass='placeholder-style'
                    value={sendPerson}
                    maxLength='10'
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系方式:</View>
                <View className='details-form-content'>
                  <Input
                    type='number'
                    className='details-from-input'
                    placeholder='请填写联系人电话'
                    onInput={this.verificationSendPhone}
                    placeholderClass='placeholder-style'
                    maxLength='11'
                    value={sendMobile}
                    auto
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人证件号'
                    onInput={this.verificationSendCardNo}
                    placeholderClass='placeholder-style'
                    maxLength='20'
                    value={sendCardNo}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='end-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>收车城市:</View>
                <View className='details-form-content'>{receiveCityName || ''}</View>
              </View>
              {
                (homeDelivery !== 0) ?
                  <View className='details-form-item'>
                    <View className='details-form-label'>详细信息:</View>
                    <View className='details-form-content'>{receiveAddress || ''}</View>
                  </View>
                  : null
              }
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    onInput={this.verificationReceiveName}
                    placeholder='请填写联系人姓名'
                    placeholderClass='placeholder-style'
                    maxLength='10'
                    value={receivePerson}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系方式:</View>
                <View className='details-form-content'>
                  <Input
                    type='number'
                    className='details-from-input'
                    placeholder='请填写联系人电话'
                    onInput={this.verificationReceivePhone}
                    placeholderClass='placeholder-style'
                    maxLength='11'
                    value={receiveMobile}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    onInput={this.verificationReceiveCardNo}
                    placeholder='请填写联系人证件号'
                    placeholderClass='placeholder-style'
                    maxLength='20'
                    value={receiveCarNo}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='car-info'>
              {
                (storePickup !== 0 || homeDelivery !== 0) ?
                  <View className='details-form-item'>
                    <View className='details-form-label'>服务:</View>
                    <View className='details-form-content'>
                      {
                        storePickup !== 0 ? '上门提车' : ''
                      }
                      {
                        storePickup !== 0 && homeDelivery !== 0 ? '，' : ''
                      }
                      {
                        homeDelivery !== 0 ? '上门送车' : ''
                      }
                    </View>
                  </View>
                : null
              }
              <View className='details-form-item'>
                <View className='details-form-label'>发车时间:</View>
                <View className='details-form-content'>{sendTimeDesc || ''}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆信息:</View>
                <View className='details-form-content'>{carInfo || ''}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆类型:</View>
                <View className='details-form-content'>{usedType === 1 ? '新车' : '二手车'}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>台数:</View>
                <View className='details-form-content'>{carAmount || ''}辆</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车架号:</View>
              </View>
              <View className='details-form-item'>
                <Textarea
                  className='details-address-input'
                  onInput={this.verificationVins}
                  auto-height
                  placeholder='请输入车架号，多个车架号请用“,”隔开'
                  placeholderClass='placeholder-style'
                  maxlength={-1}
                  value={vins}
                ></Textarea>
              </View>
              <View className='dividing-line'></View>
              <View className='details-form-item'>
                <View className='details-form-label'>报价:</View>
                <View className='details-form-content'>
                  <Text className='single-price'>{quotedPriceDesc || ''}</Text>
                  <Text>元/台</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='place-order-button' onClick={this.submitOrder}>立即下单</View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(PlaceOrder)