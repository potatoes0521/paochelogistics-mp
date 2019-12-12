/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-11 10:26:46
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-12 10:13:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import api from '@api/index.js'
import { connect } from '@tarojs/redux'

import './index.styl'

class HelpPayBtn extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  /**
   * 请求支付内容
   * @return void
   */
  payMoney() {
    let { orderCode } = this.props
    let sendData = {
      orderCode,
      isPaytoll: 1
    }
    api.pay.getPayParams(sendData, this).then(res => {
      this.weChatPay(res)
    })

  }
  /**
   * 支付
   * @param {Object} params 后端返回的支付的参数
   * @return void
   */
  weChatPay(params) {
    Taro.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        if (!res) return
        Taro.showToast({
          title: '支付成功'
        })
        setTimeout(() => {
          this.props.onPayOver()
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }

  render() {
    let { item } = this.props
    return (
      <View
        className='helpPayOrder'
        onClick={this.payMoney}
      >{item.name}</View>
    )
  }

}

HelpPayBtn.defaultProps = {
  item: {},
  orderCode: '',
  onPayOver: () => {}
}

HelpPayBtn.propTypes = {
  item: PropTypes.object.isRequired,
  orderCode: PropTypes.string.isRequired,
  onPayOver: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(HelpPayBtn)
