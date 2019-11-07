<!--
 * @Author: liuYang
 * @description: 项目描述文件
 * @Date: 2019-08-14 10:25:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-07 11:45:41
 -->
## 跑车帮小程序
 
> 用taro框架  官网文档地址  https://taro-docs.jd.com/taro/docs/spec-for-taro.html

> !important 先看代码规范  根据taro官方文档格式书写 

> !important 提交代码前  先运行 taro doctor 修改报错

> 引入了taro-ui   官方文档地址  https://taro-ui.jd.com/#/docs

## 运行命令

```
yarn
```

```
yarn add  <package-name> --save
```

```
yarn build:weapp --watch
```

```
更多 build 和运行查看 通过package.json 的  scripts字段
```

## 更新项目依赖包：
```
taro update project
```

## 目录结构

* &emsp;config -- 开发配置
* &emsp;src    -- 源码目录
* &emsp;&emsp;api -- 接口统一管理  request_handle
* &emsp;&emsp;&emsp;modules -- 接口模块
* &emsp;&emsp;&emsp;&emsp;city -- 城市相关接口
* &emsp;&emsp;&emsp;&emsp;customer -- 客户相关接口
* &emsp;&emsp;&emsp;&emsp;offer -- 询价相关接口
* &emsp;&emsp;&emsp;&emsp;order -- 订单相关接口
* &emsp;&emsp;&emsp;&emsp;pay -- 支付相关接口
* &emsp;&emsp;&emsp;&emsp;user -- 用户相关接口
* &emsp;&emsp;&emsp;index -- 接口统一配置
* &emsp;&emsp;&emsp;request_handle -- 请求封装
* &emsp;&emsp;assets -- 静态资源文件
* &emsp;&emsp;&emsp;css -- 公共css
* &emsp;&emsp;&emsp;&emsp;mine_public -- 我的信息详情和客户详情界面
* &emsp;&emsp;&emsp;&emsp;theme -- 主题
* &emsp;&emsp;&emsp;icon_font -- 字体图标
* &emsp;&emsp;&emsp;&emsp;icon -- 字体图标
* &emsp;&emsp;&emsp;img -- 图片文件
* &emsp;&emsp;&emsp;&emsp;indexes -- 城市索引选择器相关图片
* &emsp;&emsp;&emsp;&emsp;mine -- 我的相关图片
* &emsp;&emsp;&emsp;&emsp;no_data -- 无数据相关图片
* &emsp;&emsp;&emsp;&emsp;register -- 注册相关相关图片
* &emsp;&emsp;&emsp;&emsp;tabBar -- tabBar相关相关图片
* &emsp;&emsp;&emsp;js -- js-sdk文件
* &emsp;&emsp;&emsp;&emsp;js -- ald-stat-conf 阿拉丁config
* &emsp;&emsp;&emsp;&emsp;js -- ald-stat 阿拉丁
* &emsp;&emsp;&emsp;&emsp;js -- qqmap-wx-jssdk 微信地图
* &emsp;&emsp;components -- 公共组件
* &emsp;&emsp;&emsp;checkbox_group -- 多选框
* &emsp;&emsp;&emsp;indexes -- 城市索引选择器
* &emsp;&emsp;&emsp;input_number -- 数字输入框
* &emsp;&emsp;&emsp;no_data -- 无数据
* &emsp;&emsp;&emsp;radio_group -- 单选框
* &emsp;&emsp;&emsp;no_title_card -- 没有标题的卡片
* &emsp;&emsp;&emsp;tabs -- 订单和询价单顶部
* &emsp;&emsp;config -- 前端项目配置
* &emsp;&emsp;&emsp;request_config -- 请求状态码之类的配置
* &emsp;&emsp;&emsp;text_config -- 文案
* &emsp;&emsp;pages -- 页面
* &emsp;&emsp;&emsp;about --关于跑车帮
* &emsp;&emsp;&emsp;choose_city --城市选择
* &emsp;&emsp;&emsp;choose_item -- 选择经销商和选择区域都是进这
* &emsp;&emsp;&emsp;customer_details -- 客户详情
* &emsp;&emsp;&emsp;customer_edit -- 客户编辑
* &emsp;&emsp;&emsp;customer_info -- 客户列表
* &emsp;&emsp;&emsp;index -- 暂定为首页
* &emsp;&emsp;&emsp;&emsp;components -- index内的组件
* &emsp;&emsp;&emsp;&emsp;&emsp;location_modal -- 地图授权弹框组件
* &emsp;&emsp;&emsp;mine -- 我的页面
* &emsp;&emsp;&emsp;mine_edit -- 编辑我的信息
* &emsp;&emsp;&emsp;mine_info -- 我的信息
* &emsp;&emsp;&emsp;offer -- 询价单列表页面
* &emsp;&emsp;&emsp;&emsp;components -- 询价单列表页面
* &emsp;&emsp;&emsp;&emsp;&emsp;offer_item -- 询价单
* &emsp;&emsp;&emsp;offer_details -- 询价单详情
* &emsp;&emsp;&emsp;order -- 订单列表
* &emsp;&emsp;&emsp;order_details -- 订单详情
* &emsp;&emsp;&emsp;pay_details -- 支付详情
* &emsp;&emsp;&emsp;pay_success -- 支付成功
* &emsp;&emsp;&emsp;place_order -- 下单页面
* &emsp;&emsp;&emsp;register --注册页面
* &emsp;&emsp;&emsp;remark --车架号填写页面
* &emsp;&emsp;&emsp;transport_state -- 运输状态
* &emsp;&emsp;&emsp;&emsp;&emsp;driver_item -- 司机信息面板
* &emsp;&emsp;&emsp;&emsp;&emsp;time_line -- 运输状态时间轴
* &emsp;&emsp;store -- redux仓库
* &emsp;&emsp;&emsp;index -- 初始化redux仓库
* &emsp;&emsp;&emsp;action -- 定义/绑定action到dispatch
* &emsp;&emsp;&emsp;&emsp;index --请填写描述信息
* &emsp;&emsp;&emsp;&emsp;publish_msg --城市信息
* &emsp;&emsp;&emsp;&emsp;user_msg -- 用户信息相关
* &emsp;&emsp;&emsp;constants -- actionType
* &emsp;&emsp;&emsp;reducers -- 响应和处理一个state
* &emsp;&emsp;&emsp;&emsp;index
* &emsp;&emsp;&emsp;&emsp;publish_msg
* &emsp;&emsp;&emsp;&emsp;user_msg -- 用户信息相关
* &emsp;&emsp;utils -- 工具文件
* &emsp;&emsp;&emsp;common -- 针对微信方法等公共系统方法的封装
* &emsp;&emsp;&emsp;location -- 腾讯地图SDK的引入和方法封装
* &emsp;&emsp;&emsp;log -- 错误日志处理
* &emsp;&emsp;&emsp;login -- 登录
* &emsp;&emsp;&emsp;md5 -- md5加密文件
* &emsp;&emsp;&emsp;refreshToken --刷新token的操作
* &emsp;&emsp;&emsp;serialize -- 针对JS原生方法的封装
* &emsp;&emsp;&emsp;storage -- 本地缓存方法的封装
* &emsp;&emsp;&emsp;timer_handle -- 各种时间处理方法
* &emsp;&emsp;app.jsx
* &emsp;&emsp;app.styl
* &emsp;package
* &emsp;project.config -- 项目配置

## 更新日志

#### 0.8.5

* 1.第一次上线
* 2.询价
* 3.订单
* 4.客户管理
* 5.支付
* 6.个人信息编辑

### 0.8.7

* 1.把注册提前 
* 2.客户信息添加的时候不强制身份证号
* 3.所有按钮添加disabled状态
* 4.车架号跳转页面填写
* 5.创建客户选择经销商和区域
* 6.必填项的*标标注

### 0.8.8

* 1.客户编辑/添加去除身份证号
* 2.客户编辑/添加经销商名字可以自定义输入
* 3.客户编辑/添加新增经销商类型
* 4.订单详情按钮服务端控制显示隐藏

### 0.8.10

* 1.注册验证码修改为4位数
* 2.分享给客户功能完善

### 0.8.14
* 1.分享图片和分享文案修改
* 2.修复订单和询价单的滚动加载bug
