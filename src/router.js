import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import People from './views/People.vue'
import FireBase from './views/FireBase.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/people',
      name: 'people',
      component: People
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/People.vue')
    },
    {
      path: '/firebase',
      name: 'firebase',
      component: FireBase
    },
  ]
})
