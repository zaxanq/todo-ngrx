import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { tap } from 'rxjs/operators';
import { Status } from '../../enums/status.enum';
import { DragDetails } from '../../models/drag-details.model';

/* Container component responsible for communication with the Store. */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  unfinishedNotes$: Observable<Todo[]>;
  unfinishedTodos: Todo[];
  unfinishedOrder$: Observable<Order>;
  finishedNotes$: Observable<Todo[]>;
  finishedTodos: Todo[];
  finishedOrder$: Observable<Order>;

  statusTodo = Status.Todo;
  statusDone = Status.Done;

  constructor(private store: Store<fromStore.TodoState>) {
  }

  /* On initialization get list of Todos, dispatch an action to load them and prepare them for todo-list components. */
  ngOnInit(): void {
    this.finishedNotes$ = this.store.select(fromStore.getSortedFinishedTodos).pipe(
      tap((todos: Todo[]) => {
        this.finishedTodos = todos;
      })
    );
    this.unfinishedNotes$ = this.store.select(fromStore.getSortedUnfinishedTodos).pipe(
      tap((todos: Todo[]) => {
        this.unfinishedTodos = todos;
      })
    );
    this.finishedOrder$ = this.store.select(fromStore.getFinishedTodosOrder).pipe();
    this.unfinishedOrder$ = this.store.select(fromStore.getUnfinishedTodosOrder).pipe();

    this.store.dispatch(new fromStore.LoadTodos());
  }

  handleAddTodo(newTodo: Todo): void {
    this.store.dispatch(new fromStore.CreateTodo(newTodo));
  }

  handleTodoUpdate(updatedTodo: Todo): void {
    this.store.dispatch(new fromStore.UpdateTodo(updatedTodo));
  }

  handleTodoRemove(removedTodo: Todo): void {
    this.store.dispatch(new fromStore.RemoveTodo(removedTodo));
  }

  handleSortChange(newOrder: Order): void {
    this.store.dispatch(new fromStore.UpdateOrderSettings(newOrder));
  }

  handleTodoDrag(details: DragDetails): void {
    const movedTodoId = details.todoId;
    let movedTodo: Todo;

    if (details.newTargetList === Status.Todo) { // todo is flagged as undone
      movedTodo = this.finishedTodos.find((todo: Todo) => todo.id === movedTodoId);
    } else { // todo is flagged as done
      movedTodo = this.unfinishedTodos.find((todo: Todo) => todo.id === movedTodoId);
    }

    this.store.dispatch(new fromStore.UpdateTodo(
      {
        ...movedTodo,
        done: !movedTodo.done,
      }
    ));
  }
}
