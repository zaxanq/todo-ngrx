import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../todos/services/connection.service';
import { Observable } from 'rxjs';

/* displays online/offline status (connection with mocked API) on the bottom of the app */
@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss']
})
export class ConnectionStatusComponent implements OnInit {
  status$: Observable<string>;

  notification = {
    connected: 'everything looks fine',
    disconnected: 'you can view the list, but changes will not be saved',
  };

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.status$ = this.connectionService.currentStatus$;
  }

}
