/*
 * @Author: guorui
 * @description: 首页底部登录
 * @Date: 2020-01-13 15:44:06
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-14 14:34:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro, {
  Component
} from '@tarojs/taro'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  Button
} from '@tarojs/components'
import '../../assets/icon_font/icon.scss'
// eslint-disable-next-line import/first
import { connect } from '@tarojs/redux'
import defaultImage from '../../assets/img/register/default_icon.png'
import './index.styl'

class BottomLoginTips extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  navigatorToLogin() {
    Taro.navigateTo({
      url: `/pages/register/index`
    })
  }

  render() { 
    return (
      <View>
        {
          (this.props.userInfo.userId)
            ? null :
            <View className='bottom-login-wrapper'>
              <View className='left'>
                <Image src={defaultImage} className='image-style'></Image>
                <Text className='tips-style'>登录享受定制化服务与优惠</Text>
              </View>
              <View className='right'>
                <Button className='btn-style' onClick={this.navigatorToLogin.bind(this)}>马上登录</Button>
              </View>
            </View>
        }
      </View>
    )
  }
}

BottomLoginTips.defaultProps = {
  onClick: () => {},
}

BottomLoginTips.propTypes = {
  onClick: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(BottomLoginTips)