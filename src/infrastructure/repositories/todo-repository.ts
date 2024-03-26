import Todo, { ITodo } from "../../domain/todo/models/todo-model";

class TodoRepository {
    async create(body: string): Promise<ITodo> {
        const todo = new Todo({
            body,
            completed: false,
            completedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await todo.save();
        return todo;
    }

    async findAll(): Promise<{ todos: ITodo[], total: number }> {
        const todos = await Todo.find();
        const total = await Todo.countDocuments();
        return { todos, total };
    }

    async updateDescription(todoId: string, body: string): Promise<ITodo | null> {
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { body, updatedAt: new Date() },
            { new: true }
        );
        return updatedTodo;
    }

    async updateStatus(todoId: string, completed: boolean): Promise<ITodo | null> {
        const update = {
            completed,
            updatedAt: new Date(),
            completedAt: completed ? new Date() : null,
        };
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, update, { new: true });
        return updatedTodo;
    }

    async delete(todoId: string): Promise<ITodo | null> {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        return deletedTodo;
    }

    async updateStatusBatch(todoIds: string[], completed: boolean) {
        const update = {
            completed,
            updatedAt: new Date(),
            completedAt: completed ? new Date() : null
        };
        const updatedTodos = await Todo.updateMany(
            { _id: { $in: todoIds } },
            update
        );
        return updatedTodos;
    }


    async deleteBatch(todoIds: string[]): Promise<{ deletedCount: number }> {
        const result = await Todo.deleteMany({ _id: { $in: todoIds } });
        return { deletedCount: result.deletedCount || 0 };
    }

    async countCompleted(): Promise<number> {
        return Todo.countDocuments({ completed: true });
    }

    async countPending(): Promise<number> {
        return Todo.countDocuments({ completed: false });
    }

    async countTodos(): Promise<{ completed: number; pending: number }> {
        const completed = await this.countCompleted();
        const pending = await this.countPending();
        return { completed, pending };
    }
}

export default new TodoRepository();
