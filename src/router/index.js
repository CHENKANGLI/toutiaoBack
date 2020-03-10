import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue'
import index from '../views/index.vue'
import postlist from '../views/postlist.vue'
import catelist from '../views/catelist.vue'
import userlist from '../views/userlist.vue'
import publish from '../views/publish.vue'
import welcome from '../views/welcome.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'default',
      path: '/',
      component: index,
      redirect: { name: 'index' }
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'postlist',
          path: 'postlist',
          component: postlist
        },
        {
          name: 'catelist',
          path: 'catelist',
          component: catelist
        },
        {
          name: 'userlist',
          path: 'userlist',
          component: userlist
        },
        {
          name: 'publish',
          path: 'publish/:id?',
          component: publish
        },
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('back_token')
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
