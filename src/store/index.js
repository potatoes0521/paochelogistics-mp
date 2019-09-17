/*
 * @Author: liuYang
 * @description: redux Store
 * @Date: 2019-08-15 11:16:15
 * @LastEditors: liuYang
 * @LastEditTime: 2019-08-15 15:40:22
 */

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

export default createStore(rootReducer, applyMiddleware(...middlewares))
