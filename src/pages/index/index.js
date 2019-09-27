/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-09-17 11:53:57
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 14:07:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NoTitleCard from '@c/no_title_card/index.js'
import RadioGroups from '@c/radio_group/index.js'
import CheckBoxGroup from '@c/checkbox_group/index.js'
import InputNumber from '@c/input_number/index.js'
import { serviceList, carNatureList } from '@config/text_config.js'
// import api from '@api/index.js'
import './index.styl'

class Index extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      serviceId: 1,
      vehicles: 1,
      carNature: 1
    }
  }
  componentDidShow() { 
    this.login()
  }

  componentDidHide() { }
  
  login() { 
    
  }
  /**
   * 单选
   * @param {Object} e event对象
   * @return void
   */
  chooseRadio(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      serviceId: e.id
    })
  }
  /**
   * 单选
   * @param {Object} e event对象
   * @return void
   */
  chooseCarNature(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      carNature: e.id
    })
  }
  /**
   * inputNumber组件值改变
   * @param {Number} e 输入框值
   * @return void
   */
  valueChange(e) {
    this.setState({
      vehicles: e
    })
  }
  /**
   * 点击补充车辆信息
   * @return void
   */
  changeOpen() { 
    this.setState({
      open: !this.state.open
    })
  }
  config = {
    navigationBarTitleText: '首页'
  }
  render() {
    let {
      serviceId,
      vehicles,
      carNature
    } = this.state
    
    
    return (
      <View className='index-wrapper'>
        <NoTitleCard>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>发车时间</View>
              <View className='from-right'>xxxx</View>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>发车地点</View>
              <View className='from-right'>xxxx</View>
            </View>
            <View className='label-hide'>
              <Input
                className='input'
                placeholder='请输入详细收车地址'
                placeholderClass='input-placeholder'
              ></Input>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>收车地点</View>
              <View className='from-right'>xxxx</View>
            </View>
            <View className='label-hide'>
              <Input
                className='input'
                placeholder='请输入详细收车地址'
                placeholderClass='input-placeholder'
              ></Input>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>服务</View>
              <View className='from-right'></View>
            </View>
            <View className='label-hide'>
              <CheckBoxGroup
                options={serviceList}
              ></CheckBoxGroup>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>输入车辆信息</View>
              <View className='from-right'>xxxx</View>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>台数:</View>
              <View className='from-right'>
                <InputNumber
                  min={1}
                  value={vehicles}
                  onChange={this.valueChange.bind(this)}
                ></InputNumber>
              </View>
            </View>
          </View>
          <View className='from-item'>
            <View className='label-wrapper'>
              <View className='from-label'>车辆性质</View>
              <View className='from-right from-radio'>
                <RadioGroups
                  options={carNatureList}
                  activeIndex={carNature}
                  onClick={this.chooseRadio.bind(this)}
                ></RadioGroups>
              </View>
            </View>
          </View>
        </NoTitleCard>
        <View className='submit-btn'>立即询价</View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Index)
