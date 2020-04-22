/*
 * @Author: guorui
 * @description: 下单
 * @Date: 2019-09-27 10:59:47
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-22 14:08:39
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Button,
  Block
} from '@tarojs/components'
import {
  // validateIdCard,
  realNamePatter,
  phoneNumberPatter,
  handleMoney
} from '@utils/patter.js'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import Storage from '@utils/storage.js'
import classNames from 'classnames'
import { invoiceList } from '@config/text_config.js'

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
      receiveCardNo: '', //收车城市联系人身份证号
      homeDelivery: 0, //送车上门 0否 1是
      storePickup: 1, //上门提车 0否 1是
      sendTimeDesc: '', //发车时间
      carInfo: '', //车辆信息
      usedType: 1, //车辆类型  1新车 2二手车
      carAmount: 1, //车辆台数
      vins: '', // 车架号
      quotedPriceDesc: 0, // 报价
      userId: 0,
      realName: 0,
      transferPrice: '', // 运力接单价格
      transferUserId: '', // 接单运力id
      transferRealName: '', // 接单运力
      transferMobile: '', // 接单运力手机号
      invoiceTypeInfo: {}, //发票
      sendAddress: '',
      receiveAddress: '',
      carNo: '',
      carSituation: 1,
      remark: '',
      inquiryType: 1
      // disabled: true
    }
    this.pageParams = {}
    this.invoiceList = invoiceList
  }
  componentDidMount() {
    this.pageParams = this.$router.params || {}
    this.getOfferDetails()
    this.getInputText()
  }

  getInputText() {
    Storage.getStorage(`order_input_${this.pageParams.offer_id}`).then(res => {
      if (res) { 
        this.setState(res)
      }
    })
  }

  /**
   * 获取详情
   * @return void
   */
  getOfferDetails() {
    if (!this.pageParams.offer_id) {
      this.toast('请传入必传参数')
      return;
    }
    let sendData = {
      inquiryId: this.pageParams.offer_id
    }
    api.offer.getOfferDetails(sendData, this)
      .then(res => {
        delete res['userId']
        this.setState(res)
      })
  }
  /**
   * 函数功能描述 判断联系人、联系方式、身份证号、车架号是否为空，验证按钮的高亮显示
   * @return void
   */
  saveInputOrTest() {
    Storage.setStorage(`order_input_${this.pageParams.offer_id}`, this.state)
    // let {
    //   sendPerson,
    //   sendMobile,
    //   sendCardNo,
    //   receivePerson,
    //   receiveMobile,
    //   receiveCardNo,
    //   vins
    // } = this.state
    // if ((/^[\u4e00-\u9fa5]{2,8}$/.test(sendPerson)) && (phoneNumberPatter.test(sendMobile)) && (/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/)/.test(sendCardNo)) && (/^[\u4e00-\u9fa5]{2,8}$/.test(receivePerson)) && (phoneNumberPatter.test(receiveMobile)) && (/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/)/.test(receiveCardNo)) && (/^[0-9A-Za-z,]+$/.test(vins))) {
    //   this.setState({
    //     disabled: false
    //   })
    // } else {
    //   this.setState({
    //     disabled: true
    //   })
    // }
  }
  
  /**
   * 发车城市--名字验证
   * @param {Object} e event对象
   * @return void
   */
  verificationSendName(e) {
    let { value } = e.detail
    this.setState({
      sendPerson: value
    },() => {
      this.saveInputOrTest()
    })
  }

  /**
   * 收车城市--名字验证
   * @param {Object} e event对象
   * @return void
   */
  verificationReceiveName(e) {
    let { value } = e.detail
    this.setState({
      receivePerson: value
    }, () => {
      this.saveInputOrTest()
    })
  }

  /**
   * 发车城市--手机号验证
   * @param {Object} e event对象
   * @return void
   */
  verificationSendPhone(e) {
    let { value } = e.detail
    this.setState({
      sendMobile: value
    }, () => {
      this.saveInputOrTest()
    })
  }
  
  /**
   * 收车城市--手机号验证
   * @param {Object} e event对象
   * @return void
   */
  verificationReceivePhone(e) {
    let { value } = e.detail
    this.setState({
      receiveMobile: value
    }, () => {
      this.saveInputOrTest()
    })
  }

  /**
   * 发车城市--身份证号验证
   * @param {Object} e event对象
   * @return void
   */
  verificationSendCardNo(e) {
    let { value } = e.detail
    this.setState({
      sendCardNo: value
    }, () => {
      this.saveInputOrTest()
    })
  }
  
  /**
   * 收车城市--身份证号验证
   * @param {Object} e event对象
   * @return void
   */
  verificationReceiveCardNo(e) {
    let { value } = e.detail
    this.setState({
      receiveCardNo: value
    }, () => {
      this.saveInputOrTest()
    })
  }
  /**
   * 运力接单价格
   * @param {Object} e event对象
   * @return void
   */
  transportPrice(e) { 
    let { value } = e.detail
    value = handleMoney(value)
    this.setState({
      transferPrice: value
    }, () => {
      this.saveInputOrTest()
    })
    return value
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
   * 选择接单运力
   * @return void
   */
  chooseTransport() {
    Taro.navigateTo({
      url: '/pages/transport_info/index?pageType=choose'
    })
  }
  /**
   * 选择发票
   * @return void
   */
  chooseInvoice() {
    let carInvoiceList = this.invoiceList.map(item => item.label)
    Taro.showActionSheet({
        itemList: carInvoiceList
      })
      .then(res => {
        this.setState({
          invoiceTypeInfo: this.invoiceList[res.tapIndex]
        })
      })
      .catch(err => console.log(err.errMsg))
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
      receiveCardNo,
      homeDelivery,
      storePickup,
      sendTimeDesc,
      carInfo,
      usedType,
      carAmount,
      vins,
      quotedPriceDesc,
      userId,
      transferPrice,
      transferRealName, // 运力名称
      transferUserId, // 接单运力id
      transferMobile, // 接单运力手机号
      invoiceTypeInfo,
      inquiryType
    } = this.state
    let { userInfo } = this.props
    if (userInfo.userType === 0 && JSON.stringify(invoiceTypeInfo) === `{}`) {
      this.toast('请选择发票类型')
      return
    }
    console.log('userId', userId)
    if (userInfo.userType === 0 && !userId) {
      this.toast('请选择代下单的客户')
      return
    }
    if (!(realNamePatter.test(sendPerson))) {
      this.toast('发车人名字输入格式有误')
      return
    }
    if (!(realNamePatter.test(receivePerson))) {
      this.toast('收车人名字输入格式有误')
      return
    }
    if (!(phoneNumberPatter.test(sendMobile))) {
      this.toast('发车人手机号输入格式有误')
      return
    }
    if (!(phoneNumberPatter.test(receiveMobile))) {
      this.toast('收车人手机号输入格式有误')      
      return
    }
    if (userInfo.userType === 0 && transferRealName && transferPrice <= 0) {
      this.toast('选择运力信息后请填写运力接单价格')
      return
    }
    // if (!(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/)/.test(sendCardNo))) {
    //   this.toast('发车人身份证号输入格式有误')
    //   return
    // }
    // if (!(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/)/.test(receiveCardNo))) {
    //   this.toast('收车人身份证号输入格式有误')
    //   return
    // }
    if (inquiryType === 1 && vins.length <= 0) {
      this.toast('请输入车架号或车牌号')
      return
    }
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
      receiveCardNo,
      homeDelivery,
      storePickup,
      sendTimeDesc,
      carInfo,
      usedType,
      carAmount,
      vins,
      quotedPriceDesc,
      userId: userId || userInfo.userId,
      createUserId: userInfo.userId,
      transferPrice: transferPrice* 1000 / 10,
      transferRealName, // 运力名称
      transferUserId, // 接单运力id
      transferMobile, // 接单运力手机号
      invoiceType: invoiceTypeInfo.id
    }
    return
    api.order.placeOrder(sendData, this)
      .then((res) => {
        Taro.showToast({
          title: '下单成功',
          icon: 'success'
        })
        Storage.removeStorage(`order_input_${this.pageParams.offer_id}`)
        Taro.redirectTo({
          url: `/pages/order_details/index?order_code=${res.orderCode}`
        })
      })
  }

  /**
   * 车架号跳转页面
   * @return void
   */
  navigatorTo() {
    Storage.setStorage('vins', this.state.vins)
    Taro.navigateTo({
      url: '/pages/remark/index?pageType=order'
    })
  }
  
  /**
   * toast函数
   * @param {Type} msg 参数描述
   * @return void
   */
  toast(msg) {
    Taro.showToast({
      title: msg,
      icon: 'none'
    })
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '下单'
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
      receiveCardNo, //收车城市联系人身份证号
      homeDelivery, //送车上门 0否 1是
      storePickup, //上门提车 0否 1是
      sendTimeDesc, //发车时间
      carInfo, //车辆信息
      usedType, //车辆类型
      carAmount, //车辆台数
      vins, // 车架号
      quotedPriceDesc, // 报价
      realName,
      transferRealName, // 运力名称
      transferPrice, // 运力接单价格
      // transferUserId, // 接单运力id
      transferMobile, // 接单运力手机号
      invoiceTypeInfo,
      inquiryType,
      carNo,
      carSituation,
      remark,
      // disabled
    } = this.state
    let {userInfo} = this.props
    return (
      <View className='place-order-wrapper'>
        <View className='place-order-top'>
          {
            (userInfo.userType === 0) ?
              <View className='choose-customer'  onClick={this.chooseCustomer}>
                <View className='customer-info'>
                  <View className='iconfont iconkehu customer-img'></View>
                  <View className='customer-name'>
                    {
                      realName ? realName : '选择代下单客户'
                    }
                  </View>
                </View>
                <View className='iconfont iconxiangyouxuanzejiantoux choose-arrow'></View>
              </View>
              : null
          }
          <View className='no-card-style'>
            <View className='start-city'>
              <View className='details-form-item'>
                <View className='start-icon'></View>
                <View className='details-form-label'>发车城市:</View>
                <View className='details-form-content'>{sendCityName || ''}</View>
              </View>
              {
                (sendAddress.length) ?
                  <View className='details-form-item'>
                    <View className='start-icon'></View>
                    <View className='details-form-label'>详细信息:</View>
                    <View className='details-form-content'>{sendAddress || ''}</View>
                  </View>
                  : null
              }
              <View className='details-form-item'>
                <View className='start-icon'>*</View>
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
                <View className='start-icon'>*</View>
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
                <View className='start-icon'></View>
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
                <View className='start-icon'></View>
                <View className='details-form-label'>收车城市:</View>
                <View className='details-form-content'>{receiveCityName || ''}</View>
              </View>
              {
                (receiveAddress.length) ?
                  <View className='details-form-item'>
                    <View className='start-icon'></View>
                    <View className='details-form-label'>详细信息:</View>
                    <View className='details-form-content'>{receiveAddress || ''}</View>
                  </View>
                  : null
              }
              <View className='details-form-item'>
                <View className='start-icon'>*</View>
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
                <View className='start-icon'>*</View>
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
                <View className='start-icon'></View>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    onInput={this.verificationReceiveCardNo}
                    placeholder='请填写联系人证件号'
                    placeholderClass='placeholder-style'
                    maxLength='20'
                    value={receiveCardNo}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='car-info'>
              {
                (storePickup || homeDelivery) && inquiryType === 1 ?
                  <View className='details-form-item'>
                    <View className='start-icon'></View>
                    <View className='details-form-label'>服务:</View>
                    <View className='details-form-content'>
                      {
                        storePickup ? '上门提车' : ''
                      }
                      {
                        storePickup && homeDelivery ? '，' : ''
                      }
                      {
                        homeDelivery ? '上门送车' : ''
                      }
                    </View>
                  </View>
                : null
              }
              <View className='details-form-item'>
                <View className='start-icon'></View>
                <View className='details-form-label'>发车时间:</View>
                <View className='details-form-content'>{sendTimeDesc || ''}</View>
              </View>
              <View className='details-form-item'>
                <View className='start-icon'></View>
                <View className='details-form-label'>车辆信息:</View>
                <View className='details-form-content'>{carInfo || ''}</View>
              </View>
              {
                inquiryType === 1 && (
                  <Block>
                    <View className='details-form-item'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>车辆类型:</View>
                      <View className='details-form-content'>{usedType === 1 ? '新车' : '二手车'}</View>
                    </View>
                    <View className='details-form-item'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>台数:</View>
                      <View className='details-form-content'>{carAmount || ''}台</View>
                    </View>
                    <View className='details-form-item' onClick={this.navigatorTo}>
                      <View className='start-icon'>*</View>
                      <View className='details-form-label car-vins'>车架号/车牌号:</View>
                      <View className='details-form-content'>
                        {
                          vins.length ?
                            <Text>{vins}</Text>
                            :
                            <Block>
                              <Text className='placeholder-style'>请输入车架号/车牌号</Text>
                              <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>                        
                            </Block>
                        }
                      </View>
                    </View>
                  </Block>
                )
              }
              {
                inquiryType === 2 && (
                  <Block>
                    <View className='details-form-item'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>车牌号:</View>
                      <View className='details-form-content'>
                        {carNo || ''}
                      </View>
                    </View>
                    <View className='details-form-item'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>车况:</View>
                      <View className='details-form-content'>
                        {
                          carSituation === 1 ? '能动' : '不能动'
                        }
                      </View>
                    </View>
                    <View className='details-form-item remark-details'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>备注:</View>
                      <View className='details-form-content'>
                        <Text className='details-form-text'> { remark || '--' }</Text>
                      </View>
                    </View>
                  </Block>
                )
              }
              <View className='dividing-line'></View>
              <View className='details-form-item'>
                <View className='start-icon'></View>
                <View className='details-form-label'>报价:</View>
                <View className='details-form-content'>
                  <Text className='single-price'>{quotedPriceDesc || ''}</Text>
                  <Text>元/台</Text>
                </View>
              </View>
              {
                userInfo.userType === 0 ?
                  <View className='details-form-item' onClick={this.chooseInvoice.bind(this)}>
                    <View className='start-icon'>*</View>
                    <View className='details-form-label'>发票:</View>
                    <View className='details-form-content'>
                      <Text
                        className={classNames({
                          'details-from-text': !invoiceTypeInfo.label
                        })}
                      >
                        {
                          invoiceTypeInfo.label ? invoiceTypeInfo.label : '请选择发票类型'
                        }
                      </Text>
                      <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
                    </View>
                  </View>
                  : null
              }
              {
                userInfo.userType === 0 ? 
                  <Block>
                    <View className='details-form-item'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>运力名称:</View>
                      <View className='details-form-content' onClick={this.chooseTransport}>
                        {
                          transferRealName.length ?
                            <Text>{transferRealName}</Text>
                            :
                            <Block>
                              <Text className='placeholder-style'>请选择接单运力</Text>
                              <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>                        
                            </Block>
                        }
                      </View>
                    </View>
                    <View className='details-form-item'>
                      <View className='start-icon'></View>
                      <View className='details-form-label'>联系方式:</View>
                      <View className='details-form-content' onClick={this.chooseTransport}>
                        {
                          transferMobile.length ?
                            <Text>{transferMobile}</Text>
                            :
                            <Block>
                              <Text className='placeholder-style'>请填写联系方式</Text>
                              <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>                        
                            </Block>
                        }
                      </View>
                    </View>
                    <View className='details-form-item'>
                      <View className='start-icon'>
                        {transferRealName ? '*' : ''}
                      </View>
                      <View className='details-form-label'>此单价格:</View>
                      <View className='details-form-content'>
                        <Input
                          type='digit'
                          className='details-from-input'
                          placeholder='请填写运力接单价格'
                          onInput={this.transportPrice}
                          placeholderClass='placeholder-style'
                          maxLength='10'
                          value={transferPrice}
                        ></Input>
                      </View>
                    </View>
                  </Block> : null
              }
            </View>
          </View>
        </View>
        {/* disabled={disabled} */ }
        <Button type='button' className='place-order-button' onClick={this.submitOrder}>立即下单</Button>
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