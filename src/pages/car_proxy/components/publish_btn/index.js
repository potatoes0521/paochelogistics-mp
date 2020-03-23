/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-23 09:44:38
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-23 09:56:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
import PublishBtnImg from '@img/car_proxy/publish.png'
import './index.styl'

export default class PublishBtn extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }
  publishBtnOnClick() { 
    Taro.navigateTo({
      url: '/pages/car_proxy_publish/index'
    })
  }
  render() {
    return (
      <View className='car-proxy-publish-btn' onClick={this.publishBtnOnClick}>
        <Image className='image' src={PublishBtnImg}></Image>
      </View>
    )
  }

}