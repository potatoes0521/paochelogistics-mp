/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-17 16:11:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-12 18:41:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Textarea
}
from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import api from '@api/index.js'
import {
  realNamePatter,
  phoneNumberPatter
} from '@utils/patter.js'
import CallService from '@c/call_service/index.js'
import './index.styl'

class CarProxyPublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      mobile: '',
      locationName: '',
      locationId: '',
      remark: '',
      mailingAddress: '', // 回寄详细地址
      carProxyBusinessList: [],
      allChooseBusinessList: [],
      totalPrice: 0,
      mailingLocationId: '',
      mailingLocationName: '',
      realName: '',
      userId: ''
    }
    this.pageParams = {}
    this.timer = null
  }

  componentDidMount() {
    this.handleUserMsg()
    this.getCarProxyProjectList(this.state.locationId)
  }
  
  componentWillUnmount() {
    if (!this.timer) return;
    clearTimeout(this.timer)
  }

  handleUserMsg() { 
    let { userInfo } = this.props
    console.log('userInfo', userInfo)
    if(this.pageParams.type === 'edit') { 
  
    } else {
      this.setState({
        mobile: userInfo.mobile,
      })
    }
  }
  /**
   * 根据城市ID获取业务城市价格
   * @param {String || Number} locationId='' 城市id
   * @return void
   */
  getCarProxyProjectList(locationId='') {
    let sendData = {
      locationId
    }
    api.carProxy.getCarProxyProjectList(sendData, this).then(res => {
      if (locationId) {
        this.setState({
          carProxyBusinessList: res
        })
      } else {
        const data = res.map((item,index) => {
          return {
            id: index,
            proxyItemName: item.proxyItemName,
            proxyItemPrice: item.proxyItemPrice || 0
          }
        })
        this.setState({
          carProxyBusinessList: data
        })
      }
    })
  }
  onUsernameInput(e) {
    let { value } = e.target
    this.setState({
      username: value
    })
  }
  onMobileInput(e) { 
    let { value } = e.target
    this.setState({
      mobile: value
    })
  }
  onLocationNameInput(e) { 
    let { value } = e.target
    this.setState({
      locationName: value
    })
  }
  onRemarkInput(e) { 
    let { value } = e.target
    this.setState({
      remark: value
    })
  }
  onAddressInput(e) { 
    let { value } = e.target
    this.setState({
      mailingAddress: value
    })
  }
  navigatorToChooseCity() { 
    Taro.navigateTo({
      url: '/pages/choose_city/index?type=car_proxy'
    })
  }
  /**
   * 当业务项被选中
   * @param {Object} item 被选中项
   * @return void
   */
  carProxyProjectOnChoose(item) { 
    if (!item.id || !item.proxyItemPrice) {
      this.showToast('请先选择办理城市')
      return
    }
    let {
      carProxyBusinessList,
      allChooseBusinessList,
      totalPrice
    } = this.state
    carProxyBusinessList.forEach(ite => {
      if (ite.id === item.id) {
        if (ite.checked) {
          ite.checked = false
          allChooseBusinessList = allChooseBusinessList.filter(it => it.id !== item.id)
        } else {
          ite.checked = true
          allChooseBusinessList.push(ite)
        }
      }
    })
    totalPrice = allChooseBusinessList.reduce((prev, ite) => prev + ite.proxyItemPrice, 0)
    this.setState({
      carProxyBusinessList,
      allChooseBusinessList,
      totalPrice
    })
  }
  submitOrder() { 
    let {
      username,
      mobile,
      locationId,
      allChooseBusinessList,
      mailingLocationId,
      mailingAddress,
      totalPrice,
      remark,
      userId
    } = this.state
    const carProxyItemIds = allChooseBusinessList.map(item => item.id)
    let testingList = {
      username: '请填写姓名',
      mobile: '请填写手机号',
      locationId: '请选择办理城市',
      allChooseBusinessList: '至少选择一个代办项~',
      mailingLocationId: '请选择回寄地址',
      mailingAddress: '请填写详细回寄地址',
      totalPrice: '总价有误',
      userId: '请选择代下单的客户', //年款
    }
    let breakName = ''
    let { userInfo } = this.props
    if (userInfo.userType === 0 && !userId) {
      breakName = 'userId'
    }
    for (let i in testingList) {
      if (i === 'userId') {
        continue
      }
      if (!this.state[i]) { 
        breakName = i
        break
      }
    }
    if (breakName) {
      this.showToast(testingList[breakName])
      return
    }
    if (!(realNamePatter).test(username)) {
      this.showToast('请填写正确格式姓名')
      return
    }
    if (!(phoneNumberPatter).test(mobile)) {
      this.showToast('请填写正确格式手机号')
      return
    }
    
    let sendData = {
      username,
      mobile,
      locationId,
      carProxyItemIds: carProxyItemIds.toString(),
      mailingType: 1,
      mailingLocationId,
      mailingAddress,
      totalPrice,
      remark,
      userId
    }
    if (!sendData.userId) {
      sendData.userId = this.props.userInfo.userId
    }
    console.log('sendData', sendData)
    api.carProxy.publishCarProxy(sendData, this).then(() => {
      this.showToast('下单成功')
      this.timer = setTimeout(() => {
        Taro.navigateBack()
      }, 1800)
    })
  }
  showToast(str) {
    Taro.showToast({
      title: str,
      icon: 'none',
      duration: 2000
    })
  }
  navigatorChooseCityAndArea() { 
    Taro.navigateTo({
      url: '/pages/choose_city_three_level/index?type=mailingLocation'
    })
  }
  navigatorTo() {
    Taro.navigateTo({
      url: '/pages/customer_info/index?pageType=choose&from=car_proxy'
    })
  }
  config = {
    navigationBarTitleText: '车务代办' 
  }

  render() {
    let {
      username,
      mobile,
      locationName,
      remark,
      mailingAddress,
      carProxyBusinessList,
      allChooseBusinessList,
      mailingLocationName,
      totalPrice,
      realName
    } = this.state
    let {userInfo} = this.props
    const carProxyBusinessListRender = carProxyBusinessList.map(item => {
      const key = item.id
      const checkboxClassName = classNames('public-checkbox', {
        'checked iconfont iconduigoux': item.checked
      })
      return (
        <View className='public-item' key={key} onClick={()=> this.carProxyProjectOnChoose(item)}>
          <View className='public-label'>{item.proxyItemName}</View>
          <View className='public-content'>
            {
              item.proxyItemPrice ? <View className='public-price'>¥ {item.proxyItemPrice / 100}</View> : <View className='public-no-check-text'>选择办理区域后显示该业务价格</View >
            }
            <View className={checkboxClassName}></View>
          </View>
        </View>
      )
    })
    
    return (
      <View className='page-wrapper'>
        <View className='page-main'>
          <View className='main-wrapper'>
            <View className='public-wrapper'>
              {
                userInfo.userType === 0 ?
                  <View className='publish-choose-customer' onClick={this.navigatorTo.bind(this, 'choose_customer')}>
                    <View className='customer-info'>
                      <View className='iconfont iconkehu customer-img'></View>
                      <View className='customer-name'>
                        {
                          realName ? realName: '选择代发布客户'
                        }
                      </View>
                    </View>
                    <View className='iconfont iconxiangyouxuanzejiantoux choose-arrow'></View>
                  </View>
                  : null
              }
              <View className='public-item first-public-item'>
                <View className='public-label'>姓名</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请填写姓名'
                    value={username}
                    onInput={this.onUsernameInput}
                  ></Input>
                </View>
              </View>
              <View className='public-item'>
                <View className='public-label'>手机号</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请填写手机号'
                    value={mobile}
                    onInput={this.onMobileInput}
                  ></Input>
                </View>
              </View>
              <View className='public-item'>
                <View className='public-label'>办理城市</View>
                <View className='public-content' onClick={this.navigatorToChooseCity}>
                  {
                    locationName ?
                      <Text className='public-price'>{locationName}</Text>
                      :
                      <Text className='public-no-check-text'>请选择城市</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </View>
              </View>
            </View>
            <View className='public-wrapper first-public-item' >
              {
                carProxyBusinessListRender
              }
              <View className='public-item'>
                <View className='public-label'>备注</View>
                <View className='public-content'>
                  <Input
                    className='public-input'
                    placeholder-class='placeholder-class'
                    placeholder='请输入车务相关备注信息'
                    value={remark}
                    onInput={this.onRemarkInput}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='return-address-wrapper'>
              <View className='public-item'>
                <View className='important'>*</View>
                <View className='public-label lang-label'>材料回寄信息</View>
                <View className='public-content' onClick={this.navigatorChooseCityAndArea}>
                  {
                    mailingLocationName ?
                      <Text className='public-no-check-text font-color'>
                        {
                          mailingLocationName.length > 13 ?
                            mailingLocationName.substr(0, 12) + '...'
                            : mailingLocationName
                        }
                      </Text>
                      :
                      <Text className='public-no-check-text'>请选择省-市-区/县</Text>
                  }
                  <Text className='iconfont iconxiangyouxuanzejiantoux icon-style-right'></Text>
                </View>
              </View>
              <View className='textarea-wrapper'>
                {
                  mailingAddress.length < 1 && (
                    <View className='lick-placeholder-wrapper'>
                      <View className='placeholder-class'>请输入详细地址</View>
                      <View className='placeholder-class'>例如：海淀区定慧北里23号蓝宏中心</View>
                    </View>
                  )
                }
                <Textarea
                  className='textarea'
                  value={mailingAddress}
                  onInput={this.onAddressInput}
                ></Textarea>
              </View>
            </View>
            <View className='bottom-tips'>注：请准确填写以上信息，以便我们更好的为您安排业务！</View>
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='total'>合计:¥{totalPrice / 100}</View>
          <View className='order-btn' onClick={this.submitOrder}>立即下单({allChooseBusinessList.length})</View>
        </View>
        <CallService phoneNumberType='carProxy' />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(CarProxyPublish)