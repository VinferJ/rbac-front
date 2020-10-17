<template>
  <div>
    <template v-for="item in routes">

      <!--
        TODO  多级路由展开后，支持sidebar的宽度动态变化
              思路1：宽度由sidebar-item控制，父级组件都是auto
              思路2：每次展开路由都计算，动态改变父组件宽度
              思路3：菜单名称经历简短，父组件预留足够宽度
      -->

      <!--hidden属性为true的路由不会渲染到sidebar的菜单中-->
      <template v-if="!item.hidden">

        <!--
            只带有1个子路由的二级路由
            实质上是一个一级菜单，因为需要在外层包裹一层layout的父级路由
            因此变成了二级路由
            一级菜单用levelOneMenu来标注
        -->
        <el-menu-item v-if="item.children && item.levelOneMenu"
                      :key="item.children[0].name" :to="item.children[0].path" :index="item.children[0].path">
          <template v-if="collapse">
            <el-tooltip
                effect="dark" :content="item.children[0].meta.title" placement="right"
                style="margin-left: -8px;">
              <i style="font-size: 18px" :class="item.children[0].meta.icon" ></i>
            </el-tooltip>
            <span style="margin-left: 11px">{{item.children[0].meta.title}}</span>
          </template>
          <template v-else>
            <i :class="item.meta.icon" style="margin-left: -11px"></i>
            <span style="margin-left: 5px">{{item.children[0].meta.title}}</span>
          </template>
        </el-menu-item>

        <!--
            当多级菜单遍历到最后一级时，并且该菜单的路由也不再含有children
        -->
        <el-menu-item v-if="!item.levelOneMenu && !item.children" :index="item.path" :to="item.path" :key="item.name">
          <template slot="title">
            <i :class="item.meta.icon" style="margin-left: -11px"></i>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>


        <!--包含2级及以上级别的菜单-->
        <el-submenu v-if="item.children && !item.levelOneMenu" :index="item.path" :key="item.name">

          <template slot="title">
            <i :class="item.meta.icon" style="margin-left: -11px"></i>
            <span style="margin-left: 5px">{{item.meta.title}}</span>
          </template>
          <template v-for="child in item.children">

            <!--子菜单还包含子菜单，即存在3级或3级以上的菜单-->
            <template v-if="child.children&&child.children.length>0">
              <el-submenu :index="child.path" :key="child.name">
                <template slot="title">
                  <i :class="child.meta.icon" style="margin-left: -11px"></i>
                  <span style="margin-left: 5px">{{child.meta.title}}</span>
                </template>
                <sidebar-item :routes="child.children" :collapse="collapse" :key="child.name"></sidebar-item>
              </el-submenu>
            </template>

            <!--子菜单由不再包含子菜单，仅有2级菜单-->
            <el-menu-item v-else :index="child.path" :to="child.path" :key="child.name">
              <template slot="title">
                <i :class="child.meta.icon" style="margin-left: -11px"></i>
                <span>{{child.meta.title}}</span>
              </template>
            </el-menu-item>
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
  methods:{
    /*
    * 所有的鉴权页面组件都是以layout作为父组件的
    * 所以需要一层父路由进行包裹
    * 因此默认所有的生成路由都至少是二级路由
    * 但实际上在菜单中只会显示子路由
    * */
    hasOnlyOneChildren(childRoute){

      /*
      * FIXME   二级路由之后还存在包含二级结构的子路由，会被识别成二级路由
      *
      * */

      /*
      * children中不在有children属性
      * 过滤掉除二级路由以外的路由
      * 这里只需要二级路由
      * */
      const levelOneRoute = childRoute.filter( item => {
        return !item.children;
      })
      //只有1个二级路由时返回
      return levelOneRoute.length === 1;
    }
  }
}
</script>

<style scoped>
/deep/.el-icon-arrow-right:before{
  display: none;
}

/*
  设置el-menu-item.is-active的背景色
*/
/deep/.el-menu-item.is-active{
  background:rgba(0,0,0,0.2)!important;
  /*
      opacity是设置整体透明的，文字也会跟着一起变透明，即整个父级元素下所有子元素都会一起透明
      而rgba的方式则是仅仅只设置背景透明
  */
  /* opacity: 0.8;*/
}

/*
  设置el-menu-item悬浮时背景色
*/
/deep/.el-menu-item:hover{
  background: rgba(0,0,0,0.2)!important;
}

</style>