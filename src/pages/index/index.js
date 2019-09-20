/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-17 11:53:57
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 14:53:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import RadioGroups from '@c/radio/index.js'
import { serviceList } from '@config/text_config.js'
import './index.styl'

class Index extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      serviceId: 1
    }
  }
  componentDidShow () { }

  componentDidHide() { }
  /**
   * 单选
   * @param {Object} e event对象
   * @return void
   */
  chooseRadio(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      serviceId: e.id
    })
  }
  
  config = {
    navigationBarTitleText: '首页'
  }
  render() {
    let {serviceId} = this.state
    
    
    return (
      <View className='index'>
        <RadioGroups
          options={serviceList}
          activeIndex={serviceId}
          onClick={this.chooseRadio.bind(this)}
        ></RadioGroups>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Index)
