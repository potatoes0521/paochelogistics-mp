/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-02 11:51:48
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-02 13:27:48
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  //呼叫历史
  searchLinePrice(data, that) {
    return requestHandle.get('lineprice/list', data, that)
  }
}