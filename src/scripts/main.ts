interface TodoItem {
  text: string;
  completed: boolean;
}

const input = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn')!;
const list = document.getElementById('todo-list')!;
const themeToggle = document.getElementById('theme-toggle')!;

let todos: TodoItem[] = [];

function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.style.textDecoration = 'line-through';

    li.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;
  todos.push({ text: value, completed: false });
  input.value = '';
  saveTodos();
  renderTodos();
});

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', theme === 'dark');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Initialize
loadTodos();
renderTodos();
loadTheme();
