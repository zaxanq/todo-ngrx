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

  hover = false;

  constructor() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hover = false;
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
}
