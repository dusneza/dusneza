# To-Do List Application

A modern, feature-rich to-do list application built with vanilla JavaScript, HTML, and CSS. All data is stored locally in the browser using localStorage.

## Features

✅ **Core Functionality**
- Add, edit, delete, and complete tasks
- Mark tasks as complete/incomplete
- Persistent storage using localStorage
- Local data backup and restore

🎨 **User Interface**
- Clean and modern design
- Responsive layout for mobile and desktop
- Dark mode support
- Task filtering (All, Active, Completed)
- Real-time task counter

⚡ **Advanced Features**
- Task categories/tags
- Task priorities (High, Medium, Low)
- Due date support
- Search functionality
- Undo/Redo functionality
- Keyboard shortcuts
- Export tasks as JSON
- Import tasks from JSON

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dusneza/dusneza.git
cd dusneza/todo-app
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# Or simply double-click the file
```

No installation or build process required!

## Usage

### Adding a Task
1. Type your task in the input field
2. Optionally set priority and due date
3. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox to mark as complete
- **Edit**: Click the edit icon to modify a task
- **Delete**: Click the delete icon to remove a task
- **Filter**: Use the filter buttons to view All, Active, or Completed tasks
- **Search**: Use the search bar to find specific tasks

### Keyboard Shortcuts
- `Enter` - Add new task
- `Ctrl + Z` / `Cmd + Z` - Undo
- `Ctrl + Y` / `Cmd + Y` - Redo
- `Escape` - Clear search

## Data Management

### LocalStorage
Tasks are automatically saved to browser localStorage. Clearing browser data will delete all tasks.

### Export/Import
- **Export**: Click "Export" to download tasks as JSON file
- **Import**: Click "Import" to upload a JSON file with tasks

## File Structure

```
todo-app/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # JavaScript logic
└── README.md          # This file
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES6 and localStorage support

## Tips & Tricks

1. **Organize with Tags**: Use tags to categorize your tasks
2. **Set Priorities**: High-priority tasks appear at the top
3. **Due Dates**: Set deadlines to stay on track
4. **Backup**: Export your tasks regularly as backup
5. **Dark Mode**: Toggle dark mode for comfortable viewing at night

## Privacy

All data is stored locally in your browser. No data is sent to any server. Your tasks are completely private.

## License

MIT License - feel free to use and modify!
