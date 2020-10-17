<template>
  <transition name="el-zoom-in-center" mode="out-in">
    <router-view />
  </transition>
</template>

<script>

import {regenerateRouterTable} from "@/router/routerGenerator";


export default {
  name: 'App',
  created() {
    /*
    * 由于路由表是根据用户的角色以及访问权限动态生成的
    * 因此当重新构建vue-app时需要重新生成路由表
    * 用户以登录：生成对应访问权限路由表
    * 用户未登录：使用默认的公共路由表
    * */
    regenerateRouterTable()
    this.$router.push('/')
  }
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
  /*全局禁用html元素中的文本复制（输入框内的不会被禁）*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

}


/* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;

}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  /*background-color: #2BC0E4;*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0 rgba(240, 240, 240, .5);
  background-color: #999999;
}

/*
  transition中过度效果时间设置
  需要使用mode=out-in
*/
.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}
</style>
