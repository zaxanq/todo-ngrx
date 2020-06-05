import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { Todo } from '../../models/todo.model';
import { Order } from '../../models/order.model';

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
  @Input()
  order: Order;

  @Input()
  sortDesc: string;

  @Output()
  todoUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  todoRemoved: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  sortChange: EventEmitter<Order> = new EventEmitter<Order>();

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

  handleSortChange(sortBy: 'message' | 'date') {
    console.log('currentOrder:', this.order);
    let newOrderProperty: 'asc' | 'desc';
    if (this.order.sortBy !== sortBy || this.order.order === 'asc') {
      newOrderProperty = 'desc'; // always set to 'descending' on sortBy change or when order was 'ascending'
    } else {
      newOrderProperty = 'asc'; // otherwise set to 'ascending'
    }

    this.sortChange.emit({ sortBy, order: newOrderProperty, list: this.type });
  }
}

// sortBy: date, order: desc
// sortBy: date, order: asc
// sortBy: message, order: asc
