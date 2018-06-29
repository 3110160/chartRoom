import { readFile, writeFile } from '../utils';
import config from '../config';
import moment from 'moment'

const creatRoom = io => async (ctx) => {
    let { roomId, roomName, creatBy } = ctx.data;
    let roomList = await readFile(config.roomJsonPath) || '[]';
    roomList = JSON.parse(roomList);
    let newRoom = {
        roomId,
        roomName,
        creatBy,
        creatTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    roomList.push(newRoom);
    await writeFile(config.roomJsonPath, JSON.stringify(roomList));
    // 广播所有在线用户
    io.broadcast('creatRoom',Object.assign(newRoom,{onliners:0}))
}

export default creatRoom;