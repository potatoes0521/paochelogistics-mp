/*
 * @Author: liuYang
 * @description: 抽屉弹层
 * @Date: 2019-10-28 11:39:45
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-29 16:19:00
 * @mustParam: 必传参数
 *    show 展示或隐藏 Boolean - false
 *    mask 是否需要遮罩 Boolean - true
 *    width 抽屉宽度 String 宽度单位px
 *    right 是否从右侧滑出 Boolean - false
 *    items 菜单列表 Array - -
 *    onItemClick 点击菜单时触发 index（ 菜单序号）
 *    onClose 动画结束组件关闭的时候触发 -
 * @optionalParam: 选传参数
 */
import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.styl'

export default class Drawer extends Component {
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  constructor (props) {
    super(...arguments)
    this.state = {
      animShow: false,
      _show: props.show
    }
  }
  
  componentDidMount () {
    const { _show } = this.state
    if (_show) this.animShow()
  }


  componentWillReceiveProps (nextProps) {
    const { show } = nextProps
    if (show !== this.state._show) {
      show ? this.animShow() : this.animHide(...arguments)
    }
  }

  onItemClick (index, e) {
    this.props.onItemClick && this.props.onItemClick(index)
    this.animHide(e, index)
  }

  onHide () {
    this.setState({ _show: false }, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  animHide () {
    this.setState({
      animShow: false,
    })
    setTimeout(() => {
      this.onHide(...arguments)
    }, 300)
  }

  animShow () {
    this.setState({ _show: true })
    setTimeout(() => {
      this.setState({
        animShow: true,
      })
    }, 200)
  }

  onMaskClick () {
    this.animHide(...arguments)
  }
  
  /**
   * 阻止事件冒泡
   * @param {Object} e event对象
   * @return void
   */
  onTouchMove(e) {
    e.stopPropagation()
  }

  render () {
    const {
      mask,
      width,
      right,
      items,
    } = this.props
    const {
      animShow,
      _show,
    } = this.state
    const rootClassName = ['drawer']

    const maskStyle = {
      display: mask ? 'block' : 'none',
      opacity: animShow ? 1 : 0,
    }
    const listStyle = {
      width,
      transition: animShow ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)',
    }

    const classObject = {
      'drawer-show': animShow,
      'drawer-right': right,
      'drawer-left': !right,
    }

    return (
      _show && <View
        className={classNames(rootClassName, classObject, this.props.className)}
      >
        <View
          className='drawer-mask'
          style={maskStyle}
          onClick={this.onMaskClick.bind(this)}
          onTouchMove={this.onTouchMove}          
        ></View>

        <View
          onTouchMove={this.onTouchMove}          
          className='drawer-content'
          style={listStyle}
        >
          {items.length ? null : this.props.children}
        </View>
      </View>
    )
  }
}

Drawer.defaultProps = {
  show: false,
  mask: true,
  width: '',
  right: false,
  items: [],
  onItemClick: () => {},
  onClose: () => {},
}

Drawer.propTypes = {
  show: PropTypes.bool,
  mask: PropTypes.bool,
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
  onClose: PropTypes.func,
}
