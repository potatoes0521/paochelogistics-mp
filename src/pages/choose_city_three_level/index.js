/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-29 18:47:13
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-29 22:02:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import cityMsg from './city.json'
import './index.styl'

class chooseCityThreeLevel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      provinceList: [],
      cityList: [{locationName: '请选择', locationId: 1}],
      areaList: [{locationName: '请选择', locationId: 1}],
    }
    this.lastChooseProvince = {}
    this.lastChooseCity = {}
    this.lastChooseArea = {}
    this.lastChoose = {}
    this.pagesParams = {}
  }

  componentDidMount() {
    this.pagesParams = this.$router.params
    this.getAllProvinceList()
  }
  /**
   * 获取省市区信息
   * @return void
   */
  getAllProvinceList() {
    // api.city.getAllProvinceList({}, this).then(res => {
    //   this.handleAllCityMsgData(data);
    // });
    this.handleAllCityMsgData(cityMsg.data)
  }
  /**
   * 处理所有地理位置数据
   * @param {Array} cities 城市数据
   * @param {Boolean} updateStorage=true 是否更新本地缓存
   * @return void
   */
  handleAllCityMsgData(cities) {
    this.allCityMsg = cities;
    this.setState({
      provinceList: cities,
    });
  }
  /**
   * 选择省份
   * @param {Object} city 选中的省份
   * @return void
   */
  chooseProvince(city) {
    console.log('city', city.checked);
    let {
      provinceList
    } = this.state;
    provinceList = this.handleDataChooseData(city, provinceList);
    // this.backGoFirstLine();
    this.setState({
      provinceList,
      cityList: city.children,
      areaList: [],
    });
    this.lastChoose = city
    this.lastChooseProvince = city;
  }
  /**
   * 选择城市
   * @param {Object} city 选中的城市
   * @return void
   */
  chooseCity(city) {
    console.log('city', city);
    if (city.locationId === 1) {
      return;
    }
    let {
      cityList,
      provinceList
    } = this.state;
    this.handleFatherCity(city, provinceList);
    cityList = this.handleDataChooseData(city, cityList);
    // this.backGoFirstLine();
    this.setState({
      cityList,
      areaList: city.children || [],
    });
    city.type = 'city';
    this.lastChoose = city
    this.lastChooseCity = city;
  }
  /**
   * 选择区\县
   * @param {Object} city 选中的区\县
   * @return void
   */
  chooseArea(city) {
    console.log('city', city);
    if (city.locationId === 1) {
      return;
    }
    let {
      areaList,
      cityList
    } = this.state;
    // 找到当前区\县所在的城市  并判断这个城市是不是在现在的列表内
    this.handleFatherCity(city, cityList);
    areaList = this.handleDataChooseData(city, areaList, this.lastChoose);
    // this.backGoFirstLine();
    this.setState({
      areaList,
    });
    this.lastChoose = city
    this.lastChooseArea = city;
  }
  handleFatherCity(city, FatherCityList, onlyFind) {
    let fatherCity = FatherCityList.filter(item => {
      return item.children ?
        item.children.some(ite => ite.locationId === city.locationId) :
        item.locationId === city.locationId;
    })[0];
    if (onlyFind) {
      return fatherCity;
    }
  }
  /**
   * 判断是不是途经城市 并且处理数据
   * @return void
   */
  handleDataChooseData(city, data) {
    data.forEach(item => {
      if (item.locationId === city.locationId) {
        // 如果子集有选中的 他就不是取消
        if (item.children && item.children.some(ite => ite.checked)) {
          item.checked = true;
        } else {
          item.checked = !item.checked;
        }
      } else {
        item.checked = false;
      }
    });
    return data;
  }
  /**
   * 提交选中的城市
   * @return void
   */
  submitChooseCity() {
    if (JSON.stringify(this.lastChoose) === '{}') {
      this.showToast('至少选择一个省/市');
      return;
    }
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (this.pagesParams.type === 'mailingLocation') {
      const mailingLocationName = `${this.lastChooseProvince.locationName || ''}${this.lastChooseCity.locationName || ''}${this.lastChooseArea.locationName || ''}`
      console.log('mailingLocationName', mailingLocationName)
      prevPage.$component.setState({
        mailingLocationName,
        mailingLocationId: this.lastChoose.locationId
      }, () => {
        Taro.navigateBack()
      })
    }
    console.log('this.lastChoose', this.lastChoose)
  }
  showToast(msg) { 
    Taro.showToast({
      title: msg,
      icon: 'none'
    })
  }
  config = {
    navigationBarTitleText: '选择城市' 
  }

  render() {
    let {
      provinceList,
      cityList,
      areaList
    } = this.state
    const provinceListRender = provinceList.map(city => {
      const key = city.locationId;
      const textClassName = classNames('city-item-text', {
        'text-heigh-light': city.checked
      })
      return (
        <View
          onClick={this.chooseProvince.bind(this, city)}
          className='city-item'
          key={key}
        >
          {city.checked ? (
            <Text className='iconfont iconduigoux choose-icon'></Text>
          ) : null}
          <Text className={textClassName}>
            {city.locationName && city.locationName.length > 5
              ? city.locationName.substr(0, 5) + '...'
              : city.locationName}
          </Text>
        </View>
      );
    });
    const cityListRender = cityList.map(city => {
      const key = city.locationId;
      const textClassName = classNames('city-item-text', {
        'text-heigh-light': city.checked
      })
      return (
        <View
          onClick={this.chooseCity.bind(this, city)}
          className='city-item'
          key={key}
        >
          {city.checked ? (
            <Text className='iconfont iconduigoux choose-icon'></Text>
          ) : null}
          <Text className={textClassName}>
            {city.locationName && city.locationName.length > 5
              ? city.locationName.substr(0, 5) + '...'
              : city.locationName}
          </Text>
        </View>
      );
    });
    const areaListRender = areaList.map(city => {
      const key = city.locationId;
      const textClassName = classNames('city-item-text', {
        'text-heigh-light': city.checked
      })
      return (
        <View
          onClick={this.chooseArea.bind(this, city)}
          className='city-item'
          key={key}
        >
          {city.checked ? (
            <Text className='iconfont iconduigoux choose-icon'></Text>
          ) : null}
          <Text className={textClassName}>
            {city.locationName && city.locationName.length > 5
              ? city.locationName.substr(0, 5) + '...'
              : city.locationName}
          </Text>
        </View>
      );
    });
    return (
      <View className='page-wrapper'>
        <View className='title-wrapper'>
          <View className='title-text'>省份</View>
          <View className='title-text'>城市</View>
          <View className='title-text'>区县</View>
        </View>
        <View className='main-wrapper'>
          <View className='public'>
            {provinceListRender}
          </View>
          <View className='public'>
            {cityListRender}
          </View>
          <View className='public'>
            {areaListRender}
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn' onClick={this.submitChooseCity}>确定</View>
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
export default connect(mapStateToProps)(chooseCityThreeLevel)