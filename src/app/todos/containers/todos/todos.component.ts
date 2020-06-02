@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList: Todo[] = [
    { message: 'Eat pizza', done: false },
    { message: 'Work', done: true },
    { message: 'Watch a movie', done: false },
    { message: 'Brush teeth', done: true },
    { message: 'Read a book', done: true },
    { message: 'Sleep', done: false },
  ];

  unfinishedNotes: Todo[] = [];
  finishedNotes: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.todoList.map((note) => {
      note.done
      ? this.finishedNotes.push(note)
      : this.unfinishedNotes.push(note);
    });
  }

  handleAddTodo(newTodo: Todo) {
    this.todoList = [...this.todoList, newTodo];
  }
}
import { Component, OnInit } from '@angular/core';

import { Todo } from '../../interfaces/todo.interface';
