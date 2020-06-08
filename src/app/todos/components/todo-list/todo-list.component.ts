import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { Todo } from '../../models/todo.model';
import { Order } from '../../models/order.model';
import { SortBy } from '../../enums/sortBy.enum';
import { OrderEnum } from '../../enums/order.enum';

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

  @Output()
  todoUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  todoRemoved: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  sortChange: EventEmitter<Order> = new EventEmitter<Order>();

  sortByDate = SortBy.date;
  sortByMessage = SortBy.message;

  handleUpdate(updatedTodo: Todo): void {
    this.todoUpdated.emit(updatedTodo);
  }

  handleRemove(removeTodo: Todo): void {
    this.todoRemoved.emit(removeTodo);
  }

  handleSortChange(sortBy: SortBy): void {
    let newOrderProperty: OrderEnum;

    if (this.order.sortBy !== sortBy || this.order.order === OrderEnum.asc) {
      newOrderProperty = OrderEnum.desc; // always set to 'descending' on sortBy change or when order was 'ascending'
    } else {
      newOrderProperty = OrderEnum.asc; // otherwise set to 'ascending'
    }

    this.sortChange.emit(
      {
        sortBy,
        order: newOrderProperty,
        list: this.type
      }
    );
  }
}
