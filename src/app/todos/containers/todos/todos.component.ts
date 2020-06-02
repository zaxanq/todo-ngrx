import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleAddTodo(newTodo: Todo) {
    this.todoList = [...this.todoList, newTodo];
  }
}
