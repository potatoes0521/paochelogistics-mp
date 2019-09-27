/*
 * @Author: liuYang
 * @description: 单选框
 * @Date: 2019-09-02 18:03:41
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-27 11:10:58
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

  constructor(props) {
    super(props)
    this.state = {
      radioList: []
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
    let { options, activeIndex } = this.props
    options.forEach((item) => {
      if (item.id === activeIndex) { 
        item.checked = true        
      } else {
        item.checked = false        
      }
    });
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
    let { radioList } = this.state
    radioList.forEach(ele => {
      ele.id === option.id ? ele.checked = true : ele.checked = false
    })
    this.setState({
      radioList
    })
    this.props.onClick(option, ...arguments)
  }

  render() {
    const {
      radioList
    } = this.state
    const {
      type
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
                    'radio-box-active': option.checked
                  })}
                >
                  {
                    option.checked && <View className='radio-spot'></View>
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
  activeIndex: 0,
  type: 'horizontal',
  options: [],
  onClick: () => {},
}

PCRadio.propTypes = {
  type: PropTypes.string,
  activeIndex: PropTypes.number,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}
