/*
 * @Author: liuYang
 * @description: 运力信息列表
 * @Date: 2019-09-27 15:38:07
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 20:01:01
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
// import Storage from '@utils/storage.js'
import TransportItem from './components/transport_item/index.js'
// eslint-disable-next-line import/first
import EmptyData from '@c/empty_data/index.js'
import './index.styl'

class TransportInfo extends Component { 

  constructor(props) { 
    super(props)
    this.state = {
      transportListData: [],
      selectParam: '',
      totalCount: 0
    }
    this.transportPage = 1
    this.transportFlag = false
    this.merchantList = []
    this.pageParams = {}
  }
 
  componentDidShow() { 
    this.pageParams = this.$router.params
    if (this.transportPage === 1 || this.state.transportListData.length < 10 ) {
      this.transportPage = 1
      this.transportFlag = false
      this.getAllTransportList()
    }
  }
  /**
   * 获取运力列表
   * @param {String} selectParam 根据什么查询
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 条数
   * @return void
   */
  getAllTransportList(selectParam = this.state.selectParam, pageNum = 1, pageSize = 10) {
    let sendData = {
      userId:this.props.userInfo.userId,
      selectParam,
      pageNum,
      pageSize,
    }
    let { transportListData } = this.state
    api.transport.getTransportList(sendData, this).then(res => {
      const data = res.data
      if (!data && selectParam) {
        Taro.showToast({
          title: '没搜索到结果',
          icon:'none'
        })
        return
      }
      if (data && data.length < pageSize) {
        this.transportFlag = true
      }
      this.transportPage += 1
      if (pageNum === 1) {
        this.setState({
          transportListData: [...data],
          totalCount: res.totalCount
        })
      } else {
        this.setState({
          transportListData: [...transportListData, ...data]
        })
      }
    })
  }
  /**
   * 跳转到运力详情  
   * @param {Object} e event对象
   * @return void
   */
  navigatorToDetails(e) { 
    let { item } = e.target.dataset
    const { pageType } = this.pageParams
    if (pageType === 'choose') {
      let pages = Taro.getCurrentPages(); //  获取页面栈
      let prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.$component.setState({
        placeOrderTransport: item
      }, () => {
        Taro.navigateBack()
      })
    } else {
      // Storage.setStorage('transport_details', item)
      Taro.navigateTo({
        url: `/pages/transport_details/index?userId=${item.userId}`
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
    this.transportPage = 1
    this.transportFlag = false
    this.setState({
      transportListData: []
    }, () => {
      this.getAllTransportList(this.state.selectParam, this.transportPage)
    })
  }
  /**
   * 添加运力
   * @return void
   */
  addTransport() {
    Taro.navigateTo({
      url: '/pages/transport_edit/index'
    })
  }
  /**
   * 清除输入框内容
   * @return void
   */
  clearSearchInput() {
    this.setState({
      selectParam: ''
    })
    this.transportPage = 1
    this.transportFlag = false
    this.getAllTransportList('', this.transportPage, 10, false)
  }
  /**
   * 下拉刷新
   * @return void
   */
  // async onPullDownRefresh() {
  //   // 显示顶部刷新图标
  //   Taro.showNavigationBarLoading();
  //   this.transportPage = 1
  //   this.transportFlag = false
  //   this.getAllTransportList(this.state.selectParam, this.transportPage)
  //   // 隐藏导航栏加载框
  //   Taro.hideNavigationBarLoading();
  //   // 停止下拉动作
  //   Taro.stopPullDownRefresh();
  // }
  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    console.log('触底')
    if (this.transportFlag) return
    this.getAllTransportList(this.state.selectParam, this.transportPage)
  }

  config = {
    navigationBarTitleText: '运力信息列表'
  }
  
  render() { 
    let {
      transportListData,
      selectParam,
      totalCount
    } = this.state
    const transportList = transportListData.map((item, index) => {
      const key = item.userId
      return (
        <Block
          key={key}
        >
          <TransportItem
            item={item}
            data-item={item}
          ></TransportItem>
          {
            index < transportListData.length - 1 ?
              <View className='line'></View>
              : null
          }
        </Block>
      )
    })
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
        <View className='transport-num'>
          共<Text className='number'>{totalCount}</Text>个运力
        </View>
        <View className='transport-wrapper'>
          <View
            className='transport-list'
            onClick={this.navigatorToDetails}
          >
            {
              transportListData.length ?
                transportList
                : 
                <EmptyData pageType='transport'></EmptyData>
            }
          </View>
        </View>
        {
          (transportListData.length > 0) ?
            <View
              className='add-transport'
              onClick={this.addTransport}
            >
              <Text className='iconfont icontianjiakehu icon-add-style'></Text>
            </View>
            : null
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
export default connect(mapStateToProps)(TransportInfo)