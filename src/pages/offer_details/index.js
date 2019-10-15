/*
 * @Author: guorui
 * @description: 询价单详情
 * @Date: 2019-09-23 14:33:39
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-15 10:14:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import classNames from 'classnames'
import '../order_details/components/send_city/index.styl'
// eslint-disable-next-line import/first
import Storage from '@utils/storage.js'
// eslint-disable-next-line import/first
import api from '@api/index.js'
import './index.styl'
import '../../assets/icon_font/icon.scss'

class OfferDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inquiryId: 0, //询价单id
      parentId: '', //父id 基于该询价单id做的再次询价
      status: 10, //询价单状态  10 未报价  20 已报价  30 已失效  40 已取消
      statusDesc: '', //未报价
      quotedPriceDesc: 0, //报价价格
      dueTimeDesc: '', //有效期
      sendTimeDesc: '', //发车时间
      sendCityId: 0, //发车城市
      sendCityName: '', //发车城市名称
      sendAddress: '', //发车城市详细地址
      receiveCityId: 0, //收车城市
      receiveCityName: '', //收车城市名称
      receiveAddress: '', //收车城市详细地址
      homeDelivery: 1, //送车上门 0否 1是
      storePickup: 1, //上门提车 0否 1是
      carInfo: '', //车辆信息
      carAmount: 1, //车辆台数
      inquiryTimeDesc: '', //询价时间
      quotedTimeDesc: '', //报价时间
      usedType: 1, //车辆类型  1新车  2二手车
      isActive: 1 //有效状态 0无效 1有效 2删除
    }
    this.pageParams = {}
  }
  
  componentDidShow() {
    this.pageParams = this.$router.params || {}
    this.getOfferDetails()
  }
  
  
  //页面内的配置
  config = {
    navigationBarTitleText: '询价单详情'
  } 

  /**
   * @description: 获取询价单详情
   * @param {type} 
   * @return: 
   */
  getOfferDetails() {
    if (!this.pageParams.offer_id) {
      Taro.navigateBack()
      return;
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      inquiryId: this.pageParams.offer_id
    }
    api.offer.getOfferDetails(sendData, this)
      .then(res => {
        Taro.hideLoading()
        this.setState({
          inquiryId: res.inquiryId,
          parentId: res.parentId,
          statusDesc: res.statusDesc,
          status: res.status,
          quotedPriceDesc: res.quotedPriceDesc,
          dueTimeDesc: res.dueTimeDesc,
          sendTimeDesc: res.sendTimeDesc,
          sendCityId: res.sendCityId,
          sendCityName: res.sendCityName,
          sendAddress: res.sendAddress,
          receiveCityId: res.receiveCityId,
          receiveCityName: res.receiveCityName,
          receiveAddress: res.receiveAddress,
          homeDelivery: res.homeDelivery,
          storePickup: res.storePickup,
          carInfo: res.carInfo,
          carAmount: res.carAmount,
          inquiryTimeDesc: res.inquiryTimeDesc,
          quotedTimeDesc: res.quotedTimeDesc,
          usedType: res.usedType,
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
      inquiryId: this.state.inquiryId,
      parentId: this.state.parentId,
      statusDesc: this.state.statusDesc,
      status: this.state.status,
      quotedPriceDesc: this.state.quotedPriceDesc,
      dueTimeDesc: this.state.dueTimeDesc,
      sendTimeDesc: this.state.sendTimeDesc,
      sendCityId: this.state.sendCityId,
      sendCityName: this.state.sendCityName,
      sendAddress: this.state.sendAddress,
      receiveCityId: this.state.receiveCityId,
      receiveCityName: this.state.receiveCityName,
      receiveAddress: this.state.receiveAddress,
      homeDelivery: this.state.homeDelivery,
      storePickup: this.state.storePickup,
      carInfo: this.state.carInfo,
      carAmount: this.state.carAmount,
      inquiryTimeDesc: this.state.inquiryTimeDesc,
      quotedTimeDesc: this.state.quotedTimeDesc,
      usedType: this.state.usedType,
    }
    Storage.setStorage('offer_info', sendData)
    api.offer.submitOffer({}, this)
      .then(() => {
        Taro.reLaunch({
          url: '/pages/place_order/index'
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
      inquiryId: this.state.inquiryId
    }
    api.offer.cancelOffer(sendData, this)
      .then(() => {
        Taro.hideLoading()
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
      inquiryId: this.state.inquiryId
    }
    api.offer.getPromptOffer(sendData, this)
      .then(() => {
        Taro.hideLoading()
        Taro.showToast({
          title: '催报价成功',
          icon: 'none'
        })
      })
  }

  /**
   * @description: 询价单再次询价
   * @param {type} 
   * @return: 
   */
  reinquiryOrder() {
    if (this.state.isActive !== 1) {
      return
    }
    Taro.showLoading({
      title: '请求中...',
      mask: true
    })
    let sendData = {
      inquiryId: this.state.inquiryId
    }
    api.offer.getReinquiryOrder(sendData, this)
      .then(() => {
        Taro.hideLoading()
        Taro.showToast({
          title: '再次询价成功',
          icon: 'none'
        })
      })
  }

  render() {
    let {
      quotedPriceDesc,
      dueTimeDesc,
      sendTimeDesc,
      sendCityName,
      receiveCityName,
      homeDelivery,
      storePickup,
      carInfo,
      carAmount,
      inquiryTimeDesc,
      quotedTimeDesc,
      status,
      statusDesc
    } = this.state
    const cancelOfferClassName = classNames({
      'disabled-text': status === 30 || status === 40
    })
    return (
      <View className='page-wrapper'>
        <NoTitleCard>
          <View className={cancelOfferClassName}>
            {
              (status === 30) ?
                <View className='iconfont iconxunjiayishixiao icon-invalid-style'></View>
                : null
            }
            {
              (status === 40) ?
                <View className='iconfont iconxunjiayiquxiao icon-invalid-style'></View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>报价状态:</View>
              {
                (quotedPriceDesc) ?
                  <View className='details-form-content font-color'>￥{quotedPriceDesc || ''}</View>
                  :
                  <View className='details-form-content no-offer'>{statusDesc}</View>
              }
            </View>
            {
              (dueTimeDesc) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价有效期至:</View>
                  <View className='details-form-content font-color'>{dueTimeDesc || ''}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>预计发车时间:</View>
              <View className='details-form-content'>{sendTimeDesc || ''}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>发车城市:</View>
              <View className='details-form-content'>{sendCityName || ''}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>收车城市:</View>
              <View className='details-form-content'>{receiveCityName || ''}</View>
            </View>
            {
              (homeDelivery !== 0 || storePickup !== 0) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>服务:</View>
                  <View className='details-form-content'>
                    {
                      storePickup !== 0 ? '上门提车' : ''
                    }
                    {
                      storePickup !== 0 && homeDelivery !== 0 ? '，' : ''
                    }
                    {
                      homeDelivery !== 0 ? '上门送车' : ''
                    }
                  </View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>车辆信息:</View>
              <View className='details-form-content'>{carInfo || ''}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>台数:</View>
              <View className='details-form-content'>{carAmount || ''}辆</View>
            </View>
            {
              (quotedTimeDesc && status !== 30) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价时间:</View>
                  <View className='details-form-content'>{quotedTimeDesc || ''}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>询价时间:</View>
              <View className='details-form-content'>{inquiryTimeDesc || ''}</View>
            </View>
          </View>
        </NoTitleCard>
        {
          (status !== 40) ?
            <View>
              {
                (status === 10) ?
                  <View className='offer-button'>
                    <View className='cancel-offer' onClick={this.cancelOffer}>取消询价</View>
                    <View className='prompt-quotation' onClick={this.promptOffer}>催报价</View>
                  </View>
                  : null
              }
              {
                (status === 20) ?
                  <View className='place-order' onClick={this.submitOfferOrder}>立即下单</View>
                  : null
              }
              {
                (status === 30) ?
                  <View className='place-order' onClick={this.reinquiryOrder}>再次询价</View>
                  : null
              }
            </View>
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
export default connect(mapStateToProps)(OfferDetails)