/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-20 13:24:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 13:27:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class Mine extends Component {

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  config = {
    navigationBarTitleText: '我的'
  }
  render () {
    return (
      <View className='index'>
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Mine)