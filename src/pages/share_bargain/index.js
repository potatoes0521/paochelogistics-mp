/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-05 13:24:34
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-07 14:27:00
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
import {
  countDown,
  timerPercent
} from '@utils/timer_handle.js'
import {
  getSetting,
  getUserInfo,
  requestBargain
} from '@utils/get_user_info.js'
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
      bargainTotalPrice: '0.00',
      // carAmount: '',
      hour: 0,
      minute: 0,
      second: 0,
      progress: 0.1,
      userPhoto: '',
      nickName: '',
      userInfoFromWX: null
    }
    this.timer = null
    this.timeCountNumber = 43200000  // 砍价多少个小时
    this.pageParams = {}
  }
  
  async componentDidMount() {
    this.pageParams = this.$router.params
    console.log(this.pageParams)
    await login.getCode(this) // 登录    
    this.getBargainDetails()
    this.getSwiperHeight()
  }
  componentWillUnmount() {
    clearInterval(this.timer)
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
        res.dueTime = 1573139471000
        this.timeCountNumber = res.timeCountNumber || 43200000
        let time = Number(new Date(res.dueTime))
        let progress = timerPercent(time, (time - this.timeCountNumber))
        progress = progress > 100 ? 0 : progress
        this.setState({
          bargainList: res.bargainRecordList || [],
          sendCityName: res.sendCityName,
          receiveCityName: res.receiveCityName,
          summary: res.summary,
          carInfo: res.carInfo,
          bargainTotalPrice: res.bargainTotalPrice,
          userPhoto: res.userPhoto,
          nickName: res.nickName,
          progress
          // carAmount: res.carAmount
        })
        this.countDown(res.dueTime)
        Taro.hideLoading()
      })
  }
  /**
   * 倒计时函数
   * @param {Type} targetTimeStamp 参数描述
   * @return void
   */
  countDown(targetTimeStamp) {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      let time = Number(new Date(targetTimeStamp))
      let nowTime = new Date().getTime()
      let num = countDown(time, nowTime)
      let progress = timerPercent(time, (time - this.timeCountNumber))
      progress = progress > 100 ? 0 : progress
      if (!num) {
        clearInterval(this.timer)
        this.setState({
          hour: 0,
          minute: 0,
          second: 0,
          progress
        })
      } else {
        let { hour, minute, second } = num
        this.setState({
          hour,
          minute,
          second,
          progress
        })
      }
    }, 1000)
  }
  /**
   * 点了砍价按钮
   * @return void
   */
  async submit() {
    let { progress, userInfoFromWX } = this.state
    let { userInfo } = this.props
    if (progress > 0) { // 活动进行中
      if (userInfo.userId) { // 是已注册过的用户
        let wxUserInfo = await getUserInfo()
        if (wxUserInfo) {
          this.setState({
            userInfoFromWX: wxUserInfo
          }, () => {
            requestBargain(this)
          })
        }
      } else {
        let str = ''
        for (let i in this.pageParams) {
          str += i + '=' + this.pageParams[i] + '&'
        }
        Taro.navigateTo({
          url: `/pages/register/index?${str}`
        })
      }
    } else { // 活动结束
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }
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
      bargainTotalPrice,
      // carAmount,
      hour,
      minute,
      second,
      progress,
      userPhoto,
      nickName
    } = this.state
    const bargainSwiperListRender = bargainList.map(item =>
      <SwiperItem className='swiper-item' key={item}>
        <View className='userInfo-wrapper'>
          <View className='user-icon'>
            <Image src={item.userPhoto}></Image>
          </View>
          <View className='user-name'>{item.nickName || ''}</View>
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
          <View className='user-name'>{item.nickName || ''}</View>
        </View>
        <View className='bargain-price'>砍掉{(item.bargainPrice / 100).toFixed(2)}元</View>
      </View>
    )
    return (
      <View className='page-wrapper'>
        <View className='wrapper-main'>
          <View className='order-user-info'>
            <View className='order-user-icon'>
              <Image src={userPhoto}></Image>
            </View>
            <View className='order-user-msg'>
              <View className='user-nick-name'>{nickName  || ''}</View>
              <View className='user-summary'>{summary}</View>
            </View>
          </View>
          <View className='order-msg'>
            <Text>{sendCityName}</Text>
            <Text className='iconfont iconjiantou_qiehuanyou icon-style'></Text>
            <Text>{receiveCityName}</Text>
            <Text className='car-info'>{carInfo}</Text>
          </View>
          {
            progress > 0 ?
              <View className='timer'>
                <Text className='text'>还剩</Text>
                <Text className='timer-box'>{hour}</Text>
                <Text>:</Text>
                <Text className='timer-box'>{minute}</Text>
                <Text>:</Text>
                <Text className='timer-box'>{second}</Text>
                <Text className='text'>过期</Text>
              </View>
              :
              <View className='timer timer-tips'>
                <Text className='iconfont icongantanhao icon-style'></Text>
                <Text className='tip'>活动已结束</Text>
              </View>
          }
          <View className='timer-progress'>
            <View className='progress-fill' style={{width: progress + '%'}}></View>
          </View>
          <View className='bargain-wrapper'>
            <Button
              className='btn'
              onClick={this.submit}
            >
              {progress > 0 ? '帮砍一刀' : '我也要发车'}
            </Button>
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