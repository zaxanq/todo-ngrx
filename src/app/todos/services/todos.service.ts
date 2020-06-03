import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const API_URL = '//localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${API_URL}/todos`);
  }

  addTodo(payload: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(`${API_URL}/todos`, payload);
  }

  updateTodo(payload: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(`${API_URL}/todos/${ payload.id }`, payload);
  }

  removeTodo(payload: Todo): Observable<Todo> {
    return this.http
      .delete<Todo>(`${API_URL}/todos/${ payload.id }`);
  }
}
