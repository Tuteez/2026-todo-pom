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

test('toggle all', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");

  await todoPage.toggleAll();
  await todoPage.activeTodosShouldBe([]);
  await todoPage.completeTodosShouldBe(['A', 'B', 'C']);

  await todoPage.toggleAll();
  await todoPage.activeTodosShouldBe(['A', 'B', 'C']);
  await todoPage.completeTodosShouldBe([]);
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


test('delete by editing to empty', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");

  await todoPage.edit('B', '');

  await todoPage.todosShouldBe(['A', 'C']);
});


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

test('edit by enter', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");

  // await todoPage.edit('B', 'B edited');
  await todoPage.todosShouldBe(['A', 'B edited', 'C']);
});

test('edit by focus change', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");

  await todoPage.editByTab('B', 'B edited');
  await todoPage.todosShouldBe(['A', 'B edited', 'C']);
});

test('Start edit and refresh should NOT keep changes', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");

  await todoPage.startEditing('B', "B edited");
  await page.reload();
  await todoPage.todosShouldBe(['A', 'B', 'C']);
}
);

test('edit by escape should cancel edit', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A", "B", "C");

  await todoPage.editByEscape('B', 'B edited');
  await todoPage.todosShouldBe(['A', 'B', 'C']);
});

test('items left should update correctly', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  await todoPage.addTodos("A");

  await todoPage.itemsLeftShouldBe('1 item left');

  await todoPage.toggle('A');
  await todoPage.itemsLeftShouldBe('0 items left');
});

test('main and footer should be hidden on fresh open', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  await todoPage.todoListShouldBeHidden();
  await todoPage.footerShouldBeHidden();
});