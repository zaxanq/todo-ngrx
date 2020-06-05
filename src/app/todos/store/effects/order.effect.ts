import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as orderActions from '../actions/order.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { of } from 'rxjs';
import { ConnectionService } from '../../services/connection.service';
import { Order } from '../../models/order.model';


/* Each effect takes the dispatched action and communicates through service with API.
  Dispatches new action depending on the result of the request.
  ConnectionService decides what the state of connection is based on the reuslt of the request. */
@Injectable()
export class OrderEffect {
  @Effect()
  updateOrder$ = this.actions$.pipe(
    ofType(orderActions.UPDATE_ORDER),
    map((action: orderActions.UpdateOrder) => action.payload),
    switchMap((order: Order) => this.todosService
      .updateOrder(order)
      .pipe(
        map((updatedOrder: Order) => new orderActions.UpdateOrderSuccess(updatedOrder)),
        catchError((error: any) => {
          this.connectionService.changeStatus('disconnected');
          return of(new orderActions.UpdateOrderFail(error));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private connectionService: ConnectionService,
  ) {}
}
