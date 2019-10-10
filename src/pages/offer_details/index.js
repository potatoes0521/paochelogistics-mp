/*
 * @Author: guorui
 * @description: 询价单详情
 * @Date: 2019-09-23 14:33:39
 * @LastEditors: guorui
 * @LastEditTime: 2019-10-09 17:06:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import classNames from 'classnames'
import '@c/all_order_pages/send_city/index.styl'
import Storage from '@utils/storage.js'
import api from '@api/index.js'
import './index.styl'

class OfferDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inquiryId: 0, //询价单id
      // parentId: '', //父id 基于该询价单id做的再次询价
      status: 10, //询价单状态  10 未报价  20 已报价  30 已失效  40 已取消
      statusDesc: '', //未报价
      price: 0, //价格
      dueTime: '', //有效期
      sendTime: '', //发车时间
      sendCityId: 0, //发车城市
      sendCityName: '', //发车城市名称
      receiveCityId: 0, //收车城市
      receiveCityName: '', //收车城市名称
      homeDelivery: 1, //送车上门 0否 1是
      storePickup: 1, //上门提车 0否 1是
      carInfo: '', //车辆信息
      carAmount: 1, //车辆台数
      createTime: '', //创建时间---询价时间
      quotedTime: '', //报价时间
      isActive: 1 //有效状态 0无效 1有效 2删除
    }
    this.pageParams = {}
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '询价单详情'
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
        this.setState({
          inquiryId: res.inquiryId,
          // parentId: res.parentId,
          statusDesc: res.statusDesc,
          status: res.status,
          price: res.returnPrice,
          dueTime: res.dueTime,
          sendTime: res.sendTime,
          sendCityId: res.sendCityId,
          sendCityName: res.sendCityName,
          receiveCityId: res.receiveCityId,
          receiveCityName: res.receiveCityName,
          homeDelivery: res.homeDelivery,
          storePickup: res.storePickup,
          carInfo: res.carInfo,
          carAmount: res.carAmount,
          createTime: res.createTime,
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
      inquiryId: this.state.inquiryId
    }
    api.offer.submitOffer(sendData, this)
      .then(() => {
        Taro.navigateTo({
          url: 'pages/place_order/index'
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
        Taro.showToast({
          title: '再次询价成功',
          icon: 'none'
        })
      })
  }

  render() {
    let {
      price,
      dueTime,
      sendTime,
      sendCityId,
      sendCityName,
      receiveCityId,
      receiveCityName,
      homeDelivery,
      storePickup,
      carInfo,
      carAmount,
      createTime,
      quotedTime,
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
            <View className='details-form-item'>
              <View className='details-form-label'>报价状态:</View>
              {
                (price !== 0) ?
                  <View className='details-form-content font-color'>￥{price}</View>
                  :
                  <View className='details-form-content no-offer'>{statusDesc}</View>
              }
            </View>
            {
              (dueTime) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价有效期至:</View>
                  <View className='details-form-content font-color'>{dueTime.split('T')[0]}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>预计发车时间:</View>
              <View className='details-form-content'>{sendTime.split('T')[0]}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>发车城市:</View>
              <View className='details-form-content'>{sendCityId !== 0 ? sendCityName : ''}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>收车城市:</View>
              <View className='details-form-content'>{receiveCityId !== 0 ? receiveCityName : ''}</View>
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
              <View className='details-form-content'>{carInfo}</View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>台数:</View>
              <View className='details-form-content'>{carAmount}辆</View>
            </View>
            {
              (quotedTime && status !== 30) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价时间:</View>
                  <View className='details-form-content'>{quotedTime.split('T')[0]}</View>
                </View>
                : null
            }
            <View className='details-form-item'>
              <View className='details-form-label'>询价时间:</View>
              <View className='details-form-content'>{createTime.split('T')[0]}</View>
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