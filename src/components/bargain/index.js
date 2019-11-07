/*
 * @Author: liuYang
 * @description: 砍价弹框
 * @Date: 2019-11-07 15:58:24
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-07 16:42:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  Block
} from '@tarojs/components'
// import classNames from 'classnames'
import bargainImage from '@img/bargain/bargain.png'
import '../../assets/icon_font/icon.scss'
import './index.styl'

export default class BargainBox extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * 点击了tab栏
   * @return void
   */
  handleClick() {
    this.props.onClick(...arguments)
  }

  render() { 
    const {
      type,
      price,
      show
    } = this.props
    // type 是 fail 的时候显示这个
    let tipsTitle = '很遗憾!'
    let tips = '您未在规定时间内支付，将不享受砍价优惠，下次努力哦～'
    let btnText = '我知道了'
    if (type === 'bargain') {
      tipsTitle = ''
      tips = '砍价成功，帮TA砍掉'
      btnText = '我也要发车'
    }
    return (
      <Block>
        {
          show ? 
            <View className='bargain-medal'>
              <View className='bargain-box'>
                <View className='tips-img'>
                  <Image src={bargainImage}></Image>
                </View>
                <View className='tips-title'>{tipsTitle}</View>
                <View className='tips'>
                  {tips}
                  {
                    price ?
                      <Text className='price'>{price}元</Text>
                      : null                      
                    }
                </View>
                <View
                  className='btn'
                  onClick={this.handleClick.bind(this, 'btn')}
                >{btnText}</View>
                {
                  type === 'bargain' ?
                    <View
                      className='iconfont iconguanbi1 icon-close'
                      onClick={this.handleClick.bind(this, 'close')}
                    ></View>      
                    : null
                }
              </View>
            </View>
            : null
        }
      </Block>
    )
  }
}

BargainBox.defaultProps = {
  type: 'fail',
  show: false,
  price: '0',
  onClick: () => {},
}

BargainBox.propTypes = {
  type: PropTypes.string,
  show: PropTypes.bool,
  price: PropTypes.string,
  onClick: PropTypes.func,
}