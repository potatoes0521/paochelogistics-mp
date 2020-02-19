/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-17 12:28:08
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-19 19:10:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  // Block
} from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { carPriceList } from '@config/text_config.js'
import UsedCarItem from './components/used_car_item/index.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
// eslint-disable-next-line import/first
import FloatBtn from '@c/float_btn/index.js'

import './index.styl'

class UsedCar extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      usedCarListData: [],
      brandId: '', //品牌id
      locationId: '', //城市id
      carPriceSection: [], //价格区间
      choosePrice: false
    }
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
    carPriceSection = this.state.carPriceSection,
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
      const data = res.data
      if (data && data.length < pageSize) {
        this.usedCarFlag = true
      }
      this.usedCarPage += 1
      if (pageNum === 1) {
        this.setState({
          usedCarListData: [...data]
        })
      } else {
        this.setState({
          usedCarListData: [...usedCarListData, ...data]
        })
      }
    })
  }
  choosePrice() {
    this.setState({
      choosePrice: !this.state.choosePrice
    })
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
      // usedCarListData,
      choosePrice
    } = this.state
    // const userCarList = usedCarListData.map((item, index) => {
    //   const key = item.userId
    //   return (
    //     <Block
    //       key={key}
    //     >
    //       <UsedCarItem
    //         item={item}
    //         data-item={item}
    //       ></UsedCarItem>
    //       {
    //         index < usedCarListData.length - 1 ?
    //           <View className='line'></View>
    //           : null
    //       }
    //     </Block>
    //   )
    // })
    const carPriceItem = carPriceList.map( item => {
      const key = item.id
      return (
        <View className='car-price-item' key={key}>{item.label}</View>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='tabs-wrapper'>
          <View className='tabs-item'>
            <Text className='tab-text'>地区</Text>
            <Text className='car-tab-icon iconfont iconsanjiaoxing'></Text>
          </View>
          <View className='tabs-item'>
            <Text className='tab-text'>品牌</Text>
            <Text className='car-tab-icon iconfont iconsanjiaoxing'></Text>
          </View>
          <View className='tabs-item' onClick={this.choosePrice}>
            <Text className='tab-text'>价格</Text>
            <Text className='car-tab-icon iconfont iconsanjiaoxing'></Text>
          </View>
        </View>
        <View className='car-list-wrapper'>
          <UsedCarItem></UsedCarItem>
        </View>
        <FloatBtn></FloatBtn>
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