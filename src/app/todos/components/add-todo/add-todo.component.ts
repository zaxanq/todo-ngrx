import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Output()
  addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  newTodo: Todo;

  form = new FormGroup({
    message: new FormControl(''),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newTodo = {
      message: this.form.value.message,
      done: false,
    };

    this.addTodo.emit(this.newTodo);

    this.form.reset();
  }
}
