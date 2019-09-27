/*
 * @Author: guorui
 * @description: 下单
 * @Date: 2019-09-27 10:59:47
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-27 15:33:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import NoTitleCard from '@c/no_title_card/index.js'
import '@c/all_order_pages/order_card/index.styl'
import InputNumber from '@c/input_number/index.js'
import './index.styl'

export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: 1 //台数
    }
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '下单'
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

  render() {
    let {
      vehicles
    } = this.state
    return (
      <View className='place-order-wrapper'>
        <View className='place-order-top'>
          <NoTitleCard>
            <View className='start-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>发车城市:</View>
                <View className='details-form-content'>北京</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>详细信息:</View>
                <View className='details-form-content'>海淀区中关村52号创业公社B区32号楼跑车物流</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写联系人姓名</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系方式:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写联系人电话</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写联系人证件号</Text>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='end-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>收车城市:</View>
                <View className='details-form-content'>北京</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>详细信息:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写详细地址</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写联系人姓名</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系方式:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写联系人电话</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请填写联系人证件号</Text>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='car-info'>
              <View className='details-form-item'>
                <View className='details-form-label'>服务:</View>
                <View className='details-form-content'>上门提车;上门取车</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>发车时间:</View>
                <View className='details-form-content'>2019-09-20</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆信息:</View>
                <View className='details-form-content'>大众迈腾</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆类型:</View>
                <View className='details-form-content'>二手车</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>台数:</View>
                <View className='details-form-content details-from-input'>
                  <InputNumber
                    min={1}
                    max={999}
                    value={vehicles}
                    onChange={this.valueChange.bind(this)}
                  ></InputNumber>
                  <Text>辆</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车架号:</View>
                <View className='details-form-content'>
                  <Text className='details-from-text'>请输入车架号</Text>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>报价:</View>
                <View className='details-form-content'>
                  <Text className='single-price'>2134</Text>
                  <Text>元/台</Text>
                </View>
              </View>
            </View>
          </NoTitleCard>
        </View>
        <View className='place-order-button'>立即下单</View>
      </View>
    )
  }
}