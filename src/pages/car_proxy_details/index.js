/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-30 17:58:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Block,
  Input
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
// import { defaultResourceImgURL } from '@config/request_config.js'
import login from '@utils/login.js'

import './index.styl'

class CarProxyDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      proxyOrderCode: '',
      userName: '',
      mobile: '',
      locationName: '',
      remark: '',
      proxyOrderStatus: '',
      proxyOrderStatusDesc: '',
      totalPriceDesc: 10000,
      payPriceDesc: '',
      createTimeDesc: '',
      payTimeDesc: '',
      carProxyOrderItemRelationVoList: [],
      customerMailingData: {},
      businessMailingData: {},
      expressNum: '',
      buttons: [],
      open: false
    }
    this.pageParams = {}
    this.timer = null
  }

  
  componentWillMount() { 
    clearTimeout(this.timer)
  }
  async componentDidShow() {
    this.pageParams = this.$router.params
    console.log('参数', this.pageParams)
    if (this.pageParams.share_type) {
      let { userInfo } = this.props
      if (userInfo && !userInfo.userId) {
        await login.getOpenId(this)
        console.log('userInfo', userInfo)
      } 
      this.getCarProxyDetails()
    }
  }
  getCarProxyDetails() { 
    let sendData = {
      carProxyOrderId: this.pageParams.id,
      businessType: 1
    }
    api.carProxy.getCarProxyDetails(sendData, this).then(res => {
      let data = res
      data.customerMailingData = res.carProxyMailingAddressList.filter(item => item.mailingType === 1)[0] || []
      data.businessMailingData = res.carProxyMailingAddressList.filter(item => item.mailingType === 2)[0] || []
      console.log('data', data)
      this.setState(data)
    })
  }
  clickOpenBtn() { 
    this.setState({
      open: !this.state.open
    })
  }
  onExpressNumInput(e) { 
    let { value } = e.target
    this.setState({
      expressNum: value
    })
  }
  btnClick(item) { 
    switch (item) { 
      case 'refund':
        Taro.navigateTo({
          url: `/pages/car_proxy_pay_refund/index?id=${this.pageParams.id}`
        })
        break
      case 'payOrder':
        this.payMoney()
        break
      case 'submitExpressNum':
        this.submitExpressNum()
        break
      case 'finishedOrder':
        this.finishedOrder()
        break
      default:
        return
    }
  }
  submitExpressNum() { 
    let { expressNum } = this.state
    if (!expressNum || expressNum.length < 6) {
      Taro.showToast({
        icon: 'none',
        title: '请填写快递单号'
      })
      return
    }
    let sendData = {
      carProxyOrderId: this.pageParams.id,
      expressNum,
      businessType: 1
    }
    api.carProxy.submitCarProxyExpressNum(sendData, this).then(() => {
      Taro.showToast({
        icon: 'none',
        title: '提交成功'
      })
      this.getCarProxyDetails()
    })
  }
  finishedOrder() { 
    let {
      username,
      mobile,
      locationId,
      carProxyOrderItemRelationVoList,
      customerMailingData,
      totalPrice,
      remark,
      userId
    } = this.state
    const carProxyItemIds = carProxyOrderItemRelationVoList.map(item => item.id)
    let sendData = {
      carProxyOrderId: this.pageParams.id,
      username,
      mobile,
      locationId,
      carProxyItemIds: carProxyItemIds.toString(),
      mailingType: 1,
      mailingLocationId: customerMailingData.mailingLocationId,
      mailingAddress: customerMailingData.mailingAddress,
      totalPrice,
      remark,
      userId,
      carProxyOrderStatus: 30
    }
    api.carProxy.publishCarProxy(sendData, this).then(() => {
      Taro.showToast({
        title: '确认成功',
        icon: 'none'
      })
      this.getCarProxyDetails();
    })
  }
  /**
   * 调用微信扫码
   * @return void
   */
  scanCode() { 
    Taro.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: (res) => {
        this.setState({
          expressNum: res.result
        })
      }
    })
  }
  /**
   * 复制信息
   * @param {Type} content 要复制的文字
   * @return void
   */
  copy(content) {
    let {businessMailingData} = this.state
    if (content === 'mailingAddress') {
      content = `${businessMailingData.mailingUsername} ${businessMailingData.mailingMobile} ${businessMailingData.mailingLocationName}${businessMailingData.mailingAddress}`
    }
    Taro.setClipboardData({
      data: content
    })
  }
  /**
   * 请求支付内容
   * @return void
   */
  payMoney() {
    let sendData = {
      orderCode: this.state.proxyOrderCode,
      isPaytoll: 0
    }
    api.pay.getPayParams(sendData, this).then(res => {
      this.weChatPay(res)
    })
  }
  /**
   * 支付
   * @param {Object} params 后端返回的支付的参数
   * @return void
   */
  weChatPay(params) {
    Taro.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        if (!res) return
        Taro.navigateTo({
          url: `/pages/car_proxy_pay_success/index?id=${this.pageParams.id}`
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }
  /**
   * 触发了分享
   * @param {Object} event 参数描述
   * @return void
   */
  onShareAppMessage() {
    let path = `/pages/car_proxy_details/index?id=${this.pageParams.id}&share_type=6`
    let title = `欢迎您进入跑车物流~`
    // let imageUrl = `${defaultResourceImgURL}share_car_proxy_details.png`
    return {
      title,
      path,
      // imageUrl
    }
  }
  config = {
    navigationBarTitleText: '订单详情' 
  }

  render() {
    let {
      userName,
      mobile,
      locationName,
      proxyOrderStatus,
      proxyOrderStatusDesc,
      proxyOrderStatusReason,
      remark,
      carProxyOrderItemRelationVoList,
      proxyOrderCode,
      createTimeDesc,
      totalPriceDesc,
      buttons,
      open,
      payTimeDesc,
      payPriceDesc,
      businessMailingData,
      customerMailingData,
      expressNum
    } = this.state
    const carProxyOrderItemRelationVoListRender = carProxyOrderItemRelationVoList.map(item => {
      const key = item.id
      return (
        <View className='public-item' key={key}>
          <View className='public-label font-weight'>{item.carProxyItemName || ''}</View>
          <View className='public-content'>¥ {item.carProxyItemPriceDesc || ''}</View>
        </View>
      )
    })
    const bottomButtonsRender = buttons && buttons.map(item => {
      const key = item.key
      return (
        <View key={key} onClick={()=>this.btnClick(item.key)} className={key}>{item.name}</View>
      )
    })
    const iconClassName = classNames({
      'icon-for-bottom': !open,
      'icon-for-top': open,
    })
    // 客户向业务发送的材料清单
    const materialsBillClassName = classNames('textarea-public', {
      'no-text': !businessMailingData.materialsBill || !businessMailingData.materialsBill.length
    })
    // 客户向业务发送快递单号
    const businessExpressNumClassName = classNames('textarea-public', {
      'no-text': !businessMailingData.expressNum || !businessMailingData.expressNum.length
    })
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <View className='main-wrapper'>
            <View className='status-wrapper'>
              <Text>{proxyOrderStatusDesc || ''}</Text>
              {
                proxyOrderStatusReason && (<Text className='small-text'>{proxyOrderStatusReason || ''}</Text>)
              }
            </View>
            <View className='public-wrapper'>
              <View className='public-item'>
                <View className='public-label font-weight'>姓名</View>
                <View className='public-content'>{userName || ''}</View>
              </View>
              <View className='public-item'>
                <View className='public-label font-weight'>手机号</View>
                <View className='public-content'>{mobile || ''}</View>
              </View>
              <View className='public-item'>
                <View className='public-label font-weight'>办理区域</View>
                <View className='public-content'>{locationName || ''}</View>
              </View>
              {
                carProxyOrderItemRelationVoListRender
              }
              <View className='public-item more-text-wrapper'>
                <View className='public-label font-weight'>备注</View>
                <View className='public-content more-text'>{remark || '--'}</View>
              </View>
              {
                open && (
                  <Block>
                    <View className='public-item'>
                      <View className='public-label font-ash'>订单编号</View>
                      <View className='public-content font-ash'>{proxyOrderCode || ''}</View>
                    </View>
                    <View className='public-item'>
                      <View className='public-label font-ash'>下单时间</View>
                      <View className='public-content font-ash'>{createTimeDesc || ''}</View>
                    </View>
                    <View className='public-item'>
                      <View className='public-label font-ash'>付款时间</View>
                      <View className='public-content font-ash'>{payTimeDesc || ''}</View>
                    </View>
                    <View className='public-item'>
                      <View className='public-label font-ash'>订单总价</View>
                      <View className='public-content font-ash'>¥ {totalPriceDesc || ''}</View>
                    </View>
                    {
                      proxyOrderStatus === 41 || proxyOrderStatus === 21 ?
                        <View className='public-item'>
                          <View className='public-label font-ash'>退款金额</View>
                          <View className='public-content font-ash'>{payPriceDesc ? '¥' + payPriceDesc : '审核中'}</View>
                        </View> : null
                    }
                  </Block>
                )
              }
              {
                proxyOrderStatus !== 10 && (
                  <Block>
                    <View className='border'></View>
                    <View className='open-btn' onClick={this.clickOpenBtn}>
                      <Text>{ open ? '收起' : '查看更多'}</Text>
                      <View className={iconClassName}>
                        <Text className='iconfont iconxiangyouxuanzejiantoux icon-open'></Text>
                      </View>
                    </View>
                  </Block>
                )
              }
            </View>
            {
              proxyOrderStatus !== 10 && (
                <View className='public-wrapper'>
                  <View className='public-item'>
                    <View className='public-label font-weight lang-label'>所需材料</View>
                  </View>
                  <View className={materialsBillClassName}>
                    {businessMailingData.materialsBill || '业务人员更新材料清单后会向您发送消息提醒'}
                  </View>
                  <View className='public-item'>
                    <View className='public-label font-weight lang-label'>材料回寄信息</View>
                  </View>
                  <View className='textarea-public'>
                    <View>{customerMailingData.mailingUsername} {customerMailingData.mailingMobile}</View>
                    <View>{customerMailingData.mailingLocationName}{customerMailingData.mailingAddress}</View>
                  </View>
                  {
                    businessMailingData.expressNum && (
                      <Block>
                        <View className='public-item'>
                          <View className='public-label font-weight lang-label'>材料回寄单号</View>
                        </View>
                        <View className='textarea-public'>
                          <View
                            className='copy-btn'
                            onClick={this.copy.bind(this, businessMailingData.expressNum)}
                          >复制</View>
                          {businessMailingData.expressNum}
                        </View>
                      </Block>
                    )
                  }
                  <View className='public-item'>
                    <View className='public-label font-weight lang-label'>材料邮寄信息</View>
                  </View>
                  <View className={businessExpressNumClassName}>
                    {
                      businessMailingData.expressNum && (
                        <View
                          className='copy-btn'
                          onClick={this.copy.bind(this, 'mailingAddress')}
                        >复制</View>
                      )
                    }
                    {
                      businessMailingData.materialsBill ? (
                        <Block>
                          <View>{businessMailingData.mailingUsername} {businessMailingData.mailingMobile}</View>
                          <View>{businessMailingData.mailingAddress}</View>
                        </Block>
                      ): '业务人员更新邮寄地址后会向您发送消息提醒'
                    }
                  </View>
                  {
                    !customerMailingData.expressNum ?
                      <Block>
                        <View className='public-item'>
                          <View className='mast-input'>*</View>
                          <View className='public-label font-weight lang-label'>上传材料邮寄单号</View>
                        </View>
                        <View className='express-num-wrapper'>
                          <Input
                            className='public-input'
                            placeholder-class='placeholder-class'
                            placeholder='请输入材料邮寄单号'
                            value={expressNum}
                            onInput={this.onExpressNumInput}
                          ></Input>
                          <View className='scan-code iconfont iconsaoyisao' onClick={this.scanCode}></View>
                        </View>
                      </Block>
                      :
                      <Block>
                        <View className='public-item'>
                          <View className='public-label font-weight lang-label'>材料邮寄单号</View>
                        </View>
                        <View className='textarea-public'>
                          <View
                            className='copy-btn'
                            onClick={this.copy.bind(this, customerMailingData.expressNum)}
                          >复制</View>
                          {customerMailingData.expressNum || ''}
                        </View>
                      </Block>
                  }
                </View>
              )
            }
            {
              proxyOrderStatus === 10 && (
                <View className='public-wrapper'>
                  <View className='public-item'>
                    <View className='public-label'>订单编号</View>
                    <View className='public-content'>{proxyOrderCode || ''}</View>
                  </View>
                  <View className='public-item'>
                    <View className='public-label'>下单时间</View>
                    <View className='public-content'>{createTimeDesc || ''}</View>
                  </View>
                  <View className='public-item'>
                    <View className='public-label'>订单总价</View>
                    <View className='public-content'>¥ {totalPriceDesc || ''}</View>
                  </View>
                </View>
              )
            }
          </View>
          {
            proxyOrderStatus === 10 && (
              <View className='bottom-tips'>付款后，业务人员会将您所需材料发送至您订单详情展示</View>
            )
          }
        </View>
        {
          proxyOrderStatus !== 21 &&
          proxyOrderStatus !== 40 &&
          proxyOrderStatus !== 41 &&
          proxyOrderStatus !== 42 ? (
            <View className='bottom-btn-wrapper'>
              {
                bottomButtonsRender
              }
            </View>
          ) : null
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
export default connect(mapStateToProps)(CarProxyDetails)