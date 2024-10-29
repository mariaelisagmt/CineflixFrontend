import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NovaTarefaComponent } from '../nova-tarefa/nova-tarefa.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Tarefa } from '../../model/todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, NovaTarefaComponent, TodoItemComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit {
  todos: Tarefa[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTasks().subscribe(todos => {
      this.todos = todos;
      console.log(this.todos);
    });
  }

  addTodo(newTodoTitle: string) {
    this.todoService.createTask(newTodoTitle);
  }

  updateTodo(updatedTodo: Tarefa) {
    this.todoService.updateTask(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTask(todoId);
  }
/*
  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    this.todoService.clearCompletedTasks();
    this.loadTodos();
  }
    */

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.feita);
  }
}