import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/* Container component responsible for communication with the Store. */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  unfinishedNotes$: Observable<Todo[]>;
  finishedNotes$: Observable<Todo[]>;

  constructor(private store: Store<fromStore.TodoState>) {}

  /* On initialization get list of Todos, dispatch an action to load them and prepare them for todo-list components. */
  ngOnInit(): void {
    this.todos$ = this.store.select(fromStore.getAllTodos);
    this.store.dispatch(new fromStore.LoadTodos());

    this.divideTodos();
  }

  /* Subscribes to the todos$ observable to create two new observables, for both finished and unfinished notes.
    These are then passed to be displayed in todo-list components. */
  divideTodos(): void {
    let finishedNotes: Todo[];
    let unfinishedNotes: Todo[];

    this.todos$.pipe(
      tap(() => { // declare empty arrays.
        finishedNotes = [];
        unfinishedNotes = [];
      }),
      map(todos => todos.map(todo => { // map each todo as either done or to do.
        if (todo.done) {
          finishedNotes = [...finishedNotes, todo];
        } else {
          unfinishedNotes = [...unfinishedNotes, todo];
        }
      })),
      tap(() => { // create new observables out of todo arrays.
        this.finishedNotes$ = of([...finishedNotes]);
        this.unfinishedNotes$ = of([...unfinishedNotes]);
      })
    ).subscribe();
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
}
