import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListComponent } from './todos-list.component';

describe('TodoListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
