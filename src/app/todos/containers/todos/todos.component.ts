import { Status } from '../../enums/status.enum';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit, OnChanges {
  todoList: Todo[];

  unfinishedNotes: Todo[] = [];
  finishedNotes: Todo[] = [];

  constructor(private store: Store<fromStore.TodoState>) {
  }

  ngOnInit(): void {
    this.store.select(fromStore.getAllTodos).subscribe(state => {
      console.log(state);
    });

    this.divideList();
  }

  ngOnChanges(): void {
    this.divideList();
  }

  divideList(): void {
    const finishedNotes = [];
    const unfinishedNotes = [];

    this.todoList?.map((note) => {
      note.done
        ? finishedNotes.push(note)
        : unfinishedNotes.push(note);
    });

    this.finishedNotes = [...finishedNotes];
    this.unfinishedNotes = [...unfinishedNotes];
  }

  handleAddTodo(newTodo: Todo) {
    this.todoList = [...this.todoList, newTodo];
    console.log(this.todoList);
  }

  handleListUpdate(data: { list: Todo[], type: Status.Todo | Status.Done }) {
    const originOfChange = data.type;
    console.log(this.todoList);
    this.todoList = [
      ...this.todoList.filter(
        (todo) => originOfChange === Status.Todo ? todo.done : !todo.done
      ),
      ...data.list,
    ];

    console.log(this.todoList);
  }
}
