import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { todoSocketHandler } from '../../interfaces/websockets/handler/todo-socket-handler';

export const setupWebSocket = (server: HttpServer): void => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.emit('getTodos');

        todoSocketHandler(socket, io);

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
};
