/*
 * @Author: liuYang
 * @description: 固定顶部的tab栏
 * @Date: 2019-09-20 17:28:05
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-26 13:58:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import './index.styl'

export default class Tabs extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * 点击了tab栏
   * @return void
   */
  handleClick() {
    if (this.props.activeIndex == arguments[0]) return
    this.props.onClick(...arguments)
  }

  render() { 
    const {
      options,
      activeIndex
    } = this.props
    
    const tabList = options.map((item,  index) => {
      const tabItemActiveClass = classNames(
        'tab-item', {
          'tab-item-active': activeIndex === index
        }
      )
      const key = item.id
      return (
        <View
          className={tabItemActiveClass}
          data-item={item}
          key={key}
          onClick={this.handleClick.bind(this, item.id)}
        >{item.label}</View>
      )
    })
    
    return (
      <View className='tabs-list'>
        {
          tabList
        }
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