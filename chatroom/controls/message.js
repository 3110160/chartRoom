import { readFile, writeFile } from '../utils';
import config from '../config';
import moment from 'moment'

const message = io => async (ctx) => {
    let messageList = await readFile(config.messageJsonPath) || '[]',
        onLineUser = await readFile(config.onLineUserJsonPath) || '[]',
        { username, message, roomId } = ctx.data;
        messageList = JSON.parse(messageList);
        onLineUser = JSON.parse(onLineUser);
    let newMessage = {
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        username,
        message,
        roomId
    };
    let currentRoomUserList = onLineUser.filter(n => n.roomId == roomId);
    messageList.push(newMessage);
    await writeFile(config.messageJsonPath, JSON.stringify(messageList));
    // 向所在的房间分发消息
    io.connections.forEach((socket) => {
        if (currentRoomUserList.some(n => n.socketId === socket.id)) {
            socket.emit('message', newMessage);
        }
    })
};

export default message;