import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Todo } from '../../models/todo.model';

/* Single todo component displaying an note.
  When hovered, shows controls such as Edit and Remove. */
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @ViewChild('newMessageInput') newMessageInput: ElementRef;

  @Input()
  data: Todo;

  @Output()
  update: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter<Todo>();

  isEdited = false;
  newMessage: string;

  /* Reads current state of the checkbox on change event and sends updated todo to the parent component. */
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

  /* Verifies if the new message is different from the previous one and not empty.
    Then updates the Todo and sends it to the parent. */
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

  /* Toggles between edit & view state of the message.
    Focuses the input and populates it with current message value of the todo on edit state. */
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
