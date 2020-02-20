/*
 * @Author: liuYang
 * @description: 城市索引选择器
 * @Date: 2019-09-01 14:57:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-20 15:16:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  maxCheck: PropTypes.number  // 最多多选几个
 *  checkBox: PropTypes.bool    // 是否显示多选框
 *  animation: PropTypes.bool   // 索引选择时是否要动画
 *  isShowToast: PropTypes.bool // 是不是选中时显示toast
 *  topKey: PropTypes.string,
 *  list: PropTypes.array,
 *  throughCityList: PropTypes.object, // 途径城市的处理
 *      nameList  城市名字的数组
 *      idList    城市ID的数组
 *  onClick: PropTypes.func
 * 
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Image
} from '@tarojs/components'
import classNames from 'classnames'
import { AtToast } from 'taro-ui'
import _flattenDeep from 'lodash/flattenDeep'
import { defaultFileURL } from '@config/request_config.js'
import utils from './utils.js'
// eslint-disable-next-line import/first
import imageDuiHao from '@img/indexes/duigou.png'

import './index.styl'

export default class Indexes extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      _scrollIntoView: '',
      _scrollTop: 0,
      _tipText: '',
      _isShowToast: false,
      _list: []
    }
    // 当前选择的个数
    this.checkNum = 0
    // 右侧导航高度
    this.menuHeight = 0
    // 右侧导航距离顶部高度
    this.startTop = 0
    // 右侧导航元素高度
    this.itemHeight = 0
    // 当前索引
    this.currentIndex = -1
    this.listId = `list-${utils.uuid()}`
    this.allCityList = []
    this.checkedList = []
  }
 
  // /**
  //  * 组件状态更新的时候
  //  * @param {Object} nextProps 改变后的数据
  //  * @return void
  //  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.list.length !== this.props.list.length) {
      this.initData()
    }
  }
  componentDidShow() {
    this.initData()
  }
  /**
   * 初始化数据
   * @return void
   */
  initData() {
    utils.delayQuerySelector(this, '.indexes-menu')
      .then(rect => {
        let {
          list,
          checkBox
        } = this.props
        const len = list.length
        this.menuHeight = rect[0].height
        this.startTop = rect[0].top
        this.itemHeight = Math.floor((this.menuHeight) / (len + 1))
        this.setState({
          _list: list
        })
        if (checkBox) {
          this.allCityList = list.map(item => {
            return item.list
          })
          this.allCityList = _flattenDeep(this.allCityList)
        }
      })
  }
  
  /**
   * 组件点击事件处理
   * @param {arguments} ...arg 类数组
   * @return void
   */
  handleClick = (...arg) => {
    let { maxCheck, checkBox } = this.props
    if (!checkBox) {  // 如果不能选择
      this.props.onClick(...arg)
    } else if (checkBox && this.checkNum < maxCheck && !arg[0].checked) {
      this.checkNum += 1
      this.handleCheckedMore(...arg)
    } else if (checkBox && arg[0].checked) {
      this.checkNum -= 1
      this.handleCheckedMore(...arg)      
    } else {
      Taro.showToast({
        title:`最多选择${maxCheck}个`,
      })
    }
  }
  /**
   * 处理多选情况 把选中的城市数据的[this.props.fieldName] 和[this.props.fieldId] 单独分开放
   * @param {arguments} ...arg 第一个是item,第二个是event
   * @return void
   */
  handleCheckedMore(...arg) {
    const newList = this.handleChecked(arg[0], this.state._list)
    this.setState({
      _list: newList
    })
    const throughCityNameList = this.checkedList.map((item) => {
      return item[this.props.fieldName]
    })
    const throughCityIdList = this.checkedList.map((item) => {
      return item[this.props.fieldId]
    })
    this.props.onClick(throughCityNameList, throughCityIdList)
  }
  /**
   * 处理选中
   * @param {Object} obj 选中的数据
   * @param {Array} allList 全部城市数据
   * @return void
   */
  handleChecked(obj, allList) {
    const arr = allList
    arr.forEach(item => {
      if (item.list) {
        item.list.forEach(items => {
          if (+items[this.props.fieldId] === +obj[this.props.fieldId]) {
            items.checked = !items.checked
            if (items.checked) {
              this.checkedList.push(items)
            } else {
              this.deleteInCheckedList(items)
            }
          }
        }) 
      }
    })
    return arr
  }
  /**
   * 删除已选项
   * @param {Object} obj 参数描述
   * @return void
   */
  deleteInCheckedList(obj) { 
    this.checkedList.forEach((item, index) => {
      if (+item[this.props.fieldId] === +obj[this.props.fieldId]) {
        this.checkedList.splice(index, 1)
      }
    })
  }
  /**
   * 递归清除未选择
   * @param {Array} cleanData 要清除的数据
   * @param {Array} checkedData 标准数据
   */
  diff(cleanData, checkedData) {
    const map = checkedData.reduce((res, item) =>({
      ...res,
      [item[this.props.fieldId]]: item
    }), {})
    this.dfs(cleanData, map);
  }
  dfs(arr, map) {
    for (const item of arr) {
      if (item.list) {
        this.dfs(item.list, map)
      }
      if (item[this.props.fieldId] in map) {
        item.checked = true
      } else {
        item.checked = false
      }
    }
  }
  /**
   * 手指移动处理
   * @param {Object} event event对象
   * @return void
   */
  handleTouchMove = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const {
      list
    } = this.props
    const pageY = event.touches[0].pageY
    const index = Math.floor((pageY - this.startTop) / this.itemHeight)

    if (index >= 0 &&
      index <= list.length &&
      this.currentIndex !== index
    ) {
      this.currentIndex = index
      const key = index > 0 ? list[index - 1].key : 'top'
      const touchView = `indexes-menu-list-${key}`
      this.jumpTarget(touchView, index)
    }
  }

  /**
   * 手指离开事件
   * @return void
   */
  handleTouchEnd = () => {
    this.currentIndex = -1
  }

  /**
   * 点击或者切换右侧menu菜单的active
   * @param {String} _scrollIntoView 跳转到对应的ID
   * @param {Number} idx 数字
   * @return void
   */
  jumpTarget(_scrollIntoView, idx) {
    const {
      topKey,
      list
    } = this.props
    const _tipText = idx === 0 ? topKey : list[idx - 1].initial

    this.updateState({
      _scrollIntoView,
      _tipText
    })
  }

  /**
   * 更新数据
   * @param {Object} state 要改变的数据
   * @return void
   */
  updateState(state) {
    const { isShowToast } = this.props
    const { _scrollIntoView, _tipText, _scrollTop } = state
    
    this.setState({
      _scrollIntoView,
      _tipText,
      _scrollTop,
      _isShowToast: isShowToast
    })
    // 预留功能  震动
    // if (isVibrate) {
    //   Taro.vibrateShort()
    // }
  }

  render () {
    const {
      checkBox,
      customStyle,
      animation,
      topKey
    } = this.props
    const {
      _scrollTop,
      _scrollIntoView,
      _tipText,
      _isShowToast,
      _list
    } = this.state
    const rootCls = classNames('indexes')

    const toastStyle = {
      minWidth: Taro.pxTransform(100)
    }
    // 右边显示菜单
    const menuList = _list.map((dataList, i) => {
      const {
        initial
      } = dataList
      const targetView = `indexes-list-${initial}`
      return (
        initial ? 
          <View className='indexes-menu-item' key={initial}
            onClick={this.jumpTarget.bind(this, targetView, i + 1)}
          >{initial}</View>
          : null
      )
    })

    // 主要内容
    const indexesList = _list.map(dataList => {
      const key = dataList.initial
      return (
        <View
          id={`indexes-list-${dataList.initial}`}
          className='indexes-list'
          key={key}
        >
          <View className='indexes-list-title'>
            {dataList.initial}
          </View>
          <View className='indexes-list-wrapper'>
            {
              dataList.list && dataList.list.map(item => {
                {JSON.stringify(item)}
                const checkBoxClass = classNames({
                  'check-box': true,
                  'box-checked': item.checked
                  // 'box-disabled': disbaled
                })
                const keyCityId = item[this.props.fieldId]
                const logoUrl = defaultFileURL + item[this.props.fieldLogo]
                return (
                  <View
                    className='indexes-list-item'
                    key={keyCityId}
                    onClick={this.handleClick.bind(this, item)}
                  >
                    {
                      checkBox ?
                        <View className={checkBoxClass}>
                          {
                            item.checked ?
                              <View className='checked-duigou-img'>
                                {/* <View className='iconfont iconduigoux'></View> */}
                                <Image src={imageDuiHao}></Image>
                              </View>
                              : null
                          }
                        </View>
                        : null
                    }
                    {
                      this.props.fieldLogo ? 
                        <View className='car-logo'>
                          <Image className='car-logo-image' src={logoUrl}></Image>
                        </View>
                        : null
                    }
                    <View>{item[this.props.fieldName]}</View>
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    })

    return (
      <View className={rootCls} style={customStyle}>
        <AtToast
          customStyle={toastStyle}
          isOpened={_isShowToast}
          text={_tipText}
          duration={2000}
        />
        <View
          className='indexes-menu'
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <View
            className='indexes-menu-item'
            onClick={this.jumpTarget.bind(this, 'indexes-top', 0)}
          >
            {topKey}
          </View>
          {menuList}
        </View>
        <ScrollView
          className='indexes-body'
          id={this.listId}
          scrollY
          scrollWithAnimation={animation}
          scrollTop={_scrollTop}
          scrollIntoView={_scrollIntoView}
        >
          {
            !checkBox ? <View className='indexes-content' id='indexes-top'>
            {this.props.children}
          </View> : null
          }
          
          {indexesList}
        </ScrollView>
      </View>
    )
  }
}

Indexes.propTypes = {
  maxCheck: PropTypes.number,
  checkBox: PropTypes.bool,
  animation: PropTypes.bool,
  isShowToast: PropTypes.bool,
  topKey: PropTypes.string,
  list: PropTypes.array,
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  fieldLogo: PropTypes.string,
  onClick: PropTypes.func
}

Indexes.defaultProps = {
  checkBox: false,
  maxCheck: 3,
  animation: false,
  topKey: 'Top',
  isShowToast: true,
  list: [],
  fieldId: 'cityId',
  fieldName: 'cityName',
  fieldLogo: '',
  onClick: () => { }
}
