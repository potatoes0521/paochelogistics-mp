/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-03 15:11:48
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 11:22:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Button
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Actions from '@store/actions/index.js'
import './index.styl'

export default class index extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state={}
  }
  /**
   * 跳转页面
   * @param {String} pageName='choose_start_city' 跳转到那个页面
   * @return void
   */
  chooseCity(pageName = 'choose_start_city') {
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
      default:
        return
    }
  }
  getUserInfo(e) {
    let {
      userInfo
    } = e.target
    Actions.changeUserInfo(
      Object.assign({}, userInfo, {
        nickName: userInfo.nickName,
        userPhoto: userInfo.avatarUrl,
      })
    )
    this.submitOffer()
  }
  /**
   * 提交询价 跳转到询价操作页面
   * @return void
   */
  submitOffer() {
    let {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
    } = this.props
    if (!sendCityName) {
      this.toast('请选择发车城市')
      return
    }
    if (!receiveCityName) {
      this.toast('请选择收车城市')
      return
    }
    let sendData = {
      receiveCityId,
      receiveCityName,
      sendCityName,
      sendCityId,
    }
    console.log(sendData)
    let str = ''
    for (let i in sendData) {
      str += i + '=' + encodeURIComponent(sendData[i]) + '&'
    }
    Taro.navigateTo({
      url: `/pages/push_offer/index?${str}`
    })
  }

  toast(errMsg) {
    Taro.showToast({
      title: errMsg,
      icon: 'none'
    })
  }
  
  render() {
    let {
      userInfo,
      sendCityName,
      receiveCityName
    } = this.props
    return (
      <View className='offer-wrapper'>
          <View className='offer-form'>
            <View className='offer-form-top'>
              {/* 发车地址 */}
              <View className='from-item'>
                <View className='label-wrapper' onClick={()=>this.chooseCity('choose_start_city')}>
                  <View className='form-required'>
                    <View className='required'>*</View>
                    <View className='from-label'>发车城市</View>
                  </View>
                  <View className='from-right'>
                    <Text
                      className={classNames({
                        'from-disabled-text': !sendCityName
                      })}
                    >
                      {
                        sendCityName ? sendCityName : '请选择发车城市'
                      }
                    </Text>
                    <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
                  </View>
                </View>
              </View>
              {/* 收车地址 */}
              <View className='from-item'>
                <View className='label-wrapper' onClick={()=>this.chooseCity('choose_target_city')}>
                <View className='form-required'>
                  <View className='required'>*</View>
                  <View className='from-label'>收车城市</View>
                </View>
                <View className='from-right'>
                  <Text
                    className={classNames({
                      'from-disabled-text': !receiveCityName.length
                    })}
                  >
                    {
                      receiveCityName ? receiveCityName : '请选择收车城市'
                    }
                  </Text>
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></Text>
                </View>
              </View>
              </View>
            </View>
            {
              !userInfo.nickName ? 
                <Button type='button' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.getUserInfo} className='submit-btn'>立即询价</Button>
                :
                <Button type='button' className='submit-btn' onClick={this.submitOffer}>立即询价</Button>
            }
          </View>
        </View>
    )
  }

}

index.defaultProps = {
  receiveCityId: 0, // 收车城市ID
  receiveCityName: '',
  sendCityId: 0, // 发车地址ID
  sendCityName: '',
}

index.propTypes = {
  receiveCityName: PropTypes.string,
  sendCityName: PropTypes.string,
}