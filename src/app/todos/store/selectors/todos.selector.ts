import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { TodoState } from '../reducers/todos.reducer';
import { sort } from '../../utils';
import { Todo } from '../../models/todo.model';

// selectors to get only a part of state
export const getTodosState = createSelector(
  fromFeature.getDataState,
  (state: fromFeature.TodoState) => state.todos,
);

export const getAllTodos = createSelector(getTodosState, (state: TodoState) => state.data);
export const getFinishedTodos = createSelector(
  getTodosState,
  (state: TodoState) => state.data.filter(((todo: Todo) => todo.done))
    .sort((a: Todo, b: Todo) => sort(a, b, state.order.finished))
);
export const getUnfinishedTodos = createSelector(
  getTodosState,
  (state: TodoState) => state.data.filter(((todo: Todo) => !todo.done))
    .sort((a: Todo, b: Todo) => sort(a, b, state.order.unfinished))
);
export const getTodosLoaded = createSelector(getTodosState, (state: TodoState) => state.loaded);
export const getTodosLoading = createSelector(getTodosState, (state: TodoState) => state.loading);
export const getUnfinishedTodosOrder = createSelector(getTodosState, (state: TodoState) => state.order.unfinished);
export const getFinishedTodosOrder = createSelector(getTodosState, (state: TodoState) => state.order.finished);
