<template>
  <div style="width: 100%;height: 100%">
    <div class="scrollbar-content">
      <div class="collapse-btn" @click="handleCollapse">
        <template v-if="isCollapse">
          <i class="iconfont ali-icon-zhedie2"></i>
        </template>
        <template v-else>
          <i class="iconfont ali-icon-zhedie1"></i>
        </template>
      </div>
      <el-scrollbar>
        <el-menu :default-active="this.$route.path"
                 :style="{width:menuWidth+'px'}"
                 :router="true" :collapse="isCollapse">
          <sidebar-item :routes="routes" :collapse="isCollapse" />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SidebarItem from "@/layout/src/components/sidebar-item";
export default {
  name: "Sidebar",
  components: {SidebarItem},
  data(){
    return {
      routes:this.$router.options.routes,
      isCollapse:false,
      menuWidth: 200
    }
  },
  watch:{
    isCollapse(val){
      if (val){
        this.menuWidth = 40
      }else {
        this.menuWidth = 200
      }
      //向父组件提交折叠事件
      this.$emit('sidebar-collapse',this.menuWidth)
    }
  },
  methods:{
    handleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>

.collapse-btn{
  width: inherit;cursor: pointer;
  text-align: center;
  background: #D4D4DA;
  margin-bottom: 10px;
}



.scrollbar-content{
  height: 100%;
  width: auto;
  overflow-x: hidden;
}

/*
加该样式可以解决横向滚动条一致会显示的问题
*/
/deep/.el-scrollbar__wrap{
  overflow-x: hidden!important;
}


.el-scrollbar__wrap::-webkit-scrollbar{
  display: none;
}

/**
       加该样式解决了鼠标指针放到scrollbar上会出现横向滚动条的问题
   */
/deep/.is-horizontal{
  display: none;
}


</style>