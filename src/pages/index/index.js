/*
 * @Author: liuYang
 * @description: 首页
 * 
 * @Date: 2019-09-17 11:53:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-16 17:56:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
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
import loadingImage from '@img/index/loading.png'
import { handleShare } from '@utils/handle_share.js'
import { getUserInfo } from '@utils/get_user_info.js'
import Actions from '@store/actions/index.js'
import BottomLoginTips from '@c/bottom_login_tips/index.js'
import OfferForm from './components/offer_city/index.js'
import LocationModal from './components/location_modal/index.js'
import Tool from './components/tool/index'
import Banner from './components/banner/index'
import { handleToolButtons } from '../../config/button_config.js'
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
      bannerList: [],
      recommendList: [],
      failLoading: false,
      toolList: []
    }
    this.initCity = {}
    this.pageParams = {}
  }
  
  
  async componentDidMount() { 
    this.pageParams = this.$router.params
    console.log('参数:', this.pageParams)
    this.initData()
    await login.getOpenId(this) 
    // share_type 1 分享给客户 2 分享砍价 3找人代付 4车源列表 5车源详情
    if (this.pageParams.share_type) {
      this.handleShare()
    }
    this.getBannerList()
    this.getToolList()
    this.getRecommendList()
    this.handleWXUserInfo()
    this.handleLocation()
  }
  componentDidShow() { 
    if (this.state.locationModal) { 
      this.handleGetSetting()
    }
  }
  async handleWXUserInfo() {
    let wxUserInfo = await getUserInfo()
    if (!wxUserInfo.nickName || !wxUserInfo.iv) return
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
  /**
   * 城市名字换城市ID
   * @param {String} cityName 城市名字
   * @return void
   */
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
        this.handleLocation();
      }
    }).catch((err) => {
      console.log(err, ' get setting ')
    })
  }
  /**
   * 获取banner数据
   * @return void
   */
  getBannerList() {
    let sendData = {}
    api.index.getBannerList(sendData, this)
      .then(res => {
        this.setState({
          bannerList: res || []
        })
      })
  }
  /**
   * 获取推荐列表
   * @return void
   */
  getRecommendList() {
    let sendData = {}
    api.index.getRecommendList(sendData, this)
      .then(res => {
        this.setState({
          recommendList: res || []
        })
      })
      .catch(() => {
        this.setState({
          failLoading: true
        })
      })
  }
  getToolList() {
    api.tool.getTopToolList({}, this).then(res => {
      this.setState({
        toolList: handleToolButtons(res)
      })
    })
  }
  modalCallBack() {
    this.setState({
      locationModal: false
    })
  }
  recommendNavigator(item) { 
    this.setState({
      sendCityName: item.sendCityName,
      sendCityId: item.sendCityId,
      receiveCityName: item.receiveCityName,
      receiveCityId: item.receiveCityId
    }, () => {
      this.submitOffer()
    })
  }
  /**
   * 提交询价 跳转到询价操作页面
   * @return void
   */
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
    let sendData = {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
    }
    console.log(sendData)
    let str = ''
    for (let i in sendData) {
      str += i + '=' + encodeURIComponent(sendData[i]) + '&'
    }
    Taro.navigateTo({
      url: `/pages/push_offer/index?${str}`
    })
  }

  toast(errMsg) {
    Taro.showToast({
      title: errMsg,
      icon: 'none'
    })
  }
  
  /**
   * 跳转到注册
   * @return void
   */
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
  go() { 
    Taro.navigateTo({
      url: '/pages/used_car/index'
    })
  }
  config = {
    navigationBarTitleText: '跑车物流'
  }
  render() {
    let {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
      locationModal,
      bannerList,
      recommendList,
      failLoading,
      toolList
    } = this.state
    let { userInfo } = this.props
    
    // 精选推荐
    const recommendListRender = recommendList.map(item => {
      const key = item.hotlineId
      return (
        <View key={key} className='recommend-item' onClick={this.recommendNavigator.bind(this, item)}>
          <View className='recommend-city'>
            <Text>{item.sendCityName}</Text>
            <Text className='iconfont iconjiantou_qiehuanyou icon-right-tou'></Text>
            <Text>{item.receiveCityName}</Text>
          </View>
          <View className='predict'>
            <Text>预估</Text>
            <Text className='weight-text'>
              ¥{item.linePrice}/台
            </Text>
          </View>
        </View>
      )
    })

    return (
      <View className='index-wrapper'>
        <Banner bannerList={bannerList}></Banner>
        <OfferForm
          receiveCityName={receiveCityName}
          sendCityName={sendCityName} 
          receiveCityId={receiveCityId}
          sendCityId={sendCityId}
        />
        <Tool toolList={toolList} />
        <View className='recommend-list'>
          {
            recommendList.length ?
              recommendListRender
              :
              <View className='recommend-no-data'>
                <Image className='no-data-image' src={loadingImage}></Image>
                <View className='tips-text'>{failLoading ? '网络不给力' : '数据加载中'}</View>
              </View>
          }
        </View>
        <BottomLoginTips></BottomLoginTips>
        <LocationModal
          onClick={this.modalCallBack.bind(this)}
          showModal={locationModal}
        ></LocationModal>
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
