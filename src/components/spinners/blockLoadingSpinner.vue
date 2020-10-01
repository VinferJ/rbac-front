<template>
  <div class="block-spinner-bk-model" v-show="visible">
    <div id="block-spinner-content">
      <div :style="spinnerParentStyle" class="spinner">
        <div><Spinner :size="styleSize" /></div>
      </div>
    </div>
  </div>
</template>


<script>

import Spinner from 'vue-loading-spinner/src/components/Circle8'
export default {
  name: "blockLoadingSpinner",
  components:{Spinner},
  props:{
    spinnerSize:{
      type:Number,
      default: 80
    },
    visible:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
      size:this.spinnerSize,
      styleSize:this.spinnerSize + 'px',
    }
  },
  computed:{
    spinnerParentStyle:{
      get(){
        let spinnerParentStyle = {
          width:'',
          height:'',
          textAlign:'center'
        }
        const spinnerSize = this.size
        spinnerParentStyle.width = spinnerSize + 'px'
        spinnerParentStyle.height = spinnerSize + 'px'
        return spinnerParentStyle
      }
    }
  },
  methods:{}
}
</script>

<style >

#block-spinner-content{
  width:150px;
  left: 50%;
  top: 45%;
  z-index: 1000;
  position: absolute;
  margin-left: -50px;
}

.block-spinner-bk-model{
  width: 100%;
  height: 100%;
  z-index: 500;
  position: absolute;
}


.spinner{
  margin: 0 auto;
}

</style>