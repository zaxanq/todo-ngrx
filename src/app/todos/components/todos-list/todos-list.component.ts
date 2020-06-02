import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
  @Input()
  type: Status.Todo | Status.Done;
  @Input()
  list: Todo[];

  constructor() { }

  ngOnInit(): void {
  }

}
