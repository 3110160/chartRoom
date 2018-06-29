import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Chart from '@/components/chart'
import RoomList from '@/components/roomList'


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },{
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册'
      }
    },{
      path: '/chart',
      name: 'chart',
      component: Chart,
      meta: {
        title: '聊天室'
      }
    },{
      path: '/roomList',
      name: 'roomList',
      component: RoomList,
      meta: {
        title: '聊天室列表'
      }
    },{
      path: '/',
      redirect: '/login'
  }] 
})

//过滤登陆态
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
// 没有登录就不能进入聊天页 
  if(to.path === '/login' || to.path === '/register'){
    next();
  }else if(!store.state.login.isLogin){
    next('/login')
  }else next();
})
export default router;
