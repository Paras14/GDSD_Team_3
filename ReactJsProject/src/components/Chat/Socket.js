import { io } from 'socket.io-client';

// const URI = 'http://100.25.37.72/api';

const URI = 'ws://localhost:8080';

const socket = io( URI, { transports: ['websocket'] });

export default socket;