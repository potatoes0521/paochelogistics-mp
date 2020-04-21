/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 19:18:29
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-21 13:47:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import {
  convertingGPS
} from '@utils/location.js'
import {
  getUserLocation,
  getSetting,
} from '@utils/common.js'
import api from '@api/index.js'
import LocationModal from '../../../index/components/location_modal/index.js'

import './index.styl'

class ChooseLocation extends Component { 

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state = {
      locationModal: false,
      address: {
        sendAddress: '',
        receiveAddress: '',
        sendCityId: '',
        receiveCityId: '',
        sendLatitude: '',
        sendLongitude: '',
        receiveLatitude: '',
        receiveLongitude: '',
      },
      sendAddressText: '',
      receiveAddressText: ''

    }
  }

  componentDidMount() {
    this.handleLocation()
    // Taro.openLocation({
    //   latitude: 39.90469,
    //   longitude: 116.40717
    // })
  }
  componentDidShow() { 
    this.handleLocation(false)
  }
  chooseLocation(type = 'sendCity') {
    Taro.chooseLocation({
      success: res => {
        let { latitude, longitude } = res
        this.handleConvertingGPS({
          latitude,
          longitude,
          type,
          chooseAddress: res.address
        })
      },
      fail: err => {
        if (err.errMsg && err.errMsg.indexOf('fail auth deny') != -1) {
          this.handleGetSetting()
        }
      }
    })
  }
  /**
   * 获取用户地理位置信息
   * @return void
   */
  handleLocation(changeId = true) {
    getUserLocation().then((res) => {
      this.setState({
        locationModal: false
      })
      if (!changeId) { return }
      this.handleConvertingGPS(res)
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
  handleConvertingGPS({
      latitude,
      longitude,
      type = 'sendCity',
      chooseAddress
    }) {
    convertingGPS(latitude, longitude, 'address_component').then(res => {
      let {
        city,
        district,
        // province,
        street
      } = res
      const addressText = city + district + street
      let { address } = this.state
      if (type === 'sendCity') {
        address.sendLatitude = latitude
        address.sendLongitude = longitude
        address.sendAddress = district + street
        address.sendAddressText = chooseAddress || addressText
      } else {
        address.receiveLatitude = latitude
        address.receiveLongitude = longitude
        address.receiveAddress = district + street
        address.receiveAddressText = chooseAddress || addressText
      }
      this.setState(address)
      this.cityNameChangeCityID(res.city, type)
      // 然后去处理一下id
    })
  }
  /**
   * 城市名字换城市ID
   * @param {String} cityName 城市名字
   * @return void
   */
  cityNameChangeCityID(cityName, type = 'sendCity') {
    let sendData = {
      locationName: cityName
    }
    api.city.cityNameChangeCityID(sendData, this).then(res => {
      if (!res) { return }
      let { address } = this.state
      if (type === 'sendCity') {
        address.sendCityId = res.cityId
      } else {
        address.receiveCityId = res.cityId
      }
      this.setState(address, () => {
        this.props.onChooseCity(this.state.address)
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
  modalCallBack() {
    this.setState({
      locationModal: false
    })
  }
  render() {
    let {
      locationModal,
      sendAddressText,
      receiveAddressText
    } = this.state
    const sendAddressLabelClassName = classNames('label', {
      'label-placeholder-class': !sendAddressText
    })
    const receiveAddressLabelClassName = classNames('label', {
      'label-placeholder-class': !receiveAddressText
    })
    return (
      <View className='choose-location-wrapper'>
        <View className='choose-location-item' onClick={this.chooseLocation.bind(this, 'sendCity')}>
          <View className='item-left-wrapper'>
            <View className='circular-public now-location'></View>
            <View className={sendAddressLabelClassName}>{sendAddressText || '您所在的位置'}</View>
          </View>
          <View className='right-icon iconfont iconxiangyouxuanzejiantoux'></View>
        </View>
        <View className='line'></View>
        <View className='choose-location-item' onClick={this.chooseLocation.bind(this, 'receiveCity')}>
          <View className='item-left-wrapper'>
            <View className='circular-public target-location'></View>
            <View className={receiveAddressLabelClassName}>{receiveAddressText || '您要把车拖到哪里？'}</View>
          </View>
          <View className='right-icon iconfont iconxiangyouxuanzejiantoux'></View>
        </View>
        <LocationModal
          onClick={this.modalCallBack.bind(this)}
          showModal={locationModal}
          modalTextType='carRescue'
        ></LocationModal>
      </View>
    )
  }

}

ChooseLocation.defaultProps = {
  onChooseCity: () => {}
}

ChooseLocation.propTypes = {
  onChooseCity: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(ChooseLocation)