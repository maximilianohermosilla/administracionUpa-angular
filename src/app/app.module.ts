import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { HttpClientModule }  from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventoService } from './services/evento.service';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
