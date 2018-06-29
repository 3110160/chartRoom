import { readFile, writeFile } from '../utils';
import config from '../config';
import moment from 'moment'

const leaveRoom = io => async (ctx) => {
    let { roomId, username } = ctx.data;
    let onLineUser = await readFile(config.onLineUserJsonPath) || '[]';
    onLineUser = JSON.parse(onLineUser);

    onLineUser.map((n, i) => {
        if (n.username === username && n.roomId == roomId) {
            onLineUser.splice(i, 1);
        }
    });

    let leaver = {
        onlinerCount: onLineUser.length,
        username: username,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    await writeFile(config.onLineUserJsonPath, JSON.stringify(onLineUser));
    // 所有用户广播房间列表信息
    let roomList = await readFile(config.roomJsonPath) || '[]';
    roomList = JSON.parse(roomList);
    roomList.map(n => {
        n.onliners = onLineUser.filter(i => i.roomId == n.roomId).length;
    })
    io.broadcast('roomInfo', roomList);
    // 广播所在房间的用户
    let currentRoomUserList = onLineUser.filter(n => n.roomId == roomId);
    io.connections.forEach((socket, id) => {
        if (currentRoomUserList.some(n => n.socketId === socket.id)) {
            socket.emit('leaveRoom', leaver);
        }
    })
}

export default leaveRoom;