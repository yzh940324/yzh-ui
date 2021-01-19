<template>
  <div id="baidu-map" :style="{height: height + 'px'}">

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
       * 地图 - 初始显示高度
       */
      height: {
        type: [String, Number],
        default: 1080
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
      }
    },
    setup(props, ctx) {
      let mapGl; // 地图渲染类型
      let map; // 地图实例

      const initMap = () => { // 初始化地图方法
        map = new mapGl.Map('baidu-map'); // 创建地图实例
        let cPoint = props.centerPoint ? props.centerPoint[0] : props.pointList[0]; // 初始中心点
        map.centerAndZoom(new mapGl.Point(cPoint.lng,cPoint.lat), props.mapZoom); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(props.enableScrollWheelZoom); // 开启鼠标滚轮缩放
      }

      onMounted(() => {
        mapGl = props.gl ? BMapGL : BMap; // 地图渲染类型赋值
        if (props.centerPoint.length || props.pointList.length) { // 判断用户是否传入经纬度
          initMap(); // 初始化地图
        }else{
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

</style>