import Vue from 'vue'
import VueScroller from 'vue-scroller'
import App from './App'
import store from './store'
import router from './router'
import Http from './http'
import qs from 'querystring'
import socket from './socket'
import './main.less'

// roomId
let roomId = location.href.indexOf('?')>-1?qs.parse(location.href.split('?')[1]).roomId:null;
// 游览器关闭或者刷新
window.addEventListener('onbeforeunload',()=>{
  console.log('onbeforeunload')
  if(roomId&&store.state.login.username){
    socket.emit("leaveRoom", {
      roomId,
      username: store.state.login.username
    });
  }
},true)
// 上线
socket.on('connect', async () => {
  if(roomId&&store.state.login.username){
    socket.emit("intoRoom", {
      roomId,
      username: store.state.login.username
    });
  }
  console.log(`connect`)
});
// 断线
socket.on('disconnect', () => {
  console.log(store.state.login.username)
  if(roomId&&store.state.login.username){
    socket.emit("leaveRoom", {
      roomId,
      username: store.state.login.username
    });
  }
});

// 接受消息
socket.on('message', (res) => {
  store.commit('mergeMassageList', res)
});

// 登录
socket.on('login', (res) => {
  if (res.type !== 1) {
    Vue.$vux.toast.text(res.msg);
    return;
  }
  store.commit('login', {
    isLogin: true,
    roomList: res.roomList
  });
  router.replace('/roomList')
});

// 注册
socket.on('register', (res) => {
  if (res.type !== 1) {
    Vue.$vux.toast.text(res.msg);
    return;
  }
  store.commit('login', {
    isLogin: true,
    roomList: res.roomList
  });
  router.replace('./roomList')
});

// 离开房间接受房间信息
socket.on('roomInfo', roomList => {
  store.commit('updataRoomInfo',roomList);
})
// 创建房间的消息
socket.on('creatRoom', newRoom => {
  store.commit('getRoomList',newRoom);
})

// 进入房间
socket.on('intoRoom', ({message}) => {
  store.commit('initMessage',message);
})

// 把socket挂载在全局
Vue.prototype.socket = socket;

//scroller组件
Vue.use(VueScroller)

Vue.config.productionTip = false;

//vux 全局组件注册
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

//解决移动端 300ms延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

//rem
import './assets/js/rem'
window.document.addEventListener('touchstart', function (event) {
  /* 解决 active兼容处理 即 伪类 :active 失效  */
}, false);

//axios 配置
Vue.prototype.$http = Http;


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
