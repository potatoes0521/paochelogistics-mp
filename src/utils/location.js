/*
 * @Author: liuYang
 * @description: 地图SDK方法封装
 * 官网地址 https: //lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html
 * @Date: 2019-08-14 15:12:20
 * @LastEditors: liuYang
 * @LastEditTime: 2019-08-21 15:57:18
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
  * @param {Object | String} allData 
  *     true是返回Object类型的全部数据  false是详细地址  具体的参考文档
  * @return void
  */
export const convertingGPS = (latitude, longitude, allData = false) => {
  return new Promise((resolve,reject) => {
    QQMapSDK.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (res) => {
        if (res.status === 0) { 
          const data = res.result
          if (allData) { 
            resolve(data)
          } else {
            resolve(data.formatted_addresses && data.formatted_addresses.recommend)
          }
        } else {
          Taro.showToast(res.message)
        }
      },
      fail: (err) => {
        console.log(err)
        reject(err)
      },
      complete: () => {
        Taro.hideLoading();
      }
    })
  })
}

export const getCityList = () => {
  
}
