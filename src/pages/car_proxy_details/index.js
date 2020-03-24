/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-24 10:15:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
      "carProxyMailingAddressList": [{
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
      }],
      "buttons": [
        {
          "key": "refund",
          "name": "申请退款"
        },
        {
          "key": "submitCode",
          "name": "确认完成"
        },
      ]
    }
  }

  componentDidMount() {
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
      remark,
      carProxyOrderItemRelationVoList,
      proxyOrderCode,
      createTimeDesc,
      totalPriceDesc,
      buttons
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
    const bottomButtonsRender = buttons.map(item => {
      const key = item.key
      return (
        <View key={key} className={key}>{item.name}</View>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <View className='main-wrapper'>
            <View className='status-wrapper'>{proxyOrderStatusDesc || ''}</View>
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
            </View>
            {
              proxyOrderStatus === 10 && (
                <View className='public-wrapper'>
                  <View className='public-item'>
                    <View className='public-label'>订单编号</View>
                    <View className='public-content more-text'>{proxyOrderCode || ''}</View>
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
        
        <View className='bottom-btn-wrapper'>
          {
            bottomButtonsRender
          }
        </View>
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