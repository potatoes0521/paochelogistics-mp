/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-10-21 15:12:17
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-18 13:00:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import {
  View,
  Textarea,
  Button
} from '@tarojs/components'
import Storage from '@utils/storage.js'
import './index.styl'

export default class Remark extends Component {
  constructor() { 
    this.state = {
      placeholderText: '请输入车架号或车牌号，多台车请用“回车”隔开',
      maxlength: -1,
      disabled: true,
      autoHeight: false,
      value: ''
    }
    this.pageParams = {}
  }

  componentDidMount() { 
    this.pageParams = this.$router.params
    this.handlePageType()
  }
  
  componentWillUnmount() {
    Storage.removeStorage('vins')
  }
  handlePageType() { 
    let title = '备注'
    if (this.pageParams.pageType === 'order') {
      Storage.getStorage('vins').then(res => {
        this.setState({
          value: res,
          disabled: res ? false : true
        })
      })
      title = '填写车架号'
    } else if (this.pageParams.pageType === 'used_car') {
      title = '其他说明'
      this.setState({
        placeholderText: '请输入备注，最多500个字哦~',
        maxlength: 500
      })
    }
    Taro.setNavigationBarTitle({
      title,
    })
  }
  textareaInput(e) {
    let { value } = e.target
    value = value.replace(/，/g, ",")
    if (value.length >= 0) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
    this.setState({
      value: value
    })
  }
  
  submit() { 
    let { value } = this.state
    let pages = Taro.getCurrentPages(); //  获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    if (this.pageParams.pageType === 'order') { 
      prevPage.$component.setState({
        vins: value
      }, () => {
        const data = prevPage.$component.state
        Storage.setStorage(`order_input_${data.inquiryId}`, data)
        Taro.navigateBack()
      })
    } else {
      prevPage.$component.setState({
        remark: value
      }, () => {
        Taro.navigateBack()
      })
    }
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '备注'
  }

  render() {
    let {
      placeholderText,
      maxlength,
      disabled,
      value,
      autoHeight
    } = this.state
    return (
      <View className='page-wrapper'>
        <View className='textarea-wrapper'>
          <Textarea
            className='textarea'
            maxlength={maxlength}
            placeholder={placeholderText}
            auto-height={autoHeight}
            value={value}
            onInput={this.textareaInput}
          ></Textarea>
          {
            maxlength > 0 ? <View className='value-length-wrapper'>{value.length}/{maxlength}</View> : null
          }
        </View>
        <View className='button'>
          <Button className='submit' onClick={this.submit} disabled={disabled}>完成</Button>
        </View>
      </View>
    )
  }
}