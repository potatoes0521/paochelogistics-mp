/*
 * @Author: liuYang
 * @description: 允许搜索的
 * @Date: 2019-12-06 17:18:35
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 11:21:35
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import './index.styl'

export default class TabsCanSelect extends Component {

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * 点击了tab栏
   * @return void
   */
  handleClick() {
    if (arguments[0] == 'select') {
      this.props.onClick(...arguments)
    } else if (arguments[0] == 'tabs') {
      if (this.props.activeIndex == arguments[1]) return
      this.props.onClick(...arguments)
    } else {
      if (this.props.activeIndex == arguments[0]) return
      this.props.onClick(...arguments)
    }
  }

  render() { 
    const {
      options,
      activeIndex,
      onlyTabs
    } = this.props
    // item 样式
    const tabList = options.map((item,  index) => {
      const tabItemActiveClass = classNames(
        'tab-item',
        {
          'tab-item-active': activeIndex === index,
          'only-tabs-item': onlyTabs,
          'tab-item-select': !onlyTabs
        }
      )
      const key = item.id
      return (
        <View
          className={tabItemActiveClass}
          data-item={item}
          key={key}
          onClick={this.handleClick.bind(this, 'tabs' ,item.id)}
        >{item.label}</View>
      )
    })
    // scroll-view样式
    const scrollViewClassName = classNames('scroll-view', {
      'scroll-view-select': !onlyTabs
    })
    const tabsListWrapperClassName = classNames({
      'only-tabs': onlyTabs,
      'select-tabs': !onlyTabs
    })
    return (
      <View className='tabs-list'>
        <ScrollView
          className={scrollViewClassName}
          scrollX
        >
          <View className={tabsListWrapperClassName}>
            {
              tabList
            }
          </View>
        </ScrollView>
        {
          onlyTabs ? 
            null :
            <Block>
              <View className='line'></View>
              <View
                className='select-wrapper'
                onClick={this.handleClick.bind(this, 'select')}
              >
                <Text className='text'>筛选</Text>
                <Text className='iconfont iconshaixuan selector-icon'></Text>
              </View>
            </Block>
        }
      </View>
    )
  }
}

TabsCanSelect.defaultProps = {
  activeIndex: 0,
  onlyTabs: false,
  options: [],
  onClick: () => { }
}

TabsCanSelect.propTypes = {
  activeIndex: PropTypes.number,
  onlyTabs: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}