import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Todo Application', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.open();
    });

    test('should add a new todo', async () => {
        await todoPage.addTodo('New Todo');
        // Intentional error: Expecting wrong text
        await todoPage.todosShouldBe(['Wrong Todo']);
    });

    test('should toggle a todo', async () => {
        await todoPage.addTodos('Todo 1', 'Todo 2');
        await todoPage.toggle('Todo 1');
        // Intentional error: Expecting wrong completed todos
        await todoPage.completeTodosShouldBe(['Todo 2']);
        await todoPage.activeTodosShouldBe(['Todo 1']);
    });

    test('should clear completed todos', async () => {
        await todoPage.addTodos('Todo 1', 'Todo 2');
        await todoPage.toggle('Todo 1');
        await todoPage.clearCompleted();
        // Intentional error: Expecting wrong remaining todos
        await todoPage.todosShouldBe(['Todo 1']);
    });
});