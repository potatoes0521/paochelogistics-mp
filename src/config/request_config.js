/*
 * @Author: liuYang
 * @description: 服务器状态码错误配置
 * @Date: 2019-08-13 12:22:58
 * @LastEditors: liuYang
 * @LastEditTime: 2020-04-08 16:31:12
 */

// api地址
export const defaultApiURL = 'http://gateway.api.paoche56.in/paoche-logistics/' // 测试环境  
// export const defaultApiURL = 'https://gateway.api.paoche56.com/paoche-logistics/' // 正式环境  
// export const defaultApiURL = 'https://api.paoche56.com/'  
// export const defaultApiURL = 'http://192.168.3.139:8085/'
// 上传文件地址
// export const defaultFileUrl = 'http://api.user.paoche56.in/'
export const defaultFileUrl = 'https://gateway.api.paoche56.com/user-center/'

// 图片资源服务器
export const defaultResourceImgURL = 'https://resource.paoche56.com/paochelogistics/mp_img/'

// 文件资源服务器
export const defaultResourceConfigURL = 'https://resource.paoche56.com/paochelogistics/mp_config/'

export const defaultFileURL = 'http://file.paoche56.com'

export const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

// promise status
export const SUCCESS = {
  success: 'success'
}
export const FAIL = {
  fail: 'fail'
}
export const COMPLETE = {
  complete: 'complete'
}

export const PROMISE_STATUS = {
  success: 'success',
  fail: 'fail',
  complete: 'complete'
}

export const RESULT_STATUS = {
  SUCCESS: 0,
  SIGNATURE_FAILED: 1000 // 签名失败
}

