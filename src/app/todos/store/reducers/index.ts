import * as fromTodos from './todos.reducer';
import * as fromOrder from './order.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface TodoState {
  todos: fromTodos.TodoState;
}

export interface OrderState {
  order: fromOrder.OrderState;
}

export const todosReducers: ActionReducerMap<TodoState> = {
  todos: fromTodos.reducer,
};

export const orderReducers: ActionReducerMap<OrderState> = {
  order: fromOrder.reducer,
};

export const getDataState = createFeatureSelector<TodoState>('todos');
export const getOrderState = createFeatureSelector<OrderState>('order');
