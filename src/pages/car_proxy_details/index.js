/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-25 11:07:33
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

import './index.styl'

class CarProxyDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      "id": 4,
      "proxyOrderCode": "CW1583903706966",
      "createUserId": 10218,
      "userId": 10218,
      "userName": "罗旭日",
      "mobile": "18710006370",
      "locationId": 110000,
      "locationName": "北京市",
      "remark": "我是一条测试数据",
      "proxyOrderStatus": 21,
      "proxyOrderStatusDesc": "退款中",
      "totalPrice": 10000,
      "totalPriceDesc": "10000",
      "payPrice": null,
      "payPriceDesc": null,
      "createTime": "2020-03-11T03:06:44.000+0000",
      "createTimeDesc": "2020-03-11 11:06:44",
      "updateTime": "2020-03-11T05:15:20.000+0000",
      "updateTimeDesc": "2020-03-11 13:15:20",
      "payTime": "2020-03-11T05:10:16.000+0000",
      "payTimeDesc": "2020-03-11 13:10:16",
      "carProxyOrderItemRelationVoList": [{
        "id": 4,
        "carProxyItemId": 1,
        "carProxyItemName": "提档",
        "carProxyOrderId": 4,
        "carProxyItemPrice": 10000,
        "carProxyItemPriceDesc": "10000"
      }],
      customerMailingData: {
        "id": 4,
        "carProxyOrderId": 4,
        "mailingLocationId": 110000,
        "mailingUsername": "罗旭日",
        "mailingMobile": "18710006370",
        "mailingAddress": "蓝红中心9层",
        "expressNum": null,
        "materialsBill": null,
        "mailingType": 1,
        "createTime": "2020-03-11T03:06:44.000+0000",
        "updateTime": "2020-03-11T03:06:44.000+0000",
        "isActive": 1
      },
      businessMailingData: {
        "id": 4,
        "carProxyOrderId": 4,
        "mailingLocationId": 110000,
        "mailingUsername": "罗旭日222",
        "mailingMobile": "1871000637022",
        "mailingAddress": "蓝红中心9层22",
        "expressNum": '',
        "materialsBill": null,
        "mailingType": 1,
        "createTime": "2020-03-11T03:06:44.000+0000",
        "updateTime": "2020-03-11T03:06:44.000+0000",
        "isActive": 2
      },
      expressNum: '',
      "buttons": [
        {
          "key": "refund",
          "name": "申请退款"
        },
        {
          "key": "submitCode",
          "name": "确认完成"
        },
      ],
      open: false
    }
  }

  componentDidMount() {
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
        <View key={key} className={key}>{item.name}</View>
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
              <View className='border'></View>
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
                  <View className='open-btn' onClick={this.clickOpenBtn}>
                    <Text>{ open ? '收起' : '查看更多'}</Text>
                    <View className={iconClassName}>
                      <Text className='iconfont iconxiangyouxuanzejiantoux icon-open'></Text>
                    </View>
                  </View>
                )
              }
            </View>
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
                <View>{customerMailingData.mailingAddress}</View>
              </View>
              {
                businessMailingData.expressNum && (
                  <Block>
                    <View className='public-item'>
                      <View className='public-label font-weight lang-label'>材料回寄单号</View>
                    </View>
                    <View className='textarea-public'>
                      <View className='copy-btn'>复制</View>
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
                    <View className='copy-btn'>复制</View>
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
                      <View className='scan-code iconfont iconsaoyisao'></View>
                    </View>
                  </Block>
                  :
                  <Block>
                    <View className='public-item'>
                      <View className='public-label font-weight lang-label'>材料邮寄单号</View>
                    </View>
                    <View className='textarea-public'>
                      <View className='copy-btn'>复制</View>
                      {customerMailingData.expressNum || ''}
                    </View>
                  </Block>
              }
            </View>
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