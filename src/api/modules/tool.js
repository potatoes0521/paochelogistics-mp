/*
 * @Author: liuYang
 * @description: 城市处理接口
 * @Date: 2019-10-08 15:54:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-12 12:20:41
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取全部工具列表
  getAllToolList(data, that) {
    return requestHandle.get('servicetool/list', data, that);
  },
  // 获取置顶工具列表
  getTopToolList(data, that) {
    return requestHandle.get('servicetool/showtoplist', data, that, false);
  }
}