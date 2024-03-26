import { FastifyReply, FastifyRequest } from 'fastify';
import todoService from '../../../domain/todo/services/todo-service';

export class TodoController {
    async createTodo(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { body } = request.body as any;
            const todo = await todoService.create(body);
            reply.code(201).send(todo);
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async getAllTodos(_request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await todoService.findAll();
            reply.code(200).send(result);
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateTodoDescription(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as any;
            const { body } = request.body as any;
            const updatedTodo = await todoService.updateDescription(id, body);

            if (!updatedTodo) {
                return reply.code(404).send({ message: 'Todo not found' });
            }

            reply.code(200).send(updatedTodo);
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateTodoStatus(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as any;
            const { completed } = request.body as any;
            const updatedTodo = await todoService.updateStatus(id, completed);

            if (!updatedTodo) {
                return reply.code(404).send({ message: 'Todo not found' });
            }

            reply.code(200).send(updatedTodo);
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async deleteTodo(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as any;
            const deletedTodo = await todoService.delete(id);

            if (!deletedTodo) {
                return reply.code(404).send({ message: 'Todo not found' });
            }

            reply.code(204).send();
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }


    async updateTodoStatusBatch(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { todoIds, completed } = request.body as any;
            const result = await todoService.updateStatusBatch(todoIds, completed);

            if (result.modifiedCount === 0) {
                return reply.code(404).send({ message: 'No todos found or updated' });
            }

            reply.code(200).send({ message: `Todos updated successfully`, result });
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async deleteTodoBatch(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { todoIds } = request.body as any;
            const result = await todoService.deleteBatch(todoIds);

            if (result.deletedCount === 0) {
                return reply.code(404).send({ message: 'No todos found or deleted' });
            }

            reply.code(200).send({ message: `Todos deleted successfully`, result });
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async getTodosCount(_request: FastifyRequest, reply: FastifyReply) {
        try {
            const counts = await todoService.countTodos();
            reply.code(200).send(counts);
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

}
