import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TodosComponent } from './containers/todos/todos.component';

import { AddTodoComponent } from './components/add-todo/add-todo.component';

@NgModule({
  declarations: [
    TodosComponent,
    AddTodoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    TodosComponent,
  ]
})
export class TodosModule { }
