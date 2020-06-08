import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from '../../models/todo.model';

/* presentational component responsible for getting new todo data and passing it up
  to the todo-list component. */
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @ViewChild('newTodoInput') newTodoInput: ElementRef;

  @Output()
  addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  newTodo: Todo;

  form = new FormGroup({
    message: new FormControl(''),
  });

  ngOnInit(): void {
    this.focusInput();
  }

  /* To improve the UX, focus input when component has been rendered or todo has been added. */
  focusInput(): void {
    setTimeout(() => this.newTodoInput.nativeElement.focus(), 0);
  }

  /* Create new Todo object with message from the input. Current timestamp in a form of string will serve as an id.
    Each new todo is not finished by default. */
  onSubmit(): void {
    this.newTodo = {
      id: (new Date()).getTime().toString(),
      message: this.form.value.message.trim(),
      done: false,
    };

    this.addTodo.emit(this.newTodo);

    /* After submission, clear the form */
    this.form.reset();
    this.focusInput();
  }
}
