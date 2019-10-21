/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-10-21 15:12:17
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-21 16:17:16
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
import './index.styl'

export default class Remark extends Component {
  constructor() { 
    this.state = {
      placeholderText: '请输入车架号，多个车架号请用“,”隔开',
      maxlength: -1,
      disabled: true,
      autoHeight: false,
      value: ''
    }
    this.pageParams = {}
  }
  componentDidShow() { 
    this.pageParams = this.$router.params
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
    var pages = Taro.getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.$component.setState({
      vins: value
    }, () => {
      Taro.navigateBack()
    })
  }

  //页面内的配置
  config = {
    navigationBarTitleText: '填写车架号'
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
        </View>
        <View className='button'>
          <Button className='submit' onClick={this.submit} disabled={disabled}>完成</Button>
        </View>
      </View>
    )
  }
}