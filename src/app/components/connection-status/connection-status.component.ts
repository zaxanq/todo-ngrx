import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../todos/services/connection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss']
})
export class ConnectionStatusComponent implements OnInit {
  status$: Observable<string>;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.status$ = this.connectionService.currentStatus$;
  }

}
