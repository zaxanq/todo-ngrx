import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store';

import { TodosComponent } from './containers/todos/todos.component';

import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [
    TodosComponent,
    AddTodoComponent,
    TodosListComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', reducers),
  ],
  exports: [
    TodosComponent,
  ]
})
export class TodosModule {
}
