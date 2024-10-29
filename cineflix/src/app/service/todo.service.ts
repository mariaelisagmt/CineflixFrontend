import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/tarefas';  // URL da API

  constructor(private http: HttpClient) {}

  // Método para listar todas as tarefas
  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  // Método para criar uma nova tarefa
  createTask(titulo: string): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, { titulo });
  }

  // Método para atualizar uma tarefa
  updateTask(task: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${task.id}`, task);
  }

  // Método para excluir uma tarefa
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}