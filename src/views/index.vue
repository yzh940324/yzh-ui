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
                lat: 31.285845
            }, {
                lng: 121.464788,
                lat: 31.302002
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