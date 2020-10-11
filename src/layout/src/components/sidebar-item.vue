<template>
  <div>
    <template v-for="item in routes">
      <template v-if="!item.hidden">
        <!--不带有子路由-->
        <el-menu-item v-if="!item.children"
                      :key="item.name" :to="item.path" :index="item.path">
          <template v-if="collapse">
            <el-tooltip
                effect="dark" :content="item.meta.title" placement="right"
                style="margin-left: -8px;">
              <i style="font-size: 18px" :class="item.meta.icon" ></i>
            </el-tooltip>
            <span style="margin-left: 11px">{{item.meta.title}}</span>
          </template>
          <template v-else>
            <i :class="item.meta.icon" style="margin-left: -11px"></i>
            <span style="margin-left: 5px">{{item.meta.title}}</span>
          </template>
        </el-menu-item>
        <!--包含一级或多级的子路由-->
        <el-submenu v-else :index="item.path" :key="item.name">
          <template slot="title">
            <i :class="item.meta.icon" style="margin-left: -11px"></i>
            <span style="margin-left: 5px">{{item.meta.title}}</span>
          </template>
          <template v-for="child in item.children">
            <template>
              <sidebar-item v-if="child.children&&child.children.length>0" :routes="child" :key="child.name"></sidebar-item>
              <el-menu-item v-else :index="item.path+'/'+child.path" :to="item.path+'/'+child.path" :key="child.path">
                <template slot="title">
                  <span>{{child.meta.title}}</span>
                </template>
              </el-menu-item>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes:{
      type: Array,
      default: () => {return []}
    },
    collapse:{
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(this.routes)
  }
}
</script>

<style scoped>
/deep/.el-icon-arrow-right:before{
  display: none;
}
</style>