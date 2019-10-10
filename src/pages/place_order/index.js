/*
 * @Author: guorui
 * @description: 下单
 * @Date: 2019-09-27 10:59:47
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-10 10:30:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import '@c/all_order_pages/send_city/index.styl'
import InputNumber from '@c/input_number/index.js'
// import '@assets/icon_font/icon.scss'
import './index.styl'

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      homeDelivery: 1, //送车上门 0否 1是
      storePickup: 1, //上门提车 0否 1是
      sendTimeDesc: '', //发车时间
      carInfo: '', //车辆信息
      usedType: '', //车辆类型
      carAmount: 1, //车辆台数
      vins: '', // 车架号
      quotedPriceDesc: 0, // 报价
      isChoose: true  //判断是否是驿站人员
    }
  }
  
  componentDidMount() {
    // console.log(Storage.getStorage('offer_details'),'询价单信息')
  }

  //页面内的配置
  config = {
  navigationBarTitleText: '下单'
  } 

  /**
   * InputNumber组件值改变
   * @param {Number} e 输入框值
   * @return void
   */
  valueChange(e) {
    this.setState({
      carAmount: e
    })
  }

  /**
   * @description: 车架号验证
   * @param {number string} e 输入的车架号
   * @return: 
   */  
  onCarNumberInput(e) {
    let carCode = e.target.value
    carCode = carCode.test(/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{17}$/) //车架号只能是数字和字符
    this.setState({
      vins: carCode
    })
  }

  /**
   * @description: 选择代下单客户
   * @param {type} 
   * @return: 
   */
  chooseCustomer() {
    Taro.navigateTo({
      url: '/pages/customer_info/index?pageType=choose'
    })
  }

  /**
   * @description: 提交订单
   * @param {type} 
   * @return: 
   */
  submit() {
    let {
      sendCityId, //发车城市
      sendCityName, //发车城市名称
      sendAddress, //发车城市详细地址
      sendPerson, //发车城市联系人
      sendMobile, //发车城市联系方式
      sendCardNo, //发车城市联系人身份证号
      receiveCityId, //收车城市
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
      quotedPriceDesc // 报价
    } = this.state
    if (!sendCityId || !sendCityName || !sendAddress || !sendPerson || !sendMobile || !sendCardNo || !receiveCityId || !receiveCityName || !receiveAddress ||
      !receivePerson || !receiveMobile || !receiveCarNo || !homeDelivery || !storePickup || !sendTimeDesc || !carInfo || !usedType || !carAmount || !vins || !quotedPriceDesc) {
        Taro.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
  }
  
  render() {
    let {
      sendCityId, //发车城市
      sendCityName, //发车城市名称
      sendAddress, //发车城市详细地址
      sendPerson, //发车城市联系人
      sendMobile, //发车城市联系方式
      sendCardNo, //发车城市联系人身份证号
      receiveCityId, //收车城市
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
      isChoose  //判断是否是驿站人员
    } = this.state
    return (
      <View className='place-order-wrapper'>
        <View className='place-order-top'>
          {
            ( isChoose ) ?
              <View className='choose-customer'>
                <View className='customer-info'>
                  <View className='iconfont iconkehu customer-img'></View>
                  <View className='customer-name'>选择代下单客户</View>
                </View>
                <View className='iconfont iconxiangyouxuanzejiantoux choose-arrow' onClick={this.chooseCustomer}></View>
              </View>
              : null
          }
          <NoTitleCard>
            <View className='start-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>发车城市:</View>
                <View className='details-form-content'>{sendCityId ? sendCityName : ''}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>详细信息:</View>
              </View>
              <View className='details-form-item'>
                <Input
                  className='details-address-input'
                  placeholder='请填写详细地址'
                  value={sendAddress}
                ></Input>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人姓名'
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
                    maxLength='20'
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
                    value={sendCardNo}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='end-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>收车城市:</View>
                <View className='details-form-content'>{receiveCityId ? receiveCityName : ''}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>详细信息:</View>
              </View>
              <View className='details-form-item'>
                <Input
                  className='details-address-input'
                  placeholder='请填写详细地址'
                  value={receiveAddress}
                ></Input>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人姓名'
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
                    maxLength='20'
                    value={receiveMobile}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人证件号'
                    value={receiveCarNo}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='car-info'>
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
              <View className='details-form-item'>
                <View className='details-form-label'>发车时间:</View>
                <View className='details-form-content'>{sendTimeDesc}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆信息:</View>
                <View className='details-form-content'>{carInfo}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆类型:</View>
                <View className='details-form-content'>{usedType}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>台数:</View>
                {/* <View className='details-form-content'>{vehicles}辆</View> */}
                <View className='details-form-content details-from-input'>
                  <InputNumber
                    min={1}
                    max={999}
                    value={carAmount}
                    onChange={this.valueChange.bind(this)}
                  ></InputNumber>
                  <View className='details-from-number'>辆</View>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车架号:</View>
              </View>
              <View className='details-form-item'>
                <Input
                  className='details-address-input'
                  placeholder='请输入车架号'
                  value={vins}
                ></Input>
              </View>
              <View className='dividing-line'></View>
              <View className='details-form-item'>
                <View className='details-form-label'>报价:</View>
                <View className='details-form-content'>
                  <Text className='single-price'>{quotedPriceDesc}</Text>
                  <Text>元/台</Text>
                </View>
              </View>
            </View>
          </NoTitleCard>
        </View>
        <View className='place-order-button' onClick={this.submit}>立即下单</View>
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