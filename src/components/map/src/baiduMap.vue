<template>
  <div id="baidu-map">

  </div>
</template>

<script>
  import {
    ref,
    onMounted
  } from 'vue';
  export default {
    name: 'BaiduMap',
    props: {
      /**
       * 地图 - 展示纬度
       * @true 三维
       * @false 二维
       */
      gl: {
        type: Boolean,
        default: false
      },
      /**
       * 地图 - 缩放级别
       */
      mapZoom: {
        type: Number,
        default: 12
      },
      /**
       * 地图 - 鼠标滚轮缩放开启状态
       */
      enableScrollWheelZoom: {
        type: Boolean,
        default: true
      },
      /**
       * 地图 - 城市名
       */
      cityName: {
        type: String,
        default: '上海'
      },
      /**
       * 地图 - 初始中心点
       */
      centerPoint: {
        type: Array,
        default: []
      },
      /**
       * 地图 - 坐标数组
       */
      pointList: {
        type: Array,
        default: []
      },
      /**
       * 地图 - 比例尺控件
       */
      scaleControl: {
        type: Boolean,
        default: false
      }
    },
    setup(props, ctx) {
      let mapGl; // 地图渲染类型
      let map; // 地图实例

      const initMap = () => { // 初始化地图方法
        map = new mapGl.Map('baidu-map'); // 创建地图实例
        let cPoint; // 中心点/城市名
        if (props.centerPoint.length) { // 初始中心点 - 中心点入参
          cPoint = new mapGl.Point(props.centerPoint[0].lng, props.centerPoint[0].lat);
        } else if (props.pointList.length) { // 初始中心点 - 坐标数组入参
          cPoint = new mapGl.Point(props.pointList[0].lng, props.pointList[0].lat);
        } else { // 初始中心点 - 城市名入参
          cPoint = props.cityName ? props.cityName : '';
        }
        map.centerAndZoom(cPoint, props.mapZoom); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(props.enableScrollWheelZoom); // 开启鼠标滚轮缩放
        if(props.scaleControl) map.addControl(new mapGl.ScaleControl()); // 比例尺控件
      }

      onMounted(() => {
        mapGl = props.gl ? BMapGL : BMap; // 地图渲染类型赋值
        if (props.centerPoint.length || props.pointList.length || props.cityName) { // 判断用户是否传入经纬度或城市名
          initMap(); // 初始化地图
        } else {
          alert('请设置中心点经纬度（centerPoint）或经纬度坐标数组（pointList）后刷新页面再尝试')
        }
      })

      return {
        mapGl,
        initMap
      }
    }
  }
</script>

<style lang="scss">
  #baidu-map {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
</style>