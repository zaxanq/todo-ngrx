import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private onlineStatus = new BehaviorSubject(null);
  currentStatus$ = this.onlineStatus.asObservable();

  constructor() {
  }

  changeStatus(status: string) {
    this.onlineStatus.next(status);
  }
}
