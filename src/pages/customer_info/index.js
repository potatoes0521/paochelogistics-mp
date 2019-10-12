/*
 * @Author: liuYang
 * @description: 客户信息列表
 * @Date: 2019-09-27 15:38:07
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-12 11:19:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import Storage from '@utils/storage.js'
import CustomerItem from './components/customer_item/index.js'
import './index.styl'

class CustomerInfo extends Component { 

  constructor(props) { 
    super(props)
    this.state = {
      customerListData: [],
      selectParam: ''
    }
    this.customerPage = 1
    this.customerFlag = false
  }

  componentDidShow() { 
    this.customerPage = 1
    this.customerFlag = false
    this.getAllCustomerList()
  }
  /**
   * 获取客户列表
   * @param {String} selectParam 根据什么查询
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 条数
   * @return void
   */
  getAllCustomerList(selectParam = '', pageNum = 1, pageSize = 10) {
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      selectParam,
      pageNum,
      pageSize,
    }
    let { customerListData } = this.state
    api.customer.getCustomerList(sendData,this).then(res => {
      if (res && res.length < pageSize) {
        this.customerFlag = true
      }
      this.customerPage += 1
      if (pageNum === 1) {
        this.setState({
          customerListData: [...res]
        })
      } else {
        this.setState({
          customerListData: [...customerListData, ...res]
        })
      }
      Taro.hideLoading()
    })
  }
  navigatorToDetails(e) { 
    let {item} = e.target.dataset
    Storage.setStorage('customer_details', item)
    Taro.navigateTo({
      url: '/pages/customer_details/index'
    })
  }
  /**
   * 下拉刷新
   * @return void
   */
  async onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading();
    this.customerPage = 1
    this.customerFlag = false
    this.getAllCustomerList(this.state.selectParam, this.customerPage)
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }
  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    if (this.customerFlag) return
    this.getAllCustomerList(this.state.selectParam, this.customerPage)
  }

  config = {
    navigationBarTitleText: '客户信息列表',
    enablePullDownRefresh: true
  }
  
  render() { 
    let { customerListData } = this.state
    const customerList = customerListData.map((item,index) => (
      <Block
        key={item.userId}
      >
        <CustomerItem
          item={item}
          data-item={item}
        ></CustomerItem>
        {
          index < customerListData.length - 1 ?
            <View className='line'></View>
            : null
        }
      </Block>
    ))
    return (
      <View className='page-wrapper'>
        <View className='search-wrapper'>
          <View className='search-main'>
            <View className='iconfont iconsousuo icon-search-style'></View>
            <View className='input'>
              <Input
                placeholder='输入姓名/联系方式/经销商名称进行搜索'
                placeholderClass='search-placeholder'
                className='search-input'
              ></Input>
            </View>
          </View>
        </View>
        {
          customerListData.length > 0 ?
            <View className='customer-num'>
              共<Text className='number'>{customerListData.length}</Text>个客户
            </View>
            : null
        }
        <View className='customer-wrapper'>
          <View
            className='customer-list'
            onClick={this.navigatorToDetails}
          >
            {
              customerList
            }
          </View>
        </View>
        <View className='add-customer'>
          <View className='iconfont icontianjiakehu icon-add-style'></View>
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
export default connect(mapStateToProps)(CustomerInfo)