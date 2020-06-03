import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

import { TodosModule } from './todos/todos.module';
import { AppComponent } from './app.component';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionStatusComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TodosModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ // ngrx devtools
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
