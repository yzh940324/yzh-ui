<template>
    <div id="index">
        <yzh-baidu-map :coordinateList="coordinateList"/>
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
            const coordinateList = [{
                lng: 121.461522,
                lat: 31.283114
            }]
            
            return{
                coordinateList
            }
        }
    }
</script>

<style lang="scss">
    #index {}
</style>