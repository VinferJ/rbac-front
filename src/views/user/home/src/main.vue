<template>
<div>
  <div style="width: 100%;height: 100%;">
    <el-card>
      <el-input v-model="text"></el-input>
      <el-button type="primary" @click="showDetails">当前用户</el-button>
      <el-button type="primary" @click="logout">退出登录</el-button>
      <el-button type="primary" @click="showRouter">用户路由表</el-button>
      <el-button type="primary" @click="generateRouter">动态路由</el-button>
    </el-card>
    <!--<div style="height: auto;margin-top: 100px;margin-left: 100px;margin-bottom: 100px">
      <div  :style="{width:sidebarWidth+'px',borderRight:'none'}" >
        <Layout @sidebar-collapse="handleCollapse"></Layout>
      </div>
    </div>-->
  </div>
</div>
</template>

<script>


import {getCurrUid, loadUserInfo} from "@/utils/localStorageUtil";
import {clearToken} from "@/utils/tokenUtil";
import {getCurrentRouterTable} from "@/router";
import {dynamicGenerateRouterTable} from "@/router/routerGenerator";
import {permissionTable} from "@/tables/permission_table";
import {SIDEBAR} from "@/constants/style-constant";

export default {
  name: "Home",
  data(){
    return{
      text:'',
      routerTable:[],
      sidebarWidth: SIDEBAR.DEFAULT_WIDTH
    }
  },
  methods:{

    handleCollapse(width){
      this.sidebarWidth = width
    },

    showDetails(){
      let user = loadUserInfo(getCurrUid())
      this.text = JSON.stringify(user)
    },

    logout(){
      clearToken()
      window.location.reload()
    },

    showRouter(){
      this.$notify({
        title:'用户路由表',
        type:'info',
        message:JSON.stringify(getCurrentRouterTable()),
        duration: 0
      })
    },

    generateRouter(){
      dynamicGenerateRouterTable(permissionTable)
      this.routerTable = permissionTable
      console.log(this.routerTable)
    }
  }
}
</script>

<style scoped>

</style>