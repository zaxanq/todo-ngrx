import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { OrderState } from '../reducers/order.reducer';

export const getOrdersState = createSelector(
  fromFeature.getOrderState,
  (state: fromFeature.OrderState) => state.order,
);

export const getUnfinishedTodosOrder = createSelector(getOrdersState, (state: OrderState) => state.unfinished);
export const getFinishedTodosOrder = createSelector(getOrdersState, (state: OrderState) => state.finished);
