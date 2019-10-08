<!--
 * @Author: liuYang
 * @description: 项目描述文件
 * @Date: 2019-08-14 10:25:22
 * @LastEditors: liuYang
 * @LastEditTime: 2019-10-08 13:02:43
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
* &emsp;&emsp;&emsp;index -- 接口配置
* &emsp;&emsp;&emsp;request_handle -- 请求封装
* &emsp;&emsp;assets -- 静态资源文件
* &emsp;&emsp;&emsp;img -- 图片文件
* &emsp;&emsp;&emsp;&emsp;indexes -- 城市索引选择器相关图片
* &emsp;&emsp;&emsp;&emsp;mine -- 我的相关图片
* &emsp;&emsp;&emsp;&emsp;publish -- 发布相关图片
* &emsp;&emsp;&emsp;&emsp;register -- 注册相关相关图片
* &emsp;&emsp;&emsp;&emsp;tabBar -- tabBar相关相关图片
* &emsp;&emsp;&emsp;js -- js-sdk文件
* &emsp;&emsp;&emsp;css -- 
* &emsp;&emsp;components -- 公共组件
* &emsp;&emsp;&emsp;card -- 卡片
* &emsp;&emsp;&emsp;float_btn -- 悬浮的发布按钮
* &emsp;&emsp;&emsp;indexes -- 城市索引选择器
* &emsp;&emsp;&emsp;input_number -- 数字输入框
* &emsp;&emsp;&emsp;radio -- 单选框
* &emsp;&emsp;&emsp;selling_publish -- 卖板发布组件 发布和编辑都是进入发布页面调用这个组件
* &emsp;&emsp;&emsp;vacancy_publish -- 空位发布组件 空位的发布和编辑都是进入空位发布页面调用这个组件
* &emsp;&emsp;config -- 前端项目配置
* &emsp;&emsp;&emsp;request_config -- 请求状态码之类的配置
* &emsp;&emsp;pages -- 页面
* &emsp;&emsp;&emsp;about --关于跑车帮
* &emsp;&emsp;&emsp;choose_city --城市选择
* &emsp;&emsp;&emsp;index -- 暂定为首页
* &emsp;&emsp;&emsp;&emsp;components -- index内的组件
* &emsp;&emsp;&emsp;&emsp;&emsp;location_modal -- 地图授权弹框组件
* &emsp;&emsp;&emsp;&emsp;&emsp;location_view -- 地址展示组件
* &emsp;&emsp;&emsp;&emsp;&emsp;selling_tab -- 卖板的tab组件
* &emsp;&emsp;&emsp;&emsp;&emsp;tab
* &emsp;&emsp;&emsp;mine -- 我的页面
* &emsp;&emsp;&emsp;mine_publish -- 我的发布的信息
* &emsp;&emsp;&emsp;&emsp;components -- 我的发布的信息
* &emsp;&emsp;&emsp;&emsp;&emsp;on_data -- 没有数据
* &emsp;&emsp;&emsp;&emsp;&emsp;selling_item -- 卖板
* &emsp;&emsp;&emsp;&emsp;&emsp;vacancy_item -- 空位
* &emsp;&emsp;&emsp;register --注册页面
* &emsp;&emsp;&emsp;remark --请填写描述信息
* &emsp;&emsp;&emsp;select_user_identity -- 进入小程序之后的选则用户身份页面
* &emsp;&emsp;&emsp;selling_details --卖板详情
* &emsp;&emsp;&emsp;selling_publish --卖板发布
* &emsp;&emsp;&emsp;vacancy_details --空位详情
* &emsp;&emsp;&emsp;vacancy_publish --空位发布
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
* &emsp;&emsp;&emsp;md5 -- md5加密文件
* &emsp;&emsp;&emsp;refreshToken --刷新token的操作
* &emsp;&emsp;&emsp;secret -- 数据处理加密
* &emsp;&emsp;&emsp;serialize -- 针对JS原生方法的封装
* &emsp;&emsp;app.jsx
* &emsp;&emsp;app.styl
* &emsp;package
* &emsp;project.config -- 项目配置

## 更新日志

#### 0.8.5

1.第一次上线

