/*
 * @Author: guorui
 * @description: 发布车源按钮
 * @Date: 2020-02-18 15:34:37
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-26 15:00:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {
  View,
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'
import imagePublish from '../../assets/img/float_btn/fabu.png'

import './index.styl'

class FloatBtn extends Component {

  constructor(props) {
    super(props)
  }
  
  /**
   * 发布车源
   * @return void
   */
  publish() { 
    let {
      userInfo,
      needCheck,
      usedType
    } = this.props
    console.log('usedType', usedType)
    if (needCheck && !userInfo.realNameAuthStatus) {
      this.props.onNoRealName()
    } else {
      Taro.navigateTo({
        url: `/pages/used_car_publish/index?pageType=publish&usedType=${usedType}`
      })
    }
  }

  render() { 
    return (
      <View className='page-wrapper'>
        <View className='float-btn-wrapper' onClick={() => this.publish()}>
          <Image src={imagePublish}></Image>
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

FloatBtn.defaultProps = {
  needCheck: false,
  onNoRealName: () => {}
}

FloatBtn.propTypes = {
  needCheck: PropTypes.bool,
  onNoRealName: PropTypes.func,
}

export default connect(mapStateToProps)(FloatBtn)
