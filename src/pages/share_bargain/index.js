/*
 * @Author: liuYang
 * @description: 分享砍价
 * @Date: 2019-11-05 13:24:34
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-11 16:33:12
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
  SwiperItem,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import login from '@utils/login.js'
import api from '@api/index.js'
import {
  interValCountDown,
  timerPercent
} from '@utils/timer_handle.js'
import {
  getUserInfo,
  requestBargain
} from '@utils/get_user_info.js'
// eslint-disable-next-line no-unused-vars
import BargainBox from '@c/bargain/index.js'
import noBargainImage from '@img/bargain/no_bargain.png'
import { defaultResourceConfigURL } from '@config/request_config.js'
import classNames from 'classnames'
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
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      progress: 0.1,
      userPhoto: '',
      nickName: '',
      userInfoFromWX: null,  // 微信用户信息
      showBargainBox: false, // 砍价成功或者遗憾的框
      bargainPrice: '', // 砍了多少钱
      showStrategyFlag: false, // 展示砍价攻略
      strategyDataList: [],
      canBargain: 0,
      tipContent : ''
    }
    this.timer = null
    this.pageParams = {}
    this.loadingTimer = null
  }
  
  async componentDidMount() {
    this.pageParams = this.$router.params
    console.log(this.pageParams)
    await login.getCode(this) // 登录   
    let { userInfo } = this.props
    if (+userInfo.userId === +this.pageParams.c_id) {
      let str = ''
      for (let i in this.pageParams) {
        str += i + '=' + this.pageParams[i] + '&'
      }
      Taro.redirectTo({
        url: `/pages/order_details/index?${str}`
      })
    }
    this.getBargainDetails()
    this.getSwiperHeight()
    this.getStrategy()
  }
  componentWillUnmount() {
    Taro.hideLoading()
    clearTimeout(this.loadingTimer)
    clearInterval(this.timer)
  }
  /**
   * 获取微信授权信息
   * @return void
   */
  async handleWXUserInfo() { 
    let wxUserInfo = await getUserInfo()
    this.setState({
      userInfoFromWX: wxUserInfo
    })
  }
  /**
   * 计算一屏幕几个item合适
   * @return void
   */
  getSwiperHeight() { 
    const query = Taro.createSelectorQuery()
    query.select('#swiper').boundingClientRect()
    query.exec((res) => {
      const height = res[0].height - 32
      const number = Math.floor(height / (44))
      console.log(number + ' 个 swiper item')
      this.setState({
        swiperNumber:  number
      })
    })
  }
  /**
   * 获取砍价详情 
   * @return void
   */
  getBargainDetails(showLoading = false) {
    if (showLoading) {
      this.loadingTimer = setTimeout(() => {
        Taro.showLoading({
          title: '加载中...',
          mask: true
        })
      }, 350)
    }
    let sendData = {
      orderCode: this.pageParams.order_code
    }
    api.order.getOrderBargainDetail(sendData, this)
      .then(res => {
        let dueTime = Number(new Date(res.dueTime)) // 目标时间
        let startTime = Number(new Date(res.startTime)) // 开始时间
        let progress = timerPercent(dueTime, startTime)
        progress = progress > 100 ? 0 : progress
        this.countDown(dueTime, startTime)
        this.setState({
          bargainList: res.bargainRecordList || [],
          sendCityName: res.sendCityName,
          receiveCityName: res.receiveCityName,
          summary: res.summary,
          carInfo: res.carInfo,
          bargainTotalPrice: res.bargainTotalPrice,
          userPhoto: res.userPhoto,
          nickName: decodeURIComponent(res.nickName),
          canBargain: res.canBargain,
          tipContent: res.tipContent,
          progress
          // carAmount: res.carAmount
        })
        Taro.hideLoading()
        clearTimeout(this.loadingTimer)
      })
  }
  /**
   * 倒计时函数
   * @param {Number} targetTimeStamp 结束时间
   * @param {Number} startTimeStamp 开始时间
   * @return void
   */
  countDown(targetTimeStamp, startTimeStamp) {
    interValCountDown({
      targetTimeStamp,
      startTimeStamp,
      that: this
    })
  }
  /**
   * 点了砍价按钮
   * @return void
   */
  submit(e) {
    let {
      progress,
      bargainPrice,
      userInfoFromWX,
      canBargain,
      tipContent,
    } = this.state
    let { userInfo } = this.props
    if (progress > 0) { // 活动进行中
      if (!canBargain) {
        Taro.showToast({
          title: tipContent,
          icon: 'none'
        })
        return
      }
      if (bargainPrice) {
        Taro.showToast({
          title: '您已经砍过价了哦~',
          icon: 'none'
        })
        return
      }
      Taro.showLoading({
        title: '砍价中...',
        mask: true
      })
      if (userInfo.userId) { // 是已注册过的用户
        if (userInfoFromWX) { // 如果能获取到微信授权
          requestBargain(this).then(res => {
            if (res) {
              this.setState({
                bargainPrice: (res / 100).toFixed(2),
                showBargainBox: true
              })
              this.getBargainDetails(false)
            } else {
              Taro.showToast({
                title: '您已经砍过价，不能再次砍价',
                icon: 'none'
              })
            }
          })
        } else { // 获取不到授权的点击这个按钮会获取授权
          const wxUserInfo = e.target.userInfo
          if (!wxUserInfo) {
            Taro.hideLoading()
            Taro.showToast({
              title: '需要获取您的头像和昵称才能砍价哦~',
              icon: 'none',
              duration: 3000
            })
            return
          }
          this.setState({
            userInfoFromWX: wxUserInfo
          }, () => {
            requestBargain(this).then(res => {
              if (res) { 
                this.setState({
                  bargainPrice: (res / 100).toFixed(2),
                  showBargainBox: true
                })
                this.getBargainDetails(false)
              } else {
                Taro.showToast({
                  title: '您已经砍过价，不能再次砍价',
                  icon: 'none'
                })
              }
            })
          })
        }
      } else { // 没有注册过的用户去注册
        this.navigatorToRegister()
      }
    } else { // 活动结束
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }
  }
  /**
   * 导航到注册
   * @return void
   */
  navigatorToRegister() { 
    Taro.hideLoading()
    let str = ''
    for (let i in this.pageParams) {
      str += i + '=' + this.pageParams[i] + '&'
    }
    Taro.navigateTo({
      url: `/pages/register/index?${str}`
    })
  }
  /**
   * 点击了砍价框里的什么
   * @param {String} e btn就是点击了里面的我要发车
   * @return void
   */
  bargainBoxClick(e) { 
    if (e === 'btn') { // 点击我知道了或者我要发车就去首页
      Taro.switchTab({
        url: `/pages/index/index`
      })
    } else {
      this.setState({
        showBargainBox: false
      })
    }
  }
  /**
   * 显示攻略
   * @return void
   */
  showStrategy() { 
    this.setState({
      showStrategyFlag: !this.state.showStrategyFlag
    })
  }
  /**
   * 获取砍价攻略
   * @return void
   */
  getStrategy() {
    Taro.request({
      url: `${defaultResourceConfigURL}strategy.json`,
      method: 'get',
      success: (res) => {
        this.setState({
          strategyDataList: res.data
        })
      }
    })
  }
  catchSwiperMove(e) { 
    e.stopPropagation()
  }
  onShareAppMessage() {
    let str = ''
    for (let i in this.pageParams) {
      str += i + '=' + this.pageParams[i] + '&'
    }
    let path = `/pages/share_bargain/index?${str}`
    let title = `我要运车,需要大侠助我一臂之力!!!`
    let imageUrl = `https://resource.paoche56.com/paochelogistics/mp_img/share_to_bargain.png`
    return {
      title: title,
      path: path,
      imageUrl
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
      day,
      hour,
      minute,
      second,
      progress,
      userPhoto,
      nickName,
      userInfoFromWX,
      showBargainBox,
      bargainPrice,
      strategyDataList,
      showStrategyFlag
    } = this.state
    const bargainSwiperListRender = bargainList.map(item => {
      const key = item.id
      const NickName = decodeURIComponent(item.nickName) || ''
      return (
        <SwiperItem className='swiper-item' key={key} onTouchMove={this.catchSwiperMove}>
          <View className='userInfo-wrapper'>
            <View className='user-icon'>
              <Image src={item.userPhoto}></Image>
            </View>
            <View className='user-name'>{NickName}</View>
          </View>
          <View className='bargain-price'>砍掉{(item.bargainPrice / 100).toFixed(2)}元</View>
        </SwiperItem>
      )
    })
    const bargainViewListRender = bargainList.map(item => {
      const key = item.id
      const NickName = decodeURIComponent(item.nickName) || ''
      return (
        <View className='swiper-item' key={key}>
          <View className='userInfo-wrapper'>
            <View className='user-icon'>
              <Image src={item.userPhoto}></Image>
            </View>
            <View className='user-name'>{NickName}</View>
          </View>
          <View className='bargain-price'>砍掉{(item.bargainPrice / 100).toFixed(2)}元</View>
        </View>
      )
    })
    const strategyList = strategyDataList.map(item => {
      const textClassName = classNames('strategy-font', {
        'strategy-font-weight': item.weight 
      })
      return (
        <View className={textClassName} key={item}>
          { item.text }
        </View>
      )
    })
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
                {
                  day > 0 ?
                    <Block>
                      <Text className='timer-box'>{day}</Text>
                      <Text>天</Text>
                    </Block>
                    : null
                }
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
            {
              progress ?
                userInfoFromWX ? 
                  <Button className='btn' onClick={this.submit} >帮砍一刀</Button>
                  :
                  <Button className='btn' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.submit}>帮砍一刀</Button>
                : <Button className='btn' onClick={this.submit}>我也要发车</Button>
            }
          </View>
          <View className='bargain-list'>
            <View className='bargain-title'>
              <View className='bargain-now'>已砍掉{bargainTotalPrice || "0.00"}元</View>
              <View
                className='bargain-strategy'
                onClick={this.showStrategy}
              >
                <Text className='iconfont iconwenhao icon-style-strategy'></Text>
                <Text className='bargain-strategy-text'>砍价攻略</Text>
              </View>
            </View>
            <View className='bargain-main' id='swiper'>
              {
                bargainList.length ? 
                  <Block>
                    {
                      bargainList.length > swiperNumber ?
                        <Swiper
                          autoplay
                          vertical
                          circular
                          displayMultipleItems={swiperNumber}
                          className='swiper'
                        >
                          {
                            bargainSwiperListRender
                          }
                        </Swiper>
                        :
                        <View className='swiper'>
                          {
                            bargainViewListRender
                          }
                        </View>
                    }
                  </Block>
                  : 
                  <View className='no-bargain-wrapper'>
                    <View className='no-bargain-image'>
                      <Image src={noBargainImage}></Image>
                    </View>
                    <Button className='no-bargain-btn' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.submit}>抢沙发~</Button>
                  </View>
              }
            </View>
          </View>
        </View>
        <BargainBox
          show={showBargainBox}
          type='bargain'
          price={bargainPrice}
          onClick={this.bargainBoxClick.bind(this)}
        ></BargainBox>
        {
          showStrategyFlag ? 
            <View className='bargain-strategy-wrapper'>
              <View className='strategy-box'>
                <View className='strategy-title'>砍价攻略</View>
                <View className='line'></View>
                <View className='strategy-content'>
                  {
                    strategyList
                  }
                </View>
                <View className='strategy-button' onClick={this.showStrategy}>我知道了</View>
              </View>
            </View>
            :null
        }
        <View className='public left'></View>
        <View className='public right'></View>
        <View className='public bottom'></View>
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