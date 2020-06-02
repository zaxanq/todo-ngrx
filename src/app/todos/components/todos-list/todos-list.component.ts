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
  listUpdated: EventEmitter<{ list: Todo[], type: Status.Todo | Status.Done }>
    = new EventEmitter<{ list: Todo[], type: Status.Todo | Status.Done }>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.list);
  }

  handleUncheck(updatedTodo: Todo) {
    const updatedList = this.list.map(
      (todo) => todo.id === updatedTodo.id ? updatedTodo : todo
    );

    this.listUpdated.emit({
      list: updatedList,
      type: this.type,
    });
  }

}
