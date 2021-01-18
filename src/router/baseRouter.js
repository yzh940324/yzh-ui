// 基础路由
export const baseRouter = [{
    path: '/',
    name: 'index',
    meta: {
        title: '首页'
    },
    component: () => import('@/views/index')
}]