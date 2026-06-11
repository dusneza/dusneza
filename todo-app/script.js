// ToDo List Application with Local Storage
class TodoApp {
    constructor() {
        this.tasks = [];
        this.history = [];
        this.historyStep = -1;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.init();
    }

    init() {
        this.loadTasks();
        this.setupEventListeners();
        this.render();
        this.setupKeyboardShortcuts();
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Add Task
        document.getElementById('addBtn').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.render();
        });
        document.getElementById('clearSearch').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            this.currentSearch = '';
            this.render();
        });

        // Undo/Redo
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importTasks(e));

        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z') {
                    e.preventDefault();
                    this.undo();
                }
                if (e.key === 'y') {
                    e.preventDefault();
                    this.redo();
                }
            }
            if (e.key === 'Escape') {
                document.getElementById('searchInput').value = '';
                this.currentSearch = '';
                this.render();
            }
        });
    }

    // Add Task
    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        const priority = document.getElementById('prioritySelect').value;
        const dueDate = document.getElementById('dueDate').value;

        if (!text) {
            alert('Please enter a task!');
            return;
        }

        const task = {
            id: Date.now(),
            text,
            completed: false,
            priority,
            dueDate,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveHistory();
        this.saveTasks();
        input.value = '';
        document.getElementById('prioritySelect').value = 'medium';
        document.getElementById('dueDate').value = '';
        this.render();
    }

    // Delete Task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveHistory();
            this.saveTasks();
            this.render();
        }
    }

    // Toggle Task Completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveHistory();
            this.saveTasks();
            this.render();
        }
    }

    // Edit Task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt('Edit task:', task.text);
        if (newText && newText.trim()) {
            task.text = newText.trim();
            this.saveHistory();
            this.saveTasks();
            this.render();
        }
    }

    // Set Filter
    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.render();
    }

    // Get Filtered Tasks
    getFilteredTasks() {
        let filtered = this.tasks;

        // Filter by status
        if (this.currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        }

        // Filter by search
        if (this.currentSearch) {
            filtered = filtered.filter(t => 
                t.text.toLowerCase().includes(this.currentSearch)
            );
        }

        return filtered;
    }

    // Sort Tasks by Priority
    sortTasksByPriority(tasks) {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return [...tasks].sort((a, b) => {
            if (a.completed === b.completed) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return a.completed ? 1 : -1;
        });
    }

    // Render Tasks
    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filtered = this.getFilteredTasks();
        const sorted = this.sortTasksByPriority(filtered);

        if (sorted.length === 0) {
            taskList.innerHTML = '';
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            taskList.innerHTML = sorted.map(task => this.createTaskElement(task)).join('');
            this.attachTaskEventListeners();
        }

        this.updateStats();
        this.updateButtonStates();
    }

    // Create Task Element
    createTaskElement(task) {
        const date = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '';
        return `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                        ${date ? `<span class="task-due-date">📅 ${date}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn task-btn-edit" title="Edit">✏️</button>
                    <button class="task-btn task-btn-delete" title="Delete">🗑️</button>
                </div>
            </li>
        `;
    }

    // Attach Task Event Listeners
    attachTaskEventListeners() {
        document.querySelectorAll('.task-item').forEach(item => {
            const id = parseInt(item.dataset.id);
            const checkbox = item.querySelector('.task-checkbox');
            const editBtn = item.querySelector('.task-btn-edit');
            const deleteBtn = item.querySelector('.task-btn-delete');

            checkbox.addEventListener('change', () => this.toggleTask(id));
            editBtn.addEventListener('click', () => this.editTask(id));
            deleteBtn.addEventListener('click', () => this.deleteTask(id));
        });
    }

    // Update Stats
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;
    }

    // Save and Load from LocalStorage
    saveTasks() {
        localStorage.setItem('todos', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const stored = localStorage.getItem('todos');
        this.tasks = stored ? JSON.parse(stored) : [];
    }

    // History Management (Undo/Redo)
    saveHistory() {
        this.history = this.history.slice(0, this.historyStep + 1);
        this.history.push(JSON.parse(JSON.stringify(this.tasks)));
        this.historyStep++;
    }

    undo() {
        if (this.historyStep > 0) {
            this.historyStep--;
            this.tasks = JSON.parse(JSON.stringify(this.history[this.historyStep]));
            this.saveTasks();
            this.render();
        }
    }

    redo() {
        if (this.historyStep < this.history.length - 1) {
            this.historyStep++;
            this.tasks = JSON.parse(JSON.stringify(this.history[this.historyStep]));
            this.saveTasks();
            this.render();
        }
    }

    updateButtonStates() {
        document.getElementById('undoBtn').disabled = this.historyStep <= 0;
        document.getElementById('redoBtn').disabled = this.historyStep >= this.history.length - 1;
    }

    // Export Tasks
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import Tasks
    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (!Array.isArray(imported)) throw new Error('Invalid format');
                
                if (confirm(`Import ${imported.length} tasks? This will add to existing tasks.`)) {
                    this.tasks = [...imported, ...this.tasks];
                    this.saveHistory();
                    this.saveTasks();
                    this.render();
                    alert('Tasks imported successfully!');
                }
            } catch (error) {
                alert('Error importing tasks: ' + error.message);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    // Theme Toggle
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        document.getElementById('themeToggle').textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }

    // Utility
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize App
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
    
    // Load theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '☀️';
    }
});
