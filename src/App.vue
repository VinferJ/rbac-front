<template>
  <!--<div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <transition name="el-zoom-in-center" mode="out-in">
    <router-view />
  </transition>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

html,body{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0;
  /*外部间距也是如此设置*/
  margin: 0;
  /*统一设置高度为100%*/
  height: 100%;
  width: 100%;
}

.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}
</style>
