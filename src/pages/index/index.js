/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-09-17 11:53:57
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 15:17:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Picker,
  Textarea
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import Actions from '@store/actions/index.js'
import { convertingGPS } from '@utils/location.js'
import {
  getUserLocation,
  getSetting
} from '@utils/common.js'
import {
  getTimeData
} from '@utils/timer_handle.js'
import NoTitleCard from '@c/no_title_card/index.js'
import RadioGroups from '@c/radio_group/index.js'
import CheckBoxGroup from '@c/checkbox_group/index.js'
import InputNumber from '@c/input_number/index.js'
import { serviceList, carNatureList } from '@config/text_config.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
import './index.styl'

class Index extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      carAmount: 1,   // 台数
      carNature: 1,   // 车辆性质
      carInfo: '',    // 车辆信息
      sendTime: (new Date().toLocaleDateString()).replace(/\//g, '-'),    // 发车时间
      receiveCityId: 0, // 收车城市ID
      receiveCityName: '',
      receiveAddress: '', // 收车详细地址
      sendCityId: 0,      // 发车地址ID
      sendCityName: '',
      sendAddress: '', // 发车详细地址
      storePickup: 0,  // 上门提车
      homeDelivery: 0, // 上门送车
      sendTimerInit: (new Date().toLocaleDateString()).replace(/\//g, '-')
    }
  }
  
  componentWillUnmount() {
    Actions.clearCity({})
  }

  componentDidShow() { 
    this.handleLocation()
    // this.sendTimerInit = (new Date().toLocaleDateString()).replace(/\//g, '-')
    this.login()
  }

  componentDidHide() { }
  
  login() { 
    
  }
  /**
   * 单选
   * @param {Object} e event对象
   * @return void
   */
  chooseRadio(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      serviceId: e.id
    })
  }
  /**
   * 单选
   * @param {Object} e event对象
   * @return void
   */
  chooseCarNature(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      carNature: e.id
    })
  }
  /**
   * inputNumber组件值改变
   * @param {Number} e 输入框值
   * @return void
   */
  valueChange(e) {
    this.setState({
      carAmount: e
    })
  }
  /**
   * 点击补充车辆信息
   * @return void
   */
  changeOpen() { 
    this.setState({
      open: !this.state.open
    })
  }
  /**
   * 发车时间
   * @param {Object} e event对象
   * @return void
   */
  onStartingTimeDateChange(e) {
    let chooseTime = e.detail.value
    let nowTimer = getTimeData(new Date().toLocaleDateString())
    let chooseTimer = getTimeData(chooseTime)
    if (nowTimer > chooseTimer) {
      this.toast('请选择正确的发车时间')
      return
    }
    this.setState({
      sendTime: chooseTime
    })
  }
  /**
   * 获取用户地理位置信息
   * @return void
   */
  handleLocation() {
    getUserLocation().then((res) => {
      if (!this.state.getLocationModel) {
        this.setState({
          getLocationModel: true
        })
      }
      this.handleConvertingGPS(res.latitude, res.longitude)
    }).catch((err) => {
      if (err.errMsg && err.errMsg.indexOf('fail auth deny') != -1) {
        console.log('未授权')
        this.handleGetSetting()
      }
    })
  }
  /**
   * 使用腾讯地图SDK把坐标转换成地址
   * @param {Number} latitude 纬度
   * @param {Number} longitude 经度
   * @return void
   */
  handleConvertingGPS(latitude, longitude) {
    convertingGPS(latitude, longitude, 'ad_info').then(res => {
      console.log(res)
    })
  }
  /**
   * 获取用户设置信息
   * @return void
   */
  handleGetSetting() {
    getSetting().then(res => {
      console.log(res, ' get setting ')
      if (!res.authSetting['scope.userLocation']) {
        this.setState({
          getLocationModel: false
        })
      }
    }).catch((err) => {
      console.log(err, ' get setting ')
    })
  }

  closeModalCallBack(msg) {
    this.setState({
      getLocationModel: true
    })
  }
  /**
   * 输入发车详细地址
   * @param {Object} e event参数
   * @return void
   */
  inputSendAddress(e) {
    this.setState({
      sendAddress: e.target.value
    })
  }
  /**
   * 输入收车详细地址
   * @param {Object} e event参数
   * @return void
   */
  inputReceiveAddress(e) {
    this.setState({
      receiveAddress: e.target.value
    })
  }
  /**
   * 输入车辆信息
   * @param {Object} e event参数
   * @return void
   */
  inputCarInfo(e) {
    this.setState({
      carInfo: e.target.value
    })
  }
  submitOffer() { 
    let {
      carAmount, // 台数
      carNature, // 车辆性质
      carInfo, // 车辆信息
      sendTime, // 发车时间
      receiveCityId,
      receiveCityName,
      receiveAddress, // 收车详细地址
      sendCityName,
      sendCityId,
      sendAddress, // 发车详细地址
      storePickup, // 上门提车
      homeDelivery, // 上门送车
    } = this.state
    if (!sendTime) {
      this.toast('请选择发车时间')
      return
    }
    if (!sendCityName) {
      this.toast('请选择发车城市')
      return
    }
    if (!receiveCityName) {
      this.toast('请选择收车城市')
      return
    }
    if (storePickup && !sendAddress) {
      this.toast('请输入详细发车地址')
      return
    }
    if (homeDelivery && !receiveAddress) {
      this.toast('请输入详细收车地址')
      return
    }
    if (!carInfo) {
      this.toast('请输入车辆信息')
      return
    }
    Taro.showLoading({
      title: '提交中...',
      mask: true
    })
    let sendData = {
      carAmount, // 台数
      carNature, // 车辆性质
      carInfo, // 车辆信息
      sendTime, // 发车时间
      receiveCityId,
      receiveCityName,
      receiveAddress, // 收车详细地址
      sendCityName,
      sendCityId,
      sendAddress, // 收车详细地址
      storePickup, // 上门提车
      homeDelivery, // 上门送车
    }
    api.offer.submitOffer(sendData, this).then(() => {
      Taro.hideLoading()
      Taro.showToast({
        title: '询价单已提交',
        icon: 'success'
      })
    })
  }
  toast(errMsg) {
    Taro.showToast({
      title: errMsg,
      icon: 'none'
    })
  }
  /**
   * 跳转页面
   * @param {String} pageName='choose_start_city' 跳转到那个页面
   * @return void
   */
  chooseCity(pageName = 'choose_start_city') {
    switch (pageName) {
      case 'choose_start_city':
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=start`
        })
        return
      case 'choose_target_city':
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=target`
        })
        return
      default:
        return
    }
  }
  /**
   * 选择服务类型
   * @param {Array} props 多选组合的值
   * @return void
   */
  handleChooseServiceType(props) {
    this.setState({
      storePickup: props[0].checked ? 1 : 0,
      homeDelivery: props[1].checked ? 1 : 0
    })
  }
  config = {
    navigationBarTitleText: '首页'
  }
  render() {
    let {
      carAmount, // 台数
      carNature, // 车辆性质
      carInfo, // 车辆信息
      sendTime, // 发车时间
      receiveCityName,
      receiveAddress, // 收车详细地址
      sendCityName,
      sendAddress, // 发车详细地址
      storePickup, // 上门提车
      homeDelivery, // 上门送车
      sendTimerInit
    } = this.state
    
    return (
      <View className='index-wrapper'>
        <NoTitleCard>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>发车时间</View>
              <View className='from-right'>
                <Picker
                  className='time-picker'
                  mode='date'
                  onChange={this.onStartingTimeDateChange}
                  start={sendTimerInit}
                >
                    <Text
                      className={classNames({
                        'from-disabled-text': !sendTime
                      })}
                    >
                      {
                        sendTime ? sendTime.split('T')[0] : '请选择发车时间'
                      }
                    </Text>
                </Picker>
                {
                  sendTime ? null : <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
                }
              </View>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper' onClick={()=>this.chooseCity('choose_start_city')}>
              <View className='from-label'>发车地点</View>
              <View className='from-right'>
                <Text
                  className={classNames({
                    'from-disabled-text': !sendCityName
                  })}
                >
                  {
                    sendCityName ? sendCityName : '请选择发车城市'
                  }
                </Text>
                <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
              </View>
            </View>
            {
              storePickup ?
                <View className='label-hide'>
                  <Textarea
                    className='input'
                    placeholder='请输入详细发车地址'
                    placeholderClass='input-placeholder'
                    maxlength='50'
                    auto-height
                    value={sendAddress}
                    onInput={this.inputSendAddress}
                  ></Textarea>
                </View>
                : null
            }
          </View>
          <View className='from-item'>
            <View className='label-wrapper' onClick={()=>this.chooseCity('choose_target_city')}>
              <View className='from-label'>收车地点</View>
              <View className='from-right'>
                <Text
                  className={classNames({
                    'from-disabled-text': !receiveCityName
                  })}
                >
                  {
                    receiveCityName ? receiveCityName : '请选择收车城市'
                  }
                </Text>
                <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
              </View>
            </View>
            {
              homeDelivery ?
                <View className='label-hide'>
                  <Textarea
                    className='input'
                    placeholder='请输入详细收车地址'
                    placeholderClass='input-placeholder'
                    maxlength='50'
                    auto-height
                    value={receiveAddress}
                    onInput={this.inputReceiveAddress}
                  ></Textarea>
                </View>
                : null
            }
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>服务</View>
              <View className='from-right'>
                <CheckBoxGroup
                  options={serviceList}
                  onClick={this.handleChooseServiceType.bind(this)}
                ></CheckBoxGroup>
              </View>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>车辆信息</View>
              <View className='from-right'></View>
            </View>
            <View className='label-hide'>
              <Input
                className='input'
                placeholder='请输入车辆信息,如大众迈腾'
                placeholderClass='input-placeholder'
                maxLength='20'
                value={carInfo}
                onInput={this.inputCarInfo}
              ></Input>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>台数:</View>
              <View className='from-right'>
                <InputNumber
                  min={1}
                  value={carAmount}
                  onChange={this.valueChange.bind(this)}
                ></InputNumber>
              </View>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>车辆性质</View>
              <View className='from-right from-radio'>
                <RadioGroups
                  options={carNatureList}
                  activeIndex={carNature}
                  onClick={this.chooseRadio.bind(this)}
                ></RadioGroups>
              </View>
            </View>
          </View>
        </NoTitleCard>
        <View
          className='submit-btn'
          onClick={this.submitOffer}
        >立即询价</View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Index)
