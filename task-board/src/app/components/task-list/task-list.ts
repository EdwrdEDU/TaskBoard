import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  addTask() {
    if (!this.newTitle.trim()) return;
    const task: Task = { title: this.newTitle, status: 'ToDo' };
    this.taskService.createTask(task).subscribe(() => {
      this.newTitle = '';
      this.loadTasks();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}