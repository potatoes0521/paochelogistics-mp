/*
 * @Author: liuYang
 * @description: 我的
 * @Date: 2019-09-20 13:24:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 17:08:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  OpenData
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { showModalAndRegister } from '@utils/common.js'
import defaultImage from '@img/register/default_icon.png'
import aboutImage from "@img/mine/about.png";
import userImage from "@img/mine/user.png";
import idCardImage from "@img/mine/id_card.png";
import './index.styl'

class Mine extends Component { 

  constructor(props) {
    super(props)
  }
  /**
   * 跳转到指定页面
   * @param {String} pageName 参数描述
   * @return void
   */
  navigatorPage(pageName = 'about') {
    if (!pageName) return
    let { userInfo } = this.props
    if (!userInfo.userId) {
      showModalAndRegister()
      return
    }
    Taro.navigateTo({
      url: `/pages/${pageName}/index`
    })
  }
  /**
   * 进入注册界面
   * @param {Object} e event对象
   * @return void
   */
  navigatorRegister(e) {
    e.stopPropagation()
    showModalAndRegister()
  }

  config = {
    navigationBarTitleText: '我的'    
  }

  render() {
    let {userInfo} = this.props
    return (
      <View className='page-wrapper'>
        <View className='user-msg-wrapper'>
          <View className='user-icon'>
            {/* <AtAvatar circle size='small' openData={{ type: 'userAvatarUrl' }}></AtAvatar> */}
            {
              userInfo.userId ? 
                <OpenData className='user-icon-img' type='userAvatarUrl'></OpenData>
                :
                <image src={defaultImage} className='default-icon'></image>
            }
          </View>
          {
            userInfo.userId ? 
              <OpenData lang='zh_CN' className='nick-name' type='userNickName'></OpenData>
              :
              <View className='nick-name no-login'>注册/登录</View>
          }
        </View>
        <View className='user-list'>
          <View className='list-item' onClick={()=>this.navigatorPage('customer_info')}>
            <View className='list-left'>
              <View className='icon-img'>
                <image src={userImage}></image>
              </View>
              <View className='item-name'>客户信息</View>
            </View>
            <View className='list-right iconfont iconxiangyouxuanzejiantoux'></View>
          </View>
          <View className='list-item' onClick={()=>this.navigatorPage('mine_info')}>
            <View className='list-left'>
              <View className='icon-img'>
                <image src={idCardImage}></image>
              </View>
              <View className='item-name'>个人名片</View>
            </View>
            <View className='list-right iconfont iconxiangyouxuanzejiantoux'></View>
          </View>
          <View className='list-item' onClick={()=>this.navigatorPage('about')}>
            <View className='list-left'>
              <View className='icon-img'>
                <image src={aboutImage}></image>
              </View>
              <View className='item-name'>关于跑车物流</View>
            </View>
            <View className='list-right iconfont iconxiangyouxuanzejiantoux'></View>
          </View>
        </View>
        {
          (this.props.userInfo.userId) ?
            null :
            <View className='handleRegister' onClick={this.navigatorRegister}></View>
        }
        {/* <AtButton type='primary' onClick={() => this.handleChangeUserInfo('data')}>修改用户信息</AtButton> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Mine)
