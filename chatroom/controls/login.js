import { readFile } from '../utils';
import config from '../config';

const login = async (ctx) => {
    let userList = await readFile(config.userJsonPath) || '[]',
        { username, password } = ctx.data;
    userList = JSON.parse(userList);
    let p = userList.filter(n => n.username === username);
    // 账号不对
    if (!p.length) {
        ctx.socket.emit('login', {
            type: 0,
            msg: '账号不存在，请先注册'
        })
        return;
    } else {
        if (p[0].password === password) {
            let roomList = await readFile(config.roomJsonPath) || '[]';
            roomList = JSON.parse(roomList);
            let onLineUser = await readFile(config.onLineUserJsonPath) || '[]';
            onLineUser = JSON.parse(onLineUser);
            // 添加在线人数
            roomList.map(n=>{
                n.onliners = onLineUser.filter(i=>i.roomId == n.roomId).length;
            })
            ctx.socket.emit('login', {
                type: 1,
                msg: '登陆成功',
                roomList
            })
        } else {
            ctx.socket.emit('login', {
                type: 2,
                msg: '密码错误～'
            })
        }
    }

};

export default login;