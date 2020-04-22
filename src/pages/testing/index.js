/*
 * @Author: liuYang
 * @description: 检测界面
 * @path: 引入路径
 * @Date: 2020-02-13 12:28:23
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-22 13:43:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import Certification from '@c/certification_modal/index.js'
import {navigatorToChannel} from '@utils/navigator_to_channel.js'

class Testing extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.pageParams = {}
  }

  componentDidShow() {
    this.pageParams = this.$router.params
    this.getUserRealNameStatus()
  }
  getUserRealNameStatus() { 
    let sendData = {
      activeCode: this.pageParams.activeCode
    }
    api.user.checkUserRealNameStatus(sendData, this).then(res => {
      if (!res) {
        this.setState({
          visible: true
        })
      } else {
        navigatorToChannel(res, true)
      }
    })
  }
  changeVisibleState() { 
    // Taro.navigateBack()
  }
  config = {
    navigationBarTitleText: '跑车物流' 
  }

  render() {
    let {visible} = this.state
    return <View>
      <Certification onClick={this.changeVisibleState.bind(this)} visible={visible} />
    </View>
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Testing)