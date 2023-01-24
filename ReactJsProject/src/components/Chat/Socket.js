import { io } from 'socket.io-client';

// const URI = 'ws://100.25.37.72';

const URI = 'ws://localhost:8080';

const socket = io( URI, { transports: ['websocket'] });

export default socket;