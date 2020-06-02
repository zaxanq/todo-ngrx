import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

// load todos
export const LOAD_TODOS = '[TODOS] Load Todos';
export const LOAD_TODOS_FAIL = '[TODOS] Load Todos - Fail';
export const LOAD_TODOS_SUCCESS = '[TODOS] Load Todos - Success';

export class LoadTodos implements Action {
  readonly type = LOAD_TODOS;
}

export class LoadTodosFail implements Action {
  readonly type = LOAD_TODOS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadTodosSuccess implements Action {
  readonly type = LOAD_TODOS_SUCCESS;

  constructor(public payload: Todo[]) {
  }
}

// action types
export type TodosAction = LoadTodos | LoadTodosFail | LoadTodosSuccess;
