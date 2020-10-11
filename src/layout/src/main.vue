<template>
<diV>
  <div :style="{height:'500px',width:cardWidth+'px'}">
    <sidebar @sidebar-collapse="handleSidebarCollapse"></sidebar>
  </div>
</diV>
</template>

<script>
import Sidebar from "@/layout/src/components/sidebar";
export default {
  name: "Layout",
  components: {Sidebar},
  data(){
    return{
      cardWidth:200
    }
  },
  methods:{
    handleSidebarCollapse(width){
      this.cardWidth = width
      //再想顶层父组件提交事件
      this.$emit('sidebar-collapse',this.cardWidth)
    },
  }
}
</script>

<style scoped>

</style>