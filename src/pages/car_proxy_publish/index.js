/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-23 17:35:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Textarea
}
from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import CallService from './components/call_service/index.js'
// import api from '@api/index.js'

import './index.styl'

class CarProxyPublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      mobile: '',
      locationName: '',
      remark: '',
      mailingAddress: '', // 回寄详细地址
      carProxyBusinessList: [
        {
            "id": 1,
            "proxyItemCode": "TD",
            "proxyItemName": "提档",
            "proxyItemPrice": 10000,
            "proxyItemSourcePlatform": 1,
            "createTime": "2020-03-11T02:25:35.000+0000",
            "updateTime": "2020-03-11T02:25:35.000+0000",
            "isActive": 1
        },
        {
            "id": 2,
            "proxyItemCode": "SP",
            "proxyItemName": "上牌",
            "proxyItemPrice": 20000,
            "proxyItemSourcePlatform": 1,
            "createTime": "2020-03-11T02:25:35.000+0000",
            "updateTime": "2020-03-11T02:25:35.000+0000",
            "isActive": 1
        },
        {
            "id": 3,
            "proxyItemCode": "GH",
            "proxyItemName": "过户",
            "proxyItemPrice": 30000,
            "proxyItemSourcePlatform": 1,
            "createTime": "2020-03-11T02:25:35.000+0000",
            "updateTime": "2020-03-11T02:25:35.000+0000",
            "isActive": 1
        },
        {
            "id": 4,
            "proxyItemCode": "DY",
            "proxyItemName": "代办抵押",
            "proxyItemPrice": 40000,
            "proxyItemSourcePlatform": 1,
            "createTime": "2020-03-11T02:25:35.000+0000",
            "updateTime": "2020-03-11T02:25:35.000+0000",
            "isActive": 1
        },
        {
            "id": 5,
            "proxyItemCode": "JY",
            "proxyItemName": "代办解压",
            "proxyItemPrice": 50000,
            "proxyItemSourcePlatform": 1,
            "createTime": "2020-03-11T02:25:35.000+0000",
            "updateTime": "2020-03-11T02:25:35.000+0000",
            "isActive": 1
        }
    ]
    }
  }

  componentDidMount() {
  }
  onUsernameInput(e) {
    let { value } = e.target
    this.setState({
      username: value
    })
  }
  onMobileInput(e) { 
    let { value } = e.target
    this.setState({
      mobile: value
    })
  }
  onLocationNameInput(e) { 
    let { value } = e.target
    this.setState({
      locationName: value
    })
  }
  onRemarkInput(e) { 
    let { value } = e.target
    this.setState({
      remark: value
    })
  }
  config = {
    navigationBarTitleText: '车务代办' 
  }

  render() {
    let {
      username,
      mobile,
      locationName,
      remark,
      mailingAddress,
      carProxyBusinessList,
    } = this.state
    const carProxyBusinessListRender = carProxyBusinessList.map(item => {
      const key = item.id
      const checkboxClassName = classNames('public-checkbox', {
        'checked iconfont iconduigoux': item.checked
      })
      return (
        <View className='public-item' key={key}>
          <View className='public-label'>{item.proxyItemName}</View>
          <View className='public-content'>
            {
              item.proxyItemPrice ? <View className='public-price'>¥ {item.proxyItemPrice / 100}</View> : <View className='public-no-check-text'>选择办理区域后显示该业务价格</View >
            }
            <View className={checkboxClassName}></View>
          </View>
        </View>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <View className='main-wrapper'>
            <View className='public-wrapper'>
              <View className='public-item'>
                <View className='public-label'>姓名</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请填写姓名'
                    value={username}
                    onInput={this.onUsernameInput}
                  ></Input>
                </View>
              </View>
              <View className='public-item'>
                <View className='public-label'>手机号</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请填写手机号'
                    value={mobile}
                    onInput={this.onMobileInput}
                  ></Input>
                </View>
              </View>
              <View className='public-item'>
                <View className='public-label'>办理城市</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请填写手机号'
                    value={locationName}
                    onInput={this.onLocationNameInput}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='public-wrapper'>
              {
                carProxyBusinessListRender
              }
              <View className='public-item'>
                <View className='public-label'>备注</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请输入车务相关备注信息'
                    value={remark}
                    onInput={this.onRemarkInput}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='return-address-wrapper'>
              <View className='public-item'>
                <View className='important'>*</View>
                <View className='public-label lang-label'>材料回寄信息</View>
                <View className='public-content'>
                  <Text className='public-no-check-text'>请选择省-市-区/县</Text>
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </View>
              </View>
              <View className='textarea-wrapper'>
                {
                  mailingAddress.length < 1 && (
                    <View className='lick-placeholder-wrapper'>
                      <View className='placeholder-class'>请输入姓名、联系方式及详细地址</View>
                      <View className='placeholder-class'>例如：张三 18545678765 北京市海淀区定慧北里23号蓝宏中心</View>
                    </View>
                  )
                }
                <Textarea
                  className='textarea'
                  // auto-height
                ></Textarea>
              </View>
            </View>
            <View className='bottom-tips'>注：请准确填写以上信息，以便我们更好的为您安排业务！</View>
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='total'>合计:¥1000</View>
          <View className='order-btn'>立即下单(0)</View>
        </View>
        <CallService />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(CarProxyPublish)