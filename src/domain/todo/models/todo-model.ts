import { Schema, model } from 'mongoose';

export interface ITodo {
    body: string;
    completed: boolean;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new Schema<ITodo>({
    body: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
