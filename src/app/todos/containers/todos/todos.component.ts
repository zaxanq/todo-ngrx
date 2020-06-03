import { Status } from '../../enums/status.enum';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  unfinishedNotes: Todo[] = [];
  finishedNotes: Todo[] = [];

  constructor(private store: Store<fromStore.TodoState>) {
  }

  ngOnInit(): void {
    this.todos$ = this.store.select(fromStore.getAllTodos);

    this.store.dispatch(new fromStore.LoadTodos());

    this.divideTodos();
  }

  divideTodos(): void {
    const finishedNotes = [];
    const unfinishedNotes = [];

    this.todos$.pipe(
      tap(_ => console.log('a', _)),
      map(todos => todos.map(todo => todo.done ? finishedNotes.push(todo) : unfinishedNotes.push(todo))),
      tap(() => {
        this.finishedNotes = [...finishedNotes];
        this.unfinishedNotes = [...unfinishedNotes];
      })
    ).subscribe();
  }

  handleAddTodo(newTodo: Todo) {
    //   this.todoList = [...this.todoList, newTodo];
    //   console.log(this.todoList);
  }

  handleListUpdate(data: { list: Todo[], type: Status.Todo | Status.Done }) {
    //   const originOfChange = data.type;
    //   console.log(this.todoList);
    //   this.todoList = [
    //     ...this.todoList.filter(
    //       (todo) => originOfChange === Status.Todo ? todo.done : !todo.done
    //     ),
    //     ...data.list,
    //   ];
    //
    //   console.log(this.todoList);
  }
}
