import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task, TaskStatus, TaskPriority } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';

  title = '';
  description = '';
  priority: TaskPriority = 'Medium';
  dueDate = '';

  columns: { status: TaskStatus; label: string }[] = [
    { status: 'ToDo', label: 'To Do' },
    { status: 'InProgress', label: 'In Progress' },
    { status: 'Done', label: 'Done' }
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: data => {
        this.tasks = data;
        this.loading = false;
        this.error = '';
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not load tasks. Is the API running?';
      }
    });
  }

  tasksFor(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  addTask() {
    if (!this.title.trim()) return;

    const task: Task = {
      title: this.title.trim(),
      description: this.description.trim() || undefined,
      status: 'ToDo',
      priority: this.priority,
      dueDate: this.dueDate || null
    };

    this.taskService.createTask(task).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.priority = 'Medium';
        this.dueDate = '';
        this.loadTasks();
      },
      error: () => (this.error = 'Could not save the task.')
    });
  }

  moveTask(task: Task, status: TaskStatus) {
    const updated: Task = { ...task, status };
    this.taskService.updateTask(task.id!, updated).subscribe({
      next: () => (task.status = status),
      error: () => (this.error = 'Could not update the task.')
    });
  }

  deleteTask(task: Task) {
    if (!confirm(`Delete "${task.title}"?`)) return;
    this.taskService.deleteTask(task.id!).subscribe({
      next: () => this.loadTasks(),
      error: () => (this.error = 'Could not delete the task.')
    });
  }

  isOverdue(task: Task): boolean {
    return !!task.dueDate && task.status !== 'Done' && new Date(task.dueDate) < new Date();
  }
}