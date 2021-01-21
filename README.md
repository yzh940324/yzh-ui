# yzh-ui
爱洋芋爱生活~
## 下载项目依赖包
```
npm install
```

### 运行
```
npm run serve
```

### 打包
```
npm run build
```

### Vue3.0路由npm
[npm install vue-router@4](https://next.router.vuejs.org/installation.html)

### 组件列表
组件 | 组件名
----- | -----
百度地图组件 | [baiduMap.vue](#baidu_map)

### 地图组件
<div id="baidu_map">baiduMap.vue</div>

### 地图组件使用方法
功能 | 跳转
----- | -----
显示地图 | [跳转](#map_show)
添加覆盖物 | [跳转](#map_point)

### 地图展示需要至少一项 默认城市名为上海市
<div id="map_show"></div>

```html
<baidu-map :centerPoint="centerPoint" :cityName="cityName" :pointList="pointList" />
```

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

### 地图添加点覆盖物
<div id="map_point"></div>

```html
<baidu-map :pointList="pointList" />
```

```javascript
pointList = [{ // 坐标数组
lng: 121.458503, 
lat: 31.285845
}, {
lng: 121.464788,
lat: 31.302002
}]
```

![avatar](/src/asstes/img/map_point.png)