<template>
  <div id="layout">
    <!--主容器的宽高必须100%，才会自动撑满-->
    <el-container style="width: 100%;height: 100%">
      <el-header height="60px" style="background: #999999">
        <Header></Header>
      </el-header>
      <el-container>
        <!--el-aside传入动态宽度，实现手动的侧边栏折叠-->
        <el-aside :width="sidebarWidth+'px'"
                  :style="{background:sidebarBackgroundColor}"
                  class="container-left_wrapper">
          <sidebar @sidebar-collapse="handleSidebarCollapse"></sidebar>
        </el-aside>
        <el-container>
          <el-main class="container-main_wrapper">
            <Container></Container>
          </el-main>
          <el-footer height="50px" style="background: #409EFF">
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Sidebar from "@/layout/src/components/sidebar";
import {SIDEBAR} from "@/constants/style-constant.js";
import Header from "@/layout/src/components/header";
import Footer from "@/layout/src/components/footer";
import Container from "@/layout/src/components/container";
export default {
  name: "Layout",
  components: {Container, Footer, Header, Sidebar},
  data(){
    return{
      sidebarWidth: SIDEBAR.DEFAULT_WIDTH,
      sidebarHeight: SIDEBAR.DEFAULT_HEIGHT,
      sidebarBackgroundColor:SIDEBAR.BACKGROUND_COLOR
    }
  },
  methods:{
    handleSidebarCollapse(width){
      this.sidebarWidth = width
      //再想顶层父组件提交事件
      this.$emit('sidebar-collapse',this.sidebarWidth)
    },
  }
}
</script>

<style scoped>

#layout{
  width: 100%;
  height: 100%;
}

.container-main_wrapper{
  padding: 10px;
  height: 100%;
  background-color: #E9EEF3;
}

.container-left_wrapper{
  height: 100%;
  border-right: none;transition: .3s
}

/*
  利用flex布局实现左侧固定宽带
  右侧填充剩余宽度，实现自适应
*/
.container-right_wrapper{
  width: 100%;
  height: 100%;
  flex: 1;
}

</style>