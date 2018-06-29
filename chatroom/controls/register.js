import { readFile, writeFile } from '../utils';
import config from '../config';

const register = async (ctx) => {
    let userList = await readFile(config.userJsonPath) || '[]',
        { username, password } = ctx.data;
    userList = JSON.parse(userList);
    let p = userList.length && userList.filter(n => n.username === username)[0];
    // 账号不对
    if (p) {
        ctx.socket.emit('register', {
            type: 0,
            msg: '账号已被注册'
        })
        return;
    } else {
        let roomList = await readFile(config.roomJsonPath) || '[]';
        roomList = JSON.parse(roomList);
        let onLineUser = await readFile(config.onLineUserJsonPath) || '[]';
        onLineUser = JSON.parse(onLineUser);
        // 添加在线人数
        roomList.map(n => {
            n.onliners = onLineUser.filter(i => i.roomId == n.roomId).length;
        })
        userList.push({ username, password });
        await writeFile(config.userJsonPath, JSON.stringify(userList));
        ctx.socket.emit('register', {
            type: 1,
            msg: '注册成功',
            roomList
        })
    }

};

export default register;