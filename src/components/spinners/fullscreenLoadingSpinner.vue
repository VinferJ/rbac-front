<template>
  <div class="spinner-bk-model" v-show="visible">
    <div id="spinner-content">
      <div :style="spinnerParentStyle" class="spinner">
        <div><Spinner :size="styleSize" background="#409EFF"/></div>
      </div>
      <div style="color: #409EFF;margin-top: 15px;font-size: 14px;width:150px;text-align: center;">
        {{loadingText}}
      </div>
    </div>
  </div>
</template>


<script>

import Spinner from 'vue-loading-spinner/src/components/DoubleBounce'
export default {
  name: "fullscreenLoadingSpinner",
  components:{Spinner},
  props:{
    spinnerSize:{
      type:Number,
      default: 80
    },
    loadingText:{
      type:String,
      default:'Loading...'
    },
    visible:{
      type:Boolean,
      default:false
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

#spinner-content{
  width:150px;
  left: 50%;
  top: 45%;
  z-index: 1000;
  position: absolute;
  margin-left: -50px;
}

.spinner-bk-model{
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  background: rgba(0,0,0,0.7);
}


.spinner{
  margin: 0 auto;
}

</style>