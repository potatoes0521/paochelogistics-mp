/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-20 13:24:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 17:32:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tabs from '@c/tabs/index.js'

import './index.styl'

class Offer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  config = {
    navigationBarTitleText: '询价单'
  }
  render() {
    let { current } = this.state 
    const tabList = [{ title: '全部' }, { title: '已报价' }, { title: '未报价' }]
    return (
      <View className='index'>
        <Tabs
          activeIndex={current}
          options={tabList}
          onClick={this.handleClick.bind(this)}
        ></Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Offer)