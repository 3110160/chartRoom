<template>
  <view-box>
    <x-header>聊天室列表<a slot="right" @click="creatRoom">新增</a></x-header>
    <group v-if="roomList.length">
      <cell 
          v-for="(item,index) in roomList" 
          :key="index" 
          :title="item.roomName"
          :link="`/chart?roomId=${item.roomId}&roomName=${item.roomName}`"
          :inline-desc="`在线人数 ${item.onliners}`"></cell>
    </group>
    <div v-else style="margin:100px auto 0 auto;width:200px">
      <svg t="1530157347819" class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8916" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs></defs><path d="M512.768 311.04L71.424 429.312V691.2l441.344-118.144L954.88 691.2V429.312L512.768 311.04z m0 0" fill="#e6e6e6" p-id="8917"></path><path d="M510.208 1017.344L97.024 906.88c-16.128-4.224-27.136-18.688-27.136-34.816V428.16l440.448 118.144v471.04z m0 0" fill="#e6e6e6" p-id="8918"></path><path d="M399.616 784.256L29.696 684.8c-20.48-5.12-31.488-26.368-25.472-45.952L71.296 428.8l440.448 118.144L443.648 760.32c-5.76 18.048-25.216 29.056-44.032 23.936" fill="#e6e6e6" p-id="8919"></path><path d="M510.208 1017.344l417.536-109.696c16.128-4.224 27.136-18.688 27.136-34.816V429.056l-444.672 117.376v470.912z m0 0" fill="#e6e6e6" p-id="8920"></path><path d="M616.448 782.72l375.808-98.688c19.584-5.12 31.488-26.368 25.472-45.952L954.88 429.056l-446.336 117.376 63.744 211.712c5.888 18.688 25.472 29.696 44.16 24.576" fill="#e6e6e6" p-id="8921"></path><path d="M312.064 50.688h-54.4c-5.12 0-8.448-3.328-8.448-8.448 0-5.12 3.328-8.448 8.448-8.448h54.4c5.12 0 8.448 3.328 8.448 8.448 0 4.992-3.328 8.448-8.448 8.448z m0 0" fill="#e6e6e6" p-id="8922"></path><path d="M284.928 77.824c-5.12 0-8.448-3.328-8.448-8.448V14.848c0-5.12 3.328-8.448 8.448-8.448 5.12 0 8.448 3.328 8.448 8.448v54.4c0 4.352-3.328 8.576-8.448 8.576z m66.304 188.8c-5.12 0-8.448-3.328-8.448-8.448v-36.608c0-5.12 3.328-8.448 8.448-8.448 5.12 0 8.448 3.328 8.448 8.448v36.608c0.128 4.224-3.456 8.448-8.448 8.448z m55.296 25.472c-5.12 0-8.448-3.328-8.448-8.448v-9.472c0-5.12 3.328-8.448 8.448-8.448 5.12 0 8.448 3.328 8.448 8.448v9.344c0.128 5.12-4.224 8.576-8.448 8.576z m509.184 22.912c-2.432 0-4.224-0.896-6.016-2.432-3.328-3.328-3.328-8.448 0-11.904l32.256-32.256c3.328-3.328 8.448-3.328 11.904 0 3.328 3.328 3.328 8.448 0 11.904L921.6 312.576c-1.664 1.664-3.2 2.432-5.888 2.432z m0 0" fill="#e6e6e6" p-id="8923"></path><path d="M948.096 315.008c-2.56 0-4.224-0.896-6.016-2.432L909.952 280.32c-3.328-3.328-3.328-8.448 0-11.904 3.328-3.328 8.448-3.328 11.904 0l32.256 32.256c3.328 3.328 3.328 8.448 0 11.904-1.792 1.664-3.456 2.432-6.016 2.432zM119.04 354.176c-16.128 0-28.928-12.672-28.928-28.928 0-16.128 12.672-28.928 28.928-28.928 16.128 0 28.928 12.672 28.928 28.928 0 16.256-12.8 28.928-28.928 28.928z m0-40.832c-6.912 0-11.904 5.12-11.904 11.904 0 6.912 5.12 11.904 11.904 11.904 6.912 0 11.904-5.12 11.904-11.904 0-6.784-5.12-11.904-11.904-11.904z m0 0" fill="#e6e6e6" p-id="8924"></path><path d="M28.416 212.864l-24.32-24.32c-2.048-2.048-2.048-5.248 0-7.296 2.048-2.048 5.248-2.048 7.296 0l24.32 24.32c2.048 2.048 2.048 5.248 0 7.296-2.048 2.048-5.376 2.048-7.296 0z" fill="#e6e6e6" p-id="8925"></path><path d="M35.584 188.544l-24.32 24.32c-2.048 2.048-5.248 2.048-7.296 0-2.048-2.048-2.048-5.248 0-7.296l24.32-24.32c2.048-2.048 5.248-2.048 7.296 0 2.048 2.048 2.048 5.376 0 7.296z" fill="#e6e6e6" p-id="8926"></path><path d="M870.4 155.008V120.576c0-2.816 2.304-5.12 5.12-5.12s5.12 2.304 5.12 5.12v34.432c0 2.816-2.304 5.12-5.12 5.12s-5.12-2.304-5.12-5.12z" fill="#e6e6e6" p-id="8927"></path><path d="M892.672 142.976h-34.432c-2.816 0-5.12-2.304-5.12-5.12s2.304-5.12 5.12-5.12h34.432c2.816 0 5.12 2.304 5.12 5.12s-2.304 5.12-5.12 5.12z" fill="#e6e6e6" p-id="8928"></path></svg>
    </div>
      <div v-transfer-dom>
        <confirm 
          v-model="show"
          show-input
          :input-attrs="{type: 'text'}"
          ref="confirm"
          title="创建聊天室"
          @on-confirm="onConfirm"
          @on-show="onShow">
        </confirm>
    </div>
    <!-- <x-button 
      class="btn"
      @click.native="creatRoom" type="primary">创建聊天室</x-button> -->
  </view-box>
</template>

<script>
import { ViewBox ,XHeader,Confirm,XButton,Group,Cell,TransferDomDirective as TransferDom} from "vux";
import { mapState } from 'vuex'
import axios from "axios";
export default {
  name: "roomList",
  components: {
    ViewBox,
    XHeader,
    Confirm,
    XButton,
    Cell,
    Group
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      show:false
    };
  },
  computed:{
    ...mapState({
      roomList:state=>state.login.roomList,
      username:state=>state.login.username
    })
  },
  methods: {
    creatRoom() {
      this.show = true;
    },
    onShow () {
      this.$refs.confirm.setInputValue('');
    },
    onConfirm (value) {
      if(!value) return;
      let roomId = new Date().getTime();
      this.socket.emit('creatRoom',{
        roomId:roomId,
        roomName:value,
        creatBy:this.username
      })
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
