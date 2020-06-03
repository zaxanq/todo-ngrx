import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as todoActions from '../actions/todos.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.model';
import { of } from 'rxjs';
import { ConnectionService } from '../../services/connection.service';


/* Each effect takes the dispatched action and communicates through service with API.
  Dispatches new action depending on the result of the request.
  ConnectionService decides what the state of connection is based on the reuslt of the request. */
@Injectable()
export class TodosEffect {
  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(todoActions.LOAD_TODOS),
    switchMap(() => this.todosService.getTodos()
      .pipe(
        tap(() => { this.connectionService.changeStatus('connected'); }),
        map((todos: Todo[]) => new todoActions.LoadTodosSuccess(todos)),
        catchError((error: any) => {
          this.connectionService.changeStatus('disconnected');
          return of(new todoActions.LoadTodosFail(error));
        })
      )
    )
  );

  @Effect()
  createTodo$ = this.actions$.pipe(
    ofType(todoActions.CREATE_TODO),
    map((action: todoActions.CreateTodo) => action.payload),
    switchMap((todo: Todo) => this.todosService
      .addTodo(todo)
      .pipe(
        tap(() => { this.connectionService.changeStatus('connected'); }),
        map((newTodo: Todo) => new todoActions.CreateTodoSuccess(newTodo)),
        catchError((error: any) => {
          this.connectionService.changeStatus('disconnected');
          return of(new todoActions.CreateTodoFail(error));
        })
      )
    )
  );

  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType(todoActions.UPDATE_TODO),
    map((action: todoActions.UpdateTodo) => action.payload),
    switchMap((todo: Todo) => this.todosService
      .updateTodo(todo)
      .pipe(
        tap(() => { this.connectionService.changeStatus('connected'); }),
        map((updatedTodo: Todo) => new todoActions.UpdateTodoSuccess(updatedTodo)),
        catchError((error: any) => {
          this.connectionService.changeStatus('disconnected');
          return of(new todoActions.UpdateTodoFail(error));
        })
      )
    )
  );

  @Effect()
  removeTodo$ = this.actions$.pipe(
    ofType(todoActions.REMOVE_TODO),
    map((action: todoActions.RemoveTodo) => action.payload),
    switchMap((todo: Todo) => this.todosService
      .removeTodo(todo)
      .pipe(
        // 'DELETE' request doesn't return removed item so in this case we use the variable defined in the switchMap.
        map(() => new todoActions.RemoveTodoSuccess(todo)),
        catchError((error: any) => {
          this.connectionService.changeStatus('disconnected');
          return of(new todoActions.RemoveTodoFail(error));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private connectionService: ConnectionService,
  ) {}
}
