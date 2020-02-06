/*
 * @Author: liuYang
 * @description: 提交/查看驿站人员提交的运力信息
 * @path: 引入路径
 * @Date: 2020-02-05 17:16:19
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-06 14:45:39
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
// eslint-disable-next-line import/first
import api from '@api/index.js'
import { handleMoney } from '@utils/patter.js'
import Storage from '@utils/storage.js'
import '../../assets/icon_font/icon.scss'
import './index.styl'

class OrderTransport extends Component{
  constructor(props) {
    super(props)
    this.state = {
      transferRealName: '',
      transferMobile: '',
      transferPrice: '',
      transferUserId: '', // 接单运力id
      pageParams: {}
    }
  }
  componentDidMount() { 
    this.setState({
      pageParams: this.$router.params,
    }, () => {
        this.handleData()
    })
  }
  handleData() { 
    Storage.getStorage(`order_transport_${this.pageParams.order_code}`).then(res => {
      if (res) {
        this.setState(res)
      }
    })
  }
  /**
   * 去选择司机
   * @return void
   */
  chooseDriver() { 
    if (this.state.pageParams.type === 'see') return
    Taro.navigateTo({
      url: '/pages/transport_info/index?pageType=choose'
    })
  }
  /**
   * 运力接单价格
   * @param {Object} e event对象
   * @return void
   */
  transportPrice(e) {
    let {
      value
    } = e.detail
    value = handleMoney(value)
    this.setState({
      transferPrice: value
    })
  }
  /**
   * 确认司机信息
   * @return void
   */
  chooseTransportSubmit() { 
    let {
      transferPrice,
      transferRealName, // 运力名称
      transferUserId, // 接单运力id
      transferMobile, // 接单运力手机号
      orderCode,
      orderId,
    } = this.state
    if (!transferRealName) {
      Taro.showToast({
        title: '请补全司机信息',
        icon: 'none'
      })
      return
    }
    if (!transferPrice) {
      Taro.showToast({
        title: '请补全价格信息',
        icon: 'none'
      })
      return
    }
    let sendData = {
      transferPrice,
      transferRealName, // 运力名称
      transferUserId, // 接单运力id
      transferMobile, // 接单运力手机号
      orderCode,
      orderId
    }
    api.order.placeOrder(sendData, this)
      .then(() => {
        Taro.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(() => {
          Taro.navigateBack()
        }, 1800)
      })
  }
  //页面内的配置
  config = {
    navigationBarTitleText: '运力信息'
  }
  render() {
    let {
      transferRealName,
      transferMobile,
      transferPrice,
      pageParams
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='driver-wrapper'>
          <View className='driver-item' onClick={this.chooseDriver}>
            <View className='driver-title'>运力名称</View>
            <View className='driver-info'>
              <View className='driver-name'>{transferRealName || '请选择司机信息'}</View>
              {
                pageParams.type !== 'see' ?
                  <View className='select-icon iconfont iconxiangyouxuanzejiantoux'></View>
                  : 
                  <View className='select-icon'></View>
              }
            </View>
          </View>
          <View className='driver-item'>
            <View className='driver-title'>联系方式</View>
            <View className='driver-info'>
              <View className='driver-name'>{transferMobile || ''}</View>
              <View className='select-icon'></View>
            </View>
          </View>
          <View className='driver-item'>
            <View className='driver-title'>此单价格</View>
            <View className='driver-info'>
              {
                pageParams.type !== 'see' ?
                  <Input
                    type='digit'
                    className='details-from-input'
                    placeholder='请填写运力接单价格'
                    onInput={this.transportPrice}
                    placeholderClass='placeholder-style'
                    maxLength='10'
                    value={transferPrice}
                  ></Input> : <Text>{transferPrice}</Text>
              }
            </View>
          </View>
        </View>
        {
          pageParams.type !== 'see' ?
            <View className='confirm-btn' onClick={this.chooseTransportSubmit}>确认</View>
            : null
        }
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(OrderTransport)