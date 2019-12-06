/*
 * @Author: liuYang
 * @description: 首页
 * 
 * @Date: 2019-09-17 11:53:57
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-06 11:33:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Button
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import { convertingGPS } from '@utils/location.js'
import {
  getUserLocation,
  getSetting,
  showModalAndRegister
} from '@utils/common.js'
import { defaultResourceImgURL } from '@config/request_config.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
import login from '@utils/login.js'
// eslint-disable-next-line import/first
import LocationModal from './components/location_modal/index.js'
// eslint-disable-next-line import/first
// eslint-disable-next-line import/first
import { handleShare } from '@utils/handle_share.js'
// eslint-disable-next-line import/first
import { getUserInfo } from '@utils/get_user_info.js'
// eslint-disable-next-line import/first
import Actions from '@store/actions/index.js'

import './index.styl'

class Index extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      receiveCityId: 0, // 收车城市ID
      receiveCityName: '',
      sendCityId: 0,      // 发车地址ID
      sendCityName: '',
      locationModal: false,
    }
    this.initCity = {}
    this.pageParams = {}
  }
  
  
  async componentDidMount() { 
    this.pageParams = this.$router.params
    console.log('参数:' ,this.pageParams)
    this.initData()
    await login.getCode(this) // 登录
    // share_type 1 分享给客户 2 分享砍价
    if (this.pageParams.share_type) {
      this.handleShare()
    }
    this.handleLocation()
    this.handleWXUserInfo()
  }
  componentDidShow() { 
    if (this.state.locationModal) {
      this.setState({
        locationModal: true
      })
    }
    // this.handleDisabled()
  }
  async handleWXUserInfo() {
    let wxUserInfo = await getUserInfo()
    if (!wxUserInfo.nickName) return
    Actions.changeUserInfo(
      Object.assign({}, wxUserInfo, {
        userPhoto: wxUserInfo.avatarUrl,
      })
    )
  }
  handleShare() { 
    let { userInfo } = this.props
    handleShare(this.pageParams, userInfo)
  }
  /**
   * 检查发车城市和收车城市选中状态
   * @return void
   */
  handleDisabled() { 
    // let {
    //   sendCityName,
    //   receiveCityName,
    //   carInfo
    // } = this.state
    // if (sendCityName && receiveCityName && carInfo) {
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
   * 初始化数据
   * @return void
   */
  initData() { 
    this.setState({
      receiveCityId: 0, // 收车城市ID
      receiveCityName: '',
      sendCityId: this.initCity.cityId || '', // 发车地址ID
      sendCityName: this.initCity.cityName || '',
    })
  }
  
  /**
   * 获取用户地理位置信息
   * @return void
   */
  handleLocation() {
    getUserLocation().then((res) => {
      if (!this.state.locationModal) {
        this.setState({
          locationModal: false
        })
      }
      this.handleConvertingGPS(res.latitude, res.longitude)
    }).catch((err) => {
      if (err.errMsg && err.errMsg.indexOf('fail auth deny') != -1) {
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
      this.cityNameChangeCityID(res.city)
      // 然后去处理一下id
    })
  }
  cityNameChangeCityID(cityName) { 
    let sendData = {
      locationName: cityName
    }
    api.city.cityNameChangeCityID(sendData, this).then(res => {
      this.initCity.cityName = cityName
      this.initCity.cityId = res.cityId
      this.setState({
        sendCityName: cityName,
        sendCityId: res.cityId
      })
    })
  }
  /**
   * 获取用户设置信息
   * @return void
   */
  handleGetSetting() {
    getSetting().then(res => {
      if (!res.authSetting['scope.userLocation']) {
        this.setState({
          locationModal: true
        })
      } else {
        this.setState({
          locationModal: false
        })
      }
    }).catch((err) => {
      console.log(err, ' get setting ')
    })
  }

  modalCallBack() {
    this.setState({
      locationModal: false
    })
  }
  submitOffer() { 
    let {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
    } = this.state
    if (!sendCityName) {
      this.toast('请选择发车城市')
      return
    }
    if (!receiveCityName) {
      this.toast('请选择收车城市')
      return
    }
    let userId = this.props.userInfo.userId
    if (!userId) {
      showModalAndRegister()
      return
    }
    let sendData = {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
    }
    console.log(sendData)
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
  
  getUserInfo(e) { 
    let { userInfo } = e.target
    Actions.changeUserInfo(
      Object.assign({}, userInfo, {
        nickName: userInfo.nickName,
        userPhoto: userInfo.avatarUrl,
      })
    )
    this.submitOffer()
  }
  navigateToRegister(e) { 
    e.stopPropagation()
    showModalAndRegister()
  }
  onShareAppMessage() {
    let path = `/pages/index/index`
    let title = `欢迎您进入跑车物流~`
    const imageUrl = `${defaultResourceImgURL}share_mp.png`
    return {
      title: title,
      path: path,
      imageUrl
    }
  }
  config = {
    navigationBarTitleText: '跑车物流'
  }
  render() {
    let {
      receiveCityName,
      sendCityName,
      locationModal,
    } = this.state
    let { userInfo } = this.props
    return (
      <View className='index-wrapper'>
          {/* 发车地址 */}
          <View className='from-item'>
            <View className='label-wrapper' onClick={()=>this.chooseCity('choose_start_city')}>
              <View className='form-required'>
                <View className='required'>*</View>
                <View className='from-label'>发车地点</View>
              </View>
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
        </View>
        {/* 收车地址 */}
        <View className='from-item'>
          <View className='label-wrapper' onClick={()=>this.chooseCity('choose_target_city')}>
            <View className='form-required'>
              <View className='required'>*</View>
              <View className='from-label'>收车地点</View>
            </View>
            <View className='from-right'>
              <Text
                className={classNames({
                  'from-disabled-text': !receiveCityName.length
                })}
              >
                {
                  receiveCityName ? receiveCityName : '请选择收车城市'
                }
              </Text>
              <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
            </View>
          </View>
        </View>
        {
          !userInfo.nickName ? 
            <Button type='button' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.getUserInfo} className='submit-btn'>立即询价</Button>
            :
            <Button type='button' className='submit-btn' onClick={this.submitOffer}>立即询价</Button>
        }
        {
          locationModal ? 
            <LocationModal
              onClick={this.modalCallBack.bind(this)}
            ></LocationModal>
            : null
        }
        {
          userInfo.userId ? 
            null :
            <View className='showRegister' onClick={this.navigateToRegister}></View>
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
export default connect(mapStateToProps)(Index)
