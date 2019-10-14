/*
 * @Author: liuYang
 * @description: 客户信息列表
 * @Date: 2019-09-27 15:38:07
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-14 15:02:15
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
    this.merchantList = []
    this.pageParams = {}
  }

  componentDidShow() { 
    this.pageParams = this.$router.params
    this.customerPage = 1
    this.customerFlag = false
    this.getAllCustomerList()
  }
  /**
   * 获取客户列表
   * @param {String} selectParam 根据什么查询
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 条数
   * @param {Boolean} showLoading 是否显示loading
   * @return void
   */
  getAllCustomerList(selectParam = '', pageNum = 1, pageSize = 10, showLoading = true) {
    if (showLoading) {
      Taro.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    let sendData = {
      userId:this.props.userInfo.userId,
      selectParam,
      pageNum,
      pageSize,
    }
    let { customerListData } = this.state
    api.customer.getCustomerList(sendData, this).then(res => {
      if (!res && selectParam) {
        Taro.hideLoading()
        Taro.showToast({
          title: '没搜索到结果',
          icon:'none'
        })
        return
      }
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
  /**
   * 跳转到客户详情  
   * @param {Object} e event对象
   * @return void
   */
  navigatorToDetails(e) { 
    let {item} = e.target.dataset
    const { pageType } = this.pageParams
    if (pageType === 'choose') {
      let pages = Taro.getCurrentPages(); //  获取页面栈
      let prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.$component.setState({
        placeOrderCustomer: item
      }, () => {
        Taro.navigateBack()
      })
    } else {
      Storage.setStorage('customer_details', item)
      Taro.navigateTo({
        url: '/pages/customer_details/index'
      })
    }
  }
  /**
   * 搜索框
   * @param {Object} e event对象
   * @return void
   */
  searchInput(e) { 
    this.setState({
      selectParam: e.target.value
    })
  }
  /**
   * 提交搜索
   * @return void
   */
  searchConfirm() { 
    this.customerPage = 1
    this.customerFlag = false
    this.getAllCustomerList(this.state.selectParam, this.customerPage)
  }
  /**
   * 添加客户
   * @return void
   */
  addCustomer() {
    Taro.navigateTo({
      url: '/pages/customer_edit/index'
    })
  }
  /**
   * 清除输入框内容
   * @return void
   */
  clearSearchInput() {
    console.log('111')
    this.setState({
      selectParam: ''
    })
    this.customerPage = 1
    this.customerFlag = false
    this.getAllCustomerList('', this.customerPage, 10, false)
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
    let {
      customerListData,
      selectParam
    } = this.state
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
                value={selectParam}
                onInput={this.searchInput}
                confirm-type='search'
                onConfirm={this.searchConfirm}
              ></Input>
            </View>
            {
              selectParam ? 
                <View
                  className='iconfont iconguanbi clear-search'
                  onClick={this.clearSearchInput}
                ></View>                
                : null
            }
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
        <View
          className='add-customer'
          onClick={this.addCustomer}
        >
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