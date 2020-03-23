/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-23 09:54:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import api from '@api/index.js'
import Tabs from '@c/tabs/index.js'
import { carProxyTabs } from '@config/text_config.js'
import EmptyData from '@c/empty_data/index.js'
import CarProxyItem from './components/car_proxy_item/index.js'
import PublishBtn from './components/publish_btn/index.js'
import './index.styl'

class CarProxy extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      carProxyList: [
        {
          "id": 4,
          "proxyOrderCode": "CW1583903706966",
          "createUserId": 10218,
          "userId": 10218,
          "userName": "罗旭日旭日",
          "mobile": "18710006370",
          "locationId": 110000,
          "locationName": "北京市-北京市北京市北京市北京市",
          "remark": "我是一条测试数据",
          "proxyOrderStatus": 21,
          "proxyOrderStatusDesc": "退款中",
          "totalPrice": 10000,
          "totalPriceDesc": "10000.00",
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
          }, {
            "id": 4,
            "carProxyItemId": 1,
            "carProxyItemName": "提档",
            "carProxyOrderId": 4,
            "carProxyItemPrice": 10000,
            "carProxyItemPriceDesc": "10000"
          }, {
            "id": 4,
            "carProxyItemId": 1,
            "carProxyItemName": "提档",
            "carProxyOrderId": 4,
            "carProxyItemPrice": 10000,
            "carProxyItemPriceDesc": "10000"
          } ,{
            "id": 4,
            "carProxyItemId": 1,
            "carProxyItemName": "提档",
            "carProxyOrderId": 4,
            "carProxyItemPrice": 10000,
            "carProxyItemPriceDesc": "10000"
          }],
          "carProxyMailingAddressList": null,
          "buttons": [{
              "key": "paid",
              "name": "确认完成"
            },
            {
              "key": "refund",
              "name": "申请退款"
            }
          ]
        }
      ]
    }
    this.carProxyFlag = false
    this.carProxyPage = 1
  }

  componentDidMount() {
  }

  /**
   * 处理tabs点击事件
   * @param {Number} value 参数描述
   * @return void
   */
  onTabsItemClick(value) {
      this.carProxyPage = 1
      this.carProxyFlag = false
      this.setState({
        current: value,
        carProxyList: []
      }, () => {
        this.handleRequest()
      })
  }
  handleRequest() {
    let {current} = this.state
    this.status = ''
    if (current === 2) {
      this.status = ''
    } else if (current === 1) {
      this.status = 20
    } else if (current === 0) {
      this.status = 10
    }
    // this.getOfferList(this.status, this.offerPage)
  }
  config = {
    navigationBarTitleText: '车务订单' 
  }

  render() {
    let {
      current,
      carProxyList
    } = this.state
    const carProxyListRender = carProxyList.map(item => {
      const key = item.id
      return (
        <CarProxyItem key={key} item={item} />
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='tabs-wrapper'>
          <Tabs
            activeIndex={current}
            options={carProxyTabs}
            onClick={this.onTabsItemClick.bind(this)}
          ></Tabs>
        </View>
        <View className='car-proxy-list-wrapper'>
          {
            carProxyList && carProxyList.length > 0 ?
              <Block>
                {
                  carProxyListRender
                }
                <PublishBtn />
              </Block>
              :
              <EmptyData pageType='car_proxy'></EmptyData>
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
export default connect(mapStateToProps)(CarProxy)