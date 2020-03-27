/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-27 11:50:50
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
import api from '../../api/index.js'

class CarProxy extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      carProxyList: [],
    }
    this.carProxyFlag = false
    this.carProxyPage = 1
    this.carProxyOrderStatus = 10
  }

  componentDidShow() {
    this.getCarProxyList({})
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
    this.carProxyOrderStatus = ''
    if (current === 3) {
      this.carProxyOrderStatus = ''
    } else if(current === 2) {
      this.carProxyOrderStatus = 30
    } else if (current === 1) {
      this.carProxyOrderStatus = 22
    } else if (current === 0) {
      this.carProxyOrderStatus = 10
    }
    this.getCarProxyList({})
  }

  getCarProxyList({
    pageNum = this.carProxyPage,
    pageSize = 10,
    businessType = 1,
    carProxyOrderStatus = this.carProxyOrderStatus
  }) { 
    let sendData = {
      pageNum,
      pageSize,
      businessType,
      carProxyOrderStatus
    }
    api.carProxy.getCarProxyList(sendData, this).then(res => {
      if (res && res.length < pageSize) {
        this.carProxyFlag = true
      }
      this.carProxyPage += 1
      let { carProxyList } = this.state
      if (pageNum === 1) {
        this.setState({
          carProxyList: res
        })
      } else {
        this.setState({
          carProxyList: [...carProxyList, ...res]
        })
      }
    })
  }

  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    // 显示顶部刷新图标
    this.carProxyPage = 1
    this.carProxyFlag = false
    this.setState({
      carProxyList: []
    }, () => {
      this.handleRequest()
    })
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }
  
  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    console.log('触底')
    if (this.carProxyFlag) return
    this.handleRequest()
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