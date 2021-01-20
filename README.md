# yzh-ui
爱洋芋爱生活~
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Vue3.0路由npm
[npm install vue-router@4](https://next.router.vuejs.org/installation.html)

### 组件列表
   组件     |     组件名
 -----      |     ----- 
百度地图组件 | [baiduMap.vue](#baidu_map)

### 地图组件
<div id="baidu_map">baiduMap.vue</div>

## 地图展示需要至少一项  默认城市名为上海市
```javascript
centerPoint = [{ // 初始中心点坐标
    lng: '',
    lat: ''
}]

cityName = '上海市' // 城市名

pointList = [{ // 坐标数组（常用于渲染坐标）
  lng: '',
  lat: ''
}]
```