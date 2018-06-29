const Koa = require('koa');
const IO = require('koa-socket');
import config from './config'
import login from './controls/login'
import register from './controls/register'
import message from './controls/message'
import creatRoom from './controls/creatRoom'
import intoRoom from './controls/intoRoom'
import leaveRoom from './controls/leaveRoom'

const app = new Koa();

const io = new IO({
    ioOptions: config.ioOptions
});


io.attach(app);

io.on('connection', async (ctx) => {
    // 获取 客户端 ip 地址
    console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
});
io.on('disconnect', async (ctx) => {
    console.log(`  >>>> disconnect ${ctx.socket.id}`);
});

// 用户登陆信息
io.on('login', login);
// 注册
io.on('register',register)
// 按房间 分发消息
io.on('message',message(io));
// 创建房间
io.on('creatRoom',creatRoom(io));
// 删除房间

// 加入房间
io.on('intoRoom',intoRoom(io))
// 离开房间
io.on('leaveRoom',leaveRoom(io))


app.listen(config.port, async () => {
    console.log(` >>> server listen on http://localhost:${config.port}`);
});



export default app;