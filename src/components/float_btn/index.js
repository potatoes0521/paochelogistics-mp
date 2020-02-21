/*
 * @Author: guorui
 * @description: 发布车源按钮
 * @Date: 2020-02-18 15:34:37
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-21 11:59:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {
  View,
  Image
} from '@tarojs/components'
import Certification from '@c/certification_modal/index.js'
import imagePublish from '../../assets/img/float_btn/fabu.png'

import './index.styl'

class FloatBtn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentDidHide() { 
    this.setState({
      visible: false
    })
  }
  /**
   * 发布车源
   * @return void
   */
  publish() { 
    let {userInfo} = this.props
    if (!userInfo.realNameAuthStatus) {
      this.setState({
        visible: true
      })
    } else {
      Taro.navigateTo({
        url: `/pages/used_car_publish/index?pageType=publish`
      })
    }
  }

  render() { 
    let {visible} = this.state
    return (
      <View className='page-wrapper'>
        <View className='float-btn-wrapper' onClick={() => this.publish()}>
          <Image src={imagePublish}></Image>
        </View>
        <Certification visible={visible} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(FloatBtn)
