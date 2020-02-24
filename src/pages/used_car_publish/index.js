/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-18 14:00:58
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-24 10:42:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image,
  Input,
  Picker,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { handleMoney } from '@utils/patter.js'
import { uploadImage } from '@api/upload_request_handle.js'
import api from '@api/index.js'
import EmptyData from '@c/empty_data/index.js'
import Storage from '@utils/storage.js'
import UsedCarItem from '../used_car/components/used_car_item/index.js'
import './index.styl'

class UsedCarPublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      locationId: '', //城市ID
      locationName: '',
      brandId: '', //品牌Id
      brandName: '', //品牌Id
      carSerial: '', //车型
      yearType: '', //年款
      carBasic: '', //车款
      carPrice: '', //价格
      onTheCardTime: '', //首次上牌时间
      mileage: '', //	里程数
      gasDisplacement: '', //汽车排量
      effluentStandard: '', //排放标准
      usedType: 2, //车辆性质 1新车 2二手车
      carImg: [], //车辆照片
      remark: '', //备注,
      activeIndex: 0,
      userId: 0,
      realName: '',
      minePublishList: [],
      initYearArray: []
    }
    this.pageParams = {}
    this.timer = null
    this.usedCarPage = 1
    this.usedCarFlag = false
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    if (this.pageParams.pageType === 'edit') {
      this.getCarSourceDetails()
    }
    this.usedCarPage = 1
    this.usedCarFlag = false
    this.getMinePublish({})
    this.initYearType()
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
  }
  initYearType() { 
    let date = (new Date()).getFullYear()
    let yearArr = [];
    for (let i = 0; i < date - 1999; i++) {
      let year = i > 9 ? i : '0' + i
      yearArr.push('20' + year + '年')
    }
    this.setState({
      initYearArray: yearArr
    })
  }
  getMinePublish({
      pageSize = 10,
      pageNum = this.usedCarPage,
      usedType=2
    }) {
    let sendData = {
      pageNum,
      pageSize,
      usedType
    }
    let {minePublishList} = this.state
    api.car.getMinePublish(sendData, this).then(res => {
      if (!res) return
      if (res && res.length < pageSize) {
        this.usedCarFlag = true
      }
      this.usedCarPage += 1
      if (pageNum === 1) {
        this.setState({
          minePublishList: [...res]
        })
      } else {
        this.setState({
          minePublishList: [...minePublishList, ...res]
        })
      }
    })
  }
  /**
   * 获取车源详情
   * @return void
   */
  getCarSourceDetails() {
    if (!this.pageParams.carSourceId) {
      Taro.showToast({
        icon: 'none',
        title: 'carSourceId is null'
      })
      return;
    }
    let sendData = {
      carSourceId: this.pageParams.carSourceId
    }
    api.car.getCarSourceDetails(sendData, this).then(res => {
      if (!res) return
      res.carPrice = res.carPrice / 100
      res.mileage = res.mileage / 100
      res.onTheCardTime = res.onTheCardTime.split('-01')[0]
      res.brandName = res.masterBrandName
      res.carImg = res.imgUrls
      res.userId = res.userId
      res.realName = res.userName
      this.setState(res)
    })
  }
  changeTab(index) { 
    this.setState({
      activeIndex: index
    })
  }
  /**
   * 输入车辆车型
   * @param {Object} event event对象
   * @return void
   */
  inputCarSerial(event) {
    this.setState({
      carSerial: event.target.value
    })
  }
  /**
   * 输入车辆车款
   * @param {Object} event event对象
   * @return void
   */
  inputCarBasic(event) {
    this.setState({
      carBasic: event.target.value
    })
  }
  /**
   * 输入里程数
   * @param {Object} event event对象
   * @return void
   */
  inputMileage(event) {
    let value = handleMoney(event.target.value)
    this.setState({
      mileage: value
    })
    return value
  }
  /**
   * 输入售价
   * @param {Object} event event对象
   * @return void
   */
  inputCarPrice(event) {
    let value = handleMoney(event.target.value)
    this.setState({
      carPrice: value
    })
    return value
  }
  /**
   * 汽车排量
   * @param {Object} event event对象
   * @return void
   */
  inputGasDisplacement(event) { 
    this.setState({
      gasDisplacement: event.target.value
    })
  }
  onChooseYearType(event) {
    let {initYearArray} = this.state
    this.setState({
      yearType: initYearArray[event.target.value] && initYearArray[event.target.value].split('年')[0]
    })
  }
  onChooseTheCardTime(event) {
    this.setState({
      onTheCardTime: event.target.value
    })
  }
  chooseEffluentStandard() {
    let list = ['国III', '国IV', '国V', '国VI']
    Taro.showActionSheet({
        itemList: list
      })
      .then(res => {
        this.setState({
          effluentStandard: list[res.tapIndex]
        })
      })
      .catch(err => console.log(err.errMsg))
  }
  deleteImage(index) {
    let {carImg} = this.state
    carImg.splice(index, 1)
    this.setState({carImg})
  }
  upLoadImage() { 
    let count = 9
    let businessType = 10
    let { carImg } = this.state
    count-= carImg.length 
    uploadImage({
      count: count,
      that: this,
      businessType
    }).then(res => {
      this.setState({
        carImg: [...carImg, ...res]
      })
    })
  }
  navigatorTo(pageName) {
    switch (pageName) {
      case 'choose_start_city':
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=start`
        })
        return
      case 'choose_target_city':
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=target`
        })
        return
      case 'choose_sell_city':
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=sell`
        })
        return
      case 'choose_through_city':
        Storage.setStorage('through_city', {
          id: this.state.throughCitys,
          name: this.state.throughCitiesName
        })
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=through`
        })
        return
      case 'choose_car_brand':
        Taro.navigateTo({
          url: `/pages/choose_city/index?type=sell&pageType=car`
        })
        return
      case 'remark':
        Storage.setStorage('used_car', this.state.remark)
        Taro.navigateTo({
          url: `/pages/remark/index?pageType=used_car`
        })
        return
      case 'choose_customer':
        Taro.navigateTo({
          url: '/pages/customer_info/index?pageType=choose'
        })
        return
      default:
        return
    }
  }
  submit() { 
    let testingList = {
      brandId: '请选择汽车品牌', //品牌Id
      brandName: '请选择汽车品牌', //品牌Id
      carImg: '请上传汽车图片', //车辆照片
      carPrice: '请输入期望价格', //价格
      // carPriceZero: '期望价格不能为0', //价格
      carBasic: '请输入车款', //车款
      carSerial: '请输入车型', //车型
      effluentStandard: '请选择排放标准', //排放标准
      gasDisplacement: '请填写汽车排量', //汽车排量
      locationId: '请选择卖车城市', //城市ID
      locationName: '请选择卖车城市',
      mileage: '请填写里程数', //	里程数
      // mileageZero: '里程数不能为0', 
      onTheCardTime: '请选择首次上牌时间', //首次上牌时间
      yearType: '请选择年款', //年款
      userId: '请选择代下单的客户', //年款
    }
    let breakName = ''
    let { userInfo } = this.props
    let { mileage, carPrice } = this.state
    if (userInfo.userType === 0 && !this.state.userId) {
      breakName = 'userId'
    }
    for (let i in testingList) {
      if (i === 'remark' || i === 'activeIndex' || i === 'userId' || i === 'realName') {
        continue
      }
      // if (this.pageParams.pageType !== 'edit' && i === 'carSourceId') {
      //   continue
      // }
      if (i !== 'carImg' && !this.state[i]) {
        breakName = i
        break
      } 
      if (i === 'carImg' && this.state['carImg'].length === 0) {
        breakName = i
        break
      }
    }
    if (breakName) {
      Taro.showToast({
        title: testingList[breakName],
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (Number(mileage) <= 0) {
      Taro.showToast({
        title: '里程数不能为0',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (Number(carPrice) <= 0) {
      Taro.showToast({
        title: '期望价格不能为0',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let sendData = Object.assign({}, this.state)
    if (this.pageParams.pageType === 'edit') {
      sendData.carSourceId = this.pageParams.carSourceId
    }
    sendData.carPrice = sendData.carPrice* 1000 / 10
    sendData.mileage = sendData.mileage* 1000 / 10
    sendData.onTheCardTime += '-01'
    if (!sendData.userId) {
      sendData.userId = this.props.userInfo.userId
    }
    delete sendData['onTheCardTimeDesc']
    api.car.submitPublish(sendData, this).then(res => {
      if (this.pageParams.pageType === 'edit') {
        Taro.showToast({
          title: '编辑成功',
          icon: 'none',
          duration: 2000
        })
        this.timer = setTimeout(() => {
          Taro.navigateBack()
        }, 1900)
      } else {
        Taro.showToast({
          title: '发布成功',
          icon: 'none',
          duration: 2000
        })
        this.timer = setTimeout(() => {
          Taro.redirectTo({
            url: `/pages/used_car_details/index?carSourceId=${res.carSourceId}`
          })
        }, 1900)
      }
    })
  }
  onLowerPublish() { 
    this.usedCarPage = 1
    this.usedCarFlag = false
    this.getMinePublish({})
  }
  onClickEditBtn(item) {
    this.changeTab(0)
    this.pageParams.pageType === 'edit'
    this.pageParams.carSourceId = item.carSourceId
    this.getCarSourceDetails()
  }
  publishBtn() { 
    this.pageParams.pageType === 'publish'
    this.setState({
      locationId: '', //城市ID
      locationName: '',
      brandId: '', //品牌Id
      brandName: '', //品牌Id
      carSerial: '', //车型
      yearType: '', //年款
      carBasic: '', //车款
      carPrice: '', //价格
      onTheCardTime: '', //首次上牌时间
      mileage: '', //	里程数
      gasDisplacement: '', //汽车排量
      effluentStandard: '', //排放标准
      usedType: 2, //车辆性质 1新车 2二手车
      carImg: [], //车辆照片
      remark: '', //备注,
      userId: 0,
      realName: '',
    })
    this.changeTab(0)
  }
  /**
   * 上拉触底
   * @return void
   */
  onReachBottom() {
    console.log('触底')
    if (this.usedCarFlag) return
    this.getMinePublish({})
  }
  config = {
    navigationBarTitleText: '车源发布' 
  }

  render() {
    let {
      activeIndex,
      carImg,
      brandName, //品牌
      carPrice, //价格
      carBasic, //车款
      carSerial, //车型
      effluentStandard, //排放标准
      gasDisplacement, //汽车排量
      mileage, //	里程数
      onTheCardTime, //首次上牌时间
      yearType, //年款
      remark, //备注
      locationName,
      minePublishList,
      realName,
      initYearArray
    } = this.state
    let { userInfo } = this.props
    const publishTabClassName = classNames('tab-item', {
      'tab-item-active': activeIndex === 0
    })
    const historyTabClassName = classNames('tab-item', {
      'tab-item-active': activeIndex === 1
    })
    const carImgRenderList = carImg.map((item, index) => {
      return (
        <View className='image-item' key={item}>
          <Image src={item} mode='aspectFill'></Image>
          <Text onClick={this.deleteImage.bind(this, index)} className='delete-btn iconfont iconguanbi1'></Text>
        </View>
      )
    })
    const minePublishListRender = minePublishList.map(item => {
      const key = item.carSourceId
      return (
        <UsedCarItem
          key={key}
          item={item}
          from='publish'
          onHandleSoldOut={this.onLowerPublish.bind(this)}
          onClickEditBtn={this.onClickEditBtn.bind(this)}
        ></UsedCarItem>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='tab-wrapper'>
          <View className={publishTabClassName} onClick={this.changeTab.bind(this, 0)}>发布车源</View>
          <View className='vertical-line'></View>
          <View className={historyTabClassName} onClick={this.changeTab.bind(this, 1)}>发布记录</View>
        </View>
        {
          activeIndex === 0 ?
            <View className='tab-panel'>
              <View className='tab-panel-main'>
                <View className='publish-card'>
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
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label'>卖车城市</View>
                    <View className='publish-content' onClick={this.navigatorTo.bind(this, 'choose_sell_city')}>
                      {
                        locationName ? <Text className='content-text'>{locationName}</Text> :
                          <Text className='placeholder-style'>请选择</Text>
                      }
                      <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label'>品牌</View>
                    <View className='publish-content'  onClick={this.navigatorTo.bind(this, 'choose_car_brand')}>
                      {
                        brandName ? <Text className='content-text'>{brandName}</Text> :
                          <Text className='placeholder-style'>请选择</Text>
                      }
                      <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label'>车型</View>
                    <View className='publish-content'>
                      <Input
                        className='input'
                        placeholder='请输入汽车车型，如朗逸'
                        placeholderClass='placeholder-style'
                        maxlength='15'
                        value={carSerial}
                        onInput={this.inputCarSerial}
                      ></Input>
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label'>年款</View>
                    <View className='publish-content'>
                      <Picker
                        className='time-picker'
                        mode='selector'
                        range={initYearArray}
                        onChange={this.onChooseYearType}
                        fields='year'
                      >
                        {
                          yearType ? <Text className='content-text'>{yearType}</Text> : <Text className='placeholder-style'>请选择</Text>
                        }
                      </Picker>
                      <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label'>车款</View>
                    <View className='publish-content'>
                      <Input
                        className='input'
                        placeholder='请输入汽车车款，如经典版'
                        placeholderClass='placeholder-style'
                        maxlength='15'
                        value={carBasic}
                        onInput={this.inputCarBasic}
                      ></Input>
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label long-label'>首次上牌时间</View>
                    <View className='publish-content'>
                      <Picker
                        className='time-picker'
                        mode='date'
                        onChange={this.onChooseTheCardTime}
                        fields='month'
                      >
                        {
                          onTheCardTime ? <Text className='content-text'>{onTheCardTime}</Text> : <Text className='placeholder-style'>请选择</Text>
                        }
                      </Picker>
                      <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label long-label'>行驶里程</View>
                    <View className='publish-content'>
                      {/* <Text className='content-text'></Text> */}
                      <Input
                        type='digit'
                        className='input'
                        placeholder='请输入公里数'
                        placeholderClass='placeholder-style'
                        maxlength='10'
                        value={mileage}
                        onInput={this.inputMileage}
                      ></Input>
                      <Text className='content-text margin-text'>万公里</Text>
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label long-label'>汽车排量</View>
                    <View className='publish-content'>
                      <Input
                        className='input'
                        placeholder='请输入汽车排量'
                        placeholderClass='placeholder-style'
                        maxlength='10'
                        value={gasDisplacement}
                        onInput={this.inputGasDisplacement}
                      ></Input>
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label long-label'>排放标准</View>
                    <View className='publish-content' onClick={this.chooseEffluentStandard.bind(this)}>
                      {
                        effluentStandard ? <Text className='content-text'>{effluentStandard}</Text>
                          : <Text className='placeholder-style'>请选择</Text>
                      }
                      <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item'>
                    <View className='must-icon'>*</View>
                    <View className='publish-label long-label'>期望售价</View>
                    <View className='publish-content'>
                      <Input
                        type='digit'
                        className='input'
                        placeholder='请输入价格'
                        placeholderClass='placeholder-style'
                        maxlength='10'
                        value={carPrice}
                        onInput={this.inputCarPrice}
                      ></Input>
                      <Text className='content-text margin-text'>万元</Text>
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item-image'>
                    <View className='publish-item publish-item-image-title'>
                      <View className='must-icon'>*</View>
                      <View className='publish-label long-label'>车源照片</View>
                    </View>
                    <View className='image-list'>
                      {
                        carImgRenderList
                      }
                      {
                        carImg.length < 9 ? 
                          <View className='image-item add-btn' onClick={() => this.upLoadImage()}>
                            <View className='add-btn-wrapper'>
                              <Text className='iconfont iconjiahao icon-add'></Text>
                            </View>
                          </View>
                          : null
                      }
                      {
                        carImg.length === 0 && (
                          <View className='tips-only-one'>
                            至少上传一张车辆照片，最多上传9张
                          </View>)
                      }
                    </View>
                    <View className='images-tips'>
                      据统计，买车人更喜欢查看有图车源，图越多、售出率越高哦~
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='publish-item more-text'>
                    <View className='must-icon'></View>
                    <View className='publish-label long-label'>其他说明</View>
                    <View className='publish-content more-content' onClick={this.navigatorTo.bind(this, 'remark')}>
                      {
                        remark ? <Text className='content-text'>{remark}</Text> : 
                          <Block>
                            <Text className='placeholder-style'>补充说明车辆情况</Text>
                          </Block>
                      }
                      <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right more-content-icon'></Text>  
                    </View>
                  </View>
                </View>
                <View className='bottom-tips'>
                  <Text className='tips-title'>保护说明：</Text>
                  <Text className='tips-main'>
                    您的信息一经提交，可能会收到买车意向客户的咨询（如个人、经销商、中介机构等），请保持电话畅通并保证车辆信息的真实性。
                  </Text>
                </View>
              </View>
              <View className='btn-wrapper'>
                <View className='btn' onClick={()=>this.submit()}>
                  发布
                </View>
              </View>
            </View>
            :
            <Block>
              {
                minePublishList && minePublishList.length ?
                <View className='min-publish-wrapper'>
                  {
                    minePublishListRender
                  }
                </View>
                :
                <EmptyData pageType='car' onClickBtn={this.publishBtn.bind(this)}></EmptyData>
              }
            </Block>
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
export default connect(mapStateToProps)(UsedCarPublish)