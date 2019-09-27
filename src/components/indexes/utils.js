/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-01 15:08:17
 * @LastEditors: liuYang
 * @LastEditTime: 2019-09-17 11:20:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'

function delay(delayTime = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delayTime)
  })
}

function delayQuerySelector(
  self,
  selectorStr,
  delayTime = 500
){
  const $scope = self.$scope
  const selector = Taro.createSelectorQuery().in($scope)

  return new Promise(resolve => {
    delay(delayTime).then(() => {
      selector
        .select(selectorStr)
        .boundingClientRect()
        .exec((res) => {
          resolve(res)
        })
    })
  })
}
function uuid(len = 8, radix = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const value = []
  let i = 0
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = '-'
    value[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16)
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return value.join('')
}

export default {
  delayQuerySelector,
  uuid
}