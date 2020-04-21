/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-28 13:43:50
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-02 13:34:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import {
  convertingGPS
} from '@utils/location.js'
import {
  getUserLocation
} from '@utils/common.js'
import EmptyData from '@c/empty_data/index.js'
import OfferForm from '../index/components/offer_city/index.js'
import './index.styl'

class SearchLine extends Component {

  constructor(props) {
    super(props)
    this.state = {
      receiveCityId: 0, // 收车城市ID
      receiveCityName: '',
      sendCityId: 0, // 发车地址ID
      sendCityName: '',
      searchList: [],
    }
    this.pageNum = 1
    this.pageFlag = false
  }

  componentDidMount() {
    this.handleLocation()
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
      if (!res) { return }
      this.setState({
        sendCityName: cityName,
        sendCityId: res.cityId
      })
    })
  }
  submit() {
    const pageSize = 10
    let {
      searchList,
      sendCityId,
      receiveCityId
    } = this.state
    let sendData = {
      sendCityId,
      receiveCityId,
      pageNum: this.pageNum,
      pageSize
    }
    api.searchLine.searchLinePrice(sendData, this).then(res => {
      if(!res) return
      if (res && res.length < pageSize) {
        this.pageFlag = true
      }
      this.pageNum += 1
      if (this.pageNum === 1) {
        this.setState({
          searchList: res
        })
      } else {
        this.setState({
          searchList: [...searchList, ...res]
        })
      }
    })
  }
  chooseNewCity() { 
    this.pageFlag = false
    this.pageNum = 1
    this.setState({
      searchList: []
    })
  }
  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    console.log('触底')
    if (this.pageFlag) return
    this.submit()
  }
  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.pageFlag = false
    this.pageNum = 1
    this.setState({
      searchList: []
    }, () => {
      this.submit()
    })
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }
  config = {
    navigationBarTitleText: '线路价格查询'
  }

  render() {
    let {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
      searchList
    } = this.state
    const searchListRender = searchList.map(item => {
      const key = item.id
      return (
        <View className='search-item' key={key}>
          <View className='city-wrapper'>
            <Text>
              {
                item.sendCityName && item.sendCityName.length > 5 ?
                item.sendCityName.substr(0, 5) + '...':
                item.sendCityName || ''
              }
            </Text>
            <Text className='iconfont iconjiantou_qiehuanyou city-icon'></Text>
            <Text>
              {
                item.receiveCityName && item.receiveCityName.length > 5 ?
                  item.receiveCityName.substr(0, 5) + '...':
                  item.receiveCityName || ''
              }
            </Text>
          </View>
          <Text className='other'>{item.transportMileageDesc}公里</Text>
          <Text className='other'>{item.transportPriceDesc}元/台</Text>
        </View>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='form-wrapper'>
          <OfferForm
            receiveCityName={receiveCityName}
            sendCityName={sendCityName} 
            receiveCityId={receiveCityId}
            sendCityId={sendCityId}
            type='search-line'
            onSubmit={this.submit.bind(this)}
            onChooseNewCity={this.chooseNewCity.bind(this)}
          />
        </View>
        <View className='search-res-list'>
          {
            searchList && searchList.length ?
              searchListRender
              : 
              <EmptyData pageType='searchLine'></EmptyData>
          }
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(SearchLine)