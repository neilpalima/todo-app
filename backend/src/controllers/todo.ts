import { NextFunction, Request, Response, Router } from 'express';

import { TodoService } from 'src/services/todo';

export class TodoController {
    private router: Router;

    constructor(private todoService: TodoService) {
        this.router = Router();
        this.router.get('/', this.getTodos.bind(this));
        this.router.post('/', this.createTodo.bind(this));
        this.router.put('/:id', this.updateTodo.bind(this));
        this.router.delete('/:id', this.deleteTodo.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    async getTodos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const data = this.todoService.list();
            return res.status(200).json(data);
        } catch (error) {
            return next(error);
        }
    }

    async createTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const data = this.todoService.create(req.body.description);
            return res.status(201).json(data);
        } catch (error) {
            return next(error);
        }
    }

    async updateTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const data = this.todoService.update(id, description);

            return res.status(200).json(data);
        } catch (error) {
            return next(error);
        }
    }

    async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            this.todoService.delete(id);
            return res.status(200).json({ message: 'Successfully deleted' });
        } catch (error) {
            return next(error);
        }
    }
}
