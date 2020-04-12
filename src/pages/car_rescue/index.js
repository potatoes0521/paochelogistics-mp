/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 18:33:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-12 19:48:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import api from '@api/index.js'
import CallService from '@c/call_service/index.js'
import ChooseLocation from './components/choose_location/index.js'
import MsgForm from './components/msg_form/index.js'
import './index.styl'

class CarRescue extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '救援' 
  }

  render() {
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <View className='main-wrapper'>
            <ChooseLocation />
            <MsgForm />
            <View className='btn'>立即询价</View>
          </View>
        </View>
        <CallService phoneNumberType='carRescue' text='救援热线' />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(CarRescue)