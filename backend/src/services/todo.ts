import { v4 as uuidv4 } from 'uuid';

import { NotFoundError } from 'src/errors';

interface TodoItem {
    id: string;
    description: string;
}

export class TodoService {
    private data: TodoItem[];

    constructor(initialTodo: TodoItem[] = []) {
        this.data = initialTodo;
    }

    list(): TodoItem[] {
        return this.data;
    }

    create(description: string): TodoItem {
        const newTodo = {
            id: uuidv4(),
            description
        };

        this.data.push(newTodo);

        return newTodo;
    }

    update(id: string, description: string): TodoItem {
        const todoToUpdate = this.data.find((todo) => todo.id === id);

        if (todoToUpdate) {
            todoToUpdate.description = description;
            return todoToUpdate;
        }

        throw new NotFoundError('Todo not found!');
    }

    delete(id: string): void {
        const toDeleteIndex = this.data.findIndex((todo) => todo.id === id);

        if (toDeleteIndex !== -1) {
            this.data.splice(toDeleteIndex, 1);
            return;
        }

        throw new NotFoundError('Todo not found!');
    }
}
