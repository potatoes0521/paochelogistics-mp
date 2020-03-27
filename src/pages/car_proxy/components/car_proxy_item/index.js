/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-18 12:02:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-27 18:10:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.styl'

export default class index extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  navigatorToDetails() { 
    let { item } = this.props
    Taro.navigateTo({
      url: `/pages/car_proxy_details/index?id=${item.id}`
    })
  }

  render() {
    let { item } = this.props
    const statusTextClassName = classNames('car-proxy-item-status-text', {
      'car-proxy-item-status-text-highlight': +item.proxyOrderStatus !== 21
    })
    let carProxyItemText = ''
    if (item.carProxyOrderItemRelationVoList && item.carProxyOrderItemRelationVoList.length) {
      let str = item.carProxyOrderItemRelationVoList.map(res => res.carProxyItemName).join('、')
      if (str.length > 9) {
        carProxyItemText = str.substr(0, 8) + "..."
      } else {
        carProxyItemText = str || ''
      }
    }
    const buttonListRender = item && item.buttons ? item.buttons.map(res => {
      const key = res.key
      return (
        <View className='car-proxy-item-button' key={key}>{res.name}</View>
      )
    }) : []
    return (
      <View className='car-proxy-item' onClick={this.navigatorToDetails}>
        <View className='car-proxy-item-title'>
          <View className='car-proxy-item-time'>{item.createTimeDesc}</View>
          <View className='car-proxy-item-status-wrapper'>
            <View className={statusTextClassName}>{item.proxyOrderStatusDesc}</View>
            {
              item.proxyOrderStatus === 21 ?
              <Block>
                <View className='car-proxy-item-status-vertical-line'></View>
                <View className='iconfont iconshanchu car-proxy-item-delete-icon'></View>
              </Block> : null
            }
          </View>
        </View>
        <View className='car-proxy-item-main'>
          <View className='car-proxy-item-order-msg-wrapper'>
            <View className='car-proxy-item-small car-proxy-item-order-msg-public-text'>{item.userName}</View>
            <View className='car-proxy-item-order-msg'>
              <View className='car-proxy-item-order-msg-public-text'>
                {item.locationName && item.locationName.length > 10 ?
                  item.locationName.substr(0, 9) + "..." :
                  item.locationName || ''
                }
              </View>
              <View className='car-proxy-item-order-msg-des'>
                代办{carProxyItemText}
              </View>
            </View>
            <View className='car-proxy-item-small car-proxy-item-small-right car-proxy-item-order-msg-public-text'>¥{item.totalPriceDesc}</View>
          </View>
          <View className='car-proxy-item-buttons'>
            {
              buttonListRender
            }
          </View>
        </View>
      </View>
    )
  }

}

index.defaultProps = {
  item: {},
  onClick: () => {}
}

index.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func
}