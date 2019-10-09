/*
 * @Author: liuYang
 * @description: 单选框
 * @Date: 2019-09-02 18:03:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-09 10:59:36
 * @mustParam: 必传参数
 *  options 单选项
 *    id : 传给后端的值
 *    label : 显示的文字
 * 
 * @optionalParam: 选传参数
 *  activeIndex 默认选中
 * 
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './index.styl'

export default class PCRadio extends Component { 
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  constructor(props) {
    super(props)
    this.state = {
      radioList: []
    }
  }
  componentDidMount() {
    this.initData()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.options.length !== this.props.options.length) {
      this.initData()
    }
  }
  /**
   * 初始化数据
   * @return void
   */
  initData() { 
    let { options } = this.props
    this.setState({
      radioList: options
    })
  }
  /**
   * 单选点击事件
   * @param {Object} option 选中项的信息
   * @return void
   */
  handleClick(option) {
    if (option.disabled) return
    this.props.onClick(option, ...arguments)
  }

  render() {
    const {
      radioList
    } = this.state
    const {
      type,
      activeIndex
    } = this.props
    const wrapperClassName = classNames({
      'horizontal-radio-wrapper': type === 'horizontal',
      'vertical-radio-wrapper': type === 'vertical'
    })
    return (
      <View className={wrapperClassName}>
        {
          radioList.map(option => {
            return (
              <View
                key={option.id}
                onClick={this.handleClick.bind(this, option)}
                className={
                  classNames({
                    'radio-option': true,
                    'radio-box-disabled': option.disabled
                  })
                }
              >
                <View className={classNames({
                    'radio-box': true,
                    'radio-box-active': activeIndex === option.id
                  })}
                >
                  {
                    activeIndex === option.id && <View className='radio-spot'></View>
                  }
                </View>
                {option.label && <View className='radio-title'>{option.label}</View>}
              </View>
            )
          })
        }
      </View>
    )
  }
}

PCRadio.defaultProps = {
  activeIndex: 1,
  type: 'horizontal',
  options: [],
  onClick: () => {},
}

PCRadio.propTypes = {
  activeIndex: PropTypes.number,
  type: PropTypes.string,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}
