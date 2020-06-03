import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  @Input()
  data: Todo;

  @Output()
  uncheck: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit(): void {
  }

  handleChange(event): void {
    const updatedTodo = {
      ...this.data,
      done: event.checked,
    };

    this.uncheck.emit(updatedTodo);
  }

  handleRemove(removedTodo: Todo) {
    this.remove.emit(removedTodo);
  }
}
