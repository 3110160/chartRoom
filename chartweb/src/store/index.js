import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 登录后信息
        login: {
            isLogin: false,// 登录状态
            username: '',
            roomList: []
        },
        message: {
            currentMessageList: [] // 消息列表
        }
    },
    getters: {
        currentRoomMessage: (state) => (roomId) => {
            return state.message.currentMessageList.length?state.message.currentMessageList.filter(n => n.roomId === roomId):[]
        }
    },
    mutations: {
        // 登录改变状态
        login(state, data) {
            state.login = {
                ...state.login,
                ...data
            };
        },
        // 更新房间信息
        updataRoomInfo(state,roomList){
            state.login = {
                ...state.login,
                roomList
            }
        },
        // 保存用户名
        saveUser(state, { username }) {
            state.login.username = username;
        },
        // 追加消息
        mergeMassageList(state, currentMessage) {
            state.message.currentMessageList = [
                ...state.message.currentMessageList,
                currentMessage
            ]
        },
        // 初始化消息
        initMessage(state,historyMessage){
            state.message.currentMessageList = [
                ...historyMessage
            ];
        },
        // 房间列表
        getRoomList(state, newRoom) {
            state.login.roomList = [
                ...state.login.roomList,
                newRoom
            ];
        }
    }
})

export default store;