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
  templateUrl: './todo.component.html'
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
    });
  }
  
  onTarefaAdicionada() {
    this.loadTodos();
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
}