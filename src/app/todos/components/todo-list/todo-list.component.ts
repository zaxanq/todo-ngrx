import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { Todo } from '../../models/todo.model';

/* Displays list of todos passed as an Input, together with type (of type Status).
  Responsible for communication between single todo component and todos container. */
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input()
  type: Status.Todo | Status.Done;
  @Input()
  list: Todo[];

  @Output()
  todoUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  todoRemoved: EventEmitter<Todo> = new EventEmitter<Todo>();

  handleUpdate(updatedTodo: Todo) {
    this.todoUpdated.emit(updatedTodo);
  }

  handleRemove(removeTodo: Todo) {
    this.todoRemoved.emit(removeTodo);
  }

  isOverdue(todo: Todo, oldAfterHours: number = 8): boolean {
    const isTodoOld = ((new Date().getTime()) - +todo.id) / 1000 > oldAfterHours * 3600;
    return isTodoOld && !todo.done;
  }
}
