import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tarefa } from '../../model/todo.model';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule ], 
  templateUrl: './todo-item.component.html'
})

export class TodoItemComponent implements OnInit {
  @Input() todo!: Tarefa; // Recebe o Todo do componente pai
  @Output() deletedTodo = new EventEmitter<number>(); // Emite evento para o pai ao deletar

  todoForm!: FormGroup; // Formulário para controlar o estado do Todo

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      completo: [this.todo.completo], // Controla o checkbox
    });

    // Escuta mudanças no formulário para atualizar o Todo
    this.todoForm.get('completo')?.valueChanges.subscribe((checked: boolean) => {
      this.todo.completo = checked;
      this.onTaskChecked();
    });
  }

  // Função chamada ao marcar/desmarcar a tarefa
  onTaskChecked(): void {
    this.todoService.updateTask(this.todo).subscribe();
  }

  // Função para deletar o Todo
  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.deletedTodo.emit(this.todo.id); // Emite evento para o componente pai
    }
  }
}