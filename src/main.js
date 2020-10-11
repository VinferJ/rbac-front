import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import '@/router/permission'

/*映入自定义的loading插件，全局通过prototype使用*/
import loadingSpinner from "@/plugins/loadingSpinner";
Vue.use(loadingSpinner)

/*使用阿里图标库*/
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

/*
* 给组件动态生成其设置的title
* 动态显示网页当前标题
* */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
