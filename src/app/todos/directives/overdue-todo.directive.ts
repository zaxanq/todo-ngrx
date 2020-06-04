import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOverdueTodo]'
})
export class OverdueTodoDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.classList.add('todo--overdue');
  }
}
