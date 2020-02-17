/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-17 12:28:08
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-17 12:28:08
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
// import api from '@api/index.js'

import './index.styl'

class UsedCar extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '车源' 
  }

  render() {
    return (
      <View className='page-wrapper'>
        <View className='tabs-wrapper'>
          <View className='tabs-item'>
            <Text className='tab-text'></Text>
            <Text className='tab-icon'></Text>
          </View>
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
export default connect(mapStateToProps)(UsedCar)