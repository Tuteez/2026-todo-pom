// @ts-check
import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('smoke', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();
  //  Add A B C
  // TODO1 add addTodos("A", "B", "C")
  await todoPage.addTodo('A');
  await todoPage.addTodo('B');
  await todoPage.addTodo('C');
  await todoPage.todosShouldBe(['A', 'B', 'C']);
  await todoPage.toggle('B');
  await todoPage.clearCompleted();
  await todoPage.todosShouldBe(['A', 'C']);
  // TODO2: Delete todo C
  // await todoPage.delete('C');
  await todoPage.todosShouldBe(['A']);
});


