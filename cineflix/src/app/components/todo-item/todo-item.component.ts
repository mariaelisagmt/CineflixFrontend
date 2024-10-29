import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tarefa } from '../../model/todo.model';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule], // Importa ReactiveFormsModule para o formulário reativo
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Tarefa; // Recebe o Todo do componente pai
  @Output() deletedTodo = new EventEmitter<number>(); // Emite evento para o pai ao deletar

  todoForm!: FormGroup; // Formulário para controlar o estado do Todo

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    // Inicializa o formulário com os valores atuais do todo
    console.log("aquiiii");
    this.todoForm = this.formBuilder.group({
      completo: [this.todo.feita], // Controla o checkbox
    });

    // Escuta mudanças no formulário para atualizar o Todo
    this.todoForm.get('completo')?.valueChanges.subscribe((checked: boolean) => {
      this.todo.feita = checked;
      this.onTaskChecked();
    });
  }

  // Função chamada ao marcar/desmarcar a tarefa
  onTaskChecked(): void {
    this.todoService.updateTask(this.todo); // Atualiza o Todo no serviço
  }

  // Função para deletar o Todo
  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.deletedTodo.emit(this.todo.id); // Emite evento para o componente pai
    }
  }
}