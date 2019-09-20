/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-20 17:28:05
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-20 17:30:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import {
  View
} from '@tarojs/components'
import classNames from 'classnames'
import './index.styl'

export default class Tabs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabList: []
    }
  }

  render() { 
    return (
      <View className='tabs-wrapper'>
        
      </View>
    )
  }
}

Tabs.defaultProps = {
  activeIndex: 0,
  options: [],
  onClick: () => {},
}

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}