/*
 * @Author: guorui
 * @description: 下单
 * @Date: 2019-09-27 10:59:47
 * @LastEditors: guorui
 * @LastEditTime: 2019-09-27 16:54:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text
} from '@tarojs/components'
import NoTitleCard from '@c/no_title_card/index.js'
import '@c/all_order_pages/order_card/index.styl'
import InputNumber from '@c/input_number/index.js'
import './index.styl'

export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingCity: '北京',   // 发车城市
      startingCityAddress: '海淀区中关村52号创业公社B区32号楼跑车物流',  //发车城市详细地址
      startingCityPerson: '',  //发车城市联系人
      startingCityPhone: '',  //发车城市联系人电话
      startingCityNumber: '',  //发车城市联系人身份证号
      targetCity: '上海',     // 收车城市
      targetCityAddress: '',  //收车城市详细地址
      targetCityPerson: '',  //收车城市联系人
      targetCityPhone: '',  //收车城市联系人电话
      targetCityNumber: '',  //收车城市联系人身份证号
      serviceType: '上门提车', //服务类型，0 上门提车，1 上门送车
      startingTime: '2019-09-20', // 发车时间
      carInformation: '大众迈腾', // 车辆信息
      carNature: '二手车', // 车辆类型
      vehicles: 1,        // 台数
      carNumber: '',       // 车架号
      price: 2134 // 报价
    }
  }

  //页面内的配置
  config = {
  navigationBarTitleText: '下单'
  } 

  /**
   * InputNumber组件值改变
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
      startingCity, // 发车城市
      startingCityAddress, //发车城市详细地址
      startingCityPerson, //发车城市联系人
      startingCityPhone, //发车城市联系人电话
      startingCityNumber, //发车城市联系人身份证号
      targetCity, // 收车城市
      targetCityAddress, //收车城市详细地址
      targetCityPerson, //收车城市联系人
      targetCityPhone, //收车城市联系人电话
      targetCityNumber, //收车城市联系人身份证号
      serviceType, //服务类型，0 上门提车，1 上门送车
      startingTime, // 发车时间
      carInformation, // 车辆信息
      carNature, // 车辆类型
      vehicles, // 台数
      carNumber, // 车架号
      price// 报价
    } = this.state
    return (
      <View className='place-order-wrapper'>
        <View className='place-order-top'>
          <NoTitleCard>
            <View className='start-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>发车城市:</View>
                <View className='details-form-content'>{startingCity}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>详细信息:</View>
                <View className='details-form-content'>{startingCityAddress}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人姓名'
                    value={startingCityPerson}
                    maxLength='10'
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系方式:</View>
                <View className='details-form-content'>
                  <Input
                    type='number'
                    className='details-from-input'
                    placeholder='请填写联系人电话'
                    maxLength='20'
                    value={startingCityPhone}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人证件号'
                    value={startingCityNumber}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='end-city'>
              <View className='details-form-item'>
                <View className='details-form-label'>收车城市:</View>
                <View className='details-form-content'>{targetCity}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>详细信息:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写详细地址'
                    maxLength='50'
                    value={targetCityAddress}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系人:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人姓名'
                    maxLength='10'
                    value={targetCityPerson}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>联系方式:</View>
                <View className='details-form-content'>
                  <Input
                    type='number'
                    className='details-from-input'
                    placeholder='请填写联系人电话'
                    maxLength='20'
                    value={targetCityPhone}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>身份证号:</View>
                <View className='details-form-content'>
                  <Input
                    className='details-from-input'
                    placeholder='请填写联系人证件号'
                    value={targetCityNumber}
                  ></Input>
                </View>
              </View>
            </View>
            <View className='dividing-line'></View>
            <View className='car-info'>
              <View className='details-form-item'>
                <View className='details-form-label'>服务:</View>
                <View className='details-form-content'>{serviceType}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>发车时间:</View>
                <View className='details-form-content'>{startingTime}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆信息:</View>
                <View className='details-form-content'>{carInformation}</View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>车辆类型:</View>
                <View className='details-form-content'>{carNature}</View>
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
                  <Input
                    className='details-from-input'
                    placeholder='请输入车架号'
                    maxLength='20'
                    value={carNumber}
                  ></Input>
                </View>
              </View>
              <View className='details-form-item'>
                <View className='details-form-label'>报价:</View>
                <View className='details-form-content'>
                  <Text className='single-price'>{price}</Text>
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