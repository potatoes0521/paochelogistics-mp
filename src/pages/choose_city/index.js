/*
 * @Author: liuYang
 * @description: 城市选择
 * 
 * 主要是修改redux的chooseCity里面的属性来进行页面交互
 * 
 * @Date: 2019-08-30 15:53:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-19 20:26:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import {
  View,
  Input,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import _flattenDeep from 'lodash/flattenDeep'
import api from '@api/index.js'
import Storage from '@utils/storage.js'
import './index.styl'

// eslint-disable-next-line import/first
import Indexes from '@c/indexes/index.js'

class ChooseCity extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      allCity: [],
      hotCity: [],
      filterCityList: [],
      pageParams: {}
    }
    this.allCityList = []
    this.timer = null
    this.throughCityNameList = []
    this.throughCityIdList = []
  }
  
  componentDidMount() {
    this.setState({
      pageParams: this.$router.params
    })
    this.handleLocationMsg()
  }
  
  handleLocationMsg() { 
    this.getLocationMsg()
    // Storage.getStorage('city_list').then(res => {
    //   if (res) {
    //     let hotCity = res.hotCities || []
    //     let allCity = res.all || []
    //     this.allCityList = allCity.map(item => {
    //       return item.list
    //     })
    //     this.allCityList = _flattenDeep(this.allCityList)
    //     this.setState({
    //       hotCity,
    //       allCity
    //     })
    //   } else {
    //     this.getLocationMsg()
    //   }
    // })
  }
  /**
   * 获取位置信息
   * @return void
   */
  getLocationMsg() {
    api.city.getLocationMsg({}, this)
      .then(res => {
        let hotCity = res.hotCities || []
        let allCity = res.all || []
        Storage.setStorage('city_list', res)
        this.allCityList = allCity.map(item => {
          return item.list
        })
        this.allCityList = _flattenDeep(this.allCityList)
        this.setState({
          hotCity,
          allCity
        })
      })
  }
  /**
   * 选中处理
   * @param {Object} item 处理选中  多选时为城市名字
   * @param {Object} item2 多选时返回值多一个   多选时未城市ID
   * @return void
   */
  onClick(item, item2) {
    console.log('item', item)
    let {pageParams} = this.state
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (pageParams.type === 'start') {
      prevPage.$component.setState({
        sendCityName: item.cityName,
        sendCityId: item.cityId
      }, () => {
        Taro.navigateBack()
      })
    } else if (pageParams.type === 'target') {
      prevPage.$component.setState({
        receiveCityName: item.cityName,
        receiveCityId: item.cityId
      }, () => {
        Taro.navigateBack()
      })
    } else if (pageParams.type === 'sell') {
      prevPage.$component.setState({
        locationName: item.cityName,
        locationId: item.cityId
      }, () => {
        Taro.navigateBack()
      })
    } else {
      this.throughCityNameList = item
      this.throughCityIdList = item2
    }
  }
  
  /**
   * 选择了搜索里的城市  事件委托
   * @param {Object} e event对象
   * @return void
   */
  chooseSearchCity(city) {
    this.onClick(city)
  }
  /**
   * 搜索城市
   * @param {Object} e event对象
   * @return void
   */
  searchCity(e) { 
    let { value } = e.target
    if (value.length < 1) return
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      let filterCityList = this.allCityList.filter(item => {
        return (item && item.cityName && item.cityName.indexOf(value) !== -1) || (item && item.spell && item.spell.indexOf(value) !== -1)
      })
      this.setState({
        filterCityList
      })
    },1000)
  }
  /**
   * 取消或者提交
   * @return void
   */
  cancelChecked(type = 'cancel') {
    let {editMsg} = this.props
    if (type === 'submit' && this.throughCityNameList.length) {
      let pages = Taro.getCurrentPages() //  获取页面栈
      let prevPage = pages[pages.length - 2] // 上一个页面
      if (JSON.stringify(editMsg) !== `{}`) {
        prevPage.$component.setState({
          throughCitys: {
            cityName: this.throughCityNameList.toString() || '',
            cityId: this.throughCityIdList.toString() || ''
          }
        }, () => {
          Taro.navigateBack()
        })
      }
      prevPage.$component.setState({
        throughCityNameList: this.throughCityNameList.toString() || '',
        throughCityIdList: this.throughCityIdList.toString() || ''
      }, () => {
        Taro.navigateBack()          
      })
    } else if (type === 'submit' && this.throughCityNameList.length <= 0) {
      Taro.showToast({
        title: '至少选择一个途经城市',
        icon: 'none'
      })
    } else {
      Taro.navigateBack()      
    }
  }

  config = {
    navigationBarTitleText: '城市选择'
  }

  render() {
    let {
      hotCity,
      allCity,
      filterCityList,
      pageParams
    } = this.state
    
    const hotCityList = hotCity.map(city => {
      const key = city.cityId
      return (
        <View
          className='hot-item'
          onClick={this.chooseSearchCity.bind(this, city)}
          key={key}
        >
          <View className='hot-item-btn'>{city.cityName}</View>
        </View>
      )
    })
    
    const filterList = filterCityList.map(city => {
      const key = city.cityId
      return (
        <View
          className='search-item'
          onClick={this.chooseSearchCity.bind(this, city)}
          key={key}
        >
          <View className='search-item-name'>{city.cityName}</View>
          <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
        </View>
      )
    })
    
    const allWrapperClassName = classNames({
      'choose-city-wrapper': true,
      'search-padding-top': pageParams.type !== 'through',
    })

    const indexesWrapperClassName = classNames({
      'indexes-wrapper': true,
      'search-indexes-wrapper': pageParams.type !== 'through',
      'checked-indexes-wrapper': pageParams.type === 'through'
    })

    return (
      <View className={allWrapperClassName}>
        {
          (pageParams.type !== 'through') ?
          <View className='choose-city-search-wrapper'>
            <View className='search-from-wrapper'>
              <View className='iconfont iconsousuo icon-style'></View>
              <View className='input-wrapper'>
                <Input
                  className='input'
                  placeholder='请输入城市名称进行搜索'
                  onInput={this.searchCity}
                ></Input>
              </View>
            </View>
          </View>
          : null
        }
        <View className={indexesWrapperClassName}>
          {
            filterCityList.length ?
              <View className='search-wrapper'>
                {filterList}
              </View>
              :
              <Indexes
                list={allCity}
                animation
                topKey='热门'
                isVibrate={false}
                checkBox={pageParams.type === 'through'}
                onClick={this.onClick.bind(this)}
              >
                {
                  hotCity.length ?
                    <View className='hot-city-wrapper'>
                      <View className='hot-title'>热门城市</View>
                      <View className='hot-city-list'>
                        {hotCityList}
                      </View>
                    </View>
                    : null
                }
              </Indexes>
          }
        </View>
        {
          pageParams.type === 'through' ?
            <View className='check-bottom-wrapper'>
              <View className='btn-public check-cancel' onClick={this.cancelChecked}>取消</View>
              <View className='btn-public check-submit' onClick={()=>this.cancelChecked('submit')}>确认</View>
            </View>
            : null
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    editMsg: state.publish_msg.editMsg    
  }
}
export default connect(mapStateToProps)(ChooseCity)