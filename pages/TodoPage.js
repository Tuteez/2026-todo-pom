import { expect } from '@playwright/test';
import { openPage } from '../helpers/navigation';

export class TodoPage {
    constructor(page) {
        this.page = page;
        this.newTodoInput = this.page.locator('#new-todo');
        this.toggleAllCheckbox = this.page.locator('#toggle-all');
        this.todos = this.page.locator('.todo-list li');
        this.activeTodos = this.page.locator('.todo-list li:not(.completed)');
        this.completedTodos = this.page.locator('.todo-list li.completed');
        this.clearCompletedButton = this.page.locator('.clear-completed');
        this.itemsLeft = this.page.locator('.todo-count');
        this.footer = this.page.locator('.footer');
    }

    async open() {
        await openPage(this.page);
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

    async toggle(todo) {
        const todoToToggle = await this.getTodoByText(todo);
        const toggle = todoToToggle.locator('.toggle');
        await toggle.click();
    }

    async toggleAll() {
        await this.toggleAllCheckbox.click();
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

    async filter(state) {
        await this.page.locator(`.filters >> text=${state}`).click();
    }

    async edit(oldText, newText) {
        const editInput = await this.startEditing(oldText, newText);
        await editInput.press('Enter');
    }

    async editByTab(oldText, newText) {
        const editInput = await this.startEditing(oldText, newText);
        await editInput.press('Tab');
    }

    async editByEscape(oldText, newText) {
        const editInput = await this.startEditing(oldText, newText);
        await editInput.press('Escape');
    }

    async startEditing(oldText, newText) {
        const todoToEdit = await this.getTodoByText(oldText);
        const editInput = todoToEdit.locator('.edit');
        await todoToEdit.dblclick();
        await editInput.fill(newText);
        return editInput;
    }

    // assertions
    async todosShouldBe(todos) {
        await expect(this.todos).toHaveText(todos);
    }

    async activeTodosShouldBe(todos) {
        await expect(this.activeTodos).toHaveText(todos);
    }

    async completeTodosShouldBe(todos) {
        await expect(this.completedTodos).toHaveText(todos);
    }

    async itemsLeftShouldBe(text) {
        await expect(this.itemsLeft).toHaveText(text);
    }

    async todoListShouldBeHidden() {
        await expect(this.todos).toBeHidden();
    }

    async footerShouldBeHidden() {
        await expect(this.footer).toBeHidden();
    }


}