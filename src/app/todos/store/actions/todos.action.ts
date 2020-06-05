import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { Order } from '../../models/order.model';

/* load todos */
// defining types of actions
export const LOAD_TODOS = '[TODOS] Load Todos';
export const LOAD_TODOS_FAIL = '[TODOS] Load Todos - Fail';
export const LOAD_TODOS_SUCCESS = '[TODOS] Load Todos - Success';

// creating actions
export class LoadTodos implements Action {
  readonly type = LOAD_TODOS;
}

export class LoadTodosFail implements Action {
  readonly type = LOAD_TODOS_FAIL;
  constructor(public payload: any) {}
}

export class LoadTodosSuccess implements Action {
  readonly type = LOAD_TODOS_SUCCESS;
  constructor(public payload: Todo[]) {}
}


/* create todo */
// defining types of actions
export const CREATE_TODO = '[TODOS] Create Todo';
export const CREATE_TODO_FAIL = '[TODOS] Create Todo - Fail';
export const CREATE_TODO_SUCCESS = '[TODOS] Create Todo - Success';

// creating actions
export class CreateTodo implements Action {
  readonly type = CREATE_TODO;
  constructor(public payload: Todo) {}
}

export class CreateTodoFail implements Action {
  readonly type = CREATE_TODO_FAIL;
  constructor(public payload: any) {}
}

export class CreateTodoSuccess implements Action {
  readonly type = CREATE_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}


/* update todo */
// defining types of actions
export const UPDATE_TODO = '[TODOS] Update Todo';
export const UPDATE_TODO_FAIL = '[TODOS] Update Todo - Fail';
export const UPDATE_TODO_SUCCESS = '[TODOS] Update Todo - Success';

// creating actions
export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;
  constructor(public payload: Todo) {}
}

export class UpdateTodoFail implements Action {
  readonly type = UPDATE_TODO_FAIL;
  constructor(public payload: any) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = UPDATE_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}

/* remove todo */
// defining types of actions
export const REMOVE_TODO = '[TODOS] Remove Todo';
export const REMOVE_TODO_FAIL = '[TODOS] Remove Todo - Fail';
export const REMOVE_TODO_SUCCESS = '[TODOS] Remove Todo - Success';

// creating actions
export class RemoveTodo implements Action {
  readonly type = REMOVE_TODO;
  constructor(public payload: Todo) {}
}

export class RemoveTodoFail implements Action {
  readonly type = REMOVE_TODO_FAIL;
  constructor(public payload: any) {}
}

export class RemoveTodoSuccess implements Action {
  readonly type = REMOVE_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}

/* sorting of todos */
// defining types of actions
export const UPDATE_ORDER = '[SORT] Update order';
export const UPDATE_ORDER_FAIL = '[SORT] Update order - Fail';
export const UPDATE_ORDER_SUCCESS = '[SORT] Update order - Success';

// creating actions
export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;
  constructor(public payload: Order) {}
}

export class UpdateOrderFail implements Action {
  readonly type = UPDATE_ORDER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateOrderSuccess implements Action {
  readonly type = UPDATE_ORDER_SUCCESS;
  constructor(public payload: Order) {}
}

// action types
export type TodosAction =
  LoadTodos | LoadTodosFail | LoadTodosSuccess |
  CreateTodo | CreateTodoFail | CreateTodoSuccess |
  UpdateTodo | UpdateTodoFail | UpdateTodoSuccess |
  RemoveTodo | RemoveTodoFail | RemoveTodoSuccess |
  UpdateOrder | UpdateOrderFail | UpdateOrderSuccess;
