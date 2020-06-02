import * as fromTodos from '../actions/todos.action';
import { Todo } from '../../models/todo.model';

export interface TodoState {
  data: Todo[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TodoState = {
  data: [
    {
      id: '1591095556956',
      message: 'Eat pizza',
      done: false
    },
    {
      id: '1591095613835',
      message: 'Work',
      done: true
    },
    {
      id: '1591095626046',
      message: 'Watch a movie',
      done: false
    },
    {
      id: '1591095631377',
      message: 'Brush teeth',
      done: true
    },
    {
      id: '1591095636291',
      message: 'Read a book',
      done: true
    },
    {
      id: '1591095640846',
      message: 'Sleep',
      done: false
    }
  ],
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
      return {
        ...state,
        loading: false,
        loaded: true,
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
