/*
 * @Author: liuYang
 * @description: 客户信息列表
 * @Date: 2019-09-27 15:38:07
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-29 14:17:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.styl'

class MineInfo extends Component { 
  config = {
    navigationBarTitleText: '客户信息列表'
  }
  render() { 
    return (
      <View className='page-wrapper'>
        <View className='search-wrapper'>
          <View className='search-main'>
            <View className='iconfont iconsousuo icon-search-style'></View>
            <View className='input'>
              <Input
                placeholder='输入姓名/联系方式/经销商名称进行搜索'
                placeholderClass='search-placeholder'
                className='search-input'
              ></Input>
            </View>
          </View>
        </View>
        <View className='customer-num'>
          共<Text className='number'>5</Text>个客户
        </View>
        <View className='customer-wrapper'>
          <View className='customer-list'>
            <View className='customer-item'>
              <View className='customer-left'>
                <View className='customer-msg'>
                  <View className='name'>李奇</View>
                  <View className='phone'>15817899872</View>
                </View>
                <View className='customer-company'>上海瑞博祥云汽车服务祥云汽车服务</View>
              </View>
              <View className='customer-right'>
                <View className='iconfont iconxiangyouxuanzejiantoux icon-right-style'></View>
              </View>
            </View>
          </View>
        </View>
        <View className='add-customer'>
          <View className='iconfont icontianjiakehu icon-add-style'></View>
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
export default connect(mapStateToProps)(MineInfo)