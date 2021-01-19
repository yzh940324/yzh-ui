<template>
    <div id="index">
        <baidu-map :centerPoint="centerPoint" />
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
            let centerPoint = [{
                lng: 121.461466,
                lat: 31.284477
            }]

            return {
                centerPoint
            }
        }
    }
</script>

<style lang="scss">
    #index {}
</style>