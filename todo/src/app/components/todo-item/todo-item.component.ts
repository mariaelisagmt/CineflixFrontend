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
  @Input() todo!: Tarefa;
  @Output() deletedTodo = new EventEmitter<number>();

  todoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      completo: [this.todo.completo],
    });

    this.todoForm.get('completo')?.valueChanges.subscribe((checked: boolean) => {
      this.todo.completo = checked;
      this.onTaskChecked();
    });
  }

  onTaskChecked(): void {
    this.todoService.updateTask(this.todo).subscribe();
  }
}