<template>
  <div class="chart">
    <div style="height:46px">
      <x-header>{{$route.query.roomName}}<a slot="right" @click="look">查看聊友</a></x-header>
    </div>
    <div class="messageBox">
      <div v-for="(item,index) in currentMessageList" :key="index" class="messageContent">
          <div v-if="item.username !== username" class="infoBox">
            <div class="user">{{item.username}}</div>
            <div>
              <div class="message">
                <span>{{item.message}}</span>
            </div>
            </div>
          </div>
          <div v-else class="infoBox aboutMe">
            <div class="message">
                <span>{{item.message}}</span>
              </div>
              <div class="user">{{item.username}}</div>
          </div>
      </div>
    </div>
    <div class="bottom">
      <x-input
        style="flex:1"
        :show-clear="false" 
        v-model="message"></x-input>
        <x-button 
          mini 
          type="primary" 
          style="width:60px;margin:0;"
          @click.native="submit" >send</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton,XHeader, ViewBox } from "vux";
import { mapState, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "chart",
  components: {
    XInput,
    Group,
    XButton,
    ViewBox,
    XHeader
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState({
      username: state => state.login.username
    }),
    currentMessageList() {
      return this.$store.getters.currentRoomMessage(this.$route.query.roomId);
    }
  },
  methods: {
    submit() {
      if (!this.message) return;
      this.socket.emit("message", {
        username: this.username,
        message: this.message,
        roomId: this.$route.query.roomId
      });
    },
    look(){

    }
  },
  // 进入房间
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.socket.emit("intoRoom", {
        roomId:vm.$route.query.roomId,
        username: vm.username
      });
    });
  },
  //   beforeRouteUpdate(to, form, next) {
  //     debugger
  //   this.socket.emit("intoRoom", {
  //       roomId:this.$route.query.roomId,
  //       username: this.username
  //     });
  //     next();
  // },
  // 离开房间
  beforeRouteLeave(to, from, next) {
    this.socket.emit("leaveRoom", {
      roomId: this.$route.query.roomId,
      username: this.username
    });
    next();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
