<template>
    <div id="index">
        <baidu-map :pointList="pointList" />
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

            return{
                pointList
            }
        }
    }
</script>

<style lang="scss">
    #index {}
</style>