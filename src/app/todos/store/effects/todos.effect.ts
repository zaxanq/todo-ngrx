import { Injectable} from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as todoActions from '../actions/todos.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.model';
import { of } from 'rxjs';

@Injectable()
export class TodosEffect {
  constructor(
    private actions$: Actions,
    private todosService: TodosService,
  ) {}

  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(todoActions.LOAD_TODOS),
    switchMap(() => this.todosService.getTodos()
      .pipe(
        map((todos: Todo[]) => new todoActions.LoadTodosSuccess(todos)),
        catchError((error: any) => of(new todoActions.LoadTodosFail(error)))
      )
    )
  );
}
