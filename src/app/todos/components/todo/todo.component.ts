import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit, AfterViewInit {
  @ViewChild('newMessageInput') newMessageInput: ElementRef;

  @Input()
  data: Todo;

  @Output()
  update: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter<Todo>();

  isEdited = false;
  newMessage: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  handleChange(event): void {
    if (!this.isEdited) {
      const updatedTodo = {
        ...this.data,
        done: event.checked,
      };

      this.update.emit(updatedTodo);
    }
  }

  handleRemove(removedTodo: Todo) {
    this.remove.emit(removedTodo);
  }

  handleEdit(newMessageValue: string) {
    if (!newMessageValue.trim() || (newMessageValue.trim() === this.data.message)) {
      this.toggleEdit();
      return;
    }

    const updatedTodo = {
      ...this.data,
      message: newMessageValue,
    };
    this.update.emit(updatedTodo);
  }

  toggleEdit() {
    this.isEdited = !this.isEdited;

    if (this.isEdited) {
      this.newMessage = this.data.message;

      setTimeout(() => {
        this.newMessageInput.nativeElement.focus();
      }, 0);
    }
  }
}
