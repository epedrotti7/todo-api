import { Socket, Server } from 'socket.io';
import todoService from '../../../domain/todo/services/todo-service';

export const todoSocketHandler = (socket: Socket, io: Server): void => {

    socket.on('createTodo', async (data) => {
        try {
            await todoService.create(data.body);
            const todos = await todoService.findAll();
            io.emit('todos', todos);
        } catch (error) {
            socket.emit('error', 'Erro ao criar a tarefa.');
        }
    });

    socket.on('getTodos', async () => {
        try {
            const todos = await todoService.findAll();
            socket.emit('todos', todos);
        } catch (error) {
            socket.emit('error', 'Erro ao buscar as tarefas.');
        }
    });
};
