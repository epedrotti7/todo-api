import { TodoController } from '../../../src/interfaces/http/controllers/todo-controller'
import todoService from '../../../src/domain/todo/services/todo-service'

jest.mock('../../../src/domain/todo/services/todo-service', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    updateDescription: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn(),
    updateStatusBatch: jest.fn(),
    deleteBatch: jest.fn(),
    countTodos: jest.fn(),
}));

describe('TodoController', () => {
    let todoController: TodoController;
    let mockReply: any;

    beforeEach(() => {
        todoController = new TodoController();
        mockReply = { code: jest.fn().mockReturnThis(), send: jest.fn() };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a todo item successfully', async () => {
        const mockRequest: any = { body: { body: 'Test todo' } };
        (todoService.create as jest.Mock).mockResolvedValue({ id: '1', body: 'Test todo', completed: false });

        await todoController.createTodo(mockRequest, mockReply);

        expect(todoService.create).toHaveBeenCalledWith('Test todo');
        expect(mockReply.code).toHaveBeenCalledWith(201);
        expect(mockReply.send).toHaveBeenCalled();
    });

    it('should get all todos successfully', async () => {
        const mockRequest: any = {};
        (todoService.findAll as jest.Mock).mockResolvedValue([]);

        await todoController.getAllTodos(mockRequest, mockReply);

        expect(todoService.findAll).toHaveBeenCalled();
        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith([]);
    });

    it('should update a todo description successfully', async () => {
        const mockRequest: any = { params: { id: '1' }, body: { body: 'Updated todo' } };
        (todoService.updateDescription as jest.Mock).mockResolvedValue({ id: '1', body: 'Updated todo', completed: false });

        await todoController.updateTodoDescription(mockRequest, mockReply);

        expect(todoService.updateDescription).toHaveBeenCalledWith('1', 'Updated todo');
        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalled();
    });

    it('should update todo status successfully', async () => {

        const mockRequest: any = {
            params: { id: '1' },
            body: { completed: true }
        };

        const expectedUpdatedTodo = {
            id: '1',
            body: 'Test todo',
            completed: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        (todoService.updateStatus as jest.Mock).mockResolvedValue(expectedUpdatedTodo);

        await todoController.updateTodoStatus(mockRequest, mockReply);

        expect(todoService.updateStatus).toHaveBeenCalledWith('1', true);
        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(expectedUpdatedTodo);
    });

    it('should delete a todo item successfully', async () => {
        const mockRequest: any = {
            params: { id: '1' }
        };
        const expectedDeletionResult = {
            message: "Todo successfully deleted",
            id: '1'
        };

        (todoService.delete as jest.Mock).mockResolvedValue(expectedDeletionResult);

        await todoController.deleteTodo(mockRequest, mockReply);

        expect(todoService.delete).toHaveBeenCalledWith('1');
        expect(mockReply.code).toHaveBeenCalledWith(204);
    });

    it('should update status of multiple todo items successfully', async () => {
        const mockRequest: any = {
            body: {
                todoIds: ['1', '2', '3'],
                completed: true
            }
        };
        const expectedBatchUpdateResult = {
            modifiedCount: 3
        };

        (todoService.updateStatusBatch as jest.Mock).mockResolvedValue(expectedBatchUpdateResult);

        await todoController.updateTodoStatusBatch(mockRequest, mockReply);

        expect(todoService.updateStatusBatch).toHaveBeenCalledWith(['1', '2', '3'], true);
        expect(mockReply.code).toHaveBeenCalledWith(200);
    });

    it('should delete multiple todo items successfully', async () => {
        const mockRequest: any = {
            body: {
                todoIds: ['1', '2', '3']
            }
        };
        const expectedBatchDeleteResult = {
            deletedCount: 3
        };

        (todoService.deleteBatch as jest.Mock).mockResolvedValue(expectedBatchDeleteResult);

        await todoController.deleteTodoBatch(mockRequest, mockReply);

        expect(todoService.deleteBatch).toHaveBeenCalledWith(['1', '2', '3']);
        expect(mockReply.code).toHaveBeenCalledWith(200);
    });

    it('should get todos count successfully', async () => {
        const mockRequest: any = {};

        const expectedCountResult = {
            completed: 5,
            pending: 10
        };

        (todoService.countTodos as jest.Mock).mockResolvedValue(expectedCountResult);

        await todoController.getTodosCount(mockRequest, mockReply);

        expect(todoService.countTodos).toHaveBeenCalled();
        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(expectedCountResult);
    });
});
