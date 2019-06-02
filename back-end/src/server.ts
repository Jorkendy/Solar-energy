import http from 'http';
import {get} from 'config';
import socketIO from 'socket.io'

import App from './app';
import {winstonLogger} from "./middlewares/common/WinstonLogger";

const port = normalizePort(process.env.PORT || get('express.port'));
const server = http.createServer(App.app);

server.listen(port);

server.on('error', onServerError);
server.on('listening', onServerListening);

const io = require('socket.io').listen(server);
io.on("connection", (socket: socketIO.Socket) => {
    winstonLogger.info('-----A user connected');

    socket.on('connection', (data) => {
        winstonLogger.info(`-----Message from client: ${data.message}`);
    });

    socket.on('requestUpdateVoltage', (data) => {
        console.log(data);

        socket.emit('responseUpdateVoltage', JSON.stringify({
            uuid: data.uuid,
            status: 'Success',
            updatedOn: Date.now(),
            type: 'Voltage'
        }));
    });

    socket.on('requestUpdateGps', (data) => {
        console.log(data);

        socket.emit('responseUpdateGps', JSON.stringify({
            uuid: data.uuid,
            status: 'Success',
            updatedOn: Date.now(),
            type: 'GPS'
        }));
    });

    socket.on('requestUpdateTemperature', (data) => {
        console.log(data);

        socket.emit('responseUpdateTemperature', JSON.stringify({
            uuid: data.uuid,
            status: 'Success',
            updatedOn: Date.now(),
            type: 'Temperature'
        }));
    });
});

function normalizePort(param: number | string): number | string | boolean {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
    else return false;
}

function onServerError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onServerListening() {
    const addr = server.address();
    winstonLogger.info('-----Express Server started');
}
