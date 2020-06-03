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
      localStorage.setItem('data', JSON.stringify(data));

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

    case fromTodos.CREATE_TODO_SUCCESS: {
      const todo = action.payload;
      const data = [
        ...state.data,
        todo,
      ];
      localStorage.setItem('data', JSON.stringify(data));

      return {
        ...state,
        data,
      };
    }

    case fromTodos.UPDATE_TODO_SUCCESS: {
      const updatedTodo = action.payload;
      const data = state.data.map((todo: Todo) => todo.id === updatedTodo.id ? updatedTodo : todo);
      localStorage.setItem('data', JSON.stringify(data));

      return {
        ...state,
        data,
      };
    }

    case fromTodos.REMOVE_TODO_SUCCESS: {
      const removedTodo = action.payload;
      const data = state.data.filter((todo: Todo) => todo.id !== removedTodo.id);
      localStorage.setItem('data', JSON.stringify(data));

      return {
        ...state,
        data,
      };
    }
  }

  return state;
}

export const getTodosLoading = (state: TodoState) => state.loading;
export const getTodosLoaded = (state: TodoState) => state.loaded;
export const getTodos = (state: TodoState) => state.data;
