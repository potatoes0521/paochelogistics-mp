/*
 * @Author: liuYang
 * @description: 按钮组的显示控制
 * @Date: 2019-12-13 15:09:48
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-21 17:46:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import _differenceBy from "lodash/differenceBy";
// eslint-disable-next-line import/prefer-default-export
const orderButtons = [
  {
    key: 'logisticsDetail',
    name: '查看运输状态'
  },
  {
    key: 'inviteCustomer',
    name: '分享给客户'
  },
  {
    key: 'payOrder',
    name: '立即支付'
  },
  {
    key: 'helpPayOrder',
    name: '代付的立减支付'
  },
  {
    key: 'shareOrder',
    name: '分享砍价'
  },
  {
    key: 'otherOnePayOrder',
    name: '请别人代付'
  },
  {
    key: 'submitOrderTransport',
    name: '提交运力信息'
  },
  {
    key: 'seeOrderTransport',
    name: '查看运力信息'
  }
]
 /**
  * 处理订单的按钮组 本地没有的  不予显示
  * 1. 找到数据里有  本地没有的
  * 2. 数据里有除去没有的就是有的
  * @param {Array} buttons 后端返回的按钮组
  * @return data 处理后的数据
  */
export const handleOrderButtons = (buttons) => {
  const arrDiffData = _differenceBy(buttons, orderButtons, "key");
  const data = _differenceBy(buttons, arrDiffData, "key"); 
  return data
}

const offerButtons = [
  {
    key: 'cancelInquiry',
    name: '取消询价'
  },
  {
    key: 'urgeInquiry',
    name: '催询价'
  },
  {
    key: 'submitOrder',
    name: '立即下单'
  },
  {
    key: 'againInquiry',
    name: '再次询价'
  },
  {
    key: 'viewOrder',
    name: '查看订单'
  },
]

 /**
  * 处理订单的按钮组 本地没有的  不予显示
  * 1. 找到数据里有  本地没有的
  * 2. 数据里有除去没有的就是有的
  * @param {Array} buttons 后端返回的按钮组
  * @return data 处理后的数据
  */
 export const handleOfferButtons = (buttons) => {
   const arrDiffData = _differenceBy(buttons, offerButtons, "key");
   const data = _differenceBy(buttons, arrDiffData, "key");
   return data
 }

const toolButtons = [
  {
    tool_key: 'paoche_gasoil',
    name: '跑车加油'
  },
  {
    tool_key: 'paoche_carsource',
    name: '车源'
  }
]

 /**
  * 处理工具的按钮组 本地没有的  不予显示
  * 1. 找到数据里有  本地没有的
  * 2. 数据里有除去没有的就是有的
  * @param {Array} buttons 后端返回的按钮组
  * @return data 处理后的数据
  */
export const handleToolButtons = (buttons) => {
  const notCheckData = buttons.map(item => {
    return +item.openMode === 1
  })
  const arrDiffData = _differenceBy(buttons, toolButtons, "tool_key");
  const data = _differenceBy(buttons, arrDiffData, "tool_key");
  let returnData = [...notCheckData, ...data]
  returnData.sort(compare('orderNum'));
  return returnData
}

function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}
