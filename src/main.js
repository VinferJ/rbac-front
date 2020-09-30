import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'

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
