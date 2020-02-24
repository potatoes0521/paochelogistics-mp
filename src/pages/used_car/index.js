/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-17 12:28:08
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-24 10:12:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { carPriceList } from '@config/text_config.js'
import api from '@api/index.js'
import FloatBtn from '@c/float_btn/index.js'
import EmptyData from '@c/empty_data/index.js'
import Certification from '@c/certification_modal/index.js'
import UsedCarItem from './components/used_car_item/index.js'

import './index.styl'

class UsedCar extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      usedCarListData: [],
      brandId: '', //品牌Id
      brandName: '', //品牌Id
      locationId: '', //城市ID
      locationName: '',
      choosePrice: false,
      priceIndex: 1,
      priceName: '',
      visible: false,
    }
    this.carPriceSection = [] //价格区间
    this.usedCarPage = 1
    this.usedCarFlag = false
  }

  componentDidShow() {
    this.usedCarPage = 1
    this.usedCarFlag = false
    this.setState({
      usedCarListData: []
    })
    this.getUsedCarList({})
  }
  componentDidHide() {
    this.setState({
      visible: false
    })
  }
  /**
   * 获取车源列表
   * @param {Type} brandId='' 品牌id
   * @param {Type} locationId='' 城市id
   * @param {Type} carPriceSection=[] 价格区间
   * @param {Type} usedType=2 车辆性质 1 新车  2 二手车
   * @param {Type} pageNum=1 页数
   * @param {Type} pageSize=10 条数
   * @return void
   */
  getUsedCarList({
    brandId = this.state.brandId,
    locationId = this.state.locationId,
    carPriceSection = this.carPriceSection,
    usedType = 2,
    pageNum = this.usedCarPage,
    pageSize = 10
  }) {
    let sendData = {
      brandId,
      locationId,
      usedType,
      pageNum,
      pageSize,
    }
    if (carPriceSection && carPriceSection.length) {
      sendData.carPriceSection = carPriceSection.toString()
    }
    let { usedCarListData } = this.state
    api.car.getCarSourceList(sendData, this).then(res => {
      if(!res) return
      if (res && res.length < pageSize) {
        this.usedCarFlag = true
      }
      this.usedCarPage += 1
      if (pageNum === 1) {
        this.setState({
          usedCarListData: [...res]
        })
      } else {
        this.setState({
          usedCarListData: [...usedCarListData, ...res]
        })
      }
    })
  }
  /**
   * 选择城市
   * @return void
   */
  chooseCity() {
    Taro.navigateTo({
      url: `/pages/choose_city/index?type=sell`
    })
  }
  /**
   * 选择品牌
   * @return void
   */
  chooseBrand() {
    Taro.navigateTo({
      url: `/pages/choose_city/index?type=sell&pageType=car`
    })
  }
  /**
   * 关闭价格弹框
   * @return void
   */
  closeChoosePrice() {
    this.setState({
      choosePrice: false
    })
  }
  /**
   * 选择价格
   * @return void
   */
  choosePrice() {
    this.setState({
      choosePrice: !this.state.choosePrice
    })
  }
  choosePriceItem(item) {
    this.setState({
      choosePrice: !this.state.choosePrice,
      priceIndex: item.id,
      priceName: item.label
    })
    this.carPriceSection = []
    if (item.id === 1) {
      this.carPriceSection = []
    } else if (item.id === 2) {
      this.carPriceSection = [0, 500]
    } else if (item.id === 3) {
      this.carPriceSection = [500, 1000]
    } else if (item.id === 4) {
      this.carPriceSection = [1000, 1500]
    } else if (item.id === 5) {
      this.carPriceSection = [1500, 2000]
    } else if (item.id === 6) {
      this.carPriceSection = [2000, 3000]
    } else if (item.id === 7) {
      this.carPriceSection = [3000, 5000]
    } else if (item.id === 8) {
      this.carPriceSection = [5000, 0]
    }
    this.usedCarPage = 1
    this.usedCarFlag = false
    this.setState({
      usedCarListData: []
    })
    this.getUsedCarList({})
  }
  showRealNameModal() { 
    this.setState({
      visible: true
    })
  }
  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    Taro.showNavigationBarLoading()
    this.usedCarPage = 1
    this.usedCarFlag = false
    this.setState({
      usedCarListData: []
    }, () => {
      this.getUsedCarList({})
    })
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }
  
  handleRegister(event) { 
    event.stopPropagation();
    Taro.navigateTo({
      url: '/pages/register/index'
    })
  }
  stop(event) {
    event.stopPropagation();
  }
  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    console.log('触底')
    if (this.usedCarFlag) return
    this.getUsedCarList({})
  }
  onShareAppMessage() {
    // let imageUrl = `${defaultResourceImgURL}share_mp.png`
    let path = `/pages/index/index?share_type=4`
    let title = `在线看车，实时发布全国车源`
    return {
      title,
      path,
      // imageUrl
    }
  }
  config = {
    navigationBarTitleText: '车源',
    enablePullDownRefresh: true
  }

  render() {
    let {
      usedCarListData,
      choosePrice,
      priceIndex,
      priceName,
      brandName,
      locationName,
      visible,
      locationId,
      brandId
    } = this.state
    let {userInfo} = this.props
    const userCarList = usedCarListData && usedCarListData.map((item) => {
      const key = item.userId
      return (
        <Block
          key={key}
        >
          <UsedCarItem
            item={item}
            data-item={item}
          ></UsedCarItem>
        </Block>
      )
    })
    const carPriceItem = carPriceList.map( item => {
      const carPriceClassName = classNames('car-price-item',
        {
          'choose-car-price': priceIndex === item.id
        }
      )
      const key = item.id
      return (
        <View className={carPriceClassName} key={key} onClick={this.choosePriceItem.bind(this, item)}>{item.label}</View>
      )
    })
    const locationNameClassName = classNames('tab-text', {
      'active-style-text': locationName && locationId
    })
    const locationNameIconClassName = classNames('car-tab-icon iconfont iconsanjiaoxing', {
      'active-style-icon': locationName && locationId,
      'active-style-text': locationName && locationId
    })
    const brandNameClassName = classNames('tab-text', {
      'active-style-text': brandName && brandId,
    })
    const brandNameIconClassName = classNames('car-tab-icon iconfont iconsanjiaoxing', {
      'active-style-icon': brandName && brandId,
      'active-style-text': brandName && brandId
    })
    const priceNameClassName = classNames('tab-text', {
      'active-style-text': priceName && priceIndex !== 1
    })
    const priceNameIconClassName = classNames('car-tab-icon iconfont iconsanjiaoxing', {
      'active-style-icon': priceName && priceIndex !== 1,
      'active-style-text': priceName && priceIndex !== 1
    })
    
    return (
      <View className='page-wrapper'>
        <View className='tabs-wrapper'>
          <View className='tabs-item' onClick={this.chooseCity.bind(this)}>
            <Text className={locationNameClassName}>{ locationName ? locationName : '地区'}</Text>
            <Text className={locationNameIconClassName}></Text>
          </View>
          <View className='tabs-item' onClick={this.chooseBrand.bind(this)}>
            <Text className={brandNameClassName}>{brandName ? brandName : '品牌'}</Text>
            <Text className={brandNameIconClassName}></Text>
          </View>
          <View className='tabs-item' onClick={this.choosePrice.bind(this)}>
            <Text className={priceNameClassName}>{priceName ? priceName : '价格'}</Text>
            <Text className={priceNameIconClassName}></Text>
          </View>
        </View>
        <View className='car-list-wrapper'>
          {
            usedCarListData.length ?
              <Block>
                {
                  userCarList
                }
                <FloatBtn needCheck onNoRealName={this.showRealNameModal.bind(this)}></FloatBtn>
              </Block>
              :
              <EmptyData pageType='carList' userInfo={userInfo} needCheck onNoRealName={this.showRealNameModal.bind(this)}></EmptyData>
          }
        </View>
        {
          choosePrice ?
            <View className='car-price-wrapper' onClick={this.closeChoosePrice.bind(this)}>
              <View className='car-price'>
                {
                  carPriceItem
                }
              </View>
            </View>
            : null
        }
        <Certification visible={visible} />
        {
          !userInfo.userId && (
            <View className='go-register' onTouchMove={this.stop.bind(this)} onClick={this.handleRegister.bind(this)}></View>
          )
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
export default connect(mapStateToProps)(UsedCar)