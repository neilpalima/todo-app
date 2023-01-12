import { RootController } from 'src/controllers/root';
import { TodoService } from 'src/services/todo';
import { TodoController } from 'src/controllers/todo';
/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */

export async function init() {
    // services
    const todoFlagService = new TodoService();

    // controllers
    const rootController = new RootController();
    const todoController = new TodoController(todoFlagService);

    return {
        todoFlagService,

        rootController,
        todoController
    };
}
