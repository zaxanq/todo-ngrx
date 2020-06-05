import * as fromOrder from '../actions/order.action';

export interface OrderState {
  finished: ListOrderState;
  unfinished: ListOrderState;
}

export interface ListOrderState {
  sortBy: 'date' | 'message';
  order: 'asc' | 'desc';
}

export const initialState: OrderState = {
  finished: {
    sortBy: 'date',
    order: 'desc',
  },
  unfinished: {
    sortBy: 'date',
    order: 'desc',
  },
};

export function reducer(
  state = initialState,
  action: fromOrder.OrderAction,
): OrderState {
  switch (action.type) {
    case fromOrder.UPDATE_ORDER_SUCCESS: {
      const { id, sortBy, order } = action.payload;

      return {
        ...state,
        [id]: {
          sortBy,
          order,
        },
      };
    }
  }

  return state;
}
