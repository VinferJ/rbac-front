<template>
  <div id="dev-page-content">
    <div class="empty-div"></div>
    <div class="img-container">
      <img alt="" src="../../assets/images/dev-ing.png" class="img-align-center">
      <div style="font-size: 50px;color: #999999">· · · ·</div>
    </div>
    <div class="tip-text-container">
      哎呀...页面好像还在开发中呢...T-T
    </div>
  </div>
</template>

<script>
export default {
name: "developingPage"
}
</script>

<style scoped>

#dev-page-content{
  height: 100%;
  width: 100%;
  background: #ffffff;
}
.empty-div{
  height: 100px;
}
.img-container{
  width: 50%;
  margin-left: 25%;
  text-align: center;
}

.img-align-center{
  clear:both;display: block;margin: auto;
}

.tip-text-container{
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  color: #999999;
}



</style>