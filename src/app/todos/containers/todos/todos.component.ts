import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* Container component responsible for communication with the Store. */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  unfinishedNotes$: Observable<Todo[]>;
  finishedNotes$: Observable<Todo[]>;

  constructor(private store: Store<fromStore.TodoState>) {}

  /* On initialization get list of Todos, dispatch an action to load them and prepare them for todo-list components. */
  ngOnInit(): void {
    this.todos$ = this.store.select(fromStore.getAllTodos).pipe();
    this.store.dispatch(new fromStore.LoadTodos());

    this.divideTodos();
  }

  /* Creates two new observables out of todos$ observable for both finished and unfinished notes.
    These are then passed to be displayed in todo-list components. */
  divideTodos(): void {
    this.finishedNotes$ = this.todos$.pipe(map((todos: Todo[]) => todos.filter((todo: Todo) => todo.done)));
    this.unfinishedNotes$ = this.todos$.pipe(map((todos: Todo[]) => todos.filter((todo: Todo) => !todo.done)));
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
