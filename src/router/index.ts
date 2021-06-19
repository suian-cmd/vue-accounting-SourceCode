import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";
import Edit from "@/components/Money/Edit.vue";
import Add from "@/components/Money/Add.vue";
import Calendar from "@/views/Calendar.vue";
import Reports from "@/views/Reports.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path : '/',
    redirect : '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path:'/money/edit',
    component: Edit
  },
  {path:'/money/edit/add/:type',
    component: Add
  },
  {
    path : '/calendar',
    component : Calendar
  },
  {
    path : '/statistics',
    component : Statistics
  },
  {
    path : '/reports',
    component : Reports
  },
  {
    path : '/labels/edit/:id',
    component: EditLabel
  },
  {
    path : '*',
    component : NotFound
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
