import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { HttpClientModule }  from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventoService } from './services/evento.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
