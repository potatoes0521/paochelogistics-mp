/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-04-12 20:22:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-14 15:43:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.styl'

export default class RescueIcon extends Component {

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
    let {
      type,
      color
    } = this.props
    const wrapperClassName = classNames('rescue-icon-wrapper', {
      'big-rescue-icon-wrapper': type === 'big',
      'small-rescue-icon-wrapper': type === 'small',
      'white-rescue-icon-wrapper': color === 'white'
    }) 
    const rescueIconClassName = classNames('iconfont iconjiuyuan rescue-icon', {
      'white-rescue-icon': color === 'white'
    })
    return (
      <View
        className={wrapperClassName}
      >
        <View className={rescueIconClassName}></View>
        {
          type === 'big' ?
            <View className='rescue-icon-text'>救援</View>
            : null
        }
      </View>
    )
  }

}

RescueIcon.defaultProps = {
  type: 'big',
  color: 'default'
  // onClick: () => {}
}

RescueIcon.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string
  // onClick: PropTypes.func.isRequired
}