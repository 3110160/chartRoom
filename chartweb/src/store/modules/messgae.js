
const orderList = {
    state:{
        //消息列表
        messageList:[],
    },
    mutations:{
        //申报单列表
        setList(state,list){
            state.list = list;
        },
        //评价改变申报单状态
        changeStatus(state,id){
            let p  = [...state.list];
            p.map(item=>{
                if(item.id === id){
                    item.status = 99
                }
            })
            state.list = p;
        },
        //报修单列表
        setServiceList(state,list){
            state.serviceList = list;
        },
        //开始维修
        repairStart(state,id){
            let p  = [...state.serviceList];
            p.map(item=>{
                if(item.id === id){
                    item.status = 2
                }
            })
            state.serviceList = p;
        },
        //结束维修
        repairEnd(state,id){
            let p  = [...state.serviceList];
            p.map(item=>{
                if(item.id === id){
                    item.status = 3
                }
            })
            state.serviceList = p;
        }
    },
    actions:{
    
    }
}

export default orderList;