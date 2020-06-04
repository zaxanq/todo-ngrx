import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTodos from '../reducers/todos.reducer';
import { TodoState } from '../reducers/todos.reducer';

// selectors to get only a part of state
export const getTodosState = createSelector(
  fromFeature.getDataState,
  (state: fromFeature.TodoState) => state.todos,
);

export const getAllTodos = createSelector(getTodosState, (state: TodoState) => state.loading);
export const getFinishedTodos = createSelector(getTodosState, (state: TodoState) => state.data.filter(todo => todo.done));
export const getUnfinishedTodos = createSelector(getTodosState, (state: TodoState) => state.data.filter(todo => !todo.done));
export const getTodosLoaded = createSelector(getTodosState, (state: TodoState) => state.loaded);
export const getTodosLoading = createSelector(getTodosState, (state: TodoState) => state.data);
