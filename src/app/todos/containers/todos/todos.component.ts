import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  unfinishedNotes$: Observable<Todo[]>;
  finishedNotes$: Observable<Todo[]>;

  constructor(private store: Store<fromStore.TodoState>) {
  }

  ngOnInit(): void {
    this.todos$ = this.store.select(fromStore.getAllTodos);
    this.store.dispatch(new fromStore.LoadTodos());

    this.divideTodos();
  }

  divideTodos(): void {
    let finishedNotes: Todo[];
    let unfinishedNotes: Todo[];

    this.todos$.pipe(
      tap(() => {
        finishedNotes = [];
        unfinishedNotes = [];
      }),
      map(todos => todos.map(todo => {
        if (todo.done) {
          finishedNotes = [...finishedNotes, todo];
        } else {
          unfinishedNotes = [...unfinishedNotes, todo];
        }
      })),
      tap(() => {
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
