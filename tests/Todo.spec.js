// @ts-check
import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('smoke', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  await todoPage.addTodos("A", "B", "C");
  await todoPage.todosShouldBe(['A', 'B', 'C']);
  await todoPage.toggle('B');
  await todoPage.clearCompleted();
  await todoPage.todosShouldBe(['A', 'C']);
  await todoPage.delete('C');
  await todoPage.todosShouldBe(['A']);
});


