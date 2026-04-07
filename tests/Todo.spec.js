// @ts-check
import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('add multiple todos', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  await todoPage.addTodos("A", "B", "C");
  await todoPage.todosShouldBe(['A', 'B', 'C']);
});

test('toggle', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  await todoPage.addTodos("A", "B", "C");
  await todoPage.toggle('B')
  await todoPage.activeTodosShouldBe(['A', 'C']);
  await todoPage.completeTodosShouldBe(['B']);
});

test('clear completed', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  await todoPage.addTodos("A", "B", "C");
  await todoPage.toggle('B');
  await todoPage.clearCompleted();
  await todoPage.todosShouldBe(['A', 'C']);
});

test('delete a todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  await todoPage.addTodos("A", "B", "C");
  await todoPage.delete('B');
  await todoPage.todosShouldBe(['A', 'C']);
});