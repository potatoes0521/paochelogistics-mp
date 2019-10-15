/*
 * @Author: guorui
 * @description: 支付成功
 * @Date: 2019-10-15 11:14:50
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-15 11:31:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import '../../assets/icon_font/icon.scss'
import './index.styl'

export default class PaySuccessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '支付详情'
  }

  render() {
    return (
      <View className='page-wrapper'>
        <NoTitleCard>
          <View className='pay-content-style'>
            <View className='iconfont iconzhifuchenggong icon-success-style'></View>
            <View className='pay-success-style'>支付成功</View>
            <View className='pay-notice'>您已向跑车科技支付运费2100.79元，我们会尽快将您的货物送达！</View>
          </View>
        </NoTitleCard>
      </View>
    )
  }
}
// const mapStateToProps = (state) => {
//   return {
//     userInfo: state.user_msg.userInfo
//   }
// }
// export default connect(mapStateToProps)(PaySuccessDetails)