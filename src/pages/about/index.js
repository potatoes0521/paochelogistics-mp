/*
 * @Author: liuYang
 * @description: 关于跑车帮
 * @Date: 2019-09-24 16:58:58
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-19 10:53:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, {
  Component
} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { appVersion } from '@api/request_handle.js'
import './index.styl'

export default class About extends Component { 
  config = {
    navigationBarTitleText: '关于跑车物流'
  }
  
  /**
   * 呼叫客服
   * @return void
   */
  callService() {
    Taro.makePhoneCall({
      phoneNumber: '400-9698-256'
    })
  }

  render() {
    return (
      <View className='about-wrapper'>
        <View className='list-item'>
          <View>版本：</View>
          <View>{appVersion}</View>
        </View>
        <View className='list-item' onClick={()=>this.callService()}>
          <View>联系跑车</View>
          <View>400-9698-256</View>
        </View>
      </View>
    )
  }
}