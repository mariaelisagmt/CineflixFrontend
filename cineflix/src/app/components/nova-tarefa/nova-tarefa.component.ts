import { Component } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-nova-tarefa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.css']
})

export class NovaTarefaComponent {
  tituloNovaTarefa = new FormControl('');

  constructor(private todoService: TodoService) { }

  addTarefa() {
    const tituloTarefa = this.tituloNovaTarefa.value?? '';
    console.log(tituloTarefa);
    if (tituloTarefa.trim() !== '') {
      this.todoService.createTask(tituloTarefa);
      this.tituloNovaTarefa.reset();
    }
  }
}