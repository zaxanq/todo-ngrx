import * as fromTodos from '../actions/todos.action';
import { Todo } from '../../models/todo.model';
import { Status } from '../../enums/status.enum';

// declare a state model
export interface TodoState {
  data: Todo[];
  order: OrderState;
  loaded: boolean;
  loading: boolean;
}

export interface OrderState {
  finished: ListOrderState;
  unfinished: ListOrderState;
}

export interface ListOrderState {
  sortBy: 'date' | 'message';
  order: 'asc' | 'desc';
}

// declare an empty state
export const initialState: TodoState = {
  data: [],
  order: {
    unfinished: {
      sortBy: 'message',
      order: 'desc',
    },
    finished: {
      sortBy: 'message',
      order: 'desc',
    },
  },
  loaded: false,
  loading: false,
};

// based on action type, execute specific operation on the state
export function reducer(
  state = initialState,
  action: fromTodos.TodosAction,
): TodoState {
  switch (action.type) {
    /* Change only loading when LOAD_TODOS action is dispatched */
    case fromTodos.LOAD_TODOS: {
      return {
        ...state,
        loading: true,
      };
    }

    /* Add todos to the state when LOAD_TODOS_SUCCESS action is dispatched.
      Set loading to false and loaded to true since it's already loaded. */
    case fromTodos.LOAD_TODOS_SUCCESS: {
      const data = action.payload;
      const sortFinished = state.order.finished;
      const sortUnfinished = state.order.unfinished;

      const sort = (a, b, list): number => {
        if (list.order === 'asc') {
          if (list.sortBy === 'date') {
            return a.id < b.id ? 1 : -1;
          }
          return a.message < b.message ? 1 : -1;
        } else if (list.order === 'desc') {
          if (list.sortBy === 'date') {
            return a.id > b.id ? 1 : -1;
          }
          return a.message > b.message ? 1 : -1;
        }
        return -1;
      };

      const finished = data.filter((todo: Todo) => todo.done);
      const sortedFinished = [...finished].sort((a, b) => sort(a, b, sortFinished));

      const unfinished = data.filter((todo: Todo) => !todo.done);
      const sortedUnfinished = [...unfinished].sort((a, b) => sort(a, b, sortUnfinished));

      const sortedData = [...sortedUnfinished, ...sortedFinished];

      localStorage.setItem('data', JSON.stringify(sortedData));
      localStorage.setItem('order', JSON.stringify(state.order));

      return {
        ...state,
        loading: false,
        loaded: true,
        data: sortedData,
      };
    }

    /* On LOAD_TODOS_FAIL try to obtain data from the localStorage. */
    case fromTodos.LOAD_TODOS_FAIL: {
      const localData = localStorage.getItem('data');
      let newState = {
        ...state,
        loading: false,
        loaded: false,
      };

      if (localData) {
        newState = {
          ...newState,
          data: JSON.parse(localData),
        };
      }

      return newState;
    }

    /* Update part of the state after successful todo creation. */
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

    /* Update part of the state after successful todo update. */
    case fromTodos.UPDATE_TODO_SUCCESS: {
      const updatedTodo = action.payload;
      const data = state.data.map((todo: Todo) => todo.id === updatedTodo.id ? updatedTodo : todo);
      localStorage.setItem('data', JSON.stringify(data));

      return {
        ...state,
        data,
      };
    }

    /* Update part of the state after successful todo removal. */
    case fromTodos.REMOVE_TODO_SUCCESS: {
      const removedTodo = action.payload;
      const data = state.data.filter((todo: Todo) => todo.id !== removedTodo.id);
      localStorage.setItem('data', JSON.stringify(data));

      return {
        ...state,
        data,
      };
    }

    case fromTodos.UPDATE_ORDER_SUCCESS: {
      const list = action.payload.list === Status.Todo ? 'unfinished' : 'finished';
      const {sortBy, order} = action.payload;

      return {
        ...state,
        order: {
          ...state.order,
          [list]: {
            sortBy,
            order,
          },
        },
      };
    }
  }

  return state;
}

