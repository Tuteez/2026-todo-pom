import { expect } from '@playwright/test';
export class TodoPage {
    constructor(page) {
        this.page = page;
        this.newTodoInput = this.page.locator('.new-todo');
        this.todos = this.page.locator('.todo-list li');
        this.clearButton = this.page.locator('.clear-completed');
    }
    async open() {
        await this.page.goto('https://todomvc.com/examples/emberjs/todomvc/dist/');
    }

    async addTodo(todo) {
        await this.newTodoInput.fill(todo);
        await this.newTodoInput.press('Enter');
    }

    async todosShouldBe(todos) {
        await expect(this.todos).toHaveText(todos);
    }

    async toggle(todo) {
        const todoToToggle = this.todos.filter({ hasText: todo });
        const toggle = todoToToggle.locator('.toggle');
        await toggle.click();
    }

    async clearCompleted() {
        await this.clearButton.click();
    }
}