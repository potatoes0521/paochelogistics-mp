/*
 * @Author: liuYang
 * @description: 运力管理
 * @Date: 2019-10-08 15:54:08
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-02-04 20:04:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../request_handle.js';

export default {
  // 获取运力列表 / 搜索运力列表
  getTransportList(data, that) {
    return requestHandle.get('transfer/postertransferlist', data, that);
  },
  // 编辑运力信息
  editTransport(data, that) {
    return requestHandle.post('transfer/posteredittransfer', data, that);
  },
  // 获取运力详情
  getTransportDetails(data, that) {
    return requestHandle.get('user/gettransport', data, that);
  }
}