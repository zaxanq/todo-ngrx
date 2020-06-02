import * as fromTodos from './todos.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface TodoState {
  todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<TodoState> = {
  todos: fromTodos.reducer,
};

export const getDataState = createFeatureSelector<TodoState>('todos');

export const getTodosState = createSelector(
  getDataState,
  (state: TodoState) => state.todos,
);

export const getAllTodos = createSelector(getTodosState, fromTodos.getTodos);
export const getTodosLoaded = createSelector(getTodosState, fromTodos.getTodosLoaded);
export const getTodosLoading = createSelector(getTodosState, fromTodos.getTodosLoading);

