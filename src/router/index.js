import Vue from 'vue'
import Router from 'vue-router'
import { routers } from './router'

Vue.use(Router)

const routerConfig = {
  routes: routers
}

export const router = new Router(routerConfig)

router.beforeEach(async (to, from, next) => {
  console.log('路由跳转', to, from)
  next();
})

router.afterEach((to) => {
  
})
