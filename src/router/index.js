import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'





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
      redirect:'/Welcome',
      children:[
        {
          path:'/Welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        }
      ]
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
