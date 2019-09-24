/*
 * @Author: liuYang
 * @description: 运输状态
 * @Date: 2019-09-24 10:51:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-24 16:00:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import DriverItem from './components/driver_item/index.js'
import TimeLine from './components/time_line/index.js'
import './index.styl'

class TransportState extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() { 
    const item = {
      name: '张海涛',
      phone: '186****7658',
      idCard: '176345783267459876'
    }
    const timeArray = [
      {
        time: '08-04 14:00',
        address: '黄浦江区静安庄路产业园2栋黄浦江区静安庄路产业园2栋黄浦江区静安庄路产业园2栋黄浦江区静安庄路产业园2栋'
      },
      {
        time: '08-04 14:00',
        address: '黄浦江区静安庄路'
      },
      {
        time: '08-04 14:00',
        address: '黄浦江区静安庄路产业园2栋黄浦江区静'
      },
      {
        time: '08-04 14:00',
        address: '北京提车'
      }
    ]
    const list = ['提车司机', '在途司机', '送车司机']
    const driverList = list.map((name, index) => (
      <DriverItem
        item={item}
        title={name}
        key={index}
      ></DriverItem>
    ))
    return (
      <View className='page-wrapper'>
        {
          driverList
        }
        <TimeLine
          timeArray={timeArray}
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