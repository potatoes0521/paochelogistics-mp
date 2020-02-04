/*
 * @Author: liuYang
 * @description: 运输状态时间轴
 * @Date: 2019-09-24 14:59:07
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 11:23:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.styl'

export default class TimeLine extends Component {
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  constructor(props) {
    super(props)
    this.state = {
      // open: false,
    }
  }
  render() { 
    const { title, timeArray } = this.props
    // const { open } = this.state

    const pathList = timeArray.map((item, index) => {
      const lineClassName = classNames({
        'solid': index !== timeArray.length - 1 && index !== 0,
        'dashed': index === 0
      })
      const iconClassName = classNames({
        'icon-spot': true,
        'icon-text icon-text-start': index === timeArray.length - 1,
        'icon-text icon-text-over': index === 0,
        'icon-text iconfont iconyunshuzhong icon-style': index === 1 && timeArray.length !== 2
      })
      const addressClassName = classNames(
        'path-address',
        {
          'theme-text': index === 1
        }
      )
      return (
        <View
          className='path-item'
          key={item}
        >
          
          <View className='path-time'>
            {
              index === 0 ?
                null :
                <Block>
                  <View className='date'>{item.createTimeDesc ? item.createTimeDesc.slice(5, 10) : ''}</View>
                  <View className='time'>{item.createTimeDesc ? item.createTimeDesc.slice(12,16) : ''}</View>
                </Block>
            }
          </View>
          <View className='path-icon'>
            <View className={iconClassName}></View>
            <View className={lineClassName}></View>
          </View>
          <View className={addressClassName}>
            {
              index === 1 ? <View>运输中</View> : null
            }
            {
              index === 0 ? '[到达地址]' : ''
            }
            {
              index === timeArray.length - 1 ? '[始发地址]' : ''
            }
            {
              item.location
            }
          </View>
        </View>
      )
    })
    // const copyTimeArray = timeArray.slice(0,2)  // 复制出来一个只有两个的数组
    // const copyPathList = copyTimeArray.map((item, index) => {
    //   const lineClassName = classNames({
    //     'solid': index === 1,
    //     'dashed': index === 0
    //   })
    //   const iconClassName = classNames({
    //     'icon-text icon-text-over': index === 0,
    //     'icon-text iconfont iconyunshuzhong icon-style': index === 1
    //   })
    //   const addressClassName = classNames(
    //     'path-address',
    //     {
    //       'theme-text': index === 1
    //     }
    //   )
    //   return (
    //     <View
    //       className='path-item'
    //       key={item}
    //     >
    //       <View className='path-time'>
    //         <View className='date'>{item.createTime.slice(5,10)}</View>
    //         <View className='time'>{item.createTime.slice(12,16)}</View>
    //       </View>
    //       <View className='path-icon'>
    //         <View className={iconClassName}></View>
    //         <View className={lineClassName}></View>
    //       </View>
    //       <View className={addressClassName}>
    //         {
    //           index === 1 ? <View>运输中</View> : null
    //         }
    //         {
    //           index === 0 ? '[到达地址]' : ''
    //         }
    //         {
    //           item.location
    //         }
    //       </View>
    //     </View>
    //   )
    // })

    
    return (
      <View className='path-wrapper'>
        <View className='path-title'>{title}:</View>
        <View className='path-list'>
          {
            pathList
          }
          <View className='under-btn'></View>
        </View>
      </View>
    )
  }
}

TimeLine.defaultProps = {
  title: '线路过程',
  timeArray: []
}

TimeLine.propTypes = {
  title: PropTypes.string,
  timeArray: PropTypes.array
}