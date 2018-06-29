const path = require('path');

const config = {
    port:9900,
    ioOptions:{
        pingTimeout: 10000,
        pingInterval: 5000,
    },
    messageJsonPath:path.resolve(__dirname,'database','message.json'),
    userJsonPath:path.resolve(__dirname,'database','user.json'),
    onLineUserJsonPath:path.resolve(__dirname,'database','onLineUser.json'),
    roomJsonPath:path.resolve(__dirname,'database','room.json')
}

export default config;