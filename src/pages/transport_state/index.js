/*
 * @Author: liuYang
 * @description: 运输状态
 * @Date: 2019-09-24 10:51:52
 * @LastEditors: guorui
 * @LastEditTime: 2019-11-28 17:33:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import DriverItem from './components/driver_item/index.js'
import TimeLine from './components/time_line/index.js'
import './index.styl'

class TransportState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wayCityList: [],
      driverInfo: {}
    }
    this.pageParams = {}
  }

  componentWillMount() { 
    this.pageParams = this.$router.params
    this.getOrderTransportList()
    this.getDriverDetail()
  }
  /**
   * 获取订单运输状态
   * @return void
   */
  getOrderTransportList() { 
    let sendData = {
      orderId: this.pageParams.order_id
    }
    api.order.getOrderTransportList(sendData, this).then(res => {
      if (res) { 
        this.setState({
          wayCityList: res
        })
      }
    })
  }
  /**
   * 获取司机信息
   * @return void
   */
  getDriverDetail() {
    let sendData = {
      orderId: this.pageParams.order_id
    }
    api.order.getDriverDetail(sendData, this).then(res => {
      console.log(res, "司机")
      if (res) {
        this.setState({
          driverInfo: res
        })
      }
    })
  }

  render() { 
    let {
      wayCityList,
      driverInfo
    } = this.state
    return (
      <View className='page-wrapper'>
        {
          JSON.stringify(driverInfo) !== '{}' ?
            <DriverItem
              item={driverInfo}
            ></DriverItem>
            : null
        }
        <TimeLine
          timeArray={wayCityList}
        ></TimeLine>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(TransportState)