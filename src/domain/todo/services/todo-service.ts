import todoRepository from "../../../infrastructure/repositories/todo-repository";

class TodoService {
    async create(body: string) {
        return todoRepository.create(body);
    }

    async findAll() {
        return todoRepository.findAll();
    }
    
    async updateDescription(todoId: string, body: string) {
        return todoRepository.updateDescription(todoId, body);
    }

    async updateStatus(todoId: string, completed: boolean) {
        return todoRepository.updateStatus(todoId, completed);
    }

    async delete(todoId: string) {
        return todoRepository.delete(todoId);
    }

    async updateStatusBatch(todoIds: string[], completed: boolean) {
        return todoRepository.updateStatusBatch(todoIds, completed);
    }

    async deleteBatch(todoIds: string[]) {
        return todoRepository.deleteBatch(todoIds);
    }

    async countTodos() {
        return todoRepository.countTodos();
    }


}

export default new TodoService();