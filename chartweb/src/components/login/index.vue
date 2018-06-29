<template>
  <div class="login">
    <group class="inputs">
      <x-input 
      placeholder="讯撩账号" 
      :show-clear="false" 
      v-model="username"
      placeholder-align="left"></x-input>
    <x-input 
      placeholder="讯撩账号密码" 
      type="password"
      :show-clear="false" 
      v-model="password"
      placeholder-align="left"></x-input>
    </group>
    <x-button 
    class="btn"
    @click.native="submit" 
    type="primary">开始撩</x-button>
    <router-link to="/register" class="registerBtn">注册新用户</router-link>
  </div>
</template>

<script>
import { XInput, Group, XButton } from "vux";
import { setTimeout } from "timers";
export default {
  name: "login",
  components: {
    XInput,
    Group,
    XButton
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit() {
      let {username,password} = this;
      if (username == "" || password == "") {
        this.$vux.toast.text("别漏填了哦～");
        return;
      };
      this.$store.commit('saveUser',{username})
      this.socket.emit('login',{
        username,
        password
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
