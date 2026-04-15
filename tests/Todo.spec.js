import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { FilterState } from '../helpers/FilterState';
import { openAndSeed } from '../helpers/Seeder';

test.describe('Todo Application Tests', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
  });

  test.describe('Adding', () => {
    test('add multiple todos', async () => {
      await todoPage.open();

      await todoPage.addTodos("A", "B", "C");

      await todoPage.todosShouldBe(['A', 'B', 'C']);
    });
  });

  test.describe('Toggling', () => {
    test('toggle', async ({ page }) => {
      await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.toggle('B');
      await todoPage.activeTodosShouldBe(['A', 'C']);
      await todoPage.completeTodosShouldBe(['B']);

      await todoPage.toggle('B');
      await todoPage.activeTodosShouldBe(['A', 'B', 'C']);
      await todoPage.completeTodosShouldBe([]);
    });

    test('toggle all', async ({ page }) => {
      await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.toggleAll();
      await todoPage.activeTodosShouldBe([]);
      await todoPage.completeTodosShouldBe(['A', 'B', 'C']);

      await todoPage.toggleAll();
      await todoPage.activeTodosShouldBe(['A', 'B', 'C']);
      await todoPage.completeTodosShouldBe([]);
    });
  });

  test.describe('Clearing and Deleting', () => {
    test('clear completed', async ({ page }) => {
      await openAndSeed(page, [
        { title: 'A' },
        { title: 'B', completed: true },
        { title: 'C' }
      ]);

      await todoPage.clearCompleted();

      await todoPage.todosShouldBe(['A', 'C']);
    });

    test('delete a todo', async ({ page }) => {
      await todoPage.delete('B');

      await todoPage.todosShouldBe(['A', 'C']);
    });

    test('delete by editing to empty', async ({ page }) => {
      await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.edit('B', '');

      await todoPage.todosShouldBe(['A', 'C']);
    });
  });

  test.describe('Filtering', () => {
    test('filters', async ({ page }) => {
     await openAndSeed(page, [
        { title: 'A' },
        { title: 'B', completed: false },
        { title: 'C' }
      ]);

      await todoPage.filter(FilterState.ACTIVE);
      await todoPage.activeTodosShouldBe(['A', 'C']);

      await todoPage.filter(FilterState.COMPLETED);
      await todoPage.completeTodosShouldBe(['B']);

      await todoPage.filter(FilterState.ALL);
      await todoPage.todosShouldBe(['A', 'B', 'C']);
    });
  });

  test.describe('Editing', () => {
    test('edit by enter', async ({ page }) => {
            await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.edit('B', 'B edited');

      await todoPage.todosShouldBe(['A', 'B edited', 'C']);
    });

    test('edit by focus change', async ({ page }) => {
      await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.editByTab('B', 'B edited');

      await todoPage.todosShouldBe(['A', 'B edited', 'C']);
    });

    test('edit and refresh should NOT keep changes', async ({ page }) => {
      await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.startEditing('B', "B edited");
      await todoPage.page.reload();

      await todoPage.todosShouldBe(['A', 'B', 'C']);
    });

    test('edit by escape should cancel edit', async ({ page }) => {
      await openAndSeed(page, ['A', 'B', 'C']);

      await todoPage.editByEscape('B', 'B edited');

      await todoPage.todosShouldBe(['A', 'B', 'C']);
    });
  });

  test.describe('UI Behavior', () => {
    test('items left should update correctly', async ({ page }) => {
      await openAndSeed(page, ['A']);

      await todoPage.itemsLeftShouldBe('1 item left');

      await todoPage.toggle('A');
      await todoPage.itemsLeftShouldBe('0 items left');
    });
    
     test('items left should update correctly', async ({ page }) => {
      await openAndSeed(page, ['A']);

      await todoPage.itemsLeftShouldBe('1 item left');

      await todoPage.toggle('A');
      await todoPage.itemsLeftShouldBe('0 items left');
    });

    test('main and footer should be hidden on fresh open', async ({ page }) => {
      await openAndSeed(page, []);

      await todoPage.todoListShouldBeHidden();
      await todoPage.footerShouldBeHidden();
    });
  });
});