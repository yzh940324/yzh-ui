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
| 组件         | 组件名                     |
| ------------ | -------------------------- |
| 百度地图组件 | [baiduMap.vue](#baidu_map) |

### 地图组件
<div id="baidu_map">baiduMap.vue</div>

### 地图组件使用方法
| 功能         | 跳转                      |
| ------------ | ------------------------- |
| 地图显示类型 | [跳转](#map_gl)           |
| 显示地图     | [跳转](#map_show)         |
| 添加覆盖物   | [跳转](#map_point)        |
| 覆盖物点击   | [跳转](#map_point_click)  |
| 右键菜单     | [跳转](#map_context_menu) |

### 地图显示类型
<div id="map_gl"></div>

默认为GL模式可设置gl=false进行关闭
```html
<baidu-map :gl="true" />
```

### 地图展示需要至少一项 默认城市名为上海市
<div id="map_show"></div>

```html
<baidu-map :centerPoint="centerPoint" :cityName="cityName" :pointList="pointList" />
```

```javascript
centerPoint = [ // 初始中心点坐标
    { 
    lng: '',
    lat: ''
    }
]

cityName = '上海市' // 城市名

pointList = [ // 坐标数组（常用于渲染坐标）
    { 
    lng: '',
    lat: ''
    }
]
```

### 地图添加点覆盖物
<div id="map_point"></div>

```html
<baidu-map :pointList="pointList" />
```

```javascript
pointList = [ // 坐标数组
    { 
        lng: 121.458503,
        lat: 31.285845
    }, {
        lng: 121.464788,
        lat: 31.302002
    }
]
```
![点覆盖示例图](https://github.com/yzh940324/yzh-ui/blob/master/src/assets/img/map_point.png)


### 地图点覆盖物点击
<div id="map_point_click"></div>

```html
<baidu-map :pointList="pointList" @clickPoint="handsClickPoint" />
```

### 目前分为两种方式 传入infoWindow自定义弹窗显示或执行clickPoint函数获取点击对象

```javascript
pointList = [ // 坐标数组
    { 
    lng: 121.458503,
    lat: 31.285845,
    infoWindow: `<div>窗口1</div>` // 自定义弹窗内容
    }, {
    lng: 121.464788,
    lat: 31.302002,
    infoWindow: `<div>窗口2</div>` // 自定义弹窗内容
    }
]

const handsClickPoint = (e,v) => {
// e：覆盖点数据
// v：百度地图marker对象
// 一般常用于点击后自定义操作
}
```
### 地图右键菜单
<div id="map_context_menu"></div>

### contextMenu-菜单开启状态，contextMenuList-菜单列表，contextMenuWidth-菜单宽度，ref方便菜单调用地图组件内方法
```html
<baidu-map :contextMenu="true" :contextMenuList="contextMenuList" :contextMenuWidth="200" ref="mapRef" />
```

```javascript
let contextMenuList = [
    { // 菜单列表
    menuName: '地图放大', // 地图名
    callback: v => { // 点击菜单回调函数
    mapRef.value.zoomIn(); // 地图放大
    }}, {
    menuName: '地图缩小',
    callback: v => {
    mapRef.value.zoomOut(); // 地图缩小
    }},{
    menuName: '自定义回调',
    callback: v => {
    alert('点击了自定义回调菜单'); // 可自定义配置
    }}]
```