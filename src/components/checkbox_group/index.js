/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-27 11:02:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 12:19:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import '../../assets/icon_font/icon.scss'

import './index.styl'

export default class CheckBoxGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxList: []
    }
  }

  componentDidMount() {
    this.initData()
  }

  /**
   * 初始化数据
   * @return void
   */
  initData() {
    const { options } = this.props
    options.forEach((item) => {
      item.checked = false
    })
    this.setState({
      checkboxList: options
    })
  }
  /**
   * 点击事件
   * @param {Object} option 选中项的信息
   * @return void
   */
  handleClick(option) {
    if (option.disabled) return
    let {
      checkboxList
    } = this.state
    checkboxList.forEach(ele => {
      if (ele.id === option.id) {
        ele.checked = !ele.checked
      }
    })
    this.setState({
      checkboxList
    })
    this.props.onClick(checkboxList, ...arguments)
  }
  render() {
    const {
      checkboxList
    } = this.state

    const checkboxGroupList = checkboxList.map(item => {
      const checkboxClassName = classNames('checkbox', {
        'checked iconfont iconduigoux': item.checked
      })
      return(
        <View
          key={item}
          className='checkbox-item'
          onClick={this.handleClick.bind(this, item)}
        >
          <View className={checkboxClassName}></View>
          <View className='checkbox-label'>{item.label}</View>
        </View>
      )
    })
    return (
      <View className='checkbox-wrapper'>
        {
          checkboxGroupList
        }
      </View>
    )
  }
}

CheckBoxGroup.defaultProps = {
  type: 'horizontal',
  options: [],
  onClick: () => {},
}

CheckBoxGroup.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}
