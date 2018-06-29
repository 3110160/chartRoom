<template>
  <div class="me">
    <group class="inputs">
      <x-input 
      placeholder="撩号" 
      :show-clear="false" 
      v-model="username"
      placeholder-align="left"></x-input>
    <x-input 
      placeholder="密码" 
      type="password"
      :show-clear="false" 
      v-model="newPassword"
      placeholder-align="left"></x-input>
      <x-input 
      placeholder="确认密码" 
      type="password"
      :show-clear="false" 
      v-model="newPasswordAgain"
      placeholder-align="left"></x-input>
    </group>
    <x-button 
    class="btn"
    @click.native="submit" 
    type="primary">注册</x-button>
  </div>
</template>

<script>
import { XInput, Group, XButton } from "vux";
import axios from "axios";
export default {
  name: "register",
  components: {
    XInput,
    Group,
    XButton
  },
  data() {
    return {
      username: "",
      newPassword: "",
      newPasswordAgain: ""
    };
  },
  methods: {
    submit() {
      if (
        this.username == "" ||
        this.newPassword == "" ||
        this.newPasswordAgain == ""
      ) {
        this.$vux.toast.text("不要漏填哦～");
        return;
      }
      if (this.newPassword !== this.newPasswordAgain) {
        this.$vux.toast.text("两次密码不一致");
        return;
      }
      this.$store.commit('saveUser',{username:this.username})
      this.socket.emit("register", {
        password: this.newPassword,
        username: this.username
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
