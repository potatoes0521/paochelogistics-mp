/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-18 10:52:25
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-20 15:46:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text
} from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'

import './index.styl'

class UsedCarDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      usedCarDetailsInfo: {},
      swiperIndex: 0 
    }
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params || {}
    this.getCarSourceDetails()
  }
  /**
   * 放大图片
   * @return void
   */
  showBigImage(index) {
    let { usedCarDetailsInfo } = this.state
    Taro.previewImage({
      current: usedCarDetailsInfo.imgUrls[index], // 当前显示图片的http链接
      urls: usedCarDetailsInfo.imgUrls // 需要预览的图片http链接列表
    })
  }
  bannerChange(event) { 
    console.log('event', event)
    // event.detail = {current, source}
    this.setState({
      swiperIndex: event.detail.current
    })
  }
  /**
   * 获取车源详情
   * @return void
   */
  getCarSourceDetails() {
    if (!this.pageParams.carSourceId) {
      Taro.showToast({
        icon: 'none',
        title: 'carSourceId is null'
      })
      return;
    }
    let sendData = {
      carSourceId: this.pageParams.carSourceId
    }
    api.car.getCarSourceDetails(sendData, this).then(res => {
      if (!res) return
      this.setState({
        usedCarDetailsInfo: res
      })
    })
  }
  /**
   * 联系卖家
   * @return void
   */
  callSeller() {
    let { usedCarDetailsInfo } = this.state
    if (!usedCarDetailsInfo.mobile) return
    let sendData = {
      infoType: 2, //类型    1 新车   2 二手车
      objectId: usedCarDetailsInfo.carSourceId,
      behaviourSource: 3 //行为来源  1 精选推荐   2 列表   3 详情
    };
    api.statistics.callPhone(sendData, this).then(() => {});
    Taro.makePhoneCall({
      phoneNumber: usedCarDetailsInfo.mobile
    })
  }
  /**
   * 编辑
   * @return void
   */
  editUsedCar() {
    let { usedCarDetailsInfo } = this.state
    Taro.navigateTo({
      url: `/pages/used_car_publish/index?pageType=edit&carSourceId=${usedCarDetailsInfo.carSourceId}`
    })
  }
  config = {
    navigationBarTitleText: '车源详情' 
  }

  render() {
    let {
      usedCarDetailsInfo,
      swiperIndex
    } = this.state
    const bannerListRender = usedCarDetailsInfo.imgUrls && usedCarDetailsInfo.imgUrls.map((item, index) => {
      const key = item.id
      return (
        <SwiperItem key={key}>
          <View className='banner-item'>
            <Image
              className='banner-image'
              src={item.img}
              onClick={this.showBigImage.bind(this, index)}
            ></Image>
          </View>
        </SwiperItem>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='des-wrapper'>
          <View className='banner-wrapper'>
            <Swiper
              className='swiper'
              autoplay
              circular
              indicatorActiveColor='#ffffff'
              interval='3000'
              onChange={()=>this.bannerChange}
            >
              {
                usedCarDetailsInfo.imgUrls.length ?
                  bannerListRender
                  :
                  <SwiperItem></SwiperItem>
              }
            </Swiper>
            <View className='doc-wrapper'>
              {swiperIndex}/{usedCarDetailsInfo.imgUrls && usedCarDetailsInfo.imgUrls.length}
            </View>
          </View>
          <View className='details-title-wrapper'>
            <View className='details-price'>
              <Text className='money'>{usedCarDetailsInfo.carPrice || ''}</Text>
              <Text className='money-text'>万</Text>
              <Text className='history-icon iconfont iconliulan'></Text>
              <Text className='history-text'>{usedCarDetailsInfo.browseHistoryCount || ''}</Text>
              <Text className='history-icon iconfont iconlianxiwomen'></Text>
              <Text className='history-text'>{usedCarDetailsInfo.callHistoryCount || ''}</Text>
            </View>
            <View className='details-info'>
              <Text className='details-title' space='ensp'>{usedCarDetailsInfo.masterBrandName || ''}</Text>
              <Text className='details-title' space='ensp'>{usedCarDetailsInfo.carSerial || ''}</Text>
              <Text className='details-title' space='ensp'>{usedCarDetailsInfo.yearType || ''}款</Text>
              <Text className='details-title' space='ensp'>{usedCarDetailsInfo.gasDisplacement || ''}</Text>
              <Text className='details-title'>{usedCarDetailsInfo.carBasic || ''}</Text>
            </View>
          </View>
          <View className='title'>车辆档案</View>
          <View className='main main-des'>
            <View className='des-line'>
              <View className='des-item long'>
                <Text className='item-title'>首次上牌</Text>
                <Text className='item-des'>{usedCarDetailsInfo.onTheCardTimeDesc && usedCarDetailsInfo.onTheCardTimeDesc.substring(0, 7) || ''}</Text>
              </View>
              <View className='des-item'>
                <Text className='item-title short'>里程</Text>
                <Text className='item-des'>{usedCarDetailsInfo.mileage || ''}万公里</Text>
              </View>
            </View>
            <View className='des-line'>
              <View className='des-item long'>
                <Text className='item-title'>排放</Text>
                <Text className='item-des'>{usedCarDetailsInfo.effluentStandard || ''}</Text>
              </View>
              <View className='des-item'>
                <Text className='item-title short'>排量</Text>
                <Text className='item-des'>{usedCarDetailsInfo.gasDisplacement || ''}</Text>
              </View>
            </View>
            <View className='des-line'>
              <View className='des-item long'>
                <Text className='item-title'>所在城市</Text>
                <Text className='item-des'>{usedCarDetailsInfo.locationName || ''}</Text>
              </View>
              <View className='des-item'>
                <Text className='item-title short'>车龄</Text>
                <Text className='item-des'>{usedCarDetailsInfo.carAge || ''}</Text>
              </View>
            </View>
          </View>
          {
            usedCarDetailsInfo.buttons && usedCarDetailsInfo.buttons.length ?
              null :
              <View className='other-remark'>
                <View className='title'>其他说明</View>
                <View className='main'>
                  <View className='remark'>{usedCarDetailsInfo.remark || ''}</View>
                </View>
              </View>
          }
        </View>
        {
          usedCarDetailsInfo.buttons && usedCarDetailsInfo.buttons.length ? 
            <View className='btn-wrapper'>
              <View className='btn' onClick={this.editUsedCar.bind(this)}>
                编辑
              </View>
            </View>
            :
            <View className='btn-wrapper'>
              <View className='btn' onClick={this.callSeller.bind(this)}>
                联系卖家
              </View>
            </View>
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
export default connect(mapStateToProps)(UsedCarDetails)