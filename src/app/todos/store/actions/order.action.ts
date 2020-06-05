import { Action } from '@ngrx/store';
import { Order } from '../../models/order.model';


/* sorting of todos */
// defining types of actions
export const UPDATE_ORDER = '[SORT] Update order';
export const UPDATE_ORDER_FAIL = '[SORT] Update order - Fail';
export const UPDATE_ORDER_SUCCESS = '[SORT] Update order - Success';

// creating actions
export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;
  constructor(public payload: Order) {}
}

export class UpdateOrderFail implements Action {
  readonly type = UPDATE_ORDER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateOrderSuccess implements Action {
  readonly type = UPDATE_ORDER_SUCCESS;
  constructor(public payload: Order) {}
}
export type OrderAction = UpdateOrder | UpdateOrderFail | UpdateOrderSuccess;
