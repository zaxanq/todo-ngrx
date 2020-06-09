import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { Todo } from '../../models/todo.model';
import { Order } from '../../models/order.model';
import { SortBy } from '../../enums/sortBy.enum';
import { OrderEnum } from '../../enums/order.enum';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDetails } from '../../models/drag-details.model';

/* Displays list of todos passed as an Input, together with type (of type Status).
  Responsible for communication between single todo component and todos container. */
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input()
  type: Status;
  @Input()
  list: Todo[];
  @Input()
  order: Order;

  items: string[];

  ngOnInit(): void {
    this.items = this.list.map((todo: Todo) => todo.message);
  }

  @Output()
  todoUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  todoRemoved: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  sortChange: EventEmitter<Order> = new EventEmitter<Order>();
  @Output()
  todoDragged: EventEmitter<DragDetails> = new EventEmitter<DragDetails>();

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

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer !== event.container) {
      this.todoDragged.emit(
        {
          todoId: event.item.element.nativeElement.id,
          newTargetList: this.type,
        }
      );
    }
  }
}
