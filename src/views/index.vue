<template>
    <div id="index">
        <baidu-map :contextMenu="true" :contextMenuList="contextMenuList" :contextMenuWidth="200" ref="mapRef" />
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


            return {

            }
        }
    }
</script>

<style lang="scss">
    #index {}
</style>