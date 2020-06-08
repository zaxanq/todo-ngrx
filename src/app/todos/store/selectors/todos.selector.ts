import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { TodoState } from '../reducers/todos.reducer';
import { sort } from '../../utils';
import { Todo } from '../../models/todo.model';
import { Order } from '../../models/order.model';

// selectors to get only a part of state
export const getTodosState = createSelector(
  fromFeature.getDataState,
  (state: fromFeature.TodoState) => state.todos,
);

export const getTodosLoaded = createSelector(getTodosState, (state: TodoState) => state.loaded);
export const getTodosLoading = createSelector(getTodosState, (state: TodoState) => state.loading);
export const getAllTodos = createSelector(getTodosState, (state: TodoState) => state.data);
export const getFinishedTodos = createSelector(
  getAllTodos,
  (todos: Todo[]) => todos.filter((todo: Todo) => todo.done)
);
export const getUnfinishedTodos = createSelector(
  getAllTodos,
  (todos: Todo[]) => todos.filter((todo: Todo) => !todo.done)
);
export const getUnfinishedTodosOrder = createSelector(
  getTodosState,
  (state: TodoState) => state.order.unfinished
);
export const getFinishedTodosOrder = createSelector(
  getTodosState,
  (state: TodoState) => state.order.finished
);
export const getSortedFinishedTodos = createSelector(
  getFinishedTodos,
  getFinishedTodosOrder,
  (finishedTodos: Todo[], finishedOrder: Order) => finishedTodos.sort((a: Todo, b: Todo) => sort(a, b, finishedOrder))
);
export const getSortedUnfinishedTodos = createSelector(
  getUnfinishedTodos,
  getUnfinishedTodosOrder,
  (unfinishedTodos: Todo[], unfinishedOrder: Order) => unfinishedTodos.sort((a: Todo, b: Todo) => sort(a, b, unfinishedOrder))
);
