/*
 * @Author: guorui
 * @description: 发布车源按钮
 * @Date: 2020-02-18 15:34:37
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-20 09:25:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {
  View,
  Image
} from '@tarojs/components'
import { showModalAndRegister } from '@utils/common.js'
import imagePublish from '../../assets/img/float_btn/fabu.png'

import './index.styl'

class FloatBtn extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  /**
   * 发布车源
   * @return void
   */
  publish() { 
    let {userId} = this.props.userInfo
    if (!userId) {
      showModalAndRegister()
    } else {
      Taro.navigateTo({
        url: `/pages/used_car_publish/index?pageType=publish`
      })
    }
  }

  render() { 
    return (
      <View className='float-btn-wrapper' onClick={() => this.publish()}>
        <Image src={imagePublish}></Image>
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
