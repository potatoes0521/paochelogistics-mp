/*
 * @Author: liuYang
 * @description: 正则文件
 * @Date: 2019-11-14 16:49:26
 * @LastEditors: guorui
 * @LastEditTime: 2019-11-28 10:24:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

// 身份证正则
export const idCardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
// 姓名正则
export const realNamePatter = /^[\u4E00-\u9FA5]{2,8}$/
// 手机号正则
export const phoneNumberPatter = /^1[3456789]\d{9}$/
// 验证码正则
export const verificationCodePatter = /^\d{4,6}\b/
export const handleMoney = (price) => {
  price = price.replace(/[^\d.]/g, "") //清除"数字"和"."以外的字符
  price = price.replace(/^\./g, "") //验证第一个字符是数字
  price = price.replace(/\.{2,}/g, ".") //只保留第一个, 清除多余的
  price = price.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
  price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  return price
}