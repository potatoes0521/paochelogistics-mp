/*
 * @Author: guorui
 * @description: 呼叫历史
 * @Date: 2020-02-20 15:31:32
 * @LastEditors: guorui
 * @LastEditTime: 2020-02-20 15:32:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  //呼叫历史
  callPhone(data, that) {
    return requestHandle.post('callhistory/add', data, that)
  }
}