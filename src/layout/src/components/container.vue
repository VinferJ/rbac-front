<template>
<div id="main-view-container" v-show="true">
  <transition name="el-fade-in" mode="out-in">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</div>
</template>

<script>
export default {
name: "Container"
}
</script>

<style scoped>

#main-view-container{
  width: 100%;
  height: 100%;
}


</style>