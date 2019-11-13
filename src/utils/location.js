/*
 * @Author: liuYang
 * @description: 地图SDK方法封装
 * 官网地址 https: //lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html
 * @Date: 2019-08-14 15:12:20
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-13 13:27:14
 */

import Taro from '@tarojs/taro'
import QQMapWX from '@js/qqmap-wx-jssdk.min.js'

var QQMapSDK;

QQMapSDK = new QQMapWX({
  key: 'MVTBZ-KGHKK-ZCMJP-AFTS5-2NQO2-ZHBMJ'
});

 /**
  * 使用腾讯地图SDK把坐标转换成地址
  * @param {Number} latitude 纬度
  * @param {Number} longitude 经度
  * @param {Object | String} resultType 
  *     formatted_addresses   // 详细地址
  *     ad_info // 行政区划信息
  *     // 可自我拓展  不传默认返回全部信息
  * @return void
  */
export const convertingGPS = (latitude, longitude, resultType = 'formatted_addresses') => {
  return new Promise((resolve,reject) => {
    QQMapSDK.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (res) => {
        if (res.status === 0) { 
          const data = res.result
          switch (resultType) {
            case 'formatted_addresses':
              resolve(data.formatted_addresses && data.formatted_addresses.recommend)              
              break;
            case 'ad_info':
              resolve(data.ad_info && data.ad_info)
              break;
            default:
              resolve(data)
              return;
          }
        } else {
          Taro.showToast(res.message)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const getCityList = () => {
  
}
