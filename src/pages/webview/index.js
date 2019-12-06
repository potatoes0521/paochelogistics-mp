/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-05 14:12:35
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-05 15:52:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import api from '@api/index.js'

class index extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    this.setState({
      url: decodeURIComponent(this.pageParams.url)
    })
  }

  config = {
    navigationBarTitleText: '活动'
  }

  render() {
    let {url} = this.state
    return (
      <WebView src={url}></WebView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(index)