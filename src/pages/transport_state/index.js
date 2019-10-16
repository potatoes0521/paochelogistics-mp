/*
 * @Author: liuYang
 * @description: 运输状态
 * @Date: 2019-09-24 10:51:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-16 09:12:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
// import DriverItem from './components/driver_item/index.js'
import TimeLine from './components/time_line/index.js'
import './index.styl'

class TransportState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wayCityList: []
    }
    this.pageParams = {}
  }

  componentWillMount() { 
    this.pageParams = this.$router.params
    this.getOrderTransportList()
  }

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

  render() { 
    // const item = {
    //   name: '张海涛',
    //   phone: '186****7658',
    //   idCard: '176345783267459876'
    // }
    let {wayCityList} = this.state
    // const list = ['司机']
    // const driverList = list.map((name) => (
    //   <DriverItem
    //     item={item}
    //     title={name}
    //     key={name}
    //   ></DriverItem>
    // ))
    return (
      <View className='page-wrapper'>
        {/* {
          driverList
        } */}
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