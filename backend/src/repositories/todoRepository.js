const fs = require('fs');
const path = require('path');

class TodoRepository {
  constructor() {
    this.dataDir = path.join(__dirname, '../../data');
    this.filePath = path.join(this.dataDir, 'todos.json');
    this.todos = [];
    this.initStorage();
  }

  initStorage() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const fileData = fs.readFileSync(this.filePath, 'utf-8');
        this.todos = JSON.parse(fileData || '[]');
      } else {
        // Seed default tasks for immediate demo experience
        this.todos = [
          {
            id: '1',
            title: 'Design Sidebar Navigation & Task Types',
            description: 'Implement sidebar switching for Due Date tasks vs Daily/Weekly tasks.',
            completed: true,
            priority: 'high',
            taskType: 'dueDate',
            frequency: 'once',
            dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Daily Code Review & Standup',
            description: 'Check team pull requests and plan daily workflow tasks.',
            completed: false,
            priority: 'high',
            taskType: 'recurring',
            frequency: 'daily',
            dueDate: null,
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Weekly Backup & System Maintenance',
            description: 'Perform database backup and audit system logs once a week.',
            completed: false,
            priority: 'medium',
            taskType: 'recurring',
            frequency: 'weekly',
            dueDate: null,
            createdAt: new Date().toISOString()
          }
        ];
        this.saveToFile();
      }
    } catch (error) {
      console.error('Error initializing data storage:', error);
      this.todos = [];
    }
  }

  saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.todos, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to save todos to file:', error);
    }
  }

  findAll() {
    return [...this.todos];
  }

  findById(id) {
    return this.todos.find(t => t.id === id) || null;
  }

  create(todoData) {
    const taskType = todoData.taskType || (todoData.frequency && todoData.frequency !== 'once' ? 'recurring' : 'dueDate');
    const frequency = todoData.frequency || (taskType === 'recurring' ? 'daily' : 'once');

    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      title: todoData.title.trim(),
      description: (todoData.description || '').trim(),
      completed: false,
      priority: (todoData.priority || 'medium').toLowerCase(),
      taskType: taskType,
      frequency: frequency,
      dueDate: taskType === 'dueDate' ? (todoData.dueDate || null) : null,
      createdAt: new Date().toISOString()
    };
    this.todos.unshift(newTodo);
    this.saveToFile();
    return newTodo;
  }

  update(id, updateFields) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return null;

    const existing = this.todos[index];
    const taskType = updateFields.taskType !== undefined ? updateFields.taskType : existing.taskType || 'dueDate';
    const frequency = updateFields.frequency !== undefined ? updateFields.frequency : existing.frequency || 'once';

    const updated = {
      ...existing,
      ...updateFields,
      title: updateFields.title !== undefined ? updateFields.title.trim() : existing.title,
      description: updateFields.description !== undefined ? updateFields.description.trim() : existing.description,
      priority: updateFields.priority !== undefined ? updateFields.priority.toLowerCase() : existing.priority,
      taskType: taskType,
      frequency: frequency,
      dueDate: taskType === 'dueDate' ? (updateFields.dueDate !== undefined ? updateFields.dueDate : existing.dueDate) : null,
      updatedAt: new Date().toISOString()
    };

    this.todos[index] = updated;
    this.saveToFile();
    return updated;
  }

  delete(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.todos.splice(index, 1);
    this.saveToFile();
    return true;
  }
}

module.exports = new TodoRepository();
