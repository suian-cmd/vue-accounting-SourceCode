import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false

Vue.use(Antd);
Vue.component('Nav', Nav)
Vue.component("Layout", Layout)
Vue.component('Icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// // 解决浏览器上部地址栏占据高度
// window.onload = function (){
//   setTimeout(function (){
//     window.scrollTo(0,10000)
//   }, 0)
// }

// if(document.documentElement.clientWidth > 500){
//   window.alert('请使用手机打开本页面，以保证浏览效果')
//   const img = document.createElement('img')
//   img.src = '/apple-touch-icon.png'
//   // img.setAttribute('src','/apple-touch-icon.png')
//   img.style.position = 'fixed'
//   img.style.left = '50%'
//   img.style.top = '50%'
//   img.style.transform = 'translate(-50%,-50%)'
//   img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
//   document.body.appendChild(img)
// }