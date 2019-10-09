/*
 * @Author: guorui
 * @description: 询价单内容
 * @Date: 2019-09-23 14:51:02
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 10:04:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import '@c/all_order_pages/order_card/index.styl'
import api from '@api/modules/offer.js'
import NoTitleCard from '@c/no_title_card/index.js'
import './index.styl'

export default class OfferInfoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inquiry_id: '',  //询价单id
      // parent_id: '', //父id 基于该询价单id做的再次询价
      status: 10,  //询价单状态  10 未报价  20 已报价  30 已失效  40 已取消
      price: '', //价格
      dueTime: '', //有效期
      send_time: '', //发车时间
      send_city_id: '', //发车城市
      receive_city_id: '', //收车城市
      home_delivery: 0, //送车上门 0否 1是
      store_pickup: 0, //上门提车 0否 1是
      car_info: '', //车辆信息
      car_amount: '', //车辆台数
      create_time: '', //创建时间---询价时间
      quotedTime: '', //报价时间
      isActive: 1 //有效状态 0无效 1有效 2删除
    }
    this.pageParams = {}
  }

  componentDidShow() {
    this.pageParams = this.$router.params || {}
    this.getOfferDetails()
  }
  
  /**
   * @description: 获取询价单详情
   * @param {type} 
   * @return: 
   */
  getOfferDetails() {
    if (!this.pageParams.offerId) {
      Taro.navigateBack()
      return;
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      id: this.pageParams.offerId
    }
    api.getOfferDetails(sendData, this)
      .then(res => {
        this.setState({
          inquiry_id: res.inquiry_id,
          // parent_id: res.parent_id,
          status: res.statusDesc,
          price: res.returnPrice,
          dueTime: res.dueTime,
          send_time: res.send_time,
          send_city_id: res.send_city_id,
          receive_city_id: res.receive_city_id,
          home_delivery: res.home_delivery,
          store_pickup: res.store_pickup,
          car_info: res.car_info,
          car_amount: res.car_amount,
          create_time: res.create_time,
          quotedTime: res.quotedTime,
          isActive: res.isActive
        })
        Taro.hideLoading()
      })
  }

  /**
   * @description: 询价单新增
   * @param {type} 
   * @return: 
   */
  submitOfferOrder() {
    let sendData = {
      id: this.state.inquiry_id
    }
    api.addOfferOrder(sendData, this)
      .then(() => {
        Taro.navigateTo({
          url: 'pages/offer/index'
        })
      })
  }

  /**
   * @description: 询价单取消询价
   * @param {type} 
   * @return: 
   */
  cancelOffer() {
    if (this.state.isActive !== 1) {
      return
    }
    Taro.showLoading({
      title: '请求中...',
      mask: true
    })
    let sendData = {
      id: this.state.inquiry_id
    }
    api.cancelOffer(sendData, this)
      .then(() => {
        Taro.showToast({
          title: '取消询价成功',
          icon: 'none'
        })
      })
  }

  /**
   * @description: 询价单催报价
   * @param {type} 
   * @return: 
   */
  promptOffer() {
    if (this.state.isActive !== 1) {
      return
    }
    Taro.showLoading({
      title: '请求中...',
      mask: true
    })
    let sendData = {
      id: this.state.inquiry_id
    }
    api.getPromptOffer(sendData, this)
      .then(() => {
        Taro.showToast({
          title: '催报价成功',
          icon: 'none'
        })
      })
  }
  
  render() {
    let {
      isActive,
      price,
      dueTime,
      send_time,
      send_city_id,
      receive_city_id,
      home_delivery,
      store_pickup,
      car_info,
      car_amount,
      create_time,
      quotedTime,
      status
    } = this.state
    const cancelOfferClassName = classNames({
      'offer-details-wrapper': true,
      'disabled-text': isActive !== 1
    })
    return (
      <View className='info-wrapper'>
        <NoTitleCard>
          <View className={cancelOfferClassName}>
            <View className='details-form-item'>
              <View className='details-form-label'>报价状态:</View>
              {
                (status !== 10) ?
                  <View className='details-form-content font-color'>￥{price}</View>
                  :
                  <View className='details-form-content no-offer'>{price}</View>
              }
            </View>
            {
              (status !== 10) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价有效期至:</View>
                  <View className='details-form-content font-color'>{dueTime}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>预计发车时间:</View>
              <View className='details-form-content'>{send_time}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>发车城市:</View>
              <View className='details-form-content'>{send_city_id}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>收车城市:</View>
              <View className='details-form-content'>{receive_city_id}</View>
            </View>
            {
              (home_delivery !== 0 || store_pickup !== 0) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>服务:</View>
                  <View className='details-form-content'>{home_delivery && store_pickup}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>车辆信息:</View>
              <View className='details-form-content'>{car_info}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>台数:</View>
              <View className='details-form-content'>{car_amount}辆</View>
            </View>
            {
              (status !== 10) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价时间:</View>
                  <View className='details-form-content'>{create_time}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>询价时间:</View>
              <View className='details-form-content'>{quotedTime}</View>
            </View>
          </View>
        </NoTitleCard>
        <View>
          {
            (status !== 10) ?
              <View className='place-order' onClick={this.submitOfferOrder}>立即下单</View>
              :
              <View className='offer-button'>
                <View className='cancel-offer' onClick={this.cancelOffer}>取消询价</View>
                <View className='prompt-quotation' onClick={this.promptOffer}>催报价</View>
              </View>
          }
        </View>
      </View>
    )
  }
}