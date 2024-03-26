import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { TodoController } from '../controllers/todo-controller';

const todoRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {

    const todoController = new TodoController();


    fastify.post('/todos', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    body: { type: 'string' }
                },
                required: ['body']
            },
            response: {
                201: {
                    description: 'Successful creation of a new todo',
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        body: { type: 'string' },
                        completed: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        completedAt: { type: ['string', 'null'], format: 'date-time' }
                    }
                }
            }
        }
    }, todoController.createTodo);

    fastify.get('/todos', {
        schema: {
            response: {
                200: {
                    description: 'Sucesso',
                    type: 'object',
                    properties: {
                        todos: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string' },
                                    body: { type: 'string' },
                                    completed: { type: 'boolean' },
                                    createdAt: { type: 'string', format: 'date-time' },
                                    updatedAt: { type: 'string', format: 'date-time' },
                                    completedAt: { type: ['string', 'null'], format: 'date-time' },
                                },
                            },
                        },
                        total: { type: 'number' },
                    },
                },
            },
        },
    }, todoController.getAllTodos);

    fastify.put('/todos/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID do Todo' },
                },
                required: ['id'],
            },
            body: {
                type: 'object',
                properties: {
                    body: { type: 'string', description: 'Nova descrição do Todo' },
                },
                required: ['body'],
            },
            response: {
                200: {
                    description: 'Todo atualizado com sucesso',
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        body: { type: 'string' },
                        completed: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        completedAt: { type: ['string', 'null'], format: 'date-time' },
                    },
                },
                404: {
                    description: 'Todo não encontrado',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, todoController.updateTodoDescription);

    fastify.patch('/todos/:id/status', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID do Todo' },
                },
                required: ['id'],
            },
            body: {
                type: 'object',
                properties: {
                    completed: { type: 'boolean', description: 'Status de conclusão do Todo' },
                },
                required: ['completed'],
            },
            response: {
                200: {
                    description: 'Status do Todo atualizado com sucesso',
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        body: { type: 'string' },
                        completed: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        completedAt: { type: ['string', 'null'], format: 'date-time' },
                    },
                },
                404: {
                    description: 'Todo não encontrado',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, todoController.updateTodoStatus);

    fastify.delete('/todos/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID do Todo' },
                },
                required: ['id'],
            },
            response: {
                204: {
                    type: 'null',
                    description: 'Todo deletado com sucesso',
                },
                404: {
                    description: 'Todo não encontrado',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, todoController.deleteTodo);


    fastify.patch('/todos/status/batch', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    todoIds: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'IDs dos Todos a serem atualizados'
                    },
                    completed: { type: 'boolean', description: 'Status de conclusão dos Todos' },
                },
                required: ['todoIds', 'completed'],
            },
            response: {
                200: {
                    description: 'Status dos Todos atualizados com sucesso',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, todoController.updateTodoStatusBatch);

    fastify.delete('/todos/batch', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    todoIds: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'IDs dos Todos a serem deletados'
                    },
                },
                required: ['todoIds'],
            },
            response: {
                200: {
                    description: 'Todos deletados com sucesso',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, todoController.deleteTodoBatch);

    fastify.get('/todos/count', {
        schema: {
            response: {
                200: {
                    description: 'Contagem de Todos obtida com sucesso',
                    type: 'object',
                    properties: {
                        completed: { type: 'number', description: 'Número de Todos completados' },
                        pending: { type: 'number', description: 'Número de Todos pendentes' },
                    },
                },
                500: {
                    description: 'Erro interno do servidor',
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                    },
                },
            },
        },
    }, todoController.getTodosCount);
};

export default todoRoutes;
