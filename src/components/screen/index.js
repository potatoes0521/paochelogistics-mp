
/*
 * @Author: liuYang
 * @description: 抽屉组件的内部的样式
 * @Date: 2019-10-29 10:25:23
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-18 12:52:48
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * 
 * 因为选择城市是修改上一页的数据  
 * 不是用的数据管理 所以建议在本页面定义收发车城市
 * 
 * sendCityName: '' // 发车城市  
 * receiveCityName: '' // 收车城市
 * showType // 要展示那些选择项
 *  'cities' // 发车和收车城市都显示
 *  'sendCity', // 发车城市
 *  'receiveCity', // 收车城市
 *  'times' // 开始和结束时间都显示
 *  'timeStart', // 开始时间
 *  'timeEnd' // 结束时间
 *  ''
 * onClick 点击最下面提交和重置
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Picker
} from '@tarojs/components'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/first
import { getTimeDate } from '@utils/timer_handle.js'

import './index.styl'

export default class Screen extends Component {
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  constructor(props) { 
    super(props)
    this.state = {
      createTimeStart: '',
      createTimeEnd: '',
    }
  }

  submitSelect() { 
    let {
      createTimeStart,
      createTimeEnd,
    } = this.state
    if (createTimeStart && createTimeEnd) {
      let start = getTimeDate(createTimeStart)
      let end = getTimeDate(createTimeEnd)
      if (start > end) {
        Taro.showToast({
          title: '结束时间不能小于开始时间哦',
          icon: 'none',
          duration: 2500
        })
        return
      }
    }
    let obj = {
      createTimeStart: createTimeStart,
      createTimeEnd: createTimeEnd
    }
    this.props.onClick('submit', obj)
  }
  resetSelect() { 
    let obj = {
      createTimeStart: '',
      createTimeEnd: '',
      sendCityId: '',
      sendCityName: '',
      receiveCityId: '',
      receiveCityName: ''
    }
    this.props.onClick('reset', obj)
  }
  /**
   * 跳转页面
   * @param {String} pageName='choose_start_city' 跳转到那个页面
   * @return void
   */
  navigatorPage(pageName = 'choose_start_city') {
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
      case 'choose_through_city':
        Storage.setStorage('through_city', {
          id: this.state.throughCitys,
          name: this.state.throughCitiesName
        })
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=through`
        })
        return
      default:
        return
    }
  }
  /**
   * 选择开始时间
   * @return void
   */
  onStartTimeDateChange(e) { 
    let time = e.detail.value
    this.setState({
      createTimeStart: time
    })
  }
  /**
   * 选择结束时间
   * @return void
   */
  onEndTimeDateChange(e) { 
    let time = e.detail.value
    console.log(time)
    this.setState({
      createTimeEnd: time
    })
  }
  render() {
    let {
      sendCityName,
      receiveCityName,
      showType
    } = this.props
    let {
      createTimeStart,
      createTimeEnd,
    } = this.state
    const showSendCity = showType.includes('cities') || showType.includes('sendCity')
    const showReceiveCity = showType.includes('cities') || showType.includes('receiveCity')
    const showStartTime = showType.includes('times') || showType.includes('timeStart')
    const showEndTime = showType.includes('times') || showType.includes('timeEnd')
    const showOrderTimeTitle = showType.includes('times') || showType.includes('timeEnd') || showType.includes('timeStart')
    return (
      <View className='drawer-wrapper'>
        <View className='drawer-list'>
          {
            showSendCity && (
              <View
                className='drawer-list-item'
                onClick={() => this.navigatorPage('choose_start_city')}
              >
                <View className='drawer-item-label'>发车城市</View> 
                <View>
                  {
                    sendCityName ? 
                      <Text className='drawer-item-value'>{sendCityName}</Text>
                      :
                      <Text>请选择发车城市</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </View>
              </View>
            )
          }
          {
            showReceiveCity && (
              <View
                className='drawer-list-item'
                onClick={() => this.navigatorPage('choose_target_city')}
              >
                <View className='drawer-item-label'>收车城市</View> 
                <View>
                  {
                    receiveCityName ?
                      <Text className='drawer-item-value'>{receiveCityName}</Text>
                      :
                      <Text>请选择收车城市</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </View>
              </View>
            )
          }
          {
            showOrderTimeTitle && (
              <View className='drawer-list-title'>
                下单时间
              </View>
            )
          }
          {
            showStartTime && (
              <View className='drawer-list-item'>
                <View className='drawer-item-label'>开始时间</View> 
                <Picker
                  className='time-picker'
                  mode='date'
                  onChange={this.onStartTimeDateChange}
                >
                  {
                    createTimeStart ?
                      <Text className='drawer-item-value'>{createTimeStart}</Text>
                      :
                      <Text>请选择开始时间</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </Picker>
              </View>
            )
          }
          {
            showEndTime && (
              <View className='drawer-list-item'>
                <View className='drawer-item-label'>结束时间</View> 
                <Picker
                  className='time-picker'
                  mode='date'
                  onChange={this.onEndTimeDateChange}
                >
                  {
                    createTimeEnd ?
                      <Text className='drawer-item-value'>{createTimeEnd}</Text>
                      :
                      <Text>请选择结束时间</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </Picker>
              </View>
            )
          }
        </View>
        <View className='btn-group'>
          <View className='reset btn' onClick={this.resetSelect}>重置</View>
          <View className='submit btn' onClick={this.submitSelect}>提交</View>
        </View>
      </View>
    )
  }
}

Screen.defaultProps = {
  sendCityName: '',
  receiveCityName: '',
  showType: ['cities'],
  onClick: () => { },
}

Screen.propTypes = {
  sendCityName: PropTypes.string,
  receiveCityName: PropTypes.string,
  showType: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}


