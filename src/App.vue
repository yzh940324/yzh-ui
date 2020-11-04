<template>
  <yzh-button @click="handleClick">按钮</yzh-button>
  <yzh-button @click="handleClick" type="primary">按钮</yzh-button>
</template>

<script>
  export default {
    name: 'App',
    setup(){
      const handleClick = (e) => {
        console.log(e)
      }

      return{
        handleClick
      }
    }
  }
</script>

<style>

</style>