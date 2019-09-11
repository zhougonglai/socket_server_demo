import io from 'socket.io-client';
const config = require('../config');

const socket = io(config.ORIGIN);

console.log('test');
