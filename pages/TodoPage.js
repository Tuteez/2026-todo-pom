import { expect } from '@playwright/test';
export class TodoPage {
    constructor(page) {
        this.page = page;
        this.newTodoInput = this.page.locator('.new-todo');
        this.todos = this.page.locator('.todo-list li');
        this.activeTodos = this.page.locator('.todo-list li:not(.completed)');
        this.completedTodos = this.page.locator('.todo-list li.completed');
        this.clearCompletedButton = this.page.locator('.clear-completed');
    }

    async open() {
        await this.page.goto('https://todomvc.com/examples/emberjs/todomvc/dist/');
    }

    async addTodo(todo) {
        await this.newTodoInput.fill(todo);
        await this.newTodoInput.press('Enter');
    }

    async addTodos(...todos) {
        for (const todo of todos) {
            await this.addTodo(todo);
        }
    }

    async todosShouldBe(todos) {
        await expect(this.todos).toHaveText(todos);
    }

    async activeTodosShouldBe(todos) {
        await expect(this.activeTodos).toHaveText(todos);
    }

    async completeTodosShouldBe(todos) {
        await expect(this.completedTodos).toHaveText(todos);
    }

    async toggle(todo) {
        const todoToToggle = await this.getTodoByText(todo);
        const toggle = todoToToggle.locator('.toggle');
        await toggle.click();
    }

     getTodoByText(todo) {
        return this.todos.filter({ hasText: todo });
    }

    async clearCompleted() {
        await this.clearCompletedButton.click();
    }

    async delete(todo) {
        const todoToDelete = await this.getTodoByText(todo);
        const deleteButton = todoToDelete.locator('.destroy');
        await todoToDelete.hover();
        await deleteButton.click();
    }

// TODO: refactor these to have one filter(state)
    async filterActive() {
        await this.page.locator(".filters >> text=Active").click();
    }

    async filterCompleted() {
        await this.page.locator(".filters >> text=Completed").click();
    }

    async filterAll() {
        await this.page.locator(".filters >> text=All").click();
    }
}