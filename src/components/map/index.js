import baiduMap from './src/baiduMap'

export default {
    install(Vue) {
        Vue.component(baiduMap.name, baiduMap);
    }
}