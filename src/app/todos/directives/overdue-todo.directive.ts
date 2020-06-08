import { OnInit, Directive, ElementRef, Input } from '@angular/core';
import { Todo } from '../models/todo.model';

@Directive({
  selector: '[appOverdueTodo]'
})
export class OverdueTodoDirective implements OnInit {
  @Input()
  task: Todo;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.isOverdue()) {
      this.el.nativeElement.classList.add('todo--overdue');
    }
  }

  isOverdue(oldAfterHours: number = 8): boolean {
    const isTodoOld = ((new Date().getTime()) - parseFloat(this.task.id)) / 1000 > oldAfterHours * 3600;
    return isTodoOld && !this.task.done;
  }
}
