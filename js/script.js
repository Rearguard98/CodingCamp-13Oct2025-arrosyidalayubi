
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const filter = document.getElementById('filter');

todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', handleTodoActions);
filter.addEventListener('change', filterTodos);


/**
 * Adds a new to-do item to the list.
 * @param {Event} e - The form submission event.
 */
function addTodo(e) {
    e.preventDefault(); 
    
    
    if (todoInput.value.trim() === '') {
        alert('Please enter a task!');
        return; // Stop the function if input is empty
    }

    // Create the main list item (li)
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    // Create the content div
    const todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');

    // Create the text span
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.innerText = todoInput.value;
    todoContent.appendChild(todoText);

    // Add date if provided
    if (dateInput.value) {
        const todoDate = document.createElement('span');
        todoDate.classList.add('todo-date');
        todoDate.innerText = formatDate(dateInput.value);
        todoContent.appendChild(todoDate);
    }

    todoItem.appendChild(todoContent);

    // Create the actions div
    const todoActions = document.createElement('div');
    todoActions.classList.add('todo-actions');

    // Create Complete/Check Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeButton.classList.add('complete-btn');
    todoActions.appendChild(completeButton);

    // Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoActions.appendChild(deleteButton);

    todoItem.appendChild(todoActions);

    // Append the new item to the list
    todoList.appendChild(todoItem);

    // Clear input fields
    todoInput.value = '';
    dateInput.value = '';
}

/**
 * Handles clicks for completing or deleting a to-do item.
 * @param {Event} e - The click event.
 */
function handleTodoActions(e) {
    const item = e.target;
    const todoItem = item.closest('.todo-item'); // Find the parent li

    if (!todoItem) return;

    // Delete To-Do
    if (item.closest('.delete-btn')) {
        todoItem.remove();
    }

    // Complete To-Do
    if (item.closest('.complete-btn')) {
        todoItem.classList.toggle('completed');
    }
}

/**
 * Filters the displayed to-do items based on the dropdown selection.
 */
function filterTodos() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        // Ensure we are only acting on element nodes
        if (todo.nodeType === 1) {
            switch (filter.value) {
                case 'all':
                    todo.style.display = 'flex';
                    break;
                case 'completed':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'incomplete':
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
    });
}

/**
 * Formats a date string from YYYY-MM-DD to a more readable format.
 * @param {string} dateString - The date string from the input.
 * @returns {string} - The formatted date.
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    return date.toLocaleDateString('en-US', options);
}