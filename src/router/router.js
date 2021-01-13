import {
    baseRouter
} from './baseRouter'

export const routers = [{
    path: '/',
    redirect: '/'
  },
  ...baseRouter, // 基础路由
]