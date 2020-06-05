import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const API_URL = '//localhost:3000';
const TODOS_API_URL = `${ API_URL }/todos`;

/* Helper service responsible for communication with the backend. */
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(TODOS_API_URL);
  }

  addTodo(payload: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(TODOS_API_URL, payload);
  }

  updateTodo(payload: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(`${ TODOS_API_URL }/${ payload.id }`, payload);
  }

  removeTodo(payload: Todo): Observable<Todo> {
    return this.http
      .delete<Todo>(`${ TODOS_API_URL }/${ payload.id }`);
  }
}
