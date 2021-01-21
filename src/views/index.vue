<template>
    <div id="index">
        <baidu-map :contextMenu="true" :contextMenuList="contextMenuList" ref="mapRef" />
    </div>
</template>

<script>
    import head from './home/head'
    import content from './home/content'
    import {
        ref
    } from 'vue'
    export default {
        components: {
            head,
            content
        },
        setup(props, ctx) {
            const mapRef = ref(null);

            let pointList = [{
                lng: 121.458503,
                lat: 31.285845,
                infoWindow: `<div>窗口1</div>`
            }, {
                lng: 121.481099,
                lat: 31.238688,
                infoWindow: `<div>窗口2</div>`
            }]


            let contextMenuList = [{
                menuName: '菜单1',
                callback: v => {
                    console.log(mapRef.value);
                    mapRef.value.zoomIn();
                }
            }, {
                menuName: '菜单2',
                callback: v => {
                    alert('菜单2')
                }
            }]

            const handsClickPoint = (e, v) => {
                console.log(e, v);
            }


            return {
                pointList,
                handsClickPoint,
                contextMenuList,
                mapRef
            }
        }
    }
</script>

<style lang="scss">
    #index {}
</style>