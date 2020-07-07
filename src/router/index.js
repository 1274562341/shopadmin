import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

  const routes = [
    {
      path:'/Login',
      name:'Login',
      component:Login,
    },
    {
      path:'/',
      redirect:'/Login'
    },
    {
      path:'/Home',
      component:Home,
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{
  if (to.path === '/Login') return next()
  var tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr)return next('/Login')
  next()
})

export default router
