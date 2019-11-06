/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-05 13:24:34
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-06 19:04:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import {
  View,
  Text,
  Button,
  Image,
  Swiper,
  SwiperItem
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import login from '@utils/login.js'
import api from '@api/index.js'

import './index.styl'

class ShareBargain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperNumber: 4,
      bargainList: [],
      sendCityName: '发车城市',
      receiveCityName: '收车城市',
      summary: '',
      carInfo: '',
      bargainTotalPrice: '0.00'
      // carAmount: ''
    }
    this.pageParams = {}
  }
  
  async componentDidMount() {
    this.pageParams = this.$router.params
    console.log(this.pageParams)
    await login.getCode(this) // 登录    
    this.getBargainDetails()
    this.getSwiperHeight()
  }
  
  getSwiperHeight() { 
    const query = Taro.createSelectorQuery()
    query.select('#swiper').boundingClientRect()
    query.exec((res) => {
      const height = res[0].height
      const number = Math.floor(height / 44)
      console.log(number + ' 个 swiper item')
      this.setState({
        swiperNumber:  number
      })
    })
  }

  getBargainDetails() {
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderBargainDetail(sendData, this)
      .then(res => {
        this.setState({
          bargainList: res.bargainRecordList || [],
          sendCityName: res.sendCityName,
          receiveCityName: res.receiveCityName,
          summary: res.summary,
          carInfo: res.carInfo,
          bargainTotalPrice: res.bargainTotalPrice
          // carAmount: res.carAmount
        })
        Taro.hideLoading()
      })
  }

  config = {
    navigationBarTitleText: '帮砍价'
  }
  render() {
    let {
      swiperNumber,
      bargainList,
      sendCityName,
      receiveCityName,
      summary,
      carInfo,
      bargainTotalPrice
      // carAmount
    } = this.state
    const bargainSwiperListRender = bargainList.map(item =>
      <SwiperItem className='swiper-item' key={item}>
        <View className='userInfo-wrapper'>
          <View className='user-icon'>
            <Image src={item.userPhoto}></Image>
          </View>
          <View className='user-name'>{item.nickName}</View>
        </View>
        <View className='bargain-price'>砍掉{(item.bargainPrice / 100).toFixed(2)}元</View>
      </SwiperItem>
    )
    const bargainViewListRender = bargainList.map(item => 
      <View className='swiper-item' key={item}>
        <View className='userInfo-wrapper'>
          <View className='user-icon'>
            <Image src={item.userPhoto}></Image>
          </View>
          <View className='user-name'>{item.nickName}</View>
        </View>
        <View className='bargain-price'>砍掉{(item.bargainPrice / 100).toFixed(2)}元</View>
      </View>
    )
    return (
      <View className='page-wrapper'>
        <View className='wrapper-main'>
          <View className='order-user-info'>{summary}</View>
          <View className='order-msg'>
            <Text>{sendCityName}</Text>
            <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
            <Text>{receiveCityName}</Text>
            <Text className='car-info'>{carInfo}</Text>
          </View>
          <View className='timer'>
            <Text className='text'>还剩</Text>
            <Text className='timer-box'>12</Text>
            <Text>:</Text>
            <Text className='timer-box'>12</Text>
            <Text>:</Text>
            <Text className='timer-box'>12</Text>
            <Text className='text'>过期</Text>
          </View>
          <View className='timer-progress'>
            <View className='progress-fill' style={{width: 70 + '%'}}></View>
          </View>
          <View className='bargain-wrapper'>
            <Button className='btn'>帮砍一刀</Button>
          </View>
          <View className='bargain-list'>
            <View className='bargain-title'>
              <View className='bargain-now'>已砍掉{bargainTotalPrice}元</View>
            </View>
            <View className='bargain-main'>
              {
                bargainList.length > swiperNumber ?
                  <Swiper
                    autoplay
                    vertical
                    circular
                    displayMultipleItems={swiperNumber}
                    className='swiper'
                    id='swiper'
                  >
                    {
                      bargainSwiperListRender
                    }
                  </Swiper>
                  :
                  <View
                    className='swiper'
                    id='swiper'
                  >
                    {
                      bargainViewListRender
                    }
                  </View>
            }
            
            </View>
          </View>
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
export default connect(mapStateToProps)(ShareBargain)