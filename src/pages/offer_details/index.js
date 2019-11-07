/*
 * @Author: guorui
 * @description: 询价单详情
 * @Date: 2019-09-23 14:33:39
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-07 14:37:41
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
      orderId: 0, //订单id
      status: 10, //询价单状态  10 未报价  20 已报价  30 已失效  40 已取消
      statusDesc: '', //未报价
      quotedPriceDesc: 0, //报价价格
      dueTimeDesc: '', //有效期
      sendTimeDesc: '', //发车时间
      sendCityName: '', //发车城市名称
      receiveCityName: '', //收车城市名称
      homeDelivery: 1, //送车上门 0否 1是
      storePickup: 1, //上门提车 0否 1是
      carInfo: '', //车辆信息
      carAmount: 1, //车辆台数
      inquiryTimeDesc: '', //询价时间
      quotedTimeDesc: '', //报价时间
      usedType: 1, //车辆类型  1新车  2二手车
      isActive: 1, //有效状态 0无效 1有效 2删除
      buttons: [] //询价单详情页面的按钮列表
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
          statusDesc: res.statusDesc,
          status: res.status,
          quotedPriceDesc: res.quotedPriceDesc,
          dueTimeDesc: res.dueTimeDesc,
          sendTimeDesc: res.sendTimeDesc,
          sendCityName: res.sendCityName,
          receiveCityName: res.receiveCityName,
          homeDelivery: res.homeDelivery,
          storePickup: res.storePickup,
          carInfo: res.carInfo,
          carAmount: res.carAmount,
          inquiryTimeDesc: res.inquiryTimeDesc,
          quotedTimeDesc: res.quotedTimeDesc,
          usedType: res.usedType,
          isActive: res.isActive,
          buttons: res.buttons,
          orderId: res.orderId
        })
        Storage.setStorage('offer_info', res)
      })
  }

  /**
   * @description: 立即下单
   * @param {type} 
   * @return:  
   */
  submitOfferOrder() {
    Taro.navigateTo({
      url: `/pages/place_order/index?offer_id=${this.pageParams.offer_id}`
    })
  }

  /**
   * 询价单取消询价
   * @return void
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
        setTimeout(() => {
          this.getOfferDetails()
        }, 1800)
      })
  }

  /**
   * 询价单催报价
   * @return void
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
        setTimeout(() => {
          this.getOfferDetails()
        },1800)
      })
  }

  /**
   * 询价单再次询价
   * @return void
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
        setTimeout(() => {
          Taro.navigateBack()
        }, 2000)
      })
  }
  /**
   * 查看订单
   * @return void
   */
  viewOrder() {
    Taro.navigateTo({
      url: `/pages/order_details/index?order_id=${this.state.orderId}`
    })
  }

  buttonsFun(e) {
    switch (e) {
      case 'cancelInquiry':
        this.cancelOffer()
        break;
      case 'urgeInquiry':
        this.promptOffer()
        break;
      case 'submitOrder':
        this.submitOfferOrder()
        break;
      case 'againInquiry':
        this.reinquiryOrder()
        break;
      case 'viewOrder':
        this.viewOrder()
        break;
      default:
        return
    }
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
      statusDesc,
      usedType,
      buttons
    } = this.state
    const cancelOfferClassName = classNames({
      'disabled-text': status === 30 || status === 40
    })
    const buttonsList = buttons.map((item) => (
      <View className={item.key} key={item} onClick={() => this.buttonsFun(item.key)}>{item.name}</View>
    ))
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
            {/* 10 未报价 20 已报价 */}
            <View className='details-form-item'>
              <View className='details-form-label'>报价状态:</View>
              {
                status === 10 ? 
                  <View className='details-form-content no-offer'>{statusDesc || ''}</View>
                  : null
              }
              {
                status === 20 ? 
                  <View className='details-form-content font-color'>{statusDesc || ''}</View>
                  : null
              }
            </View>
            {
              (quotedPriceDesc) ?
                <View className='details-form-item'>
                  <View className='details-form-label'>报价金额:</View>
                  <View className='details-form-content font-color'>￥{quotedPriceDesc || ''} /台</View>
                </View>
                : null
            }
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
              <View className='details-form-label'>车辆类型:</View>
              <View className='details-form-content'>
                {
                  usedType === 1 ? '新车' : '二手车'
                }
              </View>
            </View>
            <View className='details-form-item'>
              <View className='details-form-label'>台数:</View>
              <View className='details-form-content'>{carAmount || ''}台</View>
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
        <View className='buttons-style'>
          {
            buttonsList
          }
        </View>
        {/* {
          (status !== 40) ?
            <View>
              {
                (buttons && buttons.includes('cancel-inquiry')) || (buttons && buttons.includes('urge-inquiry')) ?
                  <View className='offer-button'>
                    {
                      buttons && buttons.includes('cancel-inquiry') ?
                        <View className='cancel-offer' onClick={this.cancelOffer}>取消询价</View>
                        : null
                    }
                    {
                      buttons && buttons.includes('urge-inquiry') ?
                        <View className='prompt-quotation' onClick={this.promptOffer}>催报价</View>
                        : null
                    }
                  </View>
                  : null
              }
              {
                buttons && buttons.includes('submit-order') ?
                  <View className='place-order' onClick={this.submitOfferOrder}>立即下单</View>
                  : null
              }
              {
                buttons && buttons.includes('again-inquiry') ?
                  <View className='place-order' onClick={this.reinquiryOrder}>再次询价</View>
                  : null
              }
              {
                buttons && buttons.includes('view-order') ?
                  <View className='place-order' onClick={this.viewOrder}>查看订单</View>
                  : null
              }
            </View>
            : null 
        } */}
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