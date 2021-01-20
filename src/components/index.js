import map from './map'

import './style/index.scss'

export default {
    install(Vue) {
        Vue.use(map); // 地图组件
    }
}