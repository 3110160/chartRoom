
const login = {
    state:{
        //消息列表
        login:{
            isLogin:false,
            historyMessage:[]
        },
    },
    mutations:{
       login(state,data){
            state.login = {
                ...state.login,
                ...data
            }
       }
    },
    actions:{
    
    }
}

export default login;