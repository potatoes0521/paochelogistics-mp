import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import { Provider } from '@tarojs/redux'
import configStore from './store/index.js'
// import './assets/js_sdk/ald-stat'
import Index from './pages/index'
import './assets/icon_font/icon.scss'
import './app.styl'

const store = configStore

class _App extends Component {

  componentDidMount() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function () {
      //请求完新版本信息的回调

    })
    //下载新版本
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好,是否重启应用?',
        success() {
          updateManager.applyUpdate()
        }
      })
    })
    //新版本下载失败
    updateManager.onUpdateFailed(function (res) {
      console.log(res)
    })
  }

  config = {
    pages: [
      'pages/index/index',
      'pages/offer/index',
      'pages/order/index',
      'pages/mine/index',
      'pages/order_details/index',
      'pages/order_transport/index',
      'pages/transport_state/index',
      'pages/offer_details/index',
      'pages/push_offer/index',
      'pages/place_order/index',
      'pages/about/index',
      // 个人信息
      'pages/mine_info/index',
      'pages/mine_edit/index',
      // 客户
      'pages/customer_info/index',
      'pages/customer_details/index',
      'pages/customer_edit/index',
      // 运力模块
      'pages/transport_info/index',
      'pages/transport_edit/index',
      // 实名认证
      'pages/real_name_authentication/index',
      // 选择城市
      'pages/choose_city/index',
      'pages/choose_city_three_level/index',
      // 注册
      'pages/register/index',
      // 支付详情
      'pages/pay_details/index',
      // 支付成功
      'pages/pay_success/index',
      // 选择项
      'pages/choose_item/index',
      // 备注
      'pages/remark/index',
      // 分享砍价
      'pages/share_bargain/index',
      'pages/webview/index',
      // 工具
      'pages/tool/index',
      // 进入小程序内部页面检测
      'pages/testing/index',
      // 车源
      'pages/used_car/index',
      'pages/used_car_details/index',
      'pages/used_car_publish/index',
      // 搜索热门线路价格
      'pages/search_line/index',
      // 车务
      'pages/car_proxy/index',
      'pages/car_proxy_details/index',
      'pages/car_proxy_pay_refund/index',
      'pages/car_proxy_pay_success/index',
      'pages/car_proxy_publish/index',
      // 车辆救援
      'pages/car_rescue/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '跑车物流',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#999999",
      selectedColor: "#2D7BAF",
      borderStyle: "black",
      backgroundColor: "#F7F7F7",
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "assets/img/tab_bar/home.png",
          selectedIconPath: "assets/img/tab_bar/home_active.png",
          text: "首页"
        },
        {
          pagePath: "pages/offer/index",
          iconPath: "assets/img/tab_bar/offer.png",
          selectedIconPath: "assets/img/tab_bar/offer_active.png",
          text: "询价单"
        },
        {
          pagePath: "pages/order/index",
          iconPath: "assets/img/tab_bar/order.png",
          selectedIconPath: "assets/img/tab_bar/order_active.png",
          text: "订单"
        },
        {
          pagePath: "pages/mine/index",
          iconPath: "assets/img/tab_bar/mine.png",
          selectedIconPath: "assets/img/tab_bar/mine_active.png",
          text: "我的"
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
      }
    },
    navigateToMiniProgramAppIdList: [
      "wx1f1ea04b716771be",
      "wx3c23f726e516e0a0"
    ]
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<_App />, document.getElementById('app'))
