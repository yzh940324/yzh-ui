import {
  routers
} from './router'
import {
  createRouter,
  createWebHistory
} from 'vue-router'
console.log(routers);
const router = createRouter({
  history: createWebHistory(),
  routes: routers
})

export default router