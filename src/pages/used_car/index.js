/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-17 12:28:08
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-21 09:46:55
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
import UsedCarItem from './components/used_car_item/index.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
// eslint-disable-next-line import/first
import FloatBtn from '@c/float_btn/index.js'
// eslint-disable-next-line import/first
import EmptyData from '@c/empty_data/index.js'

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
      activeIndex: 1,
      activeName: ''
    }
    this.carPriceSection = [] //价格区间
    this.usedCarPage = 1
    this.usedCarFlag = false
  }

  componentDidMount() {
    // this.getUsedCarList({})
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
      carPriceSection,
      usedType,
      pageNum,
      pageSize,
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
      activeIndex: item.id,
      activeName: item.label
    })
    this.carPriceSection = []
    if (item.id === 1) {
      this.carPriceSection = []
    } else if (item.id === 2) {
      this.carPriceSection = [0, 50000]
    } else if (item.id === 3) {
      this.carPriceSection = [50000, 100000]
    } else if (item.id === 4) {
      this.carPriceSection = [100000, 150000]
    } else if (item.id === 5) {
      this.carPriceSection = [150000, 200000]
    } else if (item.id === 6) {
      this.carPriceSection = [200000, 300000]
    } else if (item.id === 7) {
      this.carPriceSection = [300000, 500000]
    } else if (item.id === 8) {
      this.carPriceSection = [500000, 0]
    }
    // this.getUsedCarList({})
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

  config = {
    navigationBarTitleText: '车源' 
  }

  render() {
    let {
      usedCarListData,
      choosePrice,
      activeIndex,
      activeName,
      brandName,
      locationName
    } = this.state
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
      const carPriceStyle = classNames('car-price-item',
        {
          'choose-car-price': activeIndex === item.id
        }
      )
      const key = item.id
      return (
        <View className={carPriceStyle} key={key} onClick={this.choosePriceItem.bind(this, item)}>{item.label}</View>
      )
    })
    const locationNameClassName = classNames('tab-text', {
      'active-style-text': locationName
    })
    const locationNameIconClassName = classNames('car-tab-icon iconfont iconsanjiaoxing', {
      'active-style-icon': locationName,
      'active-style-text': locationName
    })
    const brandNameClassName = classNames('tab-text', {
      'active-style-text': brandName,
    })
    const brandNameIconClassName = classNames('car-tab-icon iconfont iconsanjiaoxing', {
      'active-style-icon': brandName,
      'active-style-text': brandName
    })
    const activeNameStyle = classNames('tab-text', {
      'active-style-text': activeName
    })
    const priceNameIconClassName = classNames('car-tab-icon iconfont iconsanjiaoxing', {
      'active-style-icon': activeName,
      'active-style-text': activeName
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
            <Text className={activeNameStyle}>{activeName ? activeName : '价格'}</Text>
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
                <FloatBtn></FloatBtn>
              </Block>
              :
              <EmptyData pageType='car'></EmptyData>
          }
        </View>
        {
          choosePrice ?
            <View className='car-price-wrapper'>
              <View className='car-price'>
                {
                  carPriceItem
                }
              </View>
            </View>
            : null
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