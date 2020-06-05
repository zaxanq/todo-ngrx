import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

import { TodosComponent } from './containers/todos/todos.component';

import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { OverdueTodoDirective } from './directives/overdue-todo.directive';

@NgModule({
  declarations: [
    TodosComponent,
    AddTodoComponent,
    TodoListComponent,
    TodoComponent,
    OverdueTodoDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature(effects),
    MatIconModule,
    FormsModule,
  ],
  exports: [
    TodosComponent,
  ]
})
export class TodosModule {
}
