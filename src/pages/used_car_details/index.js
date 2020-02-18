/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-18 10:52:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-18 12:46:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text
} from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import api from '@api/index.js'

import './index.styl'

class UsedCarDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      bannerList: []
    }
  }

  componentDidMount() {
  }
  showBigImage() {
    
  }
  bannerChange(event) { 
    console.log('event', event)
    // event.detail = {current, source}
  }
  config = {
    navigationBarTitleText: '车源详情' 
  }

  render() {
    let { bannerList} = this.state
    const bannerListRender = bannerList.map(item => {
      const key = item.id
      return (
        <SwiperItem key={key}>
          <View className='banner-item'>
            <Image
              className='banner-image'
              src={item.img}
              onClick={this.showBigImage.bind(this, item)}
            ></Image>
          </View>
        </SwiperItem>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='des-wrapper'>
          <View className='banner-wrapper'>
            <Swiper
              className='swiper'
              autoplay
              circular
              indicatorActiveColor='#ffffff'
              interval='3000'
              onChange={()=>this.bannerChange}
            >
              {
                bannerList.length ?
                  bannerListRender
                  :
                  <SwiperItem></SwiperItem>
              }
            </Swiper>
            <View className='doc-wrapper'>
              22/22
            </View>
          </View>
          <View className='details-title-wrapper'>
            <View className='details-price'>
              <Text className='money'>99.99</Text>
              <Text className='money-text'>万</Text>
              <Text className='history-icon iconfont iconliulan'></Text>
              <Text className='history-text'>99</Text>
              <Text className='history-icon iconfont iconlianxiwomen'></Text>
              <Text className='history-text'>99</Text>
            </View>
            <View className='details-title'>大众 帕萨特 2007款 1.8T 手动舒适型</View>
          </View>
          <View className='title'>车辆档案</View>
          <View className='main main-des'>
            <View className='des-line'>
              <View className='des-item long'>
                <Text className='item-title'>首次上牌</Text>
                <Text className='item-des'>2007-06</Text>
              </View>
              <View className='des-item'>
                <Text className='item-title short'>里程</Text>
                <Text className='item-des'>2007-06</Text>
              </View>
            </View>
            <View className='des-line'>
              <View className='des-item long'>
                <Text className='item-title'>排放</Text>
                <Text className='item-des'>国四</Text>
              </View>
              <View className='des-item'>
                <Text className='item-title short'>排量</Text>
                <Text className='item-des'>2.0L</Text>
              </View>
            </View>
            <View className='des-line'>
              <View className='des-item long'>
                <Text className='item-title'>所在城市</Text>
                <Text className='item-des'>北京</Text>
              </View>
              <View className='des-item'>
                <Text className='item-title short'>车龄</Text>
                <Text className='item-des'>12年8个月</Text>
              </View>
            </View>
          </View>
          <View className='title'>其他说明</View>
          <View className='main'>
            <View className='remark'>
              本车没出现过重大事故和水淹火烧的情况，后保险杠有改装，车架件完好，车体外观局部有瑕疵，漆面有进行过维修，内饰大体干净整洁，发动机有异常，变速箱工况良好，车辆灯光功能配置无故障无损坏，防冻液需补充。
            </View>
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn'>
            联系卖家
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
export default connect(mapStateToProps)(UsedCarDetails)