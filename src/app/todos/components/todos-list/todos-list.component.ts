import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent implements OnInit {
  @Input()
  type: Status.Todo | Status.Done;
  @Input()
  list: Todo[];

  @Output()
  todoUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  todoRemoved: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit(): void {
  }

  handleUpdate(updatedTodo: Todo) {
    this.todoUpdated.emit(updatedTodo);
  }

  handleRemove(removeTodo: Todo) {
    this.todoRemoved.emit(removeTodo);
  }

}
