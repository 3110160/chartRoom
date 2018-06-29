import IO from 'socket.io-client';


const options = {
    reconnectionDelay: 3000,
};
const socket = new IO('http://10.50.1.95:9900', options);
//const socket = new IO('http://40dbdd83.ngrok.io', options);

export default socket;