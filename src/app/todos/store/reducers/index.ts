import * as fromTodos from './todos.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface TodoState {
  todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<TodoState> = {
  todos: fromTodos.reducer,
};

export const getDataState = createFeatureSelector<TodoState>('todos');
