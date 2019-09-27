/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-27 11:02:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 13:01:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
    
  }
  render() {
    const {
      checkboxList
    } = this.state
    const { options } = this.props
    const checkboxGroupList = options.map(item => {
      return(
        <View
          key={item}
          className='checkbox-item'
        >
          <View className='checkbox'></View>
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
