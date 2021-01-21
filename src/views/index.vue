<template>
    <div id="index">
        <baidu-map :pointList="pointList" @clickPoint="handsClickPoint" />
    </div>
</template>

<script>
    import head from './home/head'
    import content from './home/content'
    export default {
        components: {
            head,
            content
        },
        setup() {
            let pointList = [{
                lng: 121.458503,
                lat: 31.285845,
                infoWindow: `<div>窗口1</div>`
            }, {
                lng: 121.481099,
                lat: 31.238688,
                infoWindow: `<div>窗口2</div>`
            }]

            const handsClickPoint = (e,v) => {
                console.log(e,v);
            }

            return{
                pointList,
                handsClickPoint
            }
        }
    }
</script>

<style lang="scss">
    #index {}
</style>