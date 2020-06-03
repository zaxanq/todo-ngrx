import * as fromTodos from '../actions/todos.action';
import { Todo } from '../../models/todo.model';

export interface TodoState {
  data: Todo[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TodoState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromTodos.TodosAction,
): TodoState {
  switch (action.type) {
    case fromTodos.LOAD_TODOS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromTodos.LOAD_TODOS_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        data,
      };
    }

    case fromTodos.LOAD_TODOS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getTodosLoading = (state: TodoState) => state.loading;
export const getTodosLoaded = (state: TodoState) => state.loaded;
export const getTodos = (state: TodoState) => state.data;
