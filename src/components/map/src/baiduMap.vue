<template>
  <div>
    <div class="yzh-baidu-map" id="BaiduMap" :style="{height: `${height}px`}"></div>
    <!-- 头部导航 -->
    <div v-if="head">
      <div v-for="(nav,index) in navList" :class="index == isChecked ? 'checked' : ''" :key="index"
        @click="handleNavigation(nav.type,index)">{{nav.name}}</div>
    </div>
    <!-- 底部导航 -->
    <div class="footer" @click="handleGoBaiduApp" v-if="BaiduHref">
      开始导航
    </div>
  </div>
</template>

<script>
  export default {
    name: "YzhBaiduMap",
    props: {
      height: { // 地图高度
        type: [String, Number],
        default: 1000
      },
      mapType: { // 地图渲染类型 2D：2D 3D: 3D GL
        type: String,
        default: '2D'
      },
      coordinateList: { // 坐标数组
        type: Array,
        default () {
          return []
        }
      },
      navigation: { // 路线导航 true：开启 false: 关闭 
        type: Boolean,
        default: false,
      },
      /**
       * 百度APP地址
       * @origin latlng:经纬度 | name：名称
       * @mode 搜索类型 walking:步行、riding：骑行、driving：驾车、transit：公交
       */
      BaiduHref: {
        type: String,
        default: ''
      },
      head: { // 头部显示状态 true:显示 false:关闭
        type: Boolean,
        default: false
      },
      navigationStartPoint: Object, // 导航起始点
      navigationEndPoint: Object, // 导航结束点
      zoomStatus: { // 鼠标滚轮缩放 true:开启 false:关闭
        type: Boolean,
        default: true
      },
      rules: { // 比例尺 true：开启 false：关闭
        type: Boolean,
        default: true
      },
      pointAnimation: { // 标记点动画 true:开启 false:关闭
        type: Boolean,
        default: false
      },
      markerClusterer: { // 标记点聚合 true:开启 false:关闭
        type: Boolean,
        default: false,
      },
      initNavigation: { // 初始是否开启导航
        type: Boolean,
        default: false
      },
      iconSize: { // 自定义图标尺寸
        type: Object,
        default () {
          return {
            width: 50,
            height: 50
          }
        }
      },
      icon: String // 例子：require("./assets/icon.png")
    },
    methods: {
      /**
       * 初始化地图上得点标记
       * @map 地图对象
       * @coordinate 地图标记点对象
       * @icon 图标
       * @obj 当前chu
       */
      handsAddMarker(map, coordinate, icon, obj) {
        let marker = new this.mapMode.Marker(coordinate, { // 创建点标记
          icon: icon ? icon : ''
        })

        map.addOverlay(marker); // 地图上添加点标记

        if (this.markerClusterer) {
          this.markers.push(marker); // 追加聚合点
        }

        if (this.pointAnimation) { // 标记点跳动动画  true:开启 false:关闭
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }

        let _this = this;
        
        marker.addEventListener("click", function (e) { // 地图图标点击事件
          _this.navigationType.watch = !_this.navigationType.watch;
          _this.$emit('mapClick', obj, _this.navigationType.type);
        });
      },
      /**
       * 初始化地图
       * @map 实例
       * @icon 自定义图标
       * @coordinate 坐标点
       * @initPoint 只创建标记点
       */
      initMap(initPoint) {
        let icon;
        if (!initPoint) {
          this.map = new this.mapMode.Map('BaiduMap'); // 创建Map实例
   
          if (this.coordinateList.length) {
            this.map.centerAndZoom(new this.mapMode.Point( // 初始中心点
              this.coordinateList[0].lng, // 纬度
              this.coordinateList[0].lat // 经度
            ), 14);
          }
          this.map.enableScrollWheelZoom(this.zoomStatus); // 鼠标滚轮缩放 true:开启 false:关闭

          if (this.rules) {
            this.map.addControl(new this.mapMode.ScaleControl()); // 添加比例尺控件
          }

          if (this.icon) {
            icon = new this.mapMode.Icon( // 自定义图标
              this.icon,
              new this.mapMode.Size(this.iconSize.width, this.iconSize.height)
            )
          }
        }

        let _this = this;

        this.coordinateList.forEach(v => { // 遍历生成点
          let coordinate = new this.mapMode.Point(v.lng, v.lat);
          if (!v.isBaidu) { // 非百度坐标系转换
            coordinate = this.mapConvertor(coordinate);
          }
          this.handsAddMarker(this.map, coordinate, icon, v);
        })

        new BMapLib.MarkerClusterer(this.map, {
          markers: this.markers
        })
      },
      /**
       *  前往百度API
       */
      handleGoBaiduApp() {
        window.location.href = this.BaiduHref;
      },
      /**
       * 导航
       * @type 类型
       */
      handleNavigation(type, index) {
        this.navigationType.type = type;
        this.isChecked = index;
      },
      /**
       * 开启导航
       * @type 导航类型
       */
      navStart(type) {
        let navigation = new this.mapMode[type + 'Route'](this.map, {
          renderOptions: {
            map: this.map,
            autoViewport: true
          }
        })
        this.map.clearOverlays(navigation);
        let startPoint = this.navigationStartPoint;
        let endPoint = this.navigationEndPoint;
        if (!startPoint.isBaidu) { // 判断导航起点是否为百度坐标系 - 非百度
          startPoint = this.mapConvertor(startPoint)
        }
        if (!endPoint.isBaidu) { // 判断导航终点是否为百度坐标系 - 非百度
          endPoint = this.mapConvertor(endPoint);
        }
        
        
        let start = new this.mapMode.Point(startPoint.lng, startPoint.lat);
        let end = new this.mapMode.Point(endPoint.lng, endPoint.lat);
        navigation.search(start, end)
        // this.initMap(true); 执行将会保留点
      },
      /**
       * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标 
       */
      mapConvertor(point) {
        let x = point.lng;
        let y = point.lat;
        let x_pi = Math.PI * 3000.0 / 180.0;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        let tempLon = z * Math.cos(theta) + 0.0065;
        let tempLat = z * Math.sin(theta) + 0.006;
        let gps = {
          isBaidu: point.isBaidu,
          lng: tempLon,
          lat: tempLat
        };
        return gps;
      }
    },
    mounted() {
      this.mapMode = this.mapType == '2D' ? BMap : BMapGL; // 地图渲染类型 2D:3D  3D:3D GL
      this.initMap(); // 初始化地图
    },
    data() {
      return {
        map: null,
        mapMode: null,
        markers: [],
        navigationType: {
          type: 'Transit',
          watch: true
        },
        isChecked: '3', // 默认选中
        navList: [{
          type: 'Walking',
          name: '步行'
        }, {
          type: 'Riding',
          name: '骑行'
        }, {
          type: 'Driving',
          name: '驾车'
        }, {
          type: 'Transit',
          name: '公交'
        }],
      }
    }
  }
</script>

<style>

</style>