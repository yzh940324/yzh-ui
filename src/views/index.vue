<template>
    <div id="index">
        <baidu-map cityName="上海市" />
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

        }
    }
</script>

<style lang="scss">
    #index {}
</style>