/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-18 14:00:58
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-19 11:45:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image,
  Input
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { handleMoney } from '@utils/patter.js'
// import api from '@api/index.js'

import './index.styl'

class UsedCarPublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      carSourceId: '',
      brandId: '', //品牌Id
      carImg: ['https://resource.paoche56.com/zhengmian.png'], //车辆照片
      carPrice: '', //价格
      carBasic: '', //车款
      carSerial: '', //车型
      effluentStandard: '', //排放标准
      gasDisplacement: '', //汽车排量
      locationId: '', //城市ID
      mileage: '', //	里程数
      onTheCardTime: '', //首次上牌时间
      yearType: '', //年款
      usedType: '', //车辆性质 1新车 2二手车
      remark: '', //备注
      activeIndex: 0
    }
  }

  componentDidMount() {
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
  config = {
    navigationBarTitleText: '车源发布' 
  }

  render() {
    let {
      activeIndex,
      carImg,
      brandId, //品牌Id
      carPrice, //价格
      carBasic, //车款
      carSerial, //车型
      effluentStandard, //排放标准
      gasDisplacement, //汽车排量
      locationId, //城市ID
      mileage, //	里程数
      onTheCardTime, //首次上牌时间
      yearType, //年款
      usedType, //车辆性质 1新车 2二手车
      remark, //备注
    } = this.state
    const publishTabClassName = classNames('tab-item', {
      'tab-item-active': activeIndex === 0
    })
    const historyTabClassName = classNames('tab-item', {
      'tab-item-active': activeIndex === 1
    })
    const carImgRenderList = carImg.map(item => {
      return (
        <View className='image-item' key={item}>
          <Image src={item} mode='aspectFill'></Image>
          <Text className='delete-btn iconfont iconguanbi1'></Text>
        </View>
      )
    })
    return (
      <View className='page-wrapper'>
        <View className='tab-wrapper'>
          <View className={publishTabClassName} onClick={this.changeTab.bind(this, 0)}>发布车源</View>
          <View className='vertical-line'></View>
          <View className={historyTabClassName} onClick={this.changeTab.bind(this, 1)}>发布记录</View>
        </View>
        <View className='tab-panel'>
          <View className='tab-panel-main'>
            <View className='publish-card'>
              <View className='publish-item'>
                <View className='must-icon'>*</View>
                <View className='publish-label'>卖车城市</View>
                <View className='publish-content'>
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>请选择</Text>
                  <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
                </View>
              </View>
              <View className='line'></View>
              <View className='publish-item'>
                <View className='must-icon'>*</View>
                <View className='publish-label'>品牌</View>
                <View className='publish-content'>
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>请选择</Text>
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
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>请选择</Text>
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
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>请选择</Text>
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
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>请输入汽车排量</Text>
                </View>
              </View>
              <View className='line'></View>
              <View className='publish-item'>
                <View className='must-icon'>*</View>
                <View className='publish-label long-label'>排放标准</View>
                <View className='publish-content'>
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>请选择</Text>
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
                      <View className='image-item add-btn'>
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
              <View className='publish-item'>
                <View className='must-icon'></View>
                <View className='publish-label long-label'>其他说明</View>
                <View className='publish-content'>
                  {/* <Text className='content-text'></Text> */}
                  <Text className='placeholder-style'>补充说明车辆情况</Text>
                  <Text className='iconfont iconxiangyouxuanzejiantoux publish-icon-right'></Text>  
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
            <View className='btn'>
              发布车源信息
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
export default connect(mapStateToProps)(UsedCarPublish)