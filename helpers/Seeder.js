/**
 * Opens the application and seeds todos via localStorage.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Array<{ title: string, completed?: boolean } | string>} todos
 */
import { v4 as uuidv4 } from 'uuid';

export async function openAndSeed(page, todos) {
  const formattedTodos = todos.map((todo) => {
    if (typeof todo === 'string') {
      return {
        title: todo,
        completed: false,
        id: uuidv4()
      };
    }
    return {
      title: todo.title,
      completed: todo.completed ?? false, // Default to false if not provided
      id: todo.id || uuidv4()
    };
  });

  await page.addInitScript((seed) => {
    localStorage.setItem('todos', JSON.stringify(seed));
  }, formattedTodos);

  await page.goto('https://todomvc.com/examples/emberjs/todomvc/dist/');
}