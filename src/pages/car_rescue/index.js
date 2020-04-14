/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 18:33:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-14 12:07:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import {
  timestampOfDay,
  getDateTime
} from '@utils/timer_handle.js'
import CallService from '@c/call_service/index.js'
import ChooseLocation from './components/choose_location/index.js'
import MsgForm from './components/msg_form/index.js'
import './index.styl'

class CarRescue extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      sendAddress: '',
      sendCityId: '',
      sendLatitude: '',
      sendLongitude: '',
      receiveAddress: '',
      receiveCityId: '',
      receiveLatitude: '',
      receiveLongitude: '',
      carNo: '',
      carSituation: 1,
      carInfo: '',
      remark: ''
    }
    this.timer = null
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  onChooseCity(data) { 
    this.setState(data)
  }
  onFormValueChange(data) { 
    this.setState(data)
  }
  submitOffer() { 
    let pickerDate = getDateTime(timestampOfDay())
    let testList = {
      sendAddress: '请选择发车地址',
      sendCityId: '请选择发车地址',
      sendLatitude: '请选择发车地址',
      sendLongitude: '请选择发车地址',
      receiveAddress: '请选择收车地址',
      receiveCityId: '请选择收车地址',
      receiveLatitude: '请选择收车地址',
      receiveLongitude: '请选择收车地址',
      carNo: '请填写车牌号',
      carInfo: '请填写车辆信息',
    }
    let breakName = ''
    for (const i in testList)  {
      if (!this.state[i]) { 
        breakName = i
        break
      }
    }
    if (breakName) {
      Taro.showToast({
        icon: 'none',
        title: testList[breakName]
      })
      return
    }
    let sendData = {
      homeDelivery: 1,
      storePickup: 1,
      carAmount: 1,
      usedType: 1,
      inquiryType: 2,
      sendTime: pickerDate.split(' ')[0],
    }
    sendData = Object.assign({}, sendData, this.state)
    api.offer.submitOffer(sendData, this).then(() => {
      Taro.showToast({
        icon: 'none',
        title: '发布成功'
      })
      this.timer = setTimeout(() => {
        Taro.switchTab({
          url: 'pages/offer/index'
        })
      }, 1800)
    })
  }

  config = {
    navigationBarTitleText: '救援' 
  }

  render() {
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <View className='main-wrapper'>
            <ChooseLocation onChooseCity={this.onChooseCity.bind(this)} />
            <MsgForm onFormValueChange={this.onFormValueChange.bind(this)} />
            <View className='btn' onClick={this.submitOffer}>立即询价</View>
          </View>
        </View>
        <CallService phoneNumberType='carRescue' text='救援热线' />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(CarRescue)