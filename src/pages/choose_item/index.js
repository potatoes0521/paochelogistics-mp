/*
 * @Author: liuYang
 * @description: 选择商户列表  选择区域
 *    pageType = merchant 选择商户
 *    pageType = district 选择区域
 *    pageType = merchantType 选择区域
 * 
 * @Date: 2019-10-21 11:20:33
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-23 14:26:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import {
  View,
  Input,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import { defaultResourceConfigURL } from '@config/request_config.js'
import './index.styl'

// eslint-disable-next-line import/first
// import Indexes from '@c/indexes/index.js'

class ChooseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '请输入经销商名称进行搜索',
      indexesData: [],
      filterCityList: []
    }
    this.pageParams = {}
  }
  componentDidShow() { 
    this.pageParams = this.$router.params
    if (this.pageParams.pageType === 'district') {
      this.setNavigationBarTitle('选择所属区域')
      this.setState({
        inputText: '请输入区域名称进行搜索'
      })
      this.getDistrictList()
    } else if (this.pageParams.pageType === 'merchantType') {
      this.setNavigationBarTitle('选择经销商类型')
      this.setState({
        inputText: '请输入经销商类型进行搜索'
      })
      this.getMerchantType()
    }else {
      this.getMerchantList()
    }
  }
  searchInput(e) { 
    let { value } = e.target
    let { indexesData } = this.state
    if (value.length < 1) { 
      return;
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      let filterCityList = indexesData.filter(item => {
        return (item && item.name.indexOf(value) !== -1)
      })
      this.setState({
        filterCityList
      })
    },1000)
  }
  chooseItem(e) { 
    const { pageType } = this.pageParams
    let pages = Taro.getCurrentPages(); //  获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    let options = {}
    if (pageType === 'merchant') {
      options = {
        merchantId: e.id,
        merchantName: e.name
      }
    } else if (pageType === 'district') {
      options = {
        districtId: e.id,
        districtName: e.name
      }
    } else if (pageType === 'merchantType') {
      options = {
        merchantTypeId: e.id,
        merchantTypeName: e.name
      }
    }
    prevPage.$component.setState(options, () => {
      Taro.navigateBack()
    })
  }
  /**
   * 获取商户列表
   * @return void
   */
  getMerchantList() {
    api.customer.getMerchantList({}, this)
      .then(res => {
        if (!res) return
        const data = this.handleData(res)
        this.setState({
          indexesData: data
        })
      })
  }
  /**
   * 获取区域列表
   * @return void
   */
  getDistrictList() {
    api.customer.getDistrictList({}, this)
      .then(res => {
        if (!res) return
        const data = this.handleData(res)
        this.setState({
          indexesData: data
        })
      })
  }
  /**
   * 获取经销商类型
   * @return void
   */
  getMerchantType() {
    Taro.request({
      url: `${defaultResourceConfigURL}merchantType.json`,
      method: 'get',
      success: (res) => {
        if (!res.data) return
        const data = this.handleData(res.data.data)
        this.setState({
          indexesData: data
        })
        // this.merchantTypeList = res.data.data
      }
    })
  }
  /**
   * 处理数据
   * @param {Array} res 后端返回的数据
   * @return Array 处理完成的数据
   */
  handleData(res) {
    const { pageType } = this.pageParams
    return res.map(item => {
      return {
        id: item[pageType + 'Id'],   // 如果拓展  取得这个id就是页面的pageType 后期如果不能满足的话就改成传参
        name: item[pageType + 'Name']
      }
    })
  }
  /**
   * 选择所属区域
   * @param {String} title 导航栏文字
   * @return void
   */
  setNavigationBarTitle(title) {
    Taro.setNavigationBarTitle({
      title,
    })
  }
  config = {
    navigationBarTitleText: '选择经销商'
  }
  render() {
    let {
      indexesData,
      filterCityList,
      inputText
    } = this.state

    const filterList = filterCityList.map(item => 
      <View
        onClick={()=>this.chooseItem(item)}
        className='search-item'
        key={item.id}
      >
        <View className='search-item-name'>{item.name}</View>
        <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
      </View>
    )
    const allIndexesList = indexesData.map(item => 
      <View
        onClick={()=>this.chooseItem(item)}        
        className='search-item'
        key={item.id}
      >
        <View className='search-item-name'>{item.name}</View>
        <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
      </View>
    )
    
    return (
      <View className='page-wrapper'>
        <View className='choose-search-wrapper'>
          <View className='search-from-wrapper'>
            <View className='iconfont iconsousuo icon-style'></View>
            <View className='input-wrapper'>
              <Input
                className='input'
                placeholder={inputText}
                onInput={this.searchInput}
              ></Input>
            </View>
          </View>
        </View>
        <View className='indexes-wrapper'>
          {
            filterCityList.length ?
              <View className='search-wrapper'>
                {filterList}
              </View>
              :
              <View className='search-wrapper'>
                {
                  allIndexesList
                }
              </View>
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
export default connect(mapStateToProps)(ChooseItem)