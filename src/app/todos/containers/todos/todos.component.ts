import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { tap } from 'rxjs/operators';

/* Container component responsible for communication with the Store. */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  unfinishedNotes$: Observable<Todo[]>;
  unfinishedOrder$: Observable<Order>;
  finishedNotes$: Observable<Todo[]>;
  finishedOrder$: Observable<Order>;

  constructor(private store: Store<fromStore.TodoState>) {}

  /* On initialization get list of Todos, dispatch an action to load them and prepare them for todo-list components. */
  ngOnInit(): void {
    this.finishedNotes$ = this.store.select(fromStore.getFinishedTodos).pipe();
    this.unfinishedNotes$ = this.store.select(fromStore.getUnfinishedTodos).pipe();
    this.finishedOrder$ = this.store.select(fromStore.getFinishedTodosOrder).pipe();
    this.unfinishedOrder$ = this.store.select(fromStore.getUnfinishedTodosOrder).pipe();

    this.store.dispatch(new fromStore.LoadTodos());
  }

  handleAddTodo(newTodo: Todo) {
    this.store.dispatch(new fromStore.CreateTodo(newTodo));
  }

  handleTodoUpdate(updatedTodo: Todo) {
    this.store.dispatch(new fromStore.UpdateTodo(updatedTodo));
  }

  handleTodoRemove(removedTodo: Todo) {
    this.store.dispatch(new fromStore.RemoveTodo(removedTodo));
  }

  handleSortChange(newOrder: Order) {
    this.store.dispatch(new fromStore.UpdateOrder(newOrder));
  }
}
