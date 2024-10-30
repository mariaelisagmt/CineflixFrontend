import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-nova-tarefa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nova-tarefa.component.html'
})

export class NovaTarefaComponent {
  tituloNovaTarefa = new FormControl('');

  @Output() tarefaAdicionada = new EventEmitter<void>();

  constructor(private todoService: TodoService) { }

  addTarefa() {
    const titulo = this.tituloNovaTarefa.value?.trim();
    if (titulo) {
      this.todoService.createTask(titulo).subscribe(() => {
        this.tarefaAdicionada.emit();
        this.tituloNovaTarefa.reset();
      });
    }
  }
}