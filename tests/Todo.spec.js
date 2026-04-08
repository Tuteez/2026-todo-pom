// @ts-check
import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { FilterState } from '../pages/helpers/FilterState';

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

  await todoPage.toggle('B')
  await todoPage.activeTodosShouldBe(['A', 'B', 'C']);
  await todoPage.completeTodosShouldBe([]);
});
// toggle all

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

// Delete by editing to empty and pressing enter

test('filters', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");
  await todoPage.toggle('B');

  await todoPage.filter(FilterState.ACTIVE);
  await todoPage.activeTodosShouldBe(['A', 'C']);

  await todoPage.filter(FilterState.COMPLETED);
  await todoPage.completeTodosShouldBe(['B']);

  await todoPage.filter(FilterState.ALL);
  await todoPage.todosShouldBe(['A', 'B', 'C']);
});

// edit by enter
// edit by tab
// edit by clicking outside
// edit + refresh should NOT keep changes
// edit + escape should cancel edit

// items left should update correctly ( > 0)
// item left (=0)

// on fresh open main and footer should be hidden