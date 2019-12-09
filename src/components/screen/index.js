
/*
 * @Author: liuYang
 * @description: card类型的组件
 * @Date: 2019-10-29 10:25:23
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-09 10:13:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * 
 * sendCityName: '' // 发车城市
 * receiveCityName: '' // 收车城市
 * createTimeStart: '', // 开始时间
 * createTimeEnd: '', // 结束时间
 * showType // 要展示那些选择项
 *  'cities' // 发车和收车城市都显示
 *  'sendCity', // 发车城市
 *  'receiveCity', // 收车城市
 *  'times' // 开始和结束时间都显示
 *  'timeStart', // 开始时间
 *  'timeEnd' // 结束时间
 *  ''
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/first
import './index.styl'
import '../../assets/icon_font/icon.scss'

export default class Screen extends Component {
  constructor(props) { 
    super(props)
  }

  submitSelect() { 
    this.props.onClick('submit')
  }
  resetSelect() { 
    this.props.onClick('reset')
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
      case 'remark':
        if (this.state.remark) {
          Storage.setStorage('remark', this.state.remark)
        }
        Taro.navigateTo({
          url: `/pages/remark/index`
        })
        return
      default:
        return
    }
  }
  render() {
    let {
      sendCityName,
      receiveCityName,
      createTimeStart,
      createTimeEnd,
      showType
    } = this.props
    const showSendCity = showType.includes('cities') || showType.includes('sendCity')
    const showReceiveCity = showType.includes('cities') || showType.includes('receiveCity')
    const showStartTime = showType.includes('times') || showType.includes('timeStart')
    const showEndTime = showType.includes('times') || showType.includes('timeEnd')
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
            showStartTime && (
              <View className='drawer-list-item'>
                <View className='drawer-item-label'>下单时间</View> 
                <View>
                  {
                    createTimeStart ?
                      <Text className='drawer-item-value'>{createTimeStart}</Text>
                      :
                      <Text>请选择开始时间</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </View>
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
  createTimeStart: '',
  createTimeEnd: '',
  showType: ['cities'],
  onClick: () => {}
}

Screen.propTypes = {
  sendCityName: PropTypes.string,
  receiveCityName: PropTypes.string,
  createTimeStart: PropTypes.string,
  createTimeEnd: PropTypes.string,
  showType: PropTypes.array,
  onClick: PropTypes.func.isRequired
}


