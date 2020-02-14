/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-02-14 13:07:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-14 13:34:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import '../public.styl'

export default class OrderTransport extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }


  render() {
    let { orderDetails } = this.props
    return (
      <View className='details-form-wrapper'>
        <View className='details-form-item'>
          <View className='details-form-label'>运力名称:</View>
          <View className='details-form-content'>
            {orderDetails.transferRealName}
          </View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>联系方式:</View>
          <View className='details-form-content'>
            {
              orderDetails.transferMobile
            }
          </View>
        </View>
        <View className='details-form-item'>
          <View className='details-form-label'>运力价格:</View>
          <View className='details-form-content'>
            {orderDetails.transferPriceDesc}
          </View>
        </View>
      </View>
    )
  }

}

OrderTransport.defaultProps = {
  onClick: () => {}
}

OrderTransport.propTypes = {
  onClick: PropTypes.func.isRequired
}