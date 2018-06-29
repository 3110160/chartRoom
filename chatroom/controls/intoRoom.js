import { readFile, writeFile } from '../utils';
import config from '../config';
import moment from 'moment'

const intoRoom = io => async (ctx) => {
    let { roomId, username } = ctx.data;
    let onLineUser = await readFile(config.onLineUserJsonPath) || '[]';
    onLineUser = JSON.parse(onLineUser);
    let newOnliner = {
        roomId,
        username,
        socketId: ctx.socket.id,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    if(onLineUser.some(n=>n.username === username)){
        onLineUser.map((n,i)=>{
            if(n.username === username){
                onLineUser.splice(i,1);
            }
        })
    };
    onLineUser.push(newOnliner)
    await writeFile(config.onLineUserJsonPath, JSON.stringify(onLineUser));
    // 所有用户广播房间列表信息
    let roomList = await readFile(config.roomJsonPath) || '[]';
    roomList = JSON.parse(roomList);
    roomList.map(n=>{
        n.onliners = onLineUser.filter(i=>i.roomId == n.roomId).length;
    })
    io.broadcast('roomInfo',roomList);
    // 广播 所在房间的 用户
    let message = await readFile(config.messageJsonPath) || '[]';
    message = JSON.parse(message);
    message = message.filter(n => n.roomId == roomId);
    if (message.length > 10) {
        message = message.slice(message.length - 10, message.length);
    }
    let currentRoomUserList = onLineUser.filter(n => n.roomId == roomId);
    io.connections.forEach((socket) => {
        if (currentRoomUserList.some(n => n.socketId === socket.id)) {
            console.log(message);
            socket.emit('intoRoom', Object.assign(newOnliner, { onlinerCount: onLineUser.length, message, socketId: undefined }));
        }
    })
}

export default intoRoom;