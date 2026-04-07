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

test('filters', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");
  await todoPage.toggle('B');

  await todoPage.filterActive();
      // await todoPage.filter("Active");
  await todoPage.activeTodosShouldBe(['A', 'C']);

  await todoPage.filterCompleted();
      // await todoPage.filter("Completed");
  await todoPage.completeTodosShouldBe(['B']);

  await todoPage.filterAll();
    // await todoPage.filter("All");
  await todoPage.todosShouldBe(['A', 'B', 'C']);
});


// clear completed test
// delete test