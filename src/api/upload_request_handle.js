/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-12 10:04:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-21 12:43:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import requestHandle from './request_handle.js';
// eslint-disable-next-line import/first
import { defaultFileUrl } from '@config/request_config.js'
/**
 * 文件类型  businessType
 * 1 身份证照片
 * 2 提车单照片
 * 3 验车照片
 * 4 交车单照片
 * 5 行驶证照片
 * 6 货车车辆照片
 * 7 询价单表格
 * 8 客户表格
 * 9 banner位图片
 * 10 车源图片
 */
// eslint-disable-next-line import/prefer-default-export
export const uploadImage = ({
  count = 9,
  sizeType = ['compressed'],
  sourceType = ['album', 'camera'],
  that,
  businessType = 1
}) => {
  return new Promise(resolve => {
    Taro.chooseImage({
      count,
      sizeType,
      sourceType,
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        uploadMultipleFiles(tempFilePaths, that, businessType).then(filePathArray => {
          resolve(filePathArray)
        })
      }
    })
  })
}

 /**
  * 上传多个文件
  * @param {Array} filePathsArray 图片临时路径的数组  里面是 字符串  ['1.png','2.png']
  * @param {Object} that this
  * @return void
  */
function uploadMultipleFiles(filePathsArray, that, businessType = 1) {
  return new Promise(resolve => {
    let count = 0
    let completeFilePathsArray = []
    uploadHandle({
      filePathsArray,
      count,
      resolve,
      completeFilePathsArray,
      that,
      businessType
    })
  })
}
 /**
  * 递归处理上传图片 对象方式传参
  * @param {Array} {filePathsArray 图片临时路径的数组  里面是 字符串  ['1.png','2.png']
  * @param {Number} count 现在是第几张
  * @param {Array} completeFilePathsArray 将来存返回值的地方
  * @param {Function} resolve promise
  * @param {Object} that} this
  * @return void
  */
function uploadHandle({
  filePathsArray,
  count,
  completeFilePathsArray,
  resolve,
  that,
  businessType = 1
}) {
  if (filePathsArray.length > 1) {
    Taro.showLoading({
      title: '正在上传第' + count + '张图片',
    })
  }
  Taro.uploadFile({
    url: defaultFileUrl + 'file/upload',
    filePath: filePathsArray[count],
    name: 'file',
    header: {
      "Content-Type": "multipart/form-data"
    },
    formData: {
      'businessType': businessType
    },
    success: async (res) => {
      if (!res || !res.data) { 
        console.log(res, '上传失败')
        return
      }
      const data = JSON.parse(res.data)
      if (data.code === 200) {
        count++ //下一张
        const filePath = JSON.parse(res.data).data.fileVirtualPath
        let sendData = {
          virthPath: filePath
        }
        const url = await splicingURL(sendData, that)
        completeFilePathsArray.push(url)
        // 判断成功了多少张图片 如果跟传入的数组一样 就直接
        if (count == filePathsArray.length) {
          resolve(completeFilePathsArray)
          Taro.hideLoading()
          Taro.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          uploadHandle({
            filePathsArray,
            count,
            completeFilePathsArray,
            resolve,
            that
          })
          console.log('正在上传第' + count + '张');
        }
      } else {
        resolve(data)
      }
    },
    fail: (err) => {
      console.log('第' + count + '张失败', err)
      count-- // 上一张
    }
  })
}
 /**
  * 请求获取全部路径
  * @param {Object} data 请求的参数
  * @param {Object} that this
  * @return void
  */
function splicingURL(data, that) {
  return requestHandle.get(`${defaultFileUrl}file/read?virthPath=${data.virthPath}`, data, that)
}